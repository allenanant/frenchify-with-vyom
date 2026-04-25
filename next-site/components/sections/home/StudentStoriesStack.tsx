'use client';

import { useRef } from 'react';
import { Check } from 'lucide-react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import Reveal from '@/components/motion/Reveal';

type Story = {
  name: string;
  headline: string;
  copy: string;
  bullets: string[];
  image: string;
  bg: string;
  accent: string;
};

const stories: Story[] = [
  {
    name: 'Aanchal',
    headline: 'From complete beginner to CLB 8 in TEF Canada',
    copy: 'Started with zero French knowledge. Cleared the TEF Canada exam with a CLB 8 in all four modules after completing the Frenchify A1 → B2 intensive path.',
    bullets: [
      'CLB 8 in Listening, Speaking, Reading & Writing',
      'Cleared on first attempt',
      'Finished the intensive path in under 6 months',
      'Unlocked additional Express Entry CRS points',
    ],
    image:
      'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4ccfe7237c4dd3fbcb8b.jpg',
    bg: 'bg-sky-50',
    accent: 'from-sky-200 via-blue-300 to-indigo-200',
  },
  {
    name: 'Harpreet',
    headline: 'Scored CLB 7 while working a full-time job',
    copy: 'Followed the Frenchify self-study track on weekends and late evenings. Scored CLB 7 in TEF Canada without pausing work — the flexible class format made it possible.',
    bullets: [
      'CLB 7 across all four modules',
      'Self-paced study alongside full-time work',
      'Used weekly mentorship calls to clear doubts',
      'Boosted Canadian PR profile in 4 months',
    ],
    image:
      'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4ccfe7237c4dd3fbcb8c.jpg',
    bg: 'bg-amber-50',
    accent: 'from-amber-200 via-orange-200 to-yellow-200',
  },
  {
    name: 'Simran',
    headline: 'CLB 9 in Speaking — the maximum bonus category',
    copy: 'Focused on pronunciation and exam technique with Frenchify. Walked into TEF Canada and scored CLB 9 in Speaking, unlocking the full French-language bonus on Express Entry.',
    bullets: [
      'CLB 9 in Speaking',
      'CLB 7+ in the remaining three modules',
      'Maximum Express Entry language bonus',
      'Prepared with live speaking practice sessions',
    ],
    image:
      'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4ccf190683601a10238d.jpg',
    bg: 'bg-indigo-50',
    accent: 'from-indigo-200 via-violet-200 to-fuchsia-200',
  },
  {
    name: 'Karan',
    headline: 'Cleared TEF Canada after one failed attempt elsewhere',
    copy: 'Switched to Frenchify after an unsuccessful attempt with another institute. The exam-focused training and structured revision plan turned things around on the very next try.',
    bullets: [
      'Cleared TEF Canada on the retry',
      'CLB 7 across all modules',
      'Exam-focused mock tests & feedback',
      'Targeted weak-area coaching',
    ],
    image:
      'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4cce80b446d0fb62a8f3.jpg',
    bg: 'bg-orange-50',
    accent: 'from-orange-200 via-rose-200 to-amber-200',
  },
  {
    name: 'Priya',
    headline: 'CLB 7 scorer, now preparing Canadian PR application',
    copy: 'Joined the Frenchify A1 Intensive with no background in French. Six months later, CLB 7 scores in hand and already moving forward with the Express Entry PR application.',
    bullets: [
      'CLB 7 in all four TEF Canada modules',
      'A1 → B2 completed in 6 months',
      'Weekly mentorship + doubt sessions',
      'Express Entry application already in progress',
    ],
    image:
      'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4ccfb935a2d764b020ab.jpg',
    bg: 'bg-emerald-50',
    accent: 'from-emerald-200 via-teal-200 to-cyan-200',
  },
];

const TOTAL = stories.length;
// Slight rotations per card give the fanned-deck look (like tagmango)
const deckRotations = [3, 2, 1, 0, -1];
const deckXOffsets = [0, 0, 0, 0, 0];

function StoryCard({
  story,
  i,
  progress,
}: {
  story: Story;
  i: number;
  progress: MotionValue<number>;
}) {
  // Each card's "turn" occupies 1/TOTAL of the scroll.
  // During its turn: translate up + fade + scale to reveal the next card underneath.
  // Last card stays.
  const start = i / TOTAL;
  const end = (i + 1) / TOTAL;

  const yTransform = useTransform(progress, [start, end], ['0%', '-120%']);
  const opacityTransform = useTransform(
    progress,
    [start, (start + end) / 2, end],
    [1, 1, 0]
  );
  const scaleTransform = useTransform(progress, [start, end], [1, 0.92]);

  const isLast = i === TOTAL - 1;

  return (
    <motion.div
      className="student-stack-abs-card"
      style={{
        zIndex: TOTAL - i,
        rotate: deckRotations[i] ?? 0,
        x: deckXOffsets[i] ?? 0,
        y: isLast ? '0%' : yTransform,
        opacity: isLast ? 1 : opacityTransform,
        scale: isLast ? 1 : scaleTransform,
      }}
    >
      <div className={`student-stack-border bg-gradient-to-br ${story.accent}`}>
        <div className={`student-stack-card ${story.bg}`}>
          <div className="student-stack-content">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-brand-blue mb-3">
              <span className="w-5 h-[2px] bg-brand-blue rounded-full" />
              {story.name}&apos;s Story
            </span>
            <h3 className="font-display text-base md:text-lg lg:text-[1.35rem] font-bold text-gray-900 leading-[1.2] tracking-tight mb-3">
              {story.headline}
            </h3>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-4">
              {story.copy}
            </p>
            <ul className="space-y-1.5">
              {story.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-white border border-brand-blue/20 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-brand-blue" strokeWidth={3} />
                  </span>
                  <span className="text-xs md:text-[13px] font-semibold text-gray-800 leading-snug">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="student-stack-media">
            <div className="student-stack-media-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={story.image}
                alt={`${story.name} TEF Canada result`}
                loading="lazy"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function StudentStoriesStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 144px', 'end end'],
  });

  return (
    <section className="relative bg-white full-bleed-section-ghl student-stack-section">
      <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-[72px] lg:pt-28">
        <Reveal>
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-brand-blue bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-5">
              Real Students · Real TEF Scores
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
              Stories that prove <span className="gradient-text">Frenchify works</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mt-5">
              Scroll through how our students went from zero French to TEF Canada scorecards.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Tall scroll container: TOTAL × 100vh of scroll distance */}
      <div
        ref={containerRef}
        className="student-stack-scroller"
        style={{ height: `${TOTAL * 100}vh` }}
      >
        {/* Sticky viewport holds the stacked cards */}
        <div className="student-stack-sticky">
          <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="student-stack-abs-wrap">
              {stories.map((s, i) => (
                <StoryCard key={s.name} story={s} i={i} progress={scrollYProgress} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
