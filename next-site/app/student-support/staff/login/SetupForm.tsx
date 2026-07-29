'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { claimFirstAdmin, type FormState } from '@/lib/tickets/actions';
import { field, label, primaryBtn } from '../ui';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={`${primaryBtn} w-full`}>
      {pending ? 'Creating…' : 'Create admin account'}
    </button>
  );
}

export default function SetupForm() {
  const [state, action] = useActionState<FormState, FormData>(claimFirstAdmin, {});

  return (
    <form action={action} className="space-y-4">
      {state.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-800">
          {state.error}
        </p>
      )}
      <div>
        <label className={label} htmlFor="secret">Setup key</label>
        <input id="secret" name="secret" type="password" required autoFocus className={field} />
        <p className="mt-1.5 text-sm text-gray-500">
          The value of <code className="rounded bg-gray-100 px-1 py-0.5">SUPPORT_SETUP_SECRET</code> from the
          Vercel project settings. It stops a stranger claiming the desk before you do.
        </p>
      </div>
      <div>
        <label className={label} htmlFor="name">Your name</label>
        <input id="name" name="name" required className={field} />
      </div>
      <div>
        <label className={label} htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="username" className={field} />
      </div>
      <div>
        <label className={label} htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required minLength={10} autoComplete="new-password" className={field} />
        <p className="mt-1.5 text-[13px] text-gray-500">At least 10 characters.</p>
      </div>
      <Submit />
      <p className="text-[13px] text-gray-500">
        This screen only appears while the desk has no accounts. After this, admins add people from the Team page.
      </p>
    </form>
  );
}
