import { CodexChatAgent } from '../src/agent.mjs';
import { loadConfig } from '../src/config.mjs';
import { loadKnowledge } from '../src/knowledge.mjs';

const config = loadConfig();
const knowledge = await loadKnowledge(config);
const started = Date.now();
const answer = await new CodexChatAgent(config).answer(
  { name: 'Test Visitor', codex_thread_id: null, knowledge_hash: null },
  'I am a complete beginner. Which course should I read about?',
  knowledge
);

console.log(
  JSON.stringify(
    {
      reply: answer.reply,
      links: answer.links,
      suggestTicket: answer.suggestTicket,
      elapsedMs: Date.now() - started,
    },
    null,
    2
  )
);
