import type { Metadata } from 'next';

import { BackgroundShapes } from './components/BackgroundShapes';
import { Hero } from './components/Hero';
import { ServiceSection } from './components/ServiceSection';

const liveServices = [
  {
    title: 'serika.dev',
    url: 'serika.dev',
    description: 'Our powerful AI platform for developers.',
    brand: { main: 'Serika', sub: 'Dev' },
  },
  {
    title: 'serika.art',
    url: 'serika.art',
    description: 'Community image board platform.',
    brand: { main: 'Serika', sub: 'Booru' },
  },
  {
    title: 'serika.video',
    url: 'serika.video',
    description: 'Video sharing and live streaming platform.',
    brand: { main: 'Serika', sub: 'Video' },
  },
  {
    title: 'serika.app',
    url: 'serika.app',
    description: 'Privacy-focused search engine.',
    brand: { main: 'Serika', sub: 'Search' },
  },
  {
    title: 'serika.lol',
    url: 'serika.lol',
    description: 'Download videos from various platforms.',
    brand: { main: 'Serika', sub: 'Downloader' },
  },
  {
    title: 'Toka',
    url: 'toka.serika.dev',
    description: 'Social media platform for the Serika community.',
    brand: { main: 'Toka' },
  },
  {
    title: 'accounts.serika.dev',
    url: 'accounts.serika.dev',
    description: 'Account management and identity service.',
    brand: { main: 'Serika', sub: 'Accounts' },
  },
];

const inDevelopment = [
  {
    title: 'serika.xyz',
    url: 'serika.xyz',
    description: 'Next-generation web browser.',
    brand: { main: 'Serika', sub: 'Browser' },
  },
  {
    title: 'Serika IDE',
    description: 'Code editor with integrated AI assistance.',
    brand: { main: 'Serika', sub: 'IDE' },
    noLink: true,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <BackgroundShapes />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <main className="w-full max-w-6xl">
          <Hero />
          
          <ServiceSection title="Live Today" services={liveServices} />
          <ServiceSection title="In Active Development" services={inDevelopment} />
        </main>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Home',
  description: 'Serika - Open ecosystem of AI, media, social, identity, and developer services.',
  openGraph: {
    title: 'The Serika Company',
    description: 'Open ecosystem of interconnected services: AI, media, social, identity, and developer experiences.',
    url: 'https://serika.dev',
    siteName: 'Serika',
    images: [
      {
        url: 'https://serika.dev/og-image.png',
        alt: 'Serika — interconnected services',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Serika Company',
    description: 'Open ecosystem of AI, media, social, identity, and developer services.',
  },
};
