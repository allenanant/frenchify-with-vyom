'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Reveal from '@/components/motion/Reveal';
import { Camera } from 'lucide-react';

type Tile = {
  src: string;
  alt: string;
  caption: string;
  span?: 'wide' | 'tall' | 'square';
};

// Photos confirmed to render relevant content for the captions (France / learning / Canada).
const tiles: Tile[] = [
  {
    src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1400&auto=format&fit=crop',
    alt: 'Eiffel Tower in Paris at sunset',
    caption: 'Paris · the language',
    span: 'wide',
  },
  {
    src: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=900&auto=format&fit=crop',
    alt: 'Open book with reading glasses',
    caption: 'Daily reading · A1 to B2',
    span: 'square',
  },
  {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=900&auto=format&fit=crop',
    alt: 'Group of students learning together',
    caption: 'Live mentorship · 4× a week',
    span: 'tall',
  },
  {
    src: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=900&auto=format&fit=crop',
    alt: 'Open notebook with pen on desk',
    caption: 'Structured notes · every level',
    span: 'square',
  },
  {
    src: 'https://images.unsplash.com/photo-1519178614-68673b201f36?q=80&w=1400&auto=format&fit=crop',
    alt: 'Montréal city skyline at dusk',
    caption: 'Montréal · the destination',
    span: 'wide',
  },
  {
    src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=900&auto=format&fit=crop',
    alt: 'French café latte on wooden table',
    caption: 'Café French · everyday fluency',
    span: 'square',
  },
  {
    src: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=900&auto=format&fit=crop',
    alt: 'Student studying on laptop at desk',
    caption: 'Self-study · your own hours',
    span: 'tall',
  },
  {
    src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=900&auto=format&fit=crop',
    alt: 'Person celebrating a milestone',
    caption: 'TEF Canada · cleared',
    span: 'square',
  },
];

function spanClasses(span?: Tile['span']) {
  switch (span) {
    case 'wide':
      return 'md:col-span-2 md:row-span-1 aspect-[16/9]';
    case 'tall':
      return 'md:col-span-1 md:row-span-2 aspect-[3/4] md:aspect-auto';
    default:
      return 'md:col-span-1 md:row-span-1 aspect-square';
  }
}

export default function HomeV2ImageGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const headerY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-24 md:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <motion.div style={{ y: headerY }}>
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-6 items-end mb-12">
              <div className="lg:col-span-8">
                <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#2667FF]">
                  <Camera className="h-3.5 w-3.5" />
                  A peek inside the journey
                </span>
                <h2 className="mt-3 font-display text-[40px] md:text-[56px] lg:text-[64px] font-bold text-[#111827] tracking-[-0.04em] leading-[1.0]">
                  Real life with French — <br />
                  <span className="gradient-text">in pictures.</span>
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="text-[15px] leading-[1.6] text-[#4b5563]">
                  From Paris cafés to Canadian skylines. Frenchify isn&apos;t just a
                  course — it&apos;s the shortest path from your first French word to
                  your new life in Canada.
                </p>
              </div>
            </div>
          </Reveal>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 md:auto-rows-[220px] gap-3 md:gap-4">
          {tiles.map((t, i) => (
            <motion.figure
              key={t.src}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.6,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group relative overflow-hidden rounded-2xl bg-[#0A1426] ${spanClasses(t.span)}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.src}
                alt={t.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-95 transition-opacity duration-500 group-hover:opacity-100" />
              <figcaption className="absolute left-4 bottom-4 right-4 flex items-center justify-between text-white">
                <span className="font-display text-[13.5px] md:text-[15px] font-bold tracking-tight drop-shadow">
                  {t.caption}
                </span>
                <span className="hidden md:inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
                  <span className="h-1 w-1 rounded-full bg-[#f59e0b]" />
                  Frenchify
                </span>
              </figcaption>
              <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#2667FF]">
                <span className="h-1 w-1 rounded-full bg-[#2563eb]" />
                {String(i + 1).padStart(2, '0')}
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
