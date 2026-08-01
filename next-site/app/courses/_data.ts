export type TrackId = 'tef' | 'tcf';

export type Level = {
  code: string;
  name: string;
  blurb: string;
  formats: string[];
  href: string;
};

export type Track = {
  id: TrackId;
  exam: string;
  sub: string;
  levels: Level[];
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
    name: 'Intermediate',
    formats: ['Intensive + Live'],
    href: '/b1-course',
  },
  {
    code: 'B2',
    name: 'Upper Intermediate',
    formats: ['Intensive + Live'],
    href: '/b2-course',
  },
];

const BLURBS: Record<string, string> = {
  A1: 'Your starting point — build the foundation.',
  A2: 'Deepen your skills with real-life French.',
  B1: 'All four exam modules, levelled up.',
  B2: 'The All-In — exam-specific mastery.',
};

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
