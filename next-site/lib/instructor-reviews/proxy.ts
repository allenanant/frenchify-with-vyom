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
