// The walls on /results-page. Client-safe: no Node imports, so the admin UI,
// the server actions, the loader and the gallery all share this one list.
//
// `clbLevel` in content/wall-results/*.md holds one of these values. Older
// files only ever used clb7 / clb5, and anything unknown has always fallen
// back to clb7, so toWallLevel keeps that rule.

export const WALL_LEVELS = ['clb7', 'clb5', 'tcf-clb7', 'tcf-clb5'] as const;

export type WallLevel = (typeof WALL_LEVELS)[number];

/** Short name, used on the filter buttons, the admin picker and commit messages. */
export const WALL_LEVEL_LABELS: Record<WallLevel, string> = {
  clb7: 'CLB 7+',
  clb5: 'CLB 5',
  'tcf-clb7': 'TCF CLB 7',
  'tcf-clb5': 'TCF CLB 5',
};

export function isWallLevel(value: unknown): value is WallLevel {
  return typeof value === 'string' && (WALL_LEVELS as readonly string[]).includes(value);
}

export function toWallLevel(value: unknown): WallLevel {
  return isWallLevel(value) ? value : 'clb7';
}

export function emptyWalls(): Record<WallLevel, string[]> {
  return { clb7: [], clb5: [], 'tcf-clb7': [], 'tcf-clb5': [] };
}
