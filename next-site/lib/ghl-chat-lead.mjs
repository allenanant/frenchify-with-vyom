const BASE = 'https://services.leadconnectorhq.com';
const LOCATION = 'cmjlzerv4DUDyZFj6PYO';

/** @param {{ name: string, email: string, phone: string }} lead
 * @param {{ token?: string, workflowId?: string }} config
 * @param {typeof fetch} fetchImpl */
export async function syncChatLead(lead, config, fetchImpl = fetch) {
  if (!config.token || !config.workflowId) throw new Error('Chat lead routing is not configured.');
  const headers = {
    authorization: `Bearer ${config.token}`,
    version: '2021-07-28',
    'content-type': 'application/json',
  };
  const upsert = await fetchImpl(`${BASE}/contacts/upsert`, {
    method: 'POST', headers,
    // Omit tags, owner, DND and custom fields to preserve existing contact settings.
    body: JSON.stringify({ locationId: LOCATION, name: lead.name, email: lead.email, phone: lead.phone }),
    signal: AbortSignal.timeout(8_000),
  });
  const contact = await upsert.json().catch(() => ({}));
  if (!upsert.ok || !contact.contact?.id || contact.contact.locationId !== LOCATION) {
    throw new Error(`Contact sync failed (${upsert.status}).`);
  }
  const enrollment = await fetchImpl(
    `${BASE}/contacts/${encodeURIComponent(contact.contact.id)}/workflow/${encodeURIComponent(config.workflowId)}`,
    {
      method: 'POST', headers, body: JSON.stringify({}),
      signal: AbortSignal.timeout(8_000),
    }
  );
  const result = await enrollment.json().catch(() => ({}));
  if (!enrollment.ok || (result.succeeded ?? result.succeded) !== true) {
    throw new Error(`Lead workflow enrollment failed (${enrollment.status}).`);
  }
  return { ok: true };
}
