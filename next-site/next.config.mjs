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

      // ClassMarker sends A1 assessment takers here after submission. Keep the
      // branded URL stable while HighLevel owns the result and registration page.
      {
        source: '/a1-analysis-test',
        destination: 'https://sites.leadconnectorhq.com/preview/MbosOoc4XVCclQt2tiGh?notrack=true',
        permanent: false,
      },

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

      // ---- Webinar funnel, ported off GoHighLevel ----
      // The GHL funnel's own page names. They are in live Meta ads, WhatsApp
      // sends and confirmation emails already delivered, so they have to land.
      // The live pages are /webinar-form, /thank-you-for-registeration and
      // /waiting-room — the GHL funnel's own paths, spelling and all, so the
      // form's post-submit redirect and every email already sent still land.
      // These are the other names the funnel has answered to over time.
      { source: '/webinar-form-page', destination: '/webinar-form', permanent: true },
      // The GHL registration form's post-submit redirect points here — with
      // GHL's "-page" suffix. Without this line every registrant lands on a 404.
      { source: '/thank-you-for-registeration-page', destination: '/thank-you-for-registeration', permanent: true },
      { source: '/register-webinar', destination: '/webinar-form', permanent: true },
      { source: '/register-webinar-2', destination: '/webinar-form', permanent: true },
      { source: '/webinar-thank-you', destination: '/thank-you-for-registeration', permanent: true },
      { source: '/webinar-thankyou', destination: '/thank-you-for-registeration', permanent: true },
      { source: '/thank-you-webinar', destination: '/thank-you-for-registeration', permanent: true },
      { source: '/thank-you-for-registration', destination: '/thank-you-for-registeration', permanent: true },
      // Every cloned week lived at its own root URL (/webinar-2aug2026,
      // /webinar-12-july-132678-651265-447271). They now all resolve to the
      // one landing page under its dated alias.
      //
      // The slug must start with a digit. redirects() is evaluated before
      // filesystem routes, so an unanchored /webinar-:slug would capture the
      // real /webinar-thank-you and /webinar-form-page pages instead of
      // letting them render.
      { source: '/webinar-:slug(\\d[\\w-]*)', destination: '/webinar/:slug', permanent: false },
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
