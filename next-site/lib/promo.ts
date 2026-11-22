/**
 * Time-boxed promotions on the webinar funnel.
 *
 * Black Friday 2026 (Allen, 22 Nov 2026): a slim banner on top of the webinar
 * landing page and a "Black Friday offer" tag on its four CTAs. Both switch
 * off on their own once `endsAt` passes, so nobody has to remember to take
 * them down. The landing page revalidates every 600 s, so the switch lands
 * within ten minutes of the deadline.
 *
 * End = 1 Dec 2026 00:00 Montreal (EST, GMT -5), i.e. the banner shows through
 * Cyber Monday 30 Nov. Move the date here to stretch or cut it short.
 */
export const BLACK_FRIDAY = {
  endsAt: '2026-12-01T05:00:00.000Z',
  tag: 'Black Friday offer',
} as const;

export function isBlackFridayOn(now: number = Date.now()): boolean {
  return now < Date.parse(BLACK_FRIDAY.endsAt);
}
