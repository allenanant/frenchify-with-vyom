'use server';

/**
 * Server actions for the two-tab content admin at /admin.
 *
 * Every mutation is one GitHub commit to the deploy branch; Vercel picks it up
 * and the website rebuilds itself, so "published" here means live in ~2 min.
 * All actions require a signed-in staff account (same accounts as the student
 * support dashboard — Vyom manages those from its Team page).
 */

import { redirect } from 'next/navigation';
import matter from 'gray-matter';
import * as auth from '@/lib/tickets/auth';
import { stampNow, toIsoStamp } from '@/lib/content-date';
import {
  SCHEDULE_REPO_PATH,
  formatWebinarDate,
  readSchedule,
  serializeSchedule,
  webinarInstantFor,
  webinarWeekday,
} from '@/lib/webinar';
import { commitFiles, createBlob, listTree, readBlob } from './github';
import {
  ANNOUNCEMENTS_DIR,
  ANNOUNCEMENTS_IMG_DIR,
  RESULTS_IMG_DIR,
  WALL_DIR,
  type AnnouncementDraft,
  type AnnouncementFolder,
  ANNOUNCEMENT_TYPES,
  serializeAnnouncement,
  serializeWallEntry,
  slugify,
} from './content';

type Result = { ok: true; detail?: string } | { ok: false; error: string };

const MAX_UPLOAD_BYTES = 800 * 1024; // after browser compression; generous
const MAX_BATCH = 40;

