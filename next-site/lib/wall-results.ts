// Server-only loader for the Wall of Excellence (/results-page).
// Reads CMS entries from content/wall-results/*.md — one file per upload
// batch, each tagged with a wall level (see lib/wall-levels.ts) and a list of
// result screenshot images.

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { newestFirst } from './content-date';
import { emptyWalls, toWallLevel, type WallLevel } from './wall-levels';

export type WallResults = Record<WallLevel, string[]>;

const CONTENT_DIR = path.join(process.cwd(), 'content', 'wall-results');

export function getWallResults(): WallResults {
  const results: WallResults = emptyWalls();
  if (!fs.existsSync(CONTENT_DIR)) return results;

  const entries = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
      const { data } = matter(raw);
      return {
        level: toWallLevel(data.clbLevel),
        images: Array.isArray(data.images) ? (data.images as unknown[]).map(String) : [],
        createdAt: data.createdAt,
        id: file,
      };
    })
    // Newest batch first, on every wall. See lib/content-date.ts for why this
    // cannot be a string comparison.
    .sort(newestFirst);

  for (const entry of entries) {
    results[entry.level].push(...entry.images);
  }
  return results;
}
