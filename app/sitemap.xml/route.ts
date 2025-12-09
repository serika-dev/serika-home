export async function GET() {
  const baseUrl = 'https://serika.dev';
  const urls = [
    { loc: '/', priority: 1.0 },
    { loc: '/serika.dev', priority: 0.8 },
    { loc: '/serika.xyz', priority: 0.7 },
    { loc: '/serika.search', priority: 0.7 },
    { loc: '/serika.app', priority: 0.7 },
    { loc: '/serika.art', priority: 0.7 },
    { loc: '/toka', priority: 0.6 },
    { loc: '/accounts', priority: 0.6 },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) =>
      `  <url>\n    <loc>${baseUrl}${u.loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
    )
    .join('\n')}\n</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
