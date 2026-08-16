export type TrackId = 'tef' | 'tcf';

export type Level = {
  code: string;
  /** Big display label on the level card. Falls back to `code` when absent. */
  display?: string;
  /**
   * CEFR nickname under the big label. Optional and currently unused: Vyom
   * removed them on 11 Aug 2026 because students read "Beginner" / "(Intermediate)"
   * as the product name and could not tell the four levels apart. The field
   * stays so a label can be put back on one card without a schema change.
   */
  name?: string;
  blurb: string;
  formats: string[];
  href: string;
};

/**
 * A promoted destination shown under the level columns. Lives on the track, not
 * on a level, because it exists for one exam only — /exam-prep-1-tef is TEF
 * Canada content and must never surface on the TCF side.
 */
export type Spotlight = {
  eyebrow: string;
  title: string;
  copy: string;
  cta: string;
  href: string;
};

export type Track = {
  id: TrackId;
  exam: string;
  sub: string;
  levels: Level[];
  spotlight?: Spotlight;
};

const LEVELS: Omit<Level, 'blurb'>[] = [
  {
    code: 'A1',
    formats: ['Intensive + Live', 'Self-Study'],
    href: '/a1-course',
  },
  {
    code: 'A2',
    formats: ['Intensive + Live', 'Self-Study'],
    href: '/a2-course',
  },
  {
    code: 'B1',
    display: 'Exam Prep 1',
    formats: [
      'Intensive (Live Speaking Sessions)',
      'Flex (Live 1-1 sessions)',
      'CLB 5 for Work Permit',
    ],
    href: '/b1-course',
  },
  {
    code: 'B2',
    display: 'Final Exam Prep',
    formats: ['Intensive (Live Speaking Sessions)', 'Flex (Live 1-1 sessions)'],
    href: '/b2-course',
  },
];

const BLURBS: Record<string, string> = {
  A1: 'Your starting point — build the foundation.',
  A2: 'Deepen your skills with real-life French.',
  B1: 'All four exam modules, levelled up.',
  B2: 'The All-In — exam-specific mastery.',
};

/*
 * The "Exam Prep 1 runs as three programs" strip used to live here and render
 * under the TEF level columns. Vyom pulled it on 11 Aug 2026: this page is the
 * level chooser, and splitting Exam Prep 1 into three sub-programs at the same
 * moment someone is picking a level made students hesitate rather than choose.
 * /exam-prep-1-tef is still live and still linked from the B1 card's own page.
 * The Spotlight type and the render block are intact, so setting `spotlight`
 * on a track brings it straight back.
 */

export const TRACKS: Record<TrackId, Track> = {
  tef: {
    id: 'tef',
    exam: 'TEF Canada',
    sub: 'Every level of the TEF journey — pick where you are.',
    levels: LEVELS.map((l) => ({ ...l, blurb: BLURBS[l.code] })),
  },
  tcf: {
    id: 'tcf',
    exam: 'TCF Canada',
    sub: 'Every level of the TCF journey — pick where you are.',
    levels: LEVELS.map((l) => ({ ...l, blurb: BLURBS[l.code] })),
  },
};
