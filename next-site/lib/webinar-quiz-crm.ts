import 'server-only';

import { QUIZ_QUESTIONS, quizContactTags, type QuizAnswerIndexes } from './webinar-quiz';
import * as db from './webinar-quiz-db';

/**
 * Puts the quiz answers on the GHL contact that the webinar form just made.
 *
 * GHL form 3APCQqdqGuJSH8iTWgS1 creates the contact and starts "Webinar seq.
 * (sundays)", exactly as on /webinar-form. This module then adds a note and
 * tags to that contact.
 *
 * It finds the contact with the upsert call and only the email the form
 * reported. The site key (GHL_FRENCHIFY_API_KEY) is proven on upsert and
 * tags (the roadmap leads use both), and upsert changes nothing on a contact
 * that already has those values. If upsert says the contact is new, the form
 * did not make it, so no note or tags go on it and the row shows the problem.
 *
 * Tags start with "wq-" on purpose, so they cannot match a tag trigger that an
 * existing workflow already listens for.
 */

const BASE = 'https://services.leadconnectorhq.com';
const LOCATION = 'cmjlzerv4DUDyZFj6PYO';

function headers(token: string) {
  return { authorization: `Bearer ${token}`, version: '2021-07-28', 'content-type': 'application/json' };
}

/** Email only: it came from the GHL form itself, so it matches exactly, and
 *  sending one field keeps the upsert from changing anything else. */
async function findContact(token: string, email: string) {
  const res = await fetch(`${BASE}/contacts/upsert`, {
    method: 'POST',
    headers: headers(token),
    body: JSON.stringify({ locationId: LOCATION, email }),
    signal: AbortSignal.timeout(8_000),
  });
  const body = (await res.json().catch(() => ({}))) as {
    new?: boolean;
    contact?: { id?: string; locationId?: string };
  };
  if (!res.ok || !body.contact?.id || (body.contact.locationId && body.contact.locationId !== LOCATION)) {
    throw new Error(`Contact lookup failed (${res.status}).`);
  }
  return { id: body.contact.id, isNew: body.new === true };
}

function noteBody(row: db.QuizRow) {
  const indexes = row.answers as QuizAnswerIndexes;
  const lines = ['Webinar quiz answers (frenchifywithvyom.com/quiz-webinar/)', ''];
  for (const q of QUIZ_QUESTIONS) {
    const i = indexes[q.id];
    if (i === undefined) continue;
    lines.push(`${q.q}`, `> ${q.options[i]}`, '');
  }
  const when = new Date(row.registered_at ?? row.updated_at).toLocaleString('en-CA', {
    timeZone: 'America/Toronto',
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  lines.push(`Registered for the webinar: ${when} (Toronto time)`);
  return lines.join('\n');
}

/**
 * One attempt for one row. Safe to call more than once: the claim in the
 * database lets only one caller work on a row at a time.
 */
export async function syncQuizRow(id: number, immediate = false): Promise<'synced' | 'pending' | 'skipped'> {
  // Preview deployments have no GHL key. Leave the row pending without using
  // up an attempt, so production picks it up on the next admin load.
  const token = process.env.GHL_FRENCHIFY_API_KEY;
  if (!token) return 'pending';
  const row = await db.claimQuizGhlSync(id, immediate);
  if (!row) return 'skipped';
  try {
    if (!row.email) throw new Error('No email on this row.');
    const contact = await findContact(token, row.email);
    if (contact.isNew) {
      // Upsert had to make the contact, so the webinar form did not. Leave it
      // alone (no answers, no tags) and stop retrying this row.
      await db.markQuizGhlFailed(row.id, 'The webinar form did not create this contact. Answers were not added.', true);
      return 'pending';
    }

    const tagRes = await fetch(`${BASE}/contacts/${encodeURIComponent(contact.id)}/tags`, {
      method: 'POST',
      headers: headers(token),
      body: JSON.stringify({ tags: quizContactTags(row.answers as QuizAnswerIndexes) }),
      signal: AbortSignal.timeout(8_000),
    });
    if (!tagRes.ok) throw new Error(`Tag update failed (${tagRes.status}).`);

    const noteRes = await fetch(`${BASE}/contacts/${encodeURIComponent(contact.id)}/notes`, {
      method: 'POST',
      headers: headers(token),
      body: JSON.stringify({ body: noteBody(row) }),
      signal: AbortSignal.timeout(8_000),
    });
    if (!noteRes.ok) throw new Error(`Note failed (${noteRes.status}).`);

    await db.markQuizGhlSynced(row.id, contact.id);
    return 'synced';
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown CRM error';
    console.error('[webinar-quiz] GHL sync will retry.', message);
    await db.markQuizGhlFailed(row.id, message).catch(() => undefined);
    return 'pending';
  }
}

/** The contact appears in GHL a moment after the form posts, so try a few times. */
export async function syncQuizRowWithWait(id: number) {
  const waits = [1_500, 4_000, 8_000];
  for (const ms of waits) {
    await new Promise((r) => setTimeout(r, ms));
    const result = await syncQuizRow(id, true);
    if (result !== 'pending') return result;
  }
  return 'pending' as const;
}
