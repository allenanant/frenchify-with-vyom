'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MessagesSquare, BookOpen, Target } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Magnetic from '@/components/motion/Magnetic';

const credentials = [
  { Icon: BookOpen, label: '4+ years', sub: 'Teaching French' },
  { Icon: Target, label: 'TEF / TCF', sub: 'Exam-focused trainer' },
  { Icon: MessagesSquare, label: '4 / week', sub: 'Live doubt sessions' },
];

export default function HomeV2InstructorSpotlight() {
  return (
    <section className="relative bg-[#0A1426] py-24 md:py-32 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-32 h-[560px] w-[560px] rounded-full bg-[#2563eb] opacity-25 blur-[180px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-32 h-[480px] w-[480px] rounded-full bg-[#f59e0b] opacity-15 blur-[180px]"
      />

      <div className="relative mx-auto max-w-[1280px] px-5 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Portrait */}
          <Reveal direction="left" className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-[#2563eb] via-[#3b82f6] to-[#f59e0b] opacity-70 blur-[2px]" />
              <div className="relative overflow-hidden rounded-[24px] bg-[#0A1426]">
                <Image
                  src="https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6808e5afbcc5c4159279e282.jpeg"
                  alt="Vyom — Frenchify instructor"
                  width={680}
                  height={780}
                  unoptimized
                  className="w-full h-[440px] md:h-[560px] object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#0A1426] via-[#0A1426]/80 to-transparent">
                  <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-[#f59e0b]">
                    Your instructor
                  </div>
                  <div className="mt-1 font-display text-[28px] font-extrabold text-white tracking-[-0.02em]">
                    Vyom
                  </div>
                  <div className="text-[13px] text-white/70">
                    Founder · TEF Canada specialist
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Quote + Credentials */}
          <Reveal direction="right" delay={0.15} className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#f59e0b]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]" />
              Built around one teacher
            </span>

            {/* Big stylized quote — using a styled span instead of the lucide Quote icon */}
            <div className="relative mt-8">
              <span
                aria-hidden
                className="absolute -left-1 -top-6 md:-top-8 font-display text-[110px] md:text-[140px] font-bold leading-none text-[#2563eb]/35 select-none pointer-events-none"
              >
                &ldquo;
              </span>
              <p className="relative font-display text-[22px] md:text-[32px] lg:text-[36px] font-bold text-white tracking-[-0.025em] leading-[1.2] pt-4 md:pt-6">
                Most institutes teach French. We teach you how to walk into a TEF
                Canada exam hall and walk out with the score that unlocks your PR.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3">
              {credentials.map((c) => (
                <div
                  key={c.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:p-5 backdrop-blur-sm"
                >
                  <c.Icon className="h-5 w-5 text-[#3b82f6]" />
                  <div className="mt-3 font-display text-[18px] md:text-[22px] font-extrabold text-white tracking-[-0.02em]">
                    {c.label}
                  </div>
                  <div className="text-[11.5px] text-white/60">{c.sub}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Magnetic>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-full bg-white text-[#0A1426] px-7 py-4 text-[14.5px] font-semibold hover:bg-[#f59e0b] hover:text-white transition-colors duration-300"
                >
                  Book a call with Vyom
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/about-us"
                  className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-transparent text-white px-6 py-4 text-[14.5px] font-semibold hover:bg-white/5 transition-colors duration-300"
                >
                  About Frenchify
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
