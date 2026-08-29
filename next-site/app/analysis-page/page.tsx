import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  LockKeyhole,
  Sparkles,
} from 'lucide-react';

export const metadata = {
  title: 'Choose Your French Starting Point | Frenchify with Vyom',
  description:
    'Choose the right Frenchify starting point: begin with A1, take the A1 analysis test, or explore advanced placement options.',
};

const paths = [
  {
    eyebrow: 'Beginner pathway',
    title: 'Start directly with A1',
    destination: 'Build your French foundation',
    description:
      'Choose this if you are a complete beginner or have only studied a little French. You do not need an analysis test.',
    Icon: Sparkles,
    accent: 'blue',
    href: '/a1-course/',
    action: 'Explore A1 Programs',
  },
  {
    eyebrow: 'A1 Analysis Test',
    title: 'To start A2',
    destination: 'Confirm your A1 foundation',
    description:
      'Choose this if you have completed A1 elsewhere or believe you already understand the A1 level.',
    Icon: ClipboardCheck,
    accent: 'emerald',
    href: '/a1-level-analysis-test/',
    action: 'View A1 Test Information',
  },
  {
    eyebrow: 'A2 Analysis Test',
    title: 'To start Exam Prep 1',
    destination: 'Confirm your readiness for exam preparation',
    description:
      'Choose this if you have completed A2 and want an assessment with Harleen before beginning Exam Prep 1.',
    Icon: BookOpen,
    accent: 'violet',
    href: '/a2-analysis-test/',
    action: 'View A2 Test Details',
  },
  {
    eyebrow: 'Exam Prep Analysis Test',
    title: 'To start Final Prep',
    destination: 'Confirm your readiness for the final stage',
    description:
      'Choose this if you have completed Exam Prep 1 or studied TEF material and want an assessment with Harleen.',
    Icon: GraduationCap,
    accent: 'amber',
    action: 'Information & Booking Coming Soon',
  },
] as const;

const accentStyles = {
  blue: {
    border: 'border-blue-200',
    icon: 'bg-blue-50 text-blue-700',
    eyebrow: 'text-blue-700',
    button: 'bg-blue-700 hover:bg-blue-800 focus-visible:outline-blue-700',
  },
  emerald: {
    border: 'border-emerald-200',
    icon: 'bg-emerald-50 text-emerald-700',
    eyebrow: 'text-emerald-700',
    button: 'bg-emerald-700 hover:bg-emerald-800 focus-visible:outline-emerald-700',
  },
  violet: {
    border: 'border-violet-200',
    icon: 'bg-violet-50 text-violet-700',
    eyebrow: 'text-violet-700',
    button: 'bg-violet-700 hover:bg-violet-800 focus-visible:outline-violet-700',
  },
  amber: {
    border: 'border-amber-200',
    icon: 'bg-amber-50 text-amber-700',
    eyebrow: 'text-amber-700',
    button: '',
  },
} as const;

export default function AnalysisPage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="full-bleed-section-ghl border-b border-slate-200 bg-slate-50 px-6 pb-16 pt-[118px] md:pb-20 md:pt-[150px]">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700">
            <CheckCircle2 className="h-4 w-4" aria-hidden />
            Frenchify Placement &amp; Program Entry
          </div>
          <h1 className="font-display mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-950 md:text-6xl">
            Choose your correct French starting point.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            Select the option that best describes your current French journey. We will guide you to
            the appropriate program or assessment.
          </p>
        </div>
      </section>

      <section className="full-bleed-section-ghl px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {paths.map((path, index) => {
            const styles = accentStyles[path.accent];
            const Icon = path.Icon;

            return (
              <article
                key={path.eyebrow}
                className={`flex min-h-[390px] flex-col rounded-3xl border bg-white p-7 shadow-[0_16px_45px_rgba(15,23,42,0.06)] md:p-9 ${styles.border}`}
              >
                <div className="flex items-start justify-between gap-5">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${styles.icon}`}>
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <span className="font-display text-sm font-bold text-slate-300">0{index + 1}</span>
                </div>

                <p className={`mt-7 text-sm font-bold uppercase tracking-[0.14em] ${styles.eyebrow}`}>
                  {path.eyebrow}
                </p>
                <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-slate-950">
                  {path.title}
                </h2>
                <p className="mt-3 font-semibold text-slate-800">{path.destination}</p>
                <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">{path.description}</p>

                {'href' in path ? (
                  <a
                    href={path.href}
                    className={`mt-8 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-center text-sm font-bold text-white shadow-lg transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${styles.button}`}
                  >
                    {path.action}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </a>
                ) : (
                  <div className="mt-8 flex min-h-13 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-6 py-4 text-center text-sm font-bold text-slate-500">
                    {path.action}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="full-bleed-section-ghl border-y border-slate-200 bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-blue-700">
                How it works
              </p>
              <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-slate-950">
                One page. One clear next step.
              </h2>
            </div>
            <ol className="grid gap-4 sm:grid-cols-3">
              {[
                ['1', 'Choose your pathway'],
                ['2', 'Review the details'],
                ['3', 'Join or book your test'],
              ].map(([number, label]) => (
                <li key={number} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <span className="font-display text-sm font-bold text-blue-700">{number}</span>
                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-800">{label}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="full-bleed-section-ghl px-6 py-14">
        <div className="mx-auto flex max-w-3xl items-start gap-3 rounded-2xl border border-slate-200 p-6 text-sm leading-6 text-slate-600">
          <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" aria-hidden />
          <p>
            Not sure which option applies to you? Contact{' '}
            <a className="font-semibold text-blue-700 underline underline-offset-4" href="mailto:admin@frenchifywithvyom.com">
              admin@frenchifywithvyom.com
            </a>{' '}
            before booking.
          </p>
        </div>
      </section>
    </div>
  );
}
