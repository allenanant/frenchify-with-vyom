'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

/**
 * Click-to-play shell for the student-testimonial playlist, built the same way
 * as VideoFacade so the funnel has one pattern for embedded video rather than
 * two. A bare YouTube iframe costs about 900 KB before anyone has decided to
 * watch; the poster below is a 23 KB still from the playlist's first video.
 *
 * Same playlist and same player as /testimonials — youtube-nocookie, videoseries
 * — so the visitor still gets all 34 stories back to back.
 */

export default function YouTubeFacade({
  playlistId,
  posterVideoId,
  title,
  className,
}: {
  playlistId: string;
  /** First video in the playlist. Only used for the still. */
  posterVideoId: string;
  title: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={cn(
        'relative aspect-video w-full overflow-hidden rounded-[14px] border border-fnl-line bg-fnl-ink-bg',
        className
      )}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-fnl-primary"
        >
          {/* maxresdefault is the true 16:9 frame at 1280x720. hqdefault is
              cheaper but it is a 480x360 letterbox, so filling this frame means
              upscaling 480x270 to 800 and it visibly softens. This one is lazy
              and sits nine sections down, so it costs nothing on first load.
              next/image is `unoptimized` here, so it would wrap the tag and
              compress nothing. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${posterVideoId}/maxresdefault.jpg`}
            width={1280}
            height={720}
            sizes="(min-width: 1024px) 800px, 100vw"
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-fnl-surface transition-colors duration-[120ms] group-hover:bg-fnl-surface-alt md:h-20 md:w-20"
          >
            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-fnl-primary md:h-8 md:w-8">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
