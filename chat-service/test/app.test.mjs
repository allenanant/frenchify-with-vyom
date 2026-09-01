import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createServer } from 'node:http';
import test from 'node:test';
import { createApp } from '../src/app.mjs';
import { loadConfig } from '../src/config.mjs';
import { ChatStore } from '../src/store.mjs';

test('gates chat, answers, and creates one idempotent ticket', async (t) => {
  const dataDir = await mkdtemp(path.join(tmpdir(), 'frenchify-chat-'));
  const token = 's'.repeat(40);
  const config = loadConfig({
    dataDir,
    serviceToken: token,
    ticketSecret: 't'.repeat(40),
  });
  const store = new ChatStore(dataDir);
  const agent = {
    async answer(_session, message, knowledge) {
      return {
        reply: `Answer for ${message}`,
        links: [{ label: 'Read about A1', url: 'https://frenchifywithvyom.com/a1-course/' }],
        suggestTicket: true,
        ticketCategory: 'Technical problem',
        ticketSubject: 'Portal login problem',
        threadId: 'thread-1',
        knowledgeHash: knowledge.hash,
        usage: null,
      };
    },
  };
  let ticketCalls = 0;
  const tickets = {
    async create() {
      ticketCalls += 1;
      return { ref: 'FRN-00999' };
    },
  };
  const server = createServer(createApp({ config, store, agent, tickets }));
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  const base = `http://127.0.0.1:${address.port}`;

  t.after(async () => {
    await new Promise((resolve) => server.close(resolve));
    store.close();
    await rm(dataDir, { recursive: true, force: true });
  });

  const call = async (pathname, body, authorized = true) => {
    const response = await fetch(base + pathname, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(authorized ? { authorization: `Bearer ${token}` } : {}),
        'x-chat-client-ip': '127.0.0.1',
      },
      body: JSON.stringify(body),
    });
    return { status: response.status, body: await response.json() };
  };

  assert.equal((await call('/v1/sessions', {}, false)).status, 401);
  const started = await call('/v1/sessions', { name: 'Asha Patel', email: 'asha@example.com' });
  assert.equal(started.status, 201);
  assert.ok(started.body.sessionToken);

  const answered = await call('/v1/messages', {
    sessionToken: started.body.sessionToken,
    message: 'I cannot open my portal',
  });
  assert.equal(answered.status, 200);
  assert.equal(answered.body.suggestTicket, true);

  for (let index = 2; index <= 8; index += 1) {
    const response = await call('/v1/messages', {
      sessionToken: started.body.sessionToken,
      message: `Question ${index}`,
    });
    assert.equal(response.status, 200);
    assert.equal(response.body.limitReached, index === 8);
  }
  const limited = await call('/v1/messages', {
    sessionToken: started.body.sessionToken,
    message: 'Question 9',
  });
  assert.equal(limited.status, 429);
  assert.equal(limited.body.limitReached, true);

  const requestId = '4dc32ba8-bd96-4543-b72d-95d4c62f81a1';
  const ticket = await call('/v1/tickets', {
    sessionToken: started.body.sessionToken,
    requestId,
    category: 'Technical problem',
    reason: 'The portal rejects my login.',
  });
  assert.equal(ticket.status, 201);
  assert.equal(ticket.body.ref, 'FRN-00999');

  const retry = await call('/v1/tickets', {
    sessionToken: started.body.sessionToken,
    requestId,
    reason: 'The portal rejects my login.',
  });
  assert.equal(retry.status, 200);
  assert.equal(retry.body.ref, 'FRN-00999');
  assert.equal(ticketCalls, 1);
});
