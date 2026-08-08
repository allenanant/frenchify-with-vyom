/**
 * Ad tracking for the webinar funnel.
 *
 * On GoHighLevel each week got its own cloned page, and the URL itself was the
 * record of which week a lead came from. A single permanent URL is a better
 * page, but it throws that away — so the tracking has to ride on query
 * parameters instead, and they have to survive two hops:
 *
 *   ad → /sunday-webinar?utm_… → /webinar-form?utm_… → the GHL form iframe
 *
 * GHL's own form_embed.js does NOT forward the parent page's query string into
 * the iframe (verified 2026-08-08), so the second hop is on us.
 */

/** Only these are copied through. Anything else a visitor appends is ignored. */
export const TRACKING_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'utm_id',
  'fbclid',
  'gclid',
  'ttclid',
  'msclkid',
  'ref',
  'source',
] as const;

const MAX_VALUE_LENGTH = 200;

/**
 * Reduce a query string to the tracking parameters, sanitised. Returns "" when
 * there is nothing to pass on, so callers can append it unconditionally.
 */
export function trackingQuery(input: URLSearchParams | Record<string, string | string[] | undefined>): string {
  const out = new URLSearchParams();
  const read = (key: string): string | undefined => {
    if (input instanceof URLSearchParams) return input.get(key) ?? undefined;
    const v = input[key];
    return Array.isArray(v) ? v[0] : v;
  };

  for (const key of TRACKING_KEYS) {
    const value = read(key);
    if (typeof value === 'string' && value.trim()) {
      out.set(key, value.trim().slice(0, MAX_VALUE_LENGTH));
    }
  }
  const s = out.toString();
  return s ? `?${s}` : '';
}
