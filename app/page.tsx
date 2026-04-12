import type { Metadata } from 'next';

import { BackgroundShapes } from './components/BackgroundShapes';
import { Hero } from './components/Hero';
import { ServiceSection } from './components/ServiceSection';
import Link from 'next/link';
import { ArrowRight, Code, Shield } from 'lucide-react';

const liveServices = [
  {
    title: 'serika.dev',
    url: 'serika.dev',
    description: 'Our powerful AI platform for developers.',
    brand: { main: 'Serika', sub: 'Dev' },
    noStatus: false,
  },
  {
    title: 'serika.art',
    url: 'serika.art',
    description: 'Community image board platform.',
    brand: { main: 'Serika', sub: 'Booru' },
    noStatus: false,
  },
  {
    title: 'serika.video',
    url: 'serika.video',
    description: 'Video sharing and live streaming platform.',
    brand: { main: 'Serika', sub: 'Video' },
    noStatus: false,
  },
  {
    title: 'streaming.serika.dev',
    url: 'streaming.serika.dev',
    description: 'Streaming platform for series, films, and creator channels.',
    brand: { main: 'Serika', sub: 'Streaming' },
    noStatus: false,
  },
  {
    title: 'SerikaCord',
    url: 'waifu.ws',
    description: 'Private and open communication platform for teams and communities.',
    brand: { main: 'Serika', sub: ' Chat' },
    noStatus: true,
  },
  {
    title: 'serika.app',
    url: 'serika.app',
    description: 'Privacy-focused search engine.',
    brand: { main: 'Serika', sub: 'Search' },
    noStatus: false,
  },
  {
    title: 'serika.lol',
    url: 'serika.lol',
    description: 'Download videos from various platforms.',
    brand: { main: 'Serika', sub: 'Downloader' },
    noStatus: false,
  },
  {
    title: 'Toka',
    url: 'toka.serika.dev',
    description: 'Social media platform for the Serika community.',
    brand: { main: 'Toka' },
    noStatus: false,
  },
  {
    title: 'accounts.serika.dev',
    url: 'accounts.serika.dev',
    description: 'Account management and identity service.',
    brand: { main: 'Serika', sub: 'Accounts' },
    noStatus: false,
  },
  {
    title: 'Serika Games',
    url: 'gamnes.serika.app',
    description: 'An open source and Privacy first Classic Browser Games Page.',
    brand: { main: 'Serika', sub: 'Games' },
    noStatus: false,
  },
];

const inDevelopment = [
  {
    title: 'serika.xyz',
    url: 'serika.xyz',
    description: 'Next-generation web browser.',
    brand: { main: 'Serika', sub: 'Browser' },
    status: 'development' as const,
    noStatus: true,
  },
  {
    title: 'Serika IDE',
    description: 'Code editor with integrated AI assistance.',
    brand: { main: 'Serika', sub: 'IDE' },
    noLink: true,
    status: 'development' as const,
    noStatus: true,
  },
  {
    title: 'Serika OS',
    description: 'A Linux based Operating System',
    brand: { main: 'Serika', sub: 'OS' },
    noLink: true,
    status: 'development' as const,
    noStatus: true,
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <BackgroundShapes />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20 mt-16">
        <main className="w-full max-w-6xl">
          <Hero />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <Link href="/open-source" className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10 flex flex-col items-start backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Code className="h-8 w-8 text-[#8b5cf6] mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Open Source Initiative</h3>
              <p className="text-gray-400 mb-6 flex-grow">
                Software licensed under the Serika FOSS License. Built for full transparency, attribution, and deployment flexibility.
              </p>
              <div className="flex items-center text-sm font-medium text-white group-hover:text-[#8b5cf6] transition-colors">
                Learn more <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link href="/privacy" className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10 flex flex-col items-start backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Shield className="h-8 w-8 text-emerald-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Privacy & Control</h3>
              <p className="text-gray-400 mb-6 flex-grow">
                Our strict No AI Data Training policy and privacy-first architecture puts control of your data back into your hands.
              </p>
              <div className="flex items-center text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">
                Learn more <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
          
          <ServiceSection title="Live Today" services={liveServices} />
          <ServiceSection title="In Active Development" services={inDevelopment} />
        </main>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Home',
  description: 'Serika builds privacy-first products with a no-AI-data-training policy and self-hosting options across an open software ecosystem.',
  openGraph: {
    title: 'The Serika Company',
    description: 'Corporate-grade privacy, open software, and self-hosting ready services from Serika.',
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
    description: 'Privacy-first and self-hosting ready services from Serika.',
  },
};
