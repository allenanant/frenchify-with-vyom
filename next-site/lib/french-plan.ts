export const FRENCH_PLAN_DISCLAIMER =
  'This study plan is for French learning and TEF/TCF preparation guidance only. It is not legal immigration advice.';

export type FrenchPlanAnswers = {
  currentLevel: string;
  mainGoal: string;
  workPermitExpiry: string;
  dailyStudyTime: string;
  examTarget: string;
  biggestStruggle: string[];
  learningPreference: string;
  previousExamAttempt: string;
  listeningScore: string;
  speakingScore: string;
  readingScore: string;
  writingScore: string;
};

export type FrenchPlanRecommendation = {
  recommendedProgram: string;
  recommendedProgramType: string;
  reason: string;
  roadmapSteps: string[];
  estimatedTimeline: string;
  primaryCTA: string;
  primaryHref: string;
  secondaryCTA: string;
  secondaryHref: string;
  disclaimer: string;
};

type PlanKey = 'a1' | 'a2' | 'exam-prep-1' | 'final-exam-prep' | 'clb-5' | 'analysis';

const PLANS: Record<PlanKey, FrenchPlanRecommendation> = {
  a1: {
    recommendedProgram: 'A1 French Program',
    recommendedProgramType: 'Foundation program',
    reason:
      'You are starting from the foundation stage, so your first step should be to build basic grammar, vocabulary, pronunciation, and sentence formation before moving into TEF/TCF preparation.',
    roadmapSteps: ['A1 Foundation', 'A2 Sentence Building', 'Exam Prep 1', 'Final Exam Prep'],
    estimatedTimeline: '5–6 weeks for A1 with consistent study',
    primaryCTA: 'View A1 Program',
    primaryHref: '/a1-course',
    secondaryCTA: 'Explore All Programs',
    secondaryHref: '/courses',
    disclaimer: FRENCH_PLAN_DISCLAIMER,
  },
  a2: {
    recommendedProgram: 'A2 French Program',
    recommendedProgramType: 'Foundation-building program',
    reason:
      'You already have some French basics, but your next step is to strengthen grammar, sentence formation, speaking flow, and practical vocabulary before entering exam preparation.',
    roadmapSteps: ['A2 Sentence Building', 'Exam Prep 1', 'Final Exam Prep'],
    estimatedTimeline: '6–8 weeks for A2 with consistent study',
    primaryCTA: 'View A2 Program',
    primaryHref: '/a2-course',
    secondaryCTA: 'Explore All Programs',
    secondaryHref: '/courses',
    disclaimer: FRENCH_PLAN_DISCLAIMER,
  },
  'exam-prep-1': {
    recommendedProgram: 'Exam Prep 1',
    recommendedProgramType: 'TEF/TCF exam preparation',
    reason:
      'You are ready to move from general French into TEF/TCF-focused preparation. This program is designed to help you build exam skills and work toward CLB 5.',
    roadmapSteps: ['Exam Prep 1', 'CLB 5 Target', 'Final Exam Prep for CLB 7+'],
    estimatedTimeline: '8–10 weeks depending on your current level and study consistency',
    primaryCTA: 'View Exam Prep 1',
    primaryHref: '/b1-course',
    secondaryCTA: 'Explore All Programs',
    secondaryHref: '/courses',
    disclaimer: FRENCH_PLAN_DISCLAIMER,
  },
  'final-exam-prep': {
    recommendedProgram: 'Final Exam Prep',
    recommendedProgramType: 'Advanced exam preparation',
    reason:
      'You are already beyond the beginner stage, so your focus should be exam-style practice, strategy, timing, and CLB 7+ performance.',
    roadmapSteps: ['Final Exam Prep', 'Mock Tests', 'TEF/TCF Exam Readiness'],
    estimatedTimeline: '8–10 weeks depending on your current score and weak areas',
    primaryCTA: 'View Final Exam Prep',
    primaryHref: '/b2-course',
    secondaryCTA: 'Explore All Programs',
    secondaryHref: '/courses',
    disclaimer: FRENCH_PLAN_DISCLAIMER,
  },
  'clb-5': {
    recommendedProgram: 'CLB 5 TEF/TCF Program',
    recommendedProgramType: 'Urgent, focused preparation',
    reason:
      'Your immediate goal is CLB 5, and your timeline needs focused preparation. This path should prioritize high-impact speaking and listening support with flexible one-on-one guidance.',
    roadmapSteps: ['CLB 5 Speaking + Listening Focus', 'Targeted Practice', 'Exam Readiness'],
    estimatedTimeline: 'Timeline depends on your current French level and urgency',
    primaryCTA: 'Book a CLB 5 Consultation',
    primaryHref: '/book-a-meet',
    secondaryCTA: 'Explore All Programs',
    secondaryHref: '/courses',
    disclaimer: FRENCH_PLAN_DISCLAIMER,
  },
  analysis: {
    recommendedProgram: 'Level Analysis + Consultation',
    recommendedProgramType: 'Personalized level diagnosis',
    reason:
      'Because your current level or timeline needs proper review, we recommend completing a level analysis or speaking with the Frenchify team before choosing your final program.',
    roadmapSteps: ['Level Analysis', 'Personalized Recommendation', 'Program Enrollment'],
    estimatedTimeline: 'To be confirmed after your level review',
    primaryCTA: 'Book a Consultation',
    primaryHref: '/book-a-meet',
    secondaryCTA: 'Explore All Programs',
    secondaryHref: '/courses',
    disclaimer: FRENCH_PLAN_DISCLAIMER,
  },
};

