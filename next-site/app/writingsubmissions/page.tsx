import type { Metadata } from 'next';

const PORTAL_URL = 'https://frenchify-writing-practice.vyomfrenchify.chatgpt.site/';

export const metadata: Metadata = {
  title: 'Writing Submissions',
  description: 'TEF and TCF Canada writing practice for eligible Frenchify students.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function WritingSubmissionsPage() {
  return (
    <section className="fixed inset-0 z-[100] h-dvh w-full overflow-hidden bg-[#f7f8fa]">
      <iframe
        allow="clipboard-write"
        className="h-full w-full border-0"
        referrerPolicy="strict-origin-when-cross-origin"
        src={PORTAL_URL}
        title="Frenchify writing submissions portal"
      />
      <noscript>
        <p>
          JavaScript is required to use the writing portal. You can also open it directly at{' '}
          <a href={PORTAL_URL}>{PORTAL_URL}</a>.
        </p>
      </noscript>
    </section>
  );
}
