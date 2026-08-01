'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Target, BookOpen, ArrowRight } from 'lucide-react';
import Magnetic from '@/components/motion/Magnetic';
import Reveal from '@/components/motion/Reveal';

const benefits = [
  {
    Icon: Target,
    title: 'Personalized assessment',
    copy: 'Get your current French level evaluated and receive a customized learning plan.',
  },
  {
    Icon: BookOpen,
    title: 'Program recommendation',
    copy: 'Discover which Frenchify program fits your timeline and your TEF target score.',
  },
];

export default function HomeV2MegaCta() {
  return (
    <section className="relative bg-white pt-12 pb-24 md:pb-32">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0A1426] via-[#0b1d3a] to-[#0A1426] p-8 md:p-14 lg:p-20 shadow-[0_40px_80px_-30px_rgba(15,23,42,0.5)]">
          {/* animated background blobs */}
          <motion.div
            aria-hidden
            animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute -top-40 -left-20 h-[480px] w-[480px] rounded-full bg-[#2563eb] opacity-40 blur-[160px]"
          />
          <motion.div
            aria-hidden
            animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute -bottom-40 -right-20 h-[520px] w-[520px] rounded-full bg-[#f59e0b] opacity-25 blur-[160px]"
          />
          {/* dot grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <Reveal direction="up">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/15 px-3 py-1.5 text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#f59e0b]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]" />
                  Ready when you are
                </span>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <h2 className="mt-6 font-display text-[42px] md:text-[64px] lg:text-[80px] font-bold text-white tracking-[-0.04em] leading-[0.96]">
                  Start your <br />
                  <span className="bg-gradient-to-r from-[#3b82f6] via-[#60a5fa] to-[#f59e0b] bg-clip-text text-transparent">
                    French journey
                  </span>{' '}
                  today.
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <p className="mt-6 max-w-[520px] text-[16px] md:text-[18px] leading-[1.6] text-white/75">
                  Book a consultation call with our French learning experts. Get
                  personalized guidance, learn about our programs, and discover how
                  we can help you hit your TEF Canada target.
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.3}>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Magnetic>
                    <Link
                      href="/contact"
                      className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-[15px] font-bold text-[#0A1426] shadow-[0_20px_40px_-15px_rgba(255,255,255,0.35)] hover:bg-[#f59e0b] hover:text-white transition-colors duration-300"
                    >
                      <Calendar className="h-4 w-4" />
                      Book consultation
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-[#0A1426]/10 group-hover:bg-white/20 transition-colors">
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  </Magnetic>
                  <Magnetic>
                    <Link
                      href="/programs"
                      className="inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-4 text-[15px] font-semibold text-white hover:bg-white/5 transition-colors duration-300"
                    >
                      See all programs
                    </Link>
                  </Magnetic>
                </div>
              </Reveal>
            </div>

            <Reveal direction="right" delay={0.25} className="lg:col-span-5">
              <div className="space-y-4">
                {benefits.map((b) => (
                  <div
                    key={b.title}
                    className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 md:p-6 backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#2563eb] to-[#3b82f6] text-white shadow-[0_10px_24px_-10px_rgba(37,99,235,0.7)]">
                        <b.Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-display text-[18px] font-extrabold text-white tracking-[-0.01em]">
                          {b.title}
                        </h3>
                        <p className="mt-1 text-[13.5px] leading-[1.55] text-white/70">
                          {b.copy}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="rounded-2xl border border-dashed border-white/15 p-5 md:p-6">
                  <div className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#f59e0b]">
                    Reply time
                  </div>
                  <div className="mt-2 font-display text-[28px] md:text-[32px] font-extrabold text-white tracking-[-0.02em]">
                    Within 24 hours
                  </div>
                  <div className="text-[13px] text-white/65">
                    Direct from Vyom and the Frenchify team
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
