import { redirect } from 'next/navigation';
import { currentUser } from '@/lib/tickets/auth';
import { isUnclaimed } from '@/lib/tickets/db';
import LoginForm from './LoginForm';
import SetupForm from './SetupForm';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  if (await currentUser()) redirect('/student-support/staff/');
  const unclaimed = await isUnclaimed();

  return (
    <div className="mx-auto w-full max-w-sm pt-[6vh] sm:pt-[10vh]">
      <h1 className="font-display text-2xl font-bold tracking-tight text-gray-900">
        {unclaimed ? 'Set up the support desk' : 'Support desk'}
      </h1>
      <p className="mb-6 mt-1 text-[15px] text-gray-500">
        {unclaimed
          ? 'No accounts yet. Create the first admin to get started.'
          : 'Frenchify with Vyom team sign in.'}
      </p>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        {unclaimed ? <SetupForm /> : <LoginForm />}
      </div>

      {!unclaimed && (
        <p className="mt-4 text-center text-[13px] text-gray-500">
          Locked out? Ask an admin on the team to reset your password.
        </p>
      )}
    </div>
  );
}
