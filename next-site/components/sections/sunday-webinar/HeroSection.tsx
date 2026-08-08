import Countdown from '@/components/webinar/Countdown';
import VideoFacade from '@/components/webinar/VideoFacade';
import { Chip, Cta, Label } from '@/components/webinar/ui';

/**
 * Landing page hero. One centred column, in the order the system fixes:
 * eyebrow, h1, lead, VSL, countdown + date, CTA, trust line.
 *
 * No 'use client' any more. The countdown and the video facade own their own
 * client boundaries, so the hero itself ships as markup — which is the point,
 * since the old version pulled framer-motion, three motion wrappers and 1.6 MB
 * of Wistia in before the visitor had decided anything.
 */

type Props = {
  /** ISO start instant — drives the countdown. */
  startsAt: string;
  /** The long, human date printed under the clock. */
  displayDate: string;
};

export default function HeroSection({ startsAt, displayDate }: Props) {
  return (
    <section className="w-full bg-fnl-surface">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center px-5 py-14 text-center md:px-8 md:py-24">
        <Chip>Live Workshop - Limited Seats</Chip>

        <h1 className="mt-6 max-w-[900px] font-display text-[32px] font-extrabold leading-[1.05] tracking-[-0.02em] text-fnl-ink md:text-[56px]">
          French for Canadian PR: Live Assessment Workshop
        </h1>

        <p className="mt-5 max-w-[640px] text-[17px] leading-[1.55] text-fnl-body md:text-[19px]">
          Discover in 90 minutes if French is your fastest path to Canadian PR. Take a live
          assessment and get your personalized French learning strategy - completely free.
        </p>

        <VideoFacade className="mt-10 max-w-[680px]" />

        <div className="mt-10 w-full max-w-[420px]">
          <Label className="text-center">Next live session starts in</Label>
          <Countdown
            targetIso={startsAt}
            expiredLabel="We're live right now"
            className="mt-3"
          />
          <p className="mt-3 text-[15px] leading-[1.5] text-fnl-mute">{displayDate}</p>
        </div>

        <Cta href="/webinar-form/" className="mt-8 max-w-[420px]">
          Reserve My Free Spot
        </Cta>

        <p className="mt-4 text-[15px] leading-[1.5] text-fnl-body">
          <span className="text-fnl-danger line-through">$19 CAD Value</span>
          <span className="ml-2 font-semibold text-fnl-success">
            Absolutely FREE For a Limited Time!
          </span>
        </p>
      </div>
    </section>
  );
}
