/**
 * Student support tickets — data layer.
 *
 * Runs on Neon Postgres (free plan, reached through the Vercel marketplace).
 * Everything lives in Postgres including the screenshots, stored as BYTEA.
 *
 * Why images are in the database rather than blob storage: blob storage is
 * metered and would eventually bill. Screenshots are compressed to WebP in the
 * student's browser before they are ever uploaded, so a 3 MB screen capture
 * arrives at roughly 100-200 KB. Combined with STORAGE_CEILING_BYTES
 * below, this cannot grow into a charge.
 */

import 'server-only';
import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import { STATUSES, STATUS_LABELS, type Status } from './constants';

export * from './constants';

/**
 * The driver is created on first use, not at import time. A missing
 * DATABASE_URL should surface as a handled request error, not blow up the
 * whole route bundle the moment anything imports this file.
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

/** Tagged-template passthrough so query sites stay `sql\`...\``. */
const sql: NeonQueryFunction<false, false> = ((strings: TemplateStringsArray, ...values: unknown[]) =>
  (db() as unknown as (s: TemplateStringsArray, ...v: unknown[]) => unknown)(strings, ...values)) as never;

export type Ticket = {
  id: number;
  ref: string;
  student_name: string;
  student_email: string;
  student_phone: string | null;
  course: string | null;
  category: string;
  subject: string;
  description: string;
  status: Status;
  priority: 'normal' | 'high';
  assigned_to: number | null;
  assignee_name?: string | null;
  resolver_name?: string | null;
  resolution_note: string | null;
  resolved_at: string | null;
  resolved_by: number | null;
  created_at: string;
  updated_at: string;
  version: number;
  attachment_count?: number;
};

export type StaffUser = {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'agent';
  active: boolean;
  must_change: boolean;
  created_at: string;
  last_login_at: string | null;
};

// --- schema ----------------------------------------------------------------

let ready: Promise<void> | null = null;

/**
 * Creates the schema if it is not there. Idempotent and cached per warm
 * instance, so the cost is one round trip on a cold start and nothing after.
 */
