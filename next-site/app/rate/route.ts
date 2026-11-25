import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const DEFAULT_BASE_URL = 'https://reviews.srv1380309.hstgr.cloud';

function upstreamBase(): string {
  return (process.env.INSTRUCTOR_REVIEWS_URL || DEFAULT_BASE_URL).trim().replace(/\/+$/, '');
}

const PRIVATE_HEADERS = {
  'Content-Type': 'text/html; charset=utf-8',
  'Cache-Control': 'private, no-store',
  'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const upstream = await fetch(`${upstreamBase()}/rate${url.search}`, {
      method: 'GET',
      headers: {
        Accept: 'text/html',
        'User-Agent': req.headers.get('user-agent') || 'Frenchify-Web/1.0',
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(12_000),
    });

    const html = await upstream.text();
    return new NextResponse(html, {
      status: upstream.status,
      headers: PRIVATE_HEADERS,
    });
  } catch {
    return new NextResponse(
      '<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="robots" content="noindex, nofollow, noarchive"/><title>Session Feedback</title></head><body style="font-family:system-ui,sans-serif;padding:40px;text-align:center;color:#0F1F3D;"><h2>Feedback page temporarily unavailable</h2><p>Please refresh and try again in a moment.</p></body></html>',
      { status: 502, headers: PRIVATE_HEADERS }
    );
  }
}
