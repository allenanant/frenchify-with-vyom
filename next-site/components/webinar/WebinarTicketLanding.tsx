import type { CSSProperties } from 'react';
import { Sora } from 'next/font/google';
import ForwardTracking from '@/components/webinar/ForwardTracking';
import WebinarPixel from '@/components/webinar/WebinarPixel';
import { BfCountdownDigits, BfStartsIn } from '@/components/webinar/black-friday/BfCountdown';
import BfTicketTilt from '@/components/webinar/black-friday/BfTicketTilt';
import { BfPlaylist, BfVsl } from '@/components/webinar/black-friday/BfVideos';
import { getWallResults } from '@/lib/wall-results';
import { WEBINAR_TZ, type Webinar } from '@/lib/webinar';
import './black-friday/black-friday.css';

/**
 * The webinar landing page, design "Option 2 (Gold Ticket)". Vyom picked it
 * on 25 Nov 2026 from three designs on the preview site
 * (allenanant.github.io/frenchify-black-friday-preview), with two changes:
 * the dates / results / host block right after the hero, and a straight
 * (not tilted) hero ticket.
 *
 * It first ran as the Black Friday 2026 page (/black-friday-webinar). After
 * Black Friday it is the main page (/sunday-webinar and its aliases) with the
 * same look and no Black Friday words (Allen, 25 Nov 2026). `blackFriday`
 * switches those words on or off; everything else is the same page.
 *
 * Same funnel as /sunday-webinar: every CTA is a real <a> to /webinar-form/,
 * ForwardTracking carries the ad parameters onto those links, and the Meta
 * pixel loads the same way. The copy is the frozen funnel copy; the Black
 * Friday lines are ASD-STE100.
 *
 * Styles and motion live in black-friday/black-friday.css, scoped under .bfp.
 * Motion is CSS: a load sequence for the hero, scroll-driven reveals for the
 * rest. The only motion JavaScript is the ticket tilt, the clocks and the
 * click-to-play videos. Reduced-motion users get the still page.
 */

// Sora at 300 (the light figures in the stat line) is not in the site-wide
// font, so this page loads its own Sora. It is only fetched on this route.
const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '600', '700'],
  variable: '--bfp-sora',
  display: 'swap',
});

const PLAYLIST_ID = 'PLIX434KgUuaHsNre2lGTCXOTsROKjy6Z3';
const PLAYLIST_POSTER_VIDEO = '5PnAcrE9V9Y';
const FORM = '/webinar-form/';
const INDIA_TZ = 'Asia/Kolkata';

const LEGAL = [
  { href: '/privacy-policy/', label: 'Privacy Policy' },
  { href: '/terms-and-conditions/', label: 'Terms & Conditions' },
  { href: '/refund-policy/', label: 'Refund Policy' },
];

// Shown only while `blackFriday` is on. ASD-STE100.
const blackFridayFaq = {
  q: 'What is the Black Friday offer?',
  a: 'Vyom shows the offer live in the workshop. Only workshop guests get it. Reserve your free spot to see it.',
};

const faqs = [
  {
    q: 'I don’t have time to learn a new language',
    a: 'The assessment reveals if you have enough time based on your specific timeline. Many students reach CLB 7 in 8-12 months with just 2-3 hours daily.',
  },
  {
    q: 'French seems too difficult',
    a: 'French shares 60% vocabulary with English. The assessment measures your language learning aptitude - you might be surprised by your natural ability.',
  },
  {
    q: 'I’m not sure if it’s worth the investment',
    a: 'The workshop includes a complete ROI analysis. You’ll see the exact financial comparison between investing in French and the cost of waiting.',
  },
  {
    q: 'What if I fail the TEF/TCF exam?',
    a: 'The assessment predicts your success probability. Plus, our students have an 80% first-attempt pass rate, and exams can be retaken.',
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

/* ------------------------------------------------------------------ */
/* Dates. Everything on the page comes from the one webinar schedule,  */
/* shown in Eastern time (EST, Toronto) with the India time next to it. */
/* ------------------------------------------------------------------ */

function when(ms: number, timeZone: string) {
  const p: Record<string, string> = {};
  for (const part of new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  }).formatToParts(new Date(ms))) {
    p[part.type] = part.value;
  }
  const period = (p.dayPeriod || '').toUpperCase();
  return {
    /** "Sat 28 Nov" */
    short: `${p.weekday.slice(0, 3)} ${p.day} ${p.month.slice(0, 3)}`,
    /** "28 November" */
    dayMonth: `${p.day} ${p.month}`,
    /** "Saturday 28 November" */
    long: `${p.weekday} ${p.day} ${p.month}`,
    year: p.year,
    /** "8:00 PM" */
    time: `${p.hour}:${p.minute} ${period}`,
    /** "8 PM" when on the hour, else "8:30 PM" */
    timeShort: p.minute === '00' ? `${p.hour} ${period}` : `${p.hour}:${p.minute} ${period}`,
    /** "EST" in winter, "EDT" in summer (Allen, 25 Nov 2026: write EST, Toronto time) */
    zone: p.timeZoneName,
  };
}

