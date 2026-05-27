import { AlertCircle } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Tilt from '@/components/motion/Tilt';

export const metadata = {
  title: 'A1 Course Renewal - Frenchify with Vyom',
  description: 'Continue your French learning journey with A1 Course Renewal options and live session add-ons.',
};

export default function A1CourseRenewalPage() {
  return (
    <main className="pb-20 px-4">
      <div className="ghl-row-faq mx-auto">
        {/* Header Section */}
        <Reveal>
          <div className="text-center mb-12 pt-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              A1 Course <span className="gradient-text">Renewal</span>
            </h1>
            <p className="text-lg text-gray-600">Continue your French learning journey</p>
          </div>
        </Reveal>

        {/* Pricing Cards */}
        <Stagger className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Online Course Only */}
          <Tilt max={5}>
            <div className="premium-card bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-brand-blue transition-all duration-300 h-full">
              <div className="text-center mb-6">
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-2 tracking-tight">
                  A1 - Online Course Renewal
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-brand-blue to-brand-amber mx-auto rounded-full" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-700">1 Month</span>
                  <span className="text-2xl font-bold text-brand-blue">$99 CAD</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-700">2 Months</span>
                  <span className="text-2xl font-bold text-brand-blue">$149 CAD</span>
                </div>
              </div>
            </div>
          </Tilt>

          {/* Online Course + Live Sessions */}
          <Tilt max={5}>
            <div className="premium-card bg-white border-2 border-brand-amber rounded-2xl p-8 transition-all duration-300 relative h-full">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-brand-amber text-gray-900 px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  POPULAR
                </span>
              </div>
              <div className="text-center mb-6">
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-2 tracking-tight">
                  A1 Online Course + Live Sessions
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-brand-blue to-brand-amber mx-auto rounded-full" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                  <span className="font-semibold text-gray-700">1 Month</span>
                  <span className="text-2xl font-bold text-brand-blue">$149 CAD</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                  <span className="font-semibold text-gray-700">2 Months</span>
                  <span className="text-2xl font-bold text-brand-blue">$199 CAD</span>
                </div>
              </div>
            </div>
          </Tilt>
        </Stagger>

        {/* Payment Instructions */}
        <Reveal>
          <div className="bg-gradient-to-br from-blue-50 to-yellow-50 rounded-2xl p-8 mb-8">
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-6 text-center tracking-tight">
              How to Renew
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <p className="text-gray-700">
                    <strong>Choose your preferred renewal option</strong> from the packages above
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <p className="text-gray-700">
                    <strong>Send the payment</strong> to:
                  </p>
                  <div className="mt-2 bg-white p-4 rounded-lg border-2 border-blue-200">
                    <a
                      href="mailto:frenchifyfee@gmail.com"
                      className="text-brand-blue font-bold text-lg underline"
                    >
                      frenchifyfee@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <p className="text-gray-700 mb-3">
                    <strong>Send us a screenshot</strong> of the payment confirmation to begin your access
                  </p>
                  <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                    <p className="text-gray-700 mb-2">
                      <strong>Send via email:</strong>
                    </p>
                    <a
                      href="mailto:frenchifyfee@gmail.com"
                      className="text-brand-blue font-bold text-lg underline break-all"
                    >
                      frenchifyfee@gmail.com
                    </a>
                    <p className="text-gray-600 text-sm mt-2">Or send through the Frenchify Portal / App</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Important Notes */}
        <Reveal>
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-brand-amber w-7 h-7 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Important Notes:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-amber mt-1">•</span>
                    <span>
                      It is essential to renew right after your course expires to avoid long breaks in your learning
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-amber mt-1">•</span>
                    <span>
                      If you plan to resume study after a specific period, you need to notify Vyom or the Team about your Study Plan moving ahead
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Motivation Section */}
        <Reveal>
          <div className="text-center bg-gradient-to-r from-brand-blue to-brand-amber rounded-2xl p-8 text-white shadow-xl">
            <p className="font-display text-xl md:text-2xl font-bold mb-2 tracking-tight">
              Let&apos;s make sure that we complete A1 this time
            </p>
            <p className="text-lg md:text-xl">and start with A2 💯</p>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
