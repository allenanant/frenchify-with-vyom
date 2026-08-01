'use client';

import { useRef, useState, useTransition } from 'react';
import { Plus, Trash2, X, ImagePlus } from 'lucide-react';
import { deleteResultImage, publishResults } from '@/lib/content-admin/actions';
import type { AdminWallEntry } from '@/lib/content-admin/content';
import { field, label, primaryBtn, card } from '@/app/student-support/staff/ui';
import { stageAll } from './uploadFlow';

const LIVE_NOTE = 'The website is updating itself — changes go live in about 2 minutes.';

type Props = {
  wall: AdminWallEntry[];
  onDone: (text: string) => void;
  onError: (text: string) => void;
};

export default function ResultsTab({ wall, onDone, onError }: Props) {
  const [adding, setAdding] = useState(false);

  const flat = (level: 'clb7' | 'clb5') =>
    wall
      .filter((e) => e.level === level)
      .flatMap((e) => e.images.map((url) => ({ url, entryPath: e.path })));

  const clb7 = flat('clb7');
  const clb5 = flat('clb5');

  return (
    <div className="space-y-10">
      {!adding && (
        <button onClick={() => setAdding(true)} className={`${primaryBtn} flex items-center gap-2`}>
          <Plus className="h-5 w-5" /> Add new results
        </button>
      )}
      {adding && <AddResults onClose={() => setAdding(false)} onDone={onDone} onError={onError} />}

      <Section title="CLB 7+ results" count={clb7.length} tone="blue" images={clb7} onDone={onDone} onError={onError} />
      <Section title="CLB 5 results" count={clb5.length} tone="emerald" images={clb5} onDone={onDone} onError={onError} />
    </div>
  );
}

function Section({
  title,
  count,
  tone,
  images,
  onDone,
  onError,
}: {
  title: string;
  count: number;
  tone: 'blue' | 'emerald';
  images: Array<{ url: string; entryPath: string }>;
  onDone: (t: string) => void;
  onError: (t: string) => void;
}) {
  const [busyUrl, setBusyUrl] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const remove = (img: { url: string; entryPath: string }) => {
    if (!window.confirm('Remove this result from the website?')) return;
    setBusyUrl(img.url);
    startTransition(async () => {
      const res = await deleteResultImage({ entryPath: img.entryPath, imageUrl: img.url });
      setBusyUrl(null);
      if (res.ok) onDone(`Result removed. ${LIVE_NOTE}`);
      else onError(res.error);
    });
  };

  return (
    <section>
      <div className="mb-4 flex items-center gap-2.5">
        <h2 className="font-display text-lg font-bold text-brand-ink">{title}</h2>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            tone === 'blue' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'
          }`}
        >
          {count}
        </span>
      </div>
      {images.length === 0 ? (
        <p className="text-sm text-gray-500">Nothing here yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {images.map((img) => (
            <div key={img.url} className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt="Student result" loading="lazy" className="block h-40 w-full object-cover object-top" />
              <button
                onClick={() => remove(img)}
                disabled={busyUrl === img.url}
                aria-label="Remove this result"
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-red-600 shadow-md transition hover:bg-red-600 hover:text-white disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              {busyUrl === img.url && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/70 text-xs font-semibold text-gray-700">
                  Removing…
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function AddResults({
  onClose,
  onDone,
  onError,
}: {
  onClose: () => void;
  onDone: (t: string) => void;
  onError: (t: string) => void;
}) {
  const [level, setLevel] = useState<'clb7' | 'clb5'>('clb7');
  const [title, setTitle] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pick = (list: FileList | null) => {
    if (!list) return;
    // Snapshot before clearing the input — a FileList is live and resetting
    // the input empties it before React runs the state updater.
    const picked = Array.from(list);
    setFiles((prev) => [...prev, ...picked].slice(0, 40));
    if (inputRef.current) inputRef.current.value = '';
  };

  const publish = async () => {
    if (files.length === 0) {
      onError('Add at least one screenshot first.');
      return;
    }
    try {
      setStatus('Preparing images…');
      const blobs = await stageAll(files, (done, total) => setStatus(`Uploading ${done} of ${total}…`));
      setStatus('Publishing…');
      const res = await publishResults({ title, level, blobs });
      if (!res.ok) throw new Error(res.error);
      onDone(`${files.length} result(s) added to the ${level === 'clb7' ? 'CLB 7+' : 'CLB 5'} wall. ${LIVE_NOTE}`);
      onClose();
    } catch (e) {
      setStatus(null);
      onError(e instanceof Error ? e.message : 'Upload failed — try again.');
    }
  };

  const levelBtn = (value: 'clb7' | 'clb5', text: string, sub: string) => (
    <button
      type="button"
      onClick={() => setLevel(value)}
      className={`flex-1 rounded-xl border-2 px-4 py-3 text-left transition ${
        level === value ? 'border-brand-blue bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <span className="block text-[15px] font-bold text-brand-ink">{text}</span>
      <span className="block text-xs text-gray-500">{sub}</span>
    </button>
  );

  return (
    <div className={card}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-brand-ink">Add new results</h2>
        <button onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <span className={label}>Which wall do these belong on?</span>
          <div className="flex gap-3">
            {levelBtn('clb7', 'CLB 7+', 'Advanced proficiency')}
            {levelBtn('clb5', 'CLB 5', 'Intermediate success')}
          </div>
        </div>

        <div>
          <label className={label} htmlFor="batch-title">Name for this upload (optional)</label>
          <input
            id="batch-title"
            className={field}
            placeholder="e.g. August TEF results"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
          />
        </div>

        <div>
          <span className={label}>Result screenshots</span>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => pick(e.target.files)}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-sm font-semibold text-gray-600 transition hover:border-brand-blue hover:text-brand-blue"
          >
            <ImagePlus className="h-5 w-5" />
            {files.length === 0 ? 'Tap to choose screenshots (you can pick many at once)' : 'Add more screenshots'}
          </button>

          {files.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
              {files.map((f, i) => (
                <div key={`${f.name}-${i}`} className="relative overflow-hidden rounded-lg border border-gray-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={URL.createObjectURL(f)} alt={f.name} className="block h-20 w-full object-cover object-top" />
                  <button
                    type="button"
                    onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                    aria-label={`Remove ${f.name}`}
                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/95 text-red-600 shadow"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={publish} disabled={Boolean(status)} className={primaryBtn}>
            {status ?? `Publish ${files.length > 0 ? `${files.length} result(s)` : ''}`}
          </button>
          {!status && files.length > 0 && (
            <span className="text-xs text-gray-500">Goes live on the website in ~2 minutes.</span>
          )}
        </div>
      </div>
    </div>
  );
}
