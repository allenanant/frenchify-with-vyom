'use client';

import { useEffect } from 'react';

const ASSISTANT_ORIGIN = 'https://calendar.frenchifywithvyom.com';
const TAGMANGO_ORIGIN = 'https://learn.frenchifywithvyom.com';

export default function StudentAssistantPage() {
  useEffect(() => {
    function relayClose(event: MessageEvent) {
      if (event.origin !== ASSISTANT_ORIGIN) return;
      if (event.data?.type !== 'frenchify-assistant:close') return;
      if (window.parent !== window) {
        window.parent.postMessage(event.data, TAGMANGO_ORIGIN);
      }
    }

    window.addEventListener('message', relayClose);
    return () => window.removeEventListener('message', relayClose);
  }, []);

  return (
    <section className="fixed inset-0 z-[100] bg-[#fbf8f3]" aria-label="Frenchify student assistant">
      <iframe
        title="Frenchify student assistant"
        src={`${ASSISTANT_ORIGIN}/student-assistant?embed=1`}
        className="block h-full w-full border-0"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="clipboard-write"
      />
    </section>
  );
}
