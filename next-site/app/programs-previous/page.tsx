import type { Metadata } from 'next';
import StoryScrollPrograms from '@/components/sections/programs/StoryScrollPrograms';

export const metadata: Metadata = {
  title: 'Frenchify Courses (Previous Version)',
  description:
    'Archived version of the Frenchify courses page, kept for reference. The live courses page is at /courses/.',
  robots: { index: false, follow: false },
};

export default function ProgramsPreviousPage() {
  return <StoryScrollPrograms />;
}
