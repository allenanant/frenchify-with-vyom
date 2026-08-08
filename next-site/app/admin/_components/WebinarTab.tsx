'use client';

import { useState } from 'react';
import { AlertTriangle, CalendarClock, Link2, Loader2 } from 'lucide-react';
import { publishWebinarSchedule } from '@/lib/content-admin/actions';
import type { Banner } from './AdminShell';

export type WebinarAdminState = {
  date: string;
  time: string;
  joinUrl: string;
  autoRoll: boolean;
  displayDate: string;
  slug: string;
  linkIsCurrent: boolean;
};

type Props = {
  initial: WebinarAdminState;
  onDone: (text: string) => void;
  onError: (text: string) => void;
};

const field =
  'w-full rounded-xl border border-gray-300 px-3.5 py-3 text-[15px] text-brand-ink outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20';
const label = 'mb-1.5 block text-sm font-semibold text-gray-700';

export default function WebinarTab({ initial, onDone, onError }: Props) {
  const [date, setDate] = useState(initial.date);
  const [time, setTime] = useState(initial.time);
  const [joinUrl, setJoinUrl] = useState(initial.joinUrl);
  const [autoRoll, setAutoRoll] = useState(initial.autoRoll);
  const [busy, setBusy] = useState(false);

  const save = async () => {
    setBusy(true);
    try {
      const res = await publishWebinarSchedule({ date, time, joinUrl, autoRoll });
      if (res.ok) onDone(res.detail ?? 'Webinar updated.');
      else onError(res.error);
    } catch {
      onError('Could not save. Try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
        <div className="mb-1 flex items-center gap-2">
          <CalendarClock className="h-5 w-5 text-brand-blue" />
          <h2 className="font-display text-lg font-bold text-brand-ink">This Sunday&apos;s webinar</h2>
        </div>
        <p className="mb-5 text-sm text-gray-600">
          Changing this updates the landing page, the registration page, the thank you page, the waiting room and
          every countdown at once. Times are Montreal time, the same as the webinar.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="webinar-date">
              Date
            </label>
            <input
              id="webinar-date"
              type="date"
              className={field}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label className={label} htmlFor="webinar-time">
              Start time (Montreal)
            </label>
            <input
              id="webinar-time"
              type="time"
              className={field}
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>

        <p className="mt-4 rounded-xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-900">
          Currently showing on the site: <span className="font-bold">{initial.displayDate}</span>
          <br />
          <span className="text-blue-700">
            Ad link for this week: <code className="font-mono">/webinar/{initial.slug}</code>
          </span>
        </p>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
        <div className="mb-1 flex items-center gap-2">
          <Link2 className="h-5 w-5 text-brand-blue" />
          <h2 className="font-display text-lg font-bold text-brand-ink">WebinarJam room link</h2>
        </div>
        <p className="mb-4 text-sm text-gray-600">
          The link Vyom sends on Saturday evening. When the countdown hits zero, everyone sitting in the waiting room
          is sent here automatically.
        </p>
        <input
          type="url"
          inputMode="url"
          className={field}
          placeholder="https://event.webinarjam.com/..."
          value={joinUrl}
          onChange={(e) => setJoinUrl(e.target.value)}
        />

        {!initial.linkIsCurrent && (
          <p className="mt-3 flex items-start gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              No link is set for this webinar yet. Until one is added, the waiting room asks people to hold instead
              of sending them anywhere — which is on purpose, so nobody lands in last week&apos;s empty room.
            </span>
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-brand-blue"
            checked={autoRoll}
            onChange={(e) => setAutoRoll(e.target.checked)}
          />
          <span>
            <span className="block text-[15px] font-semibold text-brand-ink">
              Move to next week automatically
            </span>
            <span className="block text-sm text-gray-600">
              Once a webinar has finished, the pages jump to the same day and time next week on their own. Leave this
              on unless you are pausing the Sunday webinars.
            </span>
          </span>
        </label>
      </section>

      <button
        onClick={save}
        disabled={busy}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-5 py-3.5 text-[15px] font-semibold text-white shadow-premium transition hover:bg-brand-blue-deep disabled:opacity-60"
      >
        {busy && <Loader2 className="h-4 w-4 animate-spin" />}
        {busy ? 'Publishing…' : 'Publish webinar details'}
      </button>
      <p className="text-center text-xs text-gray-500">Changes go live in about 2 minutes.</p>
    </div>
  );
}
