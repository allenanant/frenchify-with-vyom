'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles, BadgeCheck, ClipboardCheck, Globe2 } from 'lucide-react';
import { FRENCH_PR_QUIZ_CTA, FRENCH_PR_QUIZ_PATH } from '@/lib/french-pr-quiz';

const HERO_IMAGE_SRC = '/vyom-hero-classroom-aug24-2026.webp';

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
      className="relative overflow-hidden bg-white md:min-h-[88vh] lg:min-h-[92vh]"
    >
      {/* Background photo — desktop & tablet only; mobile uses a plain white bg */}
      <motion.div
        aria-hidden
        style={{ y: bgY, scale: bgScale }}
        className="pointer-events-none absolute inset-0 hidden md:block"
      >
        <Image
          src={HERO_IMAGE_SRC}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[78%_center] md:object-[75%_center] lg:object-[center_center]"
        />
        {/* White wash only on the LEFT, fully transparent on the right so Vyom stays crisp */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.9)_38%,rgba(255,255,255,0.35)_55%,rgba(255,255,255,0)_72%)] md:bg-[linear-gradient(to_right,rgba(255,255,255,1)_0%,rgba(255,255,255,0.95)_32%,rgba(255,255,255,0.55)_50%,rgba(255,255,255,0)_65%)]" />
      </motion.div>

      {/* Decorative blurs — desktop & tablet only; mobile stays plain white */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="absolute -top-40 -left-32 h-[480px] w-[480px] rounded-full bg-[#2563eb] opacity-[0.06] blur-[160px]" />
        <div className="absolute inset-0 hero-pattern-animated opacity-30" />
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-14 pt-12 pb-0 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* LEFT: Headline + CTA (kept on left so it doesn't overlap Vyom) */}
          <motion.div style={{ y: titleY }} className="lg:col-span-7 relative z-10">
            <div className="mb-5 inline-flex items-center gap-3 sm:mb-6">
              <span className="grid h-[54px] w-[54px] shrink-0 place-items-center rounded-2xl border border-amber-300 bg-[#fbbf24] text-[#0A1426] shadow-[0_10px_25px_-10px_#f59e0b] sm:h-16 sm:w-16">
                <ClipboardCheck className="h-8 w-8 sm:h-9 sm:w-9" aria-hidden="true" />
              </span>
              <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-800 sm:text-sm">Start here · Free quiz</span>
            </div>

            <h1 className="max-w-[640px] font-display text-[38px] font-bold leading-[1.03] tracking-[-0.045em] text-[#0A1426] sm:text-[54px] md:text-[49px] lg:text-[64px]">
              Short on Time for French? <span className="text-[#1d4ed8]">Find Out What to Prioritize Now.</span>
            </h1>

            <p className="mt-5 max-w-[510px] text-[16px] leading-relaxed text-[#374151] md:text-[18px]">
              Take the quick quiz to get a free, personalized French study plan for Canadian PR. Tell us your level, goal, and study preferences, and see what to focus on first for TEF or TCF Canada.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link
                href={FRENCH_PR_QUIZ_PATH}
                className="group inline-flex min-h-[60px] w-full items-center justify-center gap-3 rounded-full bg-[#fbbf24] px-6 py-3 text-center text-[16px] font-extrabold leading-tight text-[#0A1426] shadow-[0_15px_32px_-9px_rgba(245,158,11,0.7)] transition-colors hover:bg-[#f59e0b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 sm:w-auto sm:px-7 sm:text-[17px]"
              >
                {FRENCH_PR_QUIZ_CTA}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#0A1426] text-white">
                  <ArrowRight className="h-[17px] w-[17px] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
              <Link href="/courses/" className="inline-flex min-h-11 items-center text-sm font-bold text-[#1e3a8a] underline decoration-blue-300 underline-offset-4 hover:decoration-blue-700">
                Explore Programs
              </Link>
            </div>

            <div className="mt-2">
              <p className="text-[13px] font-semibold text-[#4b5563]">Completely free · No account or payment needed</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 text-[13px] text-[#4b5563]">
                <span className="inline-flex items-center gap-1.5">
                  <BadgeCheck className="h-4 w-4 text-[#16a34a]" />
                  <span className="font-medium">150+ Verified TEF/TCF Results</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Globe2 className="h-4 w-4 text-[#2563eb]" />
                  <span className="font-medium">TEF • TCF • TEFAQ</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-[#f59e0b]" />
                  <span className="font-medium">Flexible Live + Self-Paced Options</span>
                </span>
              </div>
            </div>

            {/* Mobile-only full-width hero image (below the content) */}
            <div className="md:hidden -mx-5 mt-8">
              <Image
                src="/hero-classroom-aug24-2026-mobile.jpg"
                alt="Vyom mentoring a live French class"
                width={770}
                height={726}
                priority
                className="block w-full h-auto"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
