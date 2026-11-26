'use client';

import { Layers, Award, GraduationCap } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';

type Stat = {
  Icon: typeof Award;
  text: string;
  prefix?: string;
  label: string;
  sub: string;
  accent: string;
};

const stats: Stat[] = [
  {
    Icon: GraduationCap,
    text: '5+ Years',
    label: 'TEF/TCF Experience',
    sub: 'Vyom is a pioneer in French for Canadian PR, specializing in TEF, TCF, and TEFAQ preparation.',
    accent: 'from-[#2563eb] to-[#3b82f6]',
  },
  {
    Icon: Award,
    text: '2,000+',
    label: 'Students Helped',
    sub: 'Join a growing online community of 60,000+ members learning French and preparing for TEF and TCF Canada.',
    accent: 'from-[#f59e0b] to-[#fbbf24]',
  },
  {
    Icon: Layers,
    text: 'CLB 7+',
    prefix: 'Verified',
    label: 'Highest and Most Truthful Results in the French Coaching Industry',
    sub: 'Most students clear their target score within 5 to 11 months. No false promises.',
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
              Why Frenchify
            </span>
            <h2 className="mt-3 font-display text-[36px] md:text-[48px] font-bold text-[#111827] tracking-[-0.03em] leading-[1.05]">
              Real Results. Proven Experience.
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.12}>
              <div className="group relative h-full rounded-3xl border border-[#e5e7eb] bg-white p-8 transition-colors duration-500 hover:border-[#dbeafe] overflow-hidden md:p-5 lg:p-8">
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
                <div className="relative mt-10 font-display font-bold text-[#111827] tracking-[-0.04em] leading-[0.95] text-[44px] md:text-[38px] lg:text-[50px] xl:text-[64px]">
                  {s.prefix && <><span className="absolute bottom-full mb-2 block text-xs font-extrabold uppercase leading-none tracking-[0.16em] text-green-700">{s.prefix}</span>{' '}</>}
                  {s.text}
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
