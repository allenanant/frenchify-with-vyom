import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import FloatingOrbs from '@/components/motion/FloatingOrbs';

export const metadata: Metadata = {
  title: 'Privacy Policy - Frenchify',
  description:
    'Privacy Policy for Frenchify with Vyom Inc. — how we collect, use, store, and protect your personal information under PIPEDA and Québec Act 25.',
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden aurora-bg py-20 md:py-24">
        <FloatingOrbs variant="soft" />
        <div className="relative z-10 ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal direction="up" duration={0.7}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight leading-[1.08]">
              <span className="gradient-text">Privacy</span> Policy
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.1} duration={0.6}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-gray-200 text-sm text-gray-600 shadow-sm">
              Last Updated: November 5, 2025
            </span>
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <section className="py-20 bg-gray-50">
        <div className="ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up" duration={0.6}>
            <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
              <p className="text-gray-700 leading-relaxed mb-6">
                This Privacy Policy explains how Frenchify with Vyom Inc. (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, stores, and protects your personal information under Canada&rsquo;s Personal Information Protection and Electronic Documents Act (PIPEDA) and Qu&eacute;bec&rsquo;s Act Respecting the Protection of Personal Information in the Private Sector (Act 25).
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">1. Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Frenchify with Vyom Inc. collects personal information on the legal basis of consent and legitimate business interest under PIPEDA and Act 25.</p>
              <p className="text-gray-700 leading-relaxed mb-4">We collect:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Full name, contact details, and payment data</li>
                <li>Course enrollment and progress information</li>
                <li>IP addresses and device IDs (for security)</li>
                <li>Class recordings, messages, and feedback</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">These details are used solely to provide and administer our educational services and maintain account security.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">2. Class Recordings &amp; Consent</h2>
              <p className="text-gray-700 leading-relaxed mb-4">All live sessions are recorded. Attendance constitutes consent to recording of your name, voice, and video.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Recordings may be used for:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Student revision and quality control</li>
                <li>Instructor training and evaluation</li>
                <li>Integration into future course content</li>
                <li>Marketing and educational demonstrations</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">Students must use their registered names in all live sessions.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">3. Testimonial &amp; Likeness Release</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Students who voluntarily share feedback, testimonials, screenshots, or videos grant Frenchify the right to use their first name, image, and comments in marketing and promotional materials without additional compensation.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">4. Duplicate Payment Refund Exception</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Refunds are issued only for verified duplicate transactions confirmed by the payment processor.</p>
              <p className="text-gray-700 leading-relaxed mb-4">All other payments remain non-refundable.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">5. Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Data is stored on encrypted, secure systems.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Payments are processed through certified providers (Stripe, Klarna, Afterpay, E-transfer).</p>
              <p className="text-gray-700 leading-relaxed mb-4">Access to data is limited to authorized staff only.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Note: If you use the above payment methods of the banks, legal institutions or Private payment providers we are not responsible if they store your information on their end.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">6. Data Sharing</h2>
              <p className="text-gray-700 leading-relaxed mb-4">We do not sell or rent user data.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Information is shared only when:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Required by law</li>
                <li>Needed to process payments or prevent fraud</li>
                <li>Used by service providers bound by confidentiality</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">7. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Personal data is retained only as long as necessary for course delivery and to meet legal obligations.</p>
              <p className="text-gray-700 leading-relaxed mb-4">After that period, it may be anonymized or securely deleted.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">8. Cookies &amp; Analytics</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Our website uses cookies and analytics tools to improve functionality and performance.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Users may disable cookies in their browser settings.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">9. Third-Party Tools Notice</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Participation via Zoom, Google Meet, Stripe, Afterpay, or similar platforms is governed by each provider&rsquo;s independent terms and privacy policies.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">10. Student Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Students may request access to their data, corrections, or withdraw consent (which may limit services) by emailing{' '}
                <Link href="mailto:frenchifywithvyom@gmail.com" className="text-brand-blue hover:text-brand-blue-deep hover:underline font-medium">
                  frenchifywithvyom@gmail.com
                </Link>
                .
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">11. Policy Updates</h2>
              <p className="text-gray-700 leading-relaxed mb-4">We may modify this Policy periodically. Continued use of our services signifies acceptance of the most recent version.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">12. Contact</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>
                  Email:{' '}
                  <Link href="mailto:frenchifywithvyom@gmail.com" className="text-brand-blue hover:text-brand-blue-deep hover:underline font-medium">
                    frenchifywithvyom@gmail.com
                  </Link>
                </li>
                <li>Location: Montr&eacute;al, Qu&eacute;bec, Canada</li>
              </ul>
              <p className="text-gray-500 text-sm mt-8 text-center">&copy; 2025 Frenchify with Vyom Inc. &mdash; All Rights Reserved.</p>
            </article>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
