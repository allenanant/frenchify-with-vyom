'use client';

import Image from 'next/image';
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type RefObject,
} from 'react';
import { ArrowUpRight, ChevronDown, Clock } from 'lucide-react';
import { cn } from '@/lib/cn';
import GhlBookingCalendar from './GhlBookingCalendar';

export type BookingSession = {
  /** Full GHL widget URL */
  src: string;
  label: string;
  /** Minutes, as configured on the calendar itself */
  duration: number;
  /** Amount the calendar charges. GHL stays the source of truth at checkout. */
  price?: string;
  note?: string;
};

// Below this width each mentor is a dropdown and only loads its calendar when
// opened. From here up the card is always open and the calendars sit side by
// side, which needs the room.
const DESKTOP = '(min-width: 1024px)';

function subscribeDesktop(onChange: () => void) {
  const mq = window.matchMedia(DESKTOP);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

function useIsDesktop() {
  return useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP).matches,
    () => false,
  );
}

// On desktop every calendar is in the page, so they load as the reader gets
// near them. The short dwell stops a jump from the mentor list loading every
// calendar it scrolls past on the way.
function useNearViewport(ref: RefObject<HTMLElement | null>) {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    let timer: number | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        window.clearTimeout(timer);
        if (entry.isIntersecting) timer = window.setTimeout(() => setNear(true), 400);
      },
      { rootMargin: '600px 0px' },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, [ref, near]);
  return near;
}

const priceValue = (price?: string) => Number(price?.replace(/[^0-9.]/g, '')) || Infinity;

export default function MentorBookingCard({
  id,
  name,
  photo,
  tagline,
  sessions,
  children,
}: {
  /** Anchor for the mentor list and the line-up links */
  id: string;
  name: string;
  photo: string;
  /** Short line under the name, shown on the closed dropdown too */
  tagline?: ReactNode;
  sessions: BookingSession[];
  /** Badges and blurb */
  children?: ReactNode;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const panelId = `${useId().replace(/[^a-zA-Z0-9]/g, '')}-panel`;
  const isDesktop = useIsDesktop();
  const near = useNearViewport(cardRef);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  // Sessions opened on mobile at least once. They stay loaded after that.
  const [opened, setOpened] = useState<boolean[]>(() => sessions.map(() => false));

  useEffect(() => {
    if (!open) return;
    setOpened((prev) => (prev[selected] ? prev : prev.map((v, i) => v || i === selected)));
  }, [open, selected]);

  // Arriving on this mentor from a link (the line-up at the top of the page,
  // the mentor list, a shared URL) opens their dropdown on mobile.
  useEffect(() => {
    const openIfTargeted = () => {
      if (window.location.hash === `#${id}`) setOpen(true);
    };
    openIfTargeted();
    window.addEventListener('hashchange', openIfTargeted);
    return () => window.removeEventListener('hashchange', openIfTargeted);
  }, [id]);

  const multi = sessions.length > 1;
  const durations = sessions.map((s) => s.duration).join(' / ');
  const cheapest = sessions.reduce((a, b) => (priceValue(b.price) < priceValue(a.price) ? b : a));
  const summary = cheapest.price
    ? `${durations} min · ${multi ? 'from ' : ''}${cheapest.price}`
    : `${durations} min`;

  return (
    <article
      ref={cardRef}
      id={id}
      className="rounded-[20px] border border-brand-blue/[0.08] bg-white shadow-soft"
    >
      {/* Same header at every size. Under 1024px it is also the dropdown toggle. */}
      <div className="relative flex items-center gap-4 p-4 sm:p-5 lg:px-8 lg:pt-8 lg:pb-0">
        <Image
          src={photo}
          alt={name}
          width={160}
          height={160}
          className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 shrink-0 rounded-full object-cover border-4 border-blue-50 bg-gray-50"
        />
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg lg:text-xl font-bold text-gray-900 tracking-tight">
            {name}
          </h3>
          {tagline}
          <p className="lg:hidden mt-1.5 flex items-start gap-1.5 text-xs font-medium text-gray-500">
            <Clock className="mt-[3px] h-3 w-3 shrink-0" aria-hidden />
            {summary}
          </p>
        </div>
        <span
          aria-hidden
          className={cn(
            'lg:hidden flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300',
            open ? 'bg-brand-blue text-white' : 'bg-blue-50 text-brand-blue',
          )}
        >
          <ChevronDown
            className={cn(
              'h-5 w-5 transition-transform duration-300 motion-reduce:transition-none',
              open && 'rotate-180',
            )}
          />
        </span>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panelId}
          className="lg:hidden absolute inset-0 w-full rounded-[20px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          <span className="sr-only">
            {open ? 'Hide' : 'Show'} {name}&apos;s booking calendar
          </span>
        </button>
      </div>

      {/* Closed under 1024px, always open above. grid-rows animates the height
          without unmounting, so a booking in progress survives a collapse. */}
      <div
        id={panelId}
        className={cn(
          'grid transition-[grid-template-rows,visibility] duration-300 ease-out motion-reduce:transition-none',
          open ? 'grid-rows-[1fr] visible' : 'grid-rows-[0fr] invisible',
          'lg:grid-rows-[1fr] lg:visible',
        )}
      >
        <div className="min-h-0 overflow-clip">
          <div className="px-4 pb-4 sm:px-5 sm:pb-5 lg:px-8 lg:pb-8">
            {children && <div className="lg:pl-24">{children}</div>}

            {multi && (
              <div
                role="group"
                aria-label="Session length"
                className="lg:hidden mt-4 grid grid-cols-2 gap-1 rounded-xl bg-gray-100 p-1"
              >
                {sessions.map((s, i) => (
                  <button
                    key={s.src}
                    type="button"
                    onClick={() => setSelected(i)}
                    aria-pressed={i === selected}
                    className={cn(
                      'min-w-0 rounded-lg px-2 py-2.5 text-center transition-colors duration-200',
                      i === selected
                        ? 'bg-white text-brand-blue shadow-sm'
                        : 'text-gray-600 hover:text-gray-900',
                    )}
                  >
                    <span className="block text-sm font-semibold">{s.duration} min</span>
                    {s.price && <span className="block text-xs font-medium opacity-80">{s.price}</span>}
                  </button>
                ))}
              </div>
            )}

            <div className={cn('mt-4 lg:mt-6 grid gap-4 lg:gap-5', multi && 'lg:grid-cols-2')}>
              {sessions.map((s, i) => (
                <div key={s.src} className={cn('min-w-0', multi && i !== selected && 'max-lg:hidden')}>
                  {/* On mobile the length toggle already says this. */}
                  <div
                    className={cn(
                      'mb-2.5 flex items-center justify-between gap-3',
                      multi && 'max-lg:hidden',
                    )}
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-900">{s.label}</p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-500">
                        <Clock className="h-3 w-3 shrink-0" aria-hidden />
                        {s.duration} min
                        {s.price && (
                          <>
                            <span aria-hidden>·</span>
                            <span className="font-semibold text-gray-700">{s.price}</span>
                          </>
                        )}
                      </p>
                    </div>
                    <a
                      href={s.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open in a new tab"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-blue-50 hover:text-brand-blue"
                    >
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                      <span className="sr-only">
                        Open {name} - {s.label} in a new tab
                      </span>
                    </a>
                  </div>
                  {s.note && <p className="mb-2.5 text-xs text-gray-500">{s.note}</p>}
                  <GhlBookingCalendar
                    src={s.src}
                    title={`${name} - ${s.label} booking calendar`}
                    active={isDesktop ? near : opened[i]}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
