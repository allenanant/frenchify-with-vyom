import { Codex } from '@openai/codex-sdk';
import { cleanReply, firstTurnPrompt, nextTurnPrompt, OUTPUT_SCHEMA } from './prompt.mjs';
import { resolveLinks } from './links.mjs';

const FALLBACK = {
  reply: "I couldn't confirm that from the Frenchify knowledge bank. Would you like me to raise a support ticket?",
  linkKeys: [],
  suggestTicket: true,
  ticketCategory: 'Something else',
  ticketSubject: 'Question needs human review',
};

function parseAnswer(text) {
  try {
    const parsed = JSON.parse(String(text));
    return {
      reply: cleanReply(parsed.reply),
      linkKeys: Array.isArray(parsed.linkKeys) ? parsed.linkKeys : [],
      suggestTicket: Boolean(parsed.suggestTicket),
      ticketCategory: String(parsed.ticketCategory || 'Something else'),
      ticketSubject: String(parsed.ticketSubject || 'Frenchify website question').slice(0, 120),
    };
  } catch {
    return FALLBACK;
  }
}

export class CodexChatAgent {
  constructor(config, codex = new Codex()) {
    this.config = config;
    this.codex = codex;
  }

  async answer(session, message, knowledge) {
    const canResume = session.codex_thread_id && session.knowledge_hash === knowledge.hash;
    const options = {
      model: this.config.model,
      modelReasoningEffort: this.config.reasoningEffort,
      sandboxMode: 'read-only',
      approvalPolicy: 'never',
      networkAccessEnabled: false,
      webSearchMode: 'disabled',
      workingDirectory: this.config.knowledgeDir,
      skipGitRepoCheck: true,
    };
    const thread = canResume
      ? this.codex.resumeThread(session.codex_thread_id, options)
      : this.codex.startThread(options);

    const prompt = canResume
      ? nextTurnPrompt({ message })
      : firstTurnPrompt({ name: session.name, message, ...knowledge });
    const turn = await thread.run(prompt, {
      outputSchema: OUTPUT_SCHEMA,
      signal: AbortSignal.timeout(55_000),
    });
    const answer = parseAnswer(turn.finalResponse);

    return {
      ...answer,
      links: resolveLinks(answer.linkKeys, { visitorMessage: message }),
      threadId: thread.id,
      knowledgeHash: knowledge.hash,
      usage: turn.usage,
    };
  }
}
