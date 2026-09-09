import { createHash } from 'node:crypto';
import { constants } from 'node:fs';
import { copyFile, mkdir, readFile, rename, stat, utimes, writeFile } from 'node:fs/promises';
import path from 'node:path';

const PRIMARY_EXPORT =
  'https://docs.google.com/document/d/1ygfKY-F294oofmZhogPwy2K4g4foODItYCtcFrh4cbY/export?format=txt';

const WEBSITE_PATHS = [
  '/',
  '/courses/',
  '/courses/tef/',
  '/courses/tcf/',
  '/a1-course/',
  '/a2-course/',
  '/exam-prep-1-tef/',
  '/tef-canada-exam/',
  '/analysis-page/',
  '/book-a-meet/',
  '/student-meetings-calendar/',
  '/one-on-one-speaking/',
  '/a1-renewal/',
  '/a2-renewal/',
  '/pre-register-for-b1/',
  '/pre-register-for-b2/',
  '/faq/',
  '/contact/',
  '/student-support/',
];

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}

export function htmlToText(html) {
  return decodeEntities(
    String(html)
      .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
      .replace(/<svg\b[\s\S]*?<\/svg>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  )
    .replace(/\s+/g, ' ')
    .trim();
}

async function atomicWrite(file, content) {
  const temp = `${file}.${process.pid}.tmp`;
  await writeFile(temp, content, 'utf8');
  await rename(temp, file);
}

// Releases may be read-only. Keep refreshed knowledge beside the writable database,
// seeding it once from the existing knowledge bank without overwriting newer data.
export async function prepareKnowledge(config) {
  await mkdir(config.knowledgeDir, { recursive: true });
  for (const name of ['primary.md', 'website.md', 'website-live.md']) {
    try {
      const source = path.join(config.knowledgeSeedDir, name);
      const destination = path.join(config.knowledgeDir, name);
      await copyFile(source, destination, constants.COPYFILE_EXCL);
      const modified = await stat(source);
      await utimes(destination, modified.atime, modified.mtime);
    } catch (error) {
      if (error.code === 'EEXIST' || (name === 'website-live.md' && error.code === 'ENOENT')) continue;
      throw error;
    }
  }
}

async function fetchText(url, timeoutMs = 15_000) {
  const response = await fetch(url, { signal: AbortSignal.timeout(timeoutMs), redirect: 'follow' });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.text();
}

export async function syncKnowledge(config, { force = false } = {}) {
  await mkdir(config.knowledgeDir, { recursive: true });
  const liveFile = path.join(config.knowledgeDir, 'website-live.md');
  if (!force) {
    const current = await stat(liveFile).catch(() => null);
    if (current && Date.now() - current.mtimeMs < config.refreshMinutes * 60_000) return;
  }

  const primaryFile = path.join(config.knowledgeDir, 'primary.md');
  const primary = await fetchText(process.env.KNOWLEDGE_DOCUMENT_URL || PRIMARY_EXPORT).catch(() => null);
  if (primary?.trim()) await atomicWrite(primaryFile, primary.replace(/^\uFEFF/, '').trim() + '\n');

  const sections = [];
  for (const pathname of WEBSITE_PATHS) {
    const url = new URL(pathname, 'https://frenchifywithvyom.com').toString();
    const html = await fetchText(url).catch(() => null);
    if (!html) continue;
    const main = html.match(/<main\b[\s\S]*?<\/main>/i)?.[0] || html;
    const text = htmlToText(main).slice(0, 900);
    if (text) sections.push(`## ${url}\n\n${text}`);
  }
  if (sections.length) {
    await atomicWrite(
      liveFile,
      '# Live website snapshot\n\nSecondary context only. The primary knowledge bank wins on facts and policy.\n\n' +
        sections.join('\n\n') +
        '\n'
    );
  }
  console.log(`[knowledge-sync] Refreshed primary=${Boolean(primary?.trim())}, website=${sections.length > 0}.`);
}

export async function loadKnowledge(config) {
  const primary = await readFile(path.join(config.knowledgeDir, 'primary.md'), 'utf8');
  const curated = await readFile(path.join(config.knowledgeDir, 'website.md'), 'utf8');
  const live = await readFile(path.join(config.knowledgeDir, 'website-live.md'), 'utf8').catch(() => '');
  const website = `${curated}\n\n${live}`.trim();
  const hash = createHash('sha256').update(primary).update('\0').update(website).digest('hex');
  return { primary, website, hash };
}
