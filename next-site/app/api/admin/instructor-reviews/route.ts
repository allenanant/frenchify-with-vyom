import { NextResponse } from 'next/server';
import { requireStaff } from '@/lib/tickets/auth';
import { pickFilterSearchParams, reviewsFetch } from '@/lib/instructor-reviews/proxy';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { user, error } = await requireStaff({ admin: true });
  if (!user) {
    const status = error === 'Admins only.' ? 403 : 401;
    return NextResponse.json({ ok: false, error }, { status });
  }

  try {
    const url = new URL(req.url);
    const qs = pickFilterSearchParams(url.searchParams);
    const upstream = await reviewsFetch(`/api/dashboard${qs ? `?${qs}` : ''}`);
    if (!upstream.ok) {
      return NextResponse.json(
        { ok: false, error: 'Could not load instructor reviews from the rating service.' },
        { status: upstream.status === 401 ? 502 : upstream.status }
      );
    }
    const data = await upstream.json();
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'private, no-store' },
    });
  } catch (err) {
    const missing = err instanceof Error && err.message === 'INSTRUCTOR_REVIEWS_KEY_MISSING';
    return NextResponse.json(
      {
        ok: false,
        error: missing
          ? 'Instructor Reviews key is not configured on the server yet. Tell Allen.'
          : 'Could not reach the Instructor Reviews service. Try again in a moment.',
      },
      { status: missing ? 503 : 502 }
    );
  }
}
