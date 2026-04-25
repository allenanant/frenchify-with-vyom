'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

interface Props {
  images: string[];
  alt: string;
  /** Aspect ratio class, e.g. 'aspect-[16/9]'. Default 'aspect-[16/9]'. */
  aspect?: string;
  /** ms between auto-advances. Default 4000. Set 0 to disable autoplay. */
  intervalMs?: number;
  className?: string;
}

export default function ImageCarousel({
  images,
  alt,
  aspect = 'aspect-[16/9]',
  intervalMs = 4000,
  className,
}: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || intervalMs === 0 || paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs, paused]);

  if (images.length === 0) return null;

  return (
    <div
      className={cn('relative w-full overflow-hidden rounded-2xl bg-gray-100 group', aspect, className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, i) => (
        <div
          key={src + i}
          className={cn(
            'absolute inset-0 transition-opacity duration-700',
            i === index ? 'opacity-100' : 'opacity-0'
          )}
          aria-hidden={i !== index}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-brand-ink rounded-full p-2 shadow-md backdrop-blur transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % images.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-brand-ink rounded-full p-2 shadow-md backdrop-blur transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  'h-2 rounded-full transition-all',
                  i === index ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80 w-2'
                )}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
