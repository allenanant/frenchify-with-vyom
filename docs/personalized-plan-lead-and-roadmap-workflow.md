# Personalized plan lead + free roadmap workflow

Implemented September 24, 2026.

## Visitor journey

1. The home page promises a personalized recommendation and the complete French roadmap free.
2. The visitor answers all eight quiz questions. The struggle question accepts multiple answers.
3. The visitor enters name, email, phone, country/time zone, and creates a roadmap password.
4. Marketing consent is an optional, unticked checkbox. Roadmap access does not depend on consent.
5. The server validates and recomputes the recommendation, saves the account and quiz data in Neon, and creates a 30-day secure session.
6. The contact is upserted into the Frenchify GoHighLevel location and tagged with its source, level, goal, exam, recommended program, and struggle areas.
7. Only a visitor who checked the marketing box is enrolled in the existing `Website Submission - Forms and Chatbot` workflow. This keeps the lead capture separate from permission to send marketing email.
8. The result page links to `/free-french-roadmap/`, where the supplied Google document is embedded in view mode.
9. On a later visit, the visitor can sign in at `/free-french-roadmap/login/` with the same email and password without retaking the quiz.

## GoHighLevel behaviour

- Location: the existing Frenchify location (`cmjlzerv4DUDyZFj6PYO`).
- Credentials: the existing `GHL_FRENCHIFY_API_KEY` production secret.
- Nurture workflow: the existing `CHAT_LEAD_WORKFLOW_ID`, currently `Website Submission - Forms and Chatbot`.
- Contact matching: HighLevel's contact upsert endpoint applies the location's existing duplicate-contact rules.
- Protected fields: the upsert deliberately omits owner, existing tags, DND settings, and custom fields so it cannot erase established contact settings.
- Segmentation tags are appended through HighLevel's Add Tags endpoint; they never replace the contact's tag collection.
- The marketing workflow enrollment happens only after recorded affirmative consent.
- Quiz data is also retained in Neon as the complete source record. Passwords are never sent to GoHighLevel.

If GoHighLevel is temporarily unavailable, the account and lead submission remain saved. The row returns to `pending` and is retried when the visitor next opens the roadmap, with a five-minute backoff to prevent retry storms.

## Data and security

- Passwords are bcrypt-hashed at cost 12 and never stored or logged in plaintext.
- Session tokens contain 256 bits of randomness. Only their SHA-256 hashes are stored in Neon.
- Session cookies are HTTP-only, SameSite=Lax, and Secure in production.
- Login throttling is stored in Postgres, so it works across Vercel serverless instances.
- Consent evidence includes the exact checkbox copy, copy version, timestamp, and a salted one-way IP fingerprint. The raw IP is not stored.
- Existing users must prove the existing password before a repeated questionnaire can update their saved result.
- The roadmap page is excluded from search-engine indexing.

## Required Google document setting

The website embeds this document in preview mode:

`https://docs.google.com/document/d/17oCPb66NFQJfYa3Qo3E6KYHpo-xxwDlSksL2E0fuPDw/preview`

The document owner must perform this one-time Google setting:

1. Open the document and choose **Share**.
2. Set general access to **Anyone with the link — Viewer**, so authenticated roadmap users can see the embed without a second Google sign-in.
3. Open the Share settings (gear).
4. Turn off **Viewers and commenters can see the option to download, print, and copy**.

The iframe also omits the browser's download permission. No website can prevent screenshots, photography, manual retyping, or every technically sophisticated form of copying; Google's setting removes the normal download, print, and copy controls.

## Operational checks

After deployment, use a new test email and verify:

1. The checkbox starts unticked.
2. The quiz submission reaches the result page and the roadmap opens without another sign-in.
3. A private/incognito window can sign in with the new email and password.
4. The contact exists once in the Frenchify GoHighLevel location and has the personalized-plan tags.
5. An opted-in test contact enters `Website Submission - Forms and Chatbot`.
6. An opted-out test contact exists in GoHighLevel but is not API-enrolled in that workflow.
7. The Google document shows viewer controls without download, print, or copy options.
8. A wrong password returns a generic error and repeated failures are throttled.

## Relevant code

- Quiz and account creation UI: `next-site/app/personalized-french-plan-pr/PersonalizedFrenchPlanQuiz.tsx`
- Submission endpoint: `next-site/app/api/personalized-plan/submit/route.ts`
- Roadmap pages: `next-site/app/free-french-roadmap/`
- Validation, authentication, storage, and CRM retry: `next-site/lib/roadmap/`
- Shared GoHighLevel client: `next-site/lib/ghl-chat-lead.mjs`
