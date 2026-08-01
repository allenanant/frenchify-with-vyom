import type { Metadata } from 'next';
import LevelSelect from '../_components/LevelSelect';
import { TRACKS } from '../_data';

export const metadata: Metadata = {
  title: 'TCF Canada Courses',
  description:
    'Pick your level for TCF Canada preparation — A1, A2, B1 or B2. Structured Frenchify courses tuned to the TCF format, from beginner to exam-ready.',
};

export default function TcfLevelsPage() {
  return <LevelSelect track={TRACKS.tcf} />;
}
