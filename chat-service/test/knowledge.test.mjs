import assert from 'node:assert/strict';
import test from 'node:test';
import { htmlToText } from '../src/knowledge.mjs';

test('website extraction removes scripts and keeps readable text', () => {
  const text = htmlToText('<h1>A1 &amp; A2</h1><script>steal()</script><p>Course details</p>');
  assert.equal(text, 'A1 & A2 Course details');
});
