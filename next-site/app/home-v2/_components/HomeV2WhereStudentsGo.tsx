'use client';

import { motion } from 'framer-motion';
import { MapPin, Plane } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';

type City = {
  name: string;
  province: string;
  image: string;
  highlight: string;
  bonus: string;
};

const cities: City[] = [
  {
    name: 'Montréal',
    province: 'Québec',
    image:
      'https://images.unsplash.com/photo-1519178614-68673b201f36?q=80&w=900&auto=format&fit=crop',
    highlight: 'French-first city',
    bonus: 'Best CLB ROI',
  },
  {
    name: 'Toronto',
    province: 'Ontario',
    image:
      'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?q=80&w=900&auto=format&fit=crop',
    highlight: 'Largest tech market',
    bonus: 'Express Entry bonus',
  },
  {
    name: 'Vancouver',
    province: 'British Columbia',
    image:
      'https://images.unsplash.com/photo-1559511260-66a654ae982a?q=80&w=900&auto=format&fit=crop',
    highlight: 'West-coast lifestyle',
    bonus: 'PR + French bonus',
  },
  {
    name: 'Ottawa',
    province: 'Ontario',
    image:
      'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=900&auto=format&fit=crop',
    highlight: 'Bilingual capital',
    bonus: 'Federal job edge',
  },
  {
    name: 'Québec City',
    province: 'Québec',
    image:
      'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=900&auto=format&fit=crop',
    highlight: 'Heart of francophone Canada',
    bonus: 'PEQ program eligible',
  },
];

export default function HomeV2WhereStudentsGo() {
  return (
    <section className="relative bg-white py-24 md:py-32 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-32 h-[420px] w-[420px] rounded-full bg-[#2563eb] opacity-[0.06] blur-[160px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-20 h-[460px] w-[460px] rounded-full bg-[#f59e0b] opacity-[0.08] blur-[160px]"
      />

      <div className="relative mx-auto max-w-[1320px] px-5 md:px-10">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#2667FF]">
              <Plane className="h-3.5 w-3.5" />
              Where Frenchify alumni land
            </span>
            <h2 className="mt-3 font-display text-[40px] md:text-[56px] lg:text-[64px] font-bold text-[#111827] tracking-[-0.04em] leading-[1.0]">
              The score opens the door. <br />
              <span className="gradient-text">You walk through.</span>
            </h2>
            <p className="mt-5 text-[15.5px] leading-[1.6] text-[#4b5563]">
              French points stack on Express Entry, on PEQ, on bilingual federal
              jobs — and on every life choice you make once you arrive.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
          {cities.map((c, i) => {
            const isFeatured = i === 0;
            const span = isFeatured
              ? 'md:col-span-3 md:row-span-2'
              : i === 1
              ? 'md:col-span-3 md:row-span-1'
              : 'md:col-span-2 md:row-span-1';
            const height = isFeatured ? 'h-[440px]' : 'h-[210px]';
            return (
              <motion.article
                key={c.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group relative overflow-hidden rounded-3xl bg-[#0A1426] ${span} ${height}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={`${c.name} skyline`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-[1200ms] ease-out group-hover:scale-[1.08] group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1426] via-[#0A1426]/40 to-transparent" />

                <div className="absolute left-5 top-5 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#2667FF]">
                    <MapPin className="h-3 w-3" />
                    {c.province}
                  </span>
                </div>

                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                  <div>
                    <div className="text-[10.5px] font-extrabold uppercase tracking-[0.2em] text-[#f59e0b]">
                      {c.highlight}
                    </div>
                    <h3
                      className={`mt-1 font-display font-bold text-white tracking-[-0.025em] leading-[1] ${
                        isFeatured ? 'text-[44px] md:text-[64px]' : 'text-[28px] md:text-[34px]'
                      }`}
                    >
                      {c.name}
                    </h3>
                  </div>
                  <span className="hidden md:inline-flex items-center rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-white/85">
                    {c.bonus}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
