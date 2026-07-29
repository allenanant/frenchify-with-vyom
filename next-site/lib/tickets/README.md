# Student support tickets

The `/student-support` page and the desk behind it. Built 2026-07-29.

Vyom asked for a Contact Us page students could reach from the TagMango portal.
The page already existed as a GoHighLevel iframe, which is why the team was still
losing queries: a form drops a message somewhere, it does not give anyone a list
to work through. This replaces it with a real queue.

## Shape

| Route | Who | Notes |
|---|---|---|
| `/student-support` | Students | The form. A screenshot is compulsory. |
| `/student-support/thanks` | Students | Receipt with the ticket number. |
| `/student-support/staff/login` | Team | Also the one-time setup screen. |
| `/student-support/staff` | Team | The queue. |
| `/student-support/staff/ticket/[id]` | Team | Detail, contact, resolve. |
| `/student-support/staff/team` | Admins | Accounts and the storage gauge. |
| `/api/support/files/[id]` | Team | Screenshots. Never public. |

The staff area renders without the marketing header, footer and floating CTA,
via `components/ChromeGate.tsx`.

## Files

```
lib/tickets/constants.ts   limits, statuses, categories — no imports, safe on the client
lib/tickets/db.ts          schema + every query. server-only.
lib/tickets/auth.ts        bcrypt, sessions, requireStaff
lib/tickets/actions.ts     Server Actions, all input validation
app/student-support/**     pages and client components
app/api/support/files/**   screenshot delivery
```

## Setup on Vercel

1. **Database.** Vercel dashboard, Storage, add **Neon** on the **free** plan.
   Attach it to this project. That sets `DATABASE_URL` automatically. Nothing to
   run by hand: the tables are created on first request.
2. **Environment variables** on the project:
   - `SUPPORT_SETUP_SECRET` — any long random string. Needed once, to create the
     first admin. Without it the setup screen refuses.
   - `SUPPORT_IP_SALT` — any long random string. Salts the hashed IPs.
3. Deploy, open `/student-support/staff/login`, enter the setup key and create
   the first admin. That screen disappears the moment an account exists.
4. Add the rest of the team from **Team**. Each gets a starter password shown
   once and is forced to change it on first sign in.

## Cost

Nothing, by design, and the design is what keeps it that way.

Screenshots are compressed in the student's browser before upload: resized to
1600px on the long edge and re-encoded to WebP, which turns a 3 MB phone
screenshot into roughly 120 KB. They are then stored as `BYTEA` in Postgres
rather than in blob storage, because blob storage is metered and would
eventually bill.

`STORAGE_CEILING_BYTES` caps the total at 300 MB, well inside Neon's free 0.5 GB.
The ceiling is enforced inside the same SQL statement that creates the ticket, so
it cannot be raced past. If it is ever reached the form tells students to email
instead, which is a bad day but not a lost ticket or a surprise invoice.

Realistically: about 300 KB per ticket, so the cap is thousands of tickets. The
Team page shows a live gauge.

## Data safety

- The ticket, its screenshots, the opening history entry and the GoHighLevel
  queue record are **one** SQL statement. All of it lands or none of it does.
  Neon's HTTP driver has no interactive transactions, so this matters: a
  multi-statement version could leave a ticket with no proof attached.
- Staff edits are likewise one statement, and carry the row's `updated_at` as a
  version. If someone else saved while you had the page open, your save is
  refused with an explanation rather than silently overwriting their work.
- `support_events` is append-only. A ticket's history survives every later edit.

## GoHighLevel

Not connected, deliberately. Every submission writes a `pending` row to
`support_outbox`. Nothing drains it, so records accumulate in order. When GHL is
wired up, a worker reads that table oldest first, creates the contact and
opportunity, writes `ghl_contact_id` / `ghl_opportunity_id` back onto the ticket
and marks the row sent. Tickets raised before the connection still sync.

Planned: a **Student Tickets** pipeline whose stages match the four statuses
here, so GHL mirrors this rather than competing with it.

## Security notes

- Every Server Action calls `requireStaff()`. Page redirects protect nothing on
  their own, because a Server Action is a public endpoint once deployed.
- `requireStaff` also blocks users who still hold a starter password.
- Sign-in throttling lives in Postgres, not memory, because serverless instances
  do not share state. Six failures locks that email and IP pair for 15 minutes.
- Unknown emails still run a bcrypt comparison against a dummy hash, so response
  timing does not reveal which addresses are real.
- Uploads are validated by parsing the actual image header including dimensions,
  not the filename or the browser's declared type. Animated WebP is rejected.
- Screenshots require a signed-in session and are sent `no-store`.

## Local development

The Neon HTTP driver needs a real Neon URL, so the staff pages cannot run
against a plain local Postgres. Either point `DATABASE_URL` at a free Neon
branch, or work on the public form, which renders without a database.

```bash
npm install
DATABASE_URL="postgres://..." npm run dev
```
