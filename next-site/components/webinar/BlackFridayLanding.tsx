import type { ReactNode } from 'react';
import Image from 'next/image';
import {
  Award,
  Check,
  Clock,
  Flag,
  LineChart,
  MapPin,
  MessagesSquare,
  Target,
  Users,
} from 'lucide-react';
import Countdown from '@/components/webinar/Countdown';
import ForwardTracking from '@/components/webinar/ForwardTracking';
import FunnelFooter from '@/components/webinar/FunnelFooter';
import VideoFacade from '@/components/webinar/VideoFacade';
import WebinarPixel from '@/components/webinar/WebinarPixel';
import YouTubeFacade from '@/components/webinar/YouTubeFacade';
import { cn } from '@/lib/cn';
import { BLACK_FRIDAY } from '@/lib/promo';
import { getWallResults } from '@/lib/wall-results';
import type { Webinar } from '@/lib/webinar';

/**
 * Black Friday 2026 version of the webinar landing page (Vyom, via Allen,
 * 25 Nov 2026). Same funnel, same GHL form, same 4 CTAs and the same copy that
 * converted; the skin is Black Friday.
 *
 * Palette: black base, and the two colours of the Frenchify logo itself.
 *  - #06080D black, #0C111C raised black: the Black Friday base.
 *  - #193357 logo navy: the two punctuation bands (includes, final decision).
 *  - #D9B254 logo gold: everything that means "the deal" (ticker, sticker,
 *    prices, countdown, step numbers). Nothing else is gold.
 *  - #2563EB site blue: the CTA fill, and nothing else, so the button is the
 *    only blue thing on a black page.
 *
 * Kept from the locked funnel system: no gradient text, no shadows, Sora at
 * 800 max, every CTA a real <a> to /webinar-form/, click-to-play video
 * facades, lazy result screenshots. The one piece of motion is the CSS ticker,
 * and it stops under prefers-reduced-motion.
 *
 * New copy on this page (the Black Friday parts) is written in ASD-STE100.
 */

const painPoints = [
  {
    Icon: LineChart,
    title: "CRS Score Isn't Competitive",
    copy: "Draws keep hitting 480+ and your score isn't close. You're watching months go by with no guarantee.",
  },
  {
    Icon: Clock,
    title: 'Time is Running Out',
    copy: "Your age points are decreasing, permits need renewal, and other options take years you don't have.",
  },
  {
    Icon: Target,
    title: 'Opportunity Cost is Huge',
    copy: 'Every month you wait is lost Canadian income, career growth, and life progress.',
  },
];

const benefits = [
  { Icon: LineChart, title: 'Add 50+ CRS points', copy: 'Guarantee your selection in the next draw' },
  {
    Icon: Award,
    title: 'Access special francophone draws',
    copy: 'With significantly lower cutoff scores',
  },
  { Icon: Flag, title: 'Qualify for dedicated streams', copy: 'In multiple provinces across Canada' },
  { Icon: Users, title: 'Skip the competition', copy: 'Only 5% of candidates speak French' },
];

const stats = [
  { value: '50+', label: 'CRS Points' },
  { value: '8-12', label: 'Months to PR' },
  { value: '95%', label: 'Less Competition' },
  { value: 'Proven', label: 'Pathway' },
];

const workshopSteps = [
  {
    Icon: Target,
    title: 'Personal Assessment',
    copy: 'Answer 20 strategic questions to predict your success and get instant results.',
  },
  {
    Icon: MapPin,
    title: 'Custom Roadmap',
    copy: 'Receive a personalized timeline and strategy to reach CLB 7 based on your score.',
  },
  {
    Icon: LineChart,
    title: 'ROI Analysis',
    copy: 'Understand the cost of waiting vs investing in French with a financial comparison.',
  },
  {
    Icon: MessagesSquare,
    title: 'Live Q&A Session',
    copy: 'Meet students who got their PR using French and ask them anything.',
  },
];

const includes = [
  { title: 'Live 20-question Assessment', copy: 'Know your exact French PR potential' },
  { title: 'Personalized Score Interpretation', copy: 'What your results mean for your timeline' },
  { title: 'Custom Learning Roadmap', copy: 'Step-by-step plan based on YOUR situation' },
  { title: 'Latest Immigration Updates', copy: 'Francophone opportunities most people miss' },
  { title: 'ROI Analysis Worksheet', copy: 'Compare French investment vs waiting' },
  { title: 'Exclusive Discount Codes', copy: 'Up to $100 CAD off programs' },
];

