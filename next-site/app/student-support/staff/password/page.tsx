import { redirect } from 'next/navigation';
import { currentUser } from '@/lib/tickets/auth';
import PasswordForm from './PasswordForm';

export const dynamic = 'force-dynamic';

export default async function PasswordPage() {
  const user = await currentUser();
  if (!user) redirect('/student-support/staff/login/');

  return (
    <div className="mx-auto w-full max-w-sm">
      <h1 className="font-display text-2xl font-bold tracking-tight text-gray-900">
        {user.must_change ? 'Set your password' : 'Change password'}
      </h1>
      <p className="mb-6 mt-1 text-[15px] text-gray-500">
        {user.must_change
          ? 'You are signed in with a starter password. Pick your own before you continue.'
          : 'Pick something you do not use anywhere else.'}
      </p>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <PasswordForm />
      </div>
    </div>
  );
}
