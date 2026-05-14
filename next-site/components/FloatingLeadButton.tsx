'use client';

import { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import Script from 'next/script';

export default function FloatingLeadButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open quick inquiry form"
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 inline-flex items-center gap-2 rounded-full bg-brand-gradient text-white px-5 py-3.5 shadow-premium hover:shadow-premium-amber hover:-translate-y-0.5 transition-all duration-300 font-semibold text-sm"
        >
          <MessageCircle className="w-5 h-5" aria-hidden="true" />
          <span className="hidden sm:inline">Get In Touch</span>
          <span className="sm:hidden">Inquiry</span>
        </button>
      )}

      {open && (
        <div
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[min(80vw,323px)] max-h-[min(68vh,512px)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
          role="dialog"
          aria-label="Get in touch"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close form"
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-gray-100 flex items-center justify-center text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="bg-brand-gradient text-white px-4 pt-3 pb-2.5 shrink-0">
            <h3 className="font-display text-base font-semibold tracking-tight pr-10 leading-tight">
              Talk to a Frenchify Coach
            </h3>
            <p className="text-white/90 text-[11px] mt-0.5 leading-snug">
              Drop your details &mdash; we&apos;ll get back with a personalised plan.
            </p>
          </div>

          <div className="px-2 py-1 overflow-y-auto">
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/38KzdDFiaY6RCYwKLwPX"
              style={{ width: '100%', height: '362px', border: 'none', borderRadius: '3px' }}
              id="inline-38KzdDFiaY6RCYwKLwPX"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Form- Get in touch"
              data-height="452"
              data-layout-iframe-id="inline-38KzdDFiaY6RCYwKLwPX"
              data-form-id="38KzdDFiaY6RCYwKLwPX"
              title="Form- Get in touch"
            />
          </div>
        </div>
      )}

      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </>
  );
}
