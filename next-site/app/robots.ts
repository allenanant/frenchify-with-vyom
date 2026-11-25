import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/rate', '/rate/', '/admin', '/admin/', '/student-support/staff', '/api/'],
    },
  };
}
