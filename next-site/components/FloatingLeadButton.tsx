'use client';

import { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import Script from 'next/script';

export default function FloatingLeadButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
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

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Quick inquiry"
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[92vh] overflow-y-auto border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close form"
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-gray-100 flex items-center justify-center text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="bg-brand-gradient text-white px-6 pt-6 pb-5">
              <h3 className="font-display text-xl font-semibold tracking-tight">
                Talk to a Frenchify Coach
              </h3>
              <p className="text-white/90 text-sm mt-1">
                Drop your details &mdash; we&apos;ll get back to you with a personalised plan.
              </p>
            </div>

            <div className="p-5 sm:p-6">
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/DqCZ5admvl0tPdrDgsok"
                style={{ width: '100%', height: '430px', border: 'none', borderRadius: '12px' }}
                id="inline-DqCZ5admvl0tPdrDgsok-floating"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Floating Lead Form"
                data-height="430"
                data-layout-iframe-id="inline-DqCZ5admvl0tPdrDgsok-floating"
                data-form-id="DqCZ5admvl0tPdrDgsok"
                title="Quick inquiry form"
              />
            </div>
          </div>
        </div>
      )}

      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </>
  );
}
