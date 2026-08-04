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

## Never push to main

`main` is protected. Direct pushes are rejected — that is deliberate, not a broken setup.

```bash
git checkout main && git pull
git checkout -b <short-branch-name>
# ...make changes...
git add -A && git commit -m "what changed and why"
git push -u origin <short-branch-name>
```

Then open a pull request on GitHub. Vercel posts a preview URL on the PR automatically, so the change can be seen on a real link before anyone merges it. The repo owner reviews and merges.

## Before you open a PR

Always run this. A build failure merged to `main` takes the live site down.

```bash
cd next-site && npm run build
```

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
