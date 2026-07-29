'use client';

import { useActionState, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitTicket, type FormState } from '@/lib/tickets/actions';
import {
  MAX_IMAGES, MAX_IMAGE_BYTES, MAX_IMAGE_EDGE, IMAGE_QUALITY,
} from '@/lib/tickets/constants';

type Shot = { file: File; url: string; label: string };

/** Decode a picked file, preferring createImageBitmap, falling back to <img>. */
async function decode(file: File): Promise<{ src: CanvasImageSource; w: number; h: number } | null> {
  if (typeof createImageBitmap === 'function') {
    try {
      const bmp = await createImageBitmap(file);
      return { src: bmp, w: bmp.width, h: bmp.height };
    } catch {
      /* fall through to the <img> path, which handles formats bitmap will not */
    }
  }

  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error('decode failed'));
      el.src = url;
    });
    return { src: img, w: img.naturalWidth, h: img.naturalHeight };
  } catch {
    return null;
  } finally {
    URL.revokeObjectURL(url);
  }
}

/**
 * Compresses in the browser before anything is uploaded. A 3 MB phone
 * screenshot lands at roughly 120 KB, which keeps the upload quick on mobile
 * data and keeps server storage inside the free tier.
 *
 * Returns null when the browser cannot produce something the server will
 * accept, so the student gets told rather than hitting a silent failure at
 * submit time. iPhone HEIC arrives here too: Safari decodes it and the canvas
 * re-encodes it to WebP or JPEG on the way out.
 */
async function compress(file: File): Promise<File | null> {
  const decoded = await decode(file);
  if (!decoded) return null;

  const { src, w: iw, h: ih } = decoded;
  if (!iw || !ih) return null;

  const scale = Math.min(1, MAX_IMAGE_EDGE / Math.max(iw, ih));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(iw * scale));
  canvas.height = Math.max(1, Math.round(ih * scale));

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.drawImage(src, 0, 0, canvas.width, canvas.height);
  if ('close' in src && typeof (src as ImageBitmap).close === 'function') (src as ImageBitmap).close();

  const toBlob = (type: string, q: number) =>
    new Promise<Blob | null>((res) => canvas.toBlob(res, type, q));

  for (const type of ['image/webp', 'image/jpeg']) {
    for (const q of [IMAGE_QUALITY, 0.6, 0.45, 0.32, 0.2]) {
      const blob = await toBlob(type, q);
      if (!blob) break;              // encoder unsupported, try the next type
      if (blob.type !== type) break; // browser silently substituted a format
      if (blob.size <= MAX_IMAGE_BYTES) {
        const ext = type === 'image/webp' ? 'webp' : 'jpg';
        const base = (file.name.replace(/\.[^.]+$/, '') || 'screenshot').slice(0, 60);
        return new File([blob], `${base}.${ext}`, { type });
      }
    }
  }

  // Nothing fit. The original only works if it is already small and an
  // accepted type.
  if (file.size <= MAX_IMAGE_BYTES && /^image\/(png|jpeg|webp)$/.test(file.type)) return file;
  return null;
}

function SubmitButton({ blocked }: { blocked: boolean }) {
  const { pending } = useFormStatus();
  const disabled = pending || blocked;
  return (
    <button
      type="submit"
      disabled={disabled}
      className="min-h-[3.25rem] w-full rounded-xl bg-brand-blue px-5 py-4 text-base font-semibold text-white shadow-premium transition hover:bg-brand-blue-deep disabled:cursor-progress disabled:opacity-60"
    >
      {pending ? 'Sending…' : blocked ? 'Preparing your screenshot…' : 'Send to the Frenchify team'}
    </button>
  );
}

