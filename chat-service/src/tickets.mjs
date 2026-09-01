const CATEGORIES = new Set([
  'Course access or login',
  'Payment or invoice',
  'Live class or schedule',
  'Course content or material',
  'Certificate or exam',
  'Technical problem',
  'Something else',
]);

export class TicketPoster {
  constructor(config, fetchImpl = fetch) {
    this.config = config;
    this.fetch = fetchImpl;
  }

  async create({ requestId, session, category, subject, reason, transcript }) {
    const response = await this.fetch(this.config.ticketIngestUrl, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${this.config.ticketSecret}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        requestId,
        sessionId: session.id,
        name: session.name,
        email: session.email,
        category: CATEGORIES.has(category) ? category : 'Something else',
        subject: String(subject || 'Frenchify website question').slice(0, 120),
        reason: String(reason || '').slice(0, 2_000),
        transcript: transcript.slice(-20).map((item) => ({
          role: item.role,
          content: String(item.content).slice(0, 1_200),
        })),
      }),
      signal: AbortSignal.timeout(15_000),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok || !body.ref) throw new Error(`Ticket endpoint returned ${response.status}.`);
    return { ref: String(body.ref) };
  }
}
