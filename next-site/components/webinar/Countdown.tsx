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
  // The last day is the only time this thing is allowed to change colour, and
  // `accent` is the only token licensed for it. It fails contrast on the navy
  // band, so there the digits stay white and the urgency is carried by the copy
  // next to the clock.
  const urgent = remaining !== null && remaining > 0 && remaining < 86_400_000;
  const cell = dark
    ? 'bg-white/5 border-white/20 text-white'
    : urgent
      ? 'bg-fnl-surface-alt border-fnl-accent/40 text-fnl-accent'
      : 'bg-fnl-surface-alt border-fnl-line text-fnl-ink';
  const label = dark ? 'text-white/60' : 'text-fnl-mute';

  if (expired) {
    return (
      <div className={className}>
        <div
          className={`rounded-[10px] border px-6 py-5 text-center ${
            dark ? 'border-white/20 bg-white/5' : 'border-fnl-line bg-fnl-surface-alt'
          }`}
        >
          <p
            className={`font-display text-xl font-extrabold tracking-[-0.015em] ${
              dark ? 'text-white' : 'text-fnl-success'
            }`}
          >
            {expiredLabel}
          </p>
          {joinUrl ? (
            <a
              href={joinUrl}
              className="mt-3 inline-block rounded-[10px] bg-fnl-success px-7 py-4 text-[16px] font-semibold leading-none text-white transition-colors duration-[120ms] hover:brightness-110"
            >
              Join the workshop now
            </a>
          ) : redirectOnExpiry ? (
            // Waiting room only. Everyone here registered and is waiting to be
            // let in, so "keep this page open" is a true statement.
            <p className={`mt-1 text-[15px] leading-[1.5] ${dark ? 'text-white/70' : 'text-fnl-body'}`}>
              Keep this page open, you&apos;ll be connected as soon as the host opens the room.
            </p>
          ) : (
            // Landing and registration pages. For the 90 minutes the workshop
            // is live this used to tell people who had never registered that
            // they would be connected shortly, which was never going to happen,
            // directly above buttons still offering them a seat. Send them to
            // the thing that can actually help instead.
            <p className={`mt-1 text-[15px] leading-[1.5] ${dark ? 'text-white/70' : 'text-fnl-body'}`}>
              Register now and we&apos;ll email you the link for the next session.
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
          <div key={name} className={`rounded-[10px] border px-1 py-3 text-center ${cell}`}>
            <span className="font-display block text-[26px] font-extrabold leading-[1.1] tabular-nums tracking-[-0.015em] sm:text-[32px]">
              {remaining === null ? '--' : String(value).padStart(2, '0')}
            </span>
            <span
              className={`mt-1 block text-[11px] font-semibold uppercase leading-[1.2] tracking-[0.08em] ${label}`}
            >
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
