import Image from 'next/image';
import Countdown from '@/components/webinar/Countdown';
import LocalTime from '@/components/webinar/LocalTime';
import VideoFacade from '@/components/webinar/VideoFacade';
import { Chip, Cta, Label } from '@/components/webinar/ui';

/**
 * Landing page hero. One centred column: wordmark, eyebrow, h1, lead, VSL,
 * CTA, trust line, then countdown + date.
 *
 * The CTA sits above the countdown, not below it. Measured on a 390x844 phone
 * the old order put the button at y=799 with the fold at roughly 740, so no
 * phone showed a way to convert without scrolling. Moving the countdown block
 * under it lifts the button to ~640 and costs the countdown nothing: it is
 * urgency, and urgency reads fine after the ask.
 *
 * The wordmark is here because the other three funnel pages carry it and this
 * one did not, which left cold ad traffic with no brand mark until the footer
 * copyright.
 *
 * No 'use client'. The countdown, the local-time line and the video facade own
 * their own client boundaries, so the hero itself ships as markup — which is
 * the point, since the old version pulled framer-motion, three motion wrappers
 * and 1.6 MB of Wistia in before the visitor had decided anything.
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
      <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center px-5 py-10 text-center md:px-8 md:py-20">
        <Image
          /* WebP: 6 KB against the PNG's 20 KB, and this one is eager on the
             page's first paint. Same mark, same dimensions. */
          src="/brand/frenchify-logo.webp"
          alt="Frenchify with Vyom"
          width={132}
          height={38}
          className="mb-6 h-[34px] w-auto"
          unoptimized
          priority
        />

        {/* "Online" is doing real work here. The page named Montreal four times
            and never once said where the workshop happens, so a visitor in
            Delhi could reasonably read this as an event in Canada. */}
        <Chip>Live Online Workshop - Limited Seats</Chip>

        <h1 className="mt-6 max-w-[900px] font-display text-[32px] font-extrabold leading-[1.05] tracking-[-0.02em] text-fnl-ink md:text-[56px]">
          French for Canadian PR: Live Assessment Workshop
        </h1>

        <p className="mt-5 max-w-[640px] text-[17px] leading-[1.55] text-fnl-body md:text-[19px]">
          Discover in 90 minutes if French is your fastest path to Canadian PR. Take a live
          assessment and get your personalized French learning strategy - completely free.
        </p>

        <VideoFacade className="mt-8 max-w-[680px]" />

        <Cta href="/webinar-form/" className="mt-7 max-w-[420px]">
          Reserve My Free Spot
        </Cta>

        <p className="mt-4 text-[15px] leading-[1.5] text-fnl-body">
          <span className="text-fnl-danger line-through">$19 CAD Value</span>
          <span className="ml-2 font-semibold text-fnl-success">
            Absolutely FREE For a Limited Time!
          </span>
        </p>

        <div className="mt-9 w-full max-w-[420px]">
          <Label className="text-center">Next live session starts in</Label>
          <Countdown targetIso={startsAt} expiredLabel="We're live right now" className="mt-3" />
          <p className="mt-3 text-[15px] leading-[1.5] text-fnl-mute">{displayDate}</p>
          <LocalTime iso={startsAt} className="mt-1 text-fnl-mute" />
        </div>
      </div>
    </section>
  );
}
