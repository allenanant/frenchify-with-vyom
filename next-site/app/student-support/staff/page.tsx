import Link from 'next/link';
import { redirect } from 'next/navigation';
import { currentUser } from '@/lib/tickets/auth';
import { listTickets, counts, purgeOccasionally, STATUS_LABELS, type Ticket } from '@/lib/tickets/db';
import { ago, card, pill } from './ui';
import { STATUS_CLASSES } from '@/lib/tickets/constants';

export const dynamic = 'force-dynamic';

const FILTERS = [
  { key: 'open', label: 'Open' },
  { key: 'new', label: 'New' },
  { key: 'in_progress', label: 'In progress' },
  { key: 'waiting_on_student', label: 'Waiting' },
  { key: 'resolved', label: 'Resolved' },
] as const;

export default async function QueuePage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string | string[]; q?: string | string[]; page?: string | string[] }>;
}) {
  const user = await currentUser();
  if (!user) redirect('/student-support/staff/login/');
  if (user.must_change) redirect('/student-support/staff/password/');

  const sp = await searchParams;
  const one = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v);
  const status = one(sp.status) || 'open';
  const q = (one(sp.q) || '').slice(0, 100);
  // Bounded and finite: `?page=1e309` becomes Infinity and Postgres rejects it.
  const raw = Number(one(sp.page));
  const page = Number.isFinite(raw) ? Math.min(Math.max(Math.trunc(raw) || 1, 1), 1000) : 1;
  const PER = 50;

  await purgeOccasionally();
  const [list, c] = await Promise.all([
    listTickets({ status, q, offset: (page - 1) * PER, limit: PER }),
    counts(),
  ]);
  const tickets = list.rows;

  return (
    <>
      <h1 className="font-display text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        Student tickets
      </h1>
      <p className="mt-1 text-[15px] text-gray-500">
        Everything students have raised through the support form.
      </p>

      {/* Filters double as counters. Scrolls sideways on a phone. */}
      <div className="-mx-4 mt-5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        <div className="flex min-w-max gap-2.5 sm:min-w-0 sm:flex-wrap">
          {FILTERS.map((f) => {
            const on = status === f.key;
            return (
              <Link
                key={f.key}
                href={`/student-support/staff?status=${f.key}${q ? `&q=${encodeURIComponent(q)}` : ''}`}
                className={`flex-1 rounded-2xl border bg-white px-4 py-3 transition sm:min-w-[7.5rem] ${
                  on ? 'border-brand-blue ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="block font-display text-2xl font-bold leading-tight text-gray-900">
                  {c[f.key] ?? 0}
                </span>
                <span className="block text-sm text-gray-500">{f.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className={`${card} mt-5`}>
        <form action="/student-support/staff" className="flex flex-col gap-2.5 sm:flex-row">
          <input type="hidden" name="status" value={status} />
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search name, email, phone, ticket number or text"
            className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-[16px] outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-200"
          />
          <div className="flex gap-2.5">
            <button
              type="submit"
              className="min-h-11 flex-1 rounded-xl bg-brand-blue px-5 text-[15px] font-semibold text-white sm:flex-none"
            >
              Search
            </button>
            {q && (
              <Link
                href={`/student-support/staff?status=${status}`}
                className="flex min-h-11 flex-1 items-center justify-center rounded-xl border border-gray-300 px-5 text-center text-[15px] text-gray-700 sm:flex-none"
              >
                Clear
              </Link>
            )}
          </div>
        </form>

        {tickets.length === 0 ? (
          <p className="py-10 text-center text-[15px] text-gray-500">
            Nothing here{q ? ' for that search' : ''}.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-gray-100">
            {tickets.map((t: Ticket) => (
              <li key={t.id}>
                <Link
                  href={`/student-support/staff/ticket/${t.id}`}
                  className="-mx-2 block rounded-xl px-2 py-3.5 transition hover:bg-gray-50"
                >
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                    <span className="font-mono text-[13px] font-semibold text-brand-blue">{t.ref}</span>
                    <span className={`${pill} ${STATUS_CLASSES[t.status]}`}>{STATUS_LABELS[t.status]}</span>
                    {t.priority === 'high' && <span className={`${pill} bg-red-100 text-red-800`}>High</span>}
                    <span className="ml-auto text-sm text-gray-400">{ago(t.created_at)}</span>
                  </div>

                  <p className="mt-1.5 font-semibold leading-snug text-gray-900 [overflow-wrap:anywhere]">{t.subject}</p>

                  <p className="mt-1 text-sm text-gray-500 [overflow-wrap:anywhere]">
                    {t.student_name} · {t.category}
                    {t.attachment_count ? ` · ${t.attachment_count} screenshot${t.attachment_count > 1 ? 's' : ''}` : ''}
                    {t.assignee_name ? ` · ${t.assignee_name}` : ''}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {(page > 1 || list.hasMore) && (
          <nav className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
            {page > 1 ? (
              <Link
                href={`/student-support/staff?status=${status}${q ? `&q=${encodeURIComponent(q)}` : ''}&page=${page - 1}`}
                className="flex min-h-11 items-center rounded-lg border border-gray-300 px-4 text-sm text-gray-700"
              >
                Newer
              </Link>
            ) : <span />}
            <span className="text-sm text-gray-500">Page {page}</span>
            {list.hasMore ? (
              <Link
                href={`/student-support/staff?status=${status}${q ? `&q=${encodeURIComponent(q)}` : ''}&page=${page + 1}`}
                className="flex min-h-11 items-center rounded-lg border border-gray-300 px-4 text-sm text-gray-700"
              >
                Older
              </Link>
            ) : <span />}
          </nav>
        )}
      </div>
    </>
  );
}
