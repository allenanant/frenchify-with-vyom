import type { Metadata } from 'next';
import TrackCoursesView from '../_components/TrackCoursesView';
import { TRACKS } from '../_data';

export const metadata: Metadata = {
  title: 'TCF Canada Courses',
  description:
    'All Frenchify TCF Canada courses — intensive live programs (A1, A2, B1, B2) and self-paced self-study options.',
  robots: { index: false, follow: false },
};

export default function TcfCoursesPage() {
  return <TrackCoursesView track={TRACKS.tcf} />;
}
