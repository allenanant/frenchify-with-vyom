'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { changePassword, type FormState } from '@/lib/tickets/actions';
import { field, label, primaryBtn } from '../ui';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={`${primaryBtn} w-full`}>
      {pending ? 'Saving…' : 'Save password'}
    </button>
  );
}

export default function PasswordForm() {
  const [state, action] = useActionState<FormState, FormData>(changePassword, {});

  return (
    <form action={action} className="space-y-4">
      {state.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-800">{state.error}</p>
      )}
      <div>
        <label className={label} htmlFor="current">Current password</label>
        <input id="current" name="current" type="password" required autoComplete="current-password" className={field} />
      </div>
      <div>
        <label className={label} htmlFor="next">New password</label>
        <input id="next" name="next" type="password" required minLength={10} autoComplete="new-password" className={field} />
        <p className="mt-1.5 text-[13px] text-gray-500">At least 10 characters.</p>
      </div>
      <div>
        <label className={label} htmlFor="confirm">Repeat new password</label>
        <input id="confirm" name="confirm" type="password" required minLength={10} autoComplete="new-password" className={field} />
      </div>
      <Submit />
    </form>
  );
}
