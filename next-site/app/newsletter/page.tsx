import Script from 'next/script';
import { Mail, CheckCircle2, Lock, GraduationCap, Users, Gift } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import Tilt from '@/components/motion/Tilt';
import FloatingOrbs from '@/components/motion/FloatingOrbs';

export const metadata = {
  title: 'Subscribe to Frenchify Newsletter',
  description:
    'Get the latest French learning tips, TEF/TCF exam strategies, and exclusive content delivered straight to your inbox.',
};

export default function NewsletterPage() {
  return (
    <main className="pt-20 min-h-screen flex items-center justify-center px-4 relative overflow-hidden aurora-bg">
      <FloatingOrbs variant="soft" />
      <div className="ghl-row mx-auto text-center relative z-10 py-16">
        {/* Header Section */}
        <div className="mb-12">
          <Reveal>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <Mail className="text-brand-blue w-7 h-7" />
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              Stay Updated with <span className="gradient-text">Frenchify</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed">
              Get the latest French learning tips, TEF/TCF exam strategies, and exclusive content delivered straight to your inbox.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 mb-8">
              <div className="flex items-center">
                <CheckCircle2 className="text-green-500 w-4 h-4 mr-2" />
                Weekly French Tips
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="text-green-500 w-4 h-4 mr-2" />
                Exam Strategies
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="text-green-500 w-4 h-4 mr-2" />
                Student Success Stories
              </div>
            </div>
          </Reveal>
        </div>

        {/* Form Container */}
        <Reveal delay={0.25}>
          <div className="premium-card bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-lg mx-auto border border-gray-100">
            <div className="mb-6">
              <h2 className="font-display text-2xl font-semibold text-gray-900 mb-2 tracking-tight">
                Join Our Community
              </h2>
              <p className="text-gray-600">Subscribe to receive valuable French learning resources</p>
            </div>

            {/* Newsletter Form */}
            <div className="newsletter-form">
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/DqCZ5admvl0tPdrDgsok"
                style={{ width: '100%', height: '411px', border: 'none', borderRadius: '12px' }}
                id="inline-DqCZ5admvl0tPdrDgsok"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Email Newsletter"
                data-height="411"
                data-layout-iframe-id="inline-DqCZ5admvl0tPdrDgsok"
                data-form-id="DqCZ5admvl0tPdrDgsok"
                title="Email Newsletter"
              />
            </div>

            <div className="mt-6 text-xs text-gray-500 text-center flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              We respect your privacy. Unsubscribe at any time.
            </div>
          </div>
        </Reveal>

        {/* Additional Benefits */}
        <Stagger className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          <Tilt max={5}>
            <div className="premium-card p-6 bg-white/60 rounded-2xl border border-gray-100 h-full">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="text-brand-blue w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-gray-900 mb-2 tracking-tight">Expert Tips</h3>
              <p className="text-gray-600 text-sm">Get proven strategies from Vyom&apos;s successful TEF journey</p>
            </div>
          </Tilt>
          <Tilt max={5}>
            <div className="premium-card p-6 bg-white/60 rounded-2xl border border-gray-100 h-full">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-green-600 w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-gray-900 mb-2 tracking-tight">Community Access</h3>
              <p className="text-gray-600 text-sm">Connect with fellow French learners and share experiences</p>
            </div>
          </Tilt>
          <Tilt max={5}>
            <div className="premium-card p-6 bg-white/60 rounded-2xl border border-gray-100 h-full">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="text-purple-600 w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-gray-900 mb-2 tracking-tight">Exclusive Content</h3>
              <p className="text-gray-600 text-sm">Access subscriber-only resources and special offers</p>
            </div>
          </Tilt>
        </Stagger>
      </div>

      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </main>
  );
}
