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
import HeroSection from '@/components/sections/sunday-webinar/HeroSection';
import Countdown from '@/components/webinar/Countdown';
import ForwardTracking from '@/components/webinar/ForwardTracking';
import FunnelFooter from '@/components/webinar/FunnelFooter';
import LocalTime from '@/components/webinar/LocalTime';
import YouTubeFacade from '@/components/webinar/YouTubeFacade';
import { Card, Cta, Divider, H2, Label, Lead, Section } from '@/components/webinar/ui';
import { getWallResults } from '@/lib/wall-results';
import type { Webinar } from '@/lib/webinar';

/**
 * The Sunday webinar landing page, rendered by two routes: the evergreen
 * /sunday-webinar, and the dated /webinar/<slug> that each week's Meta ads
 * point at. Everything date-shaped arrives as the `webinar` prop, which is
 * resolved once from content/webinar/schedule.json.
 *
 * Built to the locked funnel system: white page, two navy bands and nothing
 * else dark, four CTAs at fixed positions, hairlines instead of shadows, and
 * no entrance animation anywhere. The copy is the copy that converted — the
 * only edit is naming the exam TEF/TCF.
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
  {
    Icon: LineChart,
    title: 'Add 50+ CRS points',
    copy: 'Guarantee your selection in the next draw',
  },
  {
    Icon: Award,
    title: 'Access special francophone draws',
    copy: 'With significantly lower cutoff scores',
  },
  {
    Icon: Flag,
    title: 'Qualify for dedicated streams',
    copy: 'In multiple provinces across Canada',
  },
  {
    Icon: Users,
    title: 'Skip the competition',
    copy: 'Only 5% of candidates speak French',
  },
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

/** Student success stories, same playlist the /testimonials page plays. */
const PLAYLIST_ID = 'PLIX434KgUuaHsNre2lGTCXOTsROKjy6Z3';
/** First video in that playlist — the still is all it is used for. */
const PLAYLIST_POSTER_VIDEO = '5PnAcrE9V9Y';
const PLAYLIST_COUNT = 34;

/**
 * Proof unseen is proof wasted, but 100+ remote screenshots on first paint is
 * the bigger tax on ad traffic. Four load with the page; the rest arrive as the
 * rail is swiped.
 *
 * Those four are still fetched at low priority. React hoists any img that is
 * not `loading="lazy"` into a <link rel="preload"> in the head, which put 149 KB
 * of section-five screenshots in front of the hero poster in the queue — the
 * page's LCP. `fetchPriority="low"` keeps the request and drops the queue
 * position, so the rail is never blank on the first swipe and the hero still
 * paints first.
 */
const EAGER_RESULTS = 4;

/** A small square mark. No gradient fill, no coloured tile per item. */
function IconTile({ Icon }: { Icon: typeof LineChart }) {
  return (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-fnl-line bg-fnl-surface-alt text-fnl-ink">
      <Icon className="h-5 w-5" strokeWidth={1.75} />
    </span>
  );
}

