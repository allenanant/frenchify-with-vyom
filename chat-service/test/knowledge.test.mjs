import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { htmlToText, loadKnowledge, prepareKnowledge } from '../src/knowledge.mjs';
import { loadConfig } from '../src/config.mjs';

test('website extraction removes scripts and keeps readable text', () => {
  const text = htmlToText('<h1>A1 &amp; A2</h1><script>steal()</script><p>Course details</p>');
  assert.equal(text, 'A1 & A2 Course details');
});

test('seeds a writable knowledge cache and preserves refreshed content across releases', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'frenchify-knowledge-'));
  try {
    const seed = path.join(dir, 'release');
    await mkdir(seed);
    await writeFile(path.join(seed, 'primary.md'), 'Existing knowledge');
    await writeFile(path.join(seed, 'website.md'), 'Curated website');
    const config = loadConfig({ dataDir: path.join(dir, 'data'), knowledgeSeedDir: seed });
    await prepareKnowledge(config);
    assert.equal((await loadKnowledge(config)).primary, 'Existing knowledge');
    await writeFile(path.join(config.knowledgeDir, 'primary.md'), 'Fresh document content');
    await writeFile(path.join(seed, 'primary.md'), 'Older release content');
    await prepareKnowledge(config);
    assert.equal((await loadKnowledge(config)).primary, 'Fresh document content');
    assert.equal(await readFile(path.join(seed, 'primary.md'), 'utf8'), 'Older release content');
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
