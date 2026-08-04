import Link from 'next/link';
import { Calendar, MessageCircle, Mail, ArrowRight } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Magnetic from '@/components/motion/Magnetic';
import IsThisYou from '@/components/IsThisYou';

export const metadata = {
  title: 'Contact Us - Frenchify',
  description:
    "Get in touch with Frenchify. Send us your details and we'll get back to you shortly.",
};

// Specific instructor meets shown on the contact page. Only meets with an
// existing GHL booking link are clickable; others are placeholders until their
// links are provided.
const meets: { label: string; href: string | null }[] = [
  { label: 'Clarity Calls', href: 'https://frenchifywithvyom.com/tef-success--clarity-call' },
  { label: 'TEF Guidance', href: 'https://api.leadconnectorhq.com/widget/booking/WATTU6fLCIqmDmFUuB4k' },
  { label: 'Analysis Test', href: 'https://frenchifywithvyom.com/analysis-page' },
  { label: 'Meeting with Karan', href: null },
];

export default function ContactPage() {
  return (
    <main>
      {/* Hero */}
      <section className="pt-10 md:pt-14 lg:pt-20 pb-6 md:pb-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Send us your details and we&apos;ll get back to you shortly.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Two-column: Help info + form */}
      <section className="pb-12 md:pb-20 lg:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* helper text + meet CTA + phone */}
            <Reveal>
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-5 tracking-tight">
                  Looking for help?
                </h2>
                <p className="text-gray-600 text-base md:text-lg mb-4 leading-relaxed">
                  Check our{' '}
                  <Link href="/faq" className="text-brand-blue hover:underline font-medium">
                    FAQ
                  </Link>{' '}
                  to quickly find answers to your questions.
                </p>
                <p className="text-gray-600 text-base md:text-lg mb-4 leading-relaxed">
                  If you need more information or have any comments to share, we&apos;d be happy to hear from you!
                </p>
                <p className="text-gray-600 text-base md:text-lg mb-2 leading-relaxed">
                  Our team is available during regular business hours:
                </p>
                <p className="text-gray-900 text-base md:text-lg font-semibold mb-5">
                  Monday to Friday, 9am&ndash;5pm IST.
                </p>
                <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
                  We&apos;ll respond to your messages as soon as we can.
                </p>

                {/* Book a meet CTA */}
                <div className="mb-10">
                  <p className="text-gray-700 text-base md:text-lg mb-3">
                    Want to talk to a consultant 1:1?
                  </p>
                  <Magnetic>
                    <Link
                      href="/book-a-meet"
                      className="mt-2.5 inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-deep text-white font-semibold px-6 py-3 rounded-full shadow-[0_12px_28px_-8px_rgba(37,99,235,0.55)] hover:shadow-[0_18px_36px_-10px_rgba(37,99,235,0.65)] transform hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <Calendar className="w-5 h-5" />
                      Click here to book a meet
                    </Link>
                  </Magnetic>

                  {/* Specific instructor meets */}
                  <div className="mt-6">
                    <p className="text-gray-700 text-sm md:text-base mb-3 font-medium">
                      Or book a specific session:
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {meets.map((meet) =>
                        meet.href ? (
                          <a
                            key={meet.label}
                            href={meet.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm font-medium text-brand-blue bg-blue-50 hover:bg-blue-100 border border-blue-100 px-4 py-2 rounded-full transition-colors"
                          >
                            {meet.label}
                          </a>
                        ) : (
                          <span
                            key={meet.label}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 bg-gray-50 border border-gray-100 px-4 py-2 rounded-full cursor-not-allowed"
                          >
                            {meet.label}
                            <span className="text-[10px] font-semibold uppercase tracking-wide">soon</span>
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* WhatsApp + email */}
                <div className="border-t border-gray-100 pt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 w-11 h-11 rounded-full flex items-center justify-center text-brand-blue shrink-0">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-gray-900">WhatsApp</p>
                      <a
                        href="https://wa.me/14388131377"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-brand-blue"
                      >
                        +1 438-813-1377
                      </a>
                      <p className="text-gray-500 text-sm">Text only &mdash; please message, no calls</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 w-11 h-11 rounded-full flex items-center justify-center text-brand-blue shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-gray-900">Email</p>
                      <a
                        href="mailto:admin@frenchifywithvyom.com"
                        className="text-gray-600 hover:text-brand-blue break-all"
                      >
                        admin@frenchifywithvyom.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* Is this you? */}
      <IsThisYou className="bg-[#F9FAFB] border-t border-gray-100" />

      {/* Closing CTA */}
      <section className="bg-[#F9FAFB] pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-[40px] font-bold text-gray-900 tracking-tight leading-tight">
              Don&apos;t figure this out alone.
            </h2>
            <p className="mt-5 text-base md:text-lg leading-relaxed text-gray-600">
              We&apos;ve helped 150+ students in the exact same spot go from stuck to CLB 5
              or CLB 7.
            </p>
            <p className="mt-3 text-base md:text-lg leading-relaxed text-gray-600">
              Book a free call and we&apos;ll map out your timeline, your starting level,
              and the fastest path to your target score, with a personalized French
              learning plan.
            </p>
            <Magnetic>
              <Link
                href="/book-a-meet"
                className="mt-8 inline-flex items-center gap-2.5 bg-brand-blue hover:bg-brand-blue-deep text-white font-semibold px-7 py-3.5 rounded-full shadow-[0_12px_28px_-8px_rgba(37,99,235,0.55)] hover:shadow-[0_18px_36px_-10px_rgba(37,99,235,0.65)] transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Book Your Free Call
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
