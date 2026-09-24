import type { Metadata } from 'next';
import PersonalizedFrenchPlanQuiz from './PersonalizedFrenchPlanQuiz';

export const metadata: Metadata = {
  title: 'Create My Personalized French Plan for PR',
  description:
    'Answer 8 quick questions, get a personalized Frenchify recommendation, and unlock the complete French roadmap free.',
};

export default function PersonalizedFrenchPlanPage() {
  return <PersonalizedFrenchPlanQuiz />;
}
