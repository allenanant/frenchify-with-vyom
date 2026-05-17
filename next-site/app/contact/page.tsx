import Link from 'next/link';
import Script from 'next/script';
import { Calendar, Phone, Mail } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Magnetic from '@/components/motion/Magnetic';

export const metadata = {
  title: 'Contact Us - Frenchify',
  description:
    "Get in touch with Frenchify. Send us your details and we'll get back to you shortly.",
};

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* LEFT: helper text + meet CTA + phone */}
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
                      className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-deep text-white font-semibold px-6 py-3 rounded-full shadow-[0_12px_28px_-8px_rgba(37,99,235,0.55)] hover:shadow-[0_18px_36px_-10px_rgba(37,99,235,0.65)] transform hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <Calendar className="w-5 h-5" />
                      Click here to book a meet
                    </Link>
                  </Magnetic>
                </div>

                {/* Phone + email */}
                <div className="border-t border-gray-100 pt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 w-11 h-11 rounded-full flex items-center justify-center text-brand-blue shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-gray-900">Phone</p>
                      <a href="tel:5147265114" className="text-gray-600 hover:text-brand-blue">
                        (514) 726-5114
                      </a>
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

            {/* RIGHT: contact form */}
            <Reveal delay={0.1}>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_25px_60px_-25px_rgba(30,58,138,0.18)] p-5 md:p-7">
                <div className="text-center mb-4 lg:mb-6">
                  <h2 className="font-display text-2xl md:text-3xl font-semibold text-gray-900 mb-2 tracking-tight">
                    Send us a message
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base">
                    Drop your details and we&apos;ll get back to you shortly.
                  </p>
                </div>
                <iframe
                  src="https://api.leadconnectorhq.com/widget/form/hNHsUQGDYnwiWeSJKXSe"
                  style={{ width: '100%', height: '440px', border: 'none', borderRadius: '3px' }}
                  id="inline-hNHsUQGDYnwiWeSJKXSe"
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="Contact us form"
                  data-height="440"
                  data-layout-iframe-id="inline-hNHsUQGDYnwiWeSJKXSe"
                  data-form-id="hNHsUQGDYnwiWeSJKXSe"
                  title="Contact us form"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </main>
  );
}