function isImage(buf: Buffer): 'webp' | 'jpg' | 'png' | null {
  if (buf.length > 11 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') return 'webp';
  if (buf.length > 2 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpg';
  if (buf.length > 7 && buf[0] === 0x89 && buf.toString('ascii', 1, 4) === 'PNG') return 'png';
  return null;
}

async function gate(): Promise<string | null> {
  const { user, error } = await auth.requireStaff();
  if (!user) return error;
  return null;
}

/** Date only. Used for slugs and default titles, never for ordering. */
function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function uniqueSlug(title: string): string {
  return `${today()}-${slugify(title)}-${Math.random().toString(36).slice(2, 5)}`;
}

export async function adminSignOut() {
  await auth.endSession();
  redirect('/admin/');
}

/**
 * Phase 1 of an upload. The browser sends compressed images a few at a time
 * (Vercel caps request bodies), each becomes an orphan git blob, and nothing
 * touches the website until publish makes the single commit.
 */
export async function stageImages(fd: FormData): Promise<{ ok: true; blobs: Array<{ sha: string; ext: string }> } | { ok: false; error: string }> {
  const denied = await gate();
  if (denied) return { ok: false, error: denied };
  const files = fd.getAll('images').filter((f): f is File => f instanceof File);
  if (files.length === 0) return { ok: false, error: 'No images received.' };
  if (files.length > 10) return { ok: false, error: 'Too many images in one chunk.' };

  const blobs: Array<{ sha: string; ext: string }> = [];
  for (const file of files) {
    const buf = Buffer.from(await file.arrayBuffer());
    if (buf.length > MAX_UPLOAD_BYTES) return { ok: false, error: `"${file.name}" is too large even after compression.` };
    const kind = isImage(buf);
    if (!kind) return { ok: false, error: `"${file.name}" is not a usable image.` };
    blobs.push({ sha: await createBlob(buf.toString('base64')), ext: kind });
  }
  return { ok: true, blobs };
}

export async function publishResults(input: {
  title: string;
  level: 'clb7' | 'clb5';
  blobs: Array<{ sha: string; ext: string }>;
}): Promise<Result> {
  const denied = await gate();
  if (denied) return { ok: false, error: denied };
  const title = input.title.trim().slice(0, 120) || `Results ${today()}`;
  if (input.level !== 'clb5' && input.level !== 'clb7') return { ok: false, error: 'Pick CLB 7+ or CLB 5.' };
  if (input.blobs.length === 0) return { ok: false, error: 'Add at least one screenshot.' };
  if (input.blobs.length > MAX_BATCH) return { ok: false, error: `Maximum ${MAX_BATCH} images per upload.` };

  const slug = uniqueSlug(title);
  const files: Array<{ path: string; content?: string; blobSha?: string }> = input.blobs.map((b, i) => ({
    path: `${RESULTS_IMG_DIR}/${slug}/img-${String(i + 1).padStart(2, '0')}.${b.ext}`,
    blobSha: b.sha,
  }));
  const urls = files.map((f) => f.path.replace('next-site/public', ''));
  files.push({
    path: `${WALL_DIR}/${slug}.md`,
    // Full timestamp, not just the date: the wall sorts newest first, and two
    // batches published on the same day have to be separable.
    content: serializeWallEntry({ title, level: input.level, createdAt: stampNow(), images: urls }),
  });

  try {
    await commitFiles({
      message: `Admin: add ${input.blobs.length} ${input.level === 'clb7' ? 'CLB 7+' : 'CLB 5'} result(s) — ${title}`,
      files,
    });
  } catch (e) {
    return { ok: false, error: publicError(e) };
  }
  return { ok: true, detail: `${input.blobs.length} result(s) published.` };
}

export async function deleteResultImage(input: { entryPath: string; imageUrl: string }): Promise<Result> {
  const denied = await gate();
  if (denied) return { ok: false, error: denied };
  if (!input.entryPath.startsWith(WALL_DIR + '/') || !input.entryPath.endsWith('.md')) {
    return { ok: false, error: 'Bad entry path.' };
  }
  try {
    const node = (await listTree(input.entryPath)).find((n) => n.path === input.entryPath);
    if (!node) return { ok: false, error: 'That entry no longer exists — refresh the page.' };
    const { data } = matter(await readBlob(node.sha));
    const images = (Array.isArray(data.images) ? (data.images as unknown[]).map(String) : []).filter(
      (u) => u !== input.imageUrl
    );

    const deletions: string[] = [];
    if (input.imageUrl.startsWith('/results/')) deletions.push('next-site/public' + input.imageUrl);

    if (images.length === 0) {
      deletions.push(input.entryPath);
      await commitFiles({ message: `Admin: remove result batch ${input.entryPath.split('/').pop()}`, deletions });
    } else {
      await commitFiles({
        message: 'Admin: remove one result image',
        files: [
          {
            path: input.entryPath,
            content: serializeWallEntry({
              title: String(data.title ?? ''),
              level: data.clbLevel === 'clb5' ? 'clb5' : 'clb7',
              createdAt: toIsoStamp(data.createdAt),
              images,
            }),
          },
        ],
        deletions,
      });
    }
  } catch (e) {
    return { ok: false, error: publicError(e) };
  }
  return { ok: true, detail: 'Result removed.' };
}

export async function createAnnouncement(input: {
  draft: Omit<AnnouncementDraft, 'images' | 'createdAt'>;
  blobs: Array<{ sha: string; ext: string }>;
}): Promise<Result> {
  const denied = await gate();
  if (denied) return { ok: false, error: denied };
  const d = input.draft;
  if (!(d.folder in ANNOUNCEMENT_TYPES)) return { ok: false, error: 'Pick an announcement type.' };
  const title = (d.title ?? '').trim().slice(0, 160);
  if (!title) return { ok: false, error: 'Give it a title.' };
  if (d.folder === 'webinars' && (!d.webinarDate || !d.webinarTime?.trim())) {
    return { ok: false, error: 'Webinars need a date and a time.' };
  }
  if (d.folder === 'discounts' && !d.discountAmount?.trim()) {
    return { ok: false, error: 'Add the discount amount (e.g. 20% off).' };
  }
  if (d.folder === 'results' && (!d.studentName?.trim() || !d.achievement?.trim())) {
    return { ok: false, error: 'Add the student name and their achievement.' };
  }
  if (d.folder === 'news' && !d.body?.trim()) {
    return { ok: false, error: 'Write the update text.' };
  }
  if (input.blobs.length > 10) return { ok: false, error: 'Maximum 10 images per announcement.' };

  const slug = uniqueSlug(title);
  const files: Array<{ path: string; content?: string; blobSha?: string }> = input.blobs.map((b, i) => ({
    path: `${ANNOUNCEMENTS_IMG_DIR}/${slug}/img-${String(i + 1).padStart(2, '0')}.${b.ext}`,
    blobSha: b.sha,
  }));
  const urls = files.map((f) => f.path.replace('next-site/public', ''));
  files.push({
    path: `${ANNOUNCEMENTS_DIR}/${d.folder}/${slug}.md`,
    content: serializeAnnouncement({ ...d, title, images: urls, createdAt: stampNow() }),
  });

  try {
    await commitFiles({ message: `Admin: new ${ANNOUNCEMENT_TYPES[d.folder as AnnouncementFolder]} — ${title}`, files });
  } catch (e) {
    return { ok: false, error: publicError(e) };
  }
  return { ok: true, detail: 'Announcement published.' };
}

export async function deleteAnnouncement(input: { path: string }): Promise<Result> {
  const denied = await gate();
  if (denied) return { ok: false, error: denied };
  if (!input.path.startsWith(ANNOUNCEMENTS_DIR + '/') || !input.path.endsWith('.md')) {
    return { ok: false, error: 'Bad path.' };
  }
  try {
    const node = (await listTree(input.path)).find((n) => n.path === input.path);
    if (!node) return { ok: false, error: 'Already deleted — refresh the page.' };
    const { data } = matter(await readBlob(node.sha));
    const deletions = [input.path];
    for (const raw of Array.isArray(data.images) ? (data.images as unknown[]).map(String) : []) {
      if (raw.startsWith('/announcements/')) deletions.push('next-site/public' + raw);
    }
    await commitFiles({ message: `Admin: delete announcement ${input.path.split('/').pop()}`, deletions });
  } catch (e) {
    return { ok: false, error: publicError(e) };
  }
  return { ok: true, detail: 'Announcement deleted.' };
}

/** Keep GitHub error bodies (which can include repo details) out of the UI. */
function publicError(e: unknown): string {
  console.error('[content-admin]', e);
  const msg = e instanceof Error ? e.message : '';
  if (msg.includes('GITHUB_CONTENT_TOKEN')) return 'Publishing key missing on the server — tell Allen.';
  return 'Publishing failed. Try again, and tell Allen if it keeps happening.';
}

/* ------------------------------------------------------------------ */
/* Webinar schedule                                                    */
/* ------------------------------------------------------------------ */

/**
 * The Sunday webinar's date and this week's WebinarJam link.
 *
 * This is the replacement for editing a GoHighLevel custom value, a workflow's
 * "Set Event Start Time" action and a countdown timer separately — the four
 * funnel pages and the countdown all read this one file.
 */
export async function publishWebinarSchedule(input: {
  /** Local date in the webinar's timezone, "YYYY-MM-DD". */
  date: string;
  /** 24h local time in the webinar's timezone, "HH:MM". */
  time: string;
  joinUrl: string;
  autoRoll: boolean;
}): Promise<Result> {
  const denied = await gate();
  if (denied) return { ok: false, error: denied };

  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) return { ok: false, error: 'Pick a webinar date.' };
  if (!/^\d{2}:\d{2}$/.test(input.time)) return { ok: false, error: 'Pick a start time.' };

  const joinUrl = input.joinUrl.trim();
  if (joinUrl && !/^https:\/\/\S+$/i.test(joinUrl)) {
    return { ok: false, error: 'The webinar link must be a full https:// address.' };
  }

  const [y, m, d] = input.date.split('-').map(Number);
  const [hh, mm] = input.time.split(':').map(Number);
  const startsAt = webinarInstantFor(y, m, d, hh, mm);
  if (Number.isNaN(startsAt.getTime())) return { ok: false, error: 'That date and time did not make sense.' };

  const current = readSchedule();
  const iso = startsAt.toISOString();
  const updated = {
    ...current,
    startsAt: iso,
    joinUrl,
    // Tie the link to this exact webinar so a later date change cannot leave
    // last week's dead room being served from the waiting page.
    joinUrlFor: joinUrl ? iso : '',
    autoRoll: input.autoRoll,
    // The chosen day and time become the pattern the weekly roll repeats, so
    // moving a webinar to Saturday 6 PM moves every future one with it.
    weekday: webinarWeekday(startsAt),
    hour: hh,
    minute: mm,
    updatedAt: new Date().toISOString(),
  };

  try {
    await commitFiles({
      message: `Admin: webinar ${formatWebinarDate(startsAt)}`,
      files: [{ path: SCHEDULE_REPO_PATH, content: serializeSchedule(updated) }],
    });
  } catch (e) {
    return { ok: false, error: publicError(e) };
  }
  return {
    ok: true,
    detail: joinUrl
      ? 'Webinar updated. Live in about 2 minutes.'
      : 'Webinar date updated. Add the WebinarJam link before Sunday so the waiting room can let people in.',
  };
}
