import type { Metadata } from 'next';
import { Check, Users, Laptop, Star, Play, BookOpen, GraduationCap, Calendar } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Tilt from '@/components/motion/Tilt';
import Magnetic from '@/components/motion/Magnetic';
import HeroSection from '@/components/sections/a2-intensive-program/HeroSection';
import FaqSection from '@/components/sections/a2-intensive-program/FaqSection';
import ReviewsWidget from '@/components/sections/a2-intensive-program/ReviewsWidget';

export const metadata: Metadata = {
  title: 'Frenchify A2 Intensive Program',
  description:
    'Deepen Your French Journey and Build Real Confidence. The Frenchify A2 Intensive Program with 4 live sessions per week, structured online curriculum, and clear A2 roadmap.',
};

const goals = [
  { title: 'Strengthen Your Foundation', copy: 'Strengthen your understanding of sentence structure and grammar rules.' },
  { title: 'Expand Your Vocabulary', copy: 'Expand your vocabulary for social, work, and day-to-day conversations.' },
  { title: 'Express Yourself Confidently', copy: 'Learn to express opinions, preferences, and reasons confidently.' },
  { title: 'Enhance Listening Comprehension', copy: 'Understand and respond to faster-paced spoken French.' },
  { title: 'Develop Writing Skills', copy: 'Start writing structured messages, descriptions, and emails.' },
  { title: 'Engage With The Language', copy: 'Build the confidence to engage with the language in-depth through more comprehensible input.' },
];

const onlineFeatures = [
  'Detailed Grammar Lessons',
  'Vocabulary & Thematic Word Lists',
  'Reading & Listening Practice',
  'Speaking & Writing Prompts',
  'Worksheets, Quizzes & Tests',
];

const roadmap = [
  {
    Icon: Play,
    title: 'Unit 0: Your A2 Starting Plan',
    copy: 'A clear, guided plan on how to approach A2-level learning after A1.',
  },
  {
    Icon: BookOpen,
    title: 'Units 1-5: Core A2 Syllabus',
    copy: 'Covering all essential A2 grammar, vocabulary, and communication skills in a structured, step-by-step way.',
  },
  {
    Icon: GraduationCap,
    title: 'Unit 6: Practice & A2-Level Test',
    copy: 'Filled with real-life practice tasks and a Full A2-level test to evaluate your readiness for B1 and TEF preparation.',
  },
];

export default function A2IntensiveProgramPage() {
  return (
    <>
      <HeroSection />

      {/* Goals Section */}
      <section className="py-16 md:py-20 bg-white full-bleed-section-ghl">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12 tracking-tight">
              Our Goal at A2 Is <span className="gradient-text">Clear</span>
            </h2>
          </Reveal>
          <Stagger className="space-y-6" duration={0.6}>
            {goals.map((g) => (
              <div
                key={g.title}
                className="flex items-start premium-card p-6"
              >
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full mr-4 ring-1 ring-brand-blue/20">
                  <Check className="w-5 h-5 text-brand-blue" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">{g.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{g.copy}</p>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Program Components Section */}
      <section className="py-16 md:py-20 bg-gray-50 full-bleed-section-ghl">
        <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Two Powerful <span className="gradient-text">Learning Components</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                The program is divided into two parts: a flexible online curriculum and expert-led live interaction.
              </p>
            </div>
          </Reveal>
          <Stagger className="grid lg:grid-cols-2 gap-8 items-stretch" duration={0.7}>
            <Tilt max={5}>
              <div className="premium-card p-8 h-full flex flex-col">
                <div className="flex-shrink-0 bg-brand-blue/10 w-14 h-14 rounded-xl flex items-center justify-center mb-5 ring-1 ring-brand-blue/20">
                  <Users className="w-7 h-7 text-brand-blue" strokeWidth={2.25} />
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                  Weekly 4 Live Sessions
                </h3>
                <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                  Reinforce your learning, ask questions, and practice with instructors and peers in four dedicated sessions each week.
                </p>
                <div>
                  <p className="font-semibold text-gray-800">Doubt Sessions</p>
                  <p className="text-gray-600 mb-3">Tuesday - 8 AM EST, Thursday - 8:15 PM EST, Sunday - 8:30 AM EST</p>
                  <p className="font-semibold text-gray-800">Activity Session</p>
                  <p className="text-gray-600">Saturday - 9 AM EST</p>
                </div>
              </div>
            </Tilt>

            <Tilt max={5}>
              <div className="premium-card p-8 h-full flex flex-col">
                <div className="flex-shrink-0 bg-brand-blue/10 w-14 h-14 rounded-xl flex items-center justify-center mb-5 ring-1 ring-brand-blue/20">
                  <Laptop className="w-7 h-7 text-brand-blue" strokeWidth={2.25} />
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                  Complete Online Program
                </h3>
                <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                  Access a fully guided A2 curriculum with step-by-step units designed to build strong real-world language skills.
                </p>
                <ul className="space-y-3 text-gray-700">
                  {onlineFeatures.map((f) => (
                    <li key={f} className="flex items-center">
                      <Star className="w-4 h-4 text-brand-amber mr-3 fill-brand-amber" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Tilt>
          </Stagger>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-16 md:py-20 bg-white full-bleed-section-ghl">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Your Step-by-Step <span className="gradient-text">Learning Roadmap</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Every step is laid out — so you never feel lost, stuck, or confused.
              </p>
            </div>
          </Reveal>

          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-brand-blue via-brand-blue-deep to-brand-amber" aria-hidden="true" />
            <Stagger className="space-y-12" duration={0.65}>
              {roadmap.map(({ Icon, title, copy }) => (
                <div key={title} className="relative pl-16">
                  <div className="absolute left-0 top-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue shadow-lg ring-4 ring-white">
                    <Icon className="text-white w-4 h-4" strokeWidth={2.5} />
                  </div>
                  <h4 className="font-display font-bold text-xl text-gray-900 mb-2 tracking-tight">{title}</h4>
                  <p className="text-gray-600 leading-relaxed">{copy}</p>
                </div>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Access Duration & Final CTA */}
      <section className="py-16 md:py-20 full-bleed-section-ghl bg-gray-900 text-white relative overflow-hidden" id="signup">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-transparent to-brand-amber/10 pointer-events-none" />
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <div className="bg-gray-900/60 p-8 rounded-2xl mb-12 border border-gray-700 backdrop-blur-sm">
              <div className="flex justify-center items-center gap-4 mb-4">
                <Calendar className="w-8 h-8 text-brand-amber" />
                <h3 className="font-display text-2xl font-bold tracking-tight">Instant Access for 4 Months</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                You get 4 full months of access to the online course and all live sessions. This provides ample time to master the A2 level at your own pace, as the average completion time is 6-8 weeks. No pressure, just flexible learning.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              This is not just &ldquo;the next level.&rdquo; It&rsquo;s the bridge to <span className="gradient-text">real fluency</span>.
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Enroll in the A2 Intensive Program — and take the fastest path to B1, TEF, and PR.
            </p>
            <Magnetic>
              <a
                href="https://link.fastpaydirect.com/payment-link/67e8bb027178768a29a43b4e"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-lg"
              >
                Sign Up
              </a>
            </Magnetic>
            <p className="text-sm text-gray-400 mt-6">Taught in English. Some content may not be translated.</p>
          </Reveal>
        </div>
      </section>

      <FaqSection />
      <ReviewsWidget />
    </>
  );
}
