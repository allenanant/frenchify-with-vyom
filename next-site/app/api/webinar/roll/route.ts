/**
 * The Monday morning job that used to be done by hand.
 *
 * On GoHighLevel every Monday meant: clone the funnel step, edit the custom
 * value, open the workflow and change "Set Event Start Time", then open the
 * countdown timer and change its end date. This moves the date on once, in the
 * one file all four of those now read from.
 *
 * Vercel Cron calls it Mondays at 04:30 UTC (10:00 IST) — see vercel.json, where
 * the path is written WITH a trailing slash. next.config sets trailingSlash, so
 * the bare /api/webinar/roll answers 308 and the cron would never reach this
 * handler. (vercel.json rejects unknown keys, so that note cannot live there.)
 * Nothing depends on it running: lib/webinar rolls the displayed date forward
 * on its own if this never fires. The commit only makes the file agree with
 * what visitors are already being shown.
 */

import { NextResponse } from 'next/server';
import { commitFiles } from '@/lib/content-admin/github';
import {
  SCHEDULE_REPO_PATH,
  formatWebinarDate,
  nextWebinarInstant,
  readSchedule,
  serializeSchedule,
} from '@/lib/webinar';

export const dynamic = 'force-dynamic';

/**
 * Vercel sends `Authorization: Bearer $CRON_SECRET` on scheduled invocations.
 * Without the env var set the route refuses rather than defaulting to open —
 * it can write to the repo, so an unauthenticated version of it is worse than
 * a broken one.
 */
function authorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return req.headers.get('authorization') === `Bearer ${secret}`;
}

async function roll(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  const schedule = readSchedule();
  const now = new Date();
  const current = new Date(schedule.startsAt);

  // Still ahead of us (or mid-session): nothing to do. Keeps a retry, a manual
  // curl or a doubled-up cron from marching the date a week into the future.
  if (current.getTime() + 90 * 60_000 > now.getTime()) {
    return NextResponse.json({
      ok: true,
      rolled: false,
      reason: 'current webinar has not finished',
      startsAt: schedule.startsAt,
    });
  }

  const next = nextWebinarInstant(schedule, now);
  const updated = {
    ...schedule,
    startsAt: next.toISOString(),
    updatedAt: now.toISOString(),
    // joinUrlFor no longer matches, so last week's WebinarJam room stops being
    // served the moment the date moves. Vyom's new link goes in via /admin.
  };

  try {
    await commitFiles({
      message: `Webinar: roll to ${formatWebinarDate(next)}`,
      files: [{ path: SCHEDULE_REPO_PATH, content: serializeSchedule(updated) }],
    });
  } catch (e) {
    console.error('[webinar-roll]', e);
    return NextResponse.json({ ok: false, error: 'commit failed' }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    rolled: true,
    startsAt: updated.startsAt,
    displayDate: formatWebinarDate(next),
    joinUrlCleared: Boolean(schedule.joinUrl),
  });
}

export async function GET(req: Request) {
  return roll(req);
}

export async function POST(req: Request) {
  return roll(req);
}
