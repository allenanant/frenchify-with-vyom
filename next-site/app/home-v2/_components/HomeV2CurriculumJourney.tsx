'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

type Milestone = {
  num: string;
  level: string;
  title: string;
  copy: string;
  href: string;
  cta: string;
  duration: string;
  outcome: string;
};

const milestones: Milestone[] = [
  {
    num: '01',
    level: 'A1',
    title: 'Frenchify A1 Intensive',
    copy: 'Step-by-step for absolute beginners. Build pronunciation, core vocabulary and exam-grade grammar foundations from day one.',
    href: '/a1-intensive-program',
    cta: 'Explore A1',
    duration: '~6 weeks',
    outcome: 'Hold a basic French conversation',
  },
  {
    num: '02',
    level: 'A2',
    title: 'Frenchify A2 Intensive',
    copy: 'Move past survival French. Master past tenses, deeper grammar and structured reading + writing practice.',
    href: '/a2-intensive-program',
    cta: 'Explore A2',
    duration: '~8 weeks',
    outcome: 'Read & write short paragraphs',
  },
  {
    num: '03',
    level: 'B1',
    title: 'Frenchify B1 TEF/TCF',
    copy: 'Exam-focused fluency. Mock tests begin. All four modules — Reading, Writing, Speaking, Listening — drilled to CLB 7 standard.',
    href: '/b1-intensive-program',
    cta: 'Explore B1',
    duration: '~10 weeks',
    outcome: 'Hit CLB 7 across modules',
  },
  {
    num: '04',
    level: 'B2',
    title: 'Frenchify B2 TEF/TCF',
    copy: 'Exam-ready level. Targeted module coaching, weekly speaking labs, and full TEF Canada simulation under timed conditions.',
    href: '/b2-intensive-program',
    cta: 'Explore B2',
    duration: '~10 weeks',
    outcome: 'CLB 8–9 + max PR bonus',
  },
];

export default function HomeV2CurriculumJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 60%', 'end 40%'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-24 md:py-32 overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-40 h-[480px] w-[480px] rounded-full bg-[#2563eb] opacity-[0.06] blur-[160px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-20 h-[420px] w-[420px] rounded-full bg-[#f59e0b] opacity-[0.08] blur-[160px]"
      />

      <div className="relative mx-auto max-w-[1280px] px-5 md:px-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#2667FF]">
              <Sparkles className="h-3.5 w-3.5" />
              Your path to Canada
            </span>
            <h2 className="mt-3 font-display text-[40px] md:text-[60px] lg:text-[72px] font-bold text-[#111827] tracking-[-0.04em] leading-[0.98]">
              A curriculum that <br />
              <span className="gradient-text">unlocks itself.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[16px] md:text-[17px] leading-[1.6] text-[#4b5563]">
              Four intensive levels, each one unlocking the next. No skipping the stairs —
              just a step-by-step road from zero French to a TEF Canada scorecard.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative pl-8 md:pl-16">
          {/* base line */}
          <div className="absolute left-3 md:left-7 top-2 bottom-2 w-[2px] bg-[#e5e7eb] rounded-full" />
          {/* progress line */}
          <motion.div
            style={{ scaleY: lineScale, transformOrigin: 'top' }}
            className="absolute left-3 md:left-7 top-2 bottom-2 w-[2px] rounded-full bg-gradient-to-b from-[#2563eb] via-[#3b82f6] to-[#f59e0b]"
          />

          <div className="space-y-6 md:space-y-8">
            {milestones.map((m, i) => (
              <MilestoneRow key={m.num} m={m} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MilestoneRow({ m, index }: { m: Milestone; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* node */}
      <div className="absolute -left-8 md:-left-16 top-7 grid h-7 w-7 md:h-9 md:w-9 place-items-center rounded-full bg-white border-2 border-[#2563eb] shadow-[0_10px_24px_-10px_rgba(37,99,235,0.55)]">
        <span className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-[#2563eb]" />
      </div>

      <div className="group relative rounded-3xl border border-[#e5e7eb] bg-white p-6 md:p-9 hover:border-[#dbeafe] hover:shadow-[0_30px_60px_-30px_rgba(37,99,235,0.3)] transition-all duration-500">
        <div
          aria-hidden
          className="absolute -inset-px rounded-3xl bg-gradient-to-br from-[#2563eb]/0 via-transparent to-[#f59e0b]/0 group-hover:from-[#2563eb]/10 group-hover:to-[#f59e0b]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        />
        <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
          <div className="md:col-span-3 flex md:flex-col items-baseline md:items-start gap-4">
            <span className="font-display text-[64px] md:text-[88px] font-bold text-[#111827] tracking-[-0.05em] leading-[0.85]">
              {m.num}
            </span>
            <span className="inline-flex items-center rounded-full bg-[#EFF6FF] text-[#2667FF] px-3 py-1.5 text-[11px] font-extrabold tracking-[0.14em]">
              LEVEL {m.level}
            </span>
          </div>

          <div className="md:col-span-6">
            <h3 className="font-display text-[24px] md:text-[28px] font-extrabold text-[#111827] tracking-[-0.025em] leading-[1.1]">
              {m.title}
            </h3>
            <p className="mt-3 text-[14.5px] md:text-[15.5px] leading-[1.6] text-[#4b5563]">
              {m.copy}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e7eb] bg-[#F9FAFB] px-3 py-1.5 text-[11.5px] font-semibold text-[#374151]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
                {m.duration}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e7eb] bg-[#F9FAFB] px-3 py-1.5 text-[11.5px] font-semibold text-[#374151]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
                {m.outcome}
              </span>
            </div>
          </div>

          <div className="md:col-span-3 flex md:justify-end">
            <Link
              href={m.href}
              className="group/cta inline-flex items-center gap-3 rounded-full bg-[#0A1426] text-white px-5 py-3.5 text-[13.5px] font-semibold hover:bg-[#2563eb] transition-colors duration-300 w-full md:w-auto justify-center"
            >
              {m.cta}
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 group-hover/cta:bg-white/25 transition-colors">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
