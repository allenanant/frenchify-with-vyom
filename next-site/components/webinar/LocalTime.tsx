'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

/**
 * Prints the workshop's start instant in the visitor's own timezone.
 *
 * The page states the time as "2:00 PM (Montreal Time, Eastern Time - GMT -4)"
 * everywhere, because that is what the schedule is set in. Most of this
 * audience is in India, where that instant is 11:30 PM the same evening — and
 * nothing on the page said so. Someone registering for what they read as an
 * afternoon session, on a Sunday, is a no-show at best and feels misled at
 * worst. This is the same data, not new copy.
 *
 * Renders nothing until mounted: the server has no idea what timezone the
 * visitor is in, so anything rendered there would be a hydration mismatch.
 * Renders nothing for visitors already on Eastern time, who would just be
 * reading the same clock twice.
 */

const EASTERN = new Set(['America/Toronto', 'America/Montreal', 'America/New_York', 'America/Detroit']);

export default function LocalTime({ iso, className }: { iso: string; className?: string }) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const at = new Date(iso);
    if (Number.isNaN(at.getTime())) return;

    let zone: string | undefined;
    try {
      zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return;
    }
    if (!zone || EASTERN.has(zone)) return;

    try {
      setLabel(
        new Intl.DateTimeFormat(undefined, {
          weekday: 'long',
          hour: 'numeric',
          minute: '2-digit',
          timeZoneName: 'short',
        }).format(at)
      );
    } catch {
      /* Nothing to add is better than a wrong time. */
    }
  }, [iso]);

  if (!label) return null;

  return (
    <p className={cn('text-[15px] leading-[1.5]', className)}>
      That is <span className="font-semibold">{label}</span> where you are.
    </p>
  );
}
