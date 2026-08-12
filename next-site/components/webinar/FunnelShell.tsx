import Image from 'next/image';
import FunnelFooter from '@/components/webinar/FunnelFooter';
import { Label } from '@/components/webinar/ui';

/**
 * The card layout the three small funnel pages share — registration, thank you
 * and the waiting room. On GoHighLevel these were three standalone HTML pages
 * that each carried their own copy of the background, the logo and the date
 * box; keeping that shell in one place is what stops them drifting apart.
 *
 * Rebuilt on the funnel system so the four pages read as one product. What went:
 * two layers of radial-gradient wash, a dot grid, a three-stop gradient rule
 * across the card top, and a heavy drop shadow. A visitor arriving here has
 * already clicked a CTA, so the page's whole job is to look like the same
 * company that made the promise and then get out of the way.
 */

/** WebP: 6 KB against the PNG's 20 KB, and it is eager on all three pages. */
const LOGO = '/brand/frenchify-logo.webp';

export function WebinarDateBadge({ date }: { date: string }) {
  return (
    <div className="my-6 rounded-[10px] border border-fnl-line bg-fnl-surface-alt p-5 text-left">
      <Label>Workshop date</Label>
      <p className="mt-1 text-[17px] font-bold leading-[1.3] text-fnl-ink">{date}</p>
    </div>
  );
}

export default function FunnelShell({
  children,
  maxWidth = 'max-w-[640px]',
}: {
  children: React.ReactNode;
  maxWidth?: string;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-fnl-surface-alt">
      <main className="flex flex-grow items-center justify-center px-5 py-10 sm:py-14">
        <div
          className={`w-full ${maxWidth} rounded-[14px] border border-fnl-line bg-fnl-surface p-7 text-center sm:p-11`}
        >
          <Image
            src={LOGO}
            alt="Frenchify with Vyom"
            width={132}
            height={38}
            className="mx-auto mb-6 h-[38px] w-auto"
            priority
          />
          {children}
        </div>
      </main>

      <FunnelFooter className="border-t-0 bg-transparent" />
    </div>
  );
}
