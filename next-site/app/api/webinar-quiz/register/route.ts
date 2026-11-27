import { after, NextRequest, NextResponse } from 'next/server';
import { isQuizToken } from '@/lib/webinar-quiz';
import { markQuizRegistered } from '@/lib/webinar-quiz-db';
import { syncQuizRowWithWait } from '@/lib/webinar-quiz-crm';

/**
 * Called by the quiz page when the embedded GHL webinar form reports a
 * successful registration (its "set-sticky-contacts" message). It joins the
 * contact details to the quiz row, then puts the answers on the GHL contact
 * after the response has gone back.
 *
 * The GHL form itself already created the contact and started the webinar
 * automation before this runs. Nothing here creates or enrolls anyone.
 */

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 30;

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(request: NextRequest) {
  const raw = await request.text();
  if (Buffer.byteLength(raw) > 4_000) {
    return NextResponse.json({ ok: false, error: 'Request too large.' }, { status: 413 });
  }
  let body: { token?: unknown; contact?: Record<string, unknown> } | null = null;
  try {
    body = JSON.parse(raw);
  } catch {
    body = null;
  }
  if (!body || !isQuizToken(body.token) || !body.contact || typeof body.contact !== 'object') {
    return NextResponse.json({ ok: false, error: 'Bad request.' }, { status: 400 });
  }

  const c = body.contact;
  const contact = {
    firstName: str(c.firstName, 80),
    lastName: str(c.lastName, 80),
    email: str(c.email, 200).toLowerCase(),
    phone: str(c.phone, 40),
  };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact.email)) {
    return NextResponse.json({ ok: false, error: 'Bad email.' }, { status: 400 });
  }

  try {
    const id = await markQuizRegistered(body.token, contact);
    if (!id) return NextResponse.json({ ok: true, linked: false });
    after(async () => {
      await syncQuizRowWithWait(id).catch((error) =>
        console.error('[webinar-quiz] sync', error instanceof Error ? error.message : error)
      );
    });
    return NextResponse.json({ ok: true, linked: true });
  } catch (error) {
    console.error('[webinar-quiz] register', error instanceof Error ? error.message : error);
    return NextResponse.json({ ok: false, error: 'Could not save.' }, { status: 500 });
  }
}
