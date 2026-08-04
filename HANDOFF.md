# Handoff Notes — superseded

**Everything this file used to describe is out of date. Read [AGENTS.md](AGENTS.md) instead.**

The original version was an April 2026 handoff from Ashish Verma covering a GitHub Pages build with Decap CMS. That architecture is gone. Kept only so the old instructions stop misleading people and agents — the full text is in git history if anyone needs it.

## What is actually true, as of 2026-08-04

| Then | Now |
|---|---|
| `main` was the legacy Astro site | `main` **is** the live site. It is protected: pull request + owner approval, no direct pushes |
| `nextjs-homepage-redesign` was the dev branch | Merged and abandoned. Work from `main`, branch off it |
| Deploy meant hand-building to a `gh-pages` branch | Vercel auto-deploys every merge to `main`. Never touch `gh-pages` |
| Site lived on `github.io` | Live at **https://frenchifywithvyom.com** (cut over from GoHighLevel on 2026-08-04) |
| Admin was Decap CMS with a broken login | Custom panel at `/admin` — Announcements and Results tabs, staff log in with email and password. Decap survives as a backdoor at `/admin-advanced/` |

The Astro files and loose `.html` pages at the repo root are the pre-migration site. Nothing serves them. Editing them changes nothing.

## Still open

- `/immigration` is a temporary redirect to `/courses`. The French-category PR content from the old site was never rebuilt. Build the page, then remove that line from `next-site/next.config.mjs`.
- The Trustpilot link under the homepage reviews points at `/testimonials` as a placeholder, pending the real profile URL.
