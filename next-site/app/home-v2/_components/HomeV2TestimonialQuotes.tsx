'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { useRevealFailsafe } from '@/components/motion/useRevealFailsafe';

// Real reviews pulled verbatim (lightly trimmed) from the Frenchify review
// widget (reputationhub / Google reviews). Swap freely — keep quotes real.
type QuoteItem = {
  text: string;
  name: string;
  role: string;
  initials: string;
  badge: string;
  tone: 'dark' | 'light' | 'amber';
};

const quotes: QuoteItem[] = [
  {
    text:
      'Frenchify with Vyom helped me clear the exam in first attempt. Weekly speaking sessions enabled me to speak fluently and get the required scores.',
    name: 'Rajan Gurjar',
    role: 'Verified student review · Jan 2026',
    initials: 'RG',
    badge: 'Cleared in first attempt',
    tone: 'dark',
  },
  {
    text:
      'Clear instructions, clear pathway and what not. The gameplan is structured in such a way that if someone who puts in the work, TEF Canada can be cracked in 10 months.',
    name: 'Sarvesh Paarthasarathy',
    role: 'Verified student review · Jan 2026',
    initials: 'SP',
    badge: 'TEF Canada in 10 months',
    tone: 'light',
  },
  {
    text:
      'Vyom and his team are amazing, they have themselves cleared the TEF Canada exam and help students like me to clear the exam. The live speaking sessions are the most helpful, it made me very comfortable with the exam format.',
    name: 'Appaar',
    role: 'Verified student review · Feb 2026',
    initials: 'A',
    badge: 'Live speaking sessions',
    tone: 'amber',
  },
];

export default function HomeV2TestimonialQuotes() {
  const forced = useRevealFailsafe();
  return (
    <section className="relative bg-[#F9FAFB] py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <Reveal>
          <div className="max-w-3xl mb-14">
            <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#2667FF]">
              <Star className="h-3.5 w-3.5 fill-current text-[#f59e0b]" />
              Student reviews
            </span>
            <h2 className="mt-3 font-display text-[40px] md:text-[56px] lg:text-[64px] font-bold text-[#111827] tracking-[-0.04em] leading-[1.0]">
              What our students say.
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-12 gap-5">
          {quotes.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              animate={forced ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`relative overflow-hidden rounded-3xl p-7 md:p-8 flex flex-col min-w-0 ${
                q.tone === 'dark'
                  ? 'md:col-span-5 bg-gradient-to-br from-[#0A1426] via-[#0b1d3a] to-[#0A1426] text-white'
                  : q.tone === 'amber'
                  ? 'md:col-span-4 bg-gradient-to-br from-[#FEF3C7] via-white to-[#FFF7ED] text-[#252525] border border-[#fde68a]'
                  : 'md:col-span-3 bg-white border border-[#e5e7eb] text-[#252525]'
              }`}
              style={{ minHeight: '380px' }}
            >
              {q.tone === 'dark' && (
                <>
                  <div className="absolute -top-32 -right-20 h-60 w-60 rounded-full bg-[#2563eb] opacity-30 blur-[100px]" />
                  <div className="absolute -bottom-32 -left-20 h-52 w-52 rounded-full bg-[#f59e0b] opacity-20 blur-[100px]" />
                </>
              )}

              <Quote
                className={`h-8 w-8 mb-5 ${
                  q.tone === 'dark'
                    ? 'text-[#3b82f6]'
                    : q.tone === 'amber'
                    ? 'text-[#f59e0b]'
                    : 'text-[#2667FF]'
                }`}
              />

              <blockquote
                className={`relative font-display font-bold tracking-[-0.02em] leading-[1.3] ${
                  q.tone === 'dark'
                    ? 'text-[20px] md:text-[24px] text-white'
                    : 'text-[16px] md:text-[18px] text-[#111827]'
                }`}
              >
                &ldquo;{q.text}&rdquo;
              </blockquote>

              {/* Footer: stacks vertically so badge never overflows */}
              <div className="relative mt-auto pt-7 flex flex-col gap-3">
                <span
                  className={`self-start shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] ${
                    q.tone === 'dark'
                      ? 'bg-white/10 text-[#f59e0b]'
                      : q.tone === 'amber'
                      ? 'bg-white text-[#92400e]'
                      : 'bg-emerald-50 text-emerald-700'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      q.tone === 'dark'
                        ? 'bg-[#f59e0b]'
                        : q.tone === 'amber'
                        ? 'bg-[#f59e0b]'
                        : 'bg-emerald-500'
                    }`}
                  />
                  {q.badge}
                </span>
                <div className="flex items-center gap-3">
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-[14px] font-extrabold border-2 border-white shadow-sm ${
                      q.tone === 'dark'
                        ? 'bg-gradient-to-br from-[#2563eb] to-[#3b82f6] text-white'
                        : q.tone === 'amber'
                        ? 'bg-gradient-to-br from-[#f59e0b] to-[#fbbf24] text-white'
                        : 'bg-gradient-to-br from-[#0A1426] to-[#0b1d3a] text-white'
                    }`}
                  >
                    {q.initials}
                  </span>
                  <div className="min-w-0">
                    <div
                      className={`font-display text-[14px] font-extrabold tracking-tight truncate ${
                        q.tone === 'dark' ? 'text-white' : 'text-[#111827]'
                      }`}
                    >
                      {q.name}
                    </div>
                    <div
                      className={`text-[12px] truncate ${
                        q.tone === 'dark' ? 'text-white/65' : 'text-[#6B7280]'
                      }`}
                    >
                      {q.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
