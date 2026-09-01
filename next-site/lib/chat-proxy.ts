import 'server-only';
import { NextRequest, NextResponse } from 'next/server';

export async function proxyChat(request: NextRequest, endpoint: 'sessions' | 'messages' | 'tickets') {
  const base = process.env.CHAT_SERVICE_URL;
  const token = process.env.CHAT_SERVICE_TOKEN;
  if (!base || !token) {
    return NextResponse.json(
      { error: 'Chat is being set up. Please use student support or contact Frenchify.' },
      { status: 503 }
    );
  }

  const raw = await request.text();
  if (Buffer.byteLength(raw) > 50_000) {
    return NextResponse.json({ error: 'That request is too large.' }, { status: 413 });
  }

  try {
    const target = new URL(`/v1/${endpoint}`, base);
    if (!['http:', 'https:'].includes(target.protocol)) throw new Error('Invalid chat service URL.');
    const response = await fetch(target, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
        'x-chat-client-ip': request.headers.get('x-forwarded-for') || 'unknown',
      },
      body: raw,
      cache: 'no-store',
      signal: AbortSignal.timeout(endpoint === 'messages' ? 65_000 : 20_000),
    });
    const body = await response.text();
    return new NextResponse(body, {
      status: response.status,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store',
      },
    });
  } catch (error) {
    console.error(`[chat-proxy:${endpoint}]`, error);
    return NextResponse.json(
      { error: 'Chat is temporarily unavailable. Please try again or raise a support ticket.' },
      { status: 502 }
    );
  }
}
