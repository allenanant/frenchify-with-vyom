/**
 * The Sunday webinar funnel's single source of truth.
 *
 * On GoHighLevel this was a custom value (`{{custom_values.webinar_date__25th_may}}`)
 * pasted into four pages, a workflow's "Set Event Start Time" action and a
 * countdown timer — four places to edit every Monday, and any one of them
 * could be missed. Here one JSON file feeds all of it.
 *
 * The date also heals itself: once a webinar is in the past, `autoRoll` moves
 * the displayed date to the next Sunday at the same wall-clock time. The weekly
 * cron (see app/api/webinar/roll) writes that forward so the file matches what
 * visitors see, but the site is already correct without it. A missed cron run
 * or a dark PC never shows a stale date.
 */

import 'server-only';
import fs from 'node:fs';
import path from 'node:path';

/** Vyom runs the webinar on Montreal time; every displayed date says so. */
export const WEBINAR_TZ = 'America/Toronto';

/** Repo-relative — the admin and the cron commit through the GitHub API. */
export const SCHEDULE_REPO_PATH = 'next-site/content/webinar/schedule.json';

/**
 * GoHighLevel form "Webinar Registration form". Lead capture stays on this
 * form deliberately: "Webinar seq. (sundays)" and every automation behind it
 * fire on a submission of this exact form ID, so embedding it means none of
 * that had to be rebuilt or re-pointed.
 */
export const GHL_WEBINAR_FORM_ID = '3APCQqdqGuJSH8iTWgS1';

const SCHEDULE_FILE = path.join(process.cwd(), 'content', 'webinar', 'schedule.json');

export type WebinarSchedule = {
  /** ISO instant with offset, e.g. 2026-08-09T14:00:00-04:00 */
  startsAt: string;
  /** WebinarJam room link. Vyom sends a fresh one every Saturday evening. */
  joinUrl: string;
  /** The `startsAt` that `joinUrl` belongs to, so last week's link can't leak. */
  joinUrlFor: string;
  autoRoll: boolean;
  /** 0 = Sunday. Wall-clock target used when rolling forward. */
  weekday: number;
  hour: number;
  minute: number;
  updatedAt: string;
};

export type Webinar = {
  startsAt: string;
  startsAtMs: number;
  /** "Sunday 9th August 2026 | 2:00 PM (Montreal Time, Eastern Time – GMT -4)" */
  displayDate: string;
  /** "Sunday, 9 August" — for tight spots like the countdown caption. */
  shortDate: string;
  /** "9aug2026" — the per-week ad URL, /webinar/9aug2026 */
  slug: string;
  /** Empty until Vyom sets this week's link; pages degrade instead of guessing. */
  joinUrl: string;
  /** True when the stored date had passed and this one was computed forward. */
  rolled: boolean;
};

const DEFAULTS: WebinarSchedule = {
  startsAt: '2026-08-09T14:00:00-04:00',
  joinUrl: '',
  joinUrlFor: '',
  autoRoll: true,
  weekday: 0,
  hour: 14,
  minute: 0,
  updatedAt: '',
};

/* ------------------------------------------------------------------ */
/* Time zone maths. Intl is the only thing here that knows about DST,  */
/* so everything routes through it rather than hard-coding -4 or -5.   */
/* ------------------------------------------------------------------ */

type Wall = { y: number; m: number; d: number; hh: number; mm: number; ss: number };

function wallClock(tz: string, at: Date): Wall {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(at);
  const p: Record<string, string> = {};
  for (const part of parts) p[part.type] = part.value;
  return {
    y: Number(p.year),
    m: Number(p.month),
    d: Number(p.day),
    // Intl can emit hour "24" for midnight under hour12:false.
    hh: Number(p.hour) % 24,
    mm: Number(p.minute),
    ss: Number(p.second),
  };
}

/** Milliseconds the zone is ahead of UTC at that instant (EDT = -4h). */
function offsetMs(tz: string, at: Date): number {
  const w = wallClock(tz, at);
  const asUtc = Date.UTC(w.y, w.m - 1, w.d, w.hh, w.mm, w.ss);
  return asUtc - (at.getTime() - at.getMilliseconds());
}

