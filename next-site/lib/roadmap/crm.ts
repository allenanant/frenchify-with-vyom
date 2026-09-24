import 'server-only';

import {
  addFrenchifyContactTags,
  enrollFrenchifyContact,
  upsertFrenchifyContact,
} from '@/lib/ghl-chat-lead.mjs';
import * as db from './db';

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 42);
}
function accountTags(account: db.RoadmapAccount) {
  const answers = account.latest_answers;
  return [
    'website-personalized-plan',
    'free-roadmap-access',
    `quiz-level-${slug(answers.currentLevel)}`,
    `quiz-goal-${slug(answers.mainGoal)}`,
    `quiz-exam-${slug(answers.examTarget)}`,
    `recommended-${slug(account.recommended_program)}`,
    ...answers.biggestStruggle.map((item) => `quiz-struggle-${slug(item)}`),
    ...(account.marketing_consent ? ['marketing-consent-email'] : []),
  ];
}

/**
 * Best-effort delivery backed by the account row. A failure never loses the
 * lead: it returns to pending and is retried on the visitor's next roadmap
 * access, with a five-minute backoff enforced in the claim query.
 */
export async function syncPendingRoadmapAccount(accountId: number) {
  const account = await db.claimCrmSync(accountId);
  if (!account) return { status: 'not-pending' as const };

  try {
    const config = {
      token: process.env.GHL_FRENCHIFY_API_KEY,
      workflowId: process.env.CHAT_LEAD_WORKFLOW_ID,
    };
    const { contactId } = await upsertFrenchifyContact(
      { name: account.full_name, email: account.email, phone: account.phone },
      config,
    );
    await addFrenchifyContactTags(contactId, accountTags(account), config);

    const shouldEnroll = account.marketing_consent && !account.ghl_enrolled_at;
    if (shouldEnroll) await enrollFrenchifyContact(contactId, config);
    await db.markCrmSynced(account.id, contactId, shouldEnroll);
    return { status: 'synced' as const, contactId, enrolled: shouldEnroll };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown CRM error';
    console.error('[roadmap-crm] Lead saved locally; GHL delivery will retry.', message);
    await db.markCrmPending(account.id, message).catch(() => undefined);
    return { status: 'pending' as const };
  }
}
