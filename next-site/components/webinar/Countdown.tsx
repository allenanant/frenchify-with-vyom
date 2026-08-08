'use client';

/**
 * Replaces GoHighLevel's countdown-timer product.
 *
 * The GHL timer was a separate object in Marketing → Countdown Timers with its
 * own end date and its own "active/expired leads to link" fields, edited by
 * hand every week and easy to leave pointing at a dead room. This one reads the
 * same schedule the pages do, so it can never disagree with the date printed
 * next to it.
 *
 * Two behaviours, matching how the timer was used on GHL:
 *  - landing / registration pages: count down, then say we're live.
 *  - the waiting room: count down, then send the visitor to the webinar room.
 */

import { useEffect, useRef, useState } from 'react';

type Props = {
  /** ISO instant the webinar starts. */
  targetIso: string;
  /** WebinarJam room. Empty until Vyom sends the week's link. */
  joinUrl?: string;
  /** Waiting room only: bounce to joinUrl once the clock hits zero. */
  redirectOnExpiry?: boolean;
  /** Seconds to hold the "starting now" message before redirecting. */
  redirectDelaySeconds?: number;
  /** Copy shown in place of the digits once time is up. */
  expiredLabel?: string;
  tone?: 'light' | 'dark';
  className?: string;
};

function split(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    d: Math.floor(total / 86400),
    h: Math.floor((total % 86400) / 3600),
    m: Math.floor((total % 3600) / 60),
    s: total % 60,
  };
}

export default function Countdown({
  targetIso,
  joinUrl = '',
  redirectOnExpiry = false,
  redirectDelaySeconds = 3,
  expiredLabel = "We're live now",
  tone = 'light',
  className = '',
}: Props) {
  const target = new Date(targetIso).getTime();
  // Rendering real digits on the server would guarantee a hydration mismatch,
  // so the first paint is a placeholder and the clock starts on mount.
  const [remaining, setRemaining] = useState<number | null>(null);
  const redirected = useRef(false);

  useEffect(() => {
    const tick = () => setRemaining(target - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const expired = remaining !== null && remaining <= 0;

  useEffect(() => {
    if (!expired || !redirectOnExpiry || !joinUrl || redirected.current) return;
    redirected.current = true;
    const id = setTimeout(() => {
      window.location.href = joinUrl;
    }, Math.max(0, redirectDelaySeconds) * 1000);
    return () => clearTimeout(id);
  }, [expired, redirectOnExpiry, joinUrl, redirectDelaySeconds]);

  const dark = tone === 'dark';
  const cell = dark
    ? 'bg-white/10 border-white/20 text-white'
    : 'bg-white border-blue-100 text-slate-900';
  const label = dark ? 'text-white/70' : 'text-slate-500';

  if (expired) {
    return (
      <div className={className}>
        <div
          className={`rounded-2xl border-2 px-6 py-5 text-center ${
            dark ? 'border-green-400/40 bg-green-500/15' : 'border-green-200 bg-green-50'
          }`}
        >
          <p className={`font-display text-xl font-black ${dark ? 'text-white' : 'text-green-800'}`}>
            {expiredLabel}
          </p>
          {joinUrl ? (
            <a
              href={joinUrl}
              className="mt-3 inline-block rounded-xl bg-green-600 px-6 py-3 text-base font-black text-white shadow-lg transition hover:bg-green-700"
            >
              Join the workshop now
            </a>
          ) : (
            <p className={`mt-1 text-sm font-semibold ${dark ? 'text-white/80' : 'text-green-700'}`}>
              Keep this page open — you&apos;ll be connected as soon as the host opens the room.
            </p>
          )}
        </div>
      </div>
    );
  }

  const t = split(remaining ?? 0);
  const cells: Array<[number, string]> = [
    [t.d, 'Days'],
    [t.h, 'Hours'],
    [t.m, 'Minutes'],
    [t.s, 'Seconds'],
  ];

  return (
    <div className={className}>
      <div className="grid grid-cols-4 gap-2 sm:gap-3" role="timer" aria-live="off">
        {cells.map(([value, name]) => (
          <div
            key={name}
            className={`rounded-xl border-2 px-1 py-3 text-center shadow-sm sm:rounded-2xl sm:py-4 ${cell}`}
          >
            <span className="font-display block text-2xl font-black tabular-nums sm:text-4xl">
              {remaining === null ? '--' : String(value).padStart(2, '0')}
            </span>
            <span className={`mt-0.5 block text-[10px] font-bold uppercase tracking-wider sm:text-xs ${label}`}>
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
