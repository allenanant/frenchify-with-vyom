'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Play, Sparkles, BadgeCheck, Globe2 } from 'lucide-react';
import Magnetic from '@/components/motion/Magnetic';
import Reveal from '@/components/motion/Reveal';
import TextReveal from '@/components/motion/TextReveal';

export default function HomeV2Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section
      ref={sectionRef}
      id="home-v2-hero"
      className="relative overflow-hidden bg-white"
    >
      <motion.div
        style={{ y: bgY }}
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -top-40 -left-32 h-[560px] w-[560px] rounded-full bg-[#2563eb] opacity-[0.08] blur-[160px]" />
        <div className="absolute top-[40%] -right-40 h-[600px] w-[600px] rounded-full bg-[#f59e0b] opacity-[0.10] blur-[180px]" />
        <div className="absolute inset-0 hero-pattern-animated opacity-60" />
      </motion.div>

      <div className="relative mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-14 pt-12 pb-20 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* LEFT: Headline + CTA */}
          <motion.div style={{ y: titleY }} className="lg:col-span-7 relative z-10">
            <Reveal direction="up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-7 rounded-full bg-white border border-blue-100 shadow-[0_8px_24px_-12px_rgba(37,99,235,0.25)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
                </span>
                <span className="text-[12px] font-extrabold tracking-[0.18em] uppercase text-blue-700">
                  4+ Years · TEF Canada Training
                </span>
              </div>
            </Reveal>

            <h1 className="font-display font-bold text-[#111827] tracking-[-0.04em] leading-[0.96] text-[44px] sm:text-[58px] md:text-[76px] lg:text-[88px] xl:text-[96px]">
              <TextReveal
                as="span"
                text="Becoming"
                className="block"
                stagger={0.06}
              />
              <TextReveal
                as="span"
                text="Fluent with"
                className="block"
                delay={0.15}
                stagger={0.06}
              />
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block shimmer-text"
                >
                  Frenchify.
                </motion.span>
              </span>
            </h1>

            <Reveal direction="up" delay={0.7}>
              <p className="mt-7 max-w-[560px] text-[16px] md:text-[18px] leading-[1.55] text-[#374151]">
                Learn French &amp; clear TEF/TCF Canada exam with a step-by-step real life
                language learning methodology used by students to become fluent in under{' '}
                <span className="font-semibold text-[#111827]">12 months</span>.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.85}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-3 rounded-full bg-[#2563eb] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_18px_40px_-12px_rgba(37,99,235,0.55)] hover:bg-[#1d4ed8] transition-all duration-300"
                  >
                    Book My TEF Expert Call
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15 group-hover:bg-white/25 transition-colors">
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link
                    href="/analysis-page"
                    className="group inline-flex items-center gap-3 rounded-full border border-[#dbeafe] bg-white px-6 py-4 text-[15px] font-semibold text-[#252525] hover:border-[#2563eb] transition-colors duration-300"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-blue-50 text-[#2563eb]">
                      <Play className="h-3 w-3 fill-current" />
                    </span>
                    Book My Analysis Test
                  </Link>
                </Magnetic>
              </div>
            </Reveal>

            <Reveal direction="up" delay={1.0}>
              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-[13px] text-[#4b5563]">
                <span className="inline-flex items-center gap-1.5">
                  <BadgeCheck className="h-4 w-4 text-[#16a34a]" />
                  <span className="font-medium">28+ CLB 7+ verified results</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Globe2 className="h-4 w-4 text-[#2563eb]" />
                  <span className="font-medium">TEF · TCF · TEFAQ</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-[#f59e0b]" />
                  <span className="font-medium">Self-study + Live Mentorship</span>
                </span>
              </div>
            </Reveal>
          </motion.div>

          {/* RIGHT: Cinematic media frame */}
          <Reveal direction="right" delay={0.3} duration={1} className="lg:col-span-5">
            <motion.div
              style={{ y: mediaY, scale: mediaScale }}
              className="relative"
            >
              {/* floating result chips */}
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -left-6 top-12 z-30 hidden md:flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.18)] border border-gray-100"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600 font-display font-bold">
                  9
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#16a34a]">
                    CLB 9 · Speaking
                  </div>
                  <div className="text-[12px] font-semibold text-[#111827]">
                    Simran — TEF Canada
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -right-3 bottom-10 z-30 hidden md:flex items-center gap-3 rounded-2xl bg-[#0A1426] p-3 pr-5 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.4)]"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/20 text-blue-300 font-display font-bold">
                  +PR
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-300">
                    Express Entry
                  </div>
                  <div className="text-[12px] font-semibold text-white">
                    Bonus points unlocked
                  </div>
                </div>
              </motion.div>

              {/* gradient outline */}
              <div className="absolute -inset-2 rounded-[28px] bg-gradient-to-br from-[#2563eb] via-[#3b82f6] to-[#f59e0b] opacity-90 blur-[2px]" />
              <div className="absolute -inset-[2px] rounded-[24px] bg-white" />

              <div className="relative overflow-hidden rounded-[22px] bg-white">
                <Image
                  src="https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6808e5afbcc5c4159279e282.jpeg"
                  alt="French Learning Session with Vyom"
                  width={760}
                  height={920}
                  priority
                  unoptimized
                  className="w-full h-[440px] md:h-[520px] lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1426]/55 via-transparent to-transparent" />
                <div className="absolute left-5 bottom-5 right-5 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">
                      Live cohort · A1 → B2
                    </div>
                    <div className="mt-1 font-display text-[18px] font-bold text-white tracking-tight">
                      Frenchify Intensive
                    </div>
                  </div>
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-white/95 text-[#2563eb] shadow-lg">
                    <Play className="h-4 w-4 fill-current" />
                  </div>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="relative pb-6 flex justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-col items-center gap-2 text-[#6B7280]"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.24em]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="h-8 w-[1px] bg-gradient-to-b from-[#2563eb] to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
