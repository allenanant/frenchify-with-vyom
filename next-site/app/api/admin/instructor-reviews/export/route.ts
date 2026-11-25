import { NextResponse } from 'next/server';
import { requireStaff } from '@/lib/tickets/auth';
import { pickFilterSearchParams, reviewsFetch } from '@/lib/instructor-reviews/proxy';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { user, error } = await requireStaff({ admin: true });
  if (!user) {
    const status = error === 'Admins only.' ? 403 : 401;
    return new NextResponse(error || 'Unauthorized', { status });
  }

  try {
    const url = new URL(req.url);
    const qs = pickFilterSearchParams(url.searchParams);
    const upstream = await reviewsFetch(`/api/export.csv${qs ? `?${qs}` : ''}`, {
      headers: { Accept: 'text/csv' },
    });
    if (!upstream.ok) {
      return new NextResponse('Could not export reviews CSV.', { status: 502 });
    }
    const bytes = await upstream.arrayBuffer();
    const disposition =
      upstream.headers.get('content-disposition') ||
      'attachment; filename="frenchify-instructor-reviews.csv"';

    return new NextResponse(bytes, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': disposition,
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch {
    return new NextResponse('Could not reach the Instructor Reviews service.', { status: 502 });
  }
}
