'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ArrowUpRight, CalendarDays } from 'lucide-react';
import { cn } from '@/lib/cn';

// A GoHighLevel booking widget, embedded in the page and sized to its content.
//
// The widget talks to the page that embeds it in two ways:
// - iframe-resizer v4. The widget ships the child half and announces itself
//   with "[iFrameResizerChild]Ready". Once the page answers with the init
//   message below, it reports its height on every change. That is what keeps
//   the later steps (time slots, the details form, payment, confirmation)
//   from being clipped - each one is a different height from the calendar.
// - ["highlevel.setHeight", { height }], sent once on load and never again,
//   so it only fills in until iframe-resizer reports.
//
// GHL's own form_embed.js does the same handshakes, but it also hides every
// iframe until an "iframeLoaded" message that the newer /widget/bookings/<slug>
// calendars never send, which left half the calendars on these pages
// invisible. Doing the handshakes here keeps that script off the page.

const RESIZER = '[iFrameSizer]';
// The settings GHL's form_embed.js sends: height only, "offset" measurement.
const resizerInit = (id: string) =>
  `${RESIZER}${id}:8:false:false:32:true:true:null:offset:null:null:0`;
// iframe-resizer message types that are not a new height. "init" is one too:
// it is measured before the widget has drawn anything and always says 700,
// so using it made every card shrink and then jump back a moment later.
const NOT_A_SIZE = new Set([
  'init',
  'close',
  'message',
  'autoResize',
  'pageInfo',
  'pageInfoStop',
  'parentInfo',
  'parentInfoStop',
  'inPageLink',
  'reset',
  'scrollTo',
]);
// The site header is fixed and 72px tall.
const HEADER_CLEARANCE = 96;
// From this width the widget puts the dates and the time slots side by side.
const WIDE_FROM = 740;
// Roughly what the widget measures in each layout, held while it loads.
const PLACEHOLDER = { narrow: 900, wide: 1020 };
// After this long without a single message from the widget, show whatever the
// frame holds and offer the booking page in a new tab as well. The frame's
// load event is no signal: it fires for an error page too (a blocker, a
// network failure), so only hearing from the widget counts as working.
const SILENT_AFTER_MS = 8000;

type Status = 'waiting' | 'loading' | 'ready' | 'silent';

