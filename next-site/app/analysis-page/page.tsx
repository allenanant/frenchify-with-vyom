import Link from 'next/link';
import {
  ArrowRight,
  Layers,
  BarChart3,
  Compass,
  Gift,
  AlertCircle,
  Mail,
  User,
  Phone,
  FileText,
  ExternalLink,
  Clock,
  Quote,
  Info,
} from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Tilt from '@/components/motion/Tilt';
import Magnetic from '@/components/motion/Magnetic';
import FloatingOrbs from '@/components/motion/FloatingOrbs';
import PricingCards from '@/components/sections/analysis-page/PricingCards';
import CopyEmailButton from '@/components/sections/analysis-page/CopyEmailButton';

export const metadata = {
  title: 'French Level Analysis Test | Frenchify with Vyom',
  description:
    'Not sure if you’re A1, A2, B1 or B2? Get a quick professional evaluation of your French level and a clear next step.',
};

export default function AnalysisPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="pt-[122px] md:pt-[152px] pb-16 px-6 full-bleed-section-ghl relative overflow-hidden aurora-bg">
        <FloatingOrbs variant="soft" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <i className="fas fa-clipboard-check" />
              <span>Professional French Assessment</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
              Book Your French Level
              <br />
              <span className="gradient-text">Analysis Test Today</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Not sure if you&apos;re <span className="font-semibold text-blue-600">A1</span>,{' '}
              <span className="font-semibold text-blue-600">A2</span>,{' '}
              <span className="font-semibold text-blue-600">B1</span> or{' '}
              <span className="font-semibold text-blue-600">B2</span>?
            </p>
            <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto">
              Get a quick professional evaluation of your French level and a clear next step.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Magnetic>
              <a
                href="#register"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-blue-200"
              >
                <span>Book Your Test Now</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {/* Important Note */}
      <section className="px-6 pb-12 full-bleed-section-ghl">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="text-amber-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-gray-900 text-lg mb-2 tracking-tight">
                    Important Note
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    If you have given your TEF/TCF or any other exam, please make sure to{' '}
                    <strong>mention and attach the score and exam date</strong> for that as well.
                    Frenchify currently trains specifically for the <strong>TEF Canada Exam</strong>.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="px-6 py-16 bg-white full-bleed-section-ghl">
        <div className="max-w-[1170px] mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                What is in the Analysis Test?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A structured check of your French (speaking, listening, reading, grammar and/or
                vocabulary, depending on your level).
              </p>
            </div>
          </Reveal>

          <Stagger className="grid md:grid-cols-3 gap-6 mb-12">
            <Tilt max={5}>
              <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-6 text-center h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Layers className="text-blue-600 w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-gray-900 text-lg mb-2 tracking-tight">
                  Your Level
                </h3>
                <p className="text-gray-600">A1, A2, B1 or B2</p>
              </div>
            </Tilt>
            <Tilt max={5}>
              <div className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-2xl p-6 text-center h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="text-green-600 w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-gray-900 text-lg mb-2 tracking-tight">
                  Strengths &amp; Weaknesses
                </h3>
                <p className="text-gray-600">Your key areas identified</p>
              </div>
            </Tilt>
            <Tilt max={5}>
              <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-2xl p-6 text-center h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Compass className="text-purple-600 w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-gray-900 text-lg mb-2 tracking-tight">
                  Next Steps
                </h3>
                <p className="text-gray-600">What to focus on next</p>
              </div>
            </Tilt>
          </Stagger>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        className="px-6 py-16 full-bleed-section-ghl"
        style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #fefce8 100%)',
        }}
      >
        <div className="max-w-[1170px] mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                One-Time Fee for Your Test
              </h2>
              <p className="text-lg text-gray-600">Choose the test that matches your current level</p>
            </div>
          </Reveal>

          <PricingCards />

          {/* Free Test Banner */}
          <Reveal>
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 md:p-8 text-white text-center shadow-xl">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                  <Gift className="w-7 h-7" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-1 tracking-tight">
                    Your Analysis Test is Effectively FREE!
                  </h3>
                  <p className="text-green-100">
                    The test fee is deducted from your program price when you enroll. You do need to
                    follow the feedback and start at the mentioned level.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How to Register Section */}
      <section className="px-6 py-16 bg-white full-bleed-section-ghl" id="register">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                How to Register
              </h2>
              <p className="text-lg text-gray-600">Follow these simple steps to book your test</p>
            </div>
          </Reveal>

          <Stagger className="space-y-0">
            {/* Step 1 */}
            <div className="relative pl-16 pb-10">
              <div
                className="absolute left-6 top-12 bottom-0 w-0.5"
                style={{ background: 'linear-gradient(to bottom, #3b82f6, #93c5fd)' }}
              />
              <div className="absolute left-0 top-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                1
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-6">
                <h3 className="font-display font-bold text-gray-900 text-lg mb-2 tracking-tight">
                  Send E-Transfer
                </h3>
                <p className="text-gray-600 mb-3">Send your payment via e-transfer to:</p>
                <CopyEmailButton />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative pl-16 pb-10">
              <div
                className="absolute left-6 top-12 bottom-0 w-0.5"
                style={{ background: 'linear-gradient(to bottom, #3b82f6, #93c5fd)' }}
              />
              <div className="absolute left-0 top-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                2
              </div>
              <div className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-2xl p-6">
                <h3 className="font-display font-bold text-gray-900 text-lg mb-2 tracking-tight">
                  Take a Screenshot
                </h3>
                <p className="text-gray-600">
                  Capture a screenshot of your payment confirmation for verification.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative pl-16 pb-10">
              <div
                className="absolute left-6 top-12 bottom-0 w-0.5"
                style={{ background: 'linear-gradient(to bottom, #3b82f6, #93c5fd)' }}
              />
              <div className="absolute left-0 top-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                3
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-2xl p-6">
                <h3 className="font-display font-bold text-gray-900 text-lg mb-2 tracking-tight">
                  Email Your Details
                </h3>
                <p className="text-gray-600 mb-3">Send the screenshot along with your:</p>
                <ul className="space-y-2 mb-4 text-gray-600">
                  <li className="flex items-center gap-2">
                    <User className="text-emerald-500 w-4 h-4" /> Name
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="text-emerald-500 w-4 h-4" /> Email
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="text-emerald-500 w-4 h-4" /> Phone Number
                  </li>
                </ul>
                <Magnetic>
                  <a
                    href="mailto:frenchifyfee@gmail.com"
                    className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Email Us</span>
                  </a>
                </Magnetic>
                <p className="text-sm text-gray-500 mt-3 flex items-center gap-1 break-all">
                  <Mail className="w-3.5 h-3.5" /> frenchifyfee@gmail.com
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative pl-16">
              <div className="absolute left-0 top-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg animate-pulse">
                4
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-2xl p-6">
                <h3 className="font-display font-bold text-gray-900 text-lg mb-2 tracking-tight">
                  Fill the Analysis Test Form
                </h3>
                <p className="text-gray-600 mb-4">
                  Once your payment is confirmed, fill out the analysis test form. This will help us
                  understand your current level and tailor the next steps more effectively.
                </p>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <Info className="text-amber-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-amber-800">
                      <strong>Note:</strong> Please complete the payment first before filling out the form.
                    </p>
                  </div>
                </div>

                <Magnetic>
                  <a
                    href="https://forms.gle/i5p95kWPtfN2oyGM9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all shadow-md hover:shadow-lg mb-4"
                  >
                    <FileText className="w-5 h-5" />
                    <span>Fill Analysis Test Form</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Magnetic>

                <div className="flex items-center gap-3 bg-purple-100 text-purple-700 rounded-xl px-4 py-3 mt-4">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">Results delivered in 1-3 Business Days</span>
                </div>

                <p className="text-sm text-gray-500 mt-4 italic flex items-start gap-1">
                  <Quote className="text-gray-300 w-3.5 h-3.5 mt-1 flex-shrink-0" />
                  <span>
                    Merci beaucoup et bonne chance ! Je me réjouis de vous accompagner dans votre préparation à l&apos;examen TEF Canada.
                  </span>
                </p>
              </div>
            </div>
          </Stagger>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="px-6 py-16 full-bleed-section-ghl"
        style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Ready to Know Your French Level?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Take the first step towards your Canadian immigration journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Magnetic>
                <a
                  href="mailto:frenchifyfee@gmail.com"
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg"
                >
                  <Mail className="w-5 h-5" />
                  <span>Register via Email</span>
                </a>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all"
                >
                  <span>View All Courses</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