export default function WebinarLanding({ webinar }: { webinar: Webinar }) {
  const { clb7, clb5 } = getWallResults();
  // CLB 7 first: it is the score that unlocks the francophone draws, so the
  // four that load eagerly are the four that answer the page's promise.
  const resultImages = [...clb7, ...clb5];

  return (
    <>
      {/* 1 — HERO */}
      <HeroSection startsAt={webinar.startsAt} displayDate={webinar.displayDate} />

      {/* 2 — FACT STRIP. Three facts, hairline separated. Not three cards. */}
      <section className="w-full border-y border-fnl-line bg-fnl-surface">
        <div className="mx-auto grid w-full max-w-[1120px] grid-cols-1 divide-y divide-fnl-line px-5 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-8">
          <div className="py-5 md:pr-8">
            <Label>Host</Label>
            <p className="mt-1 text-[17px] font-bold leading-[1.3] text-fnl-ink">Vyom Sharma</p>
            <p className="mt-1 text-[15px] leading-[1.5] text-fnl-mute">Online, join from anywhere</p>
          </div>
          <div className="py-5 md:px-8">
            <Label>When</Label>
            <p className="mt-1 text-[17px] font-bold leading-[1.3] text-fnl-ink">
              {webinar.displayDate}
            </p>
            <LocalTime iso={webinar.startsAt} className="mt-1 text-fnl-mute" />
          </div>
          <div className="py-5 md:pl-8">
            <Label>Investment</Label>
            <p className="mt-1 text-[17px] font-bold leading-[1.3] text-fnl-ink">
              <span className="text-fnl-danger line-through">$19 CAD</span>
              <span className="ml-2 text-fnl-success">FREE!</span>
            </p>
          </div>
        </div>
      </section>

      {/* 3 — PAIN */}
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
              <h3 className="mt-4 text-[19px] font-bold leading-[1.3] tracking-[-0.01em] text-fnl-ink md:text-[22px]">
                {title}
              </h3>
              <p className="mt-2 text-[16px] leading-[1.6] text-fnl-body md:text-[17px]">{copy}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 4 — SOLUTION */}
      <Section tone="alt">
        <div className="max-w-[640px]">
          <H2>What if French Could Change Everything?</H2>
          <Lead className="mt-4">
            While thousands wait, smart candidates are using French to guarantee their PR
            invitation.
          </Lead>
        </div>

        <div className="mt-10 grid grid-cols-1 items-start gap-8 md:mt-12 lg:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="text-[19px] font-bold leading-[1.3] tracking-[-0.01em] text-fnl-ink md:text-[22px]">
              Here&apos;s what French can do for your application:
            </h3>
            <ul className="mt-6 space-y-5">
              {benefits.map(({ Icon, title, copy }) => (
                <li key={title} className="flex items-start gap-4">
                  <IconTile Icon={Icon} />
                  <div>
                    <p className="text-[17px] font-bold leading-[1.4] text-fnl-ink">{title}</p>
                    <p className="mt-0.5 text-[16px] leading-[1.6] text-fnl-body md:text-[17px]">
                      {copy}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Card className="p-6 md:p-8">
            <h3 className="text-[19px] font-bold leading-[1.3] tracking-[-0.01em] text-fnl-ink md:text-[22px]">
              The Numbers Don&apos;t Lie:
            </h3>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {stats.map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-[10px] border border-fnl-line bg-fnl-surface-alt px-4 py-5 text-center"
                >
                  <span className="block font-display text-[28px] font-extrabold leading-[1.1] tracking-[-0.015em] text-fnl-ink md:text-[36px]">
                    {value}
                  </span>
                  <span className="mt-2 block text-[12px] font-semibold uppercase leading-[1.2] tracking-[0.08em] text-fnl-mute">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* 5 — RESULTS RAIL, then CTA 2. Native scroll-snap, no carousel script. */}
      <Section className="border-t border-fnl-line">
        <div className="max-w-[640px]">
          <H2>Wall of Excellence</H2>
          <Lead className="mt-4">
            Every screenshot below is a real TEF/TCF attestation from a Frenchify student.
          </Lead>
          <p className="mt-3 text-[16px] leading-[1.6] text-fnl-body md:text-[17px]">
            <span className="font-bold text-fnl-ink">{resultImages.length} verified results</span> so
            far: {clb7.length} at CLB 7 or higher, {clb5.length} at CLB 5.
          </p>
        </div>

        {/* The rail bleeds back out to the container padding so a half-cut card
            sits at the right edge, which is the only affordance a scroll rail
            needs. Momentum and snapping are the browser's — no carousel script,
            no hydration cost, and it keeps working with JS off. */}
        {/* scroll-pl matters: snap alignment is measured from the scrollport
            edge, not the padding box, so without it the browser parks the first
            card 20px left of the heading it is supposed to line up with. */}
        <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 scroll-pl-5 overflow-x-auto px-5 pb-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:thin] md:-mx-8 md:mt-10 md:scroll-pl-8 md:px-8">
          {resultImages.map((src, i) => (
            <figure
              key={src}
              className="w-[250px] shrink-0 snap-start overflow-hidden rounded-[14px] border border-fnl-line bg-fnl-surface-alt md:w-[300px]"
            >
              <div className="aspect-[940/788] w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  /* Empty on purpose. 109 identical alt strings is 109
                     repetitions of the same sentence for a screen reader; the
                     heading and the count line above already describe the
                     group, and no single card carries meaning on its own. */
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
        </div>

        <p className="mt-3 text-[14px] leading-[1.5] text-fnl-mute md:text-[15px]">
          Swipe or scroll sideways to see the rest.
        </p>

        <div className="mt-10 flex justify-center">
          <Cta href="/webinar-form/" className="max-w-[420px]">
            Reserve My Free Spot
          </Cta>
        </div>
      </Section>

      {/* 6 — WHAT HAPPENS IN THE WORKSHOP */}
      <Section className="border-t border-fnl-line">
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
              <h3 className="mt-4 text-[19px] font-bold leading-[1.3] tracking-[-0.01em] text-fnl-ink md:text-[22px]">
                {title}
              </h3>
              <p className="mt-2 text-[16px] leading-[1.6] text-fnl-body md:text-[17px]">{copy}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 7 — MEET VYOM */}
      <Section tone="alt">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-14">
          <div className="overflow-hidden rounded-[14px] border border-fnl-line bg-fnl-surface">
            {/* Was the GoHighLevel-hosted original: an 831 KB PNG of a
                photograph, by a distance the heaviest thing on the page. Same
                frame as WebP is 54 KB. It is lazy and below the fold so it never
                counted against the first-load gate, but it is most of what a
                visitor pays for scrolling to Vyom's story on a budget phone. */}
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
              <p className="mt-3 text-[16px] leading-[1.6] text-fnl-body md:text-[17px]">
                I arrived in Canada in December 2018. After my studies, I was stuck in the Express
                Entry pool with a CRS score that wasn&apos;t competitive enough. In April 2021, I
                started learning French. In just 8 months, I went from zero to CLB 7 and added 62
                points to my CRS score. I received my PR invitation in November 2022.
              </p>
              <Divider className="my-6" />
              <p className="text-[16px] leading-[1.6] text-fnl-body md:text-[17px]">
                The assessment in this workshop is what I wish I had when I started. Instead of
                guessing if French is right for you, you&apos;ll know for certain.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* 8 — INCLUDES + PRICE, then CTA 3. Navy band 1 of 2. */}
      <Section tone="ink">
        <div className="max-w-[640px]">
          <H2 className="text-white">Your Free Workshop Includes:</H2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2">
          {includes.map((it) => (
            <div
              key={it.title}
              className="flex items-start gap-4 rounded-[14px] border border-white/15 p-5"
            >
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/25 text-white">
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
              <div>
                <p className="text-[17px] font-bold leading-[1.4] text-white">{it.title}</p>
                <p className="mt-1 text-[16px] leading-[1.6] text-white/70">{it.copy}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/15 pt-8 text-center">
          <p className="text-[17px] leading-[1.6] text-white/70">
            Regular Workshop Price: <span className="line-through">$19 CAD</span>
          </p>
          <p className="mt-2 font-display text-[22px] font-extrabold leading-[1.2] tracking-[-0.015em] text-white md:text-[28px]">
            Today&apos;s Price: FREE! (Plus $497 in Bonuses)
          </p>
          <div className="mt-8 flex justify-center">
            <Cta href="/webinar-form/" variant="onInk" className="max-w-[420px]">
              Reserve My Free Spot
            </Cta>
          </div>
        </div>
      </Section>

      {/* 9 — VIDEO TESTIMONIALS. Facade: a bare playlist iframe is ~900 KB. */}
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
          />
        </div>
      </Section>

      {/* 10 — FAQ */}
      <Section className="border-t border-fnl-line">
        <div className="mx-auto max-w-[640px] text-center">
          <H2>Still Have Doubts?</H2>
        </div>

        <div className="mx-auto mt-8 max-w-[800px] md:mt-10">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group border-b border-fnl-line">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[19px] font-bold leading-[1.3] tracking-[-0.01em] text-fnl-ink [&::-webkit-details-marker]:hidden md:text-[22px]">
                <span>&ldquo;{q}&rdquo;</span>
                <span
                  aria-hidden
                  className="mt-1 shrink-0 text-fnl-mute transition-transform duration-[180ms] group-open:rotate-180 motion-reduce:transition-none"
                >
                  <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
                    <path d="M10 13.2 3.6 6.8l1.4-1.4L10 10.4l5-5 1.4 1.4z" />
                  </svg>
                </span>
              </summary>
              <p className="pb-5 pr-10 text-[16px] leading-[1.6] text-fnl-body md:text-[17px]">
                {a}
              </p>
            </details>
          ))}
        </div>
      </Section>

      {/* 11 — FINAL DECISION, then CTA 4. Navy band 2 of 2. */}
      <Section tone="ink" id="register">
        <div className="mx-auto max-w-[720px] text-center">
          <H2 className="text-white">Your Canadian PR Journey Starts with One Decision</H2>

          <div className="mt-10 space-y-4 text-left">
            <div className="rounded-[14px] border border-white/15 p-5">
              <Label className="text-white/60">Option 1</Label>
              <p className="mt-2 text-[16px] leading-[1.6] text-white/80 md:text-[17px]">
                Keep waiting in Express Entry, hoping draws get easier (they won&apos;t), watching
                opportunities pass by.
              </p>
            </div>
            <div className="rounded-[14px] border border-white/30 bg-white/5 p-5">
              <Label className="text-white/60">Option 2</Label>
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
            {/* Was "Registration closes in", counting down to the start time,
                directly above a line saying registration closes 24 hours
                before the workshop. The two disagreed by a day, and a page
                selling to skeptics cannot afford a timer that reads as fake.
                The clock is honest about what it actually measures. */}
            <Label className="text-white/60">Workshop starts in</Label>
            <Countdown
              targetIso={webinar.startsAt}
              tone="dark"
              expiredLabel="We're live right now"
              className="mt-3"
            />
            <p className="mt-3 text-[15px] leading-[1.5] text-white/60">{webinar.displayDate}</p>
            <LocalTime iso={webinar.startsAt} className="mt-1 text-white/60" />
          </div>

          <div className="mt-8 flex justify-center">
            <Cta href="/webinar-form/" variant="onInk" className="max-w-[420px]">
              Claim My Spot Before It&apos;s Full
            </Cta>
          </div>

          <p className="mx-auto mt-5 max-w-[520px] text-[15px] leading-[1.5] text-white/60">
            Registration closes when we hit capacity or 24 hours before the workshop!
          </p>
        </div>
      </Section>

      {/* 12 — ChromeGate bares this route, so the legal links have to come from
          somewhere. This is that somewhere, and it adds no exits. */}
      <FunnelFooter />

      {/* Last on purpose: it patches the CTA hrefs, so every anchor it looks
          for has to be parsed before it runs. */}
      <ForwardTracking />
    </>
  );
}