export default function TicketForm({ categories }: { categories: readonly string[] }) {
  const [state, formAction] = useActionState<FormState, FormData>(submitTicket, {});
  const [shots, setShots] = useState<Shot[]>([]);
  const [working, setWorking] = useState(false);
  const [shotError, setShotError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /** Writes the compressed files back onto the input so the action sends those. */
  function syncInput(list: Shot[]) {
    if (!inputRef.current) return;
    try {
      const dt = new DataTransfer();
      list.forEach((s) => dt.items.add(s.file));
      inputRef.current.files = dt.files;
    } catch {
      // Very old Safari refuses to write input.files. The originals then get
      // uploaded, which the server still validates and size-limits.
    }
  }

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []);
    if (!picked.length) return;

    setWorking(true);
    setShotError(null);
    try {
      const next: Shot[] = [];
      const failed: string[] = [];

      for (const f of picked.slice(0, MAX_IMAGES)) {
        const small = await compress(f);
        if (!small) {
          failed.push(f.name);
          continue;
        }
        next.push({
          file: small,
          url: URL.createObjectURL(small),
          label: `${(small.size / 1024).toFixed(0)} KB`,
        });
      }

      shots.forEach((s) => URL.revokeObjectURL(s.url));
      setShots(next);
      syncInput(next);

      if (failed.length) {
        setShotError(`Could not read ${failed.join(', ')}. Take a fresh screenshot and attach that instead.`);
      } else if (picked.length > MAX_IMAGES) {
        setShotError(`Only the first ${MAX_IMAGES} screenshots were kept.`);
      }
    } finally {
      setWorking(false);
    }
  }

  function removeShot(i: number) {
    URL.revokeObjectURL(shots[i].url);
    const kept = shots.filter((_, n) => n !== i);
    setShots(kept);
    syncInput(kept);
  }

  const field =
    'w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-[16px] text-gray-900 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-200';
  const label = 'mb-1.5 block text-sm font-semibold text-gray-700';

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[15px] text-red-800">
          {state.error}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="student_name">
            Your full name <span className="text-red-600">*</span>
          </label>
          <input id="student_name" name="student_name" required maxLength={120} className={field} autoComplete="name" />
        </div>
        <div>
          <label className={label} htmlFor="student_email">
            Email <span className="text-red-600">*</span>
          </label>
          <input id="student_email" name="student_email" type="email" required maxLength={180} className={field} autoComplete="email" />
          <p className="mt-1.5 text-sm text-gray-500">We reply here.</p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="student_phone">WhatsApp or phone</label>
          <input id="student_phone" name="student_phone" maxLength={40} className={field} placeholder="+91 …" inputMode="tel" autoComplete="tel" />
          <p className="mt-1.5 text-sm text-gray-500">Optional, but it gets you a faster answer.</p>
        </div>
        <div>
          <label className={label} htmlFor="course">Which course are you on?</label>
          <input id="course" name="course" maxLength={120} className={field} placeholder="TEF, A1 batch, TCF prep…" />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="category">
          What is this about? <span className="text-red-600">*</span>
        </label>
        <select id="category" name="category" required defaultValue="" className={field}>
          <option value="" disabled>Choose one</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={label} htmlFor="subject">
          Give it a short title <span className="text-red-600">*</span>
        </label>
        <input
          id="subject" name="subject" required minLength={5} maxLength={200} className={field}
          placeholder="Cannot open week 3 videos on the portal"
        />
      </div>

      <div>
        <label className={label} htmlFor="description">
          What exactly is happening? <span className="text-red-600">*</span>
        </label>
        <textarea
          id="description" name="description" required minLength={20} maxLength={8000} rows={5}
          className={`${field} min-h-[130px] resize-y`}
          placeholder="Tell us what you clicked, what you expected, and what happened instead. Include any error message word for word."
        />
        <p className="mt-1.5 text-sm text-gray-500">The more detail here, the fewer times we have to come back to you.</p>
      </div>

      <div>
        <span className={label}>
          Screenshot of the problem <span className="text-red-600">*</span>
        </span>

        <label
          htmlFor="screenshots"
          className="flex min-h-[6rem] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/60 px-5 py-7 text-center transition hover:border-brand-blue hover:bg-blue-50"
        >
          <span className="text-[15px] font-semibold text-brand-blue">
            {working ? 'Preparing…' : shots.length ? 'Tap to change' : 'Tap to attach a screenshot'}
          </span>
          <span className="mt-1 text-sm text-gray-600">
            Up to {MAX_IMAGES} images. Still screenshots only, not screen recordings.
          </span>
          <input
            ref={inputRef}
            id="screenshots"
            name="screenshots"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/heic,image/heif"
            multiple
            required
            className="sr-only"
            onChange={onPick}
          />
        </label>

        {shotError && (
          <p role="alert" className="mt-2 rounded-lg bg-amber-50 px-3.5 py-2.5 text-sm text-amber-900">
            {shotError}
          </p>
        )}

        {shots.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-4">
            {shots.map((s, i) => (
              <li key={s.url} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.url} alt="" className="h-20 w-28 rounded-lg border border-gray-200 object-cover" />
                <button
                  type="button"
                  onClick={() => removeShot(i)}
                  aria-label={`Remove screenshot ${i + 1}`}
                  className="absolute -right-3 -top-3 grid h-11 w-11 place-items-center"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-gray-900 text-xs text-white shadow">
                    ×
                  </span>
                </button>
                <span className="mt-1 block text-center text-sm text-gray-500">{s.label}</span>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-2 text-sm text-gray-500">
          On a phone, screenshot the screen where it goes wrong. On a laptop use Win+Shift+S, or Cmd+Shift+4 on a Mac.
        </p>
      </div>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px]" />

      <SubmitButton blocked={working} />
    </form>
  );
}
