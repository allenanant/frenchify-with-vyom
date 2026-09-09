export class LeadDelivery {
  constructor(config, store, fetchImpl = fetch) {
    this.url = new URL('/api/chat/lead', config.ticketIngestUrl);
    this.secret = config.ticketSecret;
    this.store = store;
    this.fetch = fetchImpl;
    this.running = null;
  }

  flush() {
    if (!this.running) {
      this.running = this.deliverPending()
        .catch(() => console.error('[chat-leads] Queue delivery failed; will retry.'))
        .finally(() => { this.running = null; });
    }
    return this.running;
  }

  async deliverPending() {
    for (const lead of this.store.pendingLeads()) {
      try {
        const response = await this.fetch(this.url, {
          method: 'POST',
          headers: { authorization: `Bearer ${this.secret}`, 'content-type': 'application/json' },
          body: JSON.stringify({ sessionId: lead.id, name: lead.name, email: lead.email, phone: lead.phone }),
          signal: AbortSignal.timeout(20_000),
        });
        const body = await response.json().catch(() => ({}));
        if (!response.ok || body.ok !== true) throw new Error('Lead delivery not acknowledged.');
        this.store.completeLead(lead.id);
      } catch {
        this.store.retryLead(lead.id, lead.attempts);
        // Never log submitted contact details, API responses, or credentials.
        console.error('[chat-leads] Delivery deferred; will retry automatically.');
      }
    }
  }
}
