import { Users, Laptop, Star } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Tilt from '@/components/motion/Tilt';

const onlineBullets = [
  'Structured RSWL Training',
  'Speaking & Writing Mock Videos',
  'Abundant Practice Modules',
  'Exam-Focused Listening/Reading Resources',
];

export default function ComponentsSection() {
  return (
    <section className="py-16 md:py-20 bg-gray-50 full-bleed-section-ghl">
      <div className="ghl-row mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Program is Divided into <span className="gradient-text">2 Components</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Combine a flexible online curriculum with personalized, intensive live practice.
            </p>
          </div>
        </Reveal>

        <Stagger className="grid lg:grid-cols-2 gap-8 items-stretch">
          <Tilt max={4}>
            <div className="premium-card p-8 h-full flex flex-col">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-brand-blue/10 ring-1 ring-brand-blue/20 mb-4">
                  <Users className="text-brand-blue w-7 h-7" strokeWidth={2.25} />
                </div>
              </div>
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                Live Sessions
              </h3>
              <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                Get intensive, exam-focused practice with instructor-led mock sessions, personalized feedback, and grammar clarification.
              </p>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-800">Speaking Mock Group Sessions (1.5+ hours)</p>
                  <p className="text-gray-600">Wednesday 8 PM EST, Friday 8 PM EST, Saturday 10:30 AM EST</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Practice &amp; Analysis</p>
                  <p className="text-gray-600">Includes Speaking (Section A+B) practice and personalized TEF/TCF Writing Analysis.</p>
                </div>
              </div>
            </div>
          </Tilt>

          <Tilt max={4}>
            <div className="premium-card p-8 h-full flex flex-col">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-brand-blue/10 ring-1 ring-brand-blue/20 mb-4">
                  <Laptop className="text-brand-blue w-7 h-7" strokeWidth={2.25} />
                </div>
              </div>
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                Online Program
              </h3>
              <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                Access structured RSWL training and a wide variety of mock videos and modules to mimic exam conditions at your own pace.
              </p>
              <ul className="space-y-3 text-gray-700">
                {onlineBullets.map((b) => (
                  <li key={b} className="flex items-center">
                    <Star className="text-brand-amber w-4 h-4 mr-3 shrink-0" fill="currentColor" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Tilt>
        </Stagger>
      </div>
    </section>
  );
}
