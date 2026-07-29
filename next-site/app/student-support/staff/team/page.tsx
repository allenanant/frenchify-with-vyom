import { redirect } from 'next/navigation';
import { currentUser } from '@/lib/tickets/auth';
import { listUsers, storageUsed, STORAGE_CEILING_BYTES } from '@/lib/tickets/db';
import { card, whenIst } from '../ui';
import TeamPanel from './TeamPanel';

export const dynamic = 'force-dynamic';

export default async function TeamPage() {
  const user = await currentUser();
  if (!user) redirect('/student-support/staff/login/');
  if (user.must_change) redirect('/student-support/staff/password/');
  if (user.role !== 'admin') redirect('/student-support/staff/');

  const [users, used] = await Promise.all([listUsers(), storageUsed()]);
  const pct = Math.min(100, Math.round((used / STORAGE_CEILING_BYTES) * 100));

  return (
    <>
      <h1 className="font-display text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Team access</h1>
      <p className="mt-1 text-[15px] text-gray-500">Who can sign in and work the ticket queue.</p>

      <TeamPanel
        users={users.map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
          active: u.active,
          lastLogin: u.last_login_at ? whenIst(u.last_login_at) : null,
          isMe: u.id === user.id,
        }))}
      />

      <section className={`${card} mt-5`}>
        <h2 className="text-lg font-extrabold text-gray-900">Screenshot storage</h2>
        <p className="mt-1 text-[15px] text-gray-600">
          {(used / 1024 / 1024).toFixed(1)} MB of {(STORAGE_CEILING_BYTES / 1024 / 1024).toFixed(0)} MB used ({pct}%).
        </p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
          <div
            className={`h-full rounded-full ${pct > 85 ? 'bg-red-500' : pct > 60 ? 'bg-amber-500' : 'bg-green-500'}`}
            style={{ width: `${Math.max(pct, 1)}%` }}
          />
        </div>
        <p className="mt-3 text-[13px] text-gray-500">
          Screenshots are compressed in the student&apos;s browser before upload, so this grows slowly. The cap keeps
          the whole system inside the free database plan. If it ever fills, the form tells students to email instead
          rather than losing anything.
        </p>
      </section>
    </>
  );
}
