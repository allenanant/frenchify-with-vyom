import { NextResponse } from 'next/server';
import { clientIpFrom, reviewsFetch } from '@/lib/instructor-reviews/proxy';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const NOINDEX_JSON_HEADERS = {
  'Cache-Control': 'private, no-store',
  'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
};

const MAX_BYTES = 64 * 1024;

export async function POST(req: Request) {
  const type = (req.headers.get('content-type') || '').toLowerCase();
  if (!type.startsWith('application/json')) {
    return NextResponse.json(
      { ok: false, error: 'We could not read your answers. Try again.' },
      { status: 415, headers: NOINDEX_JSON_HEADERS }
    );
  }

  try {
    const body = await req.text();
    if (Buffer.byteLength(body, 'utf8') > MAX_BYTES) {
      return NextResponse.json(
        { ok: false, error: 'Your answer is too long.' },
        { status: 413, headers: NOINDEX_JSON_HEADERS }
      );
    }

    const upstream = await reviewsFetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': req.headers.get('user-agent') || 'Frenchify-Web/1.0',
        'X-Client-IP': clientIpFrom(req),
      },
      body,
    });

    const data = await upstream
      .json()
      .catch(() => ({ ok: false, error: 'We could not save your rating. Try again.' }));
    return NextResponse.json(data, {
      status: upstream.status,
      headers: NOINDEX_JSON_HEADERS,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'We could not save your rating. Wait one minute. Then try again.' },
      { status: 502, headers: NOINDEX_JSON_HEADERS }
    );
  }
}
