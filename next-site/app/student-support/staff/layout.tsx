import Link from 'next/link';
import { currentUser } from '@/lib/tickets/auth';
import { signOut } from '@/lib/tickets/actions';

export const metadata = {
  title: 'Support desk - Frenchify',
  robots: { index: false, follow: false },
};

export default async function StaffLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();

  return (
    <div className="min-h-screen bg-gray-50">
      {user && (
        <header className="z-30 border-b border-gray-200 bg-white sm:sticky sm:top-0">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
            <Link href="/student-support/staff" className="font-display text-base font-bold tracking-tight text-gray-900">
              Frenchify <span className="text-brand-blue">Support</span>
            </Link>

            <nav className="ml-auto flex items-center gap-1.5">
              <Link
                href="/student-support/staff"
                className="flex min-h-11 items-center rounded-full bg-blue-50 px-3.5 text-sm font-medium text-brand-blue"
              >
                Tickets
              </Link>
              {user.role === 'admin' && (
                <Link
                  href="/student-support/staff/team"
                  className="flex min-h-11 items-center rounded-full bg-blue-50 px-3.5 text-sm font-medium text-brand-blue"
                >
                  Team
                </Link>
              )}
              <Link
                href="/student-support/staff/password"
                className="hidden max-w-[9rem] truncate px-2 text-sm text-gray-500 sm:block"
              >
                {user.name}
              </Link>
              <form action={signOut}>
                <button
                  type="submit"
                  className="min-h-11 rounded-lg border border-gray-300 px-3 text-sm text-gray-700 transition hover:bg-gray-50"
                >
                  Sign out
                </button>
              </form>
            </nav>
          </div>
        </header>
      )}

      <div className="mx-auto max-w-6xl px-4 py-6 pb-20 sm:px-6 md:py-8">{children}</div>
    </div>
  );
}
