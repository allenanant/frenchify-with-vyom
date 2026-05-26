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

const tiles: Tile[] = [
  {
    src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
    alt: 'Eiffel Tower in Paris',
    caption: 'Paris, France',
    span: 'wide',
  },
  {
    src: 'https://images.unsplash.com/photo-1517732306149-e8f829eb588a?q=80&w=900&auto=format&fit=crop',
    alt: 'French books and cafe',
    caption: 'French books · daily ritual',
    span: 'square',
  },
  {
    src: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=900&auto=format&fit=crop',
    alt: 'Student studying with laptop',
    caption: 'Self-study · own pace',
    span: 'tall',
  },
  {
    src: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?q=80&w=900&auto=format&fit=crop',
    alt: 'Group of students learning',
    caption: 'Live mentorship · 4×/week',
    span: 'square',
  },
  {
    src: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1200&auto=format&fit=crop',
    alt: 'Montreal cityscape',
    caption: 'Montréal — your destination',
    span: 'wide',
  },
  {
    src: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=900&auto=format&fit=crop',
    alt: 'Open notebook with notes',
    caption: 'Structured notes · A1 → B2',
    span: 'square',
  },
  {
    src: 'https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?q=80&w=900&auto=format&fit=crop',
    alt: 'French croissant and coffee',
    caption: 'Real life · real fluency',
    span: 'tall',
  },
  {
    src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=900&auto=format&fit=crop',
    alt: 'Student on laptop happy',
    caption: 'On-demand · anywhere',
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
  const headerY = useTransform(scrollYProgress, [0, 1], [60, -60]);

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
              className={`group relative overflow-hidden rounded-2xl bg-white ${spanClasses(t.span)}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.src}
                alt={t.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/0 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
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
