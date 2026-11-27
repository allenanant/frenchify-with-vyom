'use client';

import Image from 'next/image';
import Script from 'next/script';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Countdown from '@/components/webinar/Countdown';
import FunnelFooter from '@/components/webinar/FunnelFooter';
import { WebinarDateBadge } from '@/components/webinar/FunnelShell';
import { Label } from '@/components/webinar/ui';
import { PIXEL_ID } from '@/components/webinar/WebinarPixel';
import { QUIZ_QUESTIONS, quizSequence, type QuizAnswerIndexes } from '@/lib/webinar-quiz';

/**
 * The quiz steps, then the GHL webinar form as the last step. Mobile first:
 * about 90% of the ad clicks open on a phone, mostly inside the Instagram and
 * Facebook in-app browsers.
 *
 * - One question per screen. A tap on an answer moves to the next question on
 *   its own, so nobody has to scroll down to find a Next button. Back is at the
 *   top, next to the step count.
 * - The progress bar sticks to the top of the screen.
 * - Every step saves the answers to /api/webinar-quiz/ under a random token,
 *   so Vyom also sees the people who stop part way.
 * - The form is the real GHL iframe from /webinar-form/. When it reports a
 *   successful registration it posts "set-sticky-contacts" with the contact
 *   details to this page (GHL's own form_embed.js listens for the same
 *   message). We send those details and the token to /api/webinar-quiz/register/,
 *   which joins them to the quiz row and adds the answers to the GHL contact.
 * - Meta: the page view and GHL's own SubmitApplication event are unchanged.
 *   Three custom events mark quiz progress on the same pixel.
 */

const STORE_KEY = 'fwv-webinar-quiz-v1';
/** One stable object, so a re-render never touches the iframe GHL rebuilt. */
const FORM_BOX = { minHeight: 560 } as const;
const GHL_HOSTS = /(^|\.)(leadconnectorhq\.com|msgsndr\.com)$/;
/** Long enough to see the tick land, short enough to feel instant. */
const ADVANCE_MS = 260;
const LOGO = '/brand/frenchify-logo.webp';

type Stored = { token: string; answers: QuizAnswerIndexes; cur: number; onForm: boolean };

function newToken(): string {
  try {
    if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  } catch {}
  const b = new Uint8Array(16);
  crypto.getRandomValues(b);
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

function readStore(): Stored | null {
  try {
    const raw = window.sessionStorage.getItem(STORE_KEY);
    return raw ? (JSON.parse(raw) as Stored) : null;
  } catch {
    return null;
  }
}

function writeStore(s: Stored) {
  try {
    window.sessionStorage.setItem(STORE_KEY, JSON.stringify(s));
  } catch {}
}

function pixelEvent(name: string) {
  try {
    const fbq = (window as Window & { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq === 'function') fbq('trackSingleCustom', PIXEL_ID, name);
  } catch {}
}

function post(url: string, payload: unknown, beacon = false) {
  const body = JSON.stringify(payload);
  try {
    if (beacon && typeof navigator.sendBeacon === 'function') {
      if (navigator.sendBeacon(url, new Blob([body], { type: 'application/json' }))) return;
    }
  } catch {}
  fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body, keepalive: true }).catch(
    () => undefined
  );
}

/** First non-empty string among the keys. GHL's payload shape is not documented. */
function pick(src: Record<string, unknown>, ...keys: string[]): string {
  for (const k of keys) {
    const v = src[k];
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return '';
}

function scrollToTop() {
  try {
    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: still ? 'auto' : 'smooth' });
  } catch {}
}

