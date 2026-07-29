/**
 * Student support ticket system — shared constants.
 *
 * Storage is deliberately bounded so this can never run up a bill. Screenshots
 * are compressed in the student's browser before upload (see TicketForm), then
 * capped again on the server. Everything lives in one free-tier Postgres.
 */

export const STATUSES = ['new', 'in_progress', 'waiting_on_student', 'resolved'] as const;
export type Status = (typeof STATUSES)[number];

export const STATUS_LABELS: Record<Status, string> = {
  new: 'New',
  in_progress: 'In progress',
  waiting_on_student: 'Waiting on student',
  resolved: 'Resolved',
};

export const STATUS_CLASSES: Record<Status, string> = {
  new: 'bg-blue-50 text-blue-700',
  in_progress: 'bg-amber-50 text-amber-700',
  waiting_on_student: 'bg-purple-50 text-purple-700',
  resolved: 'bg-green-50 text-green-700',
};

export const PRIORITIES = ['normal', 'high'] as const;
export type Priority = (typeof PRIORITIES)[number];

export const CATEGORIES = [
  'Course access or login',
  'Payment or invoice',
  'Live class or schedule',
  'Course content or material',
  'Certificate or exam',
  'Technical problem',
  'Something else',
] as const;

export const SUPPORT_EMAIL = 'Admin@frenchifywithvyom.com';

/** Shared by account creation and sign-in, so a stored address always matches. */
export const MAX_EMAIL = 180;

/**
 * bcrypt only reads the first 72 bytes. Left unbounded, two passwords sharing
 * a 72-byte prefix authenticate identically and a "change" that only alters a
 * later character silently leaves the credential as it was.
 */
export const MAX_PASSWORD = 72;

/** Longest edge a stored screenshot is allowed, in pixels. */
export const MAX_IMAGE_EDGE = 1600;

/** Quality passed to the browser's WebP encoder. */
export const IMAGE_QUALITY = 0.72;

/**
 * Decoded-size guard. File size alone does not bound memory: a heavily
 * compressed PNG can be a few hundred KB and still decode to hundreds of
 * megapixels. Generous enough for a full-resolution phone screenshot.
 */
export const MAX_PIXEL_EDGE = 6000;
export const MAX_PIXELS = 12_000_000;

/** Hard ceiling per stored image after compression. */
export const MAX_IMAGE_BYTES = 400 * 1024;

/** Screenshots per ticket. */
export const MAX_IMAGES = 3;

/**
 * Total screenshot bytes the system will hold. Well under the free Postgres
 * allowance, so uploads start refusing long before anything could be charged.
 * Raise it only after checking the plan's actual limit.
 */
export const STORAGE_CEILING_BYTES = 300 * 1024 * 1024;

/** Flood guard on the public form. */
export const RATE_MAX = 5;
export const RATE_WINDOW_MIN = 15;

export const SESSION_DAYS = 14;
export const SESSION_COOKIE = 'fst_session';
