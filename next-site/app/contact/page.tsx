import type { Metadata } from 'next';
import ContactExperience from './_components/ContactExperience';

export const metadata: Metadata = {
  title: { absolute: 'Frenchify Guidance & Contact | Frenchify with Vyom' },
  description:
    'Get Frenchify guidance for A1–B2 French, TEF/TCF Canada preparation, level analysis, courses and existing student support.',
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  return <ContactExperience />;
}
