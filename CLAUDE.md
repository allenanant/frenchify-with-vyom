# Claude Briefing — Frenchify with Vyom

> **Purpose of this file:** Self-contained context for Claude Code when working on this repository. Read in full before answering or making changes.

## Who You're Working With

You are assisting Allen Thomas. Allen is the owner of this repo and the technical lead for The Growth Engine (TGE). He approves all changes that go live. When uncertain, ask him directly — there is no other approval chain above him.

Be direct. Short responses. Bullets over paragraphs. No filler ("Great question!", "Certainly!", "Of course!"). Match Allen's tone: technical, fast, no hand-holding.

## What This Project Is

**Frenchify with Vyom** — a French language coaching brand focused on TEF Canada exam preparation. Vyom is the coach. TGE handles marketing ops + the website.

**Live URL:** `https://allenanant.github.io/frenchify-with-vyom/` (after Ashish → Allen ownership transfer; was `ashishverma0661.github.io/frenchify-with-vyom/`)

## Tech Stack

- **Framework:** Next.js 15 (App Router) with React 19, TypeScript, Tailwind CSS
- **Animation:** framer-motion + Lenis smooth-scroll
- **Icons:** lucide-react
- **Content store:** Markdown files with gray-matter frontmatter (in `next-site/content/announcements/`)
- **Markdown rendering:** react-markdown (for News announcements)
- **Hosting:** GitHub Pages (static export). Can migrate to Vercel for full Next.js features (planned for OAuth proxy).
- **CMS:** Decap CMS (admin shell at `/admin/`, login currently broken — needs OAuth proxy)
- **Build artifact:** static HTML in `next-site/out/` → pushed to `gh-pages` branch

Reach for these libraries before adding new ones. Don't introduce a new state manager, UI kit, or animation library.

## Repo Structure

```
frenchify-with-vyom/
├── README.md              # original brand notes (TGE marketing context)
├── HANDOFF.md             # human-readable handoff doc — read for project history
├── CLAUDE.md              # this file — your briefing
├── docs/
│   ├── specs/             # design docs for major features
│   └── plans/             # implementation plans
├── next-site/             # the active site (deployed)
│   ├── app/               # routes — page.tsx files per route
│   ├── components/        # React components (organized by section)
│   ├── content/           # Markdown content (announcements DB)
│   ├── lib/               # utilities (cn, announcement loader+types)
│   ├── public/            # static assets, includes /admin/ Decap CMS
│   ├── scripts/           # one-off node scripts
│   └── tailwind.config.ts # brand colors, fonts, animations
└── src/, *.astro          # OLD ASTRO SITE — rollback only, NOT deployed
```

## Branches

| Branch | What |
|---|---|
| `main` | Old Astro site. Legacy. Don't push here. |
| `nextjs-homepage-redesign` | **Active dev branch.** All current Next.js work. PR/push target. |
| `gh-pages` | Built static output. Auto-served by GitHub Pages. Don't hand-edit. |

When making changes: branch off `nextjs-homepage-redesign`, PR back to it, then deploy.

## How To Deploy

There is **no auto-deploy workflow yet** — the original setup pushed without `workflow` scope on the GitHub token. Two options:

**Option 1 — Manual deploy (works today):**

```bash
cd next-site
GITHUB_PAGES=true npm run build
touch out/.nojekyll

# In a separate terminal/worktree:
git worktree add /tmp/gh-pages-deploy gh-pages
cd /tmp/gh-pages-deploy
find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
cp -r /path/to/next-site/out/. ./
git add -A
git commit -m "Deploy: <what changed>"
git push origin gh-pages
```

**Option 2 — Add a GitHub Actions workflow** (recommended; one-time setup):

Add `.github/workflows/deploy-nextjs.yml` (template in `HANDOFF.md` or any Next.js→GH-Pages reference). Triggers on push to `nextjs-homepage-redesign`. After this is set up, every push auto-deploys in ~60-90s.

## Brand System (Don't Reinvent)