function copyPlan(key: PlanKey): FrenchPlanRecommendation {
  return { ...PLANS[key], roadmapSteps: [...PLANS[key].roadmapSteps] };
}

/**
 * Converts the quiz answers into the safest next Frenchify step. Urgent and
 * previously attempted exam cases are assessed first, then foundation level.
 */
export function getRecommendedFrenchPlan(
  answers: FrenchPlanAnswers,
): FrenchPlanRecommendation {
  const urgent = answers.workPermitExpiry === 'less-than-3-months';
  const attemptedExam =
    answers.previousExamAttempt === 'yes-tef' ||
    answers.previousExamAttempt === 'yes-tcf' ||
    answers.currentLevel === 'attempted-exam';
  const isBeginner = answers.currentLevel === 'complete-beginner';
  const isUnsure = answers.currentLevel === 'unsure';
  const examHistoryConflict =
    answers.currentLevel === 'attempted-exam' && answers.previousExamAttempt === 'no';

  if (urgent) {
    const readyForFocusedPrep =
      !isBeginner &&
      !isUnsure &&
      answers.mainGoal === 'clb-5' &&
      answers.biggestStruggle.some((struggle) =>
        ['speaking', 'listening'].includes(struggle),
      ) &&
      ['one-to-one', 'mixed-live-one-to-one'].includes(answers.learningPreference);

    return copyPlan(readyForFocusedPrep ? 'clb-5' : 'analysis');
  }

  if (attemptedExam) {
    if (examHistoryConflict) return copyPlan('analysis');

    const readyForFinalPrep =
      ['b1-b2', 'attempted-exam'].includes(answers.currentLevel) &&
      answers.mainGoal === 'clb-7-plus';

    return copyPlan(readyForFinalPrep ? 'final-exam-prep' : 'analysis');
  }

  if (isUnsure) return copyPlan('analysis');
  if (isBeginner) return copyPlan('a1');

  if (['some-basics', 'completed-a1'].includes(answers.currentLevel)) {
    return copyPlan('a2');
  }

  if (
    answers.currentLevel === 'completed-a2' &&
    ['clb-5', 'clb-5-then-7'].includes(answers.mainGoal)
  ) {
    return copyPlan('exam-prep-1');
  }

  if (
    answers.currentLevel === 'b1-b2' &&
    answers.mainGoal === 'clb-7-plus'
  ) {
    return copyPlan('final-exam-prep');
  }

  if (answers.currentLevel === 'completed-a2') return copyPlan('exam-prep-1');

  return copyPlan('analysis');
}
