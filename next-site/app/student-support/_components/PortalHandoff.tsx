'use client';

import { useEffect, useState } from 'react';

const PORTAL_URL = 'https://learn.frenchifywithvyom.com/web/';

/**
 * The TagMango portal hands users off to this page with session credentials
 * in the query string (?host=&userId=&refreshToken=). Those must never sit
 * in the address bar, browser history or a copied link, so they are wiped
 * on arrival. Anyone who came in on that handoff gets a clear way back to
 * their classes, since some of them were only trying to reach the portal.
 */
export default function PortalHandoff() {
  const [fromPortal, setFromPortal] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (['refreshToken', 'userId', 'host'].some((k) => params.has(k))) {
      window.history.replaceState(null, '', window.location.pathname);
      setFromPortal(true);
    }
  }, []);

  if (!fromPortal) return null;

  return (
    <div className="border-b border-blue-100 bg-blue-50 px-4 py-3">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
        <p className="text-sm text-gray-700">
          This is the support desk. Looking for your classes instead?
        </p>
        <a
          href={PORTAL_URL}
          target="_top"
          className="inline-flex items-center rounded-full bg-brand-blue px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Open the student portal
        </a>
      </div>
    </div>
  );
}
