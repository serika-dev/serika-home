import type { Metadata } from 'next';
import { Hero } from './components/home/Hero';
import { Flagship } from './components/home/Flagship';
import { SocialAct } from './components/home/SocialAct';
import { CardDeck } from './components/home/CardDeck';
import { Numbers } from './components/home/Numbers';
import { OpenLedger } from './components/home/OpenLedger';
import { Convergence } from './components/home/Convergence';
import { Footer } from './components/Footer';

export const metadata: Metadata = {
  title: 'Serika, open source software, built out of curiosity',
  description:
    'Serika builds open source software for a freer internet: Serika Social VR, SerikaMoe anime streaming, Serika Booru and Serika.chat. Open by default, built to learn, shipped in public.',
  alternates: { canonical: 'https://serika.dev' },
};

export default function Home() {
  return (
    <>
      <main className="relative z-10">
        <Hero />
        <Flagship />
        <SocialAct />
        <CardDeck />
        <Numbers />
        <OpenLedger />
        <Convergence />
      </main>
      <Footer />
    </>
  );
}
