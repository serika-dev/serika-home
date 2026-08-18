import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { Navbar } from './components/Navbar';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  display: 'swap',
});

const SITE = 'https://serika.dev';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Serika, open source software, built out of curiosity',
    template: '%s | Serika',
  },
  description:
    'Serika builds open source software for a freer internet: SerikaMoe anime streaming, Serika Booru, Serika.chat, Serika Search and more. Open by default, built to learn, shipped in public.',
  applicationName: 'Serika',
  keywords: [
    'Serika',
    'Serika Company',
    'anime',
    'watch anime',
    'anime streaming',
    'anime streaming platform',
    'SerikaMoe',
    'Serika Moe',
    'Serika Booru',
    'anime image board',
    'booru',
    'Serika.chat',
    'Discord alternative',
    'Serika Search',
    'private search engine',
    'Serika Games',
    'open source anime',
    'privacy-first software',
    'anti-censorship',
    'ASS subtitles',
    'Dutch anime streaming',
    'anime Europe',
  ],
  authors: [{ name: 'The Serika Company', url: SITE }],
  creator: 'The Serika Company',
  publisher: 'The Serika Company',
  category: 'technology',
  openGraph: {
    title: 'Serika, a new home for anime and the open internet',
    description:
      'Privacy-first, open source ecosystem: SerikaMoe anime streaming, Serika Booru, Serika.chat, Serika Search and more. No AI training on your data.',
    url: SITE,
    siteName: 'Serika',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Serika, a new home for anime and the open internet',
    description:
      'Privacy-first, open source anime streaming, image board, chat & search.',
    site: '@SerikaDev',
    creator: '@SerikaDev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: { canonical: SITE },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  colorScheme: 'dark',
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'The Serika Company',
  alternateName: 'Serika',
  url: SITE,
  logo: `${SITE}/favicon.png`,
  description:
    'Serika builds open source software for a freer internet: anime streaming, image boards, chat, search and developer tools.',
  sameAs: [
    'https://x.com/SerikaDev',
    'https://x.com/SerikaMoe',
    'https://www.youtube.com/@SerikaDev',
    'https://www.youtube.com/@SerikaMoe',
    'https://discord.gg/F3Dxp2DsWj',
    'https://github.com/serika-dev',
  ],
  brand: [
    { '@type': 'Brand', name: 'SerikaMoe' },
    { '@type': 'Brand', name: 'Serika Booru' },
    { '@type': 'Brand', name: 'Serika.chat' },
    { '@type': 'Brand', name: 'Serika Search' },
  ],
};

const siteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Serika',
  url: SITE,
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://serika.art/?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable} antialiased`}
      >
        <Script
          id="ld-org"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Script
          id="ld-site"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <Navbar />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
