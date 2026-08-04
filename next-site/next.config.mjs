/** @type {import('next').NextConfig} */
const isPages = process.env.GITHUB_PAGES === 'true';

// The student support desk uses Server Actions, cookies and dynamic routes,
// none of which survive `output: 'export'`. Rather than let that produce a
// broken build or a silently dead /student-support, say so up front.
if (isPages) {
  throw new Error(
    'GITHUB_PAGES=true builds a static export, which cannot include the student ' +
    'support desk (Server Actions, cookies, dynamic routes). Deploy this app to ' +
    'Vercel, or remove app/student-support and app/api/support before exporting.'
  );
}

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // The courses funnel moved to the selection flow at /courses
      { source: '/programs', destination: '/courses', permanent: true },
      { source: '/course-test', destination: '/courses', permanent: true },
      { source: '/course-test/tef', destination: '/courses/tef', permanent: true },
      { source: '/course-test/tcf', destination: '/courses/tcf', permanent: true },

      // Live URLs on the GoHighLevel site that this app renames. They are
      // indexed and linked from the old nav, so they have to survive the
      // domain cutover rather than 404.
      { source: '/home', destination: '/', permanent: true },
      { source: '/book-online', destination: '/book-a-meet', permanent: true },
      { source: '/faqs-8903', destination: '/faq', permanent: true },
      { source: '/privacypolicy', destination: '/privacy-policy', permanent: true },
      // /immigration has no equivalent here yet — the French-category PR
      // content was never ported. Parked on /courses so the URL still lands
      // somewhere relevant; rebuild the page and drop this line.
      { source: '/immigration', destination: '/courses', permanent: false },
    ];
  },
  experimental: {
    // Three 400 KB screenshots plus the form text exceed the 1 MB default.
    serverActions: { bodySizeLimit: '3mb' },
  },
  output: isPages ? 'export' : undefined,
  basePath: isPages ? '/frenchify-with-vyom' : undefined,
  assetPrefix: isPages ? '/frenchify-with-vyom/' : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'storage.googleapis.com' },
      { protocol: 'https', hostname: 'reputationhub.site' },
      { protocol: 'https', hostname: 'assets.cdn.filesafe.space' },
    ],
  },
};

export default nextConfig;
