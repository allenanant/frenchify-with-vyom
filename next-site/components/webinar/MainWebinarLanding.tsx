import WebinarLanding from '@/components/webinar/WebinarLanding';
import WebinarTicketLanding from '@/components/webinar/WebinarTicketLanding';
import { isBlackFridayOn } from '@/lib/promo';
import type { Webinar } from '@/lib/webinar';

/**
 * The main webinar landing page (/sunday-webinar, /saturday-webinar and
 * /webinar/<slug>).
 *
 * While Black Friday 2026 runs, it stays the page it was (with the Black
 * Friday banner and CTA tags), and the Black Friday ads use
 * /black-friday-webinar. Once BLACK_FRIDAY.endsAt passes (lib/promo.ts), it
 * becomes the Gold Ticket design that Vyom picked, with no Black Friday words
 * (Allen, 25 Nov 2026). The routes revalidate every 600 s, so the switch lands
 * within about ten minutes. To go back to the old design, render
 * WebinarLanding here.
 */
export default function MainWebinarLanding({ webinar }: { webinar: Webinar }) {
  if (isBlackFridayOn()) return <WebinarLanding webinar={webinar} />;
  return <WebinarTicketLanding webinar={webinar} blackFriday={false} />;
}
