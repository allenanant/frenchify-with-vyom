import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';

export const metadata = {
  title: 'Frenchify Placement & Level Assessment',
  description:
    'Select the French level you want to start next: start A1 directly, book a Test to Start A2 or B1, or book a B2 guidance call with Punya Sharma.',
};

const paths = [
  {
    level: 'A1',
    heading: 'Start',
    requirement: 'No Test Required',
    foundation: null,
    description:
      'New to French? You can start A1 directly without taking a placement assessment.',
    accent: 'blue',
    href: '/a1-course/',
    action: 'Explore A1 Programs',
  },
  {
    level: 'A2',
    heading: 'Test to Start',
    requirement: 'Test Required',
    foundation: 'Check Your A1 Foundation',
    description:
      'Already studied A1? Complete this assessment so we can confirm whether you are ready to begin A2.',
    accent: 'emerald',
    href: 'https://learn.frenchifywithvyom.com/web/checkout/6925f1238d6535cff000f8d5',
    action: 'Book Test to Start A2',
  },
  {
    level: 'B1',
    heading: 'Test to Start',
    requirement: 'Test Required',
    foundation: 'Check Your A2 Foundation',
    description:
      'Completed A2 or studied equivalent French elsewhere? Complete this assessment before beginning B1 / Exam Prep 1.',
    accent: 'violet',
    href: 'https://learn.frenchifywithvyom.com/web/checkout/693645b55324d3f59baadd0b',
    action: 'Book Test to Start B1',
  },
  {
    level: 'B2',
    heading: 'Start',
    requirement: 'Guidance Call Required',
    foundation: null,
    description:
      'Completed B1 or already preparing for TEF/TCF? Book a guidance call with Punya Sharma so we can review your current level and recommend the correct B2 / final-prep pathway.',
    accent: 'amber',
    href: 'https://www.frenchifywithvyom.com/contact/',
    action: 'Book B2 Guidance Call',
  },
] as const;

const accentStyles = {
  blue: {
    border: 'border-blue-200',
    badge: 'bg-blue-50 text-blue-700',
    level: 'text-blue-700',
    button: 'bg-blue-700 hover:bg-blue-800 focus-visible:outline-blue-700',
  },
  emerald: {
    border: 'border-emerald-200',
    badge: 'bg-emerald-50 text-emerald-700',
    level: 'text-emerald-700',
    button: 'bg-emerald-700 hover:bg-emerald-800 focus-visible:outline-emerald-700',
  },
  violet: {
    border: 'border-violet-200',
    badge: 'bg-violet-50 text-violet-700',
    level: 'text-violet-700',
    button: 'bg-violet-700 hover:bg-violet-800 focus-visible:outline-violet-700',
  },
  amber: {
    border: 'border-amber-200',
    badge: 'bg-amber-50 text-amber-800',
    level: 'text-amber-800',
    button: 'bg-amber-800 hover:bg-amber-900 focus-visible:outline-amber-800',
  },
} as const;

export default function AnalysisPage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="full-bleed-section-ghl border-b border-slate-200 bg-slate-50 px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700">
            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
            Frenchify Placement &amp; Level Assessment
          </div>
          <h1 className="font-display mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-950 md:text-6xl">
            Which French Level Do You Want to Start?
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            Select the level you want to start next. We’ll tell you whether you can begin directly,
            need a short assessment, or should speak with our team first.
          </p>
        </div>
      </section>

      <section aria-label="Choose your next French level" className="full-bleed-section-ghl px-4 py-12 sm:px-6 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
          {paths.map((path, index) => {
            const styles = accentStyles[path.accent];

            return (
              <article
                key={path.level}
                className={`flex min-w-0 flex-col rounded-3xl border bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.06)] ${styles.border}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-display font-bold tracking-tight">
                    <span className="block text-sm uppercase tracking-[0.12em] text-slate-600">{path.heading}{' '}</span>
                    <span className={`mt-2 block text-6xl leading-none ${styles.level}`}>{path.level}</span>
                  </h2>
                  <span aria-hidden className="font-display text-sm font-bold text-slate-400">0{index + 1}</span>
                </div>

                <p className={`mt-5 self-start rounded-full px-3 py-1.5 text-xs font-bold ${styles.badge}`}>
                  {path.requirement}
                </p>
                {path.foundation && (
                  <p className="mt-5 text-sm font-semibold text-slate-800">{path.foundation}</p>
                )}
                <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">{path.description}</p>

                <a
                  href={path.href}
                  className={`mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-3 py-4 text-center text-sm font-bold text-white shadow-lg transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${styles.button}`}
                >
                  {path.action}
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="full-bleed-section-ghl border-y border-slate-200 bg-slate-50 px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950">
            How Placement Works
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              'Choose the level you want to start',
              'Complete an assessment if your level requires one',
              'Frenchify reviews your result',
              'Start the recommended program',
            ].map((label, index) => (
              <li key={label} className="rounded-2xl border border-slate-200 bg-white p-5">
                <span aria-hidden className="font-display text-sm font-bold text-blue-700">{index + 1}</span>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-800">{label}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm leading-7 text-slate-600">
            A1 students can start directly. For B2 / Final Prep, a guidance call with Punya Sharma
            replaces the automatic assessment step. We’ll review your exam readiness and recommend
            whether you can start B2 or need another assessment or step first.
          </p>
        </div>
      </section>

      <section className="full-bleed-section-ghl px-6 py-10">
        <div className="mx-auto flex max-w-3xl items-start gap-3 rounded-2xl border border-slate-200 p-6 text-sm leading-6 text-slate-600">
          <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden />
          <p>
            Not sure which level applies to you?{' '}
            <a
              className="font-semibold text-blue-700 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              href="https://www.frenchifywithvyom.com/contact/"
            >
              Book a guidance call with our team.
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
