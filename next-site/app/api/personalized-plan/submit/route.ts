import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import { getRecommendedFrenchPlan } from '@/lib/french-plan';
import {
  MARKETING_CONSENT_COPY,
  MARKETING_CONSENT_VERSION,
} from '@/lib/roadmap/constants';
import * as auth from '@/lib/roadmap/auth';
import * as db from '@/lib/roadmap/db';
import { syncPendingRoadmapAccount } from '@/lib/roadmap/crm';
import { validateRoadmapSubmission } from '@/lib/roadmap/validation';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  const raw = await request.text();
  if (Buffer.byteLength(raw) > 24_000) {
    return NextResponse.json({ error: 'Request too large.' }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    body = null;
  }
  if (body && typeof body === 'object' && 'website' in body && (body as { website?: unknown }).website) {
    return NextResponse.json({ error: 'Submission blocked.' }, { status: 400 });
  }

  const validated = validateRoadmapSubmission(body);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const input = validated.value;
  const recommendation = getRecommendedFrenchPlan(input.answers);

  try {
    const consent = {
      version: MARKETING_CONSENT_VERSION,
      text: MARKETING_CONSENT_COPY,
      ipHash: await auth.roadmapIpHash(),
    };
    if (!(await db.reserveIpAttempt(`submit|${consent.ipHash}`, 20))) {
      return NextResponse.json(
        { error: 'Too many plan requests from this connection. Please wait 15 minutes and try again.' },
        { status: 429 },
      );
    }

    let account = await db.getAccountByEmail(input.email);
    let created = false;

    if (!account) {
      account = await db.createAccount(
        input,
        auth.hashPassword(input.password),
        recommendation,
        consent,
      );
      created = Boolean(account);
      // A simultaneous request may have won the unique email constraint.
      if (!account) account = await db.getAccountByEmail(input.email);
    }

    const emailHash = createHash('sha256').update(input.email).digest('hex').slice(0, 32);
    const accountAttemptKey = `submit-pair|${consent.ipHash}|${emailHash}`;
    if (!created && (await db.reserveLoginAttempt(accountAttemptKey)) > 0) {
      return NextResponse.json(
        { error: 'Too many password attempts for this roadmap account. Please wait 15 minutes.' },
        { status: 429 },
      );
    }
    if (!account || (!created && !auth.verifyPassword(input.password, account.password_hash))) {
      return NextResponse.json(
        { error: 'A roadmap account already uses this email. Enter its password or use the returning-student sign-in.' },
        { status: 409 },
      );
    }
    if (!created) await db.clearLoginAttempt(accountAttemptKey);

    if (!created) {
      account = await db.updateAccountPlan(account.id, input, recommendation, consent);
    }
    if (!account) throw new Error('Roadmap account could not be saved.');

    await auth.startRoadmapSession(account.id);
    const crm = await syncPendingRoadmapAccount(account.id);

    return NextResponse.json({
      ok: true,
      recommendation,
      roadmapHref: '/free-french-roadmap/',
      crmStatus: crm.status,
    });
  } catch (error) {
    console.error('[personalized-plan-submit]', error);
    return NextResponse.json(
      { error: 'We could not save your plan just now. Please try again in a moment.' },
      { status: 503 },
    );
  }
}