export default function WebinarQuiz({
  formId,
  formSrc,
  tracking,
  displayDate,
  startsAt,
}: {
  formId: string;
  formSrc: string;
  tracking: Record<string, string>;
  displayDate: string;
  /** ISO start time, for the same countdown as /webinar-form/. */
  startsAt: string;
}) {
  const [token, setToken] = useState('');
  const [answers, setAnswers] = useState<QuizAnswerIndexes>({});
  const [cur, setCur] = useState(0);
  const [onForm, setOnForm] = useState(false);
  const started = useRef(false);
  const completed = useRef(false);
  const registered = useRef(false);
  const advancing = useRef(false);

  const sequence = useMemo(() => quizSequence(answers), [answers]);
  // Until the first goal is known, count the work permit question in. The
  // count can then only go down (PR goal), never jump up mid-quiz.
  const shownQuestions = answers.goal === undefined ? QUIZ_QUESTIONS.length : sequence.length;
  const total = shownQuestions + 1;
  const question = sequence[Math.min(cur, sequence.length - 1)];
  const selected = answers[question.id];

  // Restore a half-done quiz after a refresh. Done after hydration on purpose.
  useEffect(() => {
    const s = readStore();
    if (s?.token) {
      setToken(s.token);
      setAnswers(s.answers || {});
      setCur(Math.max(0, Math.min(s.cur || 0, quizSequence(s.answers || {}).length - 1)));
      if (s.onForm) setOnForm(true);
      started.current = Object.keys(s.answers || {}).length > 0;
      completed.current = Boolean(s.onForm);
    } else {
      setToken(newToken());
    }
  }, []);

  useEffect(() => {
    if (token) writeStore({ token, answers, cur, onForm });
  }, [token, answers, cur, onForm]);

  const save = useCallback(
    (next: QuizAnswerIndexes) => {
      if (!token) return;
      post('/api/webinar-quiz/', { token, answers: next, tracking });
    },
    [token, tracking]
  );

  // The GHL form tells its parent page about a successful registration.
  useEffect(() => {
    if (!token) return;
    const onMessage = (e: MessageEvent) => {
      let host = '';
      try {
        host = new URL(e.origin).hostname;
      } catch {
        return;
      }
      if (!GHL_HOSTS.test(host)) return;
      const d = e.data;
      if (!Array.isArray(d) || d[0] !== 'set-sticky-contacts' || d[1] !== '_ud' || typeof d[2] !== 'string') return;
      let u: Record<string, unknown> = {};
      try {
        u = JSON.parse(d[2]) as Record<string, unknown>;
      } catch {
        return;
      }
      const email = pick(u, 'email', 'Email');
      if (!email || registered.current) return;
      registered.current = true;
      let firstName = pick(u, 'first_name', 'firstName');
      let lastName = pick(u, 'last_name', 'lastName');
      if (!firstName) {
        const full = pick(u, 'full_name', 'fullName', 'name').split(/\s+/);
        firstName = full[0] || '';
        lastName = lastName || full.slice(1).join(' ');
      }
      const phone = pick(u, 'phone', 'phone_number', 'phoneNumber');
      post('/api/webinar-quiz/register/', { token, contact: { firstName, lastName, email, phone } }, true);
      pixelEvent('WebinarQuizRegistered');
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [token]);

  /** A tap selects the answer, shows it for a moment, then moves on. */
  const choose = (i: number) => {
    if (advancing.current) return;
    advancing.current = true;
    const next: QuizAnswerIndexes = { ...answers, [question.id]: i };
    // Changing the first goal can remove the work permit question.
    if (question.id === 'goal' && !(i === 0 || i === 2)) delete next.permit;
    setAnswers(next);
    save(next);
    if (!started.current) {
      started.current = true;
      pixelEvent('WebinarQuizStart');
    }
    const seqLen = quizSequence(next).length;
    window.setTimeout(() => {
      if (cur < seqLen - 1) {
        setCur(cur + 1);
      } else {
        setOnForm(true);
        if (!completed.current) {
          completed.current = true;
          pixelEvent('WebinarQuizComplete');
        }
      }
      scrollToTop();
      advancing.current = false;
    }, ADVANCE_MS);
  };

  const goBack = () => {
    if (onForm) {
      setOnForm(false);
    } else if (cur > 0) {
      setCur(cur - 1);
    }
    scrollToTop();
  };

  const step = onForm ? total : cur + 1;
  const pct = Math.round((step / total) * 100);
  const canGoBack = onForm || cur > 0;

  return (
    <div className={`flex min-h-[100svh] flex-col ${onForm ? 'bg-fnl-surface-alt' : 'bg-fnl-surface sm:bg-fnl-surface-alt'}`}>
      {/* Sticky progress on the quiz steps, so the visitor knows how close
          the end is without scrolling. The last step drops it, to match
          /webinar-form/ exactly; "Change my answers" sits under the card. */}
      {!onForm && (
      <header className="sticky top-0 z-30 border-b border-fnl-line bg-fnl-surface/95 backdrop-blur supports-[backdrop-filter]:bg-fnl-surface/85">
        <div className="mx-auto flex h-14 w-full max-w-[640px] items-center justify-between gap-3 px-4">
          <button
            type="button"
            onClick={goBack}
            aria-label="Back to the previous question"
            className={`-ml-2 flex h-11 min-w-[44px] items-center rounded-[10px] px-2 text-[15px] font-semibold text-fnl-mute transition-colors hover:text-fnl-ink ${
              canGoBack ? '' : 'invisible'
            }`}
          >
            &larr; Back
          </button>
          <Image src={LOGO} alt="Frenchify with Vyom" width={104} height={30} className="h-[30px] w-auto" priority />
          <span className="min-w-[44px] text-right text-[13px] font-semibold tabular-nums text-fnl-mute">
            {step}/{total}
          </span>
        </div>
        <div
          className="h-1.5 w-full bg-fnl-surface-alt"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          aria-label={onForm ? 'Last step' : `Question ${step} of ${total - 1}`}
        >
          <div
            className="h-full bg-fnl-primary transition-[width] duration-300 ease-out motion-reduce:transition-none"
            style={{ width: `${pct}%` }}
          />
        </div>
      </header>
      )}

      <main
        className={
          onForm
            ? // FunnelShell's main around its 640px card.
              'relative mx-auto w-full max-w-[680px] flex-1 px-5 py-10 sm:py-14'
            : 'relative mx-auto w-full max-w-[640px] flex-1 px-4 pb-10 pt-5 sm:my-10 sm:flex-none sm:rounded-[14px] sm:border sm:border-fnl-line sm:bg-fnl-surface sm:px-10 sm:pb-12 sm:pt-10'
        }
      >
        {!onForm && (
          <div>
            {cur === 0 && (
              <div className="mb-6">
                <Label>Free live workshop with Vyom</Label>
                <h1 className="mt-2 font-display text-[25px] font-extrabold leading-[1.12] tracking-[-0.015em] text-fnl-ink sm:text-[34px]">
                  Get your French plan for Canada PR
                </h1>
                <p className="mt-2.5 text-[16px] leading-[1.55] text-fnl-body sm:text-[17px]">
                  Answer a few short questions. Then save your free seat in the live workshop. It takes about 1 minute.
                </p>
              </div>
            )}

            <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-fnl-primary">
              Question {cur + 1}
            </p>
            <h2
              id="wq-question"
              className="mt-1 font-display text-[20px] font-extrabold leading-[1.22] text-fnl-ink sm:text-[24px]"
            >
              {question.q}
            </h2>
            <p className="mt-1 text-[14px] leading-[1.45] text-fnl-mute sm:text-[15px]">{question.hint}</p>

            <div role="radiogroup" aria-labelledby="wq-question" className="mt-3.5 grid gap-2">
              {question.options.map((label, i) => {
                const on = selected === i;
                return (
                  <button
                    key={`${question.id}-${i}`}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => choose(i)}
                    className={`flex min-h-[52px] w-full touch-manipulation select-none items-center gap-3 rounded-[12px] border-2 px-3.5 py-2.5 text-left text-[16px] leading-[1.35] transition-colors duration-[120ms] [-webkit-tap-highlight-color:transparent] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fnl-primary focus-visible:ring-offset-2 active:bg-fnl-surface-alt ${
                      on
                        ? 'border-fnl-primary bg-fnl-surface-alt font-semibold text-fnl-ink'
                        : 'border-fnl-line bg-fnl-surface text-fnl-ink'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        on ? 'border-fnl-primary bg-fnl-primary' : 'border-fnl-mute/50 bg-fnl-surface'
                      }`}
                    >
                      {on && (
                        <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
                          <path d="M2.5 6.2l2.2 2.2 4.8-4.9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* The form is in the page from the first load, out of sight, and
            only moves into view at the last step. This is on purpose:
            form_embed.js rebuilds the iframe when it starts. If the iframe
            mounts later than the script, the form loads twice and GHL
            sometimes answers the second load with an error page (seen in
            testing, 27 Nov 2026). Loading both at page start matches
            /webinar-form/, and the last step then opens with no wait.
            h-0 + overflow-hidden keeps the hidden form from adding page
            height; it still lays out at the real width, so GHL sizes it right. */}
        {/* The last step is a copy of /webinar-form/ (FunnelShell card, same
            logo, heading, sentence, date box, form box, note and countdown),
            so it looks exactly like the main Sunday / Black Friday funnel
            (Allen, 27 Nov). Only classes change between hidden and shown:
            a new wrapper element here would remount the iframe. */}
        <div
          className={
            onForm
              ? 'w-full rounded-[14px] border border-fnl-line bg-fnl-surface p-7 text-center sm:p-11'
              : 'pointer-events-none absolute inset-x-5 top-0 h-0 overflow-hidden p-7 opacity-0'
          }
          aria-hidden={!onForm}
          inert={!onForm}
        >
          <Image
            src={LOGO}
            alt="Frenchify with Vyom"
            width={132}
            height={38}
            className="mx-auto mb-6 h-[38px] w-auto"
          />
          <h2 className="font-display text-[26px] font-extrabold leading-[1.1] tracking-[-0.015em] text-fnl-ink sm:text-[34px]">
            You&apos;re Almost In!
          </h2>
          <p className="mt-3 text-[17px] leading-[1.55] text-fnl-body">
            Confirm your details below to secure your spot for this exclusive Canadian PR workshop.
          </p>

          <WebinarDateBadge date={displayDate} />

          {/* Same embed as /webinar-form/: same form, same data attributes, and
              the reserved height on the wrapper so nothing below it jumps.
              form_embed.js sizes the iframe to the full form height, so the
              form has no scrollbar of its own. */}
          <div className="rounded-[10px] border border-fnl-line bg-fnl-surface" style={FORM_BOX}>
            <iframe
              src={formSrc}
              id={`inline-${formId}`}
              title="Webinar Registration form"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Webinar Registration form"
              data-height="411"
              data-layout-iframe-id={`inline-${formId}`}
              data-form-id={formId}
              className="w-full rounded-[10px] border-0"
              style={FORM_BOX}
            />
            <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
          </div>

          <p className="mt-5 text-[14px] leading-[1.5] text-fnl-mute">
            Your details go straight to Frenchify with Vyom. No spam, and you can leave the WhatsApp group any time.
          </p>

          <Countdown targetIso={startsAt} expiredLabel="The workshop is starting" className="mt-7" />
        </div>

        {onForm && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={goBack}
              className="rounded-[10px] px-3 py-2.5 text-[15px] font-semibold text-fnl-mute transition-colors hover:text-fnl-ink"
            >
              &larr; Change my answers
            </button>
          </div>
        )}
      </main>

      <FunnelFooter className="border-t-0 bg-transparent" />
    </div>
  );
}
