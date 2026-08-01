'use client';

import { useRef, useState, useTransition } from 'react';
import { Plus, Trash2, X, ImagePlus, Star, CalendarDays, BadgePercent, GraduationCap, Newspaper } from 'lucide-react';
import { createAnnouncement, deleteAnnouncement } from '@/lib/content-admin/actions';
import type { AdminAnnouncement, AnnouncementFolder } from '@/lib/content-admin/content';
import { field, label, primaryBtn, card } from '@/app/student-support/staff/ui';
import { stageAll } from './uploadFlow';

const LIVE_NOTE = 'The website is updating itself — changes go live in about 2 minutes.';

const TYPE_META: Record<AnnouncementFolder, { name: string; hint: string; badge: string }> = {
  webinars: { name: 'Webinar', hint: 'An upcoming live session', badge: 'bg-blue-50 text-blue-700' },
  discounts: { name: 'Discount / Offer', hint: 'A price offer or coupon', badge: 'bg-amber-50 text-amber-700' },
  results: { name: 'Student Result Story', hint: 'Celebrate one student', badge: 'bg-emerald-50 text-emerald-700' },
  news: { name: 'News / Update', hint: 'Anything else worth telling', badge: 'bg-purple-50 text-purple-700' },
};

const TYPE_ICON: Record<AnnouncementFolder, typeof CalendarDays> = {
  webinars: CalendarDays,
  discounts: BadgePercent,
  results: GraduationCap,
  news: Newspaper,
};

type Props = {
  announcements: AdminAnnouncement[];
  onDone: (text: string) => void;
  onError: (text: string) => void;
};

