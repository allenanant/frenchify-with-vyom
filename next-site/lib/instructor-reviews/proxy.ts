import 'server-only';

const DEFAULT_BASE_URL = 'https://reviews.srv1380309.hstgr.cloud';

export function getReviewsConfig(): { baseUrl: string; apiKey: string } | null {
  const apiKey = (process.env.INSTRUCTOR_REVIEWS_KEY || '').trim();
  if (!apiKey) return null;
  const baseUrl = (process.env.INSTRUCTOR_REVIEWS_URL || DEFAULT_BASE_URL).trim().replace(/\/+$/, '');
  return { baseUrl, apiKey };
}

export function isReviewsConfigured(): boolean {
  return getReviewsConfig() !== null;
}

const ALLOWED_FILTER_KEYS = ['instructor', 'type', 'days', 'score', 'q', 'includeTest'] as const;

export function pickFilterSearchParams(source: URLSearchParams): string {
  const out = new URLSearchParams();
  for (const key of ALLOWED_FILTER_KEYS) {
    const val = source.get(key);
    if (val !== null && val.trim() !== '') {
      out.set(key, val.trim());
    }
  }
  return out.toString();
}

/** The visitor's IP as Vercel sees it. Sent to the rating service so its per-person rate limit works. */
export function clientIpFrom(req: Request): string {
  const real = (req.headers.get('x-real-ip') || '').trim();
  if (real) return real.slice(0, 64);
  const fwd = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim();
  return (fwd || 'unknown').slice(0, 64);
}

export async function reviewsFetch(pathWithQuery: string, init: RequestInit = {}): Promise<Response> {
  const cfg = getReviewsConfig();
  if (!cfg) {
    throw new Error('INSTRUCTOR_REVIEWS_KEY_MISSING');
  }
  const headers = new Headers(init.headers);
  headers.set('Authorization', `Bearer ${cfg.apiKey}`);
  headers.set('Accept', headers.get('Accept') || 'application/json');

  return fetch(`${cfg.baseUrl}${pathWithQuery}`, {
    ...init,
    headers,
    cache: 'no-store',
    signal: AbortSignal.timeout(12_000),
  });
}
