import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';
import { ChatStore } from '../src/store.mjs';
import { LeadDelivery } from '../src/leads.mjs';
import { normalizePhone } from '../src/phone.mjs';

test('normalizes international phone numbers without assuming a country', () => {
  assert.equal(normalizePhone('+1 (514) 555-0123'), '+15145550123');
  assert.equal(normalizePhone('0091 98765 43210'), '+919876543210');
  assert.equal(normalizePhone('9876543210'), null);
  assert.equal(normalizePhone('+91-abc-9876543210'), null);
  assert.equal(normalizePhone(15145550123), null);
  assert.equal(normalizePhone('+1234567890123456'), null);
});

test('migrates an existing database and retries leads across restart without resending delivered leads', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'frenchify-leads-'));
  let store;
  try {
    const legacy = new DatabaseSync(path.join(dir, 'chat.sqlite'));
    legacy.exec(`CREATE TABLE chat_sessions (
      id TEXT PRIMARY KEY, token_hash TEXT NOT NULL UNIQUE, name TEXT NOT NULL,
      email TEXT NOT NULL, ip_hash TEXT, codex_thread_id TEXT, knowledge_hash TEXT,
      suggested_category TEXT, suggested_subject TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
    ); INSERT INTO chat_sessions (id, token_hash, name, email, created_at, updated_at)
      VALUES ('legacy', 'legacy-hash', 'Existing visitor', 'existing@example.com', '2026-09-01', '2026-09-01');`);
    legacy.close();
    store = new ChatStore(dir);
    assert.equal(store.db.prepare('SELECT name, phone FROM chat_sessions WHERE id = ?').get('legacy').phone, null);
    assert.equal(store.pendingLeads().length, 0, 'does not backfill legacy visitors');
    const session = store.createSession({ name: 'Test Lead', email: 'test@example.com', phone: '+15145550123' });
    const config = { ticketIngestUrl: 'https://frenchifywithvyom.com/api/support/chat-ticket', ticketSecret: 's'.repeat(40) };
    const failed = new LeadDelivery(config, store, async () => new Response('{}', { status: 503 }));
    await failed.flush();
    assert.equal(store.pendingLeads().length, 0, 'waits for backoff');
    assert.equal(store.pendingLeads(Date.now() + 31_000)[0].attempts, 1);
    store.close();
    store = new ChatStore(dir);
    assert.equal(store.pendingLeads(Date.now() + 31_000).length, 1, 'queue survives restart');
    store.db.prepare('UPDATE chat_lead_outbox SET next_attempt_at = 0 WHERE session_id = ?').run(session.id);
    let calls = 0;
    const delivery = new LeadDelivery(config, store, async (url, options) => {
      calls += 1;
      assert.equal(String(url), 'https://frenchifywithvyom.com/api/chat/lead');
      assert.deepEqual(JSON.parse(options.body), { sessionId: session.id, name: 'Test Lead', email: 'test@example.com', phone: '+15145550123' });
      return new Response('{"ok":true}');
    });
    await Promise.all([delivery.flush(), delivery.flush()]);
    await delivery.flush();
    assert.equal(calls, 1);
    assert.equal(store.pendingLeads().length, 0);
  } finally {
    store?.close();
    await rm(dir, { recursive: true, force: true });
  }
});
