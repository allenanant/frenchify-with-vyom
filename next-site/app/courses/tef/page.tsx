import type { Metadata } from 'next';
import LevelSelect from '../_components/LevelSelect';
import { TRACKS } from '../_data';

export const metadata: Metadata = {
  title: 'TEF Canada Courses',
  description:
    'Pick your level for TEF Canada preparation — A1, A2, B1 or B2. Structured Frenchify courses from absolute beginner to exam-ready.',
};

export default function TefLevelsPage() {
  return <LevelSelect track={TRACKS.tef} />;
}
