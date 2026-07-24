import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://serika.dev/sitemap.xml',
    host: 'https://serika.dev',
  };
}
