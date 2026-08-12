'use client';

import { useState } from 'react';
import Script from 'next/script';
import { cn } from '@/lib/cn';

/**
 * Click-to-play shell for the VSL. Wistia's eager embed pulls publicApi.js,
 * hls_video.js, player.js and captions.js — about 1.6 MB — before the visitor
 * has decided whether to watch anything, on a page whose whole job is to load
 * fast on mobile ad traffic. Nothing loads here until the play button is
 * pressed; the video itself is unchanged.
 */

const MEDIA_ID = 'giyksplji4';

/**
 * Wistia's own still for this media, read from
 * fast.wistia.com/embed/medias/giyksplji4.json. `image_crop_resized` is their
 * resizer: the untouched still is 1752x976 and weighs 198 KB, which would undo
 * most of what deferring the player buys back.
 *
 * `image_quality` matters as much as the resize. Wistia defaults to a quality
 * that costs 126 KB at 960x540; the same frame at 80 is 60 KB and the
 * difference is invisible behind a play button. This still is the page's LCP
 * on mobile, so it is the one request worth tuning by hand.
 */
const POSTER = 'https://embed-fastly.wistia.com/deliveries/2a75fd811a1058c4aaca949de855a774.jpg';
const poster = (size: string) => `${POSTER}?image_crop_resized=${size}&image_quality=80`;

export default function VideoFacade({
  className,
  label = 'Play the workshop preview video',
}: {
  className?: string;
  /** Spoken by screen readers in place of the poster, so make it specific. */
  label?: string;
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
        <>
          {/* player.js alone drives <wistia-player media-id>. The per-media
              embed/<id>.js that usually sits alongside it is an ES module, so
              loading it as a classic script threw "Unexpected token 'export'"
              on every play and its prefetched metadata was discarded anyway —
              player.js just refetched the same thing as JSON. */}
          <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
          {/* The custom element goes in as markup because <wistia-player> has no
              JSX typing, matching how the old hero mounted it. `autoplay` is
              safe here: the press that mounted this counts as the gesture. */}
          <div
            className="h-full w-full"
            dangerouslySetInnerHTML={{
              __html: `<wistia-player media-id="${MEDIA_ID}" autoplay style="height:100%;width:100%"></wistia-player>`,
            }}
          />
        </>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={label}
          className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-fnl-primary"
        >
          {/* Deliberately a raw tag even though the optimizer is on: Wistia
              already serves this poster at whatever size we ask for, so the
              srcset below is doing the real work and routing it through
              /_next/image would only add a wrapper and a second hop. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster('960x540')}
            srcSet={`${poster('640x360')} 640w, ${poster('800x450')} 800w, ${poster('960x540')} 960w`}
            /* The hero column is 680px at its widest and the full viewport
               minus 40px of padding below that, so a 390px phone at DPR 2 asks
               for ~700px and lands on the 800w candidate rather than the 960. */
            sizes="(min-width: 768px) 680px, calc(100vw - 40px)"
            width={960}
            height={540}
            alt=""
            fetchPriority="high"
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