/** The instant at which the zone's clock reads this wall-clock time. */
function instantFor(tz: string, y: number, m: number, d: number, hh: number, mm: number): Date {
  const naive = Date.UTC(y, m - 1, d, hh, mm, 0);
  // First guess uses the offset at the naive instant; the second pass fixes
  // the case where that lands on the far side of a DST switch.
  let guess = new Date(naive - offsetMs(tz, new Date(naive)));
  guess = new Date(naive - offsetMs(tz, guess));
  return guess;
}

/** Next `weekday` at `hh:mm` in `tz`, strictly after `after`. */
function nextOccurrence(tz: string, weekday: number, hh: number, mm: number, after: Date): Date {
  const w = wallClock(tz, after);
  for (let i = 0; i < 15; i++) {
    // Plain UTC arithmetic on the calendar date only — no zone involved yet.
    const probe = new Date(Date.UTC(w.y, w.m - 1, w.d + i));
    if (probe.getUTCDay() !== weekday) continue;
    const candidate = instantFor(
      tz,
      probe.getUTCFullYear(),
      probe.getUTCMonth() + 1,
      probe.getUTCDate(),
      hh,
      mm
    );
    if (candidate.getTime() > after.getTime()) return candidate;
  }
  // Unreachable for a valid weekday; keeps the return type honest.
  return new Date(after.getTime() + 7 * 86400_000);
}

function ordinal(n: number): string {
  if (n % 100 >= 11 && n % 100 <= 13) return 'th';
  return ['th', 'st', 'nd', 'rd'][n % 10] ?? 'th';
}

function gmtLabel(tz: string, at: Date): string {
  const hours = offsetMs(tz, at) / 3_600_000;
  const sign = hours < 0 ? '-' : '+';
  const abs = Math.abs(hours);
  return `GMT ${sign}${Number.isInteger(abs) ? abs : abs.toFixed(1)}`;
}

