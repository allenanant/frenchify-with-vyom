import type { Metadata } from 'next';
import PersonalizedFrenchPlanQuiz from './PersonalizedFrenchPlanQuiz';

export const metadata: Metadata = {
  title: 'Create My Personalized French Plan for PR',
  description:
    'Answer 8 quick questions and get a personalized Frenchify roadmap for your TEF or TCF Canada goal.',
};

export default function PersonalizedFrenchPlanPage() {
  return <PersonalizedFrenchPlanQuiz />;
}

