import 'server-only';

import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import type { CleanQuizAnswers } from './webinar-quiz';

/**
 * One row per quiz visit, keyed by a random token the browser makes.
 *
 * The row is written after every answer, not only at the end, so Vyom can see
 * where people stop. When the GHL webinar form reports a successful
 * registration, the same row gets the contact details and the CRM status.
 */

let client: NeonQueryFunction<false, false> | null = null;

function db() {
  if (!client) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error('DATABASE_URL is not set. Add the Neon Postgres integration in Vercel.');
    client = neon(url);
  }
  return client;
}

const sql: NeonQueryFunction<false, false> = ((strings: TemplateStringsArray, ...values: unknown[]) =>
  (db() as unknown as (s: TemplateStringsArray, ...v: unknown[]) => unknown)(strings, ...values)) as never;

export type QuizRow = {
  id: number;
  token: string;
  answers: Record<string, number>;
  goal: string | null;
  level: string | null;
  permit: string | null;
  learning: string | null;
  exam: string | null;
  quiz_completed_at: string | null;
  registered_at: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  ghl_contact_id: string | null;
  ghl_status: 'none' | 'pending' | 'syncing' | 'synced' | 'failed';
  ghl_last_error: string | null;
  ghl_attempts: number;
  tracking: Record<string, string>;
  is_test: boolean;
  created_at: string;
  updated_at: string;
};

/** After this many failed CRM attempts a row stops retrying and shows as failed. */
export const MAX_GHL_ATTEMPTS = 6;

let ready: Promise<void> | null = null;

