import assert from 'node:assert/strict';
import test from 'node:test';
import {
  addFrenchifyContactTags,
  enrollFrenchifyContact,
  syncChatLead,
  upsertFrenchifyContact,
} from '../lib/ghl-chat-lead.mjs';

const lead = { name: 'Test Lead', email: 'test@example.com', phone: '+15145550123' };
const config = { token: 'test-token', workflowId: 'test-workflow' };

test('upserts the contact and enrolls only in the configured workflow, preserving tags and consent', async () => {
  const calls = [];
  const mockFetch = async (url, options) => {
    calls.push({ url, body: JSON.parse(options.body) });
    return calls.length === 1
      ? new Response(JSON.stringify({ contact: { id: 'contact-1', locationId: 'cmjlzerv4DUDyZFj6PYO' } }))
      : new Response('{"succeeded":true}');
  };
  assert.deepEqual(await syncChatLead(lead, config, mockFetch), { ok: true });
  assert.deepEqual(calls[0].body, { locationId: 'cmjlzerv4DUDyZFj6PYO', ...lead });
  assert.equal(calls[1].url, 'https://services.leadconnectorhq.com/contacts/contact-1/workflow/test-workflow');
});

test('does not acknowledge failed enrollment or a contact in another account', async () => {
  for (const locationId of ['wrong-account', 'cmjlzerv4DUDyZFj6PYO']) {
    let calls = 0;
    await assert.rejects(syncChatLead(lead, config, async () => {
      calls += 1;
      return calls === 1
        ? new Response(JSON.stringify({ contact: { id: 'contact-1', locationId } }))
        : new Response('{"succeeded":false}');
    }));
    assert.equal(calls, locationId === 'wrong-account' ? 1 : 2);
  }
  await assert.rejects(syncChatLead(lead, {}, async () => { throw new Error('must not call'); }), /not configured/);
});

test('requires a positive acknowledgment and accepts the legacy GHL success spelling', async () => {
  for (const acknowledgment of [{}, { succeded: false }, { succeded: true }]) {
    let calls = 0;
    const result = syncChatLead(lead, config, async () => new Response(JSON.stringify(++calls === 1
      ? { contact: { id: 'contact-1', locationId: 'cmjlzerv4DUDyZFj6PYO' } }
      : acknowledgment)));
    if (acknowledgment.succeded === true) assert.deepEqual(await result, { ok: true });
    else await assert.rejects(result);
  }
});

test('roadmap sync primitives append tags and keep workflow enrollment separate', async () => {
  const calls = [];
  const mockFetch = async (url, options) => {
    calls.push({ url, body: JSON.parse(options.body) });
    if (url.endsWith('/contacts/upsert')) {
      return new Response(JSON.stringify({ contact: { id: 'contact-2', locationId: 'cmjlzerv4DUDyZFj6PYO' } }));
    }
    if (url.endsWith('/tags')) return new Response(JSON.stringify({ tags: ['existing', 'free-roadmap-access'] }), { status: 201 });
    return new Response('{"succeeded":true}');
  };

  const result = await upsertFrenchifyContact(lead, { token: config.token }, mockFetch);
  await addFrenchifyContactTags(result.contactId, ['free-roadmap-access'], { token: config.token }, mockFetch);
  assert.equal(calls.length, 2, 'upsert and tags must not enroll without an explicit call');
  assert.deepEqual(calls[0].body, { locationId: 'cmjlzerv4DUDyZFj6PYO', ...lead });
  assert.deepEqual(calls[1].body, { tags: ['free-roadmap-access'] });

  await enrollFrenchifyContact(result.contactId, config, mockFetch);
  assert.match(calls[2].url, /\/workflow\/test-workflow$/);
});
