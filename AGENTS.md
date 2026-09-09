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
- Website chat widget: `components/chat/ChatWidget.tsx`; same-origin proxy routes are under `app/api/chat/`
- VPS Codex service: `chat-service/`; it is deployed separately from Vercel

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

If the chatbot service changed, also run:

```bash
cd chat-service && npm test
```

The chatbot uses Codex SDK with the VPS service user's ChatGPT login. It does not use `OPENAI_API_KEY`. Never move the SDK into a Vercel route. Keep the model at `gpt-5.6-luna` with low reasoning unless Allen explicitly changes the speed and usage requirement.

`chat-service/knowledge/primary.md` is the bundled fallback. The linked Google document is authoritative and refreshes on the VPS. Website context is secondary. Approved visitor links live in `chat-service/src/links.mjs`; the model cannot return arbitrary URLs.

A failing build will not take the site down — Vercel refuses to swap in a broken deploy and keeps serving the previous one. What it does mean is that your change silently never appears, which is worse to debug later than catching it here.

## The chatbot

Two halves, deployed two different ways.

- `chat-service/` is the **backend**. It runs on Vyom's own VPS, not on Vercel. It listens on `127.0.0.1:4310` only, behind Caddy at `https://chat.frenchifywithvyom.com`. Port 4310 is never exposed to the internet.
- Everything under `next-site/` is the **website half** and deploys through Vercel like any other page: `components/chat/ChatWidget.tsx`, the proxy routes in `app/api/chat/`, `app/api/support/chat-ticket/`, and `lib/chat-proxy.ts`.

**Cost model, non-negotiable.** The backend runs through `@openai/codex-sdk` signed in with Vyom's paid ChatGPT account, as the locked `frenchify-chat` service user on the VPS. Never add `OPENAI_API_KEY`. Never create an OpenAI Platform project. Never switch to the Responses API. Never add an API fallback. If something cannot be done without an API key, stop and ask a human.

**Mounting the widget: ADD, never replace.** `next-site/app/layout.tsx` already renders `FloatingLeadButton`. `ChatWidget` gets **added alongside it**. Do not remove, replace, or move `FloatingLeadButton` — it is live lead capture on a revenue site. Before pushing any change that mounts the widget, run `git diff --stat` and confirm it shows one file changed with **zero deleted lines**. Any deletion means something was removed from the live site.

**To change what the chatbot says**, edit the Google knowledge document. Do not edit code and do not deploy. It refreshes on the VPS every 15 minutes. `chat-service/knowledge/primary.md` is only the bundled fallback for when that document cannot be fetched.

**Never commit** `chat-service/.env`, `chat-service/data/` (real visitor conversations), `chat-service/knowledge/website-live.md` (the refreshed cache), or any log folder. `chat-service/.gitignore` already covers these — do not weaken it.

**Phone capture and GHL routing (2026-09-10).** New chats require name, email and an international phone number. The VPS saves a durable lead queue and posts to `/api/chat/lead`, authenticated with the existing ticket secret. Only the Vercel Production environment has `GHL_FRENCHIFY_API_KEY` and `CHAT_LEAD_WORKFLOW_ID`. The dedicated workflow is `Website Submission - Forms and Chatbot` (`ff3f4b75-fc18-443f-9426-f0802e056359`) in Frenchify location `cmjlzerv4DUDyZFj6PYO`. It routes all native form submissions and API-enrolled chatbot leads to the `Website Submission` pipeline. Preserve contact tags, owners and consent settings. Allen explicitly forbids changing any other automations as part of this work. See `chat-service/README.md` for queue and rollback details.

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
