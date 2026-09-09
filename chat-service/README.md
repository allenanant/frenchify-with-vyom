# Frenchify website chat service

This service runs on the VPS. The Vercel website never runs Codex itself.

## What it does

* Starts one Codex thread per visitor chat.
* Requires the visitor's name, email, and international phone number before the first message.
* Uses `gpt-5.6-luna` with low reasoning for fast, bounded answers.
* Refreshes the Google knowledge document and key live website pages every 15 minutes.
* Treats the Google document as authoritative over website copy.
* Returns only server-owned links from `src/links.mjs`.
* Sends confirmed human handoffs into the existing Neon support queue.
* Stores chat sessions and the Codex thread mapping in local SQLite.
* Saves a CRM delivery job with each new chat and retries until GoHighLevel acknowledges it.

## VPS setup

Use Node 24 or newer.

```bash
cd /opt/frenchify-chat
npm ci
cp .env.example /etc/frenchify-chat.env
```

Fill the two long shared secrets in `/etc/frenchify-chat.env`. Set the same `CHAT_SERVICE_TOKEN` on Vercel. Set the same `CHAT_TICKET_SECRET` on Vercel and the VPS.

Sign in to Codex as the Linux user that runs the service:

```bash
sudo -u frenchify-chat -H codex login
```

Choose ChatGPT sign-in and complete the browser flow. Do not use `OPENAI_API_KEY`. The SDK resumes this local Codex login and usage follows the ChatGPT subscription.

Run the checks:

```bash
npm test
npm run sync-knowledge
CHAT_SERVICE_TOKEN=... CHAT_TICKET_SECRET=... npm start
curl http://127.0.0.1:4310/health
```

Install `systemd/frenchify-chat.service.example` as `/etc/systemd/system/frenchify-chat.service`, adjust paths, then enable it.

## Public HTTPS endpoint

Keep Node bound to `127.0.0.1`. Put Caddy or nginx in front of it and expose only HTTPS. The service requires the bearer token on every chat route. `/health` contains no private data.

Example nginx location:

```nginx
location / {
    proxy_pass http://127.0.0.1:4310;
    proxy_set_header Host $host;
    proxy_http_version 1.1;
    proxy_read_timeout 70s;
    client_max_body_size 32k;
}
```

Set `CHAT_SERVICE_URL=https://chat.your-domain.example` on Vercel after TLS is working.

## Knowledge updates

The bundled `knowledge/primary.md` is a safe fallback. The running service refreshes the same Google document and writes `knowledge/website-live.md` atomically. If a refresh fails, the last good copy stays active.

Edit the Google document first for policy, pricing, and course changes. Edit `src/links.mjs` when a page URL changes. The model never returns an arbitrary URL.

## Website lead routing

The VPS posts each new chat's name, email, and normalized phone number to
`/api/chat/lead` on the website, using the existing `CHAT_TICKET_SECRET`.
Conversation text is not sent to the CRM. The website upserts the contact in the
Frenchify subaccount and enrolls it in the dedicated website submission workflow.

Vercel requires two server-only settings:

* `GHL_FRENCHIFY_API_KEY`: Frenchify's private integration token with contact write and workflow enrollment access.
* `CHAT_LEAD_WORKFLOW_ID`: the reviewed, published website submission workflow ID.

The workflow should also accept native GHL form submissions, create an open
opportunity in the requested pipeline's first stage, and preserve existing
opportunities when the same contact submits again. It must contain no messaging
actions. Existing form-specific workflows continue to run.

The SQLite `chat_lead_outbox` table is durable and included in normal database
backups. Delivery checks run every 30 seconds, with exponential backoff capped
at one hour. Missing configuration and CRM errors leave jobs pending instead of
discarding contact details. Old sessions are preserved and are not backfilled.
Existing sessions continue to work; new chats must include a phone number.

The phone column and outbox table are additive migrations. An application
rollback can leave them in place safely. Do not drop them or restore an older
database to roll back application code.

## Data and recovery

SQLite lives at `data/chat.sqlite` and uses WAL mode. Back up `data/` and the Codex service user's `~/.codex/sessions/` together if you need resumable conversations after restoring the VPS.

The website's real tickets remain in Neon. A VPS loss does not remove staff tickets already created.
