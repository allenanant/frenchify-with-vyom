'use client';

import Link from 'next/link';
import { MessagesSquare } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import FaqAccordion, { type FaqItem } from '@/components/FaqAccordion';

const items: FaqItem[] = [
  {
    q: 'Does Frenchify Program offer TEF/TCF or TEFAQ training?',
    a: 'Yes, Exam specific training is provided right from the start and the programs are designed in a way to fast-track the preparation.',
  },
  {
    q: 'How much time does it take to clear TEF with Frenchify?',
    a: 'If you study average 2-3 hours daily A1 & A2 can be completed within 3 months, B1 & B2 within 5-6 months. If you are studying French full-time the time frame reduces.',
  },
  {
    q: 'Does the Frenchify Program have doubt sessions?',
    a: 'Yes. Along with the online programs, we provide 4 live doubt sessions each week for better understanding and mentorship.',
  },
  {
    q: 'At what level does TEF/TCF-specific training start in Frenchify?',
    a: 'At B1 level, mock exam practices begin with sessions focusing on exam-specific preparation covering all 4 modules (Reading, Writing, Speaking, Listening).',
  },
];

export default function HomeV2Faq() {
  return (
    <section className="relative bg-white py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <Reveal direction="left" className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#2667FF]">
              <MessagesSquare className="h-3.5 w-3.5" />
              Frequently asked
            </span>
            <h2 className="mt-3 font-display text-[40px] md:text-[56px] font-bold text-[#111827] tracking-[-0.04em] leading-[1.0]">
              Got questions <br />
              about your French plan?
            </h2>
            <p className="mt-5 text-[15.5px] leading-[1.6] text-[#4b5563]">
              Get answers to common questions about our French learning programs. Still
              stuck? Book a 1:1 call and we&apos;ll map your timeline together.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#2563eb] px-6 py-3.5 text-[14px] font-semibold text-white shadow-[0_14px_30px_-12px_rgba(37,99,235,0.55)] hover:bg-[#1d4ed8] transition-colors"
            >
              Book a 1:1 with Vyom
            </Link>
          </Reveal>

          <Reveal direction="right" delay={0.15} className="lg:col-span-7">
            <FaqAccordion items={items} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