/** Idempotent schema creation, paid once per warm serverless instance. */
export function ensureQuizSchema(): Promise<void> {
  if (!ready) {
    ready = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS webinar_quiz_responses (
          id                   BIGSERIAL PRIMARY KEY,
          token                TEXT NOT NULL UNIQUE,
          answers              JSONB NOT NULL DEFAULT '{}'::jsonb,
          goal                 TEXT,
          level                TEXT,
          permit               TEXT,
          learning             TEXT,
          exam                 TEXT,
          quiz_completed_at    TIMESTAMPTZ,
          registered_at        TIMESTAMPTZ,
          first_name           TEXT,
          last_name            TEXT,
          email                TEXT,
          phone                TEXT,
          ghl_contact_id       TEXT,
          ghl_status           TEXT NOT NULL DEFAULT 'none',
          ghl_last_error       TEXT,
          ghl_attempts         INTEGER NOT NULL DEFAULT 0,
          ghl_last_attempt_at  TIMESTAMPTZ,
          ghl_synced_at        TIMESTAMPTZ,
          tracking             JSONB NOT NULL DEFAULT '{}'::jsonb,
          is_test              BOOLEAN NOT NULL DEFAULT FALSE,
          created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )`;
      await sql`CREATE INDEX IF NOT EXISTS idx_webinar_quiz_created ON webinar_quiz_responses(created_at DESC)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_webinar_quiz_ghl ON webinar_quiz_responses(ghl_status, ghl_last_attempt_at)`;
    })().catch((error) => {
      ready = null;
      throw error;
    });
  }
  return ready;
}

/**
 * Insert or update the answers for one visit. The ad tracking is kept from the
 * first write only. Once the visitor has registered, the answers are frozen,
 * because that is the version that went onto the GHL contact.
 */
export async function saveQuizProgress(token: string, answers: CleanQuizAnswers, tracking: Record<string, string>) {
  await ensureQuizSchema();
  const t = answers.text;
  const indexes = JSON.stringify(answers.indexes);
  const track = JSON.stringify(tracking);
  const rows = (await sql`
    INSERT INTO webinar_quiz_responses (
      token, answers, goal, level, permit, learning, exam, quiz_completed_at, tracking
    ) VALUES (
      ${token}, ${indexes}::jsonb, ${t.goal ?? null}, ${t.level ?? null}, ${t.permit ?? null},
      ${t.learning ?? null}, ${t.exam ?? null}, ${answers.complete ? new Date().toISOString() : null}, ${track}::jsonb
    )
    ON CONFLICT (token) DO UPDATE SET
      answers = EXCLUDED.answers,
      goal = EXCLUDED.goal,
      level = EXCLUDED.level,
      permit = EXCLUDED.permit,
      learning = EXCLUDED.learning,
      exam = EXCLUDED.exam,
      quiz_completed_at = CASE
        WHEN ${answers.complete}::boolean THEN COALESCE(webinar_quiz_responses.quiz_completed_at, NOW())
        ELSE NULL END,
      updated_at = NOW()
    WHERE webinar_quiz_responses.registered_at IS NULL
    RETURNING id`) as unknown as { id: number }[];
  return rows[0]?.id ?? null;
}

export type QuizContact = { firstName: string; lastName: string; email: string; phone: string };

/**
 * Attach the registration to the visit. Only once per token, and only after
 * every question has an answer, so a stray message cannot overwrite a row.
 */
export async function markQuizRegistered(token: string, contact: QuizContact) {
  await ensureQuizSchema();
  const rows = (await sql`
    UPDATE webinar_quiz_responses SET
      registered_at = NOW(),
      first_name = ${contact.firstName || null},
      last_name = ${contact.lastName || null},
      email = ${contact.email},
      phone = ${contact.phone || null},
      ghl_status = 'pending',
      updated_at = NOW()
    WHERE token = ${token}
      AND registered_at IS NULL
      AND quiz_completed_at IS NOT NULL
    RETURNING id`) as unknown as { id: number }[];
  return rows[0]?.id ?? null;
}

/**
 * Take one row for a CRM attempt. The one-minute gap stops two requests from
 * working on the same row at once, and spaces out the retries.
 *
 * `immediate` is for the registration request's own short retry loop: it skips
 * the gap, but only takes a row that nobody is working on now.
 */
export async function claimQuizGhlSync(id: number, immediate = false) {
  await ensureQuizSchema();
  if (immediate) {
    const rows = (await sql`
      UPDATE webinar_quiz_responses SET
        ghl_status = 'syncing',
        ghl_attempts = ghl_attempts + 1,
        ghl_last_attempt_at = NOW(),
        updated_at = NOW()
      WHERE id = ${id}
        AND registered_at IS NOT NULL
        AND ghl_status = 'pending'
        AND ghl_attempts < ${MAX_GHL_ATTEMPTS}
      RETURNING *`) as unknown as QuizRow[];
    return rows[0] ?? null;
  }
  const rows = (await sql`
    UPDATE webinar_quiz_responses SET
      ghl_status = 'syncing',
      ghl_attempts = ghl_attempts + 1,
      ghl_last_attempt_at = NOW(),
      updated_at = NOW()
    WHERE id = ${id}
      AND registered_at IS NOT NULL
      AND ghl_status IN ('pending', 'failed', 'syncing')
      AND ghl_attempts < ${MAX_GHL_ATTEMPTS}
      AND (ghl_last_attempt_at IS NULL OR ghl_last_attempt_at < NOW() - INTERVAL '1 minute')
    RETURNING *`) as unknown as QuizRow[];
  return rows[0] ?? null;
}

export async function markQuizGhlSynced(id: number, contactId: string) {
  await sql`
    UPDATE webinar_quiz_responses SET
      ghl_status = 'synced', ghl_contact_id = ${contactId}, ghl_last_error = NULL,
      ghl_synced_at = NOW(), updated_at = NOW()
    WHERE id = ${id}`;
}

/** `final` stops all further retries for the row. */
export async function markQuizGhlFailed(id: number, message: string, final = false) {
  await sql`
    UPDATE webinar_quiz_responses SET
      ghl_status = CASE WHEN ${final}::boolean OR ghl_attempts >= ${MAX_GHL_ATTEMPTS} THEN 'failed' ELSE 'pending' END,
      ghl_last_error = ${message.slice(0, 300)}, updated_at = NOW()
    WHERE id = ${id}`;
}

/** Rows that still owe GHL a note, newest first, for the retry on admin load. */
export async function quizRowsAwaitingGhl(limit = 5) {
  await ensureQuizSchema();
  const rows = (await sql`
    SELECT id FROM webinar_quiz_responses
    WHERE registered_at IS NOT NULL
      AND ghl_status IN ('pending', 'syncing')
      AND ghl_attempts < ${MAX_GHL_ATTEMPTS}
      AND (ghl_last_attempt_at IS NULL OR ghl_last_attempt_at < NOW() - INTERVAL '1 minute')
    ORDER BY registered_at DESC
    LIMIT ${limit}`) as unknown as { id: number }[];
  return rows.map((r) => r.id);
}

export async function listQuizRows(limit = 1000) {
  await ensureQuizSchema();
  return (await sql`
    SELECT * FROM webinar_quiz_responses
    ORDER BY created_at DESC
    LIMIT ${limit}`) as unknown as QuizRow[];
}