/* ------------------------------------------------------------------ */

function Icon({ id, size }: { id: string; size: number }) {
  return (
    <svg width={size} height={size} aria-hidden="true">
      <use href={`#bfp-i-${id}`} />
    </svg>
  );
}

function Cta({ children }: { children: React.ReactNode }) {
  return (
    <a href={FORM} className="cta">
      <span>{children}</span>
      <span className="cta-arrow" aria-hidden="true">
        <Icon id="arrow" size={18} />
      </span>
    </a>
  );
}

/** Lucide paths, drawn once and reused with <use>. */
function IconSprite() {
  const line = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <symbol id="bfp-i-arrow" viewBox="0 0 24 24">
        <path d="M5 12h14M13 6l6 6-6 6" {...line} strokeWidth={2.4} />
      </symbol>
      <symbol id="bfp-i-arrow-thin" viewBox="0 0 24 24">
        <path d="M5 12h14M13 6l6 6-6 6" {...line} strokeWidth={2} />
      </symbol>
      <symbol id="bfp-i-chart" viewBox="0 0 24 24">
        <g {...line} strokeWidth={1.75}>
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </g>
      </symbol>
      <symbol id="bfp-i-clock" viewBox="0 0 24 24">
        <g {...line} strokeWidth={1.75}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </g>
      </symbol>
      <symbol id="bfp-i-target" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeWidth={1.75}>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </g>
      </symbol>
      <symbol id="bfp-i-award" viewBox="0 0 24 24">
        <g {...line} strokeWidth={1.75}>
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </g>
      </symbol>
      <symbol id="bfp-i-flag" viewBox="0 0 24 24">
        <g {...line} strokeWidth={1.75}>
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <path d="M4 22v-7" />
        </g>
      </symbol>
      <symbol id="bfp-i-users" viewBox="0 0 24 24">
        <g {...line} strokeWidth={1.75}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </g>
      </symbol>
      <symbol id="bfp-i-check-circle" viewBox="0 0 24 24">
        <g {...line} strokeWidth={2}>
          <circle cx="12" cy="12" r="10" />
          <path d="m8 12 3 3 5-6" />
        </g>
      </symbol>
      <symbol id="bfp-i-target-b" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeWidth={1.9}>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </g>
      </symbol>
      <symbol id="bfp-i-pin" viewBox="0 0 24 24">
        <g {...line} strokeWidth={1.9}>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </g>
      </symbol>
      <symbol id="bfp-i-chart-b" viewBox="0 0 24 24">
        <g {...line} strokeWidth={1.9}>
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </g>
      </symbol>
      <symbol id="bfp-i-chat" viewBox="0 0 24 24">
        <g {...line} strokeWidth={1.9}>
          <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z" />
          <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
        </g>
      </symbol>
      <symbol id="bfp-i-chev" viewBox="0 0 20 20">
        <path d="M10 13.2 3.6 6.8l1.4-1.4L10 10.4l5-5 1.4 1.4z" fill="currentColor" />
      </symbol>
    </svg>
  );
}

/* ------------------------------------------------------------------ */

