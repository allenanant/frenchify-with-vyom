import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const DEFAULT_BASE_URL = 'https://reviews.srv1380309.hstgr.cloud';

function upstreamBase(): string {
  return (process.env.INSTRUCTOR_REVIEWS_URL || DEFAULT_BASE_URL).trim().replace(/\/+$/, '');
}

const NOINDEX_JSON_HEADERS = {
  'Cache-Control': 'private, no-store',
  'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
};

export async function POST(req: Request) {
  try {
    const body = await req.text();
    if (body.length > 64 * 1024) {
      return NextResponse.json(
        { ok: false, error: 'Submission is too large.' },
        { status: 413, headers: NOINDEX_JSON_HEADERS }
      );
    }

    const upstream = await fetch(`${upstreamBase()}/api/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': req.headers.get('user-agent') || 'Frenchify-Web/1.0',
      },
      body,
      cache: 'no-store',
      signal: AbortSignal.timeout(12_000),
    });

    const data = await upstream.json().catch(() => ({ ok: false, error: 'Invalid response from rating service.' }));
    return NextResponse.json(data, {
      status: upstream.status,
      headers: NOINDEX_JSON_HEADERS,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Could not reach the rating service. Please try again.' },
      { status: 502, headers: NOINDEX_JSON_HEADERS }
    );
  }
}