- **Colors:** in `next-site/tailwind.config.ts` — `brand-blue: #2563eb`, `brand-amber: #f59e0b`, `brand-ink: #252525`, `brand-blue-deep: #1d4ed8`. Use Tailwind tokens (`text-brand-blue`, `bg-brand-amber`, `bg-brand-gradient`), NOT raw hex.
- **Gradients:** `bg-brand-gradient` (#2563eb → #f59e0b), `bg-brand-gradient-soft` (translucent version)
- **Shadows:** `shadow-soft`, `shadow-premium`, `shadow-premium-amber`, `shadow-glow-blue`
- **Fonts:** Inter (body) + Sora (display) via `next/font/google` in `app/layout.tsx`
- **Logo:** hosted at `storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/681356df3176b96f4b69c47b.png`

## Key Pages & Routes

| Route | File | Notes |
|---|---|---|
| `/` (home) | `app/page.tsx` | Hero, features, programs staircase, success stories marquee, CTAs, FAQ. TEF results section recently added. |
| `/announcements` | `app/announcements/page.tsx` | Featured card + filterable grid. Reads from `content/announcements/<type>/*.md`. |
| `/admin` | `public/admin/index.html` | Decap CMS shell. Login currently fails until OAuth proxy is set up. |
| `/programs`, `/about-us`, `/results-page`, `/testimonials`, `/faq`, `/contact` | `app/<slug>/page.tsx` | Standard content pages |
| Plus 18 other course/program routes | `app/<slug>/page.tsx` | A1/A2/B1/B2 intensive + selfstudy variants |

Header nav links live in `components/Header.tsx`'s `navLinks` array (top of file, easy to edit).

## Announcement System (Architecture)

The announcement page (`/announcements`) is data-driven from Markdown files. To add an announcement WITHOUT the live admin (which is broken), edit the files directly:

```
next-site/content/announcements/
├── webinars/   YYYY-MM-DD-slug.md
├── discounts/  YYYY-MM-DD-slug.md
├── results/    YYYY-MM-DD-slug.md
└── news/       YYYY-MM-DD-slug.md
```

Type is inferred from the folder. Frontmatter fields differ by type — see `docs/specs/2026-04-25-announcement-page-design.md` § 4 for the full schema. Or copy an existing seed file in the right folder and modify.

After editing: run `node scripts/check-announcements.mjs` from `next-site/` to validate, then deploy via the one-liner above.

The data loader is at `next-site/lib/announcements.ts` (server-only, reads at build time). Types are at `next-site/lib/announcements-types.ts` (client-safe).

## Decap CMS Status (TODO)

The `/admin/` page renders correctly but **Login with GitHub fails** because `next-site/public/admin/config.yml` has placeholder `base_url: https://REPLACE_WITH_OAUTH_PROXY_DOMAIN`.

To fix, set up an OAuth proxy. Two paths in `HANDOFF.md`:
1. Cloudflare Workers (~30-line script, free, no migration)
2. Vercel API route + migrate hosting (cleaner long-term)

After deploying the proxy, update `config.yml`'s `base_url` and `repo:` fields, rebuild, redeploy. Decap login will work and the editorial workflow (drafts → PRs → merge → live) takes effect.

## Specs and Plans

Look here when picking up the announcement work or planning new features:

- **`docs/specs/2026-04-25-announcement-page-design.md`** — full design spec for the announcements feature (data model, page layout, admin UX, deploy flow, acceptance criteria)
- **`docs/plans/2026-04-25-announcement-page-implementation.md`** — 18-task implementation plan that built the current state. Tasks 17–18 (OAuth + auto-deploy) are the parts left for the next person.

## Constraints

- **Don't push to `main`** — that's the legacy Astro fallback site.
- **Brand copy:** Frenchify body text on existing pages was approved by Vyom. Don't rewrite without asking.
- **Brand colors / fonts:** don't override unless rebranding.
- **Astro files (`src/`, `*.astro`, `astro.config.mjs`):** rollback fallback. Don't delete; don't edit unless the rollback path itself needs work.
- **Homepage:** edit freely (Allen owns it now), but ensure changes don't break the existing TEF results section, hero, or animations. Test in dev (`npm run dev`) before deploying.

## Useful Commands (cheat sheet)

```bash
# Install (after a fresh clone)
cd next-site && npm install

# Dev server
npm run dev                       # http://localhost:3000

# Build (preview deploy)
GITHUB_PAGES=true npm run build   # writes to next-site/out/

# Validate content files
node scripts/check-announcements.mjs

# Local Decap CMS (for content editing without OAuth proxy)
# 1. Uncomment `local_backend: true` in public/admin/config.yml
# 2. In two terminals:
npx decap-server                  # terminal 1
npm run dev                       # terminal 2
# 3. Open http://localhost:3000/admin/

# Deploy (manual, one-liner-ish — see "How To Deploy" above)
```

## When You Get Stuck

Order to check:
1. `HANDOFF.md` — full project state and deploy mechanics
2. `docs/specs/` — design intent for major features
3. `docs/plans/` — task-by-task implementation history
4. `next-site/README.md` (if added later) — Next.js-specific notes
5. The conversation history of the previous Claude session (Ashish's), if Allen has it
6. Ask Allen

## What This File Is Not

- It is not a comprehensive style guide (use the existing components as reference)
- It is not a rulebook for every edge case (use judgment)
- It is not approval to bypass tests, type-checks, or builds before deploying

If you find this file is wrong or outdated, update it as part of your work — it should evolve with the codebase.
