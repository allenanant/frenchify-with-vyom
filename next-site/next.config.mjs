/** @type {import('next').NextConfig} */
const isPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  reactStrictMode: true,
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