export default function GhlBookingCalendar({
  src,
  title,
  active,
  className,
}: {
  /** Full widget URL, e.g. https://api.leadconnectorhq.com/widget/bookings/<slug> */
  src: string;
  /** Accessible name for the iframe */
  title: string;
  /** Load the widget. Once loaded it stays loaded, so a half-finished booking
   *  survives the card being collapsed. */
  active: boolean;
  className?: string;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const onLoadRef = useRef<(() => void) | undefined>(undefined);
  // Echoed back inside colon-separated messages, so it must not contain ":".
  const frameId = `ghl${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<Status>('waiting');
  const [wide, setWide] = useState(false);
  const placeholder = wide ? PLACEHOLDER.wide : PLACEHOLDER.narrow;
  const placeholderRef = useRef(placeholder);

  useEffect(() => {
    placeholderRef.current = placeholder;
  }, [placeholder]);

  useEffect(() => {
    if (active) setMounted(true);
  }, [active]);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const ro = new ResizeObserver(([entry]) => setWide(entry.contentRect.width >= WIDE_FROM));
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  // The widget scrolls the page to the top of each new step, and the only
  // thing that keeps that clear of the fixed header is scroll-padding on
  // <html> - Chrome ignores the iframe's own scroll-margin. globals.css turns
  // it on while this attribute is set. Counted, because a page has many.
  useEffect(() => {
    const html = document.documentElement;
    html.dataset.embeddedBooking = String(Number(html.dataset.embeddedBooking ?? 0) + 1);
    return () => {
      const left = Number(html.dataset.embeddedBooking ?? 1) - 1;
      if (left > 0) html.dataset.embeddedBooking = String(left);
      else delete html.dataset.embeddedBooking;
    };
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!mounted || !frame) return;

    // Set here rather than in JSX, so a re-render can never put it back over
    // the height the widget reported.
    frame.style.height = `${placeholderRef.current}px`;

    const origin = new URL(src).origin;
    let resizerReported = false;

    setStatus('loading');
    const silentTimer = window.setTimeout(
      () => setStatus((s) => (s === 'loading' ? 'silent' : s)),
      SILENT_AFTER_MS,
    );

    const send = (message: unknown) => frame.contentWindow?.postMessage(message, origin);
    const applyHeight = (px: number) => {
      if (!Number.isFinite(px) || px <= 0) return;
      frame.style.height = `${Math.ceil(px)}px`;
      setStatus('ready');
    };

    onLoadRef.current = () => send(resizerInit(frameId));

    const onMessage = (e: MessageEvent) => {
      if (e.source !== frame.contentWindow || e.origin !== origin) return;
      const data = e.data;

      if (typeof data === 'string') {
        if (data === '[iFrameResizerChild]Ready') {
          send(resizerInit(frameId));
          return;
        }
        if (!data.startsWith(`${RESIZER}${frameId}:`)) return;
        const [, height, , type] = data.slice(RESIZER.length).split(':');
        const px = Number(height);
        if (type === 'scrollToOffset') {
          const top = frame.getBoundingClientRect().top + window.scrollY + px - HEADER_CLEARANCE;
          window.scrollTo({ top, behavior: 'smooth' });
          return;
        }
        if (NOT_A_SIZE.has(type)) return;
        resizerReported = true;
        applyHeight(px);
        return;
      }

      if (!Array.isArray(data)) return;
      if (data[0] === 'highlevel.setHeight') {
        if (!resizerReported) applyHeight(Number(data[1]?.height));
        return;
      }
      // The widget asks for the page's URL and query string so GHL can record
      // where the booking came from (UTM tags included), same as form_embed.js.
      if (data[0] === 'fetch-query-params') {
        const params = Object.fromEntries(new URLSearchParams(window.location.search));
        send([
          'query-params',
          params,
          window.location.href,
          document.referrer,
          frameId,
          { consent: null, isConsentExpected: false },
        ]);
      }
    };

    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
      onLoadRef.current = undefined;
      window.clearTimeout(silentTimer);
    };
  }, [mounted, src, frameId]);

  const ready = status === 'ready';
  const showFrame = ready || status === 'silent';

  return (
    // No overflow-hidden here: it would make this box a scroll container in
    // the path of the widget's scroll-to-the-new-step. Nothing needs clipping
    // anyway - the widget draws its own rounded card.
    <div
      ref={boxRef}
      className={cn(
        'relative rounded-2xl border border-gray-200/80 bg-white transition-colors duration-500',
        // The widget draws its own bordered card, so this border only frames
        // the loading state. Left on, it doubles the widget's edge.
        ready && 'border-transparent',
        className,
      )}
      style={ready ? undefined : { minHeight: placeholder }}
    >
      {status === 'silent' && (
        <p
          role="status"
          className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-t-2xl border-b border-gray-200/80 bg-blue-50/60 px-4 py-3 text-center text-sm text-gray-700"
        >
          Calendar not showing?
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-brand-blue hover:underline"
          >
            Open it in a new tab
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </p>
      )}

      {mounted && (
        <iframe
          ref={frameRef}
          src={src}
          title={title}
          allow="payment"
          onLoad={() => onLoadRef.current?.()}
          className={cn(
            'block w-full border-0 transition-opacity duration-500',
            showFrame ? 'opacity-100' : 'opacity-0',
          )}
        />
      )}

      {/* Near the top, not centred: the box is ~900px tall, so a centred
          spinner sits below the fold on a phone. */}
      {!showFrame && (
        <div className="absolute inset-x-0 top-0 flex flex-col items-center gap-3 px-6 pt-24 text-center">
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-brand-blue">
            <CalendarDays className="h-5 w-5" aria-hidden />
            <span
              className="absolute inset-0 rounded-full border-2 border-brand-blue/25 border-t-brand-blue animate-spin motion-reduce:animate-none"
              aria-hidden
            />
          </span>
          <p className="text-sm font-medium text-gray-700">Loading available times…</p>
        </div>
      )}
    </div>
  );
}
