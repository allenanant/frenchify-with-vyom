// scripts/check-announcements.mjs
// Run with: node scripts/check-announcements.mjs
// Validates that all .md files in content/announcements/ parse correctly.

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'announcements');
const VALID_TYPES = ['webinar', 'discount', 'result', 'news'];

if (!fs.existsSync(CONTENT_DIR)) {
  console.error(`Missing folder: ${CONTENT_DIR}`);
  process.exit(1);
}

const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));
let errors = 0;

for (const f of files) {
  const filePath = path.join(CONTENT_DIR, f);
  const { data } = matter(fs.readFileSync(filePath, 'utf-8'));

  const checks = [
    { ok: typeof data.title === 'string' && data.title.length > 0, msg: 'missing title' },
    { ok: VALID_TYPES.includes(data.type), msg: `invalid type "${data.type}"` },
    { ok: typeof data.createdAt === 'string', msg: 'missing createdAt' },
    { ok: !data.images || Array.isArray(data.images), msg: 'images must be a list' },
  ];

  const failed = checks.filter((c) => !c.ok);
  if (failed.length > 0) {
    console.error(`✗ ${f}: ${failed.map((c) => c.msg).join(', ')}`);
    errors++;
  } else {
    console.log(`✓ ${f}`);
  }
}

if (errors > 0) {
  console.error(`\n${errors} file(s) failed validation`);
  process.exit(1);
}

console.log(`\nAll ${files.length} announcement file(s) validated successfully`);
