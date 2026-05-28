'use client';

import { TrendingUp, Award, Clock3 } from 'lucide-react';
import AnimatedNumber from '@/components/motion/AnimatedNumber';
import Reveal from '@/components/motion/Reveal';

const stats = [
  {
    Icon: Clock3,
    value: 4,
    suffix: '+',
    label: 'Years of TEF Canada training',
    sub: 'Built and refined since 2020',
    accent: 'from-[#2563eb] to-[#3b82f6]',
  },
  {
    Icon: Award,
    value: 28,
    suffix: '+',
    label: 'Verified CLB 7+ results',
    sub: 'Public scorecards & screenshots',
    accent: 'from-[#f59e0b] to-[#fbbf24]',
  },
  {
    Icon: TrendingUp,
    value: 12,
    suffix: ' mo',
    label: 'Average time to fluency',
    sub: 'Beginner → exam-ready',
    accent: 'from-[#16a34a] to-[#22c55e]',
  },
];

export default function HomeV2Stats() {
  return (
    <section className="relative bg-[#F9FAFB] py-20 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#2667FF]">
              By the numbers
            </span>
            <h2 className="mt-3 font-display text-[36px] md:text-[48px] font-bold text-[#111827] tracking-[-0.03em] leading-[1.05]">
              Track record, not promises.
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.12}>
              <div className="group relative h-full rounded-3xl border border-[#e5e7eb] bg-white p-8 hover:border-[#dbeafe] transition-colors duration-500 overflow-hidden">
                <div
                  className={`absolute -top-24 -right-20 h-52 w-52 rounded-full bg-gradient-to-br ${s.accent} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700`}
                />
                <div className="flex items-center justify-between">
                  <div
                    className={`inline-grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${s.accent} text-white shadow-[0_10px_24px_-10px_rgba(37,99,235,0.4)]`}
                  >
                    <s.Icon className="h-5 w-5" strokeWidth={2.5} />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#8E8E8E]">
                    0{i + 1}
                  </span>
                </div>
                <div className="mt-10 font-display font-bold text-[#111827] tracking-[-0.04em] leading-[0.95] text-[64px] md:text-[88px]">
                  <AnimatedNumber value={s.value} suffix={s.suffix} duration={1.6} />
                </div>
                <div className="mt-3 text-[15px] font-semibold text-[#252525]">
                  {s.label}
                </div>
                <div className="mt-1 text-[13px] text-[#6B7280]">{s.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
