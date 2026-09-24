import type { FrenchPlanAnswers } from '@/lib/french-plan';

const OPTIONS = {
  currentLevel: ['complete-beginner', 'some-basics', 'completed-a1', 'completed-a2', 'b1-b2', 'attempted-exam', 'unsure'],
  mainGoal: ['clb-5', 'clb-7-plus', 'clb-5-then-7', 'general-french', 'unsure'],
  workPermitExpiry: ['less-than-3-months', '3-to-6-months', '6-to-12-months', 'more-than-12-months', 'not-applicable', 'unsure'],
  dailyStudyTime: ['less-than-1-hour', '1-to-2-hours', '2-to-3-hours', '3-plus-hours', 'changing-schedule'],
  examTarget: ['tef-canada', 'tcf-canada', 'either', 'need-comparison', 'unsure'],
  biggestStruggle: ['speaking', 'listening', 'writing', 'reading', 'grammar', 'pronunciation'],
  learningPreference: ['live-group-plus-course', 'self-paced', 'one-to-one', 'mixed-live-one-to-one', 'recommend'],
  previousExamAttempt: ['no', 'yes-tef', 'yes-tcf', 'booked-not-taken'],
} as const;

export type RoadmapSubmission = {
  fullName: string;
  email: string;
  phone: string;
  countryTimezone: string;
  password: string;
  marketingConsent: boolean;
  answers: FrenchPlanAnswers;
};

type ValidationResult =
  | { ok: true; value: RoadmapSubmission }
  | { ok: false; error: string };

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function isOption<K extends keyof typeof OPTIONS>(key: K, value: string) {
  return (OPTIONS[key] as readonly string[]).includes(value);
}

export function validateRoadmapSubmission(body: unknown): ValidationResult {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Please complete the form.' };
  const raw = body as Record<string, unknown>;
  const fullName = clean(raw.fullName, 80);
  const email = clean(raw.email, 180).toLowerCase();
  const phone = clean(raw.phone, 30);
  const countryTimezone = clean(raw.countryTimezone, 80);
  const password = typeof raw.password === 'string' ? raw.password : '';

  if (fullName.length < 2) return { ok: false, error: 'Please enter your full name.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }
  if (!/^\+?[0-9() .-]{7,30}$/.test(phone)) {
    return { ok: false, error: 'Please enter a valid phone or WhatsApp number.' };
  }
  if (countryTimezone.length < 2) {
    return { ok: false, error: 'Please enter your country or time zone.' };
  }
  if (Buffer.byteLength(password, 'utf8') < 10) {
    return { ok: false, error: 'Use at least 10 characters for your roadmap password.' };
  }
  if (Buffer.byteLength(password, 'utf8') > 72) {
    return { ok: false, error: 'Your password is too long. Use 72 bytes or fewer.' };
  }
  if (typeof raw.passwordConfirmation !== 'string' || raw.passwordConfirmation !== password) {
    return { ok: false, error: 'The two passwords do not match.' };
  }

  const a = raw.answers;
  if (!a || typeof a !== 'object') return { ok: false, error: 'Please answer every quiz question.' };
  const answers = a as Record<string, unknown>;
  const currentLevel = clean(answers.currentLevel, 40);
  const mainGoal = clean(answers.mainGoal, 40);
  const workPermitExpiry = clean(answers.workPermitExpiry, 40);
  const dailyStudyTime = clean(answers.dailyStudyTime, 40);
  const examTarget = clean(answers.examTarget, 40);
  const learningPreference = clean(answers.learningPreference, 50);
  const previousExamAttempt = clean(answers.previousExamAttempt, 40);
  const biggestStruggle = Array.isArray(answers.biggestStruggle)
    ? [...new Set(answers.biggestStruggle.map((value) => clean(value, 30)).filter(Boolean))]
    : [];

  if (
    !isOption('currentLevel', currentLevel) ||
    !isOption('mainGoal', mainGoal) ||
    !isOption('workPermitExpiry', workPermitExpiry) ||
    !isOption('dailyStudyTime', dailyStudyTime) ||
    !isOption('examTarget', examTarget) ||
    !isOption('learningPreference', learningPreference) ||
    !isOption('previousExamAttempt', previousExamAttempt) ||
    biggestStruggle.length === 0 ||
    biggestStruggle.some((value) => !isOption('biggestStruggle', value))
  ) {
    return { ok: false, error: 'One or more quiz answers are invalid. Please try again.' };
  }

  const score = (key: string) => clean(answers[key], 30);
  return {
    ok: true,
    value: {
      fullName,
      email,
      phone,
      countryTimezone,
      password,
      marketingConsent: raw.marketingConsent === true,
      answers: {
        currentLevel,
        mainGoal,
        workPermitExpiry,
        dailyStudyTime,
        examTarget,
        biggestStruggle,
        learningPreference,
        previousExamAttempt,
        listeningScore: score('listeningScore'),
        speakingScore: score('speakingScore'),
        readingScore: score('readingScore'),
        writingScore: score('writingScore'),
      },
    },
  };
}