export default function WebinarTicketLanding({
  webinar,
  blackFriday,
}: {
  webinar: Webinar;
  /** Black Friday words on (the Black Friday page) or off (the main page). */
  blackFriday: boolean;
}) {
  const { clb7, clb5 } = getWallResults();
  // CLB 7 first, as on /sunday-webinar: it is the score the page promises.
  const results = [...clb7, ...clb5];
  const fan = results.slice(0, 4);

  const mtl = when(webinar.startsAtMs, WEBINAR_TZ);
  const ind = when(webinar.startsAtMs, INDIA_TZ);
  const dateLine = `${mtl.short} · ${mtl.time} ${mtl.zone} · Online`;
  // The server's clock at render time: both live clocks start from it so the
  // first client render matches this HTML.
  const renderedAt = Date.now();

  return (
    <div className={`bfp ${sora.variable}`}>
      <IconSprite />

      <div className="page">
        <header className="wrap topbar">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/black-friday/logo-light.webp"
            width={540}
            height={151}
            alt="Frenchify with Vyom Inc."
            decoding="async"
          />
          <p>{dateLine}</p>
        </header>

        <main>
          {/* Hero */}
          <section className="hero-sec" aria-labelledby="hero-title">
            <div className="wrap">
              <div className="hero">
                <div className="hero-copy">
                  <p className="eyebrow">Free live workshop · Limited seats</p>
                  {blackFriday && (
                    <p className="bf-word">
                      <span className="w">Black</span> <span className="w">Friday</span>
                    </p>
                  )}
                  <div className="hero-text">
                    <h1 id="hero-title">
                      French for Canadian PR:<br /> Live Assessment Workshop
                    </h1>
                    <p className="lead">
                      Discover in 90 minutes if French is your fastest path to Canadian PR. Take a live
                      assessment and get your personalized French learning strategy - completely free.
                    </p>
                  </div>
                  <div className="hero-cta">
                    <Cta>Reserve My Free Spot</Cta>
                    <p className="price-note">
                      <s>$19 CAD</s> <span>{blackFriday ? 'Free for Black Friday' : 'Free today'}</span>
                    </p>
                  </div>
                </div>

                <div className="ticket-stage">
                  <article className="ticket" aria-label="Event ticket">
                    <div className="ticket-media">
                      <BfVsl />
                    </div>
                    <div className="t-info">
                      <p className="t-kicker">Admit one · Free</p>
                      <p className="t-title">Live Assessment Workshop</p>
                      <p className="t-host">with Vyom Sharma</p>
                    </div>
                    <div className="t-meta">
                      <div>
                        <span className="t-label">Date</span>
                        <span className="t-val">{mtl.short}</span>
                      </div>
                      <div>
                        <span className="t-label">Time</span>
                        <span className="t-val">{mtl.timeShort} {mtl.zone}</span>
                      </div>
                      <div>
                        <span className="t-label">Length</span>
                        <span className="t-val">90 min</span>
                      </div>
                    </div>
                    <div className="perf" aria-hidden="true">
                      <i />
                      <i />
                    </div>
                    <div className="t-stub">
                      <div>
                        <s>$19 CAD</s>
                        <p className="t-free">FREE</p>
                      </div>
                      <div className="t-india">
                        <span className="t-label">In India</span>
                        <span className="t-val">
                          {ind.short}, {ind.time}
                        </span>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </section>

          {/* S1 · At a glance: dates, results, host, offer steps */}
          <section
            className="s-glance"
            aria-label={blackFriday ? 'Workshop dates, results and the Black Friday offer' : 'Workshop dates, results and how to join'}
          >
            <div className="wrap">
              <p className="g-when">
                <span className="seg g-start">
                  <BfStartsIn targetIso={webinar.startsAt} renderedAt={renderedAt} />
                </span>
                {' '}· <span className="seg">{mtl.short}, {mtl.time} {mtl.zone}</span>
                {' '}· <span className="seg">{ind.short}, {ind.time} in India</span>
              </p>

              <div className="g-grid">
                <div className="g-proof">
                  <div className="g-proof-top">
                    <p className="g-num">
                      <span className="g-num-txt">150+</span>
                    </p>
                    <p className="g-label">Verified TEF/TCF results</p>
                  </div>
                  <div className="g-fan" aria-hidden="true">
                    {fan.map((src) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={src} src={src} width={940} height={788} alt="" loading="lazy" decoding="async" />
                    ))}
                  </div>
                </div>
                <div className="g-host">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="g-photo"
                    src="/black-friday/vyom-portrait.webp"
                    width={760}
                    height={688}
                    alt="Vyom Sharma, the workshop host, in a dark jacket and a blue scarf"
                    loading="lazy"
                    decoding="async"
                  />
                  <p className="g-host-label">Your host · Vyom Sharma</p>
                  <blockquote className="g-quote">
                    <p>
                      &quot;In just 8 months, I went from zero to CLB 7 and added 62 points to my CRS
                      score.&quot;
                    </p>
                  </blockquote>
                  <p className="g-sub">PR invitation in November 2022</p>
                </div>
              </div>

              <div className="g-offer">
                <p className="g-offer-title">{blackFriday ? 'How to get the Black Friday offer:' : 'How to join:'}</p>
                <ol className="g-steps">
                  <li>Reserve your free spot</li>
                  <li>Join the live workshop on {mtl.dayMonth}</li>
                  <li>{blackFriday ? 'Get the offer from Vyom, live' : 'Get your French plan from Vyom, live'}</li>
                </ol>
              </div>
            </div>
          </section>

          {/* S2 · Pain */}
          <section className="s-pain" aria-labelledby="pain-title">
            <div className="wrap">
              <div className="sec-head">
                <h2 className="h2" id="pain-title">
                  Tired of Waiting in the Express Entry Pool?
                </h2>
                <p className="lead">
                  If you’re stuck with any of these problems, this workshop will show you a proven
                  alternative.
                </p>
              </div>
              <ul className="problems">
                {[
                  {
                    icon: 'chart',
                    title: 'CRS Score Isn’t Competitive',
                    copy: 'Draws keep hitting 480+ and your score isn’t close. You’re watching months go by with no guarantee.',
                  },
                  {
                    icon: 'clock',
                    title: 'Time is Running Out',
                    copy: 'Your age points are decreasing, permits need renewal, and other options take years you don’t have.',
                  },
                  {
                    icon: 'target',
                    title: 'Opportunity Cost is Huge',
                    copy: 'Every month you wait is lost Canadian income, career growth, and life progress.',
                  },
                ].map((p) => (
                  <li className="problem" key={p.title}>
                    <div className="problem-head">
                      <span className="problem-icon" aria-hidden="true">
                        <Icon id={p.icon} size={26} />
                      </span>
                      <h3>{p.title}</h3>
                    </div>
                    <p>{p.copy}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* S3 · Solution */}
          <section className="s-solution" aria-labelledby="solution-title">
            <div className="wrap">
              <div className="sec-head">
                <h2 className="h2" id="solution-title">
                  What if French Could Change Everything?
                </h2>
                <p className="lead">
                  While thousands wait, smart candidates are using French to guarantee their PR
                  invitation.
                </p>
              </div>
              <div className="benefits">
                <h3>Here’s what French can do for your application:</h3>
                <ul className="benefit-grid">
                  {[
                    { icon: 'chart', title: 'Add 50+ CRS points', copy: 'Guarantee your selection in the next draw' },
                    { icon: 'award', title: 'Access special francophone draws', copy: 'With significantly lower cutoff scores' },
                    { icon: 'flag', title: 'Qualify for dedicated streams', copy: 'In multiple provinces across Canada' },
                    { icon: 'users', title: 'Skip the competition', copy: 'Only 5% of candidates speak French' },
                  ].map((b) => (
                    <li className="benefit" key={b.title}>
                      <span className="benefit-icon" aria-hidden="true">
                        <Icon id={b.icon} size={22} />
                      </span>
                      <div>
                        <strong>{b.title}</strong>
                        <span>{b.copy}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="numbers">
                <h3>The Numbers Don’t Lie:</h3>
                <p className="stat-line">
                  <span className="st">
                    50+ <span className="u">CRS Points</span>
                  </span>
                  <span className="sep"> / </span>
                  <span className="st">
                    8-12 <span className="u">Months to PR</span>
                  </span>
                  <span className="sep"> / </span>
                  <span className="st">
                    95% <span className="u">Less Competition</span>
                  </span>
                  <span className="sep"> / </span>
                  <span className="st">
                    Proven <span className="u">Pathway</span>
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* S4 · Wall of Excellence */}
          <section className="s-wall" aria-labelledby="wall-title">
            <div className="wrap wall-head">
              <div className="sec-head">
                <h2 className="h2" id="wall-title">
                  Wall of Excellence
                </h2>
                <p className="lead">
                  Every screenshot below is a real TEF/TCF attestation from a Frenchify student.
                </p>
              </div>
              <p className="pill">
                <Icon id="check-circle" size={22} />
                150+ Verified results
              </p>
            </div>
            {/* The results slide right to left in a loop (Allen, 25 Nov 2026).
                The track holds the set twice and CSS moves it by one set, so the
                loop has no visible joint and needs no JavaScript. With reduced
                motion the copy is hidden and the rail scrolls by hand. */}
            <div
              className="rail"
              role="group"
              aria-label="Real TEF and TCF results from Frenchify students"
              tabIndex={0}
              style={{ '--bfp-marquee-n': results.length + 1 } as CSSProperties}
            >
              <div className="rail-track">
                {[false, true].map((copy) => (
                  <div className="rail-set" aria-hidden={copy || undefined} key={copy ? 'copy' : 'set'}>
                    {results.map((src) => (
                      <div className="cert" key={src}>
                        {/* Empty alt on purpose: the heading describes the group, and
                            100+ identical alt strings would only be noise. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} width={940} height={788} alt="" loading="lazy" decoding="async" />
                      </div>
                    ))}
                    <div className="cert-more">
                      <Icon id="arrow-thin" size={22} />
                      <p>and more...</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="wrap rail-foot">
              <p>Swipe or scroll sideways to see the rest.</p>
              <Cta>Reserve My Free Spot</Cta>
            </div>
          </section>

          {/* S5 · Workshop steps */}
          <section className="s-workshop" aria-labelledby="workshop-title">
            <div className="wrap">
              <div className="ws-head">
                <h2 className="h2" id="workshop-title">
                  What Happens in This Live Assessment Workshop
                </h2>
                <p className="lead">
                  This isn’t a typical webinar. You’ll actively participate in a live assessment that
                  determines your French PR potential.
                </p>
                <p className="facts">
                  <Icon id="clock" size={20} />
                  90 minutes, live online. {mtl.short}, {mtl.time} {mtl.zone}.
                </p>
              </div>
              <ol className="timeline">
                {[
                  { icon: 'target-b', title: 'Personal Assessment', copy: 'Answer 20 strategic questions to predict your success and get instant results.' },
                  { icon: 'pin', title: 'Custom Roadmap', copy: 'Receive a personalized timeline and strategy to reach CLB 7 based on your score.' },
                  { icon: 'chart-b', title: 'ROI Analysis', copy: 'Understand the cost of waiting vs investing in French with a financial comparison.' },
                  { icon: 'chat', title: 'Live Q&A Session', copy: 'Meet students who got their PR using French and ask them anything.' },
                ].map((s, i) => (
                  <li className="tl-step" key={s.title}>
                    <span className="tl-icon" aria-hidden="true">
                      <Icon id={s.icon} size={18} />
                    </span>
                    <div className="tl-body">
                      <p className="tl-kicker">Step {String(i + 1).padStart(2, '0')}</p>
                      <h3>{s.title}</h3>
                      <p>{s.copy}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* S6 · Meet Vyom */}
          <section className="s-vyom" aria-labelledby="vyom-title">
            <div className="wrap">
              <div className="vyom-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/black-friday/vyom-portrait.webp"
                  width={760}
                  height={688}
                  alt="Vyom Sharma smiling, in a winter jacket and blue scarf"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="story">
                <h2 className="h2" id="vyom-title">
                  Meet Vyom: He Actually Walked This Path
                </h2>
                <p className="lead">
                  This isn’t theory from someone who’s never done it. Vyom used this exact French
                  strategy to get his own Canadian PR.
                </p>
                <div className="my-story">
                  <h3>My Story</h3>
                  <p>
                    I arrived in Canada in December 2018. After my studies, I was stuck in the Express
                    Entry pool with a CRS score that wasn’t competitive enough. In April 2021, I started
                    learning French.{' '}
                    <strong>
                      In just 8 months, I went from zero to CLB 7 and added 62 points to my CRS score.
                    </strong>{' '}
                    I received my PR invitation in November 2022.
                  </p>
                  <p>
                    The assessment in this workshop is what I wish I had when I started. Instead of
                    guessing if French is right for you, you’ll know for certain.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* S7 · Includes, as a receipt */}
          <section className="s-includes" aria-labelledby="includes-title">
            <div className="wrap">
              <h2 className="h2" id="includes-title">
                Your Free Workshop Includes:
              </h2>
              <div className="receipt">
                <div className="r-main">
                  <div className="r-head">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/black-friday/logo-light.webp"
                      width={540}
                      height={151}
                      alt="Frenchify with Vyom Inc."
                      loading="lazy"
                      decoding="async"
                    />
                    <p>{dateLine}</p>
                  </div>
                  <ul className="r-list">
                    {includes.map((it) => (
                      <li className="r-item" key={it.title}>
                        <span className="r-check" aria-hidden="true">
                          <svg width="13" height="13" viewBox="0 0 24 24">
                            <path
                              d="M20 6 9 17l-5-5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={3.4}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span className="r-text">
                          <strong>{it.title}</strong>
                          <span>{it.copy}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="r-perf" aria-hidden="true">
                  <i />
                  <i />
                </div>
                <div className="r-stub">
                  <div className="r-price">
                    <p className="r-regular">
                      Regular Workshop Price: <s>$19 CAD</s>
                    </p>
                    <p className="r-today">Today’s Price:</p>
                    <p className="r-free">FREE!</p>
                    <p className="r-bonus">(Plus $497 in Bonuses)</p>
                  </div>
                  <div className="r-act">
                    {/* ASD-STE100. Without Black Friday the note keeps its place
                        so the receipt looks the same. */}
                    <p className="r-note">
                      {blackFriday
                        ? 'Plus the Black Friday offer, only in the live workshop.'
                        : 'Seats are limited. Reserve your free spot now.'}
                    </p>
                    <Cta>Reserve My Free Spot</Cta>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* S8 · Student videos */}
          <section className="s-videos" aria-labelledby="videos-title">
            <div className="wrap">
              <div className="vid-head">
                <h2 className="h2" id="videos-title">
                  Hear Directly From Our Students
                </h2>
                <p className="lead">
                  34 success stories from students who cleared CLB 5 and CLB 7. Play them straight
                  through, right here.
                </p>
              </div>
              <BfPlaylist playlistId={PLAYLIST_ID} posterVideoId={PLAYLIST_POSTER_VIDEO} />
            </div>
          </section>

          {/* S9 · FAQ */}
          <section className="s-faq" aria-labelledby="faq-title">
            <div className="wrap">
              <h2 className="h2" id="faq-title">
                Still Have Doubts?
              </h2>
              <div className="faq">
                {(blackFriday ? [blackFridayFaq, ...faqs] : faqs).map(({ q, a }, i) => (
                  <details key={q} open={i === 0}>
                    <summary>
                      <span>“{q}”</span>
                      <span className="chev" aria-hidden="true">
                        <Icon id="chev" size={18} />
                      </span>
                    </summary>
                    <div className="ans">
                      <p>{a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* S10 · Final decision */}
          <section className="s-final" id="register" aria-labelledby="final-title">
            <div className="wrap">
              <h2 className="h2" id="final-title">
                Your Canadian PR Journey Starts with One Decision
              </h2>
              <div className="final-cols">
                <div className="options">
                  <div className="opt">
                    <p className="opt-label">Option 1</p>
                    <p>
                      Keep waiting in Express Entry, hoping draws get easier (they won’t), watching
                      opportunities pass by.
                    </p>
                  </div>
                  <div className="opt opt--pick">
                    <p className="opt-label">Option 2</p>
                    <p>
                      Take 90 minutes to discover if French could be your PR game-changer and get a
                      personalized roadmap.
                    </p>
                  </div>
                  <p className="final-note">
                    This workshop, normally <strong>$19 CAD</strong>, is completely free today. The
                    assessment alone is worth hundreds in consultation fees.
                  </p>
                </div>
                <div className="cd-col">
                  <BfCountdownDigits targetIso={webinar.startsAt} renderedAt={renderedAt} />
                  <p className="cd-when">
                    {mtl.long} {mtl.year}, {mtl.time} {mtl.zone}{' '}
                    <span>
                      {ind.long}, {ind.time} in India
                    </span>
                  </p>
                  <div className="cd-cta">
                    <Cta>Claim My Spot Before It’s Full</Cta>
                  </div>
                  <p className="cd-small">
                    Registration closes when we hit capacity or 24 hours before the workshop!
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="wrap">
            <p>© {new Date().getFullYear()} Frenchify with Vyom Inc. All rights reserved.</p>
            <nav aria-label="Legal">
              <ul>
                {LEGAL.map((l) => (
                  <li key={l.href}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </footer>
      </div>

      {/* After the CTAs, so the anchors exist when it runs. */}
      <ForwardTracking />
      <WebinarPixel />
      <BfTicketTilt />
    </div>
  );
}
