/**
 * Time-boxed promotions on the webinar funnel.
 *
 * Black Friday 2026 (Allen, 22 Nov 2026): a slim banner on top of the webinar
 * landing page and a "Black Friday offer" tag on its four CTAs. Both switch
 * off on their own once `endsAt` passes, so nobody has to remember to take
 * them down. The landing page revalidates every 600 s, so the switch lands
 * within ten minutes of the deadline.
 *
 * End = when the Saturday 28 Nov 2026 workshop ends (8:00 PM EST start + the
 * 90-minute session, i.e. 9:30 PM EST, Sun 29 Nov 8:00 AM India). That is the
 * moment the pages move to the next Saturday, and the Black Friday words must
 * not promise the offer for that date (Allen, 25 Nov 2026; it was 1 Dec
 * before). At that moment:
 *  - /black-friday-webinar sends visitors to /sunday-webinar,
 *  - /sunday-webinar and its aliases switch to the Gold Ticket design with no
 *    Black Friday words (MainWebinarLanding),
 *  - the home page top bar goes back to the masterclass bar.
 * Pages revalidate every 600 s, so each switch lands within about ten minutes.
 * Move the date here to stretch or cut it short.
 */
export const BLACK_FRIDAY = {
  endsAt: '2026-11-29T02:30:00.000Z',
  tag: 'Black Friday offer',
} as const;

export function isBlackFridayOn(now: number = Date.now()): boolean {
  return now < Date.parse(BLACK_FRIDAY.endsAt);
}
