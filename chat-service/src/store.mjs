import { createHash, randomBytes, randomUUID } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const hashToken = (token) => createHash('sha256').update(String(token)).digest('hex');

export class ChatStore {
  constructor(dataDir, filename = 'chat.sqlite') {
    mkdirSync(dataDir, { recursive: true });
    this.db = new DatabaseSync(path.join(dataDir, filename));
    this.db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;');
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS chat_sessions (
        id TEXT PRIMARY KEY,
        token_hash TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        ip_hash TEXT,
        codex_thread_id TEXT,
        knowledge_hash TEXT,
        suggested_category TEXT,
        suggested_subject TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS chat_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
        role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
        content TEXT NOT NULL,
        metadata_json TEXT,
        created_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON chat_messages(session_id, id);
      CREATE TABLE IF NOT EXISTS chat_tickets (
        request_id TEXT PRIMARY KEY,
        session_id TEXT NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
        ticket_ref TEXT,
        status TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS chat_rate (
        bucket TEXT NOT NULL,
        window_start INTEGER NOT NULL,
        count INTEGER NOT NULL,
        PRIMARY KEY (bucket, window_start)
      );
      CREATE TABLE IF NOT EXISTS chat_lead_outbox (
        session_id TEXT PRIMARY KEY REFERENCES chat_sessions(id) ON DELETE CASCADE,
        attempts INTEGER NOT NULL DEFAULT 0,
        next_attempt_at INTEGER NOT NULL DEFAULT 0,
        delivered_at TEXT
      );
    `);
    // Additive migration preserves existing conversations and rollback compatibility.
    if (!this.db.prepare('PRAGMA table_info(chat_sessions)').all().some((column) => column.name === 'phone')) {
      this.db.exec('ALTER TABLE chat_sessions ADD COLUMN phone TEXT');
    }
  }

  createSession({ name, email, phone, ipHash }) {
    const id = randomUUID();
    const token = randomBytes(32).toString('base64url');
    const now = new Date().toISOString();
    this.db.exec('BEGIN IMMEDIATE');
    try {
      this.db.prepare(`INSERT INTO chat_sessions
        (id, token_hash, name, email, phone, ip_hash, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
        .run(id, hashToken(token), name, email, phone, ipHash || null, now, now);
      this.db.prepare('INSERT INTO chat_lead_outbox (session_id) VALUES (?)').run(id);
      this.db.exec('COMMIT');
    } catch (error) {
      this.db.exec('ROLLBACK');
      throw error;
    }
    return { id, token, name, email, phone };
  }

  pendingLeads(now = Date.now(), limit = 20) {
    return this.db.prepare(`SELECT s.id, s.name, s.email, s.phone, q.attempts
      FROM chat_lead_outbox q JOIN chat_sessions s ON s.id = q.session_id
      WHERE q.delivered_at IS NULL AND q.next_attempt_at <= ?
      ORDER BY q.next_attempt_at, s.created_at LIMIT ?`).all(now, limit);
  }

  completeLead(sessionId) {
    this.db.prepare('UPDATE chat_lead_outbox SET delivered_at = ? WHERE session_id = ?')
      .run(new Date().toISOString(), sessionId);
  }

  retryLead(sessionId, attempts, now = Date.now()) {
    const delay = Math.min(3_600_000, 30_000 * 2 ** Math.min(attempts, 7));
    this.db.prepare(`UPDATE chat_lead_outbox SET attempts = attempts + 1, next_attempt_at = ?
      WHERE session_id = ?`).run(now + delay, sessionId);
  }

  sessionByToken(token) {
    if (!token) return null;
    return this.db.prepare('SELECT * FROM chat_sessions WHERE token_hash = ?').get(hashToken(token)) || null;
  }

  addMessage(sessionId, role, content, metadata = null) {
    const now = new Date().toISOString();
    this.db
      .prepare(`INSERT INTO chat_messages (session_id, role, content, metadata_json, created_at)
                VALUES (?, ?, ?, ?, ?)`)
      .run(sessionId, role, content, metadata ? JSON.stringify(metadata) : null, now);
    this.db.prepare('UPDATE chat_sessions SET updated_at = ? WHERE id = ?').run(now, sessionId);
  }

  messages(sessionId, limit = 12) {
    return this.db
      .prepare(`SELECT role, content, metadata_json, created_at FROM (
          SELECT id, role, content, metadata_json, created_at
            FROM chat_messages WHERE session_id = ? ORDER BY id DESC LIMIT ?
        ) ORDER BY id ASC`)
      .all(sessionId, limit);
  }

  userMessageCount(sessionId) {
    const row = this.db
      .prepare("SELECT COUNT(*) AS count FROM chat_messages WHERE session_id = ? AND role = 'user'")
      .get(sessionId);
    return Number(row?.count ?? 0);
  }

  setAgentState(sessionId, { threadId, knowledgeHash, category, subject }) {
    this.db
      .prepare(`UPDATE chat_sessions
          SET codex_thread_id = ?, knowledge_hash = ?, suggested_category = ?,
              suggested_subject = ?, updated_at = ?
        WHERE id = ?`)
      .run(threadId, knowledgeHash, category, subject, new Date().toISOString(), sessionId);
  }

  consumeRate(bucket, max, windowSeconds) {
    const windowStart = Math.floor(Date.now() / 1000 / windowSeconds) * windowSeconds;
    this.db
      .prepare(`INSERT INTO chat_rate (bucket, window_start, count) VALUES (?, ?, 1)
        ON CONFLICT(bucket, window_start) DO UPDATE SET count = count + 1`)
      .run(bucket, windowStart);
    const row = this.db
      .prepare('SELECT count FROM chat_rate WHERE bucket = ? AND window_start = ?')
      .get(bucket, windowStart);
    if (Math.random() < 0.02) {
      this.db.prepare('DELETE FROM chat_rate WHERE window_start < ?').run(windowStart - 86_400);
    }
    return Number(row.count) <= max;
  }

  ticket(requestId) {
    return this.db.prepare('SELECT * FROM chat_tickets WHERE request_id = ?').get(requestId) || null;
  }

  reserveTicket(requestId, sessionId) {
    const now = new Date().toISOString();
    this.db
      .prepare(`INSERT OR IGNORE INTO chat_tickets
        (request_id, session_id, status, created_at, updated_at) VALUES (?, ?, 'pending', ?, ?)`)
      .run(requestId, sessionId, now, now);
    return this.ticket(requestId);
  }

  completeTicket(requestId, ref) {
    this.db
      .prepare(`UPDATE chat_tickets SET status = 'sent', ticket_ref = ?, updated_at = ? WHERE request_id = ?`)
      .run(ref, new Date().toISOString(), requestId);
  }

  failTicket(requestId) {
    this.db
      .prepare(`UPDATE chat_tickets SET status = 'failed', updated_at = ? WHERE request_id = ?`)
      .run(new Date().toISOString(), requestId);
  }

  close() {
    this.db.close();
  }
}