/** Reproduces the wording Vyom's audience already sees on the GHL pages. */
export function formatWebinarDate(at: Date, tz: string = WEBINAR_TZ): string {
  const part = (opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('en-GB', { timeZone: tz, ...opts }).format(at);
  const day = Number(part({ day: 'numeric' }));
  const time = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(at);
  return (
    `${part({ weekday: 'long' })} ${day}${ordinal(day)} ${part({ month: 'long' })} ` +
    `${part({ year: 'numeric' })} | ${time} (Montreal Time, Eastern Time – ${gmtLabel(tz, at)})`
  );
}

export function formatWebinarShortDate(at: Date, tz: string = WEBINAR_TZ): string {
  const part = (opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('en-GB', { timeZone: tz, ...opts }).format(at);
  return `${part({ weekday: 'long' })}, ${Number(part({ day: 'numeric' }))} ${part({ month: 'long' })}`;
}

/** "9aug2026" — matches the shape of the old GHL per-week URLs. */
export function webinarSlug(at: Date, tz: string = WEBINAR_TZ): string {
  const part = (opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('en-GB', { timeZone: tz, ...opts }).format(at);
  // en-GB abbreviates September to "Sept"; trim to three so every slug has the
  // same shape as the GHL originals (2aug2026, 6sep2026).
  const month = part({ month: 'short' }).replace('.', '').toLowerCase().slice(0, 3);
  return `${Number(part({ day: 'numeric' }))}${month}${part({ year: 'numeric' })}`;
}

/* ------------------------------------------------------------------ */
/* Reading + resolving                                                 */
/* ------------------------------------------------------------------ */

export function readSchedule(): WebinarSchedule {
  try {
    const raw = JSON.parse(fs.readFileSync(SCHEDULE_FILE, 'utf-8'));
    return normalizeSchedule(raw);
  } catch {
    // A missing or unparseable file must not take the funnel down; the
    // defaults still resolve to a real upcoming Sunday.
    return { ...DEFAULTS };
  }
}

export function normalizeSchedule(raw: unknown): WebinarSchedule {
  const r = (raw ?? {}) as Partial<WebinarSchedule>;
  const startsAt =
    typeof r.startsAt === 'string' && !Number.isNaN(Date.parse(r.startsAt))
      ? r.startsAt
      : DEFAULTS.startsAt;
  const weekday = Number.isInteger(r.weekday) && r.weekday! >= 0 && r.weekday! <= 6 ? r.weekday! : DEFAULTS.weekday;
  const hour = Number.isInteger(r.hour) && r.hour! >= 0 && r.hour! <= 23 ? r.hour! : DEFAULTS.hour;
  const minute = Number.isInteger(r.minute) && r.minute! >= 0 && r.minute! <= 59 ? r.minute! : DEFAULTS.minute;
  return {
    startsAt,
    joinUrl: typeof r.joinUrl === 'string' ? r.joinUrl.trim() : '',
    joinUrlFor: typeof r.joinUrlFor === 'string' ? r.joinUrlFor : '',
    autoRoll: r.autoRoll !== false,
    weekday,
    hour,
    minute,
    updatedAt: typeof r.updatedAt === 'string' ? r.updatedAt : '',
  };
}

/**
 * What every page renders from. `now` is injectable so the cron and the tests
 * can ask "what would this look like at time X".
 */
export function resolveWebinar(schedule: WebinarSchedule, now: Date = new Date()): Webinar {
  const stored = new Date(schedule.startsAt);
  // A webinar stays "current" through its 90-minute run, so the waiting room
  // keeps redirecting late arrivals instead of jumping to next Sunday mid-session.
  const stillCurrent = stored.getTime() + 90 * 60_000 > now.getTime();

  let at = stored;
  let rolled = false;
  if (!stillCurrent && schedule.autoRoll) {
    at = nextOccurrence(WEBINAR_TZ, schedule.weekday, schedule.hour, schedule.minute, now);
    rolled = true;
  }

  const startsAt = at.toISOString();
  // The link is only served for the webinar it was set for; a rolled-forward
  // date therefore shows no link rather than last week's dead room.
  const linkIsCurrent =
    !!schedule.joinUrl &&
    !!schedule.joinUrlFor &&
    Math.abs(new Date(schedule.joinUrlFor).getTime() - at.getTime()) < 60_000;

  return {
    startsAt,
    startsAtMs: at.getTime(),
    displayDate: formatWebinarDate(at),
    shortDate: formatWebinarShortDate(at),
    slug: webinarSlug(at),
    joinUrl: linkIsCurrent ? schedule.joinUrl : '',
    rolled,
  };
}

/** The one call pages make. */
export function getWebinar(now: Date = new Date()): Webinar {
  return resolveWebinar(readSchedule(), now);
}

/** Next scheduled slot after a given instant — used by the weekly roll. */
export function nextWebinarInstant(schedule: WebinarSchedule, after: Date = new Date()): Date {
  return nextOccurrence(WEBINAR_TZ, schedule.weekday, schedule.hour, schedule.minute, after);
}

/**
 * Turn the date + time the admin form collects into a real instant. The form
 * shows Montreal wall-clock time because that is what Vyom and his students
 * think in, so "2:00 PM on 9 August" has to mean 2 PM there, not on whatever
 * machine happens to render it.
 */
export function webinarInstantFor(y: number, m: number, d: number, hh: number, mm: number): Date {
  return instantFor(WEBINAR_TZ, y, m, d, hh, mm);
}

/** Day of week (0 = Sunday) as read in the webinar's timezone. */
export function webinarWeekday(at: Date): number {
  const w = wallClock(WEBINAR_TZ, at);
  return new Date(Date.UTC(w.y, w.m - 1, w.d)).getUTCDay();
}

/** Local date + time strings for prefilling the admin form. */
export function webinarFormFields(at: Date): { date: string; time: string } {
  const w = wallClock(WEBINAR_TZ, at);
  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    date: `${w.y}-${pad(w.m)}-${pad(w.d)}`,
    time: `${pad(w.hh)}:${pad(w.mm)}`,
  };
}

export function serializeSchedule(s: WebinarSchedule): string {
  return `${JSON.stringify(s, null, 2)}\n`;
}
