// next-site/lib/announcements.ts
// Read at build time only. Do not import from client components.

export type AnnouncementType = 'webinar' | 'discount' | 'result' | 'news';

interface AnnouncementBase {
  slug: string;
  title: string;
  featured: boolean;
  images: string[];
  link?: string;
  buttonText?: string;
  createdAt: string; // ISO date YYYY-MM-DD
}

export interface WebinarAnnouncement extends AnnouncementBase {
  type: 'webinar';
  webinarDate: string;
  webinarTime: string;
  description?: string;
}

export interface DiscountAnnouncement extends AnnouncementBase {
  type: 'discount';
  discountAmount: string;
  couponCode?: string;
  expiryDate?: string;
  description?: string;
}

export interface ResultAnnouncement extends AnnouncementBase {
  type: 'result';
  studentName: string;
  achievement: string;
  quote?: string;
}

export interface NewsAnnouncement extends AnnouncementBase {
  type: 'news';
  body: string;
}

export type Announcement =
  | WebinarAnnouncement
  | DiscountAnnouncement
  | ResultAnnouncement
  | NewsAnnouncement;

export const TYPE_LABELS: Record<AnnouncementType, string> = {
  webinar: 'Webinar',
  discount: 'Discount',
  result: 'Result',
  news: 'News',
};

export const DEFAULT_BUTTON_TEXT: Record<AnnouncementType, string> = {
  webinar: 'Register Now',
  discount: 'Claim Offer',
  result: 'Read Story',
  news: 'Read More',
};

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'announcements');

function parseFile(filePath: string): Announcement | null {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const slug = path.basename(filePath, '.md');

  // Validate the type field first
  const type = data.type as AnnouncementType | undefined;
  if (!type || !['webinar', 'discount', 'result', 'news'].includes(type)) {
    console.warn(`[announcements] Skipping ${slug}: invalid or missing 'type' field`);
    return null;
  }

  const base = {
    slug,
    title: String(data.title ?? ''),
    featured: Boolean(data.featured),
    images: Array.isArray(data.images) ? data.images.map(String) : [],
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
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => path.join(CONTENT_DIR, f));

  const items = files
    .map(parseFile)
    .filter((a): a is Announcement => a !== null);

  // Newest first by createdAt (lexicographic sort works on YYYY-MM-DD)
  items.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return items;
}

export function getFeaturedAnnouncement(): Announcement | null {
  const all = getAllAnnouncements();
  // Featured wins; if multiple, the most recent (already sorted newest first) wins
  return all.find((a) => a.featured) ?? null;
}

export function getNonFeaturedAnnouncements(): Announcement[] {
  const all = getAllAnnouncements();
  const featured = getFeaturedAnnouncement();
  if (!featured) return all;
  return all.filter((a) => a.slug !== featured.slug);
}
