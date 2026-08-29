import type { LucideIcon } from 'lucide-react';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Ear,
  Lightbulb,
  ListChecks,
  MessageCircleMore,
  Mic2,
  Route,
  ShieldCheck,
  Sparkles,
  Volume2,
} from 'lucide-react';

export const metadata = {
  title: 'A2 Analysis Test – Start Exam Prep 1 | Frenchify with Vyom',
  description:
    'Complete an A2 theory and live speaking analysis with Harleen to confirm your readiness for B1 and Exam Prep 1.',
};

const theoryChecks = [
  'A2 grammar',
  'Vocabulary understanding',
  'Reading comprehension',
  'Listening comprehension',
  'Sentence structure and application',
  'Overall understanding of A2 concepts',
];

const speakingChecks = [
  'Pronunciation',
  'Speaking flow',
  'Sentence formulation',
  'Grammar while speaking',
  'Vocabulary range',
  'Pauses and hesitation',
  'Natural speaking without memorization',
  'On-the-spot speaking ability',
  'Overall comfort with French',
];

const foundationChecks = [
  'Grammar',
  'Vocabulary',
  'Reading comprehension',
  'Listening comprehension',
  'Sentence formation',
  'Pronunciation',
  'Speaking flow',
  'On-the-spot speaking ability',
];

const process = [
  {
    Icon: MessageCircleMore,
    title: 'Receive your prompts',
    description: 'Harleen gives you speaking prompts and topics.',
  },
  {
    Icon: Mic2,
    title: 'Respond naturally',
    description: 'You answer on the spot, without a prepared script.',
  },
  {
    Icon: ClipboardCheck,
    title: 'Get evaluated',
    description: 'Harleen checks pronunciation, flow, grammar, vocabulary and sentence formation.',
  },
  {
    Icon: Route,
    title: 'Receive your next step',
    description: 'You get a clear recommendation based on your current level.',
  },
];

const outcomes = [
  {
    number: '01',
    label: 'Ready',
    title: 'Ready for Exam Prep 1 / B1',
    description: 'Your A2 foundation and speaking are strong enough to move forward.',
    action: 'Start Exam Prep 1 / B1.',
    classes: 'border-emerald-200 bg-emerald-50/90',
    badge: 'bg-emerald-700 text-white',
  },
  {
    number: '02',
    label: 'Almost ready',
    title: 'A few areas need refinement',
    description:
      'Your foundation is generally good, with targeted work needed in areas such as pronunciation, flow, speaking confidence or grammar revision.',
    action: 'Refine the identified areas for a short period, then proceed.',
    classes: 'border-amber-200 bg-amber-50/90',
    badge: 'bg-amber-600 text-white',
  },
  {
    number: '03',
    label: 'Build first',
    title: 'More A2 practice required',
    description:
      'If there are major gaps in grammar, pronunciation, sentence formation or natural speaking, we may recommend strengthening A2 first.',
    action: 'Build the missing foundation before moving forward.',
    classes: 'border-rose-200 bg-rose-50/90',
    badge: 'bg-rose-600 text-white',
  },
];

const recommendedFor = [
  'Have completed the Frenchify A2 program',
  'Completed A2 somewhere else and want to join Frenchify B1',
  'Have studied French independently and are unsure of your level',
  'Want to start Exam Prep 1',
  'Want an instructor to assess your speaking before moving ahead',
  'Feel comfortable with grammar but are unsure about speaking',
  'Want to identify weaknesses before beginning TEF/TCF preparation',
];

const beforeBooking = [
  'Have completed or substantially covered A2',
  'Be prepared to speak naturally on the spot',
  'Do not prepare or memorize scripts',
  'Choose a quiet place for the speaking assessment',
  'Use a stable internet connection',
  'Join your booked session on time',
];

const included = [
  'Theory assessment',
  'Live speaking analysis with Harleen',
  'Readiness evaluation',
  'Personalized next-step recommendation',
];

const bookingHref = '/a2-analysis-test/register/';

function BookingCta({ label, className = '' }: { label: string; className?: string }) {
  return (
    <a
      href={bookingHref}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-violet-700 px-6 py-4 text-center text-sm font-bold text-white shadow-lg shadow-violet-900/15 transition duration-200 hover:-translate-y-0.5 hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700 ${className}`}
    >
      {label}
      <ArrowRight className="h-4 w-4" aria-hidden />
    </a>
  );
}

function PaperTape({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute left-1/2 top-0 h-7 w-24 -translate-x-1/2 -translate-y-1/2 bg-amber-100/90 shadow-sm ${className}`}
    />
  );
}

