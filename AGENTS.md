# Working in this repo

This is the Frenchify with Vyom website. It is **live** at https://frenchifywithvyom.com — anything merged to `main` deploys to the real site within a couple of minutes. Treat every change as production.

## Where things are

The Next.js app is in **`next-site/`**, not the repo root. The `.html` files at the root are the old GoHighLevel pages kept for reference; editing them does nothing.

```
next-site/app/            routes (folder name = URL)
next-site/components/     shared components
next-site/content/        markdown the site reads (announcements, results)
next-site/next.config.mjs redirects live here
```

Useful entry points:
- Home page: `app/page.tsx` renders `app/home-v2/page.tsx`, whose sections are in `app/home-v2/_components/`
- Courses funnel: `app/courses/` (level names, formats and links are all in `_data.ts`)
- Contact: `app/contact/page.tsx`

## Setup

```bash
cd next-site
npm install
npm run dev        # http://localhost:3000
```

Node 20 or newer. Production runs Node 24.

## Push straight to main

Commit to `main` and push. There is no review step and no pull request — a push publishes to the live site in about two minutes.

```bash
git checkout main && git pull
# ...make changes...
git add -A && git commit -m "what changed and why"
git push
```

Do not open pull requests for ordinary work. Nobody is waiting to merge them, so they just sit there.

Force pushes and branch deletion are blocked. Normal pushes are not.

Because there is no reviewer, the build check below is the only thing standing between a mistake and the live site. Run it every time.

## Before every push

Always run this, and only push if it passes.

```bash
cd next-site && npm run build
```

A failing build will not take the site down — Vercel refuses to swap in a broken deploy and keeps serving the previous one. What it does mean is that your change silently never appears, which is worse to debug later than catching it here.

## Secrets

`.env.local` is not in the repo and never should be. If a page needs an environment variable you do not have, **stop and ask a human** — do not invent values, do not commit a `.env` file, do not paste keys into source.

Running locally without those variables is normal. The public pages work fine. `/admin` and `/student-support` will not work locally, and that is expected.

## Leave these alone unless specifically asked

- `app/admin/` and `lib/content-admin/` — the content panel non-technical staff use daily
- `app/student-support/` and `app/api/` — the ticket system, it handles real student data
- The `redirects()` block in `next-site/next.config.mjs` — those keep old URLs from the previous site alive. Deleting one creates a dead link that is already indexed by Google.

## House style

- Match the surrounding code. This project uses Tailwind classes inline and framer-motion via the wrappers in `components/motion/`.
- Any section that animates in must stay readable if the animation never fires. Use the existing `Reveal` component or `useRevealFailsafe` — do not hand-roll an opacity-0 starting state.
- Check mobile. Most visitors are on phones.
