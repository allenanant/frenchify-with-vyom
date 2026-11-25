import { NextResponse } from 'next/server';
import { requireStaff } from '@/lib/tickets/auth';
import { reviewsFetch } from '@/lib/instructor-reviews/proxy';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { user, error } = await requireStaff({ admin: true });
  if (!user) {
    const status = error === 'Admins only.' ? 403 : 401;
    return NextResponse.json({ ok: false, error }, { status });
  }

  const id = Number((await ctx.params).id);
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ ok: false, error: 'Invalid review id.' }, { status: 400 });
  }

  try {
    const upstream = await reviewsFetch(`/api/test-reviews/${id}`, { method: 'DELETE' });
    const data = await upstream.json().catch(() => ({ ok: false }));
    return NextResponse.json(data, {
      status: upstream.ok ? 200 : 502,
      headers: { 'Cache-Control': 'private, no-store' },
    });
  } catch {
    return NextResponse.json({ ok: false, error: 'Could not delete test review.' }, { status: 502 });
  }
}
