'use client';

import { motion } from 'framer-motion';
import { Check, X, Sparkles, Trophy } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';

type Row = {
  label: string;
  frenchify: boolean | string;
  traditional: boolean | string;
};

const rows: Row[] = [
  { label: 'TEF / TCF exam-focused syllabus from day one', frenchify: true, traditional: false },
  { label: 'Live doubt sessions every week', frenchify: '4 per week', traditional: 'Rare' },
  { label: 'Self-paced lectures (study around work)', frenchify: true, traditional: false },
  { label: 'Full mock exams with feedback', frenchify: 'B1 onwards', traditional: 'B2 only' },
  { label: 'Personalised CLB target tracking', frenchify: true, traditional: false },
  { label: 'A1 → B2 completion timeline', frenchify: '6 months', traditional: '12-18 months' },
  { label: 'One mentor for the full journey', frenchify: 'Vyom', traditional: 'Rotating tutors' },
  { label: 'Public CLB 7+ verified scorecards', frenchify: '28+', traditional: '—' },
];

function Cell({ value, highlight }: { value: boolean | string; highlight?: boolean }) {
  if (value === true) {
    return (
      <span
        className={`inline-flex items-center gap-1 md:gap-2 rounded-full px-2 md:px-3 py-0.5 md:py-1.5 text-[10.5px] md:text-[12px] font-bold tracking-tight ${
          highlight
            ? 'bg-emerald-50 text-emerald-700'
            : 'bg-[#F3F6F8] text-[#6B7280]'
        }`}
      >
        <Check className={`h-3 w-3 md:h-3.5 md:w-3.5 ${highlight ? 'text-emerald-600' : 'text-[#9CA3AF]'}`} strokeWidth={3} />
        Yes
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center gap-1 md:gap-2 rounded-full bg-rose-50 text-rose-600 px-2 md:px-3 py-0.5 md:py-1.5 text-[10.5px] md:text-[12px] font-bold tracking-tight">
        <X className="h-3 w-3 md:h-3.5 md:w-3.5" strokeWidth={3} />
        No
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 md:px-3 py-0.5 md:py-1.5 text-[10.5px] md:text-[12px] font-bold tracking-tight text-center leading-tight ${
        highlight ? 'bg-blue-50 text-[#2667FF]' : 'bg-[#F3F6F8] text-[#6B7280]'
      }`}
    >
      {value}
    </span>
  );
}

export default function HomeV2Comparison() {
  return (
    <section className="relative bg-white py-24 md:py-32 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          maskImage:
            'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          backgroundImage:
            'radial-gradient(rgba(37,99,235,0.18) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-5 md:px-10">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#2667FF]">
              <Trophy className="h-3.5 w-3.5" />
              Frenchify vs. the rest
            </span>
            <h2 className="mt-3 font-display text-[40px] md:text-[56px] lg:text-[60px] font-bold text-[#111827] tracking-[-0.04em] leading-[1.0]">
              Built for <span className="gradient-text">exam scores</span>,<br />
              not classroom hours.
            </h2>
            <p className="mt-5 text-[15.5px] leading-[1.6] text-[#4b5563]">
              Traditional French classes teach you a beautiful language. Frenchify
              gets you a TEF Canada scorecard.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white shadow-[0_30px_60px_-30px_rgba(15,23,42,0.15)]">
            {/* Header */}
            <div className="grid grid-cols-[1.4fr_1fr_1fr] md:grid-cols-[2fr_1fr_1fr] bg-[#F9FAFB] border-b border-[#e5e7eb] items-center">
              <div className="p-2.5 md:p-6 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] md:tracking-[0.18em] text-[#6B7280]">
                Feature
              </div>
              <div className="p-2.5 md:p-6 border-l border-[#e5e7eb] bg-gradient-to-b from-[#EFF6FF] to-white">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <span className="grid h-5 w-5 md:h-7 md:w-7 place-items-center rounded-md md:rounded-lg bg-[#2563eb] text-white shadow-[0_8px_18px_-8px_rgba(37,99,235,0.5)]">
                    <Sparkles className="h-2.5 w-2.5 md:h-3.5 md:w-3.5" />
                  </span>
                  <span className="font-display text-[12px] md:text-[17px] font-extrabold text-[#111827] tracking-tight">
                    Frenchify
                  </span>
                </div>
              </div>
              <div className="p-2.5 md:p-6 border-l border-[#e5e7eb]">
                <span className="font-display text-[11px] md:text-[15px] font-semibold text-[#6B7280] tracking-tight leading-tight">
                  Traditional French class
                </span>
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-[#e5e7eb]">
              {rows.map((r, i) => (
                <motion.div
                  key={r.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-[1.4fr_1fr_1fr] md:grid-cols-[2fr_1fr_1fr] hover:bg-[#F9FAFB]/50 transition-colors items-center"
                >
                  <div className="p-2.5 md:p-6 text-[11.5px] md:text-[14.5px] font-semibold text-[#252525] leading-snug">
                    {r.label}
                  </div>
                  <div className="p-2.5 md:p-6 border-l border-[#e5e7eb] bg-[#EFF6FF]/30 flex justify-center md:justify-start">
                    <Cell value={r.frenchify} highlight />
                  </div>
                  <div className="p-2.5 md:p-6 border-l border-[#e5e7eb] flex justify-center md:justify-start">
                    <Cell value={r.traditional} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="grid grid-cols-[1.4fr_1fr_1fr] md:grid-cols-[2fr_1fr_1fr] bg-gradient-to-r from-[#0A1426] to-[#0b1d3a] text-white items-center">
              <div className="p-2.5 md:p-6 text-[11.5px] md:text-[14.5px] font-bold leading-snug">
                The score that matters
              </div>
              <div className="p-2.5 md:p-6 border-l border-white/10 bg-white/[0.04] flex justify-center md:justify-start">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#f59e0b] text-[#111827] px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-[12px] font-extrabold tracking-tight leading-tight text-center">
                  CLB 7+ guaranteed path
                </span>
              </div>
              <div className="p-2.5 md:p-6 border-l border-white/10 text-white/60 text-[11px] md:text-[13px] leading-snug">
                Not the focus.
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
