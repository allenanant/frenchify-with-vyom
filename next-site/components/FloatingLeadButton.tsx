'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, X } from 'lucide-react';
import Script from 'next/script';

const HOME_PATHS = new Set(['/', '/home-v2', '/home-v2/']);

export default function FloatingLeadButton() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Home page only: auto-open once after a short delay on desktop, mirroring the prior behavior.
  useEffect(() => {
    if (!HOME_PATHS.has(pathname)) return;
    if (typeof window === 'undefined' || window.innerWidth < 768) return;
    const t = setTimeout(() => setOpen(true), 600);
    return () => clearTimeout(t);
  }, [pathname]);

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
        aria-hidden={open}
        className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[100] inline-flex items-center gap-2 rounded-full bg-brand-gradient text-white px-5 py-3.5 shadow-premium hover:shadow-premium-amber hover:-translate-y-0.5 transition-all duration-300 font-semibold text-sm ${
          open ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <MessageCircle className="w-5 h-5" aria-hidden="true" />
        <span>Get In Touch</span>
      </button>

      <div
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] w-[min(80vw,323px)] max-h-[min(68vh,512px)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 ${
          open
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-[120%] scale-95 pointer-events-none'
        }`}
        role="dialog"
        aria-label="Get in touch"
        aria-hidden={!open}
        {...(!open && { inert: '' })}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close form"
          className="absolute top-2 right-2 z-10 w-[25px] h-[25px] rounded-full bg-white/90 hover:bg-gray-100 flex items-center justify-center text-gray-700 transition-colors"
        >
          <X className="w-[14px] h-[14px]" aria-hidden="true" />
        </button>

        <div className="bg-brand-gradient text-white px-4 pt-3 pb-2.5 shrink-0">
          <h3 className="font-display text-base font-semibold tracking-tight pr-10 leading-tight">
            Contact Us
          </h3>
          <p className="text-white/90 text-[11px] mt-0.5 leading-snug">
            Drop your details &mdash; we&apos;ll get back to you shortly.
          </p>
        </div>

        <div className="px-2 py-1 overflow-y-auto">
          <iframe
            src="https://api.leadconnectorhq.com/widget/form/hNHsUQGDYnwiWeSJKXSe"
            style={{ width: '100%', height: '440px', border: 'none', borderRadius: '3px' }}
            id="inline-hNHsUQGDYnwiWeSJKXSe-floating"
            loading="eager"
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Contact us form"
            data-height="440"
            data-layout-iframe-id="inline-hNHsUQGDYnwiWeSJKXSe-floating"
            data-form-id="hNHsUQGDYnwiWeSJKXSe"
            title="Contact us form"
          />
        </div>
      </div>

      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </>
  );
}
