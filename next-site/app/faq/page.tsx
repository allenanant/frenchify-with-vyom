import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import Magnetic from '@/components/motion/Magnetic';
import FaqAccordion, { type FaqItem } from '@/components/FaqAccordion';

export const metadata = {
  title: 'Frequently Asked Questions - Frenchify',
  description:
    'Find answers to common questions about our programs, the TEF exam, and more.',
};

const programsFaqs: FaqItem[] = [
  {
    q: 'Does Frenchify Program offer TEF/TCF or TEFAQ training?',
    a: 'Yes, exam-specific training is provided right from the start and the programs are designed in a way to fast-track the preparation.',
  },
  {
    q: 'How much time does it take to clear TEF with Frenchify?',
    a: 'If you study an average of 2-3 hours daily, A1 & A2 can be completed within 3 months, and B1 & B2 within 5-6 months. If you are studying French full-time, the time frame reduces.',
  },
  {
    q: 'Is the speaking module covered in the A1 level?',
    a: 'Yes, speaking tasks are given right from the A1 level to build foundational conversational skills.',
  },
  {
    q: 'Is there an exam conducted after each level at Frenchify?',
    a: 'Yes, a student has to pass a level-specific exam conducted at Frenchify by Vyom to be promoted to the next level.',
  },
  {
    q: 'Does the Frenchify Program have doubt sessions?',
    a: 'Yes. Along with the online programs, we provide 4 live doubt sessions each week for better understanding and mentorship.',
  },
  {
    q: 'At what level does TEF/TCF-specific training start in Frenchify?',
    a: 'At B1 level, mock exam practices begin with sessions focusing on exam-specific preparation covering all 4 modules (Reading, Writing, Speaking, Listening).',
  },
];

const examFaqs: FaqItem[] = [
  {
    q: 'Do we need to give level-specific exams for TEF/TCF?',
    a: "No, you don't need to give exams after each level. They only want your overall score to be CLB/NCLC 5 or 7, depending on the immigration stream.",
  },
  {
    q: 'Is the IELTS and TEF exam same/similar?',
    a: 'They both have the same four modules (Reading, Writing, Speaking & Listening), but they have different formats. For example, the TEF exam has only MCQ answer options in Reading and Listening.',
  },
  {
    q: 'Where can I find mock tests for the TEF exam?',
    a: 'PrepMyFuture offers 3 exact sample tests like the official TEF, which can be solved for practice.',
  },
  {
    q: 'Can I give each module individually if I score less in one?',
    a: 'No. Unlike IELTS, you cannot give each module separately. You need to re-attempt all 4 modules if you score less in any of the sections.',
  },
  {
    q: 'Which level is required for the French Immigration Stream?',
    a: 'CLB/NCLC 7 is required, which is equivalent to a B2+ level in French.',
  },
  {
    q: 'How long are the results of TEF & TCF valid?',
    a: 'The results for both TEF and TCF are valid for 2 years.',
  },
  {
    q: 'What is the main difference between the TEF & TCF French exam?',
    a: 'The main differences are the time allotted to each module, the format of questions, and the number of questions.',
  },
  {
    q: 'How many times can I give these exams?',
    a: 'A student can attempt the exams multiple times; there is no limit. However, there must be a waiting period of 30 days between 2 test attempts.',
  },
];

const generalFaqs: FaqItem[] = [
  {
    q: 'How do I keep myself motivated while learning French?',
    a: 'Join community groups to find study partners, get mentorship to reduce prep time, and focus on all 4 skills (reading, writing, speaking, listening) at regular intervals to avoid getting bored of only grammar and vocabulary.',
  },
  {
    q: 'Does Frenchify with Vyom offer one-on-one coaching?',
    a: "I don't personally recommend one-on-one sessions as they can stretch your learning time and be expensive. With busy schedules, it is often better to go with group-based flexible programs. You can book a meeting to know more.",
  },
  {
    q: 'How can I begin learning if I am a beginner and want to self-study?',
    a: 'You can register on our website for the Free Beginner Program, which provides a detailed outline, books, and resources for the self-study method.',
  },
  {
    q: 'Do I really need to join coaching, or can I do it by myself?',
    a: 'It is possible to self-learn up to a beginner level, but for intermediate levels, proper guidance is required, especially for the Speaking and Writing modules. Self-study typically takes longer (6-8 months for A1/A2), whereas with coaching, you can do it within 3 months.',
  },
  {
    q: 'Can I clear French from beginner in 6 months if I study for 12 hours daily?',
    a: 'This is not recommended as it is mentally draining. If you are studying full-time (no job, no college), you can attain CLB 5-6, depending on your practice and consistency.',
  },
  {
    q: 'Can I get a bilingual job if I am at the B1 level?',
    a: 'Yes, depending on your job profile, especially in customer service. Employers will likely check your language fluency during the interview, and your official TEF/TCF/DELF results will be very helpful.',
  },
  {
    q: 'How do I get free books and resources for French learning?',
    a: 'You can find them on our website under the Programs Page, in the "Free learning resources" Tab.',
  },
];

export default function FaqPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="py-16 md:py-20 !pt-[124px] md:!pt-[140px] bg-white full-bleed-section-ghl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our programs, the TEF exam, and more.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-40 full-bleed-section-ghl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-center space-x-4 md:space-x-8">
            <a
              href="#programs"
              className="py-4 px-1 text-gray-600 font-medium hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition-colors duration-200"
            >
              Frenchify Programs
            </a>
            <a
              href="#exam"
              className="py-4 px-1 text-gray-600 font-medium hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition-colors duration-200"
            >
              TEF/TCF Exam
            </a>
            <a
              href="#general"
              className="py-4 px-1 text-gray-600 font-medium hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition-colors duration-200"
            >
              General
            </a>
          </nav>
        </div>
      </section>

      {/* FAQ Content Section */}
      <section className="py-16 md:py-20 full-bleed-section-ghl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div id="programs">
            <Reveal>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-800 mb-8 border-b border-gray-200 pb-4 tracking-tight">
                Frenchify Programs
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <FaqAccordion items={programsFaqs} />
            </Reveal>
          </div>

          <div id="exam">
            <Reveal>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-800 mb-8 border-b border-gray-200 pb-4 tracking-tight">
                TEF/TCF Exam
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <FaqAccordion items={examFaqs} />
            </Reveal>
          </div>

          <div id="general">
            <Reveal>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-800 mb-8 border-b border-gray-200 pb-4 tracking-tight">
                General
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <FaqAccordion items={generalFaqs} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-20 bg-gray-800 text-white full-bleed-section-ghl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold mb-4 tracking-tight">Still Have Questions?</h2>
            <p className="text-lg text-gray-300 mb-8">
              Our team is here to help. Book a consultation to get personalized advice for your French learning journey.
            </p>
            <Magnetic>
              <Link
                href="/contact"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-block"
              >
                Book a Consultation
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
