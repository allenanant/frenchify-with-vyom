import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'announcements');
const TYPES = ['webinars', 'discounts', 'results', 'news'];

if (!fs.existsSync(CONTENT_DIR)) {
  console.error(`Missing folder: ${CONTENT_DIR}`);
  process.exit(1);
}

let total = 0;
let errors = 0;

for (const folder of TYPES) {
  const dir = path.join(CONTENT_DIR, folder);
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));

  for (const f of files) {
    total++;
    const filePath = path.join(dir, f);
    const { data } = matter(fs.readFileSync(filePath, 'utf-8'));
    const checks = [
      { ok: typeof data.title === 'string' && data.title.length > 0, msg: 'missing title' },
      { ok: typeof data.createdAt === 'string', msg: 'missing createdAt' },
      { ok: !data.images || Array.isArray(data.images), msg: 'images must be a list' },
    ];
    const failed = checks.filter((c) => !c.ok);
    if (failed.length > 0) {
      console.error(`✗ ${folder}/${f}: ${failed.map((c) => c.msg).join(', ')}`);
      errors++;
    } else {
      console.log(`✓ ${folder}/${f}`);
    }
  }
}

if (errors > 0) {
  console.error(`\n${errors} file(s) failed validation`);
  process.exit(1);
}
console.log(`\nAll ${total} announcement file(s) validated successfully`);
