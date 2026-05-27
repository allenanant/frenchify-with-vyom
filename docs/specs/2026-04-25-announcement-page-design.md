# Frenchify Announcements Page + Decap CMS Dashboard — Design Spec

**Date:** 2026-04-25
**Project:** Frenchify with Vyom (Next.js 15 site, GitHub Pages)
**Author:** Ashish (with Claude)
**Status:** Draft for review

---

## 1. Goal

Add a public **Announcements & Updates** page to the Frenchify website where Vyom (and team) can post:

- Upcoming webinars
- Discounts / offers
- Student results / success stories
- General news / updates

Each announcement may include text, a call-to-action URL, and **optionally** one or more images. Updates are made through an easy browser-based dashboard (Decap CMS) — no code editing — and go live on the website automatically (~60 seconds after publish).

## 2. Non-goals

- No real-time updates (60 second rebuild is acceptable)
- No paid third-party services
- No scheduled publishing / future-dated posts (manual delete only)
- No comments, likes, or engagement features
- No analytics integration in v1

## 3. Architecture overview

```
[Vyom / Ashish]
   │
   ▼
/admin (Decap CMS dashboard, static HTML+JS)
   │  (login via GitHub OAuth, brokered by Netlify Identity)
   ▼
GitHub repo (allenanant or current Frenchify repo)
   │  - content/announcements/*.md  (one file per announcement)
   │  - public/announcements/*.{jpg,png,webp}  (uploaded images)
   │  Editorial workflow ON: drafts open as PRs requiring Allen's merge
   ▼
GitHub Pages build (Next.js static export)
   │
   ▼
frenchifywithvyom.com/announcements/  (live page)
```

**Stack:**

- **Frontend page:** Next.js 15 App Router, statically exported (existing setup)
- **Content store:** Markdown + frontmatter files in the same repo as the site
- **CMS:** Decap CMS v3 (open source, free, runs entirely in the browser)
- **Auth:** Netlify Identity (free tier, used purely as OAuth broker — no Netlify hosting required)
- **Image hosting:** Files committed to `public/announcements/` in the repo, served as static assets via GitHub Pages
- **Deploy:** Existing GitHub Pages workflow rebuilds on every commit to `main`

## 4. Data model

Each announcement is one Markdown file in `content/announcements/`, named `YYYY-MM-DD-<slug>.md`.

### 4.1 Common fields (all types)

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | Card headline |
| `type` | enum | yes | `webinar` \| `discount` \| `result` \| `news` |
| `featured` | boolean | yes (default false) | Only one announcement is "featured" at a time. If multiple, the most recently created wins. |
| `images` | list of strings | no | Paths to uploaded images. 0, 1, or many. |
| `link` | string (URL) | no | The "URL associated with it" — where the CTA button points |
| `buttonText` | string | no | Defaults per type: Webinar → "Register Now", Discount → "Claim Offer", Result → "Read Story", News → "Read More" |
| `createdAt` | date | yes (auto) | Auto-set to today; used for sort order |
| `published` | boolean | yes (auto) | Editorial workflow handles this; not exposed in form |

### 4.2 Webinar-only fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `webinarDate` | date | yes | Display only — no auto-hide |
| `webinarTime` | string | yes | Free text e.g. "7:00 PM IST" |
| `description` | text | no | Short paragraph |

### 4.3 Discount-only fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `couponCode` | string | no | e.g. `SUMMER20` |
| `discountAmount` | string | yes | Free text e.g. "20% off" or "₹500 off" |
| `expiryDate` | date | no | Shown on card; does NOT auto-hide |
| `description` | text | no | |

### 4.4 Result-only fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `studentName` | string | yes | |
| `achievement` | string | yes | e.g. "B2 cracked in 4 months" |
| `quote` | text | no | Optional pull-quote from the student |

### 4.5 News-only fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `body` | rich text (Markdown) | yes | Bold, links, lists supported |

### 4.6 Example file

```yaml
---
title: "Free TEF Canada Webinar"
type: "webinar"
featured: true
images:
  - "/announcements/tef-webinar-2026-05-10.jpg"
link: "https://frenchifywithvyom.com/sunday-webinar"
buttonText: "Register Now"
webinarDate: "2026-05-10"
webinarTime: "7:00 PM IST"
description: "Learn how to crack TEF Canada B2 in 90 days with Vyom."
createdAt: "2026-04-25"
---
```

## 5. Page layout (`/announcements`)

Top to bottom:

1. **Site header** (existing, unchanged)
2. **Page hero** — H1 "Announcements & Updates" + 1-line subhead. Frenchify brand gradient (`#2563eb → #f59e0b`).
3. **Featured announcement** — full-width hero card.
   - Desktop: image (left, 50%) + content (right, 50%).
   - Mobile: image stacks above content.
   - If no announcement is featured, this section is hidden.
4. **Filter pills row** — `All` `Webinars` `Discounts` `Results` `News`. Client-side filter only, no reload. Default: `All`.
5. **Card grid** — non-featured announcements.
   - Desktop: 3 columns. Tablet: 2. Mobile: 1.
   - Sort: newest `createdAt` first.
   - Each card includes type badge (color-coded), title, key info, optional image carousel (auto-rotating if 2+ images), CTA button.
6. **Empty state** — when filtered to a type with no entries: "No [type] right now — check back soon."
7. **Site footer** (existing, unchanged)

### 5.1 Type badge colors

| Type | Badge color |
|---|---|
| Webinar | `#2667FF` (Frenchify primary blue) |
| Discount | `#f59e0b` (Frenchify amber) |
| Result | `#16a34a` (green) |
| News | `#6b7280` (grey) |

