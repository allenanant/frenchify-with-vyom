import type { Metadata } from 'next';
import TrackCoursesView from '../_components/TrackCoursesView';
import { TRACKS } from '../_data';

export const metadata: Metadata = {
  title: 'TEF Canada Courses',
  description:
    'All Frenchify TEF Canada courses — intensive live programs (A1, A2, B1, B2) and self-paced self-study options.',
  robots: { index: false, follow: false },
};

export default function TefCoursesPage() {
  return <TrackCoursesView track={TRACKS.tef} />;
}
