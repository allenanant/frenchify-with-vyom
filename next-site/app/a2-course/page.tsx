import CourseSourcePage from '@/components/CourseSourcePage';
import { MAGNETIC_OPT_IN_ONLY } from '@/components/CourseInteractions';

export const metadata = {
  title: 'Frenchify with Vyom A2 Level',
  description:
    'Speak French with Confidence by the End of A2. Complete step-by-step system to build real grammar, pronunciation and speaking fluency from A2 all the way to TEF Canada Exam Preparation.',
};

export default function A2CoursePage() {
  // A2 was authored to magnetise only its explicit opt-ins, not every CTA.
  return <CourseSourcePage slug="a2-course" magneticSelector={MAGNETIC_OPT_IN_ONLY} />;
}
