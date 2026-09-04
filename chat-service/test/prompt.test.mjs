import assert from 'node:assert/strict';
import test from 'node:test';
import { firstTurnPrompt, OUTPUT_SCHEMA } from '../src/prompt.mjs';

test('the first turn fixes source priority and output size', () => {
  const prompt = firstTurnPrompt({ name: 'Asha', message: 'A1?', primary: 'PRIMARY FACT', website: 'SITE FACT' });
  assert.ok(prompt.indexOf('PRIMARY FACT') < prompt.indexOf('SITE FACT'));
  assert.match(prompt, /source of truth/i);
  assert.match(prompt, /student_mentorship link is only for someone who explicitly says they're already a Frenchify student/i);
  assert.equal(OUTPUT_SCHEMA.properties.reply.maxLength, 800);
  assert.equal(OUTPUT_SCHEMA.properties.linkKeys.maxItems, 3);
});
