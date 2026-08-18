export type ProductBadge = 'soon' | 'beta' | 'dev' | null;
export type Maker = 'serika' | 'jynx';

export interface Product {
  slug: string;
  /** Wordmark: first part in white, second part in accent purple. */
  wordmark: { main: string; sub?: string };
  /** Full display name for SEO and headings. */
  name: string;
  /** Bare hostname (no protocol) used for links + live status checks. */
  url?: string;
  /** Short one-line summary. */
  tagline: string;
  /** Long-form copy used on the dedicated product page. */
  description: string[];
  /** Whether the homepage should poll /api/status for this product. */
  statusCheck: boolean;
  badge: ProductBadge;
  maker: Maker;
  /**
   * Minimum age: 'all' ages, 16+ or 18+.
   * Defaults to 16 when omitted. Read it via {@link productAge}.
   */
  age?: 'all' | 16 | 18;
  /** Optional note about mature sections within an otherwise 16+ product. */
  ageNote?: string;
  /** Extra links surfaced on the product page. */
  links?: { label: string; href: string }[];
  keywords: string[];
}

export const products: Product[] = [
  {
    slug: 'serika-booru',
    wordmark: { main: 'Serika', sub: 'Booru' },
    name: 'Serika Booru',
    url: 'serika.art',
    tagline: 'A simple, modern image board with 3.5 million images.',
    description: [
      'Serika Booru is a fast, modern image board built for browsing, tagging and discovering art at scale.',
      'With over 3.5 million images indexed and a clean tag-driven search, it is designed to stay out of your way. Just find what you are looking for and go.',
    ],
    statusCheck: true,
    badge: null,
    maker: 'serika',
    age: 18,
    keywords: ['image board', 'booru', 'anime art', 'tags', 'gallery'],
  },
  {
    slug: 'serikamoe',
    wordmark: { main: 'Serika', sub: 'Moe' },
    name: 'SerikaMoe',
    url: 'serika.moe',
    tagline: 'A Dutch anime streaming platform building a new home for anime fans.',
    description: [
      'SerikaMoe is a Dutch anime streaming platform that is just getting started, with the ambitious goal of building a new home for anime fans across Europe.',
      'We are a small team working to create a high quality streaming experience while gradually growing into a real alternative to the well known orange themed anime giant whose name sounds like a sushi roll.',
      'Owned and maintained by the Serika Company & Schoolsquid Media Foundation, we are on a mission to combat censorship and create privacy-first software. Our platform is fully open source: you can see exactly how your data is used.',
      'We work directly with subtitle studios (and may even start our own) to ensure translations are done right. All subtitles are delivered in full ASS format with proper styling, because subtitles should feel like part of the show, not some overlay bolted on top.',
      '95% of all revenue goes directly to anime creators and licensors. We take only 5% to keep the lights on. That is the way it should be.',
    ],
    statusCheck: false,
    badge: 'soon',
    maker: 'serika',
    links: [
      { label: 'YouTube', href: 'https://www.youtube.com/@SerikaMoe' },
      { label: 'X / Twitter', href: 'https://x.com/SerikaMoe' },
    ],
    keywords: ['anime streaming', 'watch anime', 'anime', 'subtitles', 'ASS subtitles', 'Dutch anime', 'stream anime Europe'],
  },
  {
    slug: 'serika-chat',
    wordmark: { main: 'Serika', sub: '.chat' },
    name: 'Serika.chat',
    url: 'serika.chat',
    tagline: 'A private, open source Discord alternative, in early release.',
    description: [
      'Serika.chat is a simple, private and open source Discord alternative, currently in early release with much more to come soon.',
      'Built around real ownership of your communities and your data, it is developed in the open so you can always see exactly how it works.',
    ],
    statusCheck: true,
    badge: 'beta',
    maker: 'serika',
    links: [
      { label: 'SerikaCord (GitHub)', href: 'https://github.com/serika-dev/SerikaCord' },
      { label: 'serika.js (GitHub)', href: 'https://github.com/serika-dev/serika.js' },
      { label: 'Community server', href: 'https://serika.cc/serika' },
    ],
    keywords: ['discord alternative', 'chat', 'open source chat', 'private messaging', 'communities'],
  },
  {
    slug: 'serika-video',
    wordmark: { main: 'Serika', sub: 'Video' },
    name: 'SerikaVideo',
    url: 'serika.video',
    tagline: 'Video sharing and live streaming for the Serika community.',
    description: [
      'SerikaVideo is a video sharing and live streaming platform for creators and the wider Serika community.',
      'It is under less active development right now while the team focuses on the core products, but it remains part of the ecosystem.',
    ],
    statusCheck: true,
    badge: null,
    maker: 'serika',
    keywords: ['video sharing', 'live streaming', 'creators', 'video platform'],
  },
  {
    slug: 'serika-downloader',
    wordmark: { main: 'Serika', sub: 'Downloader' },
    name: 'Serika Downloader',
    url: 'serika.lol',
    tagline: 'Download videos from a wide range of platforms.',
    description: [
      'Serika Downloader lets you grab videos from a wide range of platforms quickly and cleanly.',
      'It is under less active development, but still available to use.',
    ],
    statusCheck: true,
    badge: null,
    maker: 'serika',
    age: 'all',
    keywords: ['video downloader', 'download videos', 'media tools'],
  },
  {
    slug: 'toka',
    wordmark: { main: 'Toka' },
    name: 'Toka',
    url: 'toka.serika.dev',
    tagline: 'A social space for the Serika community.',
    description: [
      'Toka is a social media platform for the Serika community, a place to share, follow and keep up with everyone building and using Serika products.',
      'It is under less active development at the moment.',
    ],
    statusCheck: true,
    badge: null,
    maker: 'serika',
    keywords: ['social media', 'community', 'microblog'],
  },
  {
    slug: 'serika-browser',
    wordmark: { main: 'Serika', sub: 'Browser' },
    name: 'Serika Browser',
    url: 'serika.xyz',
    tagline: 'A next-generation web browser.',
    description: [
      'Serika Browser is an early experiment in building a next-generation web browser from the ground up.',
      'It is very much in development, a project we are using to explore rendering, privacy and what a browser could be.',
    ],
    statusCheck: false,
    badge: 'dev',
    maker: 'serika',
    age: 'all',
    keywords: ['web browser', 'privacy browser', 'open source browser'],
  },
  {
    slug: 'serika-ide',
    wordmark: { main: 'Serika', sub: 'IDE' },
    name: 'Serika IDE',
    tagline: 'A focused code editor for building on the Serika stack.',
    description: [
      'Serika IDE is a code editor we are prototyping for building on the Serika stack.',
      'It is an in-development experiment, born from wanting better tools for our own work.',
    ],
    statusCheck: false,
    badge: 'dev',
    maker: 'serika',
    age: 'all',
    keywords: ['code editor', 'IDE', 'developer tools'],
  },
  {
    slug: 'serika-os',
    wordmark: { main: 'Serika', sub: 'OS' },
    name: 'Serika OS',
    tagline: 'A Linux-based operating system.',
    description: [
      'Serika OS is an experimental Linux-based operating system.',
      'It is a learning project and a playground for exploring what a Serika-flavoured desktop could feel like.',
    ],
    statusCheck: false,
    badge: 'dev',
    maker: 'serika',
    age: 'all',
    keywords: ['operating system', 'linux distro', 'open source os'],
  },
  {
    slug: 'serika-games',
    wordmark: { main: 'Serika', sub: 'Games' },
    name: 'Serika Games',
    url: 'games.serika.app',
    tagline: 'Open source, privacy-first classic browser games.',
    description: [
      'Serika Games is an open source and privacy-first home for classic browser games: no tracking, no nonsense, just play.',
      'It is one of the products made by Jynx within the Serika ecosystem.',
    ],
    statusCheck: true,
    badge: null,
    maker: 'jynx',
    keywords: ['browser games', 'classic games', 'free games', 'privacy games'],
  },
  {
    slug: 'serika-search',
    wordmark: { main: 'Serika', sub: 'Search' },
    name: 'Serika Search',
    url: 'serika.app',
    tagline: 'A privacy-focused search engine.',
    description: [
      'Serika Search is a privacy-focused search engine that keeps your queries yours.',
      'It is one of the products made by Jynx within the Serika ecosystem.',
    ],
    statusCheck: true,
    badge: null,
    maker: 'jynx',
    age: 'all',
    keywords: ['search engine', 'private search', 'privacy search'],
  },
];

/** Ranked lineup shown in the "Top products" chart (base order). */
export const topProductSlugs = ['serika-booru', 'serikamoe', 'serika-chat'];
export const developmentSlugs = ['serika-video', 'serika-downloader', 'toka'];
export const experimentSlugs = ['serika-browser', 'serika-ide', 'serika-os'];
export const jynxSlugs = ['serika-games', 'serika-search'];

/** Minimum age for a product. Defaults to 16+ when not specified. */
export function productAge(p: Product): 'all' | 16 | 18 {
  return p.age ?? 16;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function bySlugs(slugs: string[]): Product[] {
  return slugs
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is Product => Boolean(p));
}
