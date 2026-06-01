'use client';

import Reveal from '@/components/motion/Reveal';

type Story = {
  name: string;
  image: string;
  accent: string;
  badge: string;
};

const stories: Story[] = [
  {
    name: 'Aanchal',
    image:
      'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4ccfe7237c4dd3fbcb8b.jpg',
    accent: 'from-sky-100 via-white to-blue-50',
    badge: 'CLB 8 · 4 modules',
  },
  {
    name: 'Harpreet',
    image:
      'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4ccfe7237c4dd3fbcb8c.jpg',
    accent: 'from-amber-50 via-white to-orange-50',
    badge: 'CLB 7 · Working pro',
  },
  {
    name: 'Simran',
    image:
      'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4ccf190683601a10238d.jpg',
    accent: 'from-indigo-50 via-white to-violet-50',
    badge: 'CLB 9 · Speaking',
  },
  {
    name: 'Karan',
    image:
      'https://assets.cdn.filesafe.space/cmjlzerv4DUDyZFj6PYO/media/69de4cce80b446d0fb62a8f3.jpg',
    accent: 'from-orange-50 via-white to-rose-50',
    badge: 'Switched & cleared',
  },
  {
    name: 'Priya',
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
        className={`relative aspect-[6/5] bg-gradient-to-br ${s.accent} overflow-hidden`}
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
    </article>
  );
}

export default function HomeV2StudentShowcase() {
  // Triple the list so the marquee can loop seamlessly with -33.333%
  const doubled = [...stories, ...stories, ...stories];

  return (
    <section className="relative bg-white py-24 md:py-32 overflow-hidden">
      {/* Marquee animation + desktop-only hover pause (touch devices keep auto-scrolling) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes hv2StoryMarquee {
              from { transform: translateX(0); }
              to { transform: translateX(-33.333%); }
            }
            .hv2-story-track {
              animation: hv2StoryMarquee 45s linear infinite;
              will-change: transform;
            }
            @media (hover: hover) and (pointer: fine) {
              .hv2-story-group:hover .hv2-story-track {
                animation-play-state: paused;
              }
            }
          `,
        }}
      />
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

      <div className="relative hv2-story-group">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-white to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-white to-transparent"
        />
        <div className="overflow-hidden py-2">
          <div
            className="flex gap-6 w-max hv2-story-track"
            style={{ paddingInline: '40px' }}
          >
            {doubled.map((s, i) => (
              <StoryCard key={`${s.name}-${i}`} s={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
