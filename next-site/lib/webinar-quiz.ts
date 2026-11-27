/**
 * The webinar quiz: Vyom's five questions in front of the existing webinar
 * registration form.
 *
 * The questions, hints and answer options are copied word for word from the
 * Black Friday quiz Vyom shared on 26 Nov 2026 (`public/french-pr-plan.html`,
 * the `Q` array). Change them here only; the page, the API validation and the
 * admin table all read this one list.
 *
 * Shared by the client page and the server routes, so nothing here may import
 * server-only code.
 */

export type QuizQuestionId = 'goal' | 'level' | 'permit' | 'learning' | 'exam';

export type QuizQuestion = {
  id: QuizQuestionId;
  /** Column heading in the admin table. */
  short: string;
  q: string;
  hint: string;
  options: readonly string[];
};

export const QUIZ_QUESTIONS: readonly QuizQuestion[] = [
  {
    id: 'goal',
    short: 'Goal',
    q: 'What is your first goal with French?',
    hint: 'Choose the one that fits you best.',
    options: [
      'Extend my work permit (CLB 5)',
      'Apply for PR (CLB 7 or higher)',
      'Both: CLB 5 first, then CLB 7',
      'Not sure yet',
    ],
  },
  {
    id: 'level',
    short: 'Level',
    q: 'What is your current French level?',
    hint: 'Choose what feels closest. There is no wrong answer.',
    options: [
      'Complete beginner',
      'I have finished A1, and I can take the A1 test with Frenchify',
      'I have finished A2, but I am still not comfortable speaking or making sentences, for example speaking for 2 to 3 minutes on a topic in past or future tense',
      'I have finished A2, I am comfortable speaking, and I can take the A2 test with Frenchify',
      'I am at B1 and need the final stretch of exam prep, so I want to start at B2',
      'I am not sure',
    ],
  },
  {
    id: 'permit',
    short: 'Work permit',
    q: 'How much time is left on your work permit?',
    hint: 'This helps us recommend the right pace.',
    options: [
      'Less than 3 months',
      '3 to 6 months',
      '6 to 12 months',
      'More than 12 months',
      'My work permit has expired',
      'I am on a visitor visa',
      'I am not sure',
    ],
  },
  {
    id: 'learning',
    short: 'Learning style',
    q: 'How do you prefer to learn with Frenchify?',
    hint: 'Every option includes the online course. Choose how much extra support you want.',
    options: [
      'Online course only, with a structured study plan, assignments and tests',
      'Online course plus optional one-on-one sessions',
      'Online course plus weekly live sessions at fixed times',
      'I am open to everything',
      'I am not sure. Please tell me what is best',
    ],
  },
  {
    id: 'exam',
    short: 'Exam',
    q: 'Have you taken an exam yet?',
    hint: 'Choose the one that fits you best.',
    options: ['No, not yet', 'Yes, TEF Canada', 'Yes, TCF Canada', 'I have booked my exam'],
  },
] as const;

/** Answers by question id, as option indexes. */
export type QuizAnswerIndexes = Partial<Record<QuizQuestionId, number>>;

/**
 * Same rule as Vyom's page (`seq()`): the work permit question only shows when
 * the first goal is the work permit, alone or before PR.
 */
export function quizSequence(answers: QuizAnswerIndexes): QuizQuestion[] {
  const askPermit = answers.goal === 0 || answers.goal === 2;
  return QUIZ_QUESTIONS.filter((q) => q.id !== 'permit' || askPermit);
}

export type CleanQuizAnswers = {
  /** Option index per answered question, only for questions in the sequence. */
  indexes: QuizAnswerIndexes;
  /** The option text per answered question, from this file, never from the client. */
  text: Partial<Record<QuizQuestionId, string>>;
  /** True when every question in the sequence has an answer. */
  complete: boolean;
};

/**
 * Keeps only valid option indexes for questions that belong in the sequence.
 * Anything else the client sends is dropped. The stored text always comes from
 * QUIZ_QUESTIONS, so the database cannot hold an answer the page never offered.
 */
export function cleanQuizAnswers(input: unknown): CleanQuizAnswers {
  const raw = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>;
  const indexes: QuizAnswerIndexes = {};
  for (const q of QUIZ_QUESTIONS) {
    const v = raw[q.id];
    if (typeof v === 'number' && Number.isInteger(v) && v >= 0 && v < q.options.length) {
      indexes[q.id] = v;
    }
  }
  const sequence = quizSequence(indexes);
  const allowed = new Set(sequence.map((q) => q.id));
  for (const id of Object.keys(indexes) as QuizQuestionId[]) {
    if (!allowed.has(id)) delete indexes[id];
  }
  const text: CleanQuizAnswers['text'] = {};
  for (const q of sequence) {
    const i = indexes[q.id];
    if (i !== undefined) text[q.id] = q.options[i];
  }
  return { indexes, text, complete: sequence.every((q) => indexes[q.id] !== undefined) };
}

/** A random v4 UUID from the browser. Anything else is refused. */
export function isQuizToken(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
  );
}

/**
 * Short tag values per answer. Long option text makes unreadable GHL tags, so
 * each option gets a fixed short slug here.
 */
export const QUIZ_TAG_VALUES: Record<QuizQuestionId, readonly string[]> = {
  goal: ['work-permit-clb5', 'pr-clb7', 'clb5-then-clb7', 'not-sure'],
  level: ['beginner', 'finished-a1', 'a2-weak-speaking', 'a2-confident', 'b1-start-b2', 'not-sure'],
  permit: ['under-3-months', '3-6-months', '6-12-months', '12-plus-months', 'expired', 'visitor-visa', 'not-sure'],
  learning: ['course-only', 'course-plus-1on1', 'course-plus-live', 'open-to-all', 'not-sure'],
  exam: ['no-exam', 'tef-taken', 'tcf-taken', 'exam-booked'],
};

export const QUIZ_BASE_TAG = 'webinar-quiz';

export function quizContactTags(indexes: QuizAnswerIndexes): string[] {
  const tags = [QUIZ_BASE_TAG];
  for (const q of QUIZ_QUESTIONS) {
    const i = indexes[q.id];
    if (i !== undefined) tags.push(`wq-${q.id}-${QUIZ_TAG_VALUES[q.id][i]}`);
  }
  return tags;
}
