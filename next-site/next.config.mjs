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
