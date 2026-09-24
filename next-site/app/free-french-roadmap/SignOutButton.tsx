'use client';

import { useState } from 'react';
import { LogOut } from 'lucide-react';

export default function SignOutButton() {
  const [busy, setBusy] = useState(false);

  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await fetch('/api/french-roadmap/logout/', { method: 'POST' }).catch(() => undefined);
        window.location.assign('/free-french-roadmap/login/');
      }}
      className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 text-[12px] font-bold text-white transition hover:bg-white/10 disabled:opacity-60"
    >
      <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
      {busy ? 'Signing out…' : 'Sign out'}
    </button>
  );
}
