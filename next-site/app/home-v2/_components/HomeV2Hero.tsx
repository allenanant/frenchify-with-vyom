'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Play, Sparkles, BadgeCheck, Globe2 } from 'lucide-react';
import Magnetic from '@/components/motion/Magnetic';
import Reveal from '@/components/motion/Reveal';
import TextReveal from '@/components/motion/TextReveal';

const HERO_IMAGE_SRC =
  'https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6808e5afbcc5c4159279e282.jpeg';

export default function HomeV2Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={sectionRef}
      id="home-v2-hero"
      className="relative overflow-hidden bg-white min-h-[88vh] lg:min-h-[92vh]"
    >
      {/* Background photo — anchored to the right so Vyom sits in the right half */}
      <motion.div
        aria-hidden
        style={{ y: bgY, scale: bgScale }}
        className="pointer-events-none absolute inset-0"
      >
        <Image
          src={HERO_IMAGE_SRC}
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-[78%_center] md:object-[82%_center] lg:object-[85%_center] scale-[1.02] [filter:blur(2px)]"
        />
        {/* Brand-tinted overlays — keep heading readable on the left, soften Vyom on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/30 md:from-white md:via-white/80 md:to-white/10" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/10 via-transparent to-[#f59e0b]/10" />
        <div className="absolute inset-0 bg-white/15" />
      </motion.div>

      {/* Decorative blurs — keep the original brand glow but lighter now that there's a photo */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-32 h-[480px] w-[480px] rounded-full bg-[#2563eb] opacity-[0.06] blur-[160px]" />
        <div className="absolute inset-0 hero-pattern-animated opacity-30" />
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-14 pt-12 pb-20 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* LEFT: Headline + CTA (kept on left so it doesn't overlap Vyom) */}
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

            <h1 className="font-display font-bold text-[#111827] tracking-[-0.04em] leading-[0.96] text-[44px] sm:text-[58px] md:text-[76px]">
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

          {/* RIGHT: floating chips overlay the background image */}
          <div className="lg:col-span-5 relative z-10 hidden md:block">
            <div className="relative h-[440px] md:h-[520px] lg:h-[600px]">
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 top-10 flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur p-3 pr-5 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.18)] border border-gray-100"
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
                className="absolute right-2 bottom-10 flex items-center gap-3 rounded-2xl bg-[#0A1426]/95 backdrop-blur p-3 pr-5 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.4)]"
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

              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur px-4 py-3 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.18)] border border-gray-100"
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2563eb]">
                  Live cohort · A1 → B2
                </div>
                <div className="h-4 w-px bg-gray-200" />
                <div className="font-display text-[14px] font-bold text-[#111827] tracking-tight">
                  Frenchify Intensive
                </div>
              </motion.div>
            </div>
          </div>
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
