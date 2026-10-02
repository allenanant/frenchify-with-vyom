import { ArrowLeft, ArrowRight, Check, ClipboardCheck, LockKeyhole, Mic2 } from 'lucide-react';

// The previous, longer version of this page is archived at /a2-analysis-test-previous/.
const PAYMENT_LINK = 'https://link.fastpaydirect.com/payment-link/6aabf0f2f426560dbc2f0c82';

export const metadata = {
  title: 'A2 Analysis Test – Start Exam Prep 1 | Frenchify with Vyom',
  description:
    'Complete an A2 theory and live speaking analysis with Harleen to confirm your readiness for B1 and Exam Prep 1.',
};

const parts = [
  {
    Icon: ClipboardCheck,
    title: 'Theory test',
    description: 'Checks your A2 foundation.',
    items: ['Grammar', 'Vocabulary', 'Reading and listening', 'Sentence structure'],
  },
  {
    Icon: Mic2,
    title: 'Live speaking with Harleen',
    description: 'You answer her prompts on the spot. No prepared scripts.',
    items: ['Pronunciation', 'Speaking flow', 'Grammar while speaking', 'Natural, unscripted answers'],
  },
];

const outcomes = [
  {
    label: 'Ready',
    text: 'Start Exam Prep 1 / B1.',
    classes: 'border-emerald-200 bg-emerald-50',
    badge: 'bg-emerald-700',
  },
  {
    label: 'Almost ready',
    text: 'Work on a few areas for a short time, then move ahead.',
    classes: 'border-amber-200 bg-amber-50',
    badge: 'bg-amber-600',
  },
  {
    label: 'Build first',
    text: 'Strengthen A2 before moving forward.',
    classes: 'border-rose-200 bg-rose-50',
    badge: 'bg-rose-600',
  },
];

const forYou = [
  'You finished A2 with Frenchify or another school',
  'You studied on your own and are unsure of your level',
  'You want to start Exam Prep 1 / B1',
];

const beforeYouBook = [
  'Finish most of the A2 syllabus first',
  'Do not memorize scripts',
  'Use a quiet place and a stable internet connection',
];

function BookingCta({ className = '' }: { className?: string }) {
  return (
    <a
      href={PAYMENT_LINK}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-violet-700 px-7 py-4 text-center text-base font-bold text-white shadow-lg shadow-violet-900/15 transition hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700 ${className}`}
    >
      Book My Test – $25 CAD
      <ArrowRight className="h-5 w-5" aria-hidden />
    </a>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
          <Check className="mt-1 h-4 w-4 shrink-0 text-violet-700" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function A2AnalysisTestPage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="full-bleed-section-ghl border-b border-slate-200 bg-[#f7f3ea] px-6 pb-16 pt-[118px] md:pb-24 md:pt-[150px]">
        <div className="mx-auto max-w-6xl">
          <a
            href="/analysis-page/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-violet-700"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to all starting options
          </a>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700">
                <ClipboardCheck className="h-4 w-4" aria-hidden />
                A2 Analysis Test
              </div>
              <h1 className="font-display mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-950 md:text-5xl">
                Are you ready to start Exam Prep 1?
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                A short theory test and a live speaking check with Harleen. You find out if you are
                ready for B1 / Exam Prep 1, and what to do next.
              </p>
            </div>

            <aside className="rounded-3xl border border-violet-200 bg-white p-7 shadow-[0_24px_70px_rgba(76,29,149,0.12)] md:p-9">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-violet-700">Test fee</p>
              <div className="mt-3 flex items-end gap-2">
                <span className="font-display text-5xl font-bold tracking-tight text-slate-950">$25</span>
                <span className="pb-2 font-semibold text-slate-500">CAD</span>
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-600">
                Includes the theory test, the live speaking session with Harleen and a personal
                next-step recommendation.
              </p>
              <BookingCta className="mt-8 w-full" />
              <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs leading-5 text-slate-500">
                <LockKeyhole className="h-3.5 w-3.5" aria-hidden />
                Secure payment. Instant access after you pay.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="full-bleed-section-ghl px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-center text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            What the test checks
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {parts.map(({ Icon, title, description, items }, index) => (
              <article key={title} className="rounded-3xl border border-slate-200 p-7 md:p-9">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="text-sm font-bold text-slate-400">Part {index + 1}</span>
                </div>
                <h3 className="font-display mt-6 text-xl font-bold text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                <div className="mt-6">
                  <CheckList items={items} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="full-bleed-section-ghl border-y border-slate-200 bg-slate-50 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-center text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            Your result
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center leading-7 text-slate-600">
            Harleen recommends one of three next steps.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {outcomes.map((outcome) => (
              <article key={outcome.label} className={`rounded-3xl border p-7 ${outcome.classes}`}>
                <span className={`rounded-full px-3 py-1 text-xs font-bold text-white ${outcome.badge}`}>
                  {outcome.label}
                </span>
                <p className="mt-5 text-base font-semibold leading-7 text-slate-800">{outcome.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="full-bleed-section-ghl px-6 py-20 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-950">
              Take this test if
            </h2>
            <div className="mt-6">
              <CheckList items={forYou} />
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-950">
              Before you book
            </h2>
            <div className="mt-6">
              <CheckList items={beforeYouBook} />
            </div>
          </div>
        </div>
      </section>

      <section className="full-bleed-section-ghl bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Ready to check your A2 level?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-300">
            Pay online and get instant access to your A2 Analysis Test.
          </p>
          <BookingCta className="mt-8" />
          <p className="mx-auto mt-8 max-w-2xl text-xs leading-5 text-slate-400">
            This is a Frenchify readiness assessment. It does not guarantee a B1 level or a TEF/TCF
            result.
          </p>
        </div>
      </section>
    </div>
  );
}
