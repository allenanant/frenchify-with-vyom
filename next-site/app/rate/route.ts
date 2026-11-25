import { NextResponse } from 'next/server';
import { clientIpFrom, reviewsFetch } from '@/lib/instructor-reviews/proxy';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PRIVATE_HEADERS = {
  'Content-Type': 'text/html; charset=utf-8',
  'Cache-Control': 'private, no-store',
  'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

// The rating service accepts this page only from here: the proxy sends the private key
// and the visitor's IP. Direct visits to the service host get 403.
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const upstream = await reviewsFetch(`/rate${url.search}`, {
      method: 'GET',
      headers: {
        Accept: 'text/html',
        'User-Agent': req.headers.get('user-agent') || 'Frenchify-Web/1.0',
        'X-Client-IP': clientIpFrom(req),
      },
    });

    const html = await upstream.text();
    return new NextResponse(html, {
      status: upstream.status,
      headers: PRIVATE_HEADERS,
    });
  } catch {
    return new NextResponse(
      '<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="robots" content="noindex, nofollow, noarchive"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>Session Feedback</title></head><body style="font-family:system-ui,sans-serif;padding:40px;text-align:center;color:#0F1F3D;"><h2>We cannot open your rating page now</h2><p>Wait one minute. Then open the link in your email again.</p></body></html>',
      { status: 502, headers: PRIVATE_HEADERS }
    );
  }
}
