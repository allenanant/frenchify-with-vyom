'use client';

import { Fragment, useEffect, useState } from 'react';

/**
 * The two live clocks on the Black Friday page: the short "Starts in 3 days,
 * 13 hours" line under the hero, and the big digits in the final section.
 *
 * Both start from `renderedAt`, the server's clock when it rendered the page,
 * so the first client render matches the server HTML exactly (no hydration
 * mismatch). The real clock takes over on mount. The page is cached for up
 * to 10 minutes, so that first value can be a little old; it corrects itself
 * the moment JavaScript runs.
 */

function split(ms: number) {
  const t = Math.max(0, Math.floor(ms / 1000));
  return {
    d: Math.floor(t / 86400),
    h: Math.floor((t % 86400) / 3600),
    m: Math.floor((t % 3600) / 60),
    s: t % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, '0');
const plural = (n: number, one: string) => `${n} ${one}${n === 1 ? '' : 's'}`;

function useNow(renderedAt: number, everyMs: number) {
  const [now, setNow] = useState(renderedAt);
  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), everyMs);
    return () => window.clearInterval(id);
  }, [everyMs]);
  return now;
}

/** "Starts in 3 days, 13 hours" or, once the session starts, "Live now". */
export function BfStartsIn({ targetIso, renderedAt }: { targetIso: string; renderedAt: number }) {
  const now = useNow(renderedAt, 30_000);
  const ms = Date.parse(targetIso) - now;
  if (ms <= 0) return <>Live now</>;
  const { d, h, m } = split(ms);
  const phrase = d > 0 ? `${plural(d, 'day')}, ${plural(h, 'hour')}` : `${plural(h, 'hour')}, ${plural(m, 'minute')}`;
  return <>Starts in {phrase}</>;
}

/** The big gold digits. A digit that changes drops in (see .bfp-tick). */
export function BfCountdownDigits({ targetIso, renderedAt }: { targetIso: string; renderedAt: number }) {
  const now = useNow(renderedAt, 1000);
  const ms = Date.parse(targetIso) - now;
  const { d, h, m, s } = split(ms);
  const units: [string, number][] = [
    ['days', d],
    ['hours', h],
    ['minutes', m],
    ['seconds', s],
  ];

  return (
    <>
      <p className="eyebrow">{ms > 0 ? 'Workshop starts in' : 'The workshop is live now'}</p>
      <div className="cd" role="timer" aria-live="off">
        {units.map(([label, value], i) => (
          <Fragment key={label}>
            {i > 0 && (
              <span className="cd-colon" aria-hidden="true">
                :
              </span>
            )}
            <div className="cd-unit">
              {/* The key makes React swap the span when the value changes,
                  which replays the drop-in animation. */}
              <span key={value} className="cd-num bfp-tick">
                {pad(value)}
              </span>
              <span className="cd-label">{label}</span>
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
}
