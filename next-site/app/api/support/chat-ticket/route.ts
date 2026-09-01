import { createHash, timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import {
  CATEGORIES,
  MAX_EMAIL,
  RATE_MAX,
  RATE_WINDOW_MIN,
  STORAGE_CEILING_BYTES,
} from '@/lib/tickets/constants';
import { createTicket, getTicketBySourceKey } from '@/lib/tickets/db';

export const dynamic = 'force-dynamic';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function authorized(request: NextRequest) {
  const expected = process.env.CHAT_TICKET_SECRET || '';
  const given = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && a.length >= 32 && timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const requestId = String(body.requestId || '');
  const sessionId = String(body.sessionId || '');
  const name = String(body.name || '').trim().slice(0, 120);
  const email = String(body.email || '').trim().toLowerCase().slice(0, MAX_EMAIL);
  const category = CATEGORIES.includes(body.category) ? body.category : 'Something else';
  const subject = String(body.subject || '').replace(/\s+/g, ' ').trim().slice(0, 160);
  const reason = String(body.reason || '').trim().slice(0, 2_000);
  const transcript = Array.isArray(body.transcript) ? body.transcript.slice(-20) : [];

  if (!/^[0-9a-f-]{36}$/i.test(requestId) || !/^[0-9a-f-]{36}$/i.test(sessionId)) {
    return NextResponse.json({ error: 'Invalid ticket request.' }, { status: 400 });
  }
  if (name.length < 2 || !EMAIL.test(email) || subject.length < 3 || !reason) {
    return NextResponse.json({ error: 'Name, email, subject, and issue details are required.' }, { status: 400 });
  }

  const sourceKey = `website-chat:${requestId}`;
  const existing = await getTicketBySourceKey(sourceKey);
  if (existing) return NextResponse.json({ ref: existing.ref }, { status: 200 });

  const transcriptText = transcript
    .map((item: { role?: unknown; content?: unknown }) => {
      const role = item?.role === 'assistant' ? 'Frenchify' : 'Visitor';
      return `${role}: ${String(item?.content || '').replace(/\s+/g, ' ').trim().slice(0, 1_200)}`;
    })
    .filter(Boolean)
    .join('\n');
  const description = `Issue raised from the website chatbot.\n\nVisitor summary:\n${reason}\n\nRecent chat:\n${transcriptText}`.slice(
    0,
    9_000
  );
  const salt = process.env.SUPPORT_IP_SALT || process.env.CHAT_TICKET_SECRET || '';
  const ipHash = createHash('sha256').update(salt).update('\0').update(sessionId).digest('hex');

  try {
    const result = await createTicket(
      {
        student_name: name,
        student_email: email,
        category,
        subject,
        description,
        ip_hash: ipHash,
        source_key: sourceKey,
      },
      [],
      { rateWindowMin: RATE_WINDOW_MIN, rateMax: RATE_MAX, storageCeiling: STORAGE_CEILING_BYTES }
    );
    if ('refused' in result) {
      return NextResponse.json(
        { error: result.refused === 'rate' ? 'Too many tickets were raised from this chat.' : 'Ticket storage is full.' },
        { status: 429 }
      );
    }
    return NextResponse.json({ ref: result.ref }, { status: 201 });
  } catch (error) {
    const duplicate = await getTicketBySourceKey(sourceKey).catch(() => null);
    if (duplicate) return NextResponse.json({ ref: duplicate.ref }, { status: 200 });
    console.error('[chat-ticket]', error);
    return NextResponse.json({ error: 'Could not create the ticket.' }, { status: 500 });
  }
}