const faqs = [
  // New for Black Friday, ASD-STE100.
  {
    q: 'What is the Black Friday offer?',
    a: 'Vyom shows the offer live in the workshop. Only workshop guests get it. Reserve your free spot to see it.',
  },
  {
    q: "I don't have time to learn a new language",
    a: 'The assessment reveals if you have enough time based on your specific timeline. Many students reach CLB 7 in 8-12 months with just 2-3 hours daily.',
  },
  {
    q: 'French seems too difficult',
    a: 'French shares 60% vocabulary with English. The assessment measures your language learning aptitude - you might be surprised by your natural ability.',
  },
  {
    q: "I'm not sure if it's worth the investment",
    a: "The workshop includes a complete ROI analysis. You'll see the exact financial comparison between investing in French and the cost of waiting.",
  },
  {
    q: 'What if I fail the TEF/TCF exam?',
    a: 'The assessment predicts your success probability. Plus, our students have an 80% first-attempt pass rate, and exams can be retaken.',
  },
];

const PLAYLIST_ID = 'PLIX434KgUuaHsNre2lGTCXOTsROKjy6Z3';
const PLAYLIST_POSTER_VIDEO = '5PnAcrE9V9Y';
const PLAYLIST_COUNT = 34;
const EAGER_RESULTS = 4;

/** 24-point starburst for the price sticker. Built once, at module load. */
const STARBURST = `polygon(${Array.from({ length: 48 }, (_, i) => {
  const r = i % 2 ? 43 : 50;
  const a = (Math.PI * 2 * i) / 48 - Math.PI / 2;
  return `${(50 + r * Math.cos(a)).toFixed(2)}% ${(50 + r * Math.sin(a)).toFixed(2)}%`;
}).join(', ')})`;

/** The ticker is the page's only motion. It stops for reduced-motion users. */
const TICKER_CSS =
  '@keyframes bf-marquee{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}' +
  '.bf-marquee{animation:bf-marquee 40s linear infinite}' +
  '@media (prefers-reduced-motion:reduce){.bf-marquee{animation:none}}';

/** "Saturday 28th November 2026 | 8:00 PM (Montreal ..." -> "8:00 PM". */
function timeOf(displayDate: string): string | null {
  const m = displayDate.match(/\|\s*([0-9]{1,2}:[0-9]{2}\s*[AP]M)/i);
  return m ? m[1] : null;
}

/* ------------------------------------------------------------------ */
/* Page primitives. Local on purpose: the shared funnel ones are built */
/* for a white page.                                                   */
/* ------------------------------------------------------------------ */

const TONE = {
  black: 'bg-[#06080D]',
  raise: 'bg-[#0C111C]',
  navy: 'bg-[#193357]',
} as const;

function Section({
  tone = 'black',
  id,
  className,
  children,
}: {
  tone?: keyof typeof TONE;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn('w-full', TONE[tone], className)}>
      <div className="mx-auto w-full max-w-[1120px] px-5 py-14 md:px-8 md:py-24">{children}</div>
    </section>
  );
}

function H2({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <h2
      className={cn(
        'font-display text-[26px] font-extrabold leading-[1.1] tracking-[-0.015em] text-white md:text-[40px]',
        className
      )}
    >
      {children}
    </h2>
  );
}

function Lead({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p className={cn('text-[17px] leading-[1.55] text-white/75 md:text-[19px]', className)}>
      {children}
    </p>
  );
}

function Label({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p
      className={cn(
        'text-[12px] font-semibold uppercase leading-[1.2] tracking-[0.08em] text-white/55',
        className
      )}
    >
      {children}
    </p>
  );
}

function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('rounded-[14px] border border-white/10 bg-white/[0.03] p-6', className)}>
      {children}
    </div>
  );
}

function IconTile({ Icon }: { Icon: typeof LineChart }) {
  return (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.04] text-[#60A5FA]">
      <Icon className="h-5 w-5" strokeWidth={1.75} />
    </span>
  );
}

/**
 * Same contract as the funnel Cta: a real anchor, so Meta's click ids survive
 * the hop into /webinar-form/ and the GHL iframe. Blue on black, white on the
 * navy bands (blue on navy is unreadable).
 */
