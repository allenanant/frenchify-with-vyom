import type { Metadata } from 'next';
import ExamSplitSelector from './_components/ExamSplitSelector';

export const metadata: Metadata = {
  title: 'Frenchify Courses - Master French Fluency',
  description:
    'Preparing for TEF Canada or TCF Canada? Choose your exam to see the Frenchify French courses built for it — A1 to B2, intensive live programs and self-study.',
};

export default function CoursesPage() {
  return <ExamSplitSelector />;
}
