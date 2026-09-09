import { createHash, timingSafeEqual } from 'node:crypto';
import { loadKnowledge } from './knowledge.mjs';
import { normalizePhone } from './phone.mjs';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CATEGORY_FALLBACK = 'Something else';

function json(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': Buffer.byteLength(payload),
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
  });
  res.end(payload);
}

async function readJson(req, maxBytes = 50_000) {
  const chunks = [];
  let bytes = 0;
  for await (const chunk of req) {
    bytes += chunk.length;
    if (bytes > maxBytes) throw Object.assign(new Error('Request too large.'), { status: 413 });
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
  } catch {
    throw Object.assign(new Error('Invalid JSON.'), { status: 400 });
  }
}

function authorized(req, expected) {
  const given = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && a.length > 0 && timingSafeEqual(a, b);
}

function ipHash(req, secret) {
  const raw = String(req.headers['x-chat-client-ip'] || 'unknown').split(',')[0].trim();
  return createHash('sha256').update(secret).update('\0').update(raw).digest('hex');
}

function validSession(store, token) {
  return store.sessionByToken(String(token || ''));
}

export function createApp({ config, store, agent, tickets, leads }) {
  const active = new Set();

  return async function handler(req, res) {
    const url = new URL(req.url, 'http://localhost');
    if (req.method === 'GET' && url.pathname === '/health') {
      return json(res, 200, { ok: true, model: config.model });
    }
    if (!authorized(req, config.serviceToken)) return json(res, 401, { error: 'Unauthorized.' });

    try {
      if (req.method === 'POST' && url.pathname === '/v1/sessions') {
        const body = await readJson(req);
        const name = String(body.name || '').trim().slice(0, 80);
        const email = String(body.email || '').trim().toLowerCase().slice(0, 180);
        const phone = normalizePhone(body.phone);
        const ip = ipHash(req, config.serviceToken);
        if (name.length < 2) return json(res, 400, { error: 'Enter your name.' });
        if (!EMAIL.test(email)) return json(res, 400, { error: 'Enter a valid email.' });
        if (!phone) return json(res, 400, { error: 'Enter your phone number with its country code, such as +1 or +91.' });
        if (!store.consumeRate(`session:${ip}`, 8, 3_600)) {
          return json(res, 429, { error: 'Too many new chats. Try again later.' });
        }
        const session = store.createSession({ name, email, phone, ipHash: ip });
        // The durable queue owns retries. CRM availability must not block a chat.
        void leads?.flush();
        return json(res, 201, {
          sessionToken: session.token,
          greeting: `Hey ${name.split(/\s+/)[0]}! How are you? What can I help you with today?`,
        });
      }

      if (req.method === 'POST' && url.pathname === '/v1/messages') {
        const body = await readJson(req);
        const session = validSession(store, body.sessionToken);
        if (!session) return json(res, 401, { error: 'Start a new chat to continue.' });
        const message = String(body.message || '').replace(/\s+/g, ' ').trim().slice(0, 1_200);
        if (!message) return json(res, 400, { error: 'Type a message first.' });
        if (store.userMessageCount(session.id) >= config.maxMessagesPerSession) {
          return json(res, 429, {
            error: 'This chat has reached its message limit.',
            limitReached: true,
          });
        }
        if (!store.consumeRate(`message:${session.id}`, 24, 600)) {
          return json(res, 429, { error: 'Please wait a few minutes before sending more messages.' });
        }
        if (active.has(session.id)) return json(res, 409, { error: 'I am still answering your last message.' });

        active.add(session.id);
        try {
          store.addMessage(session.id, 'user', message);
          const knowledge = await loadKnowledge(config);
          const answer = await agent.answer(session, message, knowledge);
          store.addMessage(session.id, 'assistant', answer.reply, {
            links: answer.links,
            suggestTicket: answer.suggestTicket,
            usage: answer.usage,
          });
          store.setAgentState(session.id, {
            threadId: answer.threadId,
            knowledgeHash: answer.knowledgeHash,
            category: answer.ticketCategory || CATEGORY_FALLBACK,
            subject: answer.ticketSubject,
          });
          return json(res, 200, {
            reply: answer.reply,
            links: answer.links,
            suggestTicket: answer.suggestTicket,
            limitReached: store.userMessageCount(session.id) >= config.maxMessagesPerSession,
          });
        } finally {
          active.delete(session.id);
        }
      }

      if (req.method === 'POST' && url.pathname === '/v1/tickets') {
        const body = await readJson(req);
        const session = validSession(store, body.sessionToken);
        if (!session) return json(res, 401, { error: 'Start a new chat to continue.' });
        const requestId = String(body.requestId || '');
        if (!/^[0-9a-f-]{36}$/i.test(requestId)) return json(res, 400, { error: 'Invalid ticket request.' });
        const existing = store.ticket(requestId);
        if (existing?.ticket_ref) return json(res, 200, { ref: existing.ticket_ref });
        if (existing?.status === 'pending') return json(res, 409, { error: 'That ticket is still being created.' });

        store.reserveTicket(requestId, session.id);
        try {
          const transcript = store.messages(session.id, 20);
          if (!transcript.some((item) => item.role === 'user')) {
            throw Object.assign(new Error('Ask a question before raising a ticket.'), { status: 400 });
          }
          const result = await tickets.create({
            requestId,
            session,
            category: String(body.category || session.suggested_category || CATEGORY_FALLBACK),
            subject: String(body.subject || session.suggested_subject || 'Frenchify website question'),
            reason: String(body.reason || ''),
            transcript,
          });
          store.completeTicket(requestId, result.ref);
          store.addMessage(session.id, 'assistant', `Your support ticket is ${result.ref}.`);
          return json(res, 201, { ref: result.ref });
        } catch (error) {
          store.failTicket(requestId);
          throw error;
        }
      }

      return json(res, 404, { error: 'Not found.' });
    } catch (error) {
      console.error('[chat-service]', error);
      const status = Number(error?.status) || 500;
      return json(res, status, {
        error: status >= 500 ? 'The chat is temporarily unavailable. Please try again.' : error.message,
      });
    }
  };
}
