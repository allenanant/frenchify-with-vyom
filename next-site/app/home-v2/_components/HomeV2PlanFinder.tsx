'use client';

import Link from 'next/link';
import { ArrowRight, Clock3, Flag, GraduationCap, TimerReset } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';

const signals = [
  { Icon: GraduationCap, title: 'Your current French level', copy: 'Start at the right foundation.' },
  { Icon: Flag, title: 'Your CLB goal', copy: 'Plan for CLB 5 or CLB 7+.' },
  { Icon: TimerReset, title: 'Your work permit timeline', copy: 'Match your path to your urgency.' },
  { Icon: Clock3, title: 'Your daily study time', copy: 'Build a plan you can sustain.' },
];

export default function HomeV2PlanFinder() {
  return (
    <section className="relative overflow-hidden border-y border-[#e5e7eb] bg-[#F9FAFB] py-20 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 top-0 h-72 w-72 rounded-full bg-[#2563eb]/10 blur-[110px]" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#f59e0b]/10 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 md:px-10">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#2563eb]">
              Your best next step
            </span>
            <h2 className="mt-3 font-display text-[36px] font-bold leading-[1.05] tracking-[-0.03em] text-[#111827] md:text-[50px]">
              Not sure where to start?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.7] text-[#5f6b7a] md:text-[18px]">
              Answer 8 quick questions and we&apos;ll recommend the Frenchify path that matches your level, timeline, and PR goal.
            </p>
          </div>
        </Reveal>

        <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {signals.map((signal, index) => (
            <Reveal key={signal.title} delay={index * 0.08}>
              <article className="h-full rounded-3xl border border-[#e4e9f0] bg-white p-6 shadow-[0_14px_36px_-24px_rgba(15,23,42,0.3)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_22px_44px_-24px_rgba(37,99,235,0.35)]">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-[#2563eb]">
                  <signal.Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-[17px] font-bold tracking-[-0.02em] text-[#111827]">
                  {signal.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.6] text-[#6b7280]">{signal.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.32}>
          <div className="mt-10 text-center">
            <Link
              href="/personalized-french-plan-pr"
              className="group inline-flex min-h-14 w-full max-w-[440px] items-center justify-center gap-3 rounded-full bg-[#f59e0b] px-6 py-4 text-center text-[14px] font-bold leading-snug text-[#111827] shadow-[0_18px_38px_-14px_rgba(245,158,11,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fbbf24] sm:w-auto sm:px-7 sm:text-[15px]"
            >
              Create my personalized French Plan for PR
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <p className="mt-4 text-[12px] font-medium text-[#6b7280]">
              Takes 2 minutes • TEF &amp; TCF focused • No commitment
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
