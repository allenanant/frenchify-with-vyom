# Frenchify Announcements Page + Decap CMS — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a public `/announcements` page to the Frenchify Next.js site and a Decap CMS dashboard at `/admin` so non-technical users can publish webinar/discount/result/news entries (with optional images) that appear live within ~60 seconds of being approved.

**Architecture:** Markdown files in the repo (`content/announcements/*.md`) are read at build time by Next.js and rendered as static HTML. Decap CMS (loaded as a single static admin page) writes new files to the same repo via Git Gateway, brokered by Netlify Identity for GitHub OAuth. Editorial workflow ON — every publish opens a PR that Allen merges before the rebuild is triggered.

**Tech Stack:** Next.js 15 (App Router, static export), React 19, Tailwind CSS, framer-motion, lucide-react, gray-matter (frontmatter parser), react-markdown (News body renderer), Decap CMS v3 (admin UI), Netlify Identity (OAuth broker).

**Spec:** `docs/specs/2026-04-25-announcement-page-design.md`

**Working directory for all paths below:** `claude-assistant/projects/frenchify-with-vyom/next-site/` (relative to repo root). Treat that as `.` for the rest of this plan.

**Branding note:** The actual Tailwind config defines `brand-blue: #2563eb` and `brand-amber: #f59e0b`. Use those tokens (`text-brand-blue`, `bg-brand-amber`, `bg-brand-gradient`) — do **not** hard-code hex values in components.

---

## File Structure

**New files:**

| Path | Responsibility |
|---|---|
| `lib/announcements.ts` | TypeScript types + reads/parses Markdown files at build time |
| `app/announcements/page.tsx` | Server component — loads data + renders shell |
| `app/announcements/AnnouncementsClient.tsx` | Client component — filter state + grid render |
| `components/announcements/FeaturedCard.tsx` | Hero card for the featured announcement |
| `components/announcements/AnnouncementCard.tsx` | Single grid card |
| `components/announcements/ImageCarousel.tsx` | Auto-rotating image carousel (used by both card components) |
| `components/announcements/FilterPills.tsx` | Type filter pills row |
| `components/announcements/TypeBadge.tsx` | Color-coded type badge (DRY: used by both cards) |
| `content/announcements/.gitkeep` | Keeps folder under version control |
| `content/announcements/2026-04-25-tef-canada-webinar.md` | Seed: webinar example |
| `content/announcements/2026-04-23-summer-discount.md` | Seed: discount example |
| `content/announcements/2026-04-20-priya-result.md` | Seed: result example |
| `content/announcements/2026-04-18-new-syllabus.md` | Seed: news example |
| `public/admin/index.html` | Decap CMS bootstrap page |
| `public/admin/config.yml` | Decap CMS collection schema |
| `public/announcements/.gitkeep` | Image upload destination |
| `scripts/check-announcements.mjs` | One-off Node script to validate the data loader |

**Modified files:**

| Path | Change |
|---|---|
| `package.json` | Add deps: `gray-matter`, `react-markdown` |
| `components/Header.tsx` | Add "Announcements" entry to `navLinks` |
| `app/layout.tsx` | Inject Netlify Identity widget script (only at build with identity enabled) |
| `next.config.mjs` | No change expected unless dev hot-reload of `content/` is needed |

**Untouched (per user rule):** `app/page.tsx` (homepage). Do not modify it.

---

## Task 1: Install dependencies and create folders

**Files:**
- Modify: `package.json`
- Create: `content/announcements/.gitkeep`
- Create: `public/announcements/.gitkeep`
- Create: `components/announcements/` (directory)

- [ ] **Step 1: Install runtime dependencies**

Run from `next-site/`:

```bash
npm install gray-matter react-markdown
```

Expected: `package.json` now lists both packages under `dependencies`.

- [ ] **Step 2: Create the folder structure**

Run from `next-site/`:

```bash
mkdir -p content/announcements public/announcements components/announcements app/announcements scripts
echo "" > content/announcements/.gitkeep
echo "" > public/announcements/.gitkeep
```

Expected: Empty folders exist with `.gitkeep` placeholders.

- [ ] **Step 3: Verify install**

Run:

```bash
npm run build
```

Expected: Existing build still passes (no code changes yet, just deps).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json content/announcements/.gitkeep public/announcements/.gitkeep
git commit -m "chore(announcements): add gray-matter + react-markdown deps and folders"
```

---

## Task 2: Define Announcement TypeScript types

**Files:**
- Create: `lib/announcements.ts`

- [ ] **Step 1: Create the types-only stub file**

Create `lib/announcements.ts` with the following content:

```typescript
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
```

- [ ] **Step 2: Type-check it**

Run:

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add lib/announcements.ts
git commit -m "feat(announcements): add TypeScript types for announcement records"
```

---

## Task 3: Implement the Markdown data loader

**Files:**
- Modify: `lib/announcements.ts` (append loader functions)
- Create: `scripts/check-announcements.mjs`

- [ ] **Step 1: Append loader functions to `lib/announcements.ts`**

Add to the end of `lib/announcements.ts`:

```typescript
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
```

- [ ] **Step 2: Create the verification script**

Create `scripts/check-announcements.mjs`:

```javascript
// scripts/check-announcements.mjs
// Run with: node scripts/check-announcements.mjs
// Validates that all .md files in content/announcements/ parse correctly.

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'announcements');
const VALID_TYPES = ['webinar', 'discount', 'result', 'news'];

if (!fs.existsSync(CONTENT_DIR)) {
  console.error(`Missing folder: ${CONTENT_DIR}`);
  process.exit(1);
}

const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));
let errors = 0;

for (const f of files) {
  const filePath = path.join(CONTENT_DIR, f);
  const { data } = matter(fs.readFileSync(filePath, 'utf-8'));

  const checks = [
    { ok: typeof data.title === 'string' && data.title.length > 0, msg: 'missing title' },
    { ok: VALID_TYPES.includes(data.type), msg: `invalid type "${data.type}"` },
    { ok: typeof data.createdAt === 'string', msg: 'missing createdAt' },
    { ok: !data.images || Array.isArray(data.images), msg: 'images must be a list' },
  ];

  const failed = checks.filter((c) => !c.ok);
  if (failed.length > 0) {
    console.error(`✗ ${f}: ${failed.map((c) => c.msg).join(', ')}`);
    errors++;
  } else {
    console.log(`✓ ${f}`);
  }
}

if (errors > 0) {
  console.error(`\n${errors} file(s) failed validation`);
  process.exit(1);
}

console.log(`\nAll ${files.length} announcement file(s) validated successfully`);
```

