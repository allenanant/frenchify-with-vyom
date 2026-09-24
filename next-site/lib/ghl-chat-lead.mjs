const BASE = 'https://services.leadconnectorhq.com';
const LOCATION = 'cmjlzerv4DUDyZFj6PYO';

function headers(token) {
  return {
    authorization: `Bearer ${token}`,
    version: '2021-07-28',
    'content-type': 'application/json',
  };
}

/**
 * Upsert only the contact fields supplied by the visitor. Keeping tags, owner,
 * DND and custom fields out of this request is deliberate: HighLevel treats
 * several of those as replacements, which could erase work already attached
 * to an existing contact.
 *
 * @param {{ name: string, email: string, phone: string }} lead
 * @param {{ token?: string }} config
 * @param {typeof fetch} fetchImpl
 */
export async function upsertFrenchifyContact(lead, config, fetchImpl = fetch) {
  if (!config.token) throw new Error('GHL contact routing is not configured.');
  const response = await fetchImpl(`${BASE}/contacts/upsert`, {
    method: 'POST',
    headers: headers(config.token),
    body: JSON.stringify({ locationId: LOCATION, name: lead.name, email: lead.email, phone: lead.phone }),
    signal: AbortSignal.timeout(8_000),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.contact?.id || result.contact.locationId !== LOCATION) {
    throw new Error(`Contact sync failed (${response.status}).`);
  }
  return { contactId: result.contact.id };
}

/** @param {string} contactId
 * @param {string[]} tags
 * @param {{ token?: string }} config
 * @param {typeof fetch} fetchImpl */
export async function addFrenchifyContactTags(contactId, tags, config, fetchImpl = fetch) {
  if (!config.token) throw new Error('GHL contact routing is not configured.');
  if (!tags.length) return { ok: true };
  const response = await fetchImpl(`${BASE}/contacts/${encodeURIComponent(contactId)}/tags`, {
    method: 'POST',
    headers: headers(config.token),
    body: JSON.stringify({ tags }),
    signal: AbortSignal.timeout(8_000),
  });
  if (!response.ok) throw new Error(`Contact tag sync failed (${response.status}).`);
  return { ok: true };
}

/** @param {string} contactId
 * @param {{ token?: string, workflowId?: string }} config
 * @param {typeof fetch} fetchImpl */
export async function enrollFrenchifyContact(contactId, config, fetchImpl = fetch) {
  if (!config.token || !config.workflowId) throw new Error('GHL workflow routing is not configured.');
  const response = await fetchImpl(
    `${BASE}/contacts/${encodeURIComponent(contactId)}/workflow/${encodeURIComponent(config.workflowId)}`,
    {
      method: 'POST',
      headers: headers(config.token),
      body: JSON.stringify({}),
      signal: AbortSignal.timeout(8_000),
    }
  );
  const result = await response.json().catch(() => ({}));
  if (!response.ok || (result.succeeded ?? result.succeded) !== true) {
    throw new Error(`Lead workflow enrollment failed (${response.status}).`);
  }
  return { ok: true };
}

/** @param {{ name: string, email: string, phone: string }} lead
 * @param {{ token?: string, workflowId?: string }} config
 * @param {typeof fetch} fetchImpl */
export async function syncChatLead(lead, config, fetchImpl = fetch) {
  if (!config.token || !config.workflowId) throw new Error('Chat lead routing is not configured.');
  const { contactId } = await upsertFrenchifyContact(lead, config, fetchImpl);
  await enrollFrenchifyContact(contactId, config, fetchImpl);
  return { ok: true };
}