function BfCta({
  variant = 'blue',
  className,
  children,
}: {
  variant?: 'blue' | 'onNavy';
  className?: string;
  children: ReactNode;
}) {
  const onNavy = variant === 'onNavy';
  return (
    <a
      href="/webinar-form/"
      className={cn(
        'relative inline-flex w-full items-center justify-center rounded-[10px] px-7 py-4 text-[16px] font-semibold leading-none transition-colors duration-[120ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B254] focus-visible:ring-offset-2 sm:w-auto',
        onNavy
          ? 'bg-white text-[#193357] hover:bg-[#EEF2F8] focus-visible:ring-offset-[#193357]'
          : 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] focus-visible:ring-offset-[#06080D]',
        className
      )}
    >
      <span
        className={cn(
          'pointer-events-none absolute -top-3 right-3 whitespace-nowrap rounded-full bg-[#D9B254] px-2.5 py-1 text-[11px] font-bold uppercase leading-none tracking-[0.06em] text-[#06080D] ring-2',
          onNavy ? 'ring-[#193357]' : 'ring-[#06080D]'
        )}
      >
        {BLACK_FRIDAY.tag}
      </span>
      {children}
    </a>
  );
}

function PriceLine({ className }: { className?: string }) {
  return (
    <p className={cn('text-[15px] leading-[1.5] text-white/75', className)}>
      <span className="text-[#F87171] line-through">$19 CAD Value</span>
      <span className="ml-2 font-semibold text-[#D9B254]">Absolutely FREE For a Limited Time!</span>
    </p>
  );
}

/* ------------------------------------------------------------------ */

