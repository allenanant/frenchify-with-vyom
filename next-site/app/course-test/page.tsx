import type { Metadata } from 'next';
import ExamSplitSelector from './_components/ExamSplitSelector';

export const metadata: Metadata = {
  title: 'Frenchify Courses - Choose Your Exam',
  description:
    'Preparing for TEF Canada or TCF Canada? Choose your exam to see the Frenchify courses built for it.',
  robots: { index: false, follow: false },
};

export default function CourseTestPage() {
  return <ExamSplitSelector />;
}