- [ ] **Step 3: Run validation (will pass with 0 files)**

Run from `next-site/`:

```bash
node scripts/check-announcements.mjs
```

Expected output: `All 0 announcement file(s) validated successfully`

- [ ] **Step 4: Type-check**

Run:

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add lib/announcements.ts scripts/check-announcements.mjs
git commit -m "feat(announcements): add Markdown data loader with type-safe parsing"
```

---

## Task 4: Seed four example announcements (one per type)

**Files:**
- Create: `content/announcements/2026-04-25-tef-canada-webinar.md`
- Create: `content/announcements/2026-04-23-summer-discount.md`
- Create: `content/announcements/2026-04-20-priya-result.md`
- Create: `content/announcements/2026-04-18-new-syllabus.md`

These exist so the page renders something during dev. They can be deleted later via the dashboard.

- [ ] **Step 1: Create the webinar seed**

`content/announcements/2026-04-25-tef-canada-webinar.md`:

```yaml
---
title: "Free TEF Canada Webinar with Vyom"
type: "webinar"
featured: true
images:
  - "/announcements/placeholder-webinar.jpg"
link: "https://frenchifywithvyom.com/sunday-webinar"
buttonText: "Register Now"
webinarDate: "2026-05-10"
webinarTime: "7:00 PM IST"
description: "Learn how to crack TEF Canada B2 in 90 days. Live Q&A at the end."
createdAt: "2026-04-25"
---
```

- [ ] **Step 2: Create the discount seed**

`content/announcements/2026-04-23-summer-discount.md`:

```yaml
---
title: "Summer Special: 20% Off A1 Intensive"
type: "discount"
featured: false
images: []
link: "https://frenchifywithvyom.com/a1-intensive-program"
buttonText: "Claim Offer"
discountAmount: "20% off"
couponCode: "SUMMER20"
expiryDate: "2026-06-30"
description: "Limited-time offer for new A1 Intensive students."
createdAt: "2026-04-23"
---
```

- [ ] **Step 3: Create the result seed**

`content/announcements/2026-04-20-priya-result.md`:

```yaml
---
title: "Priya cracked B2 in 4 months"
type: "result"
featured: false
images:
  - "/announcements/placeholder-result.jpg"
link: "https://frenchifywithvyom.com/results-page"
buttonText: "Read Story"
studentName: "Priya Sharma"
achievement: "B2 cracked in 4 months"
quote: "Vyom's method made grammar finally click for me."
createdAt: "2026-04-20"
---
```

- [ ] **Step 4: Create the news seed**

`content/announcements/2026-04-18-new-syllabus.md`:

```markdown
---
title: "Updated A1 Syllabus for 2026"
type: "news"
featured: false
images: []
link: ""
buttonText: "Read More"
createdAt: "2026-04-18"
---

We've refreshed the **A1 Intensive** syllabus to align with the latest CEFR guidelines.

Key changes:

- 12 new dialogue scenarios for daily-life French
- Expanded grammar drills covering passé composé and imparfait
- Live speaking practice doubled from 4 → 8 hours per cohort

