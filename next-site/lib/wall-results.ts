// Server-only loader for the Wall of Excellence (/results-page).
// Reads CMS entries from content/wall-results/*.md — one file per upload
// batch, each tagged clb7 or clb5 with a list of result screenshot images.

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type WallResults = {
  clb7: string[];
  clb5: string[];
};

const CONTENT_DIR = path.join(process.cwd(), 'content', 'wall-results');

export function getWallResults(): WallResults {
  const results: WallResults = { clb7: [], clb5: [] };
  if (!fs.existsSync(CONTENT_DIR)) return results;

  const entries = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
      const { data } = matter(raw);
      const level: keyof WallResults = data.clbLevel === 'clb5' ? 'clb5' : 'clb7';
      return {
        level,
        images: Array.isArray(data.images) ? (data.images as unknown[]).map(String) : [],
        createdAt: String(data.createdAt ?? ''),
      };
    })
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  for (const entry of entries) {
    results[entry.level].push(...entry.images);
  }
  return results;
}
