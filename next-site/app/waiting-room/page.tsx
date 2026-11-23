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
 *
 * Once the main (Saturday) session has finished, this page switches to the
 * repeat session and its own link, so the Sunday reminders can point here
 * too. The repeat is worded as a repeat, never as live.
 */

import type { Metadata } from 'next';
import FunnelShell, { WebinarDateBadge } from '@/components/webinar/FunnelShell';
import Countdown from '@/components/webinar/Countdown';
import { getNextSession } from '@/lib/webinar';

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
  const webinar = getNextSession();
  const repeat = webinar.kind === 'encore';

  return (
    <FunnelShell>
      <h1 className="font-display text-[26px] font-extrabold leading-[1.1] tracking-[-0.015em] text-fnl-ink sm:text-[34px]">
        {repeat
          ? 'You\u2019ll be taken to the repeat session automatically'
          : 'You\u2019ll be redirected to the webinar automatically'}
      </h1>
      <p className="mt-3 text-[17px] leading-[1.55] text-fnl-body">
        {repeat
          ? 'Thank you for joining us! This is the repeat of the workshop for everyone who could not make the first session. It begins at the scheduled time.'
          : 'Thank you for joining us! We\u2019re just getting things ready and will begin at the scheduled time.'}
      </p>

      <WebinarDateBadge date={webinar.displayDate} label={repeat ? 'Repeat session' : 'Workshop date'} />

      <Countdown
        targetIso={webinar.startsAt}
        joinUrl={webinar.joinUrl}
        redirectOnExpiry
        expiredLabel={repeat ? 'Starting now — taking you in' : "We're live — taking you in now"}
        className="mb-6"
      />

      {/* The one animation the funnel keeps. On a page whose entire content is
          "nothing is happening yet", a live pulse is the only thing telling a
          nervous registrant the tab has not frozen, so it earns its keep. */}
      <div className="flex items-center justify-center gap-3 rounded-[10px] border border-fnl-line bg-fnl-surface-alt p-4">
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fnl-primary opacity-75 motion-reduce:hidden" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-fnl-primary" />
        </span>
        <p className="text-[16px] font-semibold leading-[1.4] text-fnl-ink">
          {repeat ? 'Waiting for the session to start...' : 'Waiting for the host to start the session...'}
        </p>
      </div>

      <p className="mt-7 text-[16px] leading-[1.6] text-fnl-body">
        <strong className="font-semibold text-fnl-ink">Please keep this page open.</strong> You will be
        automatically connected to the webinar room as soon as it begins.
      </p>
    </FunnelShell>
  );
}
