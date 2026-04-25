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
