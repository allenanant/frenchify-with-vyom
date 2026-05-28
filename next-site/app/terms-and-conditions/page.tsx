import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import FloatingOrbs from '@/components/motion/FloatingOrbs';

export const metadata: Metadata = {
  title: 'Terms & Conditions - Frenchify',
  description:
    'Terms & Conditions governing enrollment, access, and participation in Frenchify with Vyom Inc. courses, programs, and services.',
};

export default function TermsAndConditionsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden aurora-bg py-20 md:py-24">
        <FloatingOrbs variant="soft" />
        <div className="relative z-10 ghl-row-faq mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal direction="up" duration={0.7}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight leading-[1.08]">
              <span className="gradient-text">Terms</span> &amp; Conditions
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
              <p className="text-gray-700 leading-relaxed mb-4">
                By enrolling in, accessing, or participating in any course, program, or service provided by Frenchify with Vyom Inc. (&ldquo;Frenchify,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), you (&ldquo;student,&rdquo; &ldquo;participant,&rdquo; or &ldquo;user&rdquo;) agree to the following Terms &amp; Conditions.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                These Terms apply to all free and paid offerings, including online courses, live sessions, self-paced programs, consultations, speaking sessions, webinars, and workshops.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">1. Definitions</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li><strong className="font-semibold text-gray-900">Course / Program:</strong> Any educational product, live or recorded, offered by Frenchify with Vyom Inc.</li>
                <li><strong className="font-semibold text-gray-900">Live Session:</strong> Any real-time class, webinar, or workshop conducted online.</li>
                <li><strong className="font-semibold text-gray-900">User / Student:</strong> Any individual enrolled in or accessing a Frenchify program.</li>
                <li><strong className="font-semibold text-gray-900">Instructor:</strong> Vyom or any authorized teacher delivering content.</li>
                <li><strong className="font-semibold text-gray-900">Access Duration:</strong> The time during which a student may access course materials.</li>
                <li><strong className="font-semibold text-gray-900">Account:</strong> The registered profile used to access Frenchify courses.</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">2. Code of Conduct</h2>
              <p className="text-gray-700 leading-relaxed mb-4">All students must maintain professionalism and respect toward instructors, peers, and staff.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Harassment, discrimination, or disruptive behavior results in immediate removal without refund.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Frenchify may suspend or permanently ban any user who violates this policy.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">3. Device, Access &amp; Security Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Each registration allows access on only one authorized device (desktop, laptop, tablet, or phone) at a time.</p>
              <p className="text-gray-700 leading-relaxed mb-4">The Frenchify App may be used on mobile, but only one device can remain logged in at a time.</p>
              <p className="text-gray-700 leading-relaxed mb-4">IP addresses and device IDs are monitored to prevent sharing.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Sharing accounts or using VPNs results in immediate permanent suspension without refund.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">4. Live Sessions &amp; Recordings</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Live sessions follow the Eastern Time Zone (Ontario) and cannot be changed individually.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Students must attend under their registered full name for verification.</p>
              <p className="text-gray-700 leading-relaxed mb-4">By attending, students consent to being recorded.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Recordings are for quality, revision, and may be used in future Frenchify materials or promotions on social media platforms.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Recordings shared with students expire after 7 days.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">5. Webinars &amp; Workshops</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Frenchify hosts both free and paid webinars/workshops.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Paid events are non-refundable; offers during events apply only to attendees within stated deadlines.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">6. Free &amp; Unpaid Courses</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Free courses (e.g., Inside Frenchify, demo sessions) are subject to change or withdrawal at any time.</p>
              <p className="text-gray-700 leading-relaxed mb-4">They do not include personalized feedback, certification, or guaranteed support.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">7. Analysis &amp; Placement Tests</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Placement tests may be free or paid.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Level recommendations are decided by Vyom or assigned instructors.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Once a test is completed, analysis fees are non-refundable in case student does not wish to abide by result or program.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">8. One-on-One Consultations &amp; Speaking Sessions</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Fees are non-refundable once booked. Must be completed within active course access; missed sessions cannot be rescheduled or refunded.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">9. Writing Corrections &amp; Submissions</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Feedback is delivered within 3&ndash;4 business days.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Each course allows a fixed number of writing submissions.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Additional corrections can be purchased through Vyom or admin.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">10. Renewal Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Students may renew course or live-session access upon expiry by paying a renewal fee.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Requests must be sent via email before access ends or register for renewal before or on the day course access ends. Courses cannot be renewed after a long time of access expiration.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Course access cannot be renewed multiple times. A student may renew once, or a maximum of two times, after the original tenure ends, and the total extension cannot exceed 2 months at any given time in total. All renewals must be consecutive &mdash; there can be no gap between the original access period and any renewal.</p>
              <p className="text-gray-700 leading-relaxed mb-4">For example: if a student renews for 1 month and then renews for another 1 month consecutively, this is allowed.</p>
              <p className="text-gray-700 leading-relaxed mb-4">For example: if a student renews once for 2 months, no further renewal is possible past that.</p>
              <p className="text-gray-700 leading-relaxed mb-4">For example: if a student renews once for 2 months and then asks for another 1-month renewal, this is not possible.</p>
              <p className="text-gray-700 leading-relaxed mb-4">In all such cases, students will need to re-register for the course as a new enrolment, or take guidance from the Frenchify Team on next steps.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">11. Enrollment &amp; Payment</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Enrollment is confirmed after successful payment through website :{' '}
                <Link href="https://www.frenchifywithvyom.com" className="text-brand-blue hover:text-brand-blue-deep hover:underline font-medium">
                  www.frenchifywithvyom.com
                </Link>
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">Stripe, Klarna, Afterpay, E-transfer, or approved cash, Credit, Debit.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Etransfer ID : frenchifyfee@gmail.com / frenchifywithvyom@gmail.com</p>
              <p className="text-gray-700 leading-relaxed mb-4">Chargebacks: Filing a dispute immediately revokes access and may result in a permanent ban and fraud reporting.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Late payments cancel discounts and require full pricing.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">12. Course Access Duration</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Combo courses activate levels sequentially.</p>
              <p className="text-gray-700 leading-relaxed mb-4">The next level starts automatically after test completion or expiry whichever comes first.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Previous levels remain accessible for revision until their original expiry.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">13. Advancement Between Levels</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Advancement depends on instructor evaluation and performance.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Vyom or assigned instructors have sole authority to approve progression.</p>
              <p className="text-gray-700 leading-relaxed mb-4">A1 enrollment does not guarantee seats in higher levels; they must be locked with payment.</p>
              <p className="text-gray-700 leading-relaxed mb-4">If seats are full, Vyom cannot override capacity limits.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">14. Results &amp; Outcomes Disclaimer</h2>
              <p className="text-gray-700 leading-relaxed mb-4">While Frenchify with Vyom Inc. strives to provide high-quality instruction and resources, we do not guarantee specific results, fluency, certification, or advancement.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Progress depends on each student&rsquo;s effort, participation, and consistency.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">15. Combo Programs, Lock In Payments &amp; Installments</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Combo courses are non-separable and non-transferable.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Once you lock in a combo offer by paying the initial fee, and later decide not to continue in this scenario no refund is applicable due to change in personal choice as all the information about courses was provided prior to the Lock In for the Level.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Late payments revoke discounts; no partial refunds apply.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">16. Technical Requirements &amp; Mishaps</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Stable internet and compatible devices are required.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Frenchify is not responsible for user-side technical failures.</p>
              <p className="text-gray-700 leading-relaxed mb-4">In case of outdated web or laptop versions there might be technical issues which need to be fixed on students end if they are facing any issue in loading the courses.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Due to maintenance or technical difficulties from Frenchify Team, there might be some delay in loading the course for a short duration of time but it will be fixed and worked upon as soon as possible.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">17. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed mb-4">All videos, recordings, PDFs, and materials belong to Frenchify with Vyom Inc.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Copying, redistributing, or reselling content is strictly prohibited and will result in strict action or legal charges</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">18. Community &amp; Social Media Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Official groups (Telegram, etc.) are for academic communication only.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Unsolicited promotions or offensive content result in removal without refund.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">19. Support &amp; Communication Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Official communication: email only.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Replies typically within 2&ndash;3 business days (Eastern Time).</p>
              <p className="text-gray-700 leading-relaxed mb-4">No/Less support on weekends or Canada holidays.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">20. Third-Party Tools Disclaimer</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Frenchify uses external services (Zoom, Google Meet, Stripe, Afterpay, etc.).</p>
              <p className="text-gray-700 leading-relaxed mb-4">Their respective terms and privacy policies also apply.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Frenchify is not liable for third-party platform failures or policy changes.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">21. Privacy &amp; Data Protection Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Frenchify with Vyom Inc. collects, stores, and processes limited personal information for the purpose of providing educational services, maintaining account security, and meeting legal obligations.</p>
              <p className="text-gray-700 leading-relaxed mb-4">All handling of personal information is governed by our Privacy Policy, which forms an integral part of these Terms &amp; Conditions.</p>
              <p className="text-gray-700 leading-relaxed mb-4">By enrolling or using any Frenchify service, you acknowledge that you have read, understood, and agreed to the Privacy Policy.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">22&ndash;26. Existing Approved Sections</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Pricing &amp; Program Modifications, International Access, Limitation of Liability, Termination of Access, and Governing Law.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">27. Force Majeure</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Frenchify with Vyom Inc. shall not be liable for delays or failures caused by events beyond our reasonable control, including but not limited to natural disasters, pandemics, government restrictions, power failures, or internet outages.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">28. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">By enrolling or using Frenchify&rsquo;s platform, you confirm that you have read, understood, and accepted all Terms.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">29. Business Registration &amp; Version Control</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Frenchify with Vyom Inc. Registered in Qu&eacute;bec, Canada.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Version 1.4, effective November 2025.</p>
              <p className="text-gray-700 leading-relaxed mb-4">Previous versions are archived.</p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">30. Severability &amp; Entire Agreement</h2>
              <p className="text-gray-700 leading-relaxed mb-4">If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.</p>
              <p className="text-gray-700 leading-relaxed mb-4">These Terms, together with the Privacy Policy &amp; Refund Policy, constitute the entire agreement between the student and Frenchify with Vyom Inc.</p>
            </article>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
