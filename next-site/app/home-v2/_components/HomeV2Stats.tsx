'use client';

import { Layers, Award, GraduationCap } from 'lucide-react';
import AnimatedNumber from '@/components/motion/AnimatedNumber';
import Reveal from '@/components/motion/Reveal';

type Stat = {
  Icon: typeof Award;
  // Either an animated number (value + suffix) or a static display string.
  value?: number;
  suffix?: string;
  text?: string;
  label: string;
  sub: string;
  accent: string;
};

const stats: Stat[] = [
  {
    Icon: GraduationCap,
    text: 'Since 2020',
    label: 'Canada PR Specialized Training Only',
    sub: 'Specialized preparation for TEF, TCF and TEFAQ Canada',
    accent: 'from-[#2563eb] to-[#3b82f6]',
  },
  {
    Icon: Award,
    value: 150,
    suffix: '+',
    label: 'Real TEF/TCF Results',
    sub: 'For CLB 5, CLB 7, work permit extensions, PNP programs and more…',
    accent: 'from-[#f59e0b] to-[#fbbf24]',
  },
  {
    Icon: Layers,
    text: 'CLB 7+',
    label: 'Highest & Most Truthful results in the French Coaching Industry',
    sub: 'Most students clear their target score within 5 to 11 months, real roadmap, real expectations, no false promises',
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
              Real Results. Proven Experience.
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
                <div className="mt-10 font-display font-bold text-[#111827] tracking-[-0.04em] leading-[0.95] text-[44px] md:text-[56px] lg:text-[64px]">
                  {typeof s.value === 'number' ? (
                    <AnimatedNumber value={s.value} suffix={s.suffix} duration={1.6} />
                  ) : (
                    s.text
                  )}
                </div>
                <div className="mt-3 text-[15px] font-semibold leading-snug text-[#252525]">
                  {s.label}
                </div>
                <div className="mt-2 text-[13px] leading-relaxed text-[#6B7280]">{s.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
