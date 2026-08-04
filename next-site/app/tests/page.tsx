import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BarChart3, ClipboardCheck } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'French Tests & Level Assessments | Frenchify with Vyom',
  description:
    'Choose a Frenchify level assessment to understand your current French level and get a clear next step for your learning journey.',
};

const tests = [
  {
    title: 'A1 Level Analysis Test',
    description:
      'Assess your A1 foundation, identify your strengths and gaps, and get a personalized roadmap toward A2.',
    href: '/a1-level-analysis-test',
    cta: 'View the A1 test',
    Icon: ClipboardCheck,
    iconClassName: 'bg-blue-100 text-brand-blue',
  },
  {
    title: 'French Level Analysis Test',
    description:
      'Not sure whether you are at A1, A2, B1 or B2? Book a professional evaluation and get a clear next step.',
    href: '/analysis-page',
    cta: 'Explore the level test',
    Icon: BarChart3,
    iconClassName: 'bg-amber-100 text-amber-700',
  },
];

export default function TestsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white px-6 pb-16 pt-20 md:pb-20 md:pt-28">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-blue-200/35 blur-3xl" />
        <div className="absolute -right-24 top-28 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="inline-flex rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-brand-blue shadow-sm">
              French level assessments
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
              Find the right French test for you
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
              Understand where you are today, identify what to work on next, and move forward
              with a clearer learning plan.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-20 md:pb-28">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {tests.map(({ title, description, href, cta, Icon, iconClassName }, index) => (
            <Reveal key={href} delay={index * 0.1}>
              <article className="flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-7 shadow-[0_18px_50px_-30px_rgba(30,58,138,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_60px_-30px_rgba(37,99,235,0.4)] md:p-9">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconClassName}`}
                >
                  <Icon aria-hidden="true" className="h-7 w-7" />
                </div>
                <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-gray-900">
                  {title}
                </h2>
                <p className="mt-4 flex-1 text-base leading-relaxed text-gray-600">
                  {description}
                </p>
                <Link
                  href={href}
                  className="mt-7 inline-flex items-center gap-2 font-semibold text-brand-blue transition-colors hover:text-brand-blue-deep"
                >
                  {cta}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-12 max-w-3xl rounded-3xl bg-gray-50 px-6 py-9 text-center md:px-10">
            <h2 className="font-display text-2xl font-bold tracking-tight text-gray-900">
              Not sure which assessment to choose?
            </h2>
            <p className="mt-3 text-gray-600">
              Tell us about your French background and your target score. We&apos;ll help you
              choose the right next step.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 font-semibold text-white shadow-[0_12px_28px_-10px_rgba(37,99,235,0.65)] transition-all hover:-translate-y-0.5 hover:bg-brand-blue-deep"
            >
              Contact us
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
