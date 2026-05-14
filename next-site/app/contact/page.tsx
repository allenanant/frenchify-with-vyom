import Image from 'next/image';
import Script from 'next/script';
import { CheckCircle2, Phone, Mail } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Tilt from '@/components/motion/Tilt';
import Magnetic from '@/components/motion/Magnetic';

export const metadata = {
  title: 'Book a Meet - Frenchify',
  description:
    "Each of our consultants are here to help you achieve your French learning goals.",
};

export default function ContactPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="pt-10 md:pt-14 lg:pt-20 pb-6 md:pb-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Talk to Someone Who&apos;s Been in Your Shoes
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Each of our consultants are here to help you achieve your French learning goals.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Inline Contact Form */}
      <section className="pb-10 md:pb-14 lg:pb-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal delay={0.1}>
            <div className="bg-white rounded-2xl p-5 md:p-8 lg:p-10">
              <div className="text-center mb-4 lg:mb-6">
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-gray-900 mb-2 tracking-tight">
                  Get In Touch
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Send us your details and we&apos;ll get back to you shortly.
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
      </section>

      {/* Consultants Section */}
      <section className="py-10 md:py-14 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Stagger className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-14 md:gap-y-20 lg:gap-y-24">
            {/* Darshan Column */}
            <div className="flex flex-col items-center">
              <div className="text-center mb-20 lg:mb-16">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                  TEF Consultation
                </h2>
                <p className="text-lg text-gray-600">with Darshan</p>
              </div>
              <Tilt max={5}>
                <div className="premium-card bg-white rounded-2xl shadow-lg p-8 pt-20 flex flex-col border border-gray-100 text-center relative max-w-md w-full">
                  <Image
                    src="https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/68851d26b8876817d0e1903e.png"
                    alt="Darshan Patel"
                    width={112}
                    height={112}
                    unoptimized
                    className="w-28 h-28 rounded-full object-cover absolute -top-14 left-1/2 -translate-x-1/2 border-4 border-white shadow-lg"
                  />
                  <h2 className="font-display text-2xl font-bold text-gray-900 tracking-tight">Darshan Patel</h2>
                  <p className="text-blue-600 font-semibold mb-4">TEF Guidance Consultant</p>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm text-left">
                    <p>
                      <b>Writing:</b> CLB 7 - B2+
                    </p>
                    <p>
                      <b>Reading:</b> CLB 8 - B2+
                    </p>
                    <p>
                      <b>Listening:</b> CLB 9 - C1
                    </p>
                    <p>
                      <b>Speaking:</b> CLB 7 - B2+
                    </p>
                  </div>
                  <ul className="space-y-2 text-gray-700 mb-4 text-left">
                    <li className="flex items-center">
                      <CheckCircle2 className="text-green-500 mr-2 w-4 h-4" />
                      Cleared TEF with Frenchify
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="text-green-500 mr-2 w-4 h-4" />
                      Now a Canadian PR
                    </li>
                  </ul>
                  <p className="text-gray-600 mb-4 flex-grow text-left">
                    Darshan is the go-to mentor for anyone feeling stuck or unsure. He shares real, experience-based insights on what worked, what to avoid, and how to fast-track your results.
                  </p>
                  <a
                    href="https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/688537fd5468fc8379eb53a0.jpeg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm mb-4"
                  >
                    Click here to view Darshan&apos;s Result
                  </a>
                  <div className="text-center mt-auto">
                    <p className="text-3xl font-bold text-gray-800 mb-2">
                      20 CAD{' '}
                      <span className="text-lg font-normal text-gray-500 line-through">60 CAD</span>
                    </p>
                    <Magnetic>
                      <a
                        href="https://api.leadconnectorhq.com/widget/booking/WATTU6fLCIqmDmFUuB4k"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        Book Here
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </Tilt>
            </div>

            {/* Khushi Column */}
            <div className="flex flex-col items-center">
              <div className="text-center mb-20 lg:mb-16">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                  Program Consultation
                </h2>
                <p className="text-lg text-gray-600">with Khushi</p>
              </div>
              <Tilt max={5}>
                <div className="premium-card bg-white rounded-2xl shadow-lg p-8 pt-20 flex flex-col border border-gray-100 text-center relative max-w-md w-full">
                  <Image
                    src="https://storage.googleapis.com/msgsndr/cmjlzerv4DUDyZFj6PYO/media/6845e1c3e8861b03d63d455f.png"
                    alt="Khushi"
                    width={112}
                    height={112}
                    unoptimized
                    className="w-28 h-28 rounded-full object-cover absolute -top-14 left-1/2 -translate-x-1/2 border-4 border-white shadow-lg"
                  />
                  <h2 className="font-display text-2xl font-bold text-gray-900 tracking-tight">Khushi</h2>
                  <p className="text-blue-600 font-semibold mb-4">Program Consultant</p>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm text-center">
                    <p className="font-semibold">
                      Confused about which course to choose? Not sure where you fit — A1, A2, B1?
                    </p>
                  </div>
                  <p className="text-gray-600 mb-4 flex-grow text-left">
                    Khushi is a Program Consultant at Frenchify who conducts 20-minute one-on-one consultations to help students understand program structure, fees, access, and timelines. She guides you in choosing the right starting level based on your goals and availability.
                  </p>
                  <div className="text-center mt-auto">
                    <p className="text-3xl font-bold text-gray-800 mb-2">1.99 CAD</p>
                    <Magnetic>
                      <a
                        href="https://api.leadconnectorhq.com/widget/booking/vuQtLZKhcVRsWI09FG6j"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        Book Here
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </Tilt>
            </div>
          </Stagger>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-10 md:py-12 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-center">
            <div>
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-blue-600 w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-2 tracking-tight">Phone</h3>
              <a href="tel:5147265114" className="text-lg text-gray-600 hover:text-blue-600">
                (514) 726-5114
              </a>
            </div>
            <div>
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-blue-600 w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-2 tracking-tight">Email</h3>
              <a href="mailto:admin@frenchifywithvyom.com" className="text-lg text-gray-600 hover:text-blue-600">
                admin@frenchifywithvyom.com
              </a>
            </div>
          </Stagger>
        </div>
      </section>

      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </main>
  );
}