### 5.2 Image behavior on cards

- 0 images → text-only card
- 1 image → static cover image on top of card
- 2+ images → auto-rotating carousel as cover, swipe/click arrows on hover, dot indicators below

### 5.3 Navigation

- Add `Announcements` link to the main header nav, positioned between `Programs` and `About Us`.
- Slug: `/announcements/`.

## 6. Dashboard (Decap CMS)

### 6.1 Access

- URL: `frenchifywithvyom.com/admin/`
- Local dev: `localhost:3000/admin/`
- Auth: GitHub OAuth via Netlify Identity. Only repo collaborators can edit.

### 6.2 Sidebar

Single collection: **Announcements**.

### 6.3 Announcement list view

- All announcements, newest first
- Each row shows: title, type badge, `createdAt`, status (draft / in review / published)
- Top-right: `+ New Announcement` button
- Trash icon on each row to delete (with confirmation)

### 6.4 Form

Fields appear in this order; type-specific fields appear conditionally based on `type`:

1. **Type** — dropdown (required). Picking this re-renders the rest of the form.
2. **Title** — text (required)
3. **Featured?** — checkbox
4. **Images** — drag-and-drop multi-upload (optional)
5. **Link URL** — text (optional)
6. **Button text** — text with default per type
7. **Type-specific fields** (see Section 4)

Bottom buttons:

- **Save Draft** — file written with `published: false`, opens as a draft PR (editorial workflow)
- **Publish** — moves the entry to the "Ready" column → Allen merges PR → live in ~60s

### 6.5 Editorial workflow (Allen approval gate)

Decap CMS editorial workflow is **ON**. Three columns:

1. **Drafts** — your in-progress entries
2. **In Review** — submitted entries awaiting approval (PRs)
3. **Ready** — approved entries (PR merged → live)

Vyom/Ashish creates and submits to "In Review". Allen reviews the PR on GitHub (or via the Decap UI if logged in as a collaborator) and merges. Nothing reaches the live site without Allen merging the PR.

## 7. Build / deploy flow

1. Editor publishes in Decap → Decap commits the new Markdown file + uploaded images to a new branch and opens a PR (editorial workflow).
2. Allen merges the PR to `main`.
3. GitHub Pages workflow rebuilds the Next.js site (~60 seconds).
4. New `/announcements` page reflects the new entry. Visitors see static HTML — no client-side fetch.

## 8. File / folder layout (additions to existing repo)

```
next-site/
├── app/
│   └── announcements/
│       ├── page.tsx              # Server component: reads MD files at build time
│       └── AnnouncementsClient.tsx  # Client component: filter pills, carousel
├── components/
│   └── announcements/
│       ├── FeaturedCard.tsx
│       ├── AnnouncementCard.tsx
│       ├── ImageCarousel.tsx
│       └── FilterPills.tsx
├── lib/
│   └── announcements.ts          # Reads & parses content/announcements/*.md
├── content/
│   └── announcements/
│       └── 2026-04-25-example.md
└── public/
    ├── admin/
    │   ├── index.html            # Decap CMS entry point
    │   └── config.yml            # Collection schema + auth config
    └── announcements/
        └── (uploaded images)
```

## 9. One-time setup steps (implementation will cover these)

1. Install dependencies: `gray-matter` (parse frontmatter), `marked` or `react-markdown` (render News body)
2. Create `public/admin/index.html` and `public/admin/config.yml`
3. Register a GitHub OAuth app for Netlify Identity
4. Create a free Netlify account, enable Identity + Git Gateway, point at the GitHub repo
5. Add the Announcements collection schema with conditional fields per `type`
6. Build the Next.js page and components
7. Add nav link in `components/Header.tsx`
8. Seed one example announcement to test
9. Deploy and verify end-to-end with Allen reviewing a test PR

## 10. Risks and open items

| Risk | Mitigation |
|---|---|
| Netlify Identity is a third-party touchpoint | Free tier covers this use case forever. Fallback: self-host `decap-server` OAuth proxy (more setup, fully GitHub-only). |
| Vyom or other non-technical users may struggle with the dashboard the first time | One short Loom walkthrough after setup. Decap UI is form-based and designed for non-developers. |
| GitHub OAuth app secrets are sensitive | Stored in Netlify Identity, never committed to repo. |
| 60-second publish delay | Communicated up front. If "instant" ever becomes a hard requirement, migrate to Sanity (separate effort). |
| The featured announcement disappearing if Vyom forgets to untick it on the next one | UI explanation + tooltip: "Most recent featured wins". Acceptable tradeoff for simplicity. |

## 11. Out of scope (for v1)

- Scheduled / future-dated publishing
- Auto-hide on expiry/event date
- Past Webinars archive section
- Analytics / view counts
- Email or WhatsApp notifications when new announcement is published
- Multi-language support
- Search within announcements

## 12. Acceptance criteria

- [ ] `/announcements` page is reachable from the main nav
- [ ] Featured announcement renders correctly on desktop and mobile when present
- [ ] All four type-specific forms work in Decap and save to the correct fields
- [ ] Multiple images per announcement display as auto-rotating carousel
- [ ] Filter pills correctly show/hide cards by type without page reload
- [ ] Editorial workflow blocks publishing until Allen merges the PR
- [ ] Image upload works and the image displays on the live page after rebuild
- [ ] Deleting an announcement in Decap removes it from the live page on next rebuild
- [ ] Nothing on the existing homepage is touched (per user rule)
- [ ] Brand colors (`#2667FF`, `#f59e0b`, gradient) are used consistently
