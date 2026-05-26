'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';

type Story = {
  name: string;
  headline: string;
  copy: string;
  bullets: string[];
  image: string;
  accent: string;
  badge: string;
};

const stories: Story[] = [
  {
    name: 'Aanchal',
    headline: 'From complete beginner to CLB 8 in TEF Canada',
    copy: 'Started with zero French knowledge. Cleared the TEF Canada exam with a CLB 8 in all four modules after completing the Frenchify A1 → B2 intensive path.',
    bullets: [
      'CLB 8 in Listening, Speaking, Reading & Writing',
      'Cleared on first attempt',
      'Finished in under 6 months',
    ],
    image:
      'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4ccfe7237c4dd3fbcb8b.jpg',
    accent: 'from-sky-100 via-white to-blue-50',
    badge: 'CLB 8 · 4 modules',
  },
  {
    name: 'Harpreet',
    headline: 'Scored CLB 7 while working a full-time job',
    copy: 'Followed the Frenchify self-study track on weekends and late evenings. Scored CLB 7 without pausing work — the flexible class format made it possible.',
    bullets: [
      'CLB 7 across all four modules',
      'Self-paced study alongside full-time work',
      'Boosted Canadian PR profile in 4 months',
    ],
    image:
      'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4ccfe7237c4dd3fbcb8c.jpg',
    accent: 'from-amber-50 via-white to-orange-50',
    badge: 'CLB 7 · Working pro',
  },
  {
    name: 'Simran',
    headline: 'CLB 9 in Speaking — the maximum bonus category',
    copy: 'Focused on pronunciation and exam technique. Walked into TEF Canada and scored CLB 9 in Speaking, unlocking the full French-language bonus on Express Entry.',
    bullets: [
      'CLB 9 in Speaking',
      'CLB 7+ in remaining three modules',
      'Maximum Express Entry language bonus',
    ],
    image:
      'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4ccf190683601a10238d.jpg',
    accent: 'from-indigo-50 via-white to-violet-50',
    badge: 'CLB 9 · Speaking',
  },
  {
    name: 'Karan',
    headline: 'Cleared TEF Canada after one failed attempt elsewhere',
    copy: 'Switched to Frenchify after an unsuccessful attempt with another institute. The exam-focused training and structured revision plan turned things around.',
    bullets: [
      'Cleared TEF Canada on retry',
      'CLB 7 across all modules',
      'Exam-focused mock tests & feedback',
    ],
    image:
      'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4cce80b446d0fb62a8f3.jpg',
    accent: 'from-orange-50 via-white to-rose-50',
    badge: 'Switched & cleared',
  },
  {
    name: 'Priya',
    headline: 'CLB 7 in 6 months, Canadian PR application now in motion',
    copy: 'Joined the Frenchify A1 Intensive with no background in French. Six months later, CLB 7 scores in hand and Express Entry application underway.',
    bullets: [
      'CLB 7 in all four TEF Canada modules',
      'A1 → B2 completed in 6 months',
      'Express Entry application in progress',
    ],
    image:
      'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4ccfb935a2d764b020ab.jpg',
    accent: 'from-emerald-50 via-white to-teal-50',
    badge: 'CLB 7 · 6 months',
  },
];

function StoryCard({ s }: { s: Story }) {
  return (
    <article className="group relative shrink-0 w-[300px] sm:w-[360px] md:w-[420px] rounded-3xl border border-[#e5e7eb] bg-white overflow-hidden hover:shadow-[0_30px_60px_-30px_rgba(37,99,235,0.3)] hover:border-[#dbeafe] transition-all duration-500">
      <div
        className={`relative h-[260px] bg-gradient-to-br ${s.accent} overflow-hidden`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={s.image}
          alt={`${s.name} TEF Canada result`}
          loading="lazy"
          className="h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[10.5px] font-extrabold tracking-[0.16em] uppercase text-[#16a34a] shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
          {s.badge}
        </div>
      </div>

      <div className="p-7">
        <div className="text-[10.5px] font-extrabold tracking-[0.2em] uppercase text-[#2667FF] mb-2.5">
          {s.name}&apos;s story
        </div>
        <h3 className="font-display text-[20px] md:text-[22px] font-extrabold text-[#111827] tracking-[-0.02em] leading-[1.2] mb-3">
          {s.headline}
        </h3>
        <p className="text-[13.5px] leading-[1.6] text-[#4b5563] mb-5">
          {s.copy}
        </p>
        <ul className="space-y-2">
          {s.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5">
              <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#2563eb] text-white">
                <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
              </span>
              <span className="text-[12.5px] font-semibold text-[#252525] leading-snug">
                {b}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function HomeV2StudentShowcase() {
  // Triple the list so the marquee can loop seamlessly with -33.333%
  const doubled = [...stories, ...stories, ...stories];

  return (
    <section className="relative bg-white py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10 mb-12">
        <Reveal direction="up">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1.5 text-[11px] font-extrabold tracking-[0.18em] uppercase text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Real students · Real TEF scores
          </span>
          <h2 className="mt-4 font-display text-[40px] md:text-[60px] lg:text-[72px] font-bold text-[#111827] tracking-[-0.04em] leading-[0.98] max-w-3xl">
            Stories that prove <br />
            <span className="gradient-text">Frenchify works.</span>
          </h2>
        </Reveal>
      </div>

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-white to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-white to-transparent"
        />
        <div className="overflow-hidden py-2">
          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ['0%', '-33.333%'] }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ paddingInline: '40px' }}
          >
            {doubled.map((s, i) => (
              <StoryCard key={`${s.name}-${i}`} s={s} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
