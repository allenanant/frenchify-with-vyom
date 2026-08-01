'use client';

import { motion } from 'framer-motion';
import Reveal from '@/components/motion/Reveal';

const exams = [
  'TEF Canada',
  'TCF Canada',
  'TEFAQ',
  'IRCC',
  'Express Entry',
  'CIC Canada',
  'Alliance Française',
  'CLB Framework',
];

export default function HomeV2TrustLogos() {
  const row = [...exams, ...exams, ...exams];

  return (
    <section className="relative bg-white py-16 md:py-20 border-y border-[#e5e7eb]">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <Reveal>
          <div className="text-center mb-10">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#6B7280]">
              Recognized by the people who matter
            </span>
            <h3 className="mt-3 font-display text-[22px] md:text-[28px] font-bold text-[#111827] tracking-[-0.02em]">
              Built for the exams &amp; programs that{' '}
              <span className="gradient-text">unlock Canadian PR</span>
            </h3>
          </div>
        </Reveal>

        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-white to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-white to-transparent"
          />
          <div className="overflow-hidden">
            <motion.div
              className="flex items-center gap-10 md:gap-14 whitespace-nowrap"
              animate={{ x: ['0%', '-33.333%'] }}
              transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
            >
              {row.map((e, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 shrink-0"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#EFF6FF] text-[#2667FF] text-[11px] font-extrabold tracking-tight">
                    {e
                      .split(' ')
                      .map((w) => w[0])
                      .join('')
                      .slice(0, 2)}
                  </span>
                  <span className="font-display text-[18px] md:text-[22px] font-bold text-[#252525] tracking-tight">
                    {e}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
