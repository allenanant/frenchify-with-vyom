/**
 * The waiting room. This is the page the GoHighLevel countdown timer existed
 * for: registrants land here, the clock runs down, and at zero they are sent to
 * the WebinarJam room.
 *
 * The link is deliberately not hard-coded. Vyom issues a fresh WebinarJam room
 * every Saturday evening, and the schedule only hands it over when it was set
 * for *this* week's webinar — so a forgotten update shows an honest "hang on"
 * rather than dropping people into last Sunday's dead room.
 *
 * URL kept as /waiting-room to match the GHL page, because it is stored in
 * custom values, WhatsApp templates and emails that have already gone out.
 */

import type { Metadata } from 'next';
import FunnelShell, { WebinarDateBadge } from '@/components/webinar/FunnelShell';
import Countdown from '@/components/webinar/Countdown';
import { getWebinar } from '@/lib/webinar';

export const metadata: Metadata = {
  title: 'Webinar Starting Soon',
  description:
    'The French for Canada PR workshop is starting soon. Please wait here, and you will be redirected automatically.',
  robots: { index: false, follow: false },
};

// Shorter than the other funnel pages: someone can sit on this page for an
// hour before the session, and it must not be serving a stale start time.
export const revalidate = 120;

export default function WaitingRoomPage() {
  const webinar = getWebinar();

  return (
    <FunnelShell>
      <h1 className="font-display text-2xl font-black leading-tight tracking-tight text-slate-900 sm:text-3xl">
        <span className="gradient-text">You&apos;ll be redirected to the webinar automatically</span> 🍁
      </h1>
      <p className="mt-3 text-base font-medium text-slate-600">
        Thank you for joining us! We&apos;re just getting things ready and will begin at the scheduled time.
      </p>

      <WebinarDateBadge date={webinar.displayDate} />

      <Countdown
        targetIso={webinar.startsAt}
        joinUrl={webinar.joinUrl}
        redirectOnExpiry
        expiredLabel="We're live — taking you in now"
        className="mb-6"
      />

      <div className="flex items-center justify-center gap-3 rounded-xl border-2 border-dashed border-brand-blue/40 bg-blue-50/60 p-4">
        <span className="relative flex h-3 w-3 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-blue" />
        </span>
        <p className="text-base font-bold text-brand-blue-deep">Waiting for the host to start the session...</p>
      </div>

      <p className="mt-7 text-base text-slate-600">
        <strong className="text-slate-900">Please keep this page open.</strong> You will be automatically connected
        to the webinar room as soon as it begins.
      </p>
    </FunnelShell>
  );
}
