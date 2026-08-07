/**
 * Reads and serializes the website's content files for the admin.
 *
 * Reads go through the GitHub API (not the local filesystem) so the admin
 * always shows the repo's latest state, including publishes still deploying.
 * Serializers must stay in lockstep with the site loaders:
 * lib/announcements.ts and lib/wall-results.ts.
 */

import 'server-only';
import matter from 'gray-matter';
import { newestFirst, toDateOnly } from '../content-date';
import { listTree, readBlob } from './github';

export const ANNOUNCEMENTS_DIR = 'next-site/content/announcements';
export const WALL_DIR = 'next-site/content/wall-results';
export const RESULTS_IMG_DIR = 'next-site/public/results';
export const ANNOUNCEMENTS_IMG_DIR = 'next-site/public/announcements';

export const ANNOUNCEMENT_TYPES = {
  webinars: 'Webinar',
  discounts: 'Discount / Offer',
  results: 'Student Result Story',
  news: 'News / Update',
} as const;
export type AnnouncementFolder = keyof typeof ANNOUNCEMENT_TYPES;

export type AdminAnnouncement = {
  path: string;
  folder: AnnouncementFolder;
  title: string;
  featured: boolean;
  /** YYYY-MM-DD, for display. */
  createdAt: string;
  /** The raw stamp, kept at full precision so same-day entries still order. */
  stamp: unknown;
  summary: string;
  images: string[];
};

export type AdminWallEntry = {
  path: string;
  title: string;
  level: 'clb7' | 'clb5';
  /** YYYY-MM-DD, for display. */
  createdAt: string;
  /** The raw stamp, kept at full precision so same-day batches still order. */
  stamp: unknown;
  images: string[];
};

/** Stamps come in three shapes across the repo — always show the short date. */
const dstr = toDateOnly;

export async function fetchAnnouncements(): Promise<AdminAnnouncement[]> {
  const nodes = (await listTree(ANNOUNCEMENTS_DIR + '/')).filter((n) => n.path.endsWith('.md'));
  const items = await Promise.all(
    nodes.map(async (n) => {
      const { data } = matter(await readBlob(n.sha));
      const folder = n.path.slice(ANNOUNCEMENTS_DIR.length + 1).split('/')[0] as AnnouncementFolder;
      if (!(folder in ANNOUNCEMENT_TYPES)) return null;
      const summary =
        folder === 'webinars'
          ? [dstr(data.webinarDate), String(data.webinarTime ?? '')].filter(Boolean).join(' · ')
          : folder === 'discounts'
            ? String(data.discountAmount ?? '')
            : folder === 'results'
              ? [data.studentName, data.achievement].filter(Boolean).join(' — ')
              : '';
      return {
        path: n.path,
        folder,
        title: String(data.title ?? '(untitled)'),
        featured: Boolean(data.featured),
        createdAt: dstr(data.createdAt),
        stamp: data.createdAt,
        summary,
        images: Array.isArray(data.images) ? (data.images as unknown[]).map(String) : [],
      };
    })
  );
  return (items.filter(Boolean) as AdminAnnouncement[]).sort((a, b) =>
    newestFirst({ createdAt: a.stamp, id: a.path }, { createdAt: b.stamp, id: b.path })
  );
}

export async function fetchWallEntries(): Promise<AdminWallEntry[]> {
  const nodes = (await listTree(WALL_DIR + '/')).filter((n) => n.path.endsWith('.md'));
  const items = await Promise.all(
    nodes.map(async (n) => {
      const { data } = matter(await readBlob(n.sha));
      return {
        path: n.path,
        title: String(data.title ?? '(untitled)'),
        level: data.clbLevel === 'clb5' ? ('clb5' as const) : ('clb7' as const),
        createdAt: dstr(data.createdAt),
        stamp: data.createdAt,
        images: Array.isArray(data.images) ? (data.images as unknown[]).map(String) : [],
      };
    })
  );
  // Same order the wall itself renders in, so what staff see in the admin is
  // what students see on /results-page.
  return items.sort((a, b) =>
    newestFirst({ createdAt: a.stamp, id: a.path }, { createdAt: b.stamp, id: b.path })
  );
}

// --- serializers -------------------------------------------------------------

/** YAML flow scalars are a JSON superset, so JSON escaping is always safe. */
const y = (v: string) => JSON.stringify(v);

function frontmatter(fields: Array<[string, string | boolean | string[] | undefined]>): string {
  const lines: string[] = ['---'];
  for (const [key, value] of fields) {
    if (value === undefined || value === '') continue;
    if (typeof value === 'boolean') lines.push(`${key}: ${value}`);
    else if (Array.isArray(value)) {
      if (value.length === 0) continue;
      lines.push(`${key}:`);
      for (const item of value) lines.push(`  - ${y(item)}`);
    } else lines.push(`${key}: ${y(value)}`);
  }
  lines.push('---', '');
  return lines.join('\n');
}

export function serializeWallEntry(e: { title: string; level: 'clb7' | 'clb5'; createdAt: string; images: string[] }): string {
  return frontmatter([
    ['title', e.title],
    ['clbLevel', e.level],
    ['createdAt', e.createdAt],
    ['images', e.images],
  ]);
}

export type AnnouncementDraft = {
  folder: AnnouncementFolder;
  title: string;
  featured: boolean;
  createdAt: string;
  images: string[];
  link?: string;
  buttonText?: string;
  // webinar
  webinarDate?: string;
  webinarTime?: string;
  description?: string;
  // discount
  discountAmount?: string;
  couponCode?: string;
  expiryDate?: string;
  // result story
  studentName?: string;
  achievement?: string;
  quote?: string;
  // news
  body?: string;
};

export function serializeAnnouncement(d: AnnouncementDraft): string {
  const common: Array<[string, string | boolean | string[] | undefined]> = [
    ['title', d.title],
    ['featured', d.featured],
  ];
  const tail: Array<[string, string | boolean | string[] | undefined]> = [
    ['images', d.images],
    ['link', d.link],
    ['buttonText', d.buttonText],
    ['createdAt', d.createdAt],
  ];
  let mid: Array<[string, string | boolean | string[] | undefined]> = [];
  if (d.folder === 'webinars') {
    mid = [
      ['webinarDate', d.webinarDate],
      ['webinarTime', d.webinarTime],
      ['description', d.description],
    ];
  } else if (d.folder === 'discounts') {
    mid = [
      ['discountAmount', d.discountAmount],
      ['couponCode', d.couponCode],
      ['expiryDate', d.expiryDate],
      ['description', d.description],
    ];
  } else if (d.folder === 'results') {
    mid = [
      ['studentName', d.studentName],
      ['achievement', d.achievement],
      ['quote', d.quote],
    ];
  }
  const fm = frontmatter([...common, ...mid, ...tail]);
  return d.folder === 'news' ? fm + (d.body ?? '').trim() + '\n' : fm;
}

export function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'entry'
  );
}
