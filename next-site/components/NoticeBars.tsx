import Link from 'next/link';
import { isBlackFridayOn } from '@/lib/promo';

/**
 * The two fixed bars under the header on the home page.
 *
 * Black Friday 2026 (Allen, 25 Nov 2026): pages that pass `blackFriday` swap
 * the top bar for a black and gold one that links to /black-friday-webinar.
 * After BLACK_FRIDAY.endsAt (lib/promo.ts) the usual masterclass bar comes
 * back by itself; the home page revalidates every 600 s for that.
 *
 * Each bar must stay one line, 36px tall: the body padding for
 * `has-notice-bars` in globals.css counts on it.
 */
export default function NoticeBars({ blackFriday = false }: { blackFriday?: boolean }) {
  const showBlackFriday = blackFriday && isBlackFridayOn();
  return (
    <>
      {showBlackFriday ? (
        <Link
          href="/black-friday-webinar/"
          className="fixed top-[69px] left-0 right-0 z-40 flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap shadow-[inset_0_-1px_0_rgba(217,178,84,0.4)] bg-[#0B0906] py-2 px-[15px] text-sm font-semibold text-[#F7F8FA] transition-colors duration-300 hover:bg-[#17120a] group"
        >
          <span aria-hidden="true" className="bf-bar-glint" />
          <span className="relative font-bold uppercase tracking-[0.14em] text-[#D9B254]">Black Friday</span>
          <span aria-hidden="true" className="relative text-[#D9B254]/60">
            ·
          </span>
          <span className="relative sm:hidden">Free live workshop</span>
          <span className="relative hidden sm:inline">Get the offer in the free live workshop. Reserve your spot</span>
          <span
            aria-hidden="true"
            className="relative text-[#D9B254] transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      ) : (
        <Link
          href="/sunday-webinar"
          className="fixed top-[69px] left-0 right-0 bg-gradient-to-r from-brand-blue via-brand-blue-deep to-brand-blue text-white text-center py-2 px-[15px] text-sm font-semibold z-40 hover:from-brand-blue-deep hover:to-brand-blue-deep transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          <span>Join Our Upcoming FREE Masterclass — Reserve Your Spot</span>
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      )}
      <Link
        href="/frenchify-beginner-program"
        className="fixed top-[105px] left-0 right-0 bg-brand-amber text-gray-900 text-center py-2 px-[15px] text-sm font-semibold z-40 hover:bg-amber-600 transition-all duration-300 flex items-center justify-center gap-2 group"
      >
        <span>New to French? Get FREE 7-Day Beginner Access</span>
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </Link>
    </>
  );
}
