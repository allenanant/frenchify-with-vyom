import { Laptop, Mic, Star } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Tilt from '@/components/motion/Tilt';

const onlineBullets = [
  'Full B1/B2 Advanced Grammar',
  'Structured RSWL Modules',
  'Listening/Reading Resources for TEF',
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
              Combine a self-paced online course with personalized mentorship opportunities.
            </p>
          </div>
        </Reveal>

        <Stagger className="grid lg:grid-cols-2 gap-8 items-stretch">
          <Tilt max={4}>
            <div className="premium-card p-8 h-full flex flex-col">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-brand-blue/10 ring-1 ring-brand-blue/20 mb-4">
                  <Laptop className="text-brand-blue w-7 h-7" strokeWidth={2.25} />
                </div>
              </div>
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                📚 Online Course
              </h3>
              <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                Work through the complete B1/B2 curriculum on your own schedule.
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

          <Tilt max={4}>
            <div className="premium-card p-8 h-full flex flex-col">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-brand-blue/10 ring-1 ring-brand-blue/20 mb-4">
                  <Mic className="text-brand-blue w-7 h-7" strokeWidth={2.25} />
                </div>
              </div>
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                🎤 Speaking &amp; Writing Support
              </h3>
              <div className="space-y-4 flex-grow text-gray-600">
                <p>✓ 3 One-on-One Speaking Sessions (25 minutes each) included</p>
                <p>✓ 5 Personalized Writing Feedbacks for Section A practice</p>
                <p>
                  ✓ Additional speaking sessions available at:
                  <br />
                  &nbsp;&nbsp;&nbsp;• 25 Mins - $15.99 per session
                  <br />
                  &nbsp;&nbsp;&nbsp;• 50 Mins - $25.99 per session
                </p>
              </div>
            </div>
          </Tilt>
        </Stagger>
      </div>
    </section>
  );
}
