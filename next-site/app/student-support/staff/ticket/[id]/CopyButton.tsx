'use client';

import { useState } from 'react';

export default function CopyButton({ value }: { value: string }) {
  const [done, setDone] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setDone(true);
          setTimeout(() => setDone(false), 1200);
        } catch {
          /* clipboard blocked, nothing useful to do */
        }
      }}
      className="-my-2 inline-flex min-h-11 items-center rounded px-2 text-sm text-gray-500 underline underline-offset-2 transition hover:text-gray-800"
    >
      {done ? 'copied' : 'copy'}
    </button>
  );
}
