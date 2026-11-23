import type { Metadata } from 'next';
import { currentUser } from '@/lib/tickets/auth';
import { fetchAnnouncements, fetchWallEntries } from '@/lib/content-admin/content';
import { readSchedule, resolveEncore, resolveWebinar, webinarFormFields } from '@/lib/webinar';
import AdminLogin from './_components/AdminLogin';
import AdminShell from './_components/AdminShell';
import type { WebinarAdminState } from './_components/WebinarTab';

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
      webinar={webinarAdminState()}
      loadError={loadError}
    />
  );
}

/**
 * The form is prefilled with what the site is actually showing, not with the
 * raw file. Those differ the week after a webinar has passed and the date has
 * rolled forward on its own, and the version visitors see is the true one.
 */
function webinarAdminState(): WebinarAdminState {
  const schedule = readSchedule();
  const shown = resolveWebinar(schedule);
  const fields = webinarFormFields(new Date(shown.startsAt));
  const repeat = resolveEncore(schedule);
  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    date: fields.date,
    time: fields.time,
    joinUrl: shown.joinUrl,
    autoRoll: schedule.autoRoll,
    displayDate: shown.displayDate,
    slug: shown.slug,
    linkIsCurrent: Boolean(shown.joinUrl),
    encore: {
      enabled: schedule.encore.enabled,
      weekday: schedule.encore.weekday,
      time: `${pad(schedule.encore.hour)}:${pad(schedule.encore.minute)}`,
      // Prefilled with the link only while it is still the current one, like
      // the main link, so last week's room is not saved forward by accident.
      joinUrl: repeat?.joinUrl ?? '',
      displayDate: repeat?.displayDate ?? '',
      linkIsCurrent: Boolean(repeat?.joinUrl),
    },
  };
}
