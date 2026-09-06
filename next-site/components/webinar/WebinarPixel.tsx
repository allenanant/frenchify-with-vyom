'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

/** Same dataset as GHL form 3APCQqdqGuJSH8iTWgS1. This is a public ID. */
const PIXEL_ID = '710663761860853';

type PixelWindow = Window & { fbq?: (...args: unknown[]) => void };

// The standard asynchronous Meta bootstrap. Next Script's stable ID runs it
// once per document, including when Next navigates between funnel routes.
// Disable automatic events here: GHL owns the successful SubmitApplication
// event (and its eventID). A thank-you page visit is not a new registration.
const bootstrap = `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('set','autoConfig',false,'${PIXEL_ID}');
// Event Setup Tool rules are separate from autoConfig. This dataset has a
// legacy rule that labels the free thank-you URL as Purchase. Keep this
// installation limited to our explicit events, regardless of those rules.
fbq('optOut','${PIXEL_ID}','ESTRuleEngine');
fbq('init','${PIXEL_ID}');
`;

/** Honour any existing HighLevel advertising-cookie preference. */
function advertisingAllowed(): boolean {
  const cookies = new Map(document.cookie.split(';').map((entry) => {
    const [name, ...value] = entry.trim().split('=');
    return [name, value.join('=')];
  }));
  const preference = cookies.get('cookie-config');
  if (preference === 'essential') return false;
  if (preference === 'custom') {
    return decodeURIComponent(cookies.get('cookie-categories') || '')
      .split(',').map((category) => category.trim()).includes('advertising');
  }
  // The existing site has no consent banner configured. Match GHL's default
  // while preserving explicit opt-outs from its previous hosted funnel.
  return true;
}

export default function WebinarPixel() {
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);
  const [ready, setReady] = useState(false);
  const lastPage = useRef<string | null>(null);

  useEffect(() => {
    const updateConsent = (event?: Event) => {
      try {
        const preference = (event as CustomEvent<{ fb?: string }> | undefined)?.detail?.fb;
        const granted = preference !== 'revoke' && advertisingAllowed();
        (window as PixelWindow).fbq?.('consent', granted ? 'grant' : 'revoke');
        setAllowed(granted);
      } catch {
        setAllowed(false);
      }
    };
    updateConsent();
    window.addEventListener('LCCookieConsentDoneFB', updateConsent);
    return () => window.removeEventListener('LCCookieConsentDoneFB', updateConsent);
  }, []);

  useEffect(() => {
    if (!allowed || !ready || !pathname || lastPage.current === pathname) return;
    const pixel = (window as PixelWindow).fbq;
    if (!pixel) return;
    pixel('trackSingle', PIXEL_ID, 'PageView');
    lastPage.current = pathname;
  }, [allowed, ready, pathname]);

  if (!allowed) return null;
  return (
    <Script id="webinar-meta-pixel" strategy="afterInteractive" onReady={() => setReady(true)}>
      {bootstrap}
    </Script>
  );
}
