'use client';

import { motion } from 'framer-motion';

const items = [
  'TEF Canada',
  'CLB 7+',
  'Express Entry',
  '28+ Verified Results',
  'TCF Canada',
  'CLB 9 Speaking',
  '4+ Years Training',
  'Live Mentorship',
  'A1 → B2 Intensive',
  'Bonus PR Points',
  'TEFAQ',
];

export default function HomeV2Ticker() {
  const row = [...items, ...items, ...items];

  return (
    <section className="relative border-y border-[#e5e7eb] bg-[#0A1426] overflow-hidden">
      <div className="relative py-5">
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-[#0A1426] to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-[#0A1426] to-transparent" />
        <motion.div
          className="flex items-center gap-10 whitespace-nowrap"
          animate={{ x: ['0%', '-33.333%'] }}
          transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
        >
          {row.map((text, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="font-display text-[22px] md:text-[28px] font-bold text-white tracking-tight">
                {text}
              </span>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#f59e0b]" />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
