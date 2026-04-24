import type { Metadata } from 'next';
import { MessageCircle, AlertCircle } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Tilt from '@/components/motion/Tilt';
import FloatingOrbs from '@/components/motion/FloatingOrbs';

export const metadata: Metadata = {
  title: 'A2 Course Renewal - Frenchify with Vyom',
  description: 'Continue your French learning journey. Renew your Frenchify A2 online course or A2 Online Course + Live Sessions and keep moving toward B1.',
};

const steps = [
  {
    n: 1,
    content: (
      <p className="text-gray-700 leading-relaxed">
        <strong>Choose your preferred renewal option</strong> from the packages above
      </p>
    ),
  },
  {
    n: 2,
    content: (
      <>
        <p className="text-gray-700 leading-relaxed">
          <strong>Send the payment</strong> to:
        </p>
        <div className="mt-3 bg-white p-4 rounded-lg border-2 border-blue-200">
          <p className="text-brand-blue font-bold text-lg break-all">frenchifyfee@gmail.com</p>
        </div>
      </>
    ),
  },
  {
    n: 3,
    content: (
      <>
        <p className="text-gray-700 leading-relaxed mb-3">
          <strong>Send us a screenshot</strong> of the payment confirmation to begin your access
        </p>
        <div className="bg-white p-4 rounded-lg border-2 border-green-200">
          <p className="text-gray-700 mb-2">
            <strong>Send via WhatsApp:</strong>
          </p>
          <a
            href="https://wa.me/15147165114"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 font-bold text-lg hover:text-green-700 inline-flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            +1 (514) 716-5114
          </a>
          <p className="text-gray-600 text-sm mt-2">Or send through the Frenchify Portal / App</p>
        </div>
      </>
    ),
  },
];

export default function A2CourseRenewalPage() {
  return (
    <main className="py-16 md:py-20 relative overflow-hidden">
      <FloatingOrbs variant="soft" />
      <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-[1.08] tracking-tight">
              A2 Course <span className="gradient-text">Renewal</span>
            </h1>
            <p className="text-lg text-gray-600">Continue your French learning journey</p>
          </div>
        </Reveal>

        {/* Pricing Cards */}
        <Stagger className="grid md:grid-cols-2 gap-8 mb-12" duration={0.7}>
          <Tilt max={5}>
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-brand-blue hover:shadow-xl transition-all duration-300 h-full">
              <div className="text-center mb-6">
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-2 tracking-tight">
                  A2 - Online Course Renewal
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-brand-blue to-brand-amber mx-auto rounded-full" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-700">1 Month</span>
                  <span className="font-display text-2xl font-bold text-brand-blue">$99 CAD</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-700">2 Months</span>
                  <span className="font-display text-2xl font-bold text-brand-blue">$149 CAD</span>
                </div>
              </div>
            </div>
          </Tilt>

          <Tilt max={5}>
            <div className="bg-white border-2 border-brand-amber rounded-2xl p-8 hover:shadow-xl transition-all duration-300 relative h-full">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-brand-amber text-gray-900 px-4 py-1 rounded-full text-sm font-bold shadow-md">
                  POPULAR
                </span>
              </div>
              <div className="text-center mb-6">
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-2 tracking-tight">
                  A2 Online Course + Live Sessions
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-brand-blue to-brand-amber mx-auto rounded-full" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                  <span className="font-semibold text-gray-700">1 Month</span>
                  <span className="font-display text-2xl font-bold text-brand-blue">$149 CAD</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                  <span className="font-semibold text-gray-700">2 Months</span>
                  <span className="font-display text-2xl font-bold text-brand-blue">$199 CAD</span>
                </div>
              </div>
            </div>
          </Tilt>
        </Stagger>

        {/* Payment Instructions */}
        <Reveal delay={0.1}>
          <div className="bg-gradient-to-br from-blue-50 to-yellow-50 rounded-2xl p-8 mb-8 border border-blue-100">
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-6 text-center tracking-tight">
              How to Renew
            </h3>
            <div className="space-y-5">
              {steps.map((s) => (
                <div key={s.n} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-9 h-9 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold shadow-md">
                    {s.n}
                  </div>
                  <div className="flex-1 min-w-0">{s.content}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Important Notes */}
        <Reveal delay={0.15}>
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-display font-bold text-gray-900 mb-2 tracking-tight">Important Notes:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>It is essential to renew right after your course expires to avoid long breaks in your learning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>If you plan to resume study after a specific period, you need to notify Vyom or the Team about your Study Plan moving ahead</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Motivation Section */}
        <Reveal delay={0.2}>
          <div className="text-center bg-gradient-to-r from-brand-blue to-brand-amber rounded-2xl p-8 text-white shadow-2xl">
            <p className="font-display text-xl md:text-2xl font-bold mb-2 tracking-tight">
              Let&rsquo;s make sure that we complete A2 this time
            </p>
            <p className="text-lg md:text-xl">and start with B1 💯</p>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
