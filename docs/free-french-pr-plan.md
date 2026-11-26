# Free French PR study plan funnel

The evergreen quiz lives at `/free-french-pr-plan/`. Its four questions cover the visitor’s goal, level, learning preference and exam status. Visitors aiming for CLB 5 also see a question about their work permit timeline. The result is shown on the website after submission. The quiz does not require a password, promise an exam score or a date, or unlock a PDF.

## Lead delivery

1. The website validates the answers and contact details. Name and email are required. Phone is optional and must include the country code when provided.
2. The API upserts the visitor in the Frenchify GoHighLevel location with `GHL_FRENCHIFY_API_KEY`, adds `website-french-pr-plan-quiz`, and stores the submitted choices and recommended path as a contact note.
3. The API adds the contact to the dedicated `Website — Free French PR Quiz — Admin Alert` workflow (`27e4dc36-6360-44df-b8fc-fcdf898e1991`). Only `admin@frenchifywithvyom.com` receives the internal email. The workflow does not email the visitor or subscribe them to marketing.
4. Neon records delivery checkpoints for retries without creating a roadmap account. The on-page result appears after GoHighLevel confirms the API workflow enrollment. Inbox delivery should be verified independently.

GoHighLevel workflow link: https://app.gohighlevel.com/v2/location/cmjlzerv4DUDyZFj6PYO/automation/workflow/27e4dc36-6360-44df-b8fc-fcdf898e1991

## Launch and rollback

On a production deployment, send one clearly labelled internal test using a business-owned email alias. Confirm the result is displayed, the GoHighLevel tag and contact note are saved, and the alert arrives in the admin inbox. Then switch the homepage CTAs. Keep the old `/personalized-french-plan-pr/` and `/free-french-roadmap/login/` paths available so existing links and saved accounts continue working.

To roll back the homepage, revert the homepage CTA commit. Do not delete existing CRM contacts, roadmap accounts, or unrelated workflows.
