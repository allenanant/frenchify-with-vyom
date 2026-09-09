import { createServer } from 'node:http';
import { CodexChatAgent } from './agent.mjs';
import { createApp } from './app.mjs';
import { assertProductionConfig, loadConfig } from './config.mjs';
import { syncKnowledge } from './knowledge.mjs';
import { ChatStore } from './store.mjs';
import { TicketPoster } from './tickets.mjs';
import { LeadDelivery } from './leads.mjs';

const config = loadConfig();
assertProductionConfig(config);

const store = new ChatStore(config.dataDir);
const leads = new LeadDelivery(config, store);
const app = createApp({
  config,
  store,
  agent: new CodexChatAgent(config),
  tickets: new TicketPoster(config),
  leads,
});

const server = createServer(app);
server.requestTimeout = 70_000;
server.headersTimeout = 75_000;
server.listen(config.port, '127.0.0.1', () => {
  console.log(`Frenchify chat listening on 127.0.0.1:${config.port} with ${config.model}.`);
});

syncKnowledge(config).catch((error) => console.error('[knowledge-sync]', error.message));
const refresh = setInterval(
  () => syncKnowledge(config).catch((error) => console.error('[knowledge-sync]', error.message)),
  config.refreshMinutes * 60_000
);
refresh.unref();
const leadRefresh = setInterval(() => void leads.flush(), 30_000);
leadRefresh.unref();
void leads.flush();

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    clearInterval(leadRefresh);
    clearInterval(refresh);
    server.close(async () => {
      await leads.running;
      store.close();
      process.exit(0);
    });
  });
}
