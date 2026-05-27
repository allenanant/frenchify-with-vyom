import type { Metadata } from 'next';
import StoryScrollPrograms from '@/components/sections/programs/StoryScrollPrograms';

export const metadata: Metadata = {
  title: 'Frenchify Courses - Master French Fluency',
  description:
    'Explore Frenchify TEF/TCF/TEFAQ French programs — intensive courses with live sessions (A1, A2, B1, B2) and self-paced self-study options (A1, A2) for learners of every level.',
};

export default function ProgramsPage() {
  return <StoryScrollPrograms />;
}
