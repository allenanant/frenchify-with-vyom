export const FRENCH_PR_QUIZ_PATH = '/free-french-pr-plan/';
export const FRENCH_PR_QUIZ_CTA = 'Show Me What to Study First';
export const FRENCH_PR_QUIZ_TAG = 'website-french-pr-plan-quiz';

export const questions = {
  goal: {
    title: 'What’s your first goal with French?',
    hint: 'Pick the goal that matters most to you right now.',
    options: { permit: 'Work toward CLB 5 for my work permit', pr: 'Work toward CLB 7+ for Canadian PR', both: 'Reach CLB 5 first, then CLB 7+', unsure: 'I’m not sure yet' },
  },
  level: {
    title: 'What’s your current French level?',
    hint: 'Choose the option that best describes what you can do today.',
    options: { beginner: 'I’m a complete beginner', a1: 'I’ve finished A1 and can take an A1 level test', a2Practice: 'I’ve finished A2 but still struggle to speak in full sentences', a2Ready: 'I’ve finished A2 and feel ready for an A2 level test', b1: 'I’m at B1 and want to start final exam prep', unsure: 'I don’t know my current level' },
  },
  permit: {
    title: 'How much time is left on your work permit?',
    hint: 'Your answer helps us suggest what to prioritize.',
    options: { under3: 'Less than 3 months', under6: '3 to 6 months', under12: '6 to 12 months', over12: 'More than 12 months', expired: 'My work permit has expired', visitor: 'I’m on a visitor visa', unsure: 'I’m not sure' },
  },
  study: {
    title: 'How do you prefer to learn?',
    hint: 'Tell us what would fit your schedule and the support you want.',
    options: { flex: 'An online course I can follow on my own schedule', coaching: 'An online course with optional one-on-one sessions', live: 'An online course plus weekly live sessions', open: 'I’m open to any format', unsure: 'I’d like a recommendation' },
  },
  exam: {
    title: 'Have you taken or booked a French exam?',
    hint: 'This helps us tailor your next step.',
    options: { none: 'No, not yet', tef: 'Yes, I’ve taken TEF Canada', tcf: 'Yes, I’ve taken TCF Canada', booked: 'I’ve booked my exam' },
  },
} as const;

export type QuestionKey = keyof typeof questions;
export type QuizAnswers = { [K in Exclude<QuestionKey, 'permit'>]: keyof typeof questions[K]['options'] } & {
  permit?: keyof typeof questions.permit.options;
};

export function quizSteps(goal?: string): QuestionKey[] {
  return goal === 'permit' || goal === 'both' ? ['goal', 'level', 'permit', 'study', 'exam'] : ['goal', 'level', 'study', 'exam'];
}

export function getPlan(answers: QuizAnswers) {
  const { goal, level, permit, study, exam } = answers;
  const foundation: Record<QuizAnswers['level'], string[]> = {
    beginner: ['A1 foundations', 'A2 French'], a1: ['A2 French'],
    a2Practice: ['A2 speaking practice'], a2Ready: ['A2 level test'],
    b1: [], unsure: ['French level test'],
  };
  const clb5First = goal === 'permit' || goal === 'both';
  const path = [...foundation[level], ...(clb5First ? ['CLB 5 prep'] : []),
    ...(goal === 'permit' || level === 'unsure' ? [] : level === 'b1' ? ['Final exam prep'] : ['B1 exam prep', 'Final exam prep'])];
  const first: Record<QuizAnswers['level'], string> = {
    beginner: 'Start with pronunciation, basic sentence patterns, and short daily listening and speaking practice.',
    a1: 'Build on A1 with longer sentences, past and future tenses, and short conversations.',
    a2Practice: 'Strengthen A2 speaking before moving up. Practise speaking for two minutes on a familiar topic in the past or future tense.',
    a2Ready: 'Take a level test before choosing a prep course so you know whether to review A2 or move on to exam training.',
    b1: 'Start with a timed mock exam and use the results to focus on your weakest skill.',
    unsure: 'Take a level test first. It’s the quickest way to decide whether to work on foundations or start exam practice.',
  };
  const format: Record<QuizAnswers['study'], string> = {
    flex: 'Use a self-paced course and block out regular practice sessions.',
    coaching: 'Use a self-paced course and book one-on-one feedback for your hardest skill.',
    live: 'Choose a live class schedule and leave time between sessions to review and practise.',
    open: 'Pick a format you can sustain every week. Add live or one-on-one feedback if speaking is your biggest hurdle.',
    unsure: 'Start with a weekly study schedule you can stick to. Frenchify can help you choose between flexible and live study.',
  };
  const examAdvice = exam === 'booked'
    ? 'Work backward from your booked exam date. Start with a timed sample and set weekly priorities from the results.'
    : exam === 'tef' || exam === 'tcf'
      ? `Review your last ${exam.toUpperCase()} scorecard and practise the lowest-scoring skill first.`
      : 'When you’re ready for exam practice, try a sample task and review what each section asks you to do.';
  const timing = clb5First && (permit === 'under3' || permit === 'under6' || permit === 'expired')
    ? 'Your timeline makes an early level check especially useful. This study plan does not guarantee a score or a completion date.' : null;
  return { path, first: first[level], format: format[study], examAdvice, timing };
}

function option<K extends QuestionKey>(key: K, value: unknown): value is keyof typeof questions[K]['options'] {
  return typeof value === 'string' && Object.hasOwn(questions[key].options, value);
}

export function validateSubmission(body: unknown) {
  if (!body || typeof body !== 'object') return { error: 'Please complete the quiz.' } as const;
  const raw = body as Record<string, unknown>;
  const a = raw.answers as Record<string, unknown> | undefined;
  if (!a || !option('goal', a.goal) || !option('level', a.level) || !option('study', a.study) || !option('exam', a.exam)) {
    return { error: 'Please answer every quiz question.' } as const;
  }
  const answers: QuizAnswers = { goal: a.goal, level: a.level, study: a.study, exam: a.exam };
  if (a.goal === 'permit' || a.goal === 'both') {
    if (!option('permit', a.permit)) return { error: 'Please select your work permit timeline.' } as const;
    answers.permit = a.permit;
  }
  const name = typeof raw.name === 'string' ? raw.name.trim().replace(/\s+/g, ' ') : '';
  const email = typeof raw.email === 'string' ? raw.email.trim().toLowerCase() : '';
  const typedPhone = typeof raw.phone === 'string' ? raw.phone.trim() : '';
  const phone = typedPhone.replace(/[().\s-]/g, '');
  const submissionId = typeof raw.submissionId === 'string' ? raw.submissionId : '';
  if (name.length < 2 || name.length > 100) return { error: 'Enter your full name.' } as const;
  if (email.length > 180 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { error: 'Enter a valid email address.' } as const;
  if (typedPhone && !/^\+[1-9]\d{7,14}$/.test(phone)) return { error: 'Include your country code, such as +1 for Canada.' } as const;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionId) || raw.website) {
    return { error: 'We couldn’t verify the form. Refresh this page and try again.' } as const;
  }
  return { value: { name, email, phone, answers, submissionId } } as const;
}
