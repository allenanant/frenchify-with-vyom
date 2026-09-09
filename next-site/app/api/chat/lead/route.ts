import { timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { syncChatLead } from '@/lib/ghl-chat-lead.mjs';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const expected = Buffer.from(process.env.CHAT_TICKET_SECRET || '');
  const supplied = Buffer.from((request.headers.get('authorization') || '').replace(/^Bearer\s+/i, ''));
  if (expected.length < 32 || expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  const raw = await request.text();
  if (Buffer.byteLength(raw) > 4_000) {
    return NextResponse.json({ error: 'Request too large.' }, { status: 413 });
  }
  let body;
  try { body = JSON.parse(raw); } catch { body = null; }
  if (!body || typeof body !== 'object' ||
      typeof body.sessionId !== 'string' || !/^[0-9a-f-]{36}$/i.test(body.sessionId) ||
      typeof body.name !== 'string' || body.name.trim().length < 2 || body.name.length > 80 ||
      typeof body.email !== 'string' || body.email.length > 180 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) ||
      typeof body.phone !== 'string' || !/^\+[1-9]\d{7,14}$/.test(body.phone)) {
    return NextResponse.json({ error: 'Invalid contact details.' }, { status: 400 });
  }
  try {
    await syncChatLead({ name: body.name.trim(), email: body.email.toLowerCase(), phone: body.phone }, {
      token: process.env.GHL_FRENCHIFY_API_KEY,
      workflowId: process.env.CHAT_LEAD_WORKFLOW_ID,
    });
    return NextResponse.json({ ok: true });
  } catch {
    // The VPS keeps this lead in its persistent queue and retries automatically.
    console.error('[chat-lead] CRM sync not acknowledged; queued for retry on the chat service.');
    return NextResponse.json({ error: 'Lead delivery temporarily unavailable.' }, { status: 503 });
  }
}