function CheckList({ items, accent = 'violet' }: { items: string[]; accent?: 'violet' | 'emerald' }) {
  const accentClass = accent === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 'bg-violet-100 text-violet-700';

  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
          <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${accentClass}`}>
            <Check className="h-3.5 w-3.5" aria-hidden />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function ProcessCard({
  Icon,
  index,
  title,
  description,
}: {
  Icon: LucideIcon;
  index: number;
  title: string;
  description: string;
}) {
  return (
    <li className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <span className="font-display text-xs font-bold text-slate-300">0{index + 1}</span>
      </div>
      <h3 className="font-display mt-5 text-base font-bold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </li>
  );
}

export default function A2AnalysisTestPage() {
  return (
    <div className="bg-[#f7f3ea] text-slate-900">
      <section className="full-bleed-section-ghl relative overflow-hidden border-b border-violet-200/70 px-6 pb-14 pt-[116px] md:pb-20 md:pt-[148px]">
        <div
          className="absolute inset-0 opacity-70"
          aria-hidden
          style={{
            backgroundImage:
              'radial-gradient(circle at 10% 15%, rgba(221,214,254,.9), transparent 27%), radial-gradient(circle at 88% 20%, rgba(254,240,138,.6), transparent 25%), linear-gradient(rgba(255,255,255,.66) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.66) 1px, transparent 1px)',
            backgroundSize: 'auto, auto, 28px 28px, 28px 28px',
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          <a
            href="/analysis-page/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-violet-700"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to all starting options
          </a>

          <div className="mt-8 grid items-center gap-9 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-violet-700 shadow-sm">
                <BookOpenCheck className="h-4 w-4" aria-hidden />
                A2 Analysis Test
              </div>
              <h1 className="font-display mt-5 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-slate-950 md:text-5xl">
                Are You Ready to Start Exam Prep 1?
              </h1>
              <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-slate-700">
                Complete your A2 readiness assessment with Harleen before moving into B1 / Exam Prep 1.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                The A2 Analysis Test confirms whether your grammar, comprehension and speaking
                foundation are strong enough for the next stage of your TEF/TCF preparation.
              </p>

              <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <BookingCta label="Book My Test" />
                <p className="max-w-sm text-xs leading-5 text-slate-500">
                  For students who have completed A2 or believe they have an equivalent level.
                </p>
              </div>
            </div>

            <aside className="relative mx-auto w-full max-w-md rotate-1 rounded-[1.75rem] border border-violet-200 bg-white p-7 shadow-[0_24px_60px_rgba(76,29,149,0.14)] transition hover:rotate-0 md:p-8">
              <PaperTape className="-rotate-2" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-700">
                    Your readiness board
                  </p>
                  <p className="font-display mt-2 text-2xl font-bold text-slate-950">
                    A2 → Exam Prep 1
                  </p>
                </div>
                <span className="rounded-full bg-violet-700 px-3 py-1 text-sm font-bold text-white">
                  $25 CAD
                </span>
              </div>
              <div className="mt-7 grid grid-cols-2 gap-3">
                {[
                  [ClipboardCheck, 'Theory'],
                  [Mic2, 'Live speaking'],
                  [BadgeCheck, 'Evaluation'],
                  [Route, 'Next step'],
                ].map(([Icon, label]) => {
                  const CardIcon = Icon as LucideIcon;
                  return (
                    <div key={label as string} className="rounded-xl bg-violet-50 p-4">
                      <CardIcon className="h-5 w-5 text-violet-700" aria-hidden />
                      <p className="mt-2 text-xs font-bold text-slate-700">{label as string}</p>
                    </div>
                  );
                })}
              </div>
              <p className="mt-6 flex items-start gap-2 text-xs leading-5 text-slate-500">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-violet-700" aria-hidden />
                Review the two-step registration instructions, email the team and send the $25 CAD
                e-transfer. We will then confirm your scheduling next step.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="full-bleed-section-ghl px-6 py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <article className="relative -rotate-1 rounded-[1.75rem] border border-amber-200 bg-[#fff3a8] p-7 shadow-[0_18px_40px_rgba(120,90,20,0.12)] transition hover:rotate-0 md:p-8">
            <PaperTape className="rotate-2 bg-white/70" />
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/70 text-amber-800">
              <Lightbulb className="h-5 w-5" aria-hidden />
            </div>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-amber-900/70">
              Why this matters
            </p>
            <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-slate-950">
              Why Take the A2 Analysis Test?
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-700">
              Moving from A2 into exam preparation is a major transition. At B1 / Exam Prep 1, the
              focus shifts from simply learning French to using it more naturally in TEF/TCF-style
              situations.
            </p>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-800">
              This is not about passing or failing you unnecessarily. It is about understanding
              where you stand and choosing the right next step.
            </p>
          </article>

          <article className="relative rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.07)] md:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                <ListChecks className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-violet-700">
                  Foundation check
                </p>
                <h2 className="font-display mt-1 text-xl font-bold text-slate-950">Find the gaps before they grow</h2>
              </div>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {foundationChecks.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-4 text-center text-xs font-semibold leading-5 text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-600">
              The goal is to make sure you enter the next level when you can genuinely benefit from it.
            </p>
          </article>
        </div>
      </section>

      <section className="full-bleed-section-ghl border-y border-violet-200/60 bg-violet-50/60 px-6 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-700">Two-part assessment</p>
              <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-slate-950">
                Your Assessment Has 2 Parts
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-6 text-slate-600">
              We check both what you understand and how comfortably you can use French in real time.
            </p>
          </div>

          <div className="mt-9 grid gap-6 lg:grid-cols-2">
            <article className="relative -rotate-[0.4deg] rounded-[1.75rem] border border-sky-200 bg-white p-7 shadow-[0_20px_45px_rgba(15,23,42,0.08)] transition hover:rotate-0 md:p-8">
              <PaperTape className="rotate-2 bg-sky-100/90" />
              <div className="flex items-center justify-between gap-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                  <ClipboardCheck className="h-6 w-6" aria-hidden />
                </span>
                <span className="font-display text-4xl font-bold text-sky-100">01</span>
              </div>
              <h3 className="font-display mt-6 text-2xl font-bold text-slate-950">
                Part 1 — Theory &amp; Language Assessment
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                This section evaluates the core A2 language foundation required before moving into exam preparation.
              </p>
              <div className="mt-6">
                <CheckList items={theoryChecks} />
              </div>
              <p className="mt-6 rounded-xl bg-sky-50 p-4 text-xs font-semibold leading-5 text-sky-900">
                This shows whether your theoretical foundation is strong enough for the next level.
              </p>
            </article>

            <article className="relative rotate-[0.4deg] rounded-[1.75rem] border border-violet-200 bg-white p-7 shadow-[0_20px_45px_rgba(15,23,42,0.08)] transition hover:rotate-0 md:p-8">
              <PaperTape className="-rotate-2 bg-violet-100/90" />
              <div className="flex items-center justify-between gap-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                  <Mic2 className="h-6 w-6" aria-hidden />
                </span>
                <span className="font-display text-4xl font-bold text-violet-100">02</span>
              </div>
              <h3 className="font-display mt-6 text-2xl font-bold text-slate-950">
                Part 2 — Live Speaking Analysis with Harleen
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Meet Harleen live so she can evaluate how you formulate and speak French in practice.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {speakingChecks.map((item) => (
                  <div key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-violet-700" aria-hidden />
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-6 rounded-xl border border-violet-200 bg-violet-50 p-4 text-xs font-semibold leading-5 text-violet-950">
                This is not about memorized answers. We want to understand how naturally you can
                think, formulate and speak in French.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="full-bleed-section-ghl px-6 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-700">Live speaking analysis</p>
              <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-slate-950">
                What Will Harleen Look For?
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                A simple four-step conversation gives Harleen a practical view of your current speaking ability.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  [Volume2, 'Pronunciation'],
                  [MessageCircleMore, 'Flow'],
                  [BookOpenCheck, 'Grammar'],
                  [Ear, 'Natural response'],
                ].map(([Icon, label]) => {
                  const TagIcon = Icon as LucideIcon;
                  return (
                    <span key={label as string} className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700">
                      <TagIcon className="h-3.5 w-3.5 text-violet-700" aria-hidden />
                      {label as string}
                    </span>
                  );
                })}
              </div>
            </div>

            <ol className="grid gap-4 sm:grid-cols-2">
              {process.map((step, index) => (
                <ProcessCard key={step.title} index={index} {...step} />
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="full-bleed-section-ghl border-y border-slate-200 bg-white/60 px-6 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-700">Your recommendation</p>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-slate-950">
              What Happens After the Test?
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Your result is guidance, not a judgment. Harleen will recommend the route that makes the next stage productive for you.
            </p>
          </div>

          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {outcomes.map((outcome, index) => (
              <article
                key={outcome.number}
                className={`relative rounded-[1.6rem] border p-6 shadow-[0_16px_35px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 ${outcome.classes} ${index === 1 ? 'lg:-translate-y-3' : ''}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${outcome.badge}`}>
                    {outcome.label}
                  </span>
                  <span className="font-display text-xs font-bold text-slate-400">{outcome.number}</span>
                </div>
                <h3 className="font-display mt-5 text-xl font-bold text-slate-950">{outcome.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{outcome.description}</p>
                <div className="mt-5 border-t border-slate-900/10 pt-4">
                  <p className="text-xs font-bold uppercase tracking-[0.13em] text-slate-500">Recommended action</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">{outcome.action}</p>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600">
            Moving ahead too early can make B1 / exam preparation unnecessarily difficult. The goal
            is to help you enter the next level when you can actually benefit from it.
          </p>
        </div>
      </section>

      <section className="full-bleed-section-ghl px-6 py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <article className="relative rounded-[1.75rem] border border-emerald-200 bg-white p-7 shadow-[0_18px_40px_rgba(15,23,42,0.07)] md:p-8">
            <PaperTape className="rotate-2 bg-emerald-100/90" />
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Sparkles className="h-5 w-5" aria-hidden />
            </span>
            <h2 className="font-display mt-5 text-2xl font-bold text-slate-950">This Test Is Recommended If You:</h2>
            <div className="mt-6">
              <CheckList items={recommendedFor} accent="emerald" />
            </div>
          </article>

          <article className="relative rotate-[0.35deg] rounded-[1.75rem] border border-amber-200 bg-[#fff9dc] p-7 shadow-[0_18px_40px_rgba(120,90,20,0.10)] transition hover:rotate-0 md:p-8">
            <PaperTape className="-rotate-2 bg-white/70" />
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/80 text-amber-800">
              <ListChecks className="h-5 w-5" aria-hidden />
            </span>
            <h2 className="font-display mt-5 text-2xl font-bold text-slate-950">Before Booking Your Test</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Please make sure you:</p>
            <div className="mt-5">
              <CheckList items={beforeBooking} />
            </div>
            <p className="mt-6 rounded-xl bg-white/75 p-4 text-xs leading-5 text-slate-600">
              If your A2 syllabus is still largely incomplete, finishing the remaining content first may give you a more accurate assessment.
            </p>
          </article>
        </div>
      </section>

      <section className="full-bleed-section-ghl bg-slate-950 px-6 py-14 text-white md:py-20">
        <div className="mx-auto max-w-5xl">
          <article className="relative overflow-hidden rounded-[2rem] border border-violet-400/40 bg-violet-950 p-7 shadow-2xl md:p-10">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" aria-hidden />
            <div className="relative grid gap-9 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-300">Price + booking</p>
                <h2 className="font-display mt-3 text-3xl font-bold tracking-tight">Ready to Check Your A2 Level?</h2>
                <div className="mt-5 flex items-end gap-2">
                  <span className="font-display text-5xl font-bold tracking-tight">$25</span>
                  <span className="pb-2 font-semibold text-violet-200">CAD</span>
                </div>
                <p className="mt-5 max-w-xl text-sm leading-6 text-violet-100">
                  Confirm where your level currently stands and leave with a personalized next-step recommendation.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 text-slate-900 shadow-xl">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet-700">Included</p>
                <div className="mt-5">
                  <CheckList items={included} />
                </div>
                <BookingCta label="Book My Test — $25 CAD" className="mt-6 w-full" />
                <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                  Email the team and send the $25 CAD e-transfer. We will confirm the next available
                  scheduling step after both are received.
                </p>
              </div>
            </div>
          </article>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-5 text-slate-400">
            This is a Frenchify readiness assessment. It does not guarantee a B1 level or a TEF/TCF result.
          </p>
        </div>
      </section>
    </div>
  );
}
