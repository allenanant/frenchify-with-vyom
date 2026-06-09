'use client';

import { Clock, Zap, GraduationCap, UserCheck, Sparkles, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Reveal from '@/components/motion/Reveal';
import Tilt from '@/components/motion/Tilt';

export default function HomeV2BentoFeatures() {
  return (
    <section className="relative bg-[#F9FAFB] py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <Reveal>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#2667FF]">
              <Sparkles className="h-3.5 w-3.5" />
              Why it works
            </span>
            <h2 className="mt-3 font-display text-[40px] md:text-[56px] lg:text-[64px] font-bold text-[#111827] tracking-[-0.04em] leading-[1.0]">
              Frenchify makes French learning{' '}
              <span className="gradient-text">simple and effective.</span>
            </h2>
            <p className="mt-5 text-[16px] md:text-[17px] leading-[1.6] text-[#4b5563] max-w-2xl">
              All within a structured, step-by-step learning environment built for the
              TEF Canada exam — not for general French theory.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {/* BIG: Flexible Classes */}
          <Tilt max={3} className="md:col-span-7">
            <div className="group relative h-full overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0A1426] via-[#0c1c34] to-[#0A1426] p-8 md:p-10 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.5)]">
              <div className="absolute -top-32 -right-20 h-72 w-72 rounded-full bg-[#2563eb]/30 blur-[120px] group-hover:bg-[#2563eb]/45 transition-colors duration-700" />
              <div className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-[#f59e0b]/15 blur-[120px]" />

              <div className="relative flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10.5px] font-extrabold tracking-[0.2em] text-[#f59e0b] uppercase">
                  <Clock className="h-3.5 w-3.5" />
                  Easy for anyone
                </span>
                <span className="text-[60px] md:text-[88px] font-display font-bold text-white/10 leading-none tracking-tight">
                  01
                </span>
              </div>

              <div className="relative mt-12 md:mt-16">
                <h3 className="font-display text-[28px] md:text-[40px] font-extrabold text-white tracking-[-0.03em] leading-[1.05] max-w-[420px]">
                  Flexible classes, on your own time.
                </h3>
                <p className="mt-4 text-[15px] md:text-[16px] leading-[1.65] text-white/70 max-w-[480px]">
                  Complete lectures &amp; classes whenever you want, at your own pace,
                  giving you complete flexibility and personalization.
                </p>
              </div>

              {/* "Anytime" availability strip — replaces the meaningless bar chart */}
              <div className="relative mt-10 max-w-md">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/55 mb-3">
                  Available every day · every hour
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="aspect-square rounded-md bg-white/[0.06] border border-white/10 flex items-center justify-center text-[11px] font-extrabold text-white/80"
                    >
                      {d}
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <div className="text-[12.5px] font-semibold text-white/85 leading-tight">
                    Lecture replays on-demand · sessions 4×/week
                  </div>
                </div>
              </div>
            </div>
          </Tilt>

          {/* MED: Intense & Structured */}
          <Tilt max={4} className="md:col-span-5">
            <div className="group relative h-full overflow-hidden rounded-[28px] bg-white border border-[#e5e7eb] p-8 md:p-10 hover:border-[#dbeafe] hover:shadow-[0_30px_60px_-30px_rgba(37,99,235,0.3)] transition-all duration-500">
              <div className="absolute -top-24 -right-20 h-60 w-60 rounded-full bg-[#f59e0b]/15 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative flex items-center justify-between">
                <span className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#f59e0b] to-[#fbbf24] text-white shadow-[0_10px_24px_-10px_rgba(245,158,11,0.5)]">
                  <Zap className="h-5 w-5" strokeWidth={2.5} />
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#8E8E8E]">
                  02
                </span>
              </div>

              <h3 className="mt-8 font-display text-[24px] md:text-[28px] font-extrabold text-[#111827] tracking-[-0.025em] leading-[1.15]">
                Intense &amp; structured.<br />
                Built for the exam clock.
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-[#4b5563]">
                Syllabus covered at an intensive pace to save valuable time on your Study or
                Work Permit. A step-by-step order makes the syllabus easy to consume.
              </p>

              <div className="relative mt-8 overflow-hidden rounded-2xl border border-[#e6eefb] bg-gradient-to-br from-[#F5FBFF] via-white to-[#FFF7EC] p-5">
                <div className="absolute -top-10 -right-8 h-28 w-28 rounded-full bg-[#f59e0b]/10 blur-2xl" />
                <div className="relative flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#2667FF]">
                    Fast-track roadmap
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#f59e0b]">
                    <Zap className="h-3 w-3" strokeWidth={2.8} />
                    Exam-ready
                  </span>
                </div>

                <div className="relative mt-7 mb-1">
                  {/* connecting track + animated gradient progress, inset to node centres */}
                  <div className="absolute left-[18px] right-[18px] top-[15px] h-[3px] rounded-full bg-[#e2e9f6] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#f59e0b]"
                    />
                  </div>
                  <div className="relative flex items-start justify-between">
                    {[
                      { lvl: 'A1', tag: 'Start' },
                      { lvl: 'A2', tag: 'Build' },
                      { lvl: 'B1', tag: 'Refine' },
                      { lvl: 'B2', tag: 'Exam' },
                    ].map((s, i) => (
                      <motion.div
                        key={s.lvl}
                        initial={{ opacity: 0, y: 10, scale: 0.7 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.25 + i * 0.18, type: 'spring', stiffness: 320, damping: 20 }}
                        className="relative flex flex-col items-center gap-2"
                      >
                        <span
                          className={`grid h-9 w-9 place-items-center rounded-full text-[11px] font-extrabold text-white ring-4 ring-white ${
                            i === 3
                              ? 'bg-gradient-to-br from-[#f59e0b] to-[#fbbf24] shadow-[0_10px_20px_-8px_rgba(245,158,11,0.65)]'
                              : 'bg-gradient-to-br from-[#2563eb] to-[#3b82f6] shadow-[0_10px_20px_-8px_rgba(37,99,235,0.6)]'
                          }`}
                        >
                          {s.lvl}
                        </span>
                        <span className="text-[9.5px] font-bold uppercase tracking-[0.1em] text-[#6B7280]">
                          {s.tag}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Tilt>

          {/* MED: Exam-focused */}
          <Tilt max={4} className="md:col-span-5">
            <div className="group relative h-full overflow-hidden rounded-[28px] bg-white border border-[#e5e7eb] p-8 md:p-10 hover:border-[#dbeafe] hover:shadow-[0_30px_60px_-30px_rgba(37,99,235,0.3)] transition-all duration-500">
              <div className="absolute -top-24 -left-20 h-60 w-60 rounded-full bg-[#2563eb]/12 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative flex items-center justify-between">
                <span className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#3b82f6] text-white shadow-[0_10px_24px_-10px_rgba(37,99,235,0.55)]">
                  <GraduationCap className="h-5 w-5" strokeWidth={2.5} />
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#8E8E8E]">
                  03
                </span>
              </div>

              <h3 className="mt-8 font-display text-[24px] md:text-[28px] font-extrabold text-[#111827] tracking-[-0.025em] leading-[1.15]">
                Exam-focused from day one.
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-[#4b5563]">
                Complete focus on the concepts and topics essential for the TEF / TCF exams,
                right from the beginning. Not a general French course.
              </p>

              <div className="mt-8 grid grid-cols-4 gap-2">
                {['Read', 'Write', 'Speak', 'Listen'].map((m, i) => (
                  <motion.div
                    key={m}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    className="rounded-xl bg-[#F9FAFB] border border-[#e5e7eb] px-2 py-3 text-center"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6B7280]">
                      {m}
                    </div>
                    <div className="mt-1.5 text-[14px] font-extrabold text-[#111827]">
                      CLB 7+
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Tilt>

          {/* BIG: Personalized Mentorship */}
          <Tilt max={3} className="md:col-span-7">
            <div className="group relative h-full overflow-hidden rounded-[28px] bg-gradient-to-br from-[#EFF6FF] via-white to-[#FEF3C7]/40 border border-[#dbeafe] p-8 md:p-10 hover:shadow-[0_30px_60px_-30px_rgba(37,99,235,0.3)] transition-all duration-500">
              <div className="absolute -top-32 -right-20 h-72 w-72 rounded-full bg-[#2563eb]/15 blur-[120px]" />

              <div className="relative flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-white border border-[#dbeafe] px-3 py-1.5 text-[10.5px] font-extrabold tracking-[0.2em] text-[#2667FF] uppercase">
                  <UserCheck className="h-3.5 w-3.5" />
                  Expert Guidance
                </span>
                <span className="text-[60px] md:text-[88px] font-display font-bold text-[#2563eb]/10 leading-none tracking-tight">
                  04
                </span>
              </div>

              <div className="relative mt-12 md:mt-16">
                <h3 className="font-display text-[28px] md:text-[40px] font-extrabold text-[#111827] tracking-[-0.03em] leading-[1.05] max-w-[480px]">
                  Personalized mentorship, every single week.
                </h3>
                <p className="mt-4 text-[15px] md:text-[16px] leading-[1.65] text-[#4b5563] max-w-[520px]">
                  Get guidance and support throughout your French learning journey with
                  experienced instructors and 4 live doubt-clearing sessions per week.
                </p>
              </div>

              <div className="relative mt-10 grid grid-cols-2 gap-3 max-w-md">
                {[
                  { l: 'Live Sessions and Community Access', v: '3 months per level' },
                  { l: 'Speaking & Writing Assignments', v: 'At every level' },
                  { l: 'TEF/TCF Intensive Prep.', v: 'B1 onwards' },
                  { l: 'Direct support & community engagement', v: 'In student community portal' },
                ].map((p, i) => (
                  <motion.div
                    key={p.l}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    className="rounded-xl bg-white border border-[#dbeafe] px-3 py-3"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#6B7280]">
                      {p.l}
                    </div>
                    <div className="mt-1 text-[16px] font-extrabold text-[#111827]">
                      {p.v}
                    </div>
                  </motion.div>
                ))}
              </div>

              <a
                href="/programs"
                className="group/cta relative mt-8 inline-flex items-center gap-2 text-[13px] font-bold text-[#2667FF]"
              >
                See full programs
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#2667FF] text-white group-hover/cta:translate-x-0.5 transition-transform">
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </a>
            </div>
          </Tilt>
        </div>
      </div>
    </section>
  );
}
