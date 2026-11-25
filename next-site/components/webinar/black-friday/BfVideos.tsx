'use client';

import { useState } from 'react';
import Script from 'next/script';

/**
 * Click-to-play video shells for the Black Friday page, in its own design.
 * Same contract as VideoFacade and YouTubeFacade: nothing from Wistia or
 * YouTube loads until the visitor presses play.
 */

const MEDIA_ID = 'giyksplji4';
const POSTER = 'https://embed-fastly.wistia.com/deliveries/2a75fd811a1058c4aaca949de855a774.jpg';
const poster = (size: string) => `${POSTER}?image_crop_resized=${size}&image_quality=80`;

function PlayIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"
        fill="currentColor"
      />
    </svg>
  );
}

/** The VSL inside the hero ticket. Wistia's player, as on /sunday-webinar. */
export function BfVsl() {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="vid">
        <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
        <div
          className="bfp-player"
          dangerouslySetInnerHTML={{
            __html: `<wistia-player media-id="${MEDIA_ID}" autoplay style="height:100%;width:100%"></wistia-player>`,
          }}
        />
      </div>
    );
  }

  return (
    <button type="button" className="vid" onClick={() => setPlaying(true)} aria-label="Play the workshop video">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster('960x540')}
        srcSet={`${poster('640x360')} 640w, ${poster('960x540')} 960w`}
        sizes="(min-width: 600px) 400px, 360px"
        width={960}
        height={540}
        alt=""
        decoding="async"
      />
      <span className="play" aria-hidden="true">
        <PlayIcon size={20} />
      </span>
    </button>
  );
}

/** The student-story playlist. youtube-nocookie, all 34 videos back to back. */
export function BfPlaylist({ playlistId, posterVideoId }: { playlistId: string; posterVideoId: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="playlist">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&autoplay=1`}
          title="CLB 5 and CLB 7 student success stories"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className="playlist"
      onClick={() => setPlaying(true)}
      aria-label="Play the student success stories playlist"
    >
      <picture>
        <source srcSet={`https://i.ytimg.com/vi_webp/${posterVideoId}/maxresdefault.webp`} type="image/webp" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://i.ytimg.com/vi/${posterVideoId}/maxresdefault.jpg`}
          width={1280}
          height={720}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </picture>
      <span className="scrim" aria-hidden="true" />
      <span className="play-lg" aria-hidden="true">
        <PlayIcon size={28} />
      </span>
    </button>
  );
}
