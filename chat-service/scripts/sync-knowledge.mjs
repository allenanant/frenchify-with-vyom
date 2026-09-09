import { loadConfig } from '../src/config.mjs';
import { loadKnowledge, prepareKnowledge, syncKnowledge } from '../src/knowledge.mjs';

const config = loadConfig();
await prepareKnowledge(config);
await syncKnowledge(config, { force: true });
const knowledge = await loadKnowledge(config);
console.log(`Knowledge synced. Revision ${knowledge.hash.slice(0, 12)}.`);
