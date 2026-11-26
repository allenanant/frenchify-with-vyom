import { createHash } from 'node:crypto';
import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
import { FRENCH_PR_QUIZ_TAG, getPlan, questions, validateSubmission } from '@/lib/french-pr-quiz';
import { addFrenchifyContactNote, addFrenchifyContactTags, enrollFrenchifyContact, upsertFrenchifyContact } from '@/lib/ghl-chat-lead.mjs';
import { roadmapIpHash } from '@/lib/roadmap/auth';
import { reserveIpAttempt } from '@/lib/roadmap/db';

export const maxDuration = 45;
const ADMIN_ALERT_WORKFLOW = '27e4dc36-6360-44df-b8fc-fcdf898e1991';
let schemaReady: Promise<unknown> | undefined;

type Delivery = { contact_id: string | null; note_saved: boolean; delivered_at: string | null };

const reply = (data: object, status = 200) => NextResponse.json(data, {
  status, headers: { 'Cache-Control': 'private, no-store' },
});

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return reply({ error: 'Open the quiz on the Frenchify website and try again.' }, 403);
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return reply({ error: 'Invalid request.' }, 415);

  const raw = await request.text();
  if (Buffer.byteLength(raw) > 4096) return reply({ error: 'Request too large.' }, 413);
  let data: unknown;
  try { data = JSON.parse(raw); } catch { return reply({ error: 'Invalid request.' }, 400); }
  const valid = validateSubmission(data);
  if ('error' in valid) return reply({ error: valid.error }, 400);
  const { answers, name, email, phone } = valid.value;
  const plan = getPlan(answers);

  const database = process.env.DATABASE_URL;
  const token = process.env.GHL_FRENCHIFY_API_KEY;
  const unavailable = 'We couldn’t save your submission just now. Your answers are still here. Please try again.';
  if (!database || !token) {
    console.error('[french-pr-quiz] CRM or database configuration is missing.');
    return reply({ error: unavailable }, 503);
  }

  const sql = neon(database);
  const key = createHash('sha256').update(JSON.stringify(valid.value)).digest('hex');
  let claimed = false;
  try {
    schemaReady ??= sql`CREATE TABLE IF NOT EXISTS website_french_pr_quiz_delivery (
      id TEXT PRIMARY KEY, attempt_at TIMESTAMPTZ, contact_id TEXT,
      note_saved BOOLEAN NOT NULL DEFAULT FALSE, delivered_at TIMESTAMPTZ
    )`.catch((error) => { schemaReady = undefined; throw error; });
    await schemaReady;
    const [prior] = await sql`SELECT delivered_at FROM website_french_pr_quiz_delivery WHERE id = ${key}`;
    if (prior?.delivered_at) return reply({ plan });

    const ipHash = await roadmapIpHash();
    const emailHash = createHash('sha256').update(email).digest('hex');
    if (!(await reserveIpAttempt(`website-french-pr-quiz|${ipHash}`, 20)) ||
        !(await reserveIpAttempt(`website-french-pr-quiz-email|${emailHash}`, 6))) {
      return reply({ error: 'Too many attempts. Please wait 15 minutes and try again.' }, 429);
    }

    const [delivery] = await sql`INSERT INTO website_french_pr_quiz_delivery (id, attempt_at)
      VALUES (${key}, NOW()) ON CONFLICT (id) DO UPDATE SET attempt_at = NOW()
      WHERE website_french_pr_quiz_delivery.delivered_at IS NULL
        AND (website_french_pr_quiz_delivery.attempt_at IS NULL
          OR website_french_pr_quiz_delivery.attempt_at < NOW() - INTERVAL '2 minutes')
      RETURNING contact_id, note_saved, delivered_at` as Delivery[];
    if (!delivery) {
      const [current] = await sql`SELECT delivered_at FROM website_french_pr_quiz_delivery WHERE id = ${key}`;
      return current?.delivered_at ? reply({ plan }) : reply({ error: 'Your submission is still being saved. Please wait a moment and try again.' }, 409);
    }
    claimed = true;

    const config = { token, workflowId: ADMIN_ALERT_WORKFLOW };
    let contactId = delivery.contact_id;
    if (!contactId) {
      const { contactId: savedId } = await upsertFrenchifyContact({ name, email, phone }, config);
      await addFrenchifyContactTags(savedId, [FRENCH_PR_QUIZ_TAG], config);
      await sql`UPDATE website_french_pr_quiz_delivery SET contact_id = ${savedId} WHERE id = ${key}`;
      contactId = savedId;
    }
    if (!delivery.note_saved) {
      const details = [
        ['Goal', questions.goal.options[answers.goal]],
        ['Level', questions.level.options[answers.level]],
        ...(answers.permit ? [['Work permit timeline', questions.permit.options[answers.permit]]] : []),
        ['Study preference', questions.study.options[answers.study]],
        ['Exam status', questions.exam.options[answers.exam]],
        ['Recommended path', plan.path.join(' → ')],
        ['Study first', plan.first],
      ];
      // These values are server-defined labels, not visitor-supplied HTML.
      const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
      await addFrenchifyContactNote(contactId, {
        title: 'Website — Free French PR Plan Quiz',
        body: details.map(([label, value]) => `<p><strong>${escape(label)}:</strong> ${escape(value)}</p>`).join(''),
      }, config);
      await sql`UPDATE website_french_pr_quiz_delivery SET note_saved = TRUE WHERE id = ${key}`;
    }
    await enrollFrenchifyContact(contactId, config);
    await sql`UPDATE website_french_pr_quiz_delivery SET delivered_at = NOW(), attempt_at = NULL WHERE id = ${key}`;
    return reply({ plan });
  } catch (error) {
    console.error('[french-pr-quiz] Delivery failed:', error instanceof Error ? error.message.slice(0, 170) : 'unknown error');
    if (claimed) {
      await sql`UPDATE website_french_pr_quiz_delivery SET attempt_at = NULL WHERE id = ${key} AND delivered_at IS NULL`.catch(() => undefined);
    }
    return reply({ error: unavailable }, 503);
  }
}