export default function AnnouncementsTab({ announcements, onDone, onError }: Props) {
  const [creating, setCreating] = useState(false);
  const [busyPath, setBusyPath] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const remove = (a: AdminAnnouncement) => {
    if (!window.confirm(`Delete "${a.title}" from the website?`)) return;
    setBusyPath(a.path);
    startTransition(async () => {
      const res = await deleteAnnouncement({ path: a.path });
      setBusyPath(null);
      if (res.ok) onDone(`Announcement deleted. ${LIVE_NOTE}`);
      else onError(res.error);
    });
  };

  return (
    <div className="space-y-8">
      {!creating && (
        <button onClick={() => setCreating(true)} className={`${primaryBtn} flex items-center gap-2`}>
          <Plus className="h-5 w-5" /> New announcement
        </button>
      )}
      {creating && <NewAnnouncement onClose={() => setCreating(false)} onDone={onDone} onError={onError} />}

      <section>
        <h2 className="mb-4 font-display text-lg font-bold text-brand-ink">
          On the website now <span className="ml-1 text-sm font-normal text-gray-500">({announcements.length})</span>
        </h2>
        {announcements.length === 0 ? (
          <p className="text-sm text-gray-500">No announcements yet.</p>
        ) : (
          <ul className="space-y-2.5">
            {announcements.map((a) => {
              const Icon = TYPE_ICON[a.folder];
              return (
                <li key={a.path} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${TYPE_META[a.folder].badge}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5 truncate text-[15px] font-semibold text-brand-ink">
                      {a.featured && <Star className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400" />}
                      <span className="truncate">{a.title}</span>
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {TYPE_META[a.folder].name}
                      {a.summary ? ` · ${a.summary}` : ''}
                      {a.createdAt ? ` · added ${a.createdAt}` : ''}
                    </p>
                  </div>
                  <button
                    onClick={() => remove(a)}
                    disabled={busyPath === a.path}
                    aria-label={`Delete ${a.title}`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

function NewAnnouncement({
  onClose,
  onDone,
  onError,
}: {
  onClose: () => void;
  onDone: (t: string) => void;
  onError: (t: string) => void;
}) {
  const [folder, setFolder] = useState<AnnouncementFolder | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [featured, setFeatured] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const publish = async () => {
    if (!folder) return;
    try {
      setStatus(files.length > 0 ? 'Preparing images…' : 'Publishing…');
      const blobs = files.length > 0 ? await stageAll(files, (d, t) => setStatus(`Uploading ${d} of ${t}…`)) : [];
      setStatus('Publishing…');
      const res = await createAnnouncement({
        draft: {
          folder,
          title: values.title ?? '',
          featured,
          link: values.link?.trim() || undefined,
          buttonText: undefined,
          webinarDate: values.webinarDate,
          webinarTime: values.webinarTime,
          description: values.description?.trim() || undefined,
          discountAmount: values.discountAmount,
          couponCode: values.couponCode?.trim() || undefined,
          expiryDate: values.expiryDate?.trim() || undefined,
          studentName: values.studentName,
          achievement: values.achievement,
          quote: values.quote?.trim() || undefined,
          body: values.body,
        },
        blobs,
      });
      if (!res.ok) throw new Error(res.error);
      onDone(`Announcement published. ${LIVE_NOTE}`);
      onClose();
    } catch (e) {
      setStatus(null);
      onError(e instanceof Error ? e.message : 'Publishing failed — try again.');
    }
  };

  return (
    <div className={card}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-brand-ink">New announcement</h2>
        <button onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100">
          <X className="h-5 w-5" />
        </button>
      </div>

      {!folder ? (
        <div>
          <p className="mb-3 text-sm text-gray-600">What kind of announcement is it?</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {(Object.keys(TYPE_META) as AnnouncementFolder[]).map((f) => {
              const Icon = TYPE_ICON[f];
              return (
                <button
                  key={f}
                  onClick={() => setFolder(f)}
                  className="flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-white px-4 py-4 text-left transition hover:border-brand-blue hover:bg-blue-50/40"
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${TYPE_META[f].badge}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[15px] font-bold text-brand-ink">{TYPE_META[f].name}</span>
                    <span className="block text-xs text-gray-500">{TYPE_META[f].hint}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <button onClick={() => setFolder(null)} className="text-xs font-semibold text-brand-blue hover:underline">
            ← Change type ({TYPE_META[folder].name})
          </button>

          <div>
            <label className={label} htmlFor="a-title">Title</label>
            <input id="a-title" className={field} value={values.title ?? ''} onChange={set('title')} maxLength={160}
              placeholder={folder === 'results' ? 'e.g. Priya cracked CLB 7 !' : 'e.g. Free TEF webinar this Sunday'} />
          </div>

          {folder === 'webinars' && (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={label} htmlFor="a-date">Webinar date</label>
                  <input id="a-date" type="date" className={field} value={values.webinarDate ?? ''} onChange={set('webinarDate')} />
                </div>
                <div>
                  <label className={label} htmlFor="a-time">Time (as students should read it)</label>
                  <input id="a-time" className={field} placeholder="7:00 PM IST" value={values.webinarTime ?? ''} onChange={set('webinarTime')} />
                </div>
              </div>
              <div>
                <label className={label} htmlFor="a-desc">Short description (optional)</label>
                <textarea id="a-desc" rows={2} className={field} value={values.description ?? ''} onChange={set('description')} />
              </div>
              <div>
                <label className={label} htmlFor="a-link">Registration link (optional)</label>
                <input id="a-link" className={field} placeholder="https://…" value={values.link ?? ''} onChange={set('link')} />
              </div>
            </>
          )}

          {folder === 'discounts' && (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={label} htmlFor="a-amount">Discount (e.g. 20% off)</label>
                  <input id="a-amount" className={field} value={values.discountAmount ?? ''} onChange={set('discountAmount')} />
                </div>
                <div>
                  <label className={label} htmlFor="a-code">Coupon code (optional)</label>
                  <input id="a-code" className={field} value={values.couponCode ?? ''} onChange={set('couponCode')} />
                </div>
              </div>
              <div>
                <label className={label} htmlFor="a-expiry">Valid until (optional)</label>
                <input id="a-expiry" type="date" className={field} value={values.expiryDate ?? ''} onChange={set('expiryDate')} />
              </div>
              <div>
                <label className={label} htmlFor="a-desc2">Short description (optional)</label>
                <textarea id="a-desc2" rows={2} className={field} value={values.description ?? ''} onChange={set('description')} />
              </div>
              <div>
                <label className={label} htmlFor="a-link2">Link to claim it (optional)</label>
                <input id="a-link2" className={field} placeholder="https://…" value={values.link ?? ''} onChange={set('link')} />
              </div>
            </>
          )}

          {folder === 'results' && (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={label} htmlFor="a-student">Student name</label>
                  <input id="a-student" className={field} value={values.studentName ?? ''} onChange={set('studentName')} />
                </div>
                <div>
                  <label className={label} htmlFor="a-achievement">What they achieved</label>
                  <input id="a-achievement" className={field} placeholder="CLB 7 in TEF Canada" value={values.achievement ?? ''} onChange={set('achievement')} />
                </div>
              </div>
              <div>
                <label className={label} htmlFor="a-quote">A line from the student (optional)</label>
                <textarea id="a-quote" rows={2} className={field} value={values.quote ?? ''} onChange={set('quote')} />
              </div>
            </>
          )}

          {folder === 'news' && (
            <div>
              <label className={label} htmlFor="a-body">The update</label>
              <textarea id="a-body" rows={5} className={field} placeholder="Write it the way students should read it." value={values.body ?? ''} onChange={set('body')} />
            </div>
          )}

          <div>
            <span className={label}>Photos (optional)</span>
            <input ref={inputRef} type="file" accept="image/*" multiple className="hidden"
              onChange={(e) => {
                const picked = e.target.files ? Array.from(e.target.files) : [];
                if (picked.length > 0) setFiles((prev) => [...prev, ...picked].slice(0, 10));
                if (inputRef.current) inputRef.current.value = '';
              }} />
            <button type="button" onClick={() => inputRef.current?.click()}
              className="flex items-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-600 transition hover:border-brand-blue hover:text-brand-blue">
              <ImagePlus className="h-5 w-5" /> {files.length === 0 ? 'Add photos' : 'Add more photos'}
            </button>
            {files.length > 0 && (
              <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
                {files.map((f, i) => (
                  <div key={`${f.name}-${i}`} className="relative overflow-hidden rounded-lg border border-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={URL.createObjectURL(f)} alt={f.name} className="block h-16 w-full object-cover" />
                    <button type="button" onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                      aria-label={`Remove ${f.name}`}
                      className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white/95 text-red-600 shadow">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)}
              className="h-5 w-5 rounded border-gray-300 text-brand-blue focus:ring-blue-200" />
            Show as the big highlighted card at the top of the announcements page
          </label>

          <div className="flex items-center gap-3 pt-1">
            <button onClick={publish} disabled={Boolean(status)} className={primaryBtn}>
              {status ?? 'Publish announcement'}
            </button>
            {!status && <span className="text-xs text-gray-500">Goes live in ~2 minutes.</span>}
          </div>
        </div>
      )}
    </div>
  );
}
