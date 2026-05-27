import type { Metadata } from 'next';
import Reveal from '@/components/motion/Reveal';
import FloatingOrbs from '@/components/motion/FloatingOrbs';

export const metadata: Metadata = {
  title: 'Refund Policy - Frenchify',
  description:
    'Refund & Cancellation Policy for Frenchify with Vyom Inc. courses, programs, consultations, speaking sessions, webinars, and workshops.',
};

export default function RefundPolicyPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden aurora-bg py-20 md:py-24">
        <FloatingOrbs variant="soft" />
        <div className="relative z-10 ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal direction="up" duration={0.7}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight leading-[1.08]">
              <span className="gradient-text">Refund</span> &amp; Cancellation Policy
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
                This Refund &amp; Cancellation Policy applies to all services, courses, programs, consultations, speaking sessions, webinars, and workshops provided by Frenchify with Vyom Inc.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">1. General Refund Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">All payments are final, non-refundable, and non-transferable.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Refunds apply only in confirmed duplicate-payment cases verified by the payment processor.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">2. Webinars &amp; Workshops</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Paid events are non-refundable.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Offers during events apply only to attendees within stated deadlines.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">3. Analysis &amp; Placement Tests</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Once you register for the analysis test and don&rsquo;t begin within the mentioned duration your test fee cannot be used as a credit towards your course fee. In case you choose not to continue after the analysis test, the fee is non refundable.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">4. One-on-One Consultations &amp; Speaking Sessions</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Fees are non-refundable once booked. Must be completed within active course access; missed sessions cannot be rescheduled or refunded.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">5. Combo Programs, Lock In Payments &amp; Installments</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Combo courses are non-separable and non-transferable.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Once you lock in a combo offer by paying the initial fee, and later decide not to continue in this scenario no refund is applicable due to change in personal choice as all the information about courses was provided prior to the Lock In for the Level.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Late payments revoke discounts; no partial refunds apply.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Your course access continues even if you don&rsquo;t complete the first or initial level. For eg, if you begin with A1A2 Combo, and start with A1 on 1st January 2026, your A1 ends on 1st May, 2026 and your A2 access time begins the same day and ends after 4 months even if you did not complete the A1 test. The combo courses have deadlines aligned that begin one after another.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">6. Code of Conduct Violations</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Harassment, discrimination, disruptive behavior, account sharing, or VPN misuse may result in removal or permanent suspension without refund.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">7. Chargebacks</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Filing a payment dispute or chargeback immediately revokes access and may result in a permanent ban and fraud reporting.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">8. Acceptance</h2>
              <p className="text-gray-700 leading-relaxed mb-4">By enrolling in any Frenchify program or service, you acknowledge and accept this Refund &amp; Cancellation Policy.</p>
            </article>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
