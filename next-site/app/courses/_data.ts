export type TrackId = 'tef' | 'tcf';

export type Level = {
  code: string;
  /** Big display label on the level card. Falls back to `code` when absent. */
  display?: string;
  name: string;
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
    name: 'Beginner',
    formats: ['Intensive + Live', 'Self-Study'],
    href: '/a1-course',
  },
  {
    code: 'A2',
    name: 'Elementary',
    formats: ['Intensive + Live', 'Self-Study'],
    href: '/a2-course',
  },
  {
    code: 'B1',
    display: 'Exam Prep 1',
    name: '(Intermediate)',
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
    name: '(TEF/TCF Ready)',
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

const TEF_SPOTLIGHT: Spotlight = {
  eyebrow: 'TEF Canada',
  title: 'Exam Prep 1 runs as three programs',
  copy: 'EP1 Intensive, EP1 Flex and CLB 5 Speaking and Listening. Compare what is inside each one, see the fees, and book the Analysis Test.',
  cta: 'See Exam Prep 1 programs',
  href: '/exam-prep-1-tef',
};

export const TRACKS: Record<TrackId, Track> = {
  tef: {
    id: 'tef',
    exam: 'TEF Canada',
    sub: 'Every level of the TEF journey — pick where you are.',
    levels: LEVELS.map((l) => ({ ...l, blurb: BLURBS[l.code] })),
    spotlight: TEF_SPOTLIGHT,
  },
  tcf: {
    id: 'tcf',
    exam: 'TCF Canada',
    sub: 'Every level of the TCF journey — pick where you are.',
    levels: LEVELS.map((l) => ({ ...l, blurb: BLURBS[l.code] })),
  },
};
