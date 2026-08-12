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
      { source: '/webinar-thank-you', destination: '/thank-you-for-registeration', permanent: true },
      { source: '/webinar-thankyou', destination: '/thank-you-for-registeration', permanent: true },
      { source: '/thank-you-webinar', destination: '/thank-you-for-registeration', permanent: true },
      { source: '/thank-you-for-registration', destination: '/thank-you-for-registeration', permanent: true },
      // ---- Every landing page the GHL funnel ever cloned ----
      // "Frenchify Webinar (Sunday)" in GoHighLevel has 46 steps, 40 of them
      // landing pages: one clone per week going back to 24 August 2025. Each
      // kept its own root URL, and those URLs are still sitting in old Meta
      // ads, WhatsApp sends and emails already delivered. Read out of the
      // funnel on 2026-08-13; the six non-LP steps (lead capture, thank you,
      // waiting room, the quiz, the reschedule page and the newer
      // registration page) are deliberately not in this list — they have
      // their own live pages above.
      //
      // All of them land on the evergreen page, not on a dated alias, so a
      // visitor always sees this Sunday's date rather than a page named after
      // a webinar that ran a year ago.
      ...[
        '/register-webinar-2', // "LP 2" in the funnel
        '/webinar-24aug',
        '/webinar-7sept',
        '/webinar-21sept',
        '/webinar-5oct',
        '/webinar-12oct',
        '/webinar-26oct',
        '/webinar-2nov',
        '/webinar-16nov',
        '/webinar-30nov',
        '/webinar-14dec',
        '/webinar-21dec',
        '/webinar-28dec',
        '/webinar-4jan',
        '/webinar-11jan',
        '/webinar-18jan',
        '/webinar-25jan',
        '/webinar-1feb',
        '/lp-7feb', // the one week that was not named /webinar-*
        '/webinar-8feb',
        '/webinar-15feb',
        '/webinar-22feb',
        '/webinar-1mar',
        '/webinar-8mar',
        '/webinar-12-april',
        '/webinar-19-april',
        '/webinar-26-april',
        '/webinar-3-may',
        '/webinar-10-may-251224',
        '/webinar-17-may-567157',
        '/webinar-24-may-683877',
        '/webinar-31-may-692421',
        '/webinar-7-june',
        '/webinar-14-june-452322',
        '/webinar-21-june',
        '/webinar-28-june',
        '/webinar-5-july',
        '/webinar-12-july',
        '/webinar-26-july-2026',
        '/webinar-2aug2026',
      ].map((source) => ({ source, destination: '/sunday-webinar', permanent: false })),

      // Catch-all for any weekly clone URL not in the list above — old ad
      // links carrying GHL's random numeric suffixes, for one
      // (/webinar-12-july-132678-651265-447271). It resolves to the dated
      // alias, which renders the same landing page.
      //
      // The slug must start with a digit. redirects() is evaluated before
      // filesystem routes, so an unanchored /webinar-:slug would capture the
      // real /webinar-thank-you and /webinar-form-page pages instead of
      // letting them render.
      { source: '/webinar-:slug(\\d[\\w-]*)', destination: '/webinar/:slug', permanent: false },
    ];
  },
  async rewrites() {
    return [
      // Keep the Frenchify URL in the browser while HighLevel serves the A1
      // result and registration experience behind it.
      {
        source: '/a1-analysis-test',
        destination: 'https://sites.leadconnectorhq.com/preview/MbosOoc4XVCclQt2tiGh?notrack=true',
      },
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
    // The optimizer used to be off because this app was built for GitHub
    // Pages, and `output: 'export'` cannot run it. That export path now
    // throws at the top of this file and the site is served by Vercel, so
    // leaving it off only meant every image — including the ~90 full-size
    // ones still hosted on the GoHighLevel CDN — was shipped at its original
    // weight, in its original format, at every screen size.
    formats: ['image/avif', 'image/webp'],
    // Marketing images change when someone replaces the file, not on a
    // timer. A 60-second cache (the default) re-runs the transform for
    // almost every visitor.
    minimumCacheTTL: 2678400, // 31 days
    // With the optimizer off this list was inert, so hosts could be added to
    // a page without ever being added here. Switching it on makes the list
    // load-bearing: a next/image pointing at a host that is missing returns
    // 400 and the image disappears. These are every host the pages actually
    // pull an image from today.
    remotePatterns: [
      { protocol: 'https', hostname: 'storage.googleapis.com' },
      { protocol: 'https', hostname: 'reputationhub.site' },
      { protocol: 'https', hostname: 'assets.cdn.filesafe.space' },
      { protocol: 'https', hostname: 'images.leadconnectorhq.com' },
      { protocol: 'https', hostname: 'api.leadconnectorhq.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },
};

export default nextConfig;
