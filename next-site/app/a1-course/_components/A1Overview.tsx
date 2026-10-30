'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Play } from 'lucide-react';
import styles from '../A1Course.module.css';

export default function A1Overview() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={styles.videoFrame}>
      {playing ? (
        <iframe
          src="https://www.youtube-nocookie.com/embed/PCXt_XCyV1U?autoplay=1&rel=0&modestbranding=1&playsinline=1&color=white"
          title="Every Student Who Cleared TEF Started Exactly Here (Frenchify A1 Program)"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label="Watch A1 Program Overview with Vyom" className={styles.videoButton}>
          <Image src="/images/a1-course/a1-video-thumb.webp" alt="A1 program overview with Vyom" fill sizes="(min-width: 900px) 520px, (min-width: 600px) 540px, calc(100vw - 32px)" priority />
          <span className={styles.playButton} aria-hidden><Play size={26} fill="currentColor" /></span>
        </button>
      )}
    </div>
  );
}