export default function BlackFridayLanding({ webinar }: { webinar: Webinar }) {
  const { clb7, clb5 } = getWallResults();
  const resultImages = [...clb7, ...clb5];
  const time = timeOf(webinar.displayDate);
  const whenShort = time ? `${webinar.shortDate}, ${time}` : webinar.shortDate;

  // Ticker copy, ASD-STE100. Each half holds the list twice so one half is
  // always wider than the screen and the -50% loop has no gap.
  const tickerItems = [
    'Black Friday',
    'Free live workshop',
    'The offer is only for workshop guests',
    `Next workshop: ${webinar.shortDate}`,
  ];
  const tickerHalf = [...tickerItems, ...tickerItems];

  return (
    <div className="bg-[#06080D] text-white">
      <style>{TICKER_CSS}</style>

      {/* 0 — TICKER. Not a link: the page keeps its 4 CTAs. */}
      <div
        role="note"
        aria-label={`Black Friday. Free live workshop. The offer is only for workshop guests. Next workshop: ${webinar.shortDate}.`}
        className="w-full overflow-hidden bg-[#D9B254] text-[#06080D]"
      >
        <div className="bf-marquee flex w-max" aria-hidden>
          {[0, 1].map((half) => (
            <ul key={half} className="flex shrink-0 items-center">
              {tickerHalf.map((item, i) => (
                <li
                  key={`${half}-${i}`}
                  className="flex items-center gap-5 whitespace-nowrap py-2.5 pl-5 text-[12px] font-bold uppercase leading-none tracking-[0.1em] md:text-[13px]"
                >
                  <span className="h-[6px] w-[6px] rotate-45 bg-[#06080D]" />
                  {item}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* 1 — HERO */}
      <section className="w-full bg-[#06080D]">
        <div className="mx-auto grid w-full max-w-[1120px] grid-cols-1 items-center gap-8 px-5 pb-12 pt-7 md:px-8 md:pb-20 md:pt-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] lg:gap-14">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Image
              src="/brand/frenchify-logo-reverse.webp"
              alt="Frenchify with Vyom"
              width={132}
              height={36}
              className="h-[30px] w-auto md:h-[34px]"
              priority
            />

            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#D9B254]/45 px-3 py-1.5 text-[11px] font-semibold uppercase leading-[1.2] tracking-[0.1em] text-[#E2C171] md:mt-7 md:text-[12px]">
              Black Friday
              <span aria-hidden className="h-1 w-1 rounded-full bg-[#D9B254]" />
              Live Online Workshop
            </span>

            <p className="mt-4 font-display text-[clamp(36px,10.4vw,64px)] font-extrabold uppercase leading-[0.86] tracking-[-0.035em] md:mt-6 lg:text-[118px]">
              <span className="text-white lg:block">Black</span>{' '}
              <span className="text-[#D9B254] lg:block">Friday</span>
            </p>

            <h1 className="mt-5 max-w-[620px] font-display text-[26px] font-extrabold leading-[1.1] tracking-[-0.02em] text-white md:mt-7 md:text-[36px]">
              French for Canadian PR: Live Assessment Workshop
            </h1>

            <p className="mt-4 max-w-[560px] text-[16px] leading-[1.55] text-white/75 md:text-[18px]">
              Discover in 90 minutes if French is your fastest path to Canadian PR. Take a live
              assessment and get your personalized French learning strategy - completely free.
            </p>

            {/* Desktop CTA. On phones the button sits under the video instead,
                so the order there matches the converting page. */}
            <div className="mt-8 hidden w-full flex-col items-start lg:flex">
              <BfCta className="max-w-[420px]">Reserve My Free Spot</BfCta>
              <PriceLine className="mt-4" />
            </div>
          </div>

          <div className="flex w-full flex-col items-center">
            <div className="relative w-full max-w-[680px]">
              <VideoFacade className="border-white/15" />
              {/* The sticker hangs off the top corner and never covers the
                  centre of the poster, where Vyom's face is. */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-7 right-1 z-10 rotate-[10deg] md:-right-6 md:-top-9"
              >
                <div
                  className="flex h-[86px] w-[86px] flex-col items-center justify-center bg-[#D9B254] text-[#06080D] md:h-[118px] md:w-[118px]"
                  style={{ clipPath: STARBURST }}
                >
                  <span className="text-[10px] font-bold uppercase leading-none tracking-[0.06em] line-through decoration-[1.5px] md:text-[12px]">
                    $19 CAD
                  </span>
                  <span className="mt-1 font-display text-[24px] font-extrabold leading-none tracking-[-0.02em] md:text-[32px]">
                    FREE
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-7 flex w-full flex-col items-center lg:hidden">
              <BfCta className="max-w-[420px]">Reserve My Free Spot</BfCta>
              <PriceLine className="mt-4 text-center" />
            </div>

            <div className="mt-9 w-full max-w-[420px] lg:mt-8 lg:max-w-[680px]">
              <Label className="text-center">Next live session starts in</Label>
              <Countdown
                targetIso={webinar.startsAt}
                tone="gold"
                expiredLabel="We're live right now"
                className="mt-3"
              />
              <p className="mt-3 text-center text-[15px] leading-[1.5] text-white/55">
                {webinar.displayDate}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — FACT STRIP. Hairlines via a 1px gap over a tinted grid. */}
      <section className="w-full border-y border-white/10 bg-[#06080D]">
        <div className="mx-auto w-full max-w-[1120px] md:px-8">
          <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-[1.1fr_1.45fr_0.8fr_1fr]">
            <div className="bg-[#06080D] px-5 py-5 md:px-6">
              <Label>Host</Label>
              <p className="mt-1 text-[17px] font-bold leading-[1.3] text-white">Vyom Sharma</p>
              <p className="mt-1 text-[15px] leading-[1.5] text-white/55">
                Online, join from anywhere
              </p>
            </div>
            <div className="bg-[#06080D] px-5 py-5 md:px-6">
              <Label>When</Label>
              <p className="mt-1 text-[17px] font-bold leading-[1.3] text-white">
                {webinar.displayDate}
              </p>
            </div>
            <div className="bg-[#06080D] px-5 py-5 md:px-6">
              <Label>Investment</Label>
              <p className="mt-1 text-[17px] font-bold leading-[1.3]">
                <span className="text-[#F87171] line-through">$19 CAD</span>
                <span className="ml-2 text-[#D9B254]">FREE!</span>
              </p>
            </div>
            <div className="bg-[#06080D] px-5 py-5 md:px-6">
              <Label className="text-[#D9B254]">Black Friday</Label>
              <p className="mt-1 text-[17px] font-bold leading-[1.3] text-white">
                {BLACK_FRIDAY.tag}
              </p>
              <p className="mt-1 text-[15px] leading-[1.5] text-white/55">
                Only for workshop guests
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — HOW TO GET THE OFFER. New for Black Friday, ASD-STE100. */}
      <Section tone="raise">
        <div className="max-w-[640px]">
          <Label className="text-[#D9B254]">Black Friday 2026</Label>
          <H2 className="mt-3">How to get the Black Friday offer</H2>
          <Lead className="mt-4">
            Vyom shows the Black Friday offer live in the workshop. Only workshop guests get it.
          </Lead>
        </div>

        <ol className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-white/10 bg-white/10 md:mt-12 md:grid-cols-3">
          {[
            {
              title: 'Reserve your free spot',
              copy: 'Complete the short form. The workshop is free.',
            },
            {
              title: 'Join the live workshop',
              copy: `${whenShort}, Montreal time. Join online from anywhere.`,
            },
            {
              title: 'Get the Black Friday offer',
              copy: 'Vyom gives the offer to workshop guests in the live session.',
            },
          ].map((step, i) => (
            <li key={step.title} className="bg-[#0C111C] p-6 md:p-8">
              <span className="block font-display text-[48px] font-extrabold leading-none tracking-[-0.03em] text-[#D9B254] md:text-[64px]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-5 text-[19px] font-bold leading-[1.3] tracking-[-0.01em] text-white md:text-[22px]">
                {step.title}
              </h3>
              <p className="mt-2 text-[16px] leading-[1.6] text-white/70 md:text-[17px]">
                {step.copy}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 4 — PAIN */}
      <Section id="details">
        <div className="max-w-[640px]">
          <H2>Tired of Waiting in the Express Entry Pool?</H2>
          <Lead className="mt-4">
            If you&apos;re stuck with any of these problems, this workshop will show you a proven
            alternative.
          </Lead>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-3">
          {painPoints.map(({ Icon, title, copy }) => (
            <Card key={title}>
              <IconTile Icon={Icon} />
              <h3 className="mt-4 text-[19px] font-bold leading-[1.3] tracking-[-0.01em] text-white md:text-[22px]">
                {title}
              </h3>
              <p className="mt-2 text-[16px] leading-[1.6] text-white/70 md:text-[17px]">{copy}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 5 — SOLUTION */}
      <Section tone="raise">
        <div className="max-w-[640px]">
          <H2>What if French Could Change Everything?</H2>
          <Lead className="mt-4">
            While thousands wait, smart candidates are using French to guarantee their PR
            invitation.
          </Lead>
        </div>
        <div className="mt-10 grid grid-cols-1 items-start gap-8 md:mt-12 lg:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="text-[19px] font-bold leading-[1.3] tracking-[-0.01em] text-white md:text-[22px]">
              Here&apos;s what French can do for your application:
            </h3>
            <ul className="mt-6 space-y-5">
              {benefits.map(({ Icon, title, copy }) => (
                <li key={title} className="flex items-start gap-4">
                  <IconTile Icon={Icon} />
                  <div>
                    <p className="text-[17px] font-bold leading-[1.4] text-white">{title}</p>
                    <p className="mt-0.5 text-[16px] leading-[1.6] text-white/70 md:text-[17px]">
                      {copy}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Card className="p-6 md:p-8">
            <h3 className="text-[19px] font-bold leading-[1.3] tracking-[-0.01em] text-white md:text-[22px]">
              The Numbers Don&apos;t Lie:
            </h3>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {stats.map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-[10px] border border-white/10 bg-[#06080D] px-4 py-5 text-center"
                >
                  <span className="block font-display text-[28px] font-extrabold leading-[1.1] tracking-[-0.015em] text-white md:text-[36px]">
                    {value}
                  </span>
                  <span className="mt-2 block text-[12px] font-semibold uppercase leading-[1.2] tracking-[0.08em] text-white/55">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* 6 — RESULTS RAIL, then CTA 2 */}
      <Section>
        <div className="max-w-[640px]">
          <H2>Wall of Excellence</H2>
          <Lead className="mt-4">
            Every screenshot below is a real TEF/TCF attestation from a Frenchify student.
          </Lead>
          <p className="mt-3 text-[16px] leading-[1.6] text-white/70 md:text-[17px]">
            <span className="font-bold text-white">150+ Verified results</span>
          </p>
        </div>

        <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 scroll-pl-5 overflow-x-auto px-5 pb-4 [-webkit-overflow-scrolling:touch] [scrollbar-color:rgba(255,255,255,0.25)_transparent] [scrollbar-width:thin] md:-mx-8 md:mt-10 md:scroll-pl-8 md:px-8">
          {resultImages.map((src, i) => (
            <figure
              key={src}
              className="w-[250px] shrink-0 snap-start overflow-hidden rounded-[14px] border border-white/10 bg-white md:w-[300px]"
            >
              <div className="aspect-[940/788] w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  width={940}
                  height={788}
                  loading={i < EAGER_RESULTS ? 'eager' : 'lazy'}
                  fetchPriority="low"
                  sizes="(min-width: 768px) 300px, 250px"
                  decoding="async"
                  className="h-full w-full object-contain"
                />
              </div>
            </figure>
          ))}
          <div className="flex w-[250px] shrink-0 snap-start items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.03] px-6 text-center md:w-[300px]">
            <p className="font-display text-[24px] font-extrabold leading-[1.2] tracking-[-0.015em] text-white md:text-[28px]">
              and more...
            </p>
          </div>
        </div>

        <p className="mt-3 text-[14px] leading-[1.5] text-white/55 md:text-[15px]">
          Swipe or scroll sideways to see the rest.
        </p>

        <div className="mt-10 flex justify-center">
          <BfCta className="max-w-[420px]">Reserve My Free Spot</BfCta>
        </div>
      </Section>

      {/* 7 — WHAT HAPPENS IN THE WORKSHOP */}
      <Section tone="raise">
        <div className="max-w-[640px]">
          <H2>What Happens in This Live Assessment Workshop</H2>
          <Lead className="mt-4">
            This isn&apos;t a typical webinar. You&apos;ll actively participate in a live assessment
            that determines your French PR potential.
          </Lead>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-4">
          {workshopSteps.map(({ Icon, title, copy }, i) => (
            <Card key={title}>
              <div className="flex items-center justify-between">
                <IconTile Icon={Icon} />
                <Label>Step {String(i + 1).padStart(2, '0')}</Label>
              </div>
              <h3 className="mt-4 text-[19px] font-bold leading-[1.3] tracking-[-0.01em] text-white md:text-[22px]">
                {title}
              </h3>
              <p className="mt-2 text-[16px] leading-[1.6] text-white/70 md:text-[17px]">{copy}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 8 — MEET VYOM */}
      <Section>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-14">
          <div className="overflow-hidden rounded-[14px] border border-white/10 bg-white/[0.03]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/vyom-portrait-760.webp"
              srcSet="/brand/vyom-portrait-380.webp 380w, /brand/vyom-portrait-760.webp 760w"
              alt="Vyom Sharma"
              width={794}
              height={908}
              sizes="(min-width: 1024px) 380px, 100vw"
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </div>
          <div>
            <H2>Meet Vyom: He Actually Walked This Path</H2>
            <Lead className="mt-4 max-w-[640px]">
              This isn&apos;t theory from someone who&apos;s never done it. Vyom used this exact
              French strategy to get his own Canadian PR.
            </Lead>
            <Card className="mt-8 p-6 md:p-8">
              <Label>My Story</Label>
              <p className="mt-3 text-[16px] leading-[1.6] text-white/75 md:text-[17px]">
                I arrived in Canada in December 2018. After my studies, I was stuck in the Express
                Entry pool with a CRS score that wasn&apos;t competitive enough. In April 2021, I
                started learning French. In just 8 months, I went from zero to CLB 7 and added 62
                points to my CRS score. I received my PR invitation in November 2022.
              </p>
              <hr className="my-6 border-0 border-t border-white/10" />
              <p className="text-[16px] leading-[1.6] text-white/75 md:text-[17px]">
                The assessment in this workshop is what I wish I had when I started. Instead of
                guessing if French is right for you, you&apos;ll know for certain.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* 9 — INCLUDES + PRICE, then CTA 3. Navy band 1 of 2. */}
      <Section tone="navy">
        <div className="max-w-[640px]">
          <H2>Your Free Workshop Includes:</H2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2">
          {includes.map((it) => (
            <div
              key={it.title}
              className="flex items-start gap-4 rounded-[14px] border border-white/15 p-5"
            >
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D9B254] text-[#06080D]">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              <div>
                <p className="text-[17px] font-bold leading-[1.4] text-white">{it.title}</p>
                <p className="mt-1 text-[16px] leading-[1.6] text-white/75">{it.copy}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/15 pt-8 text-center">
          <p className="text-[17px] leading-[1.6] text-white/75">
            Regular Workshop Price: <span className="line-through">$19 CAD</span>
          </p>
          <p className="mt-2 font-display text-[22px] font-extrabold leading-[1.2] tracking-[-0.015em] text-white md:text-[28px]">
            Today&apos;s Price: FREE! (Plus $497 in Bonuses)
          </p>
          {/* New for Black Friday, ASD-STE100. */}
          <p className="mt-3 text-[16px] font-semibold leading-[1.5] text-[#E2C171] md:text-[17px]">
            Plus the Black Friday offer, only in the live workshop.
          </p>
          <div className="mt-8 flex justify-center">
            <BfCta variant="onNavy" className="max-w-[420px]">
              Reserve My Free Spot
            </BfCta>
          </div>
        </div>
      </Section>

      {/* 10 — VIDEO TESTIMONIALS */}
      <Section>
        <div className="mx-auto max-w-[640px] text-center">
          <H2>Hear Directly From Our Students</H2>
          <Lead className="mt-4">
            {PLAYLIST_COUNT} success stories from students who cleared CLB 5 and CLB 7. Play them
            straight through, right here.
          </Lead>
        </div>
        <div className="mx-auto mt-8 max-w-[800px] md:mt-10">
          <YouTubeFacade
            playlistId={PLAYLIST_ID}
            posterVideoId={PLAYLIST_POSTER_VIDEO}
            title="CLB 5 and CLB 7 Student Success Stories"
            className="border-white/15"
          />
        </div>
      </Section>

      {/* 11 — FAQ */}
      <Section tone="raise">
        <div className="mx-auto max-w-[640px] text-center">
          <H2>Still Have Doubts?</H2>
        </div>
        <div className="mx-auto mt-8 max-w-[800px] md:mt-10">
          {faqs.map(({ q, a }, i) => (
            <details key={q} className="group border-b border-white/10" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[19px] font-bold leading-[1.3] tracking-[-0.01em] text-white [&::-webkit-details-marker]:hidden md:text-[22px]">
                <span>&ldquo;{q}&rdquo;</span>
                <span
                  aria-hidden
                  className="mt-1 shrink-0 text-white/50 transition-transform duration-[180ms] group-open:rotate-180 motion-reduce:transition-none"
                >
                  <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
                    <path d="M10 13.2 3.6 6.8l1.4-1.4L10 10.4l5-5 1.4 1.4z" />
                  </svg>
                </span>
              </summary>
              <p className="pb-5 pr-10 text-[16px] leading-[1.6] text-white/70 md:text-[17px]">
                {a}
              </p>
            </details>
          ))}
        </div>
      </Section>

      {/* 12 — FINAL DECISION, then CTA 4. Navy band 2 of 2. */}
      <Section tone="navy" id="register">
        <div className="mx-auto max-w-[720px] text-center">
          <H2>Your Canadian PR Journey Starts with One Decision</H2>

          <div className="mt-10 space-y-4 text-left">
            <div className="rounded-[14px] border border-white/15 p-5">
              <Label className="text-white/60">Option 1</Label>
              <p className="mt-2 text-[16px] leading-[1.6] text-white/80 md:text-[17px]">
                Keep waiting in Express Entry, hoping draws get easier (they won&apos;t), watching
                opportunities pass by.
              </p>
            </div>
            <div className="rounded-[14px] border border-[#D9B254]/60 bg-[#D9B254]/[0.08] p-5">
              <Label className="text-[#E2C171]">Option 2</Label>
              <p className="mt-2 text-[16px] leading-[1.6] text-white md:text-[17px]">
                Take 90 minutes to discover if French could be your PR game-changer and get a
                personalized roadmap.
              </p>
            </div>
          </div>

          <p className="mt-8 text-[17px] leading-[1.6] text-white/80 md:text-[19px]">
            This workshop, normally <span className="font-semibold text-white">$19 CAD</span>, is
            completely free today. The assessment alone is worth hundreds in consultation fees.
          </p>

          <div className="mx-auto mt-10 max-w-[420px]">
            <Label className="text-white/60">Workshop starts in</Label>
            <Countdown
              targetIso={webinar.startsAt}
              joinUrl={webinar.joinUrl}
              tone="gold"
              expiredLabel="We're live right now"
              className="mt-3"
            />
            <p className="mt-3 text-[15px] leading-[1.5] text-white/60">{webinar.displayDate}</p>
          </div>

          <div className="mt-8 flex justify-center">
            <BfCta variant="onNavy" className="max-w-[420px]">
              Claim My Spot Before It&apos;s Full
            </BfCta>
          </div>

          <p className="mx-auto mt-5 max-w-[520px] text-[15px] leading-[1.5] text-white/60">
            Registration closes when we hit capacity or 24 hours before the workshop!
          </p>
        </div>
      </Section>

      <FunnelFooter tone="dark" />

      <ForwardTracking />
      <WebinarPixel />
    </div>
  );
}
