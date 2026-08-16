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

/**
 * One-to-one calls anyone can book from this page.
 *
 * Vyom's ask (11 Aug 2026) was to name each person and show what their call
 * costs, because "Clarity Calls" as a single unlabelled pill told nobody who
 * they were about to meet or what they were about to pay. That pill also
 * pointed at https://frenchifywithvyom.com/tef-success--clarity-call, a
 * GoHighLevel URL that stopped resolving once the domain started serving this
 * app, so it was a dead link as well as a vague one.
 *
 * Every price below is the total the GHL calendar actually charges at
 * checkout, read off the live widget in Aug 2026. GHL stays the source of
 * truth - if a calendar's price changes there, change it here too.
 */
const calls: {
  name: string;
  title: string;
  duration: string;
  price: string;
  href: string;
}[] = [
  {
    name: 'Jay Patel',
    title: 'TEF/TCF Success & Clarity Call',
    duration: '30 min',
    price: 'CA$10',
    href: 'https://api.leadconnectorhq.com/widget/bookings/jay-patel-30-mins-one-on-onf25esfyjd43idglfps8uq446ywu7fu',
  },
  {
    name: 'Harleen Kaur',
    title: 'TEF/TCF Success & Clarity Call',
    duration: '30 min',
    price: 'CA$10',
    href: 'https://api.leadconnectorhq.com/widget/bookings/harleen',
  },
  {
    name: 'Khushi Patel',
    title: 'Program Consultation',
    duration: '20 min',
    price: 'CA$1.99',
    href: 'https://api.leadconnectorhq.com/widget/booking/vuQtLZKhcVRsWI09FG6j',
  },
  {
    name: 'Darshan Patel',
    title: 'TEF Guidance Consultation',
    duration: '30 min',
    price: 'CA$25',
    href: 'https://api.leadconnectorhq.com/widget/booking/WATTU6fLCIqmDmFUuB4k',
  },
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

                  {/* Named calls with the real price, so nobody has to open a
                      booking widget just to find out who and how much. */}
                  <div className="mt-8">
                    <p className="text-gray-700 text-sm md:text-base mb-3 font-medium">
                      Or book a specific call:
                    </p>
                    <div className="space-y-2.5">
                      {calls.map((call) => (
                        <a
                          key={call.href}
                          href={call.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3.5 transition-all duration-300 hover:border-brand-blue hover:bg-brand-blue hover:shadow-[0_12px_28px_-10px_rgba(37,99,235,0.5)]"
                        >
                          <span className="min-w-0">
                            <span className="block font-semibold text-sm text-gray-900 transition-colors group-hover:text-white">
                              {call.name}
                            </span>
                            <span className="block text-xs text-gray-500 mt-0.5 transition-colors group-hover:text-blue-100">
                              {call.title} &middot; {call.duration}
                            </span>
                          </span>
                          <span className="flex items-center gap-2 shrink-0">
                            <span className="text-sm font-bold text-gray-900 transition-colors group-hover:text-white">
                              {call.price}
                            </span>
                            <ArrowRight className="w-4 h-4 text-brand-blue transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5" />
                            <span className="sr-only">
                              Book {call.name} &ndash; {call.title} (opens in a new tab)
                            </span>
                          </span>
                        </a>
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm mt-4">
                      Not sure of your level yet? Book an{' '}
                      <Link
                        href="/analysis-page"
                        className="text-brand-blue hover:underline font-medium"
                      >
                        Analysis Test
                      </Link>{' '}
                      first and we&apos;ll tell you where to start.
                    </p>
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
