import {
  ArrowRight,
  BadgeCheck,
  Check,
  ClipboardCheck,
  Clock3,
  CreditCard,
  Gauge,
  LockKeyhole,
  Route,
} from 'lucide-react';

const PAYMENT_LINK = 'https://link.fastpaydirect.com/payment-link/6a778ccec8cc9a2ce7266f61';

export const metadata = {
  title: 'A1 French Analysis Test | Frenchify with Vyom',
  description:
    'Take the Frenchify A1 Analysis Test to find out whether you should begin with A1 or move directly to A2.',
};

const benefits = [
  {
    icon: Gauge,
    title: 'Know your correct starting level',
    description: 'Get a clear answer on whether you should strengthen A1 or move forward to A2.',
  },
  {
    icon: ClipboardCheck,
    title: 'Check your complete A1 foundation',
    description: 'Measure the essential grammar, vocabulary and reading skills needed before A2.',
  },
  {
    icon: Route,
    title: 'Receive a clear next step',
    description: 'Your score immediately guides you to the Frenchify program that fits your level.',
  },
];

const steps = [
  {
    icon: CreditCard,
    title: 'Pay online',
    description: 'Complete the secure $20 CAD assessment payment using the link below.',
  },
  {
    icon: ArrowRight,
    title: 'Start automatically',
    description: 'After payment, you are redirected directly to the test in ClassMarker.',
  },
  {
    icon: BadgeCheck,
    title: 'Get your result',
    description: 'Complete the test once and receive your score and recommended next level.',
  },
];

export default function AnalysisPage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="full-bleed-section-ghl border-b border-slate-200 bg-slate-50 px-6 pb-16 pt-[118px] md:pb-24 md:pt-[150px]">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700">
              <ClipboardCheck className="h-4 w-4" aria-hidden />
              Frenchify Complete A1 Analysis Test
            </div>

            <h1 className="font-display max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-slate-950 md:text-6xl">
              Know whether to start A1 or move to A2.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
              Take one structured online assessment and get a clear, objective next step for your
              French learning journey.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-700">
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-blue-600" aria-hidden /> About 30 minutes
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-600" aria-hidden /> One attempt
              </span>
              <span className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-blue-600" aria-hidden /> Immediate result
              </span>
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_24px_70px_rgba(15,23,42,0.10)] md:p-9">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
              A1 assessment fee
            </p>
            <div className="mt-3 flex items-end gap-2">
              <span className="font-display text-5xl font-bold tracking-tight text-slate-950">$20</span>
              <span className="pb-2 font-semibold text-slate-500">CAD</span>
            </div>
            <div className="my-7 h-px bg-slate-200" />

            <ul className="space-y-4 text-sm leading-6 text-slate-700">
              <li className="flex gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                Automatic access immediately after payment
              </li>
              <li className="flex gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                75% is the passing score for A2 placement
              </li>
              <li className="flex gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                Your $20 is credited toward your recommended A1 or A2 program
              </li>
            </ul>

            <a
              href={PAYMENT_LINK}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-4 text-center text-base font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              Pay $20 &amp; Start the Test
              <ArrowRight className="h-5 w-5" aria-hidden />
            </a>
            <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs leading-5 text-slate-500">
              <LockKeyhole className="h-3.5 w-3.5" aria-hidden />
              You will be redirected to ClassMarker after payment.
            </p>
          </aside>
        </div>
      </section>

      <section className="full-bleed-section-ghl px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
              Why take the test?
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Start at the right level with confidence.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-2xl border border-slate-200 p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="font-display mt-6 text-lg font-bold text-slate-950">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="full-bleed-section-ghl bg-slate-950 px-6 py-20 text-white md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-300">
              Simple and automatic
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              From payment to test in three steps.
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, description }, index) => (
              <article key={title} className="border-t border-slate-700 pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-blue-300">0{index + 1}</span>
                  <Icon className="h-5 w-5 text-slate-400" aria-hidden />
                </div>
                <h3 className="font-display mt-6 text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="full-bleed-section-ghl px-6 py-20 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
              Your placement
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Your score decides the next step.
            </h2>
            <p className="mt-5 leading-7 text-slate-600">
              The test has no manually graded questions, so your result is available as soon as
              you finish.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="grid gap-4 border-b border-slate-200 p-6 sm:grid-cols-[110px_1fr] sm:items-center md:p-8">
              <div className="font-display text-2xl font-bold text-emerald-700">75%+</div>
              <div>
                <h3 className="font-display font-bold text-slate-950">You are ready for A2</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Continue to the A2 program. Your $20 assessment fee is applied to A2.
                </p>
              </div>
            </div>
            <div className="grid gap-4 p-6 sm:grid-cols-[110px_1fr] sm:items-center md:p-8">
              <div className="font-display text-2xl font-bold text-amber-700">Below 75%</div>
              <div>
                <h3 className="font-display font-bold text-slate-950">Begin with A1</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Strengthen your foundation in the A1 program. Your $20 assessment fee is applied
                  to A1.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="full-bleed-section-ghl border-t border-slate-200 bg-blue-50 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            Ready to find your correct French level?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
            Pay once, begin immediately, and receive a clear path to A1 or A2.
          </p>
          <a
            href={PAYMENT_LINK}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-7 py-4 text-base font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Pay $20 &amp; Start the Test
            <ArrowRight className="h-5 w-5" aria-hidden />
          </a>
          <p className="mt-5 text-sm text-slate-500">
            Need help?{' '}
            <a className="font-semibold text-blue-700 underline underline-offset-4" href="mailto:admin@frenchifywithvyom.com">
              admin@frenchifywithvyom.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
