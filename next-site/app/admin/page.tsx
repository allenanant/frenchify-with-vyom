import type { Metadata } from 'next';
import { currentUser } from '@/lib/tickets/auth';
import { fetchAnnouncements, fetchWallEntries } from '@/lib/content-admin/content';
import AdminLogin from './_components/AdminLogin';
import AdminShell from './_components/AdminShell';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Website Admin · Frenchify with Vyom',
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const user = await currentUser();

  if (!user || user.must_change) {
    return <AdminLogin mustChange={Boolean(user?.must_change)} />;
  }

  let announcements: Awaited<ReturnType<typeof fetchAnnouncements>> = [];
  let wall: Awaited<ReturnType<typeof fetchWallEntries>> = [];
  let loadError: string | null = null;
  try {
    [announcements, wall] = await Promise.all([fetchAnnouncements(), fetchWallEntries()]);
  } catch (e) {
    console.error('[content-admin] load', e);
    loadError =
      e instanceof Error && e.message.includes('GITHUB_CONTENT_TOKEN')
        ? 'The publishing key is missing on the server — tell Allen.'
        : 'Could not load the website content. Refresh to try again.';
  }

  return (
    <AdminShell
      userName={user.name}
      announcements={announcements}
      wall={wall}
      loadError={loadError}
    />
  );
}