[See the full curriculum](https://frenchifywithvyom.com/a1-intensive-program)
```

- [ ] **Step 5: Add placeholder image files (optional but recommended for first build)**

Drop two small placeholder JPGs into `public/announcements/`:
- `placeholder-webinar.jpg` (any 1200×630-ish stock-style image)
- `placeholder-result.jpg` (any portrait-ish image)

If you don't have placeholder images handy, leave the seeds with `images: []` for now and add real images via the dashboard later. To do that, edit the webinar and result seed files to use empty `images: []`.

- [ ] **Step 6: Validate the seeds**

Run from `next-site/`:

```bash
node scripts/check-announcements.mjs
```

Expected output:
```
✓ 2026-04-18-new-syllabus.md
✓ 2026-04-20-priya-result.md
✓ 2026-04-23-summer-discount.md
✓ 2026-04-25-tef-canada-webinar.md

All 4 announcement file(s) validated successfully
```

- [ ] **Step 7: Commit**

```bash
git add content/announcements/ public/announcements/
git commit -m "feat(announcements): seed four example announcements (one per type)"
```

---

## Task 5: Build the TypeBadge component

**Files:**
- Create: `components/announcements/TypeBadge.tsx`

A small reusable badge that shows the type with the right color. Used by both card components — extracting it now keeps the card components DRY.

- [ ] **Step 1: Create the component**

`components/announcements/TypeBadge.tsx`:

```tsx
import { cn } from '@/lib/cn';
import type { AnnouncementType } from '@/lib/announcements';
import { TYPE_LABELS } from '@/lib/announcements';

const COLOR_BY_TYPE: Record<AnnouncementType, string> = {
  webinar: 'bg-blue-100 text-brand-blue ring-blue-200',
  discount: 'bg-amber-100 text-amber-700 ring-amber-200',
  result: 'bg-green-100 text-green-700 ring-green-200',
  news: 'bg-gray-100 text-gray-700 ring-gray-200',
};

interface Props {
  type: AnnouncementType;
  className?: string;
}

export default function TypeBadge({ type, className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ring-1 ring-inset',
        COLOR_BY_TYPE[type],
        className
      )}
    >
      {TYPE_LABELS[type]}
    </span>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/announcements/TypeBadge.tsx
git commit -m "feat(announcements): add TypeBadge component"
```

---

## Task 6: Build the ImageCarousel component

**Files:**
- Create: `components/announcements/ImageCarousel.tsx`

Auto-rotating carousel. If 0 images → renders nothing. If 1 image → static image. If 2+ → rotation + dots + arrow controls. Client component.

- [ ] **Step 1: Create the component**

`components/announcements/ImageCarousel.tsx`:

```tsx
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

interface Props {
  images: string[];
  alt: string;
  /** Aspect ratio class, e.g. 'aspect-[16/9]'. Default 'aspect-[16/9]'. */
  aspect?: string;
  /** ms between auto-advances. Default 4000. Set 0 to disable autoplay. */
  intervalMs?: number;
  className?: string;
}

export default function ImageCarousel({
  images,
  alt,
  aspect = 'aspect-[16/9]',
  intervalMs = 4000,
  className,
}: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || intervalMs === 0 || paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs, paused]);

  if (images.length === 0) return null;

  return (
    <div
      className={cn('relative w-full overflow-hidden rounded-2xl bg-gray-100', aspect, className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, i) => (
        <div
          key={src + i}
          className={cn(
            'absolute inset-0 transition-opacity duration-700',
            i === index ? 'opacity-100' : 'opacity-0'
          )}
          aria-hidden={i !== index}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-brand-ink rounded-full p-2 shadow-md backdrop-blur transition-all opacity-0 hover:opacity-100 focus:opacity-100 group-hover:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % images.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-brand-ink rounded-full p-2 shadow-md backdrop-blur transition-all opacity-0 hover:opacity-100 focus:opacity-100 group-hover:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  i === index ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
                )}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/announcements/ImageCarousel.tsx
git commit -m "feat(announcements): add ImageCarousel with autoplay + manual controls"
```

---

## Task 7: Build the AnnouncementCard component

**Files:**
- Create: `components/announcements/AnnouncementCard.tsx`

The grid card. Type-specific content rendered inline based on the discriminated union.

- [ ] **Step 1: Create the component**

`components/announcements/AnnouncementCard.tsx`:

```tsx
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import type { Announcement } from '@/lib/announcements';
import { DEFAULT_BUTTON_TEXT } from '@/lib/announcements';
import TypeBadge from './TypeBadge';
import ImageCarousel from './ImageCarousel';

interface Props {
  announcement: Announcement;
}

function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function AnnouncementCard({ announcement: a }: Props) {
  const buttonLabel = a.buttonText || DEFAULT_BUTTON_TEXT[a.type];

  return (
    <article className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-premium transition-all duration-300 border border-gray-100 hover:-translate-y-1">
      {a.images.length > 0 && (
        <ImageCarousel images={a.images} alt={a.title} aspect="aspect-[16/10]" />
      )}

      <div className="flex flex-col flex-grow p-6 gap-4">
        <div className="flex items-center justify-between">
          <TypeBadge type={a.type} />
          <span className="text-xs text-gray-400">{formatDate(a.createdAt)}</span>
        </div>

        <h3 className="text-lg font-bold text-brand-ink leading-snug line-clamp-2">{a.title}</h3>

        {a.type === 'webinar' && (
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <span className="font-semibold text-brand-blue">{formatDate(a.webinarDate)}</span>
              {a.webinarTime && <span className="ml-2">· {a.webinarTime}</span>}
            </p>
            {a.description && <p className="line-clamp-3">{a.description}</p>}
          </div>
        )}

        {a.type === 'discount' && (
          <div className="text-sm text-gray-600 space-y-1.5">
            <p className="text-2xl font-bold text-amber-600">{a.discountAmount}</p>
            {a.couponCode && (
              <p>
                Code:{' '}
                <span className="font-mono font-semibold bg-amber-50 text-amber-700 px-2 py-0.5 rounded">
                  {a.couponCode}
                </span>
              </p>
            )}
            {a.expiryDate && (
              <p className="text-xs text-gray-500">Valid till {formatDate(a.expiryDate)}</p>
            )}
            {a.description && <p className="line-clamp-2">{a.description}</p>}
          </div>
        )}

        {a.type === 'result' && (
          <div className="text-sm text-gray-600 space-y-1.5">
            <p className="font-semibold text-brand-ink">{a.studentName}</p>
            <p className="text-green-700 font-medium">{a.achievement}</p>
            {a.quote && (
              <blockquote className="text-gray-500 italic line-clamp-3">"{a.quote}"</blockquote>
            )}
          </div>
        )}

        {a.type === 'news' && (
          <div className="text-sm text-gray-600 line-clamp-3 prose prose-sm max-w-none">
            <ReactMarkdown>{a.body}</ReactMarkdown>
          </div>
        )}

        {a.link && (
          <div className="mt-auto pt-2">
            <Link
              href={a.link}
              className="inline-flex items-center justify-center w-full bg-brand-blue text-white px-4 py-2.5 rounded-full font-semibold text-sm hover:bg-brand-blue-deep transition-all"
            >
              {buttonLabel}
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/announcements/AnnouncementCard.tsx
git commit -m "feat(announcements): add AnnouncementCard with type-specific rendering"
```

---

## Task 8: Build the FeaturedCard component

**Files:**
- Create: `components/announcements/FeaturedCard.tsx`

The big hero version of the card. Same data, more breathing room. Image left + content right on desktop, stacked on mobile.

- [ ] **Step 1: Create the component**

`components/announcements/FeaturedCard.tsx`:

```tsx
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import type { Announcement } from '@/lib/announcements';
import { DEFAULT_BUTTON_TEXT } from '@/lib/announcements';
import TypeBadge from './TypeBadge';
import ImageCarousel from './ImageCarousel';

interface Props {
  announcement: Announcement;
}

function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function FeaturedCard({ announcement: a }: Props) {
  const buttonLabel = a.buttonText || DEFAULT_BUTTON_TEXT[a.type];

  return (
    <article className="bg-white rounded-3xl overflow-hidden shadow-premium border border-gray-100">
      <div className="grid lg:grid-cols-2 gap-0">
        {a.images.length > 0 ? (
          <ImageCarousel
            images={a.images}
            alt={a.title}
            aspect="aspect-[16/10] lg:aspect-auto lg:h-full"
            className="lg:rounded-r-none"
          />
        ) : (
          <div className="hidden lg:block bg-brand-gradient-soft" aria-hidden />
        )}

        <div className="flex flex-col gap-5 p-8 lg:p-10">
          <div className="flex items-center gap-3">
            <TypeBadge type={a.type} />
            <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
              Featured
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-display font-bold text-brand-ink leading-tight">
            {a.title}
          </h2>

          {a.type === 'webinar' && (
            <div className="text-base text-gray-700 space-y-2">
              <p>
                <span className="font-bold text-brand-blue text-lg">{formatDate(a.webinarDate)}</span>
                {a.webinarTime && <span className="ml-3 text-gray-600">· {a.webinarTime}</span>}
              </p>
              {a.description && <p>{a.description}</p>}
            </div>
          )}

          {a.type === 'discount' && (
            <div className="text-base text-gray-700 space-y-2">
              <p className="text-4xl font-bold text-amber-600">{a.discountAmount}</p>
              {a.couponCode && (
                <p>
                  Use code:{' '}
                  <span className="font-mono font-bold bg-amber-50 text-amber-700 px-3 py-1 rounded-lg">
                    {a.couponCode}
                  </span>
                </p>
              )}
              {a.expiryDate && (
                <p className="text-sm text-gray-500">Valid till {formatDate(a.expiryDate)}</p>
              )}
              {a.description && <p>{a.description}</p>}
            </div>
          )}

          {a.type === 'result' && (
            <div className="text-base text-gray-700 space-y-2">
              <p className="text-xl font-semibold text-brand-ink">{a.studentName}</p>
              <p className="text-green-700 font-medium text-lg">{a.achievement}</p>
              {a.quote && (
                <blockquote className="text-gray-600 italic border-l-4 border-green-400 pl-4">
                  "{a.quote}"
                </blockquote>
              )}
            </div>
          )}

          {a.type === 'news' && (
            <div className="prose prose-base max-w-none text-gray-700">
              <ReactMarkdown>{a.body}</ReactMarkdown>
            </div>
          )}

          {a.link && (
            <div className="pt-2">
              <Link
                href={a.link}
                className="inline-flex items-center bg-brand-blue text-white px-7 py-3 rounded-full font-semibold hover:bg-brand-blue-deep hover:-translate-y-0.5 hover:shadow-glow-blue transition-all duration-300"
              >
                {buttonLabel}
              </Link>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/announcements/FeaturedCard.tsx
git commit -m "feat(announcements): add FeaturedCard hero component"
```

---

## Task 9: Build the FilterPills component

**Files:**
- Create: `components/announcements/FilterPills.tsx`

Client component. Five pills. Active state styled with brand color.

- [ ] **Step 1: Create the component**

`components/announcements/FilterPills.tsx`:

```tsx
'use client';

import { cn } from '@/lib/cn';
import type { AnnouncementType } from '@/lib/announcements';
import { TYPE_LABELS } from '@/lib/announcements';

export type FilterValue = 'all' | AnnouncementType;

interface Props {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
  counts: Record<FilterValue, number>;
}

const ORDER: FilterValue[] = ['all', 'webinar', 'discount', 'result', 'news'];

const LABELS: Record<FilterValue, string> = {
  all: 'All',
  webinar: TYPE_LABELS.webinar,
  discount: TYPE_LABELS.discount,
  result: TYPE_LABELS.result,
  news: TYPE_LABELS.news,
};

export default function FilterPills({ value, onChange, counts }: Props) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {ORDER.map((v) => {
        const isActive = v === value;
        return (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            className={cn(
              'inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all',
              isActive
                ? 'bg-brand-blue text-white shadow-md shadow-blue-200'
                : 'bg-white text-gray-700 hover:bg-blue-50 ring-1 ring-gray-200'
            )}
            aria-pressed={isActive}
          >
            {LABELS[v]}
            <span
              className={cn(
                'inline-flex items-center justify-center min-w-[1.5rem] h-5 px-1.5 rounded-full text-xs font-bold',
                isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
              )}
            >
              {counts[v]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/announcements/FilterPills.tsx
git commit -m "feat(announcements): add FilterPills component"
```

---

## Task 10: Build the AnnouncementsClient component

**Files:**
- Create: `app/announcements/AnnouncementsClient.tsx`

Holds the filter state and renders the filtered grid. Receives all data as a prop from the server component (so the data fetch stays at build time).

- [ ] **Step 1: Create the component**

`app/announcements/AnnouncementsClient.tsx`:

```tsx
'use client';

import { useMemo, useState } from 'react';
import type { Announcement } from '@/lib/announcements';
import AnnouncementCard from '@/components/announcements/AnnouncementCard';
import FilterPills, { type FilterValue } from '@/components/announcements/FilterPills';

interface Props {
  items: Announcement[];
}

export default function AnnouncementsClient({ items }: Props) {
  const [filter, setFilter] = useState<FilterValue>('all');

  const counts = useMemo(() => {
    const c: Record<FilterValue, number> = {
      all: items.length,
      webinar: 0,
      discount: 0,
      result: 0,
      news: 0,
    };
    for (const a of items) c[a.type]++;
    return c;
  }, [items]);

  const filtered = useMemo(
    () => (filter === 'all' ? items : items.filter((a) => a.type === filter)),
    [items, filter]
  );

  return (
    <>
      <div className="mb-10">
        <FilterPills value={filter} onChange={setFilter} counts={counts} />
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <AnnouncementCard key={a.slug} announcement={a} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg">No {filter === 'all' ? 'announcements' : filter + 's'} right now — check back soon.</p>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add app/announcements/AnnouncementsClient.tsx
git commit -m "feat(announcements): add AnnouncementsClient with filter state"
```

---

## Task 11: Build the announcements page

**Files:**
- Create: `app/announcements/page.tsx`

Server component. Reads all announcements at build time, passes them to the client component, renders the page chrome (hero + featured + grid).

- [ ] **Step 1: Create the page**

`app/announcements/page.tsx`:

```tsx
import type { Metadata } from 'next';
import {
  getFeaturedAnnouncement,
  getNonFeaturedAnnouncements,
  getAllAnnouncements,
} from '@/lib/announcements';
import FeaturedCard from '@/components/announcements/FeaturedCard';
import AnnouncementsClient from './AnnouncementsClient';

export const metadata: Metadata = {
  title: 'Announcements & Updates · Frenchify with Vyom',
  description:
    'Latest webinars, discounts, student results, and news from Frenchify with Vyom.',
};

export default function AnnouncementsPage() {
  const featured = getFeaturedAnnouncement();
  const all = getAllAnnouncements();
  const rest = getNonFeaturedAnnouncements();

  return (
    <div className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-blue-50/40 via-white to-white">
      <div className="max-w-[1170px] mx-auto px-6">
        <header className="text-center mb-12 lg:mb-16">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-blue font-bold mb-3">
            Stay In The Loop
          </span>
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-brand-ink leading-tight">
            Announcements & Updates
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Upcoming webinars, current offers, recent student wins, and what's new at Frenchify.
          </p>
        </header>

        {featured && (
          <section className="mb-16" aria-label="Featured announcement">
            <FeaturedCard announcement={featured} />
          </section>
        )}

        {all.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">No announcements yet — check back soon.</p>
          </div>
        ) : (
          <section aria-label="All announcements">
            <AnnouncementsClient items={rest.length > 0 ? rest : all} />
          </section>
        )}
      </div>
    </div>
  );
}
```

> **Note:** `app/layout.tsx` already wraps `children` in a `<main>` tag, so the page itself uses a `<div>` to avoid nesting `<main>` inside `<main>`.

> **Note on the `rest.length > 0 ? rest : all` fallback:** if the only announcement is featured, the grid would be empty. In that case, show all (which is just the one featured) so the filter pills still work and visitors see something below.

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Build the site to confirm static export works**

```bash
npm run build
```

Expected: Build completes successfully. No errors. Look for `app/announcements` in the output.

- [ ] **Step 4: Commit**

```bash
git add app/announcements/page.tsx
git commit -m "feat(announcements): add /announcements page (server component)"
```

---

## Task 12: Add "Announcements" to the header nav

**Files:**
- Modify: `components/Header.tsx` (the `navLinks` array)

- [ ] **Step 1: Update the navLinks array**

In `components/Header.tsx`, find the `navLinks` array (around line 11) and insert the new entry between `Programs` and `About Us`:

Current:
```tsx
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/programs', label: 'Courses' },
  { href: '/about-us', label: 'About Us' },
  { href: '/results-page', label: 'Results' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/faq', label: 'FAQs' },
  { href: '/contact', label: 'Book a Meet' },
];
```

Replace with:
```tsx
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/programs', label: 'Courses' },
  { href: '/announcements', label: 'Announcements' },
  { href: '/about-us', label: 'About Us' },
  { href: '/results-page', label: 'Results' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/faq', label: 'FAQs' },
  { href: '/contact', label: 'Book a Meet' },
];
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/Header.tsx
git commit -m "feat(announcements): add Announcements link to header nav"
```

---

## Task 13: Manual verification in dev server

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Expected: Server starts at `http://localhost:3000`.

- [ ] **Step 2: Visit homepage and click "Announcements" in the nav**

Open `http://localhost:3000`. Verify the new "Announcements" link appears in the desktop and mobile navs. Click it → land on `/announcements/`.

- [ ] **Step 3: Verify the featured card renders correctly**

The "Free TEF Canada Webinar" should appear at the top as the featured card with a webinar badge, date "10 May 2026", and a "Register Now" button.

- [ ] **Step 4: Verify all 4 type cards render in the grid**

You should see 3 cards in the grid below the featured (the discount, the result, and the news — the webinar is featured so it's not duplicated below).

- [ ] **Step 5: Verify each filter pill works**

Click each pill in turn:
- `All` → 3 cards
- `Webinars` → 0 cards (the only webinar is featured) → empty state shows "No webinars right now..."
- `Discounts` → 1 card (Summer Special)
- `Results` → 1 card (Priya)
- `News` → 1 card (syllabus update)

- [ ] **Step 6: Verify the discount card shows the coupon code styled correctly**

The "SUMMER20" code should appear in a monospace amber pill.

- [ ] **Step 7: Verify the news body renders Markdown**

The syllabus card should show **bold** text for "A1 Intensive" and a clickable link.

- [ ] **Step 8: Verify mobile layout (resize browser to 375px wide)**

Cards should stack to 1 column. Featured card should stack image above content. Filter pills should wrap.

- [ ] **Step 9: Open the announcements page in production build mode**

Stop dev server (Ctrl+C). Then:

```bash
npm run build
npm run start
```

Open `http://localhost:3000/announcements/`. Confirm everything still renders. Static export should work fine.

- [ ] **Step 10: If anything looks broken — fix it before continuing**

Common fixes:
- **Images not loading:** add the placeholder JPGs to `public/announcements/` or remove them from the seed `images:` arrays
- **Markdown not rendering as text:** confirm `react-markdown` is installed
- **Type errors:** re-run `npx tsc --noEmit` and address them

No commit for this task — it's verification only.

---

## Task 14: Create the Decap CMS admin entry HTML

**Files:**
- Create: `public/admin/index.html`

Decap CMS is loaded as a single static page. No build step. The HTML mounts the React-based CMS UI which reads our `config.yml`.

- [ ] **Step 1: Create the file**

`public/admin/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Frenchify Admin · Manage Announcements</title>
    <meta name="robots" content="noindex" />
    <link rel="icon" href="/favicon.ico" />
  </head>
  <body>
    <!-- Netlify Identity widget — required for OAuth login -->
    <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>

    <!-- Decap CMS -->
    <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>

    <script>
      // Redirect users back to /admin/ after Netlify Identity confirmation links
      if (window.netlifyIdentity) {
        window.netlifyIdentity.on('init', (user) => {
          if (!user) {
            window.netlifyIdentity.on('login', () => {
              document.location.href = '/admin/';
            });
          }
        });
      }
    </script>
  </body>
</html>
```

- [ ] **Step 2: Verify the file is served**

Run dev server:

```bash
npm run dev
```

Open `http://localhost:3000/admin/`. You should see the Decap CMS login UI (it will fail to load the config until Task 15, but the page should render).

Stop the dev server.

- [ ] **Step 3: Commit**

```bash
git add public/admin/index.html
git commit -m "feat(admin): add Decap CMS admin entry HTML"
```

---

## Task 15: Create the Decap CMS config.yml with four-collection schema

**Files:**
- Create: `public/admin/config.yml`
- Modify: `lib/announcements.ts` (loader needs to read 4 sub-folders)
- Modify: existing seed files (move into sub-folders)

> **Why this approach:** Vanilla Decap CMS does **not** support `condition:` (visibility-based-on-other-fields). To deliver "the form changes based on the type you pick" cleanly, the standard Decap pattern is to define **four separate collections** — one per type. The sidebar shows: Webinars, Discounts, Results, News. Each collection has only the fields relevant to its type. Files all live under `content/announcements/<type>/` so the front-end loader can scan all four sub-folders. The user-facing UX is essentially identical to "form changes based on type" — they pick a sidebar item which IS picking a type.

### Step 1: Restructure `content/announcements/` into sub-folders

Run from `next-site/`:

```bash
mkdir -p content/announcements/webinars content/announcements/discounts content/announcements/results content/announcements/news
git mv content/announcements/2026-04-25-tef-canada-webinar.md content/announcements/webinars/
git mv content/announcements/2026-04-23-summer-discount.md content/announcements/discounts/
git mv content/announcements/2026-04-20-priya-result.md content/announcements/results/
git mv content/announcements/2026-04-18-new-syllabus.md content/announcements/news/
```

(If `git mv` fails because the seed step skipped them, just create the folders.)

### Step 2: Update `lib/announcements.ts` loader to scan all four sub-folders

In `lib/announcements.ts`, replace the `getAllAnnouncements` function with:

```typescript
const TYPE_FOLDERS: Array<{ folder: string; type: AnnouncementType }> = [
  { folder: 'webinars', type: 'webinar' },
  { folder: 'discounts', type: 'discount' },
  { folder: 'results', type: 'result' },
  { folder: 'news', type: 'news' },
];

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
      // The loader infers the type from the folder, so files don't need a type field
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
```

Also delete the old `parseFile` function (it's replaced by the inline logic + `buildAnnouncement`).

### Step 3: Update each seed file to remove the `type:` line

Since the type is now inferred from the folder, edit each seed file in `content/announcements/<folder>/` and **delete** the `type:` line from the frontmatter. Example for `webinars/2026-04-25-tef-canada-webinar.md` — remove this line:

```yaml
type: "webinar"
```

Repeat for the other three seed files.

### Step 4: Update `scripts/check-announcements.mjs` to scan sub-folders

Replace the script body with:

```javascript
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'announcements');
const TYPES = ['webinars', 'discounts', 'results', 'news'];

if (!fs.existsSync(CONTENT_DIR)) {
  console.error(`Missing folder: ${CONTENT_DIR}`);
  process.exit(1);
}

let total = 0;
let errors = 0;

for (const folder of TYPES) {
  const dir = path.join(CONTENT_DIR, folder);
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));

  for (const f of files) {
    total++;
    const filePath = path.join(dir, f);
    const { data } = matter(fs.readFileSync(filePath, 'utf-8'));
    const checks = [
      { ok: typeof data.title === 'string' && data.title.length > 0, msg: 'missing title' },
      { ok: typeof data.createdAt === 'string', msg: 'missing createdAt' },
      { ok: !data.images || Array.isArray(data.images), msg: 'images must be a list' },
    ];
    const failed = checks.filter((c) => !c.ok);
    if (failed.length > 0) {
      console.error(`✗ ${folder}/${f}: ${failed.map((c) => c.msg).join(', ')}`);
      errors++;
    } else {
      console.log(`✓ ${folder}/${f}`);
    }
  }
}

if (errors > 0) {
  console.error(`\n${errors} file(s) failed validation`);
  process.exit(1);
}
console.log(`\nAll ${total} announcement file(s) validated successfully`);
```

### Step 5: Run the validator

```bash
node scripts/check-announcements.mjs
```

Expected: 4 entries pass.

### Step 6: Determine the correct base path for Decap

Decap paths are relative to the git repo root. Run from `next-site/`:

```bash
git rev-parse --show-toplevel
```

- If output ends with `next-site` → use `BASE = ""` below (i.e. `content/announcements/...`, `public/announcements`)
- If output ends with `frenchify-with-vyom` → use `BASE = "next-site/"` (i.e. `next-site/content/announcements/...`)

Note which one applies. Substitute the chosen `BASE` value into the config below.

### Step 7: Create `public/admin/config.yml`

Use this template — replace every `BASE` token with either `""` or `"next-site/"` per Step 6:

```yaml
# Decap CMS configuration — Frenchify Announcements
# Docs: https://decapcms.org/docs/configuration-options/

backend:
  name: git-gateway
  branch: main

publish_mode: editorial_workflow

media_folder: "BASEpublic/announcements"
public_folder: "/announcements"

site_url: https://frenchifywithvyom.com
display_url: https://frenchifywithvyom.com
logo_url: https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/681356df3176b96f4b69c47b.png

# Common field fragments are defined inline (Decap doesn't support YAML anchors in all versions)
collections:

  - name: "webinars"
    label: "Webinars"
    label_singular: "Webinar"
    folder: "BASEcontent/announcements/webinars"
    create: true
    delete: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    summary: "{{title}} — {{webinarDate}}"
    sortable_fields: ["createdAt", "webinarDate", "title"]
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Featured? (show as the big card at top of /announcements)", name: "featured", widget: "boolean", default: false }
      - { label: "Webinar Date", name: "webinarDate", widget: "datetime", date_format: "YYYY-MM-DD", time_format: false, format: "YYYY-MM-DD" }
      - { label: "Webinar Time (free text, e.g. 7:00 PM IST)", name: "webinarTime", widget: "string" }
      - { label: "Short Description", name: "description", widget: "text", required: false }
      - { label: "Images (optional, multiple allowed)", name: "images", widget: "list", required: false, field: { label: "Image", name: "image", widget: "image" } }
      - { label: "Registration URL", name: "link", widget: "string", required: false }
      - { label: "Button Text (default: Register Now)", name: "buttonText", widget: "string", required: false }
      - { label: "Created Date (auto)", name: "createdAt", widget: "datetime", date_format: "YYYY-MM-DD", time_format: false, format: "YYYY-MM-DD" }

  - name: "discounts"
    label: "Discounts & Offers"
    label_singular: "Discount"
    folder: "BASEcontent/announcements/discounts"
    create: true
    delete: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    summary: "{{title}} — {{discountAmount}}"
    sortable_fields: ["createdAt", "expiryDate", "title"]
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Featured?", name: "featured", widget: "boolean", default: false }
      - { label: "Discount Amount (e.g. 20% off, ₹500 off)", name: "discountAmount", widget: "string" }
      - { label: "Coupon Code", name: "couponCode", widget: "string", required: false }
      - { label: "Expiry Date", name: "expiryDate", widget: "datetime", date_format: "YYYY-MM-DD", time_format: false, format: "YYYY-MM-DD", required: false }
      - { label: "Short Description", name: "description", widget: "text", required: false }
      - { label: "Images (optional)", name: "images", widget: "list", required: false, field: { label: "Image", name: "image", widget: "image" } }
      - { label: "Link URL", name: "link", widget: "string", required: false }
      - { label: "Button Text (default: Claim Offer)", name: "buttonText", widget: "string", required: false }
      - { label: "Created Date (auto)", name: "createdAt", widget: "datetime", date_format: "YYYY-MM-DD", time_format: false, format: "YYYY-MM-DD" }

  - name: "results"
    label: "Student Results"
    label_singular: "Result"
    folder: "BASEcontent/announcements/results"
    create: true
    delete: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    summary: "{{studentName}} — {{achievement}}"
    sortable_fields: ["createdAt", "studentName", "title"]
    fields:
      - { label: "Title (e.g. \"Priya cracked B2 in 4 months\")", name: "title", widget: "string" }
      - { label: "Featured?", name: "featured", widget: "boolean", default: false }
      - { label: "Student Name", name: "studentName", widget: "string" }
      - { label: "Achievement", name: "achievement", widget: "string" }
      - { label: "Student Quote (optional)", name: "quote", widget: "text", required: false }
      - { label: "Photos (optional)", name: "images", widget: "list", required: false, field: { label: "Image", name: "image", widget: "image" } }
      - { label: "Link URL (optional)", name: "link", widget: "string", required: false }
      - { label: "Button Text (default: Read Story)", name: "buttonText", widget: "string", required: false }
      - { label: "Created Date (auto)", name: "createdAt", widget: "datetime", date_format: "YYYY-MM-DD", time_format: false, format: "YYYY-MM-DD" }

  - name: "news"
    label: "News & Updates"
    label_singular: "News"
    folder: "BASEcontent/announcements/news"
    create: true
    delete: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    summary: "{{title}}"
    sortable_fields: ["createdAt", "title"]
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Featured?", name: "featured", widget: "boolean", default: false }
      - { label: "Body", name: "body", widget: "markdown" }
      - { label: "Images (optional)", name: "images", widget: "list", required: false, field: { label: "Image", name: "image", widget: "image" } }
      - { label: "Link URL (optional)", name: "link", widget: "string", required: false }
      - { label: "Button Text (default: Read More)", name: "buttonText", widget: "string", required: false }
      - { label: "Created Date (auto)", name: "createdAt", widget: "datetime", date_format: "YYYY-MM-DD", time_format: false, format: "YYYY-MM-DD" }
```

> **Important:** the `body` field for the News collection is a top-level frontmatter field above. Decap's `markdown` widget by default writes to the file body, not frontmatter. To match what the loader expects (`body` read from `content`), the News collection field should be the special `body` field. If the saved file has the body inside frontmatter as `body: "..."`, update the loader's news case to read `data.body` instead of `content`. Verify by inspecting one news file after creation in Decap.

### Step 8: Build to confirm everything still parses

```bash
npm run build
```

Expected: Successful build. The /announcements page renders.

### Step 9: Commit

```bash
git add public/admin/config.yml lib/announcements.ts scripts/check-announcements.mjs content/announcements/
git commit -m "feat(admin): add Decap CMS config with four collections (one per type)"
```

---

## Task 16: Wire up Netlify Identity widget on the main site

**Files:**
- Modify: `app/layout.tsx`

The Decap CMS admin page already loads the Netlify Identity widget. We also need it loaded on the main site so users who get an email confirmation link land on a page that hands them off to `/admin/`.

- [ ] **Step 1: Update `app/layout.tsx`**

Find this block in `app/layout.tsx` (around lines 37-42):

```tsx
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
```

Replace with:

```tsx
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          async
        />
      </head>
```

- [ ] **Step 2: Type-check + build**

```bash
npx tsc --noEmit
npm run build
```

Expected: No errors. Build succeeds. There may be a benign React warning about using a `<script>` tag in `<head>` — ignore it; it's intentional.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(admin): wire Netlify Identity widget into root layout"
```

---

## Task 17: One-time Netlify + GitHub OAuth setup (manual ops)

**Files:** none (external service config)

This is the only task that requires actions outside the editor. Walk Ashish through these steps — they are not for an automated agent to execute.

- [ ] **Step 1: Confirm the GitHub repo for the site**

Ask Ashish: "Which GitHub repo does this site live in?" Note the `owner/repo` (e.g. `allenanant/frenchify-with-vyom`).

- [ ] **Step 2: Create a free Netlify account**

Visit `https://app.netlify.com/signup`. Sign up with the GitHub account that owns (or has access to) the repo.

- [ ] **Step 3: Add a "site" in Netlify pointing at the GitHub repo — but DO NOT enable Netlify hosting**

- New site → Import from Git → choose GitHub → pick the repo
- Branch: `main`
- Build command: leave blank (we don't deploy on Netlify; GitHub Pages handles that)
- Publish directory: leave blank

The site will fail to deploy on Netlify — that's fine. We're only using Netlify for Identity, not hosting.

- [ ] **Step 4: Enable Identity on the Netlify site**

- Site settings → Identity → Enable Identity
- Registration preferences → "Invite only" (so randos can't sign up)
- External providers → Enable **GitHub**

- [ ] **Step 5: Enable Git Gateway**

- Site settings → Identity → Services → Git Gateway → "Enable Git Gateway"
- Authorize the connection (Netlify will request a token from GitHub)

- [ ] **Step 6: Invite users**

- Identity tab → Invite users
- Invite: Ashish's email, Allen's email, Vyom's email
- Each invitee gets a confirmation email → clicks link → sets a password.

- [ ] **Step 7: Test login at the deployed admin URL**

Once the site has been deployed via GitHub Pages with the new code (after Task 18 below), open `https://frenchifywithvyom.com/admin/`. Click "Login with GitHub". You should see the Decap CMS dashboard with the Announcements collection.

> If "Login with GitHub" doesn't appear and only an email/password form shows up — that's also fine; users can use email/password instead.

No commit — this is external configuration.

---

## Task 18: Deploy and end-to-end verification

**Files:** none (deploy + verification)

- [ ] **Step 1: Push everything to GitHub**

From the repo root:

```bash
git pull --rebase
git push origin main
```

Expected: GitHub Pages workflow triggers automatically.

- [ ] **Step 2: Wait for the deploy to finish (~60-120 seconds)**

Open `https://github.com/<owner>/<repo>/actions`. Watch the latest workflow until it finishes successfully.

- [ ] **Step 3: Open `https://frenchifywithvyom.com/announcements/`**

Verify:
- [ ] Page loads
- [ ] Featured webinar card appears at top
- [ ] Three other cards appear in grid
- [ ] Filter pills work
- [ ] Mobile layout works (test on phone or DevTools mobile view)
- [ ] Header nav has the new "Announcements" link
- [ ] Homepage is unchanged

- [ ] **Step 4: Open `https://frenchifywithvyom.com/admin/`**

- Click "Login" → log in with the email invited via Netlify Identity
- The Announcements collection should appear in the sidebar
- Click "+ New Announcement"
- Pick a type (e.g. Discount), fill in fields, drag in an image
- Click "Save" → "Submit for Review"

- [ ] **Step 5: Allen approves the test PR**

- Allen receives a notification (or checks GitHub PRs directly)
- A new PR appears on the repo
- Allen reviews the diff and merges to `main`

- [ ] **Step 6: Confirm the new announcement appears live within ~60 seconds**

Refresh `/announcements/` after the GitHub Pages workflow completes. The new announcement should appear.

- [ ] **Step 7: Test deletion**

In `/admin/`, open an existing announcement → click trash → confirm. Submit → Allen merges → confirm it's gone from the live page after rebuild.

- [ ] **Step 8: Hand off**

Send Ashish a quick walkthrough or Loom showing:
1. How to log into `/admin/`
2. How to create an announcement
3. How to mark "Featured"
4. The approval flow (drafts → in review → ready)
5. How to delete

No commit — verification only. If anything failed, file an issue and fix in a follow-up commit.

---

## Acceptance criteria (cross-check with spec § 12)

- [ ] `/announcements` page is reachable from the main nav (Task 12)
- [ ] Featured card renders correctly desktop + mobile (Tasks 8, 13)
- [ ] All 4 type-specific forms work in Decap (Task 15)
- [ ] Multi-image carousel works (Tasks 6, 13)
- [ ] Filter pills work without page reload (Tasks 9, 10, 13)
- [ ] Editorial workflow blocks publishing until Allen merges PR (Tasks 15, 18)
- [ ] Image upload works and shows on live page (Tasks 15, 18)
- [ ] Deleting in Decap removes it from live page (Task 18)
- [ ] Homepage untouched (verified in Task 13)
- [ ] Brand colors used consistently (Tasks 5–11)

---

## Risks and mitigations during implementation

| Risk | Mitigation |
|---|---|
| `media_folder` path mismatch (relative to git root, not to next-site/) | Task 15 step 2 verifies the repo root path explicitly |
| Decap CMS conditional fields don't show because of YAML syntax | Test the form in dev at `/admin/` — if a conditional field doesn't appear, check the `condition:` syntax (some Decap versions use `field` + `value`, others use `field` + `values` for arrays) |
| Build failure due to `fs` import in client component | The data loader is only imported by the server component (`app/announcements/page.tsx`). Never import `lib/announcements.ts` from anything with `'use client'` |
| Static export does not include the markdown files in the bundle | Static export reads files at build time and bakes them into HTML. The `.md` files don't need to be in `out/` — only the rendered HTML does. Verify by inspecting `out/announcements/index.html` after a build. |
| Netlify Identity invite emails go to spam | Tell users to check spam folder or whitelist `*.netlify.com` |

---

## Out of scope (per spec § 11)

- Scheduled / future-dated publishing
- Auto-hide on expiry/event date
- Past Webinars archive section
- Analytics / view counts
- Email or WhatsApp notifications
- Multi-language support
- Search within announcements
