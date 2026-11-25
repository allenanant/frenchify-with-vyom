import { NextResponse, type NextRequest } from 'next/server';
import { isBlackFridayOn } from '@/lib/promo';

/**
 * After Black Friday 2026 ends (BLACK_FRIDAY.endsAt in lib/promo.ts), the
 * Black Friday page sends visitors to the main webinar page.
 *
 * This runs here and not only in the page because the page is cached: a
 * redirect from the cached page cannot see the query string, so it dropped
 * utm_* and fbclid, and the ad tracking on /sunday-webinar lost the visit.
 * nextUrl keeps the query string, and middleware checks the clock on every
 * request, so the switch is exact. The page keeps its own redirect as a
 * fallback. Only this one path runs through here (see `matcher`).
 */
export function middleware(req: NextRequest) {
  if (isBlackFridayOn()) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = '/sunday-webinar/';
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ['/black-friday-webinar', '/black-friday-webinar/:path*'],
};
