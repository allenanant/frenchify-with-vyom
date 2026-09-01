import { createServer } from 'node:http';
import { CodexChatAgent } from './agent.mjs';
import { createApp } from './app.mjs';
import { assertProductionConfig, loadConfig } from './config.mjs';
import { syncKnowledge } from './knowledge.mjs';
import { ChatStore } from './store.mjs';
import { TicketPoster } from './tickets.mjs';

const config = loadConfig();
assertProductionConfig(config);

const store = new ChatStore(config.dataDir);
const app = createApp({
  config,
  store,
  agent: new CodexChatAgent(config),
  tickets: new TicketPoster(config),
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

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    server.close(() => {
      store.close();
      process.exit(0);
    });
  });
}
