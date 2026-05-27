'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';

type Quote = {
  text: string;
  name: string;
  role: string;
  avatar: string;
  badge: string;
  tone: 'dark' | 'light' | 'amber';
};

const quotes: Quote[] = [
  {
    text:
      'Walked into TEF Canada having never spoken French six months earlier. Walked out with CLB 8 across all four modules. Frenchify is built around the exam.',
    name: 'Aanchal Mehta',
    role: 'Software engineer · moving to Toronto',
    avatar:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop',
    badge: 'CLB 8',
    tone: 'dark',
  },
  {
    text:
      'I work full time. There was no way I could attend a 6 PM batch every day. The self-paced lectures plus the weekly doubt calls were the only reason I cleared CLB 7.',
    name: 'Harpreet Singh',
    role: 'Product manager · Bengaluru',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    badge: 'CLB 7',
    tone: 'light',
  },
  {
    text:
      'I scored CLB 9 in Speaking. That alone unlocked the maximum French bonus on Express Entry. Vyom drilled the pronunciation patterns until they became reflex.',
    name: 'Simran Kaur',
    role: 'Marketing lead · Express Entry',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    badge: 'CLB 9',
    tone: 'amber',
  },
];

export default function HomeV2TestimonialQuotes() {
  return (
    <section className="relative bg-[#F9FAFB] py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <Reveal>
          <div className="max-w-3xl mb-14">
            <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#2667FF]">
              <Star className="h-3.5 w-3.5 fill-current text-[#f59e0b]" />
              In their own words
            </span>
            <h2 className="mt-3 font-display text-[40px] md:text-[56px] lg:text-[64px] font-bold text-[#111827] tracking-[-0.04em] leading-[1.0]">
              Three students. <br />
              <span className="gradient-text">Three exam-winning stories.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-12 gap-5">
          {quotes.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={q.avatar}
                    alt={q.name}
                    loading="lazy"
                    className="h-11 w-11 shrink-0 rounded-full object-cover border-2 border-white shadow-sm"
                  />
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
