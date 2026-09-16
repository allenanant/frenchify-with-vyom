import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frenchify Student Assistant',
  description: 'Course-aware French learning and student support for enrolled Frenchify students.',
  robots: { index: false, follow: false },
};

export default function StudentAssistantLayout({ children }: { children: React.ReactNode }) {
  return children;
}