export function ensureSchema(): Promise<void> {
  if (!ready) {
    ready = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS support_users (
          id            SERIAL PRIMARY KEY,
          email         TEXT NOT NULL UNIQUE,
          name          TEXT NOT NULL,
          password_hash TEXT NOT NULL,
          role          TEXT NOT NULL DEFAULT 'agent',
          active        BOOLEAN NOT NULL DEFAULT TRUE,
          must_change   BOOLEAN NOT NULL DEFAULT TRUE,
          created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          last_login_at TIMESTAMPTZ
        )`;

      await sql`
        CREATE TABLE IF NOT EXISTS support_sessions (
          token      TEXT PRIMARY KEY,
          user_id    INTEGER NOT NULL REFERENCES support_users(id) ON DELETE CASCADE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          expires_at TIMESTAMPTZ NOT NULL
        )`;

      await sql`
        CREATE TABLE IF NOT EXISTS support_tickets (
          id                 SERIAL PRIMARY KEY,
          ref                TEXT UNIQUE,
          student_name       TEXT NOT NULL,
          student_email      TEXT NOT NULL,
          student_phone      TEXT,
          course             TEXT,
          category           TEXT NOT NULL,
          subject            TEXT NOT NULL,
          description        TEXT NOT NULL,
          status             TEXT NOT NULL DEFAULT 'new',
          priority           TEXT NOT NULL DEFAULT 'normal',
          assigned_to        INTEGER REFERENCES support_users(id) ON DELETE SET NULL,
          resolution_note    TEXT,
          resolved_at        TIMESTAMPTZ,
          resolved_by        INTEGER REFERENCES support_users(id) ON DELETE SET NULL,
          ip_hash            TEXT,
          ghl_contact_id     TEXT,
          ghl_opportunity_id TEXT,
          ghl_synced_at      TIMESTAMPTZ,
          version            BIGINT NOT NULL DEFAULT 1,
          created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )`;

      // Added after the table shipped. Checked first because ALTER TABLE takes
      // ACCESS EXCLUSIVE even when it is a no-op, and every cold start running
      // that can queue behind an upload and stall live reads.
      const hasVersion = (await sql`
        SELECT 1 FROM information_schema.columns
         WHERE table_name = 'support_tickets' AND column_name = 'version'`) as any[];
      if (!hasVersion.length) {
        await sql`ALTER TABLE support_tickets ADD COLUMN version BIGINT NOT NULL DEFAULT 1`;
      }

      await sql`
        CREATE TABLE IF NOT EXISTS support_attachments (
          id            SERIAL PRIMARY KEY,
          ticket_id     INTEGER NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
          original_name TEXT,
          mime          TEXT NOT NULL,
          bytes         INTEGER NOT NULL,
          sha256        TEXT,
          data          BYTEA NOT NULL,
          created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )`;

      await sql`
        CREATE TABLE IF NOT EXISTS support_events (
          id         SERIAL PRIMARY KEY,
          ticket_id  INTEGER NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
          user_id    INTEGER REFERENCES support_users(id) ON DELETE SET NULL,
          type       TEXT NOT NULL,
          body       TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )`;

      // Queued for GoHighLevel. Nothing drains it yet, by design.
      await sql`
        CREATE TABLE IF NOT EXISTS support_outbox (
          id         SERIAL PRIMARY KEY,
          ticket_id  INTEGER REFERENCES support_tickets(id) ON DELETE CASCADE,
          event      TEXT NOT NULL,
          payload    JSONB NOT NULL,
          status     TEXT NOT NULL DEFAULT 'pending',
          attempts   INTEGER NOT NULL DEFAULT 0,
          last_error TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          sent_at    TIMESTAMPTZ
        )`;

      // Sign-in throttle. Serverless instances are not shared, so the counter
      // has to live in the database or it resets on every cold start.
      // One row, one primary key. Whoever inserts it owns the first admin slot.
      await sql`
        CREATE TABLE IF NOT EXISTS support_bootstrap (
          id         INTEGER PRIMARY KEY,
          claimed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )`;

      await sql`
        CREATE TABLE IF NOT EXISTS support_login_attempts (
          key         TEXT PRIMARY KEY,
          fails       INTEGER NOT NULL DEFAULT 0,
          locked_until TIMESTAMPTZ,
          updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )`;

      await sql`CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON support_tickets(status)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_support_tickets_created ON support_tickets(created_at DESC)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_support_attachments_ticket ON support_attachments(ticket_id)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_support_events_ticket ON support_events(ticket_id, id)`;
    })().catch((err) => {
      ready = null; // let the next request retry rather than caching a failure
      throw err;
    });
  }
  return ready;
}

// --- storage accounting ----------------------------------------------------

export async function storageUsed(): Promise<number> {
  await ensureSchema();
  const rows = (await sql`SELECT COALESCE(SUM(bytes), 0)::bigint AS total FROM support_attachments`) as any[];
  return Number(rows[0]?.total ?? 0);
}

// --- tickets ---------------------------------------------------------------

export type NewTicket = {
  student_name: string;
  student_email: string;
  student_phone?: string | null;
  course?: string | null;
  category: string;
  subject: string;
  description: string;
  ip_hash?: string | null;
};

export type NewAttachment = {
  original_name: string;
  mime: string;
  bytes: number;
  sha256: string;
  data: Buffer;
};

/**
 * Writes the ticket, its screenshots, the opening history entry and the
 * GoHighLevel queue record in ONE statement. Either the student's whole
 * submission lands or none of it does.
 *
 * Two things this deliberately avoids:
 *   - Data-modifying CTEs cannot see each other's table changes, so the id and
 *     the FRN reference are both produced up front from the sequence rather
 *     than by inserting and then updating.
 *   - The screenshots are inserted from the same statement via unnest, not in a
 *     follow-up round trip that could fail and strand a ticket with no proof.
 *
 * Image bytes travel as base64 text and are decoded in SQL, which is the one
 * shape the HTTP driver serialises reliably for a bytea array.
 *
 * The rate and storage guards are evaluated in the same statement as the
 * insert. What that buys, precisely: no window between approving a submission
 * and writing it, so a guard can never approve something the insert then fails
 * to record, or vice versa.
 *
 * What it does NOT buy: cross-request serialisation. Every CTE here shares one
 * snapshot, so two submissions arriving together can both read the same
 * pre-insert totals and both pass. An advisory lock was tried and removed,
 * because the snapshot is taken before the lock is acquired and so the queued
 * request still reads stale counts - it looked safe without being safe.
 *
 * That residual race is accepted deliberately. The overshoot is bounded by
 * (concurrent submissions x 1.2 MB), against 212 MB of headroom between this
 * 300 MB ceiling and the plan's 512 MB limit. Exhausting it would take about
 * 176 simultaneous maximum-size uploads to a language school's support form.
 * If this ever becomes a busy queue, replace the SUM with a counter row
 * updated conditionally - an UPDATE re-checks its WHERE after waiting, which
 * a CTE read does not.
 */
export async function createTicket(
  input: NewTicket,
  files: NewAttachment[],
  guards: { rateWindowMin: number; rateMax: number; storageCeiling: number }
): Promise<{ id: number; ref: string } | { refused: 'rate' | 'storage' }> {
  await ensureSchema();

  const names = files.map((f) => f.original_name);
  const mimes = files.map((f) => f.mime);
  const sizes = files.map((f) => f.bytes);
  const hashes = files.map((f) => f.sha256);
  const datas = files.map((f) => f.data.toString('base64'));
  const incoming = sizes.reduce((n, b) => n + b, 0);

  const rows = (await sql`
    WITH guard AS (
      SELECT
        (SELECT COUNT(*) FROM support_tickets
          WHERE ip_hash = ${input.ip_hash ?? null}
            AND created_at > NOW() - (${guards.rateWindowMin} * INTERVAL '1 minute')) AS recent,
        (SELECT COALESCE(SUM(bytes), 0) FROM support_attachments) AS used
    ), allowed AS (
      SELECT nextval(pg_get_serial_sequence('support_tickets', 'id')) AS id
        FROM guard
       WHERE guard.recent < ${guards.rateMax}
         AND guard.used + ${incoming} <= ${guards.storageCeiling}
    ), ins AS (
      INSERT INTO support_tickets
        (id, ref, student_name, student_email, student_phone, course, category,
         subject, description, ip_hash)
      SELECT a.id,
             'FRN-' || LPAD(a.id::text, GREATEST(5, LENGTH(a.id::text)), '0'),
             ${input.student_name}, ${input.student_email}, ${input.student_phone ?? null},
             ${input.course ?? null}, ${input.category}, ${input.subject},
             ${input.description}, ${input.ip_hash ?? null}
        FROM allowed a
      RETURNING id, ref
    ), att AS (
      INSERT INTO support_attachments (ticket_id, original_name, mime, bytes, sha256, data)
      SELECT i.id, f.name, f.mime, f.bytes, f.sha, decode(f.b64, 'base64')
        FROM ins i,
             unnest(${names}::text[], ${mimes}::text[], ${sizes}::int[],
                    ${hashes}::text[], ${datas}::text[]) AS f(name, mime, bytes, sha, b64)
      RETURNING 1
    ), ev AS (
      INSERT INTO support_events (ticket_id, type, body)
      SELECT id, 'created', 'Ticket raised by the student through the support form.' FROM ins
      RETURNING 1
    ), ob AS (
      INSERT INTO support_outbox (ticket_id, event, payload)
      SELECT i.id, 'ticket.created', jsonb_build_object(
        'ref', i.ref, 'name', ${input.student_name}::text, 'email', ${input.student_email}::text,
        'phone', ${input.student_phone ?? null}::text, 'category', ${input.category}::text,
        'subject', ${input.subject}::text)
      FROM ins i
      RETURNING 1
    )
    SELECT id, ref, (SELECT recent FROM guard) AS recent, (SELECT used FROM guard) AS used
      FROM ins
  `) as any[];

  if (!rows.length) {
    // The guard refused. Work out which limit so the student gets the right message.
    const why = (await sql`
      SELECT (SELECT COUNT(*) FROM support_tickets
               WHERE ip_hash = ${input.ip_hash ?? null}
                 AND created_at > NOW() - (${guards.rateWindowMin} * INTERVAL '1 minute')) AS recent,
             (SELECT COALESCE(SUM(bytes), 0) FROM support_attachments) AS used`) as any[];
    return { refused: Number(why[0]?.recent ?? 0) >= guards.rateMax ? 'rate' : 'storage' };
  }

  return { id: Number(rows[0].id), ref: String(rows[0].ref) };
}

/** True when the reference belongs to a real ticket. Used by the receipt page. */
export async function refExists(ref: string) {
  await ensureSchema();
  const rows = (await sql`SELECT 1 FROM support_tickets WHERE ref = ${ref} LIMIT 1`) as any[];
  return rows.length > 0;
}

/** Housekeeping. Cheap, and keeps the free plan's storage honest. */
export async function purgeExpired() {
  await ensureSchema();
  await sql`DELETE FROM support_sessions WHERE expires_at <= NOW()`;
  await sql`DELETE FROM support_login_attempts WHERE updated_at < NOW() - INTERVAL '1 day'`;
}

/**
 * Housekeeping without a cron. Roughly one queue load in twenty does the
 * cleanup, which on a desk this size is several times a day and costs nothing
 * the rest of the time.
 *
 * Awaited by the caller rather than fired and forgotten: a serverless
 * invocation can be frozen the instant the response is sent, which would leave
 * the deletes half done. Failures are swallowed, since tidying is never worth
 * failing a page load over.
 */
export async function purgeOccasionally() {
  if (Math.random() >= 0.05) return;
  try {
    await purgeExpired();
  } catch (e) {
    console.error('[purgeExpired]', e);
  }
}

// --- sign-in throttle ------------------------------------------------------

const LOCK_AFTER = 6;
const LOCK_MINUTES = 15;

/**
 * Reserves one sign-in attempt.
 *
 * Counting up front rather than only on failure is what makes this safe: a
 * separate "am I locked?" read followed by a later "record a failure" write
 * lets a burst of parallel guesses all pass the gate before any of them
 * increments. Here the increment IS the check, in one statement, so the
 * seventh concurrent request is refused even if all seven arrive together.
 *
 * Returns 0 when the caller may proceed, otherwise seconds until it can.
 */
export async function reserveLoginAttempt(key: string): Promise<number> {
  await ensureSchema();
  const rows = (await sql`
    INSERT INTO support_login_attempts (key, fails, updated_at)
    VALUES (${key}, 1, NOW())
    ON CONFLICT (key) DO UPDATE SET
      -- One counter drives both columns, and a served lock or an idle hour
      -- resets it. Without the reset, fails stays at the threshold and every
      -- attempt after the cooldown relocks immediately: a permanent lockout
      -- wearing a fifteen minute label.
      fails = CASE
        WHEN support_login_attempts.locked_until > NOW() THEN support_login_attempts.fails
        WHEN support_login_attempts.locked_until IS NOT NULL
          OR support_login_attempts.updated_at < NOW() - INTERVAL '1 hour' THEN 1
        ELSE support_login_attempts.fails + 1
      END,
      locked_until = CASE
        WHEN support_login_attempts.locked_until > NOW() THEN support_login_attempts.locked_until
        WHEN support_login_attempts.locked_until IS NOT NULL
          OR support_login_attempts.updated_at < NOW() - INTERVAL '1 hour' THEN NULL
        WHEN support_login_attempts.fails + 1 >= ${LOCK_AFTER}
          THEN NOW() + (${LOCK_MINUTES} * INTERVAL '1 minute')
        ELSE NULL
      END,
      updated_at = NOW()
    RETURNING COALESCE(GREATEST(0, CEIL(EXTRACT(EPOCH FROM (locked_until - NOW())))), 0)::int AS secs`) as any[];
  return rows[0]?.secs ?? 0;
}

export async function clearLoginFailures(key: string) {
  await sql`DELETE FROM support_login_attempts WHERE key = ${key}`;
}

/**
 * Creates the first admin, but only if the table is still empty. The guard and
 * the insert are the same statement, so two people racing the setup screen
 * cannot both win. Returns null when someone already claimed it.
 */
export async function claimFirstAdminAtomic(u: { email: string; name: string; password_hash: string }) {
  await ensureSchema();
  // The claim hangs off a primary key, not a NOT EXISTS read. Two setup
  // requests arriving together both see an empty users table, so only a unique
  // constraint can actually pick a winner.
  const rows = (await sql`
    WITH claim AS (
      INSERT INTO support_bootstrap (id) VALUES (1)
      ON CONFLICT (id) DO NOTHING
      RETURNING id
    )
    INSERT INTO support_users (email, name, password_hash, role, must_change)
    SELECT ${u.email}, ${u.name}, ${u.password_hash}, 'admin', FALSE FROM claim
    RETURNING id`) as any[];
  return rows.length ? Number(rows[0].id) : null;
}

export async function listTickets(opts: { status?: string; q?: string; offset?: number; limit?: number } = {}) {
  await ensureSchema();
  const status = opts.status ?? 'open';
  const q = opts.q?.trim() ? `%${opts.q.trim()}%` : null;
  const limit = Math.min(Math.max(opts.limit ?? 50, 1), 200);
  const offset = Math.max(opts.offset ?? 0, 0);

  const rows = (await sql`
    SELECT t.*, u.name AS assignee_name,
           (SELECT COUNT(*) FROM support_attachments a WHERE a.ticket_id = t.id)::int AS attachment_count
      FROM support_tickets t
      LEFT JOIN support_users u ON u.id = t.assigned_to
     WHERE (${status} = 'all'
            OR (${status} = 'open' AND t.status <> 'resolved')
            OR t.status = ${status})
       AND (${q}::text IS NULL OR
            t.ref ILIKE ${q} OR t.student_name ILIKE ${q} OR t.student_email ILIKE ${q}
            OR t.student_phone ILIKE ${q} OR t.subject ILIKE ${q} OR t.description ILIKE ${q})
     ORDER BY CASE t.status WHEN 'new' THEN 0 WHEN 'in_progress' THEN 1
                            WHEN 'waiting_on_student' THEN 2 ELSE 3 END,
              CASE t.priority WHEN 'high' THEN 0 ELSE 1 END,
              t.created_at DESC, t.id DESC
     LIMIT ${limit + 1} OFFSET ${offset}
  `) as unknown as Ticket[];

  // One extra row is fetched purely to know whether a next page exists.
  return { rows: rows.slice(0, limit), hasMore: rows.length > limit, offset, limit };
}

export async function getTicket(id: number) {
  await ensureSchema();
  const rows = (await sql`
    SELECT t.*, u.name AS assignee_name, r.name AS resolver_name
      FROM support_tickets t
      LEFT JOIN support_users u ON u.id = t.assigned_to
      LEFT JOIN support_users r ON r.id = t.resolved_by
     WHERE t.id = ${id}`) as unknown as Ticket[];
  return rows[0] ?? null;
}

export async function getAttachmentMeta(ticketId: number) {
  await ensureSchema();
  return (await sql`
    SELECT id, original_name, mime, bytes FROM support_attachments
     WHERE ticket_id = ${ticketId} ORDER BY id`) as unknown as
    { id: number; original_name: string; mime: string; bytes: number }[];
}

export async function getAttachmentData(id: number) {
  await ensureSchema();
  const rows = (await sql`SELECT mime, original_name, data FROM support_attachments WHERE id = ${id}`) as any[];
  return rows[0] ?? null;
}

export async function getEvents(ticketId: number) {
  await ensureSchema();
  return (await sql`
    SELECT e.*, u.name AS user_name FROM support_events e
      LEFT JOIN support_users u ON u.id = e.user_id
     WHERE e.ticket_id = ${ticketId} ORDER BY e.id`) as unknown as
    { id: number; type: string; body: string | null; user_name: string | null; created_at: string }[];
}

export async function addEvent(ticketId: number, userId: number | null, type: string, body: string) {
  await sql`INSERT INTO support_events (ticket_id, user_id, type, body)
            VALUES (${ticketId}, ${userId}, ${type}, ${body})`;
}

export type UpdateResult =
  | { ok: true; ticket: Ticket }
  | { ok: false; reason: 'missing' | 'conflict' | 'bad_assignee' };

/**
 * Applies a staff edit in one statement: the ticket row, the resolved-by
 * bookkeeping and both history entries together.
 *
 * `expectedVersion` is the `updated_at` the form was rendered with. If someone
 * else has saved since, nothing is written and the caller gets a conflict
 * rather than silently clobbering their work.
 *
 * resolved_at / resolved_by are decided by CASE against the row's own current
 * status, so the four transitions each do the right thing in a single write:
 *   open  -> resolved   stamp now and the user who resolved it
 *   resolved -> open    clear both
 *   resolved -> resolved  keep whatever was already there
 *   open  -> open       stay null
 */
export async function updateTicket(
  id: number,
  userId: number,
  changes: {
    status?: string;
    priority?: string;
    assigned_to?: string;
    note?: string;
    resolution_note?: string;
    expectedVersion?: string;
  }
): Promise<UpdateResult> {
  await ensureSchema();

  const status = STATUSES.includes(changes.status as Status) ? (changes.status as Status) : null;
  const priority = changes.priority === 'high' ? 'high' : 'normal';
  const note = changes.note?.trim() || null;
  const resolution = changes.resolution_note ?? null;
  const version = Number(changes.expectedVersion);

  // A blank selection means "unassign". Anything else must resolve to a real,
  // still-active account, otherwise a stale or forged form would quietly
  // unassign the ticket and log it as a deliberate action.
  const wantsUnassigned = !changes.assigned_to;
  const assigned = wantsUnassigned ? null : Number(changes.assigned_to);
  if (!wantsUnassigned && !Number.isInteger(assigned)) return { ok: false, reason: 'bad_assignee' };
  if (assigned !== null) {
    const rows = (await sql`SELECT 1 FROM support_users WHERE id = ${assigned} AND active`) as any[];
    if (!rows.length) return { ok: false, reason: 'bad_assignee' };
  }
  if (!Number.isFinite(version)) return { ok: false, reason: 'conflict' };

  const rows = (await sql`
    WITH before AS (
      SELECT id, status, priority, assigned_to, updated_at FROM support_tickets WHERE id = ${id}
    ), target AS (
      SELECT u.id, u.name FROM support_users u WHERE u.id = ${assigned}
    ), upd AS (
      UPDATE support_tickets t SET
        status   = COALESCE(${status}, t.status),
        priority = ${priority},
        assigned_to = ${assigned},
        resolution_note = CASE
          WHEN ${resolution}::text IS NULL THEN t.resolution_note
          ELSE NULLIF(${resolution}, '')
        END,
        resolved_at = CASE
          WHEN COALESCE(${status}, t.status) = 'resolved' AND t.status <> 'resolved' THEN NOW()
          WHEN COALESCE(${status}, t.status) <> 'resolved' THEN NULL
          ELSE t.resolved_at
        END,
        resolved_by = CASE
          WHEN COALESCE(${status}, t.status) = 'resolved' AND t.status <> 'resolved' THEN ${userId}
          WHEN COALESCE(${status}, t.status) <> 'resolved' THEN NULL
          ELSE t.resolved_by
        END,
        updated_at = NOW(),
        version = t.version + 1
      FROM before b
      WHERE t.id = b.id
        -- Compare against the UPDATE target, not the snapshot alias. Postgres
        -- re-reads t after waiting on a concurrent writer; b would still hold
        -- this request's original view and would wave the clash through.
        AND t.version = ${version}
      RETURNING t.id, b.status AS old_status, b.priority AS old_priority, b.assigned_to AS old_assigned
    ), logged AS (
      INSERT INTO support_events (ticket_id, user_id, type, body)
      SELECT u.id, ${userId}, 'status_change', trim(BOTH ' .' FROM concat_ws('. ',
        CASE WHEN COALESCE(${status}, u.old_status) <> u.old_status
             THEN 'Status ' || ${status ? STATUS_LABELS[status] : ''} END,
        CASE WHEN ${priority} <> u.old_priority THEN 'Priority set to ' || ${priority} END,
        CASE WHEN ${assigned}::int IS DISTINCT FROM u.old_assigned
             THEN CASE WHEN ${assigned}::int IS NULL THEN 'Unassigned'
                       ELSE 'Assigned to ' || COALESCE((SELECT name FROM target), 'someone') END END
      ))
      FROM upd u
      WHERE COALESCE(${status}, u.old_status) <> u.old_status
         OR ${priority} <> u.old_priority
         OR ${assigned}::int IS DISTINCT FROM u.old_assigned
      RETURNING 1
    ), noted AS (
      INSERT INTO support_events (ticket_id, user_id, type, body)
      SELECT u.id, ${userId}, 'note', ${note} FROM upd u WHERE ${note}::text IS NOT NULL
      RETURNING 1
    )
    SELECT id FROM upd
  `) as any[];

  if (!rows.length) {
    const still = (await sql`SELECT 1 FROM support_tickets WHERE id = ${id}`) as any[];
    return { ok: false, reason: still.length ? 'conflict' : 'missing' };
  }

  const ticket = await getTicket(id);
  return ticket ? { ok: true, ticket } : { ok: false, reason: 'missing' };
}

export async function counts() {
  await ensureSchema();
  const rows = (await sql`SELECT status, COUNT(*)::int AS n FROM support_tickets GROUP BY status`) as any[];
  const out: Record<string, number> = { total: 0, new: 0, in_progress: 0, waiting_on_student: 0, resolved: 0, open: 0 };
  for (const r of rows) {
    out[r.status] = r.n;
    out.total += r.n;
  }
  out.open = out.total - out.resolved;
  return out;
}



// --- users and sessions ----------------------------------------------------

export async function listUsers() {
  await ensureSchema();
  return (await sql`
    SELECT id, email, name, role, active, must_change, created_at, last_login_at
      FROM support_users ORDER BY name`) as unknown as StaffUser[];
}

export async function listActiveUsers() {
  await ensureSchema();
  return (await sql`SELECT id, name FROM support_users WHERE active ORDER BY name`) as unknown as
    { id: number; name: string }[];
}

export async function getUserByEmail(email: string) {
  await ensureSchema();
  const rows = (await sql`SELECT * FROM support_users WHERE LOWER(email) = LOWER(${email})`) as any[];
  return rows[0] ?? null;
}

export async function getUserById(id: number) {
  await ensureSchema();
  const rows = (await sql`SELECT * FROM support_users WHERE id = ${id}`) as any[];
  return rows[0] ?? null;
}

export async function createUser(u: { email: string; name: string; password_hash: string; role: string }) {
  await ensureSchema();
  await sql`INSERT INTO support_users (email, name, password_hash, role)
            VALUES (${u.email}, ${u.name}, ${u.password_hash}, ${u.role})`;
}

export async function setPassword(id: number, hash: string, mustChange: boolean) {
  await sql`UPDATE support_users SET password_hash = ${hash}, must_change = ${mustChange} WHERE id = ${id}`;
}

/**
 * Changes the password AND kills every existing session in one statement.
 * Done as two calls there is a window where the password has changed but the
 * old sessions are still live, which is precisely the window a stolen starter
 * session would use.
 */
export async function setPasswordAndRevoke(
  id: number,
  hash: string,
  mustChange: boolean,
  expectedHash?: string
): Promise<boolean> {
  const rows = (await sql`
    WITH revoked AS (
      DELETE FROM support_sessions WHERE user_id = ${id} RETURNING 1
    )
    UPDATE support_users
       SET password_hash = ${hash}, must_change = ${mustChange}
     WHERE id = ${id}
       AND (${expectedHash ?? null}::text IS NULL OR password_hash = ${expectedHash ?? null})
    RETURNING id`) as any[];
  return rows.length > 0;
}

export async function setUserActive(id: number, active: boolean) {
  await sql`UPDATE support_users SET active = ${active} WHERE id = ${id}`;
}

export async function touchLogin(id: number) {
  await sql`UPDATE support_users SET last_login_at = NOW() WHERE id = ${id}`;
}

export async function createSession(token: string, userId: number, days: number) {
  await sql`INSERT INTO support_sessions (token, user_id, expires_at)
            VALUES (${token}, ${userId}, NOW() + (${days} * INTERVAL '1 day'))`;
}

export async function getSession(token: string) {
  await ensureSchema();
  const rows = (await sql`
    SELECT s.token, u.id, u.email, u.name, u.role, u.active, u.must_change
      FROM support_sessions s JOIN support_users u ON u.id = s.user_id
     WHERE s.token = ${token} AND s.expires_at > NOW()`) as any[];
  return rows[0] ?? null;
}

export async function deleteSession(token: string) {
  await sql`DELETE FROM support_sessions WHERE token = ${token}`;
}

export async function deleteUserSessions(userId: number) {
  await sql`DELETE FROM support_sessions WHERE user_id = ${userId}`;
}

export async function purgeExpiredSessions() {
  await sql`DELETE FROM support_sessions WHERE expires_at <= NOW()`;
}

/** True when there are no accounts yet, which unlocks first-admin setup. */
export async function isUnclaimed() {
  await ensureSchema();
  const rows = (await sql`SELECT COUNT(*)::int AS n FROM support_users`) as any[];
  return (rows[0]?.n ?? 0) === 0;
}
