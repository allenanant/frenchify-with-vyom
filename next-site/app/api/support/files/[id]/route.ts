/**
 * Serves a ticket screenshot to signed-in staff only.
 *
 * These images routinely contain a student's account details, so this route
 * never becomes public and is never cached by a shared cache.
 */

import { NextResponse } from 'next/server';
import { requireStaff } from '@/lib/tickets/auth';
import { getAttachmentData } from '@/lib/tickets/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { user } = await requireStaff();
  if (!user) return new NextResponse('Sign in required', { status: 401 });

  const id = Number((await ctx.params).id);
  if (!Number.isInteger(id) || id < 1) return new NextResponse('Not found', { status: 404 });

  const row = await getAttachmentData(id);
  if (!row) return new NextResponse('Not found', { status: 404 });

  const bytes: Buffer = Buffer.isBuffer(row.data) ? row.data : Buffer.from(row.data);
  const name = String(row.original_name || 'screenshot').replace(/[^\w.\-]/g, '_');

  return new NextResponse(new Uint8Array(bytes), {
    headers: {
      'Content-Type': row.mime || 'application/octet-stream',
      'Content-Length': String(bytes.length),
      'Content-Disposition': `inline; filename="${name}"`,
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
