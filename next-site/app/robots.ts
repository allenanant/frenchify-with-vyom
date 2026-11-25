import type { MetadataRoute } from 'next';

// /rate is not blocked here on purpose: Google must be able to fetch it to see its
// "X-Robots-Tag: noindex" header. A robots.txt block would hide that header.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin/', '/student-support/staff', '/api/'],
    },
  };
}
