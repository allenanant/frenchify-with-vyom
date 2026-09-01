import path from 'node:path';
import { fileURLToPath } from 'node:url';

const serviceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function positiveInt(name, fallback) {
  const value = Number(process.env[name] ?? fallback);
  if (!Number.isSafeInteger(value) || value < 1) throw new Error(`${name} must be a positive integer.`);
  return value;
}

export function loadConfig(overrides = {}) {
  return {
    serviceRoot,
    port: positiveInt('PORT', 4310),
    serviceToken: process.env.CHAT_SERVICE_TOKEN ?? '',
    model: process.env.CHAT_MODEL || 'gpt-5.6-luna',
    reasoningEffort: process.env.CHAT_REASONING_EFFORT || 'low',
    knowledgeDir: path.join(serviceRoot, 'knowledge'),
    dataDir: path.join(serviceRoot, 'data'),
    refreshMinutes: positiveInt('KNOWLEDGE_REFRESH_MINUTES', 15),
    maxMessagesPerSession: positiveInt('CHAT_MAX_MESSAGES', 8),
    ticketIngestUrl:
      process.env.TICKET_INGEST_URL || 'https://frenchifywithvyom.com/api/support/chat-ticket',
    ticketSecret: process.env.CHAT_TICKET_SECRET ?? '',
    ...overrides,
  };
}

export function assertProductionConfig(config) {
  if (config.serviceToken.length < 32) throw new Error('CHAT_SERVICE_TOKEN must be at least 32 characters.');
  if (config.ticketSecret.length < 32) throw new Error('CHAT_TICKET_SECRET must be at least 32 characters.');
  if (!['low', 'medium'].includes(config.reasoningEffort)) {
    throw new Error('CHAT_REASONING_EFFORT must be low or medium. Luna does not accept minimal.');
  }
}
