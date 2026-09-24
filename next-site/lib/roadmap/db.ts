import 'server-only';

import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import type { FrenchPlanAnswers, FrenchPlanRecommendation } from '@/lib/french-plan';
import type { RoadmapSubmission } from './validation';

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

export type RoadmapAccount = {
  id: number;
  email: string;
  full_name: string;
  phone: string;
  country_timezone: string;
  password_hash: string;
  marketing_consent: boolean;
  marketing_consent_at: string | null;
  latest_answers: FrenchPlanAnswers;
  recommended_program: string;
  ghl_contact_id: string | null;
  ghl_status: 'pending' | 'syncing' | 'synced';
  ghl_enrolled_at: string | null;
  ghl_last_attempt_at: string | null;
  created_at: string;
  updated_at: string;
};

let ready: Promise<void> | null = null;

/** Idempotent schema creation, paid once per warm serverless instance. */
export function ensureRoadmapSchema(): Promise<void> {
  if (!ready) {
    ready = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS roadmap_accounts (
          id                         BIGSERIAL PRIMARY KEY,
          email                      TEXT NOT NULL UNIQUE,
          full_name                  TEXT NOT NULL,
          phone                      TEXT NOT NULL,
          country_timezone           TEXT NOT NULL,
          password_hash              TEXT NOT NULL,
          marketing_consent          BOOLEAN NOT NULL DEFAULT FALSE,
          marketing_consent_at       TIMESTAMPTZ,
          marketing_consent_version  TEXT,
          marketing_consent_text     TEXT,
          marketing_consent_ip_hash  TEXT,
          latest_answers             JSONB NOT NULL,
          recommended_program        TEXT NOT NULL,
          ghl_contact_id             TEXT,
          ghl_status                 TEXT NOT NULL DEFAULT 'pending',
          ghl_last_error             TEXT,
          ghl_last_attempt_at        TIMESTAMPTZ,
          ghl_synced_at              TIMESTAMPTZ,
          ghl_enrolled_at            TIMESTAMPTZ,
          created_at                 TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at                 TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          last_login_at              TIMESTAMPTZ
        )`;

      await sql`
        CREATE TABLE IF NOT EXISTS roadmap_sessions (
          token_hash  TEXT PRIMARY KEY,
          account_id  BIGINT NOT NULL REFERENCES roadmap_accounts(id) ON DELETE CASCADE,
          created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          expires_at  TIMESTAMPTZ NOT NULL
        )`;

      await sql`
        CREATE TABLE IF NOT EXISTS roadmap_login_attempts (
          key          TEXT PRIMARY KEY,
          fails        INTEGER NOT NULL DEFAULT 0,
          locked_until TIMESTAMPTZ,
          window_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )`;

      await sql`CREATE INDEX IF NOT EXISTS idx_roadmap_sessions_account ON roadmap_sessions(account_id)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_roadmap_sessions_expiry ON roadmap_sessions(expires_at)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_roadmap_accounts_crm ON roadmap_accounts(ghl_status, ghl_last_attempt_at)`;
    })().catch((error) => {
      ready = null;
      throw error;
    });
  }
  return ready;
}

export async function getAccountByEmail(email: string) {
  await ensureRoadmapSchema();
  const rows = (await sql`SELECT * FROM roadmap_accounts WHERE email = ${email}`) as unknown as RoadmapAccount[];
  return rows[0] ?? null;
}

export async function createAccount(
  input: RoadmapSubmission,
  passwordHash: string,
  recommendation: FrenchPlanRecommendation,
  consent: { version: string; text: string; ipHash: string },
) {
  await ensureRoadmapSchema();
  const answers = JSON.stringify(input.answers);
  const rows = (await sql`
    INSERT INTO roadmap_accounts (
      email, full_name, phone, country_timezone, password_hash,
      marketing_consent, marketing_consent_at, marketing_consent_version,
      marketing_consent_text, marketing_consent_ip_hash,
      latest_answers, recommended_program
    ) VALUES (
      ${input.email}, ${input.fullName}, ${input.phone}, ${input.countryTimezone}, ${passwordHash},
      ${input.marketingConsent}, CASE WHEN ${input.marketingConsent} THEN NOW() ELSE NULL END,
      CASE WHEN ${input.marketingConsent} THEN ${consent.version} ELSE NULL END,
      CASE WHEN ${input.marketingConsent} THEN ${consent.text} ELSE NULL END,
      CASE WHEN ${input.marketingConsent} THEN ${consent.ipHash} ELSE NULL END,
      ${answers}::jsonb, ${recommendation.recommendedProgram}
    )
    ON CONFLICT (email) DO NOTHING
    RETURNING *`) as unknown as RoadmapAccount[];
  return rows[0] ?? null;
}

/**
 * Refreshes the plan after the password has been verified. Consent is sticky:
 * leaving the optional box unticked on a later quiz is not an unsubscribe.
 */
export async function updateAccountPlan(
  id: number,
  input: RoadmapSubmission,
  recommendation: FrenchPlanRecommendation,
  consent: { version: string; text: string; ipHash: string },
) {
  await ensureRoadmapSchema();
  const answers = JSON.stringify(input.answers);
  const rows = (await sql`
    UPDATE roadmap_accounts SET
      full_name = ${input.fullName},
      phone = ${input.phone},
      country_timezone = ${input.countryTimezone},
      latest_answers = ${answers}::jsonb,
      recommended_program = ${recommendation.recommendedProgram},
      marketing_consent = marketing_consent OR ${input.marketingConsent},
      marketing_consent_at = CASE
        WHEN ${input.marketingConsent} AND NOT marketing_consent THEN NOW()
        ELSE marketing_consent_at
      END,
      marketing_consent_version = CASE
        WHEN ${input.marketingConsent} AND NOT marketing_consent THEN ${consent.version}
        ELSE marketing_consent_version
      END,
      marketing_consent_text = CASE
        WHEN ${input.marketingConsent} AND NOT marketing_consent THEN ${consent.text}
        ELSE marketing_consent_text
      END,
      marketing_consent_ip_hash = CASE
        WHEN ${input.marketingConsent} AND NOT marketing_consent THEN ${consent.ipHash}
        ELSE marketing_consent_ip_hash
      END,
      ghl_status = 'pending',
      ghl_last_error = NULL,
      ghl_last_attempt_at = NULL,
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *`) as unknown as RoadmapAccount[];
  return rows[0] ?? null;
}

export async function createSession(tokenHash: string, accountId: number, days: number) {
  await ensureRoadmapSchema();
  await sql`DELETE FROM roadmap_sessions WHERE expires_at <= NOW()`;
  await sql`
    INSERT INTO roadmap_sessions (token_hash, account_id, expires_at)
    VALUES (${tokenHash}, ${accountId}, NOW() + (${days} * INTERVAL '1 day'))`;
}

export async function getAccountBySession(tokenHash: string) {
  await ensureRoadmapSchema();
  const rows = (await sql`
    SELECT a.* FROM roadmap_sessions s
      JOIN roadmap_accounts a ON a.id = s.account_id
     WHERE s.token_hash = ${tokenHash} AND s.expires_at > NOW()` ) as unknown as RoadmapAccount[];
  return rows[0] ?? null;
}

export async function deleteSession(tokenHash: string) {
  await ensureRoadmapSchema();
  await sql`DELETE FROM roadmap_sessions WHERE token_hash = ${tokenHash}`;
}

export async function touchLogin(id: number) {
  await ensureRoadmapSchema();
  await sql`UPDATE roadmap_accounts SET last_login_at = NOW() WHERE id = ${id}`;
}

/** Claims a pending sync so parallel requests cannot enroll the same lead. */
export async function claimCrmSync(id: number) {
  await ensureRoadmapSchema();
  const rows = (await sql`
    UPDATE roadmap_accounts SET ghl_status = 'syncing', ghl_last_attempt_at = NOW()
     WHERE id = ${id}
       AND ghl_status = 'pending'
       AND (ghl_last_attempt_at IS NULL OR ghl_last_attempt_at < NOW() - INTERVAL '5 minutes')
    RETURNING *`) as unknown as RoadmapAccount[];
  return rows[0] ?? null;
}

export async function markCrmSynced(id: number, contactId: string, enrolled: boolean) {
  await ensureRoadmapSchema();
  await sql`
    UPDATE roadmap_accounts SET
      ghl_contact_id = ${contactId},
      ghl_status = 'synced',
      ghl_last_error = NULL,
      ghl_synced_at = NOW(),
      ghl_enrolled_at = CASE WHEN ${enrolled} THEN COALESCE(ghl_enrolled_at, NOW()) ELSE ghl_enrolled_at END,
      updated_at = NOW()
    WHERE id = ${id}`;
}

export async function markCrmPending(id: number, message: string) {
  await ensureRoadmapSchema();
  await sql`
    UPDATE roadmap_accounts SET
      ghl_status = 'pending',
      ghl_last_error = ${message.slice(0, 500)},
      updated_at = NOW()
    WHERE id = ${id}`;
}

const LOCK_MINUTES = 15;

export async function reserveLoginAttempt(key: string, threshold = 6): Promise<number> {
  await ensureRoadmapSchema();
  const rows = (await sql`
    INSERT INTO roadmap_login_attempts (key, fails, updated_at)
    VALUES (${key}, 1, NOW())
    ON CONFLICT (key) DO UPDATE SET
      fails = CASE
        WHEN roadmap_login_attempts.locked_until > NOW() THEN roadmap_login_attempts.fails
        WHEN roadmap_login_attempts.locked_until IS NOT NULL
          OR roadmap_login_attempts.updated_at < NOW() - INTERVAL '1 hour' THEN 1
        ELSE roadmap_login_attempts.fails + 1
      END,
      locked_until = CASE
        WHEN roadmap_login_attempts.locked_until > NOW() THEN roadmap_login_attempts.locked_until
        WHEN roadmap_login_attempts.locked_until IS NOT NULL
          OR roadmap_login_attempts.updated_at < NOW() - INTERVAL '1 hour' THEN NULL
        WHEN roadmap_login_attempts.fails + 1 > ${threshold}
          THEN NOW() + (${LOCK_MINUTES} * INTERVAL '1 minute')
        ELSE NULL
      END,
      updated_at = NOW()
    RETURNING COALESCE(GREATEST(0, CEIL(EXTRACT(EPOCH FROM (locked_until - NOW())))), 0)::int AS secs`
  ) as unknown as { secs: number }[];
  return Number(rows[0]?.secs ?? 0);
}

export async function clearLoginAttempt(key: string) {
  await ensureRoadmapSchema();
  await sql`DELETE FROM roadmap_login_attempts WHERE key = ${key}`;
}

export async function reserveIpAttempt(key: string, threshold = 40) {
  await ensureRoadmapSchema();
  const rows = (await sql`
    INSERT INTO roadmap_login_attempts (key, fails, window_start, updated_at)
    VALUES (${key}, 1, NOW(), NOW())
    ON CONFLICT (key) DO UPDATE SET
      fails = CASE
        WHEN roadmap_login_attempts.window_start < NOW() - (${LOCK_MINUTES} * INTERVAL '1 minute') THEN 1
        ELSE roadmap_login_attempts.fails + 1
      END,
      window_start = CASE
        WHEN roadmap_login_attempts.window_start < NOW() - (${LOCK_MINUTES} * INTERVAL '1 minute') THEN NOW()
        ELSE roadmap_login_attempts.window_start
      END,
      updated_at = NOW()
    RETURNING fails`) as unknown as { fails: number }[];
  return Number(rows[0]?.fails ?? 0) <= threshold;
}

export async function releaseIpAttempt(key: string) {
  await ensureRoadmapSchema();
  await sql`UPDATE roadmap_login_attempts SET fails = GREATEST(0, fails - 1) WHERE key = ${key}`;
}
