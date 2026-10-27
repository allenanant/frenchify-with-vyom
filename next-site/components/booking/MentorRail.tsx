'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

export type RailMentor = { id: string; name: string; photo: string };

// Desktop-only list of every mentor on the page, pinned beside the booking
// cards. Clicking a name scrolls to that mentor's card, and the card being
// read is highlighted as the page scrolls. Photos only between 1024 and
// 1280px, where there is no room for names.
export default function MentorRail({
  mentors,
  label = 'Jump to a mentor',
}: {
  mentors: RailMentor[];
  label?: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  // While a click is scrolling the page, ignore the cards it passes.
  const holdUntil = useRef(0);

  useEffect(() => {
    const cards = mentors
      .map((m) => document.getElementById(m.id))
      .filter((el): el is HTMLElement => el !== null);
    if (cards.length === 0) return;

    // A thin band a third of the way down the screen. Whichever card crosses
    // it is the one being read.
    const io = new IntersectionObserver(
      (entries) => {
        if (performance.now() < holdUntil.current) return;
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: '-33% 0px -62% 0px' },
    );
    cards.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [mentors]);

  return (
    <aside className="hidden lg:block">
      <nav
        aria-label={label}
        className="sticky top-24 max-h-[calc(100vh-13rem)] overflow-y-auto overscroll-contain rounded-[20px] border border-brand-blue/[0.08] bg-white p-2 shadow-soft xl:p-3"
      >
        <p className="hidden px-2 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400 xl:block">
          {label}
        </p>
        <ul className="space-y-1">
          {mentors.map((m) => {
            const isActive = active === m.id;
            return (
              <li key={m.id}>
                <a
                  href={`#${m.id}`}
                  title={m.name}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={() => {
                    setActive(m.id);
                    holdUntil.current = performance.now() + 1200;
                  }}
                  className={cn(
                    'group flex items-center justify-center gap-3 rounded-xl p-1.5 transition-colors duration-200 xl:justify-start xl:px-2',
                    isActive
                      ? 'bg-blue-50 text-brand-blue'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
                  )}
                >
                  <Image
                    src={m.photo}
                    alt=""
                    width={80}
                    height={80}
                    className={cn(
                      'h-10 w-10 shrink-0 rounded-full bg-gray-50 object-cover ring-2 transition-shadow duration-200',
                      isActive ? 'ring-brand-blue' : 'ring-white group-hover:ring-blue-100',
                    )}
                  />
                  <span className="sr-only truncate text-sm font-medium xl:not-sr-only">
                    {m.name}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
