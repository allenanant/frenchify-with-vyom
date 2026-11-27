import { NextResponse } from 'next/server';
import { requireStaff } from '@/lib/tickets/auth';
import { listQuizRows, quizRowsAwaitingGhl } from '@/lib/webinar-quiz-db';
import { syncQuizRow } from '@/lib/webinar-quiz-crm';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

/**
 * The Quiz tab in Website Admin. Admins only, because the rows hold names,
 * emails and phone numbers. Each load also gives up to five rows that still
 * owe GHL their note one more try.
 */
export async function GET() {
  const { user, error } = await requireStaff({ admin: true });
  if (!user) {
    const status = error === 'Admins only.' ? 403 : 401;
    return NextResponse.json({ ok: false, error }, { status });
  }

  try {
    for (const id of await quizRowsAwaitingGhl(5)) {
      await syncQuizRow(id).catch(() => undefined);
    }
    const rows = await listQuizRows();
    return NextResponse.json(
      { ok: true, rows },
      { headers: { 'Cache-Control': 'private, no-store' } }
    );
  } catch (err) {
    console.error('[webinar-quiz] admin list', err instanceof Error ? err.message : err);
    return NextResponse.json({ ok: false, error: 'Could not load the quiz answers.' }, { status: 500 });
  }
}
