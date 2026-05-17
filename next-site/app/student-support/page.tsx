import Script from 'next/script';
import Reveal from '@/components/motion/Reveal';

export const metadata = {
  title: 'Student Support - Frenchify',
  description: 'Currently enrolled? Drop your details and the Frenchify team will get back to you.',
  robots: { index: false, follow: false },
};

export default function StudentSupportPage() {
  return (
    <main>
      <section className="pt-14 md:pt-20 lg:pt-24 pb-16 md:pb-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-8">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
                Student Support
              </h1>
              <p className="text-lg text-gray-600">
                Currently enrolled? Drop your details and we&apos;ll get back to you.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_25px_60px_-25px_rgba(30,58,138,0.18)] p-5 md:p-7">
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/xhSBFfBdLjwLlJuFM1Eb"
                style={{ width: '100%', height: '500px', border: 'none', borderRadius: '3px' }}
                id="inline-xhSBFfBdLjwLlJuFM1Eb"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Contact us form (for students)"
                data-height="440"
                data-layout-iframe-id="inline-xhSBFfBdLjwLlJuFM1Eb"
                data-form-id="xhSBFfBdLjwLlJuFM1Eb"
                title="Contact us form (for students)"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </main>
  );
}
