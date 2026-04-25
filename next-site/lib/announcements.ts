// Server-only loader. Do not import from client components.

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type {
  Announcement,
  AnnouncementType,
} from './announcements-types';

export * from './announcements-types';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'announcements');

const TYPE_FOLDERS: Array<{ folder: string; type: AnnouncementType }> = [
  { folder: 'webinars', type: 'webinar' },
  { folder: 'discounts', type: 'discount' },
  { folder: 'results', type: 'result' },
  { folder: 'news', type: 'news' },
];

function buildAnnouncement(
  slug: string,
  type: AnnouncementType,
  data: Record<string, unknown>,
  content: string
): Announcement | null {
  const base = {
    slug,
    title: String(data.title ?? ''),
    featured: Boolean(data.featured),
    images: Array.isArray(data.images) ? (data.images as unknown[]).map(String) : [],
    link: data.link ? String(data.link) : undefined,
    buttonText: data.buttonText ? String(data.buttonText) : undefined,
    createdAt: String(data.createdAt ?? ''),
  };

  switch (type) {
    case 'webinar':
      return {
        ...base,
        type,
        webinarDate: String(data.webinarDate ?? ''),
        webinarTime: String(data.webinarTime ?? ''),
        description: data.description ? String(data.description) : undefined,
      };
    case 'discount':
      return {
        ...base,
        type,
        discountAmount: String(data.discountAmount ?? ''),
        couponCode: data.couponCode ? String(data.couponCode) : undefined,
        expiryDate: data.expiryDate ? String(data.expiryDate) : undefined,
        description: data.description ? String(data.description) : undefined,
      };
    case 'result':
      return {
        ...base,
        type,
        studentName: String(data.studentName ?? ''),
        achievement: String(data.achievement ?? ''),
        quote: data.quote ? String(data.quote) : undefined,
      };
    case 'news':
      return { ...base, type, body: content.trim() };
  }
}

export function getAllAnnouncements(): Announcement[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const items: Announcement[] = [];

  for (const { folder, type } of TYPE_FOLDERS) {
    const dir = path.join(CONTENT_DIR, folder);
    if (!fs.existsSync(dir)) continue;
    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .map((f) => path.join(dir, f));

    for (const filePath of files) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);
      const slug = path.basename(filePath, '.md');
      const parsed = buildAnnouncement(slug, type, data, content);
      if (parsed) items.push(parsed);
    }
  }

  items.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return items;
}

export function getFeaturedAnnouncement(): Announcement | null {
  const all = getAllAnnouncements();
  return all.find((a) => a.featured) ?? null;
}

export function getNonFeaturedAnnouncements(): Announcement[] {
  const all = getAllAnnouncements();
  const featured = getFeaturedAnnouncement();
  if (!featured) return all;
  return all.filter((a) => a.slug !== featured.slug);
}
