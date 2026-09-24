import { NextResponse } from 'next/server';
import { endRoadmapSession } from '@/lib/roadmap/auth';

export const dynamic = 'force-dynamic';

export async function POST() {
  await endRoadmapSession().catch(() => undefined);
  return NextResponse.json({ ok: true });
}
