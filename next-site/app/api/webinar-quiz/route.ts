import { NextRequest, NextResponse } from 'next/server';
import { cleanQuizAnswers, isQuizToken } from '@/lib/webinar-quiz';
import { saveQuizProgress } from '@/lib/webinar-quiz-db';
import { TRACKING_KEYS } from '@/lib/webinar-tracking';

/**
 * Saves the webinar quiz answers after every step. Public and unauthenticated
 * by design: it only ever writes the row that belongs to the browser's own
 * random token, and only answer indexes that exist in lib/webinar-quiz.ts.
 */

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function cleanTracking(input: unknown): Record<string, string> {
  const raw = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>;
  const out: Record<string, string> = {};
  for (const key of TRACKING_KEYS) {
    const v = raw[key];
    if (typeof v === 'string' && v.trim()) out[key] = v.trim().slice(0, 200);
  }
  return out;
}

export async function POST(request: NextRequest) {
  const raw = await request.text();
  if (Buffer.byteLength(raw) > 4_000) {
    return NextResponse.json({ ok: false, error: 'Request too large.' }, { status: 413 });
  }
  let body: { token?: unknown; answers?: unknown; tracking?: unknown } | null = null;
  try {
    body = JSON.parse(raw);
  } catch {
    body = null;
  }
  if (!body || !isQuizToken(body.token)) {
    return NextResponse.json({ ok: false, error: 'Bad request.' }, { status: 400 });
  }
  const answers = cleanQuizAnswers(body.answers);
  if (!Object.keys(answers.indexes).length) {
    return NextResponse.json({ ok: false, error: 'No answers.' }, { status: 400 });
  }
  try {
    await saveQuizProgress(body.token, answers, cleanTracking(body.tracking));
    return NextResponse.json({ ok: true, complete: answers.complete });
  } catch (error) {
    console.error('[webinar-quiz] save', error instanceof Error ? error.message : error);
    return NextResponse.json({ ok: false, error: 'Could not save.' }, { status: 500 });
  }
}
