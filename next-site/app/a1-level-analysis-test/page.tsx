import {
  ArrowLeft,
  ArrowRight,
  BadgePercent,
  BadgeCheck,
  BarChart3,
  Check,
  ClipboardCheck,
  Clock3,
  CreditCard,
  Focus,
  ListChecks,
  LockKeyhole,
  Route,
  ShieldCheck,
} from 'lucide-react';

const PAYMENT_LINK = 'https://link.fastpaydirect.com/payment-link/6a778ccec8cc9a2ce7266f61';

export const metadata = {
  title: 'A1 Analysis Test – Start A2 | Frenchify with Vyom',
  description:
    'Review the Frenchify A1 Analysis Test, then pay online and begin your ClassMarker assessment immediately.',
};

const testDetails = [
  'Essential A1 grammar and sentence structure',
  'Core vocabulary used in everyday French',
  'Reading comprehension at the A1 level',
  'No manually graded questions',
];

const benefits = [
  {
    Icon: BarChart3,
    title: 'Understand your current competency',
    description:
      'Get a detailed picture of how strong your French foundation is for the language demands you will later face in TEF or TCF preparation.',
  },
  {
    Icon: Focus,
    title: 'Identify strengths and weak areas',
    description:
      'See which A1 concepts are secure and which areas need more attention, so your study time is focused where it matters most.',
  },
  {
    Icon: Route,
    title: 'Choose the correct starting level',
    description:
      'Avoid guessing whether to repeat A1 or begin A2. Your result gives you a clear placement decision based on your performance.',
  },
  {
    Icon: ListChecks,
    title: 'Create better study priorities',
    description:
      'Use your category performance to prioritize grammar, vocabulary and reading topics before moving into more advanced French.',
  },
  {
    Icon: ShieldCheck,
    title: 'Prevent learning gaps',
    description:
      'Find missing foundational concepts early, before they create confusion during A2 or future TEF and TCF exam preparation.',
  },
  {
    Icon: BadgePercent,
    title: 'Access course credits and extra savings',
    description:
      'Your $20 test fee is credited toward your recommended program. Pass and start A2 within two days to unlock an additional enrolment discount.',
  },
];

export default function A1LevelAnalysisTestPage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="full-bleed-section-ghl border-b border-slate-200 bg-slate-50 px-6 pb-16 pt-[118px] md:pb-24 md:pt-[150px]">
        <div className="mx-auto max-w-6xl">
          <a
            href="/analysis-page/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to all starting options
          </a>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700">
                <ClipboardCheck className="h-4 w-4" aria-hidden />
                A1 Analysis Test
              </div>
              <h1 className="font-display mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-950 md:text-6xl">
                Confirm that you are ready to start A2.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
                This assessment checks whether your A1 foundation is strong enough to move forward
                without missing essential concepts.
              </p>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-700">
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-emerald-700" aria-hidden /> About 1 hour 15 minutes
                </span>
                <span className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-700" aria-hidden /> One attempt
                </span>
                <span className="inline-flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-emerald-700" aria-hidden /> Immediate result
                </span>
              </div>
            </div>

            <aside className="rounded-3xl border border-emerald-200 bg-white p-7 shadow-[0_24px_70px_rgba(15,23,42,0.10)] md:p-9">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-700">
                Assessment fee
              </p>
              <div className="mt-3 flex items-end gap-2">
                <span className="font-display text-5xl font-bold tracking-tight text-slate-950">$20</span>
                <span className="pb-2 font-semibold text-slate-500">CAD</span>
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-600">
                The $20 is credited toward the A1 or A2 program recommended by your result.
              </p>
              <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                Score 75% or higher and start A2 within two days to receive an additional enrolment
                discount.
              </div>
              <a
                href={PAYMENT_LINK}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-4 text-center text-base font-bold text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
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
        </div>
      </section>

      <section className="full-bleed-section-ghl px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-700">
              Why this assessment matters
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Make your next French decision with evidence, not guesswork.
            </h2>
            <p className="mt-5 leading-7 text-slate-600">
              The test helps you understand your A1 competency, recognize where you are doing well
              and focus on the areas that can affect your future TEF or TCF preparation.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ Icon, title, description }) => (
              <article key={title} className="rounded-2xl border border-slate-200 bg-white p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="font-display mt-6 text-lg font-bold text-slate-950">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-5 text-slate-500">
            This is a Frenchify placement assessment designed to evaluate your foundation for the
            next stage. It is not an official TEF or TCF examination and does not predict an official
            exam score.
          </p>
        </div>
      </section>

      <section className="full-bleed-section-ghl border-t border-slate-200 bg-slate-50 px-6 py-20 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-700">
              Who should take it?
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Students who already know some French.
            </h2>
            <p className="mt-5 leading-7 text-slate-600">
              Take this test if you completed A1 with Frenchify or another school, studied A1 on
              your own, or believe you can skip beginner-level instruction.
            </p>
            <div className="mt-7 rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-6 text-slate-700">
              If you are a complete beginner or have only studied a little French, you should start
              directly with the A1 program instead of taking this test.
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 p-7 md:p-9">
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-950">
              What the test checks
            </h2>
            <ul className="mt-7 space-y-4">
              {testDetails.map((detail) => (
                <li key={detail} className="flex gap-3 text-sm leading-6 text-slate-700">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-700" aria-hidden />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="full-bleed-section-ghl bg-slate-950 px-6 py-20 text-white md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-300">
            What happens next
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
            Payment, assessment and placement are connected.
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              [CreditCard, '01', 'Pay online', 'Complete the $20 CAD assessment payment.'],
              [ArrowRight, '02', 'Start automatically', 'You are redirected directly to ClassMarker.'],
              [Route, '03', 'Receive your pathway', 'Your result determines whether you start A1 or A2.'],
            ].map(([Icon, number, title, description]) => {
              const StepIcon = Icon as typeof CreditCard;
              return (
                <article key={number as string} className="border-t border-slate-700 pt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-emerald-300">{number as string}</span>
                    <StepIcon className="h-5 w-5 text-slate-400" aria-hidden />
                  </div>
                  <h3 className="font-display mt-6 text-xl font-bold">{title as string}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{description as string}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="full-bleed-section-ghl px-6 py-20 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          <article className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7 md:p-9">
            <p className="font-display text-3xl font-bold text-emerald-800">75% or higher</p>
            <h2 className="font-display mt-5 text-xl font-bold text-slate-950">You are ready for A2</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Continue to the A2 program. Your $20 assessment fee is applied to A2.
            </p>
          </article>
          <article className="rounded-3xl border border-amber-200 bg-amber-50 p-7 md:p-9">
            <p className="font-display text-3xl font-bold text-amber-800">Below 75%</p>
            <h2 className="font-display mt-5 text-xl font-bold text-slate-950">Begin with A1</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Strengthen your foundation in the A1 program. Your $20 assessment fee is applied to A1.
            </p>
          </article>
        </div>
      </section>

      <section className="full-bleed-section-ghl border-t border-slate-200 bg-emerald-50 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            Ready to confirm your A1 level?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
            Complete the payment and begin your assessment immediately.
          </p>
          <a
            href={PAYMENT_LINK}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-7 py-4 text-base font-bold text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            Pay $20 &amp; Start the Test
            <ArrowRight className="h-5 w-5" aria-hidden />
          </a>
        </div>
      </section>
    </div>
  );
}
