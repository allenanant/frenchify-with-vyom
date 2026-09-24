import { createHash } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import * as auth from '@/lib/roadmap/auth';
import * as db from '@/lib/roadmap/db';

export const dynamic = 'force-dynamic';

const DUMMY_HASH = '$2a$12$C6UzMDM.H6dfI/f/IKcEe.7oQ4Nq0BOhVvJZ0aTfLRy0oPPQFOa9K';

export async function POST(request: NextRequest) {
  const raw = await request.text();
  if (Buffer.byteLength(raw) > 4_000) {
    return NextResponse.json({ error: 'Request too large.' }, { status: 413 });
  }

  let body: Record<string, unknown> | null = null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') body = parsed;
  } catch {
    // Handled by the validation response below.
  }

  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase().slice(0, 180) : '';
  const password = typeof body?.password === 'string' ? body.password : '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || !password || auth.passwordBytes(password) > 72) {
    return NextResponse.json({ error: 'Enter a valid email and password.' }, { status: 400 });
  }

  try {
    const addressHash = await auth.roadmapIpHash();
    const emailHash = createHash('sha256').update(email).digest('hex').slice(0, 32);
    const pairKey = `pair|${addressHash}|${emailHash}`;
    const ipKey = `ip|${addressHash}`;

    if (!(await db.reserveIpAttempt(ipKey))) {
      return NextResponse.json({ error: 'Too many attempts from this connection. Try again in 15 minutes.' }, { status: 429 });
    }
    const lockedFor = await db.reserveLoginAttempt(pairKey);
    if (lockedFor > 0) {
      return NextResponse.json(
        { error: `Too many attempts. Try again in about ${Math.ceil(lockedFor / 60)} minutes.` },
        { status: 429 },
      );
    }

    const account = await db.getAccountByEmail(email);
    const valid = auth.verifyPassword(password, account?.password_hash || DUMMY_HASH);
    if (!account || !valid) {
      return NextResponse.json({ error: 'That email and password do not match.' }, { status: 401 });
    }

    await Promise.all([
      db.clearLoginAttempt(pairKey),
      db.releaseIpAttempt(ipKey),
      db.touchLogin(account.id),
    ]);
    await auth.startRoadmapSession(account.id);
    return NextResponse.json({ ok: true, roadmapHref: '/free-french-roadmap/' });
  } catch (error) {
    console.error('[roadmap-login]', error);
    return NextResponse.json({ error: 'Sign-in is temporarily unavailable. Please try again.' }, { status: 503 });
  }
}
