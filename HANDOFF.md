# Handoff Notes — Frenchify with Vyom

This file documents the current state of the project and what's needed to finish the announcement-page backend. Read this first if you're picking up this repo.

**Last updated:** 2026-04-25
**Handoff from:** Ashish Verma (TGE) → Allen Thomas

---

## What's Live Right Now

- **Site (built):** `https://ashishverma0661.github.io/frenchify-with-vyom/` (will become `https://allenanant.github.io/frenchify-with-vyom/` after ownership transfer)
- **New page:** `/announcements/` — public announcement page (works fully)
- **Admin shell:** `/admin/` — Decap CMS login screen renders, but **Login button does not work** (no OAuth proxy yet — see "What's Left" below)

## Repo Layout

```
frenchify-with-vyom/
├── README.md                       # original brand notes (TGE)
├── HANDOFF.md                      # this file
├── docs/
│   ├── specs/2026-04-25-announcement-page-design.md   # design doc
│   └── plans/2026-04-25-announcement-page-implementation.md  # 18-task implementation plan
├── next-site/                      # the active Next.js 15 site (deployed)
│   ├── app/                        # routes (incl. app/announcements/)
│   ├── components/                 # incl. components/announcements/
│   ├── content/announcements/      # MARKDOWN DATABASE — one file per announcement
│   │   ├── webinars/
│   │   ├── discounts/
│   │   ├── results/
│   │   └── news/
│   ├── lib/                        # announcement loader + types
│   ├── public/admin/               # Decap CMS UI (loads at /admin/)
│   │   ├── index.html              # Decap entry point
│   │   └── config.yml              # collection schema + auth config
│   └── scripts/check-announcements.mjs   # validator for content files
└── src/, *.astro                   # OLD ASTRO SITE — kept for rollback only, not deployed
```

## Branches

| Branch | Purpose |
|---|---|
| `main` | The original Astro site (legacy, from before the Next.js migration) |
| `nextjs-homepage-redesign` | **The active dev branch.** All Next.js work + announcement work lives here |
| `gh-pages` | The built static output (auto-served by GitHub Pages). Never edit by hand. |
| `announcement-page` | Sub-branch where the announcement feature was developed; merged into `nextjs-homepage-redesign` |

## How to Deploy (Manual, Today)

There is no auto-deploy workflow yet (the GitHub OAuth token used during dev didn't have `workflow` scope, so the workflow file wasn't pushed). To deploy:

```bash
cd next-site
GITHUB_PAGES=true npm run build
touch out/.nojekyll

# In a separate worktree or by checking out gh-pages:
git worktree add /tmp/gh-pages-deploy gh-pages
cd /tmp/gh-pages-deploy
find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
cp -r path/to/next-site/out/. ./
git add -A
git commit -m "Deploy"
git push origin gh-pages
```

To switch to auto-deploy (recommended), add a GitHub Actions workflow at `.github/workflows/deploy-nextjs.yml` (the YAML is in this conversation's history — happy to provide it on request, or copy from any other Next.js → GitHub Pages template). After it's added, every push to `nextjs-homepage-redesign` auto-deploys.

## What's Left for the Backend (Admin Login)

The Decap CMS admin page renders at `/admin/` but **Login with GitHub fails** because there's no OAuth callback handler. To make it actually work, you need to deploy a tiny OAuth proxy somewhere and point Decap at it.

### Option A — Cloudflare Workers (recommended if staying on GitHub Pages)

1. Create a free Cloudflare account (no credit card needed)
2. Create a GitHub OAuth App at https://github.com/settings/developers
   - Homepage URL: `https://<your-username>.github.io/frenchify-with-vyom/`
   - Authorization callback URL: `https://<your-worker>.workers.dev/callback`
3. Deploy the proxy worker (~30 lines — see https://decapcms.org/docs/external-oauth-clients/)
4. Update `next-site/public/admin/config.yml`:
   ```yaml
   backend:
     name: github
     repo: allenanant/frenchify-with-vyom
     branch: nextjs-homepage-redesign
     base_url: https://<your-worker>.workers.dev
     auth_endpoint: auth
   ```
5. Rebuild + redeploy (one-liner above)

### Option B — Migrate to Vercel (recommended long-term)

1. Sign in to Vercel with GitHub
2. Import `frenchify-with-vyom` as a Vercel project (auto-detects Next.js)
3. Build a Vercel API route at `next-site/app/api/oauth/[...auth]/route.ts` (~30 lines)
4. Add `GITHUB_CLIENT_ID` + `GITHUB_CLIENT_SECRET` as Vercel env vars
5. Update Decap `config.yml`:
   ```yaml
   backend:
     name: github
     repo: allenanant/frenchify-with-vyom
     branch: nextjs-homepage-redesign
     base_url: https://<your-vercel-domain>
     auth_endpoint: api/oauth/auth
   ```
6. Switch DNS for `frenchifywithvyom.com` to Vercel (when ready)

### Option C — Local-only mode (works today, no setup)

For dev / content review only — no public admin URL. In `config.yml` uncomment `local_backend: true`, then:

```bash
# Terminal 1
npx decap-server

# Terminal 2
cd next-site && npm run dev

# Open http://localhost:3000/admin/
```

Edits write to local Markdown files. Commit + push manually.

## How the Announcements System Works

1. **Database:** plain Markdown files in `next-site/content/announcements/<type>/*.md` — one file per announcement.
2. **Types:** webinar, discount, result, news. Each type has a different form in the admin and a different card layout on the page.
3. **Frontmatter fields per type:** see `docs/specs/2026-04-25-announcement-page-design.md` § 4.
4. **Featured:** any announcement with `featured: true` shows as the big hero card. If multiple are featured, the most recent wins.
5. **Build-time rendering:** Next.js reads the Markdown files at build time and bakes them into static HTML. No runtime DB.
6. **Editorial workflow:** When the admin OAuth is set up, "Publish" opens a PR. Allen merges → rebuild → live. (Spec § 6.5)

## Spec & Plan

- **Design:** `docs/specs/2026-04-25-announcement-page-design.md` — full spec (data model, page layout, dashboard UX, deploy flow)
- **Plan:** `docs/plans/2026-04-25-announcement-page-implementation.md` — 18-task implementation plan that built the current state. Tasks 17 & 18 (OAuth + deploy) are the parts deferred to whoever takes the backend forward.

## Constraints to Remember

- Homepage rule: don't change the homepage without Ashish/Vyom permission.
- Allen approves anything that goes live.
- Don't push to `main` (legacy Astro) — that branch is the rollback fallback. Active branch is `nextjs-homepage-redesign`.
- Brand colors are in `next-site/tailwind.config.ts` (`brand-blue: #2563eb`, `brand-amber: #f59e0b`, `brand-ink: #252525`). Use the Tailwind tokens, not raw hex codes.

## Quick Smoke Test After Any Deploy

1. Open `/announcements/` — should show featured webinar + 3 cards in grid + filter pills
2. Click each filter pill — counts should update, cards should filter
3. Open `/admin/` — login screen should render (login won't work until OAuth proxy is set up)
4. Run `node scripts/check-announcements.mjs` from `next-site/` — should validate all 4 seed files

---

Questions for the original implementer (Ashish + Claude session): in conversation history. The full spec + plan in `docs/` should answer most of them.
