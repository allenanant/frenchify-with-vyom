import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { currentUser } from '@/lib/tickets/auth';
import {
  getTicket, getAttachmentMeta, getEvents, listActiveUsers, STATUS_LABELS,
} from '@/lib/tickets/db';
import { card, pill, whenIst, ago } from '../../ui';
import { STATUS_CLASSES } from '@/lib/tickets/constants';
import UpdatePanel from './UpdatePanel';
import CopyButton from './CopyButton';

export const dynamic = 'force-dynamic';

export default async function TicketPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await currentUser();
  if (!user) redirect('/student-support/staff/login/');
  if (user.must_change) redirect('/student-support/staff/password/');

  const id = Number((await params).id);
  if (!Number.isInteger(id) || id < 1) notFound();

  const t = await getTicket(id);
  if (!t) notFound();

  const [shots, events, staff] = await Promise.all([
    getAttachmentMeta(id),
    getEvents(id),
    listActiveUsers(),
  ]);

  const digits = (t.student_phone || '').replace(/\D/g, '');

  return (
    <>
      <Link href="/student-support/staff" className="text-[15px] text-gray-500 hover:text-gray-700">
        ← Back to tickets
      </Link>

      <div className="mt-3 flex flex-wrap items-center gap-2.5">
        <h1 className="font-display text-2xl font-bold tracking-tight text-gray-900">{t.ref}</h1>
        <span className={`${pill} ${STATUS_CLASSES[t.status]}`}>{STATUS_LABELS[t.status]}</span>
        {t.priority === 'high' && <span className={`${pill} bg-red-100 text-red-800`}>High priority</span>}
      </div>
      <p className="mt-1 text-sm text-gray-500">
        Raised {whenIst(t.created_at)} IST · {ago(t.created_at)}
      </p>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-5">
          <section className={card}>
            <h2 className="text-lg font-extrabold leading-snug text-gray-900 [overflow-wrap:anywhere]">{t.subject}</h2>
            <p className="mt-1 text-sm text-gray-500">
              {t.category}
              {t.course ? ` · ${t.course}` : ''}
            </p>
            <p className="mt-4 whitespace-pre-wrap text-[15px] leading-relaxed text-gray-800 [overflow-wrap:anywhere]">{t.description}</p>
          </section>

          <section className={card}>
            <h2 className="mb-3 text-lg font-extrabold text-gray-900">Screenshots ({shots.length})</h2>
            {shots.length === 0 ? (
              <p className="text-[15px] text-gray-500">No screenshot on this ticket.</p>
            ) : (
              <>
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {shots.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`/api/support/files/${s.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block overflow-hidden rounded-xl border border-gray-200 bg-gray-50"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`/api/support/files/${s.id}`}
                          alt={s.original_name || 'Screenshot'}
                          loading="lazy"
                          className="h-28 w-full object-cover sm:h-32"
                        />
                      </a>
                      <p className="mt-1 truncate text-sm text-gray-500">{(s.bytes / 1024).toFixed(0)} KB</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-gray-500">
                  Tap to open full size. Visible to signed-in team only.
                </p>
              </>
            )}
          </section>

          <section className={card}>
            <h2 className="mb-3 text-lg font-extrabold text-gray-900">History</h2>
            <ol className="space-y-0">
              {events.map((e) => (
                <li key={e.id} className="relative border-l-2 border-gray-200 py-2.5 pl-4">
                  <span className="absolute -left-[5px] top-4 h-2 w-2 rounded-full bg-brand-blue" />
                  <p className="text-[15px] leading-snug text-gray-800 [overflow-wrap:anywhere]">{e.body || e.type}</p>
                  <p className="mt-0.5 text-sm text-gray-500">
                    {e.user_name || 'Student'} · {whenIst(e.created_at)}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <div className="space-y-5">
          <section className={card}>
            <h2 className="mb-3 text-lg font-extrabold text-gray-900">Contact the student</h2>

            <dl className="space-y-3 text-[15px]">
              <div>
                <dt className="text-sm text-gray-500">Name</dt>
                <dd className="font-medium text-gray-900">{t.student_name}</dd>
              </div>

              <div>
                <dt className="text-sm text-gray-500">Email</dt>
                <dd className="flex flex-wrap items-center gap-2 break-all">
                  <a
                    className="font-medium text-brand-blue hover:underline"
                    href={`mailto:${t.student_email}?subject=${encodeURIComponent(`Re: ${t.ref} ${t.subject}`)}`}
                  >
                    {t.student_email}
                  </a>
                  <CopyButton value={t.student_email} />
                </dd>
              </div>

              <div>
                <dt className="text-sm text-gray-500">Phone</dt>
                <dd>
                  {t.student_phone ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <a className="font-medium text-brand-blue hover:underline" href={`tel:${t.student_phone}`}>
                        {t.student_phone}
                      </a>
                      <CopyButton value={t.student_phone} />
                    </div>
                  ) : (
                    <span className="text-gray-400">Not given</span>
                  )}
                </dd>
              </div>

              <div>
                <dt className="text-sm text-gray-500">Course</dt>
                <dd className="font-medium text-gray-900">{t.course || <span className="text-gray-400">Not given</span>}</dd>
              </div>
            </dl>

            {digits && (
              <a
                href={`https://wa.me/${digits}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block rounded-xl bg-green-600 px-4 py-2.5 text-center text-[15px] font-semibold text-white transition hover:bg-green-700"
              >
                Message on WhatsApp
              </a>
            )}

            <p className="mt-3 text-sm text-gray-500">
              Reach out however suits, then log what you did so the rest of the team can see it.
            </p>
          </section>

          <UpdatePanel
            id={t.id}
            status={t.status}
            priority={t.priority}
            assignedTo={t.assigned_to}
            resolutionNote={t.resolution_note}
            staff={staff}
            version={t.updated_at}
          />

          {t.resolved_at && (
            <p className="text-sm text-gray-500">
              Resolved {whenIst(t.resolved_at)} by {t.resolver_name || 'someone since removed'}.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
