# Frenchify Chatbot Operations Handover

Last verified: 2026-09-06 (UTC)

## Server and access

- Server IP: `2.25.160.225`
- Hostname: `frenchify-chat-prod`
- Public chatbot backend: `https://chat.frenchifywithvyom.com`
- SSH username: `allen`
- Connect with: `ssh allen@2.25.160.225`

The supplied Allen public key is the only key in `/home/allen/.ssh/authorized_keys`. Password SSH is disabled. Allen has narrowly scoped, passwordless `sudo` access only to the maintenance commands documented below; he does not have an unrestricted root shell.

## Code and releases

- Git checkout: `/opt/frenchify-chat/source`
- Timestamped releases: `/opt/frenchify-chat/releases/`
- Active-release symlink: `/opt/frenchify-chat/current`
- Service working directory: `/opt/frenchify-chat/current`
- Persistent service data: `/var/lib/frenchify-chat/`

The deploy command fetches `origin/main`, copies `chat-service/` into a new timestamped release, runs `npm ci`, runs all backend tests, switches `current`, restarts the service, and checks health.

Deploy the current `main` branch:

```bash
sudo /usr/local/sbin/frenchify-chat-deploy
```

Roll back to the preceding release:

```bash
sudo /usr/local/sbin/frenchify-chat-rollback
```

Both commands were exercised successfully during handover. The final active release was deployed from the current `main` branch after the rollback test.

## Settings

The root-only settings file is `/etc/frenchify-chat.env`. Its setting names are:

```text
PORT
CHAT_MODEL
CHAT_REASONING_EFFORT
CHAT_MAX_MESSAGES
KNOWLEDGE_REFRESH_MINUTES
TICKET_INGEST_URL
CHAT_SERVICE_TOKEN
CHAT_TICKET_SECRET
CODEX_HOME
```

Do not copy, print, commit, or send the values in this file. There is no `OPENAI_API_KEY`; the service uses the owner's ChatGPT sign-in through the Codex SDK.

## Service, health, and logs

- Service: `frenchify-chat.service`
- Service account: `frenchify-chat` (non-login, no administrative rights)
- Internal listener: `127.0.0.1:4310` only
- Reverse proxy and TLS: Caddy
- Automatic health timer: `frenchify-chat-healthcheck.timer`, every minute

Check service status:

```bash
sudo /usr/local/sbin/frenchify-chat-status
```

Restart the service and verify health:

```bash
sudo /usr/local/sbin/frenchify-chat-restart
```

Read the latest 200 service log lines:

```bash
sudo /usr/local/sbin/frenchify-chat-logs
```

Check public health:

```bash
curl -fsS https://chat.frenchifywithvyom.com/health
```

A healthy response is:

```json
{"ok":true,"model":"gpt-5.6-luna"}
```

## Persistent data and knowledge

- Chat database: `/var/lib/frenchify-chat/data/chat.sqlite`
- Knowledge cache: `/var/lib/frenchify-chat/knowledge/`
- ChatGPT/Codex sign-in: `/var/lib/frenchify-chat/.codex/`

The database, knowledge cache, and ChatGPT sign-in live outside release directories, so deploys and rollbacks do not erase them. The `.codex` directory is mode `0700`, owned by `frenchify-chat`; Allen cannot read it directly or through his allowed `sudo` commands.

The chatbot refreshes its Google knowledge document every 15 minutes. Update that document to change normal answers; a code deployment is not required.

## Backups and restore

- Backups: `/var/backups/frenchify-chat/`
- Timer: `frenchify-chat-backup.timer`
- Schedule: nightly at 03:15 UTC, with up to five minutes of randomized delay
- Retention: 14 days
- Included: a consistent SQLite backup, knowledge cache, Codex session history, and release metadata
- Excluded: the ChatGPT authentication file and `/etc/frenchify-chat.env`

List available backups:

```bash
sudo /usr/local/sbin/frenchify-chat-backups
```

Restore the newest backup:

```bash
sudo /usr/local/sbin/frenchify-chat-restore-latest
```

The restore command validates archive paths and SQLite integrity, creates an additional safety backup, stops the service, restores persistent data, fixes ownership and permissions, starts the service, and checks health. A complete backup-and-restore cycle was exercised successfully during handover.

## What Allen can do

Allen can independently:

- connect over SSH with his private key;
- check status and logs;
- restart the chatbot;
- deploy the latest `main` branch;
- roll back one release;
- list backups and restore the newest backup.

Allen cannot redo or copy Vyom's ChatGPT sign-in. If `codex login status` expires or logs report an authentication failure, contact Vyom at `admin@frenchifywithvyom.com`. Vyom must personally complete the official ChatGPT sign-in using his own account and password; Allen must not request, receive, or store that password.

## First-response troubleshooting

1. **Chatbot is unavailable or returns gateway errors**

   Run:

   ```bash
   sudo /usr/local/sbin/frenchify-chat-status
   ```

   If inactive or unhealthy, run the documented restart command and recheck the public health URL.

2. **A new deployment behaves incorrectly**

   Run:

   ```bash
   sudo /usr/local/sbin/frenchify-chat-rollback
   ```

   Then check public health and review the logs.

3. **Answers fail with authentication or model errors**

   Run:

   ```bash
   sudo /usr/local/sbin/frenchify-chat-logs
   ```

   If the logs show an expired ChatGPT sign-in, contact Vyom. Only Vyom can perform that sign-in again.
