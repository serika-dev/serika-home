export type ProductBadge = 'soon' | 'beta' | 'dev' | null;

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
  /** Key facts shown as a stat strip. Only published figures. */
  highlights?: { k: string; v: string }[];
  /** Feature tiles. Sourced from the product's own site or README. */
  features?: { title: string; body: string }[];
  /** Whether the homepage should poll /api/status for this product. */
  statusCheck: boolean;
  badge: ProductBadge;
  /**
   * Minimum age: 'all' ages, 16+ or 18+.
   * Defaults to 16 when omitted. Read it via {@link productAge}.
   */
  age?: 'all' | 16 | 18;
  /** Optional note about mature sections within an otherwise 16+ product. */
  ageNote?: string;
  /** Extra links surfaced on the product page. */
  links?: { label: string; href: string }[];
  /** Platforms the product ships on, listed on the product page. */
  platforms?: string[];
  /** Published delivery milestones. Only real, publicly stated ones. */
  roadmap?: { name: string; note: string; done: boolean }[];
  keywords: string[];
}

export const products: Product[] = [
  {
    slug: 'serika-booru',
    wordmark: { main: 'Serika', sub: 'Booru' },
    name: 'Serika Booru',
    url: 'serika.art',
    tagline:
      'A modern Danbooru-style image board. Tag driven search, built to stay out of your way.',
    description: [
      'Serika Booru is a fast, modern image board for browsing, tagging and discovering art at scale. The live index is measured in millions of images, with a tag system inspired by Danbooru and Gelbooru.',
      'Sign in with Serika Accounts, upload with drag and drop, and filter by tags, rating, AI status or date. Artist pages, a tag wiki, votes, favourites and comments are all built in.',
      'A public REST API and personal API keys exist for tools that want to talk to the index. There is a native Android app for browsing on the go, with Material You styling and offline favourites.',
    ],
    highlights: [
      { k: 'Index', v: 'Millions of images, counted live on this site' },
      { k: 'Tags', v: 'Artist, character, copyright, meta' },
      { k: 'Ratings', v: 'Safe, questionable, explicit' },
      { k: 'Auth', v: 'Serika Accounts' },
    ],
    features: [
      {
        title: 'Tag-driven search',
        body: 'Filter by tags, rating, AI status and date. Auto-suggestions and categories keep the query tight.',
      },
      {
        title: 'Artist pages',
        body: 'Dedicated portfolios for artists, plus a community-maintained tag wiki.',
      },
      {
        title: 'AI marked, not mixed in',
        body: 'AI-generated posts are labelled and filterable. The live split is on the homepage.',
      },
      {
        title: 'Public API',
        body: 'REST endpoints for images, tags and artists. Generate a personal API key for your own tools.',
      },
      {
        title: 'Android app',
        body: 'Kotlin and Jetpack Compose. Material You, offline favourites, push notifications.',
      },
      {
        title: 'Upload and moderate',
        body: 'Drag-and-drop upload with thumbnails, votes, favourites, comments, DMCA handling and an admin panel.',
      },
    ],
    statusCheck: true,
    badge: null,
    age: 18,
    links: [
      { label: 'Open serika.art', href: 'https://serika.art' },
      { label: 'Android app', href: 'https://serika.art/android-app' },
      { label: 'API docs', href: 'https://serika.art/api-docs' },
      { label: 'Source (GitHub)', href: 'https://github.com/serika-dev/Serika.art' },
    ],
    keywords: [
      'image board',
      'booru',
      'anime art',
      'tags',
      'gallery',
      'danbooru',
    ],
  },
  {
    slug: 'serikamoe',
    wordmark: { main: 'Serika', sub: 'Moe' },
    name: 'SerikaMoe',
    url: 'serika.moe',
    tagline:
      'A Dutch anime streaming platform building a new home for anime fans in Europe.',
    description: [
      'SerikaMoe is a Dutch anime streaming platform that is just getting started, with the goal of building a real home for anime fans across Europe.',
      'Owned and maintained by the Serika Company and the Schoolsquid Media Foundation. The platform is open source, privacy-first and anti-censorship. You can see how your data is used.',
      'We work directly with subtitle studios, and may start our own, so translations are done properly. Every subtitle is full ASS with styling, because subs should feel like part of the show.',
      '95% of revenue goes to anime creators and licensors. We keep 5% to run the platform.',
    ],
    highlights: [
      { k: 'Split', v: '95% to creators, 5% to run it' },
      { k: 'Subs', v: 'Full ASS, studio-styled' },
      { k: 'Where', v: 'Built in the Netherlands, for Europe' },
      { k: 'Status', v: 'Launching soon' },
    ],
    features: [
      {
        title: 'Subtitles that belong in the frame',
        body: 'Full ASS format with proper styling, made with subtitle studios. Not a plain overlay bolted on top.',
      },
      {
        title: 'Desktop app',
        body: 'Electron and Bun, for Windows, macOS and Linux. QR login, password plus 2FA, tray mode and Discord Rich Presence while you watch.',
      },
      {
        title: 'Living-room clients',
        body: 'Wrapper apps exist for Samsung Tizen TVs and Android TV, so the same account works on a set as on a laptop.',
      },
      {
        title: 'Open, on purpose',
        body: 'Source is public. Privacy-first and anti-censorship, maintained with the Schoolsquid Media Foundation.',
      },
    ],
    statusCheck: false,
    badge: 'soon',
    links: [
      { label: 'YouTube', href: 'https://www.youtube.com/@SerikaMoe' },
      { label: 'X / Twitter', href: 'https://x.com/SerikaMoe' },
      {
        label: 'Desktop app (GitHub)',
        href: 'https://github.com/serika-dev/SerikaStreaming-Desktop',
      },
      {
        label: 'Android TV',
        href: 'https://github.com/serika-dev/SerikaStreaming-AndroidTV',
      },
      {
        label: 'Samsung TV',
        href: 'https://github.com/serika-dev/SerikaStreaming-SamsungTV',
      },
    ],
    platforms: ['Web', 'Windows', 'macOS', 'Linux', 'Android TV', 'Samsung TV'],
    keywords: [
      'anime streaming',
      'watch anime',
      'anime',
      'subtitles',
      'ASS subtitles',
      'Dutch anime',
      'stream anime Europe',
    ],
  },
  {
    slug: 'serika-chat',
    wordmark: { main: 'Serika', sub: '.chat' },
    name: 'Serika.chat',
    url: 'serika.chat',
    tagline:
      'A private, Discord-compatible chat platform. Early release, built in the open.',
    description: [
      'Serika.chat (SerikaCord) is a Discord-compatible chat platform: servers, channels, DMs, voice, bots, the lot. It is in early release, and you own your communities and your data.',
      'The bot gateway and REST API follow Discord v10, so existing bot knowledge transfers. serika.js is the official TypeScript SDK. There is a developer portal, OAuth2, and docs at serika.chat/developers.',
      'Realtime chat uses Server-Sent Events. Voice and video are WebRTC. The default desktop client is Qt6. A Capacitor Android app is in the same tree.',
    ],
    highlights: [
      { k: 'API', v: 'Discord v10 compatible gateway' },
      { k: 'SDK', v: 'serika.js, TypeScript, zero runtime deps' },
      { k: 'Realtime', v: 'SSE chat, WebRTC voice and video' },
      { k: 'Clients', v: 'Web, Qt desktop, Android' },
    ],
    features: [
      {
        title: 'Servers you actually own',
        body: 'Channels, categories, roles, channel overrides, kicks, bans, timeouts, custom emoji and per-server notification mutes.',
      },
      {
        title: 'Chat that is not just text',
        body: '1:1 and group DMs, slash commands, rich embeds, markdown, GIF search, and file uploads up to 500MB on the free tier.',
      },
      {
        title: 'Voice, video, screen share',
        body: 'WebRTC voice channels, video calls and screen sharing. Peer to peer via simple-peer.',
      },
      {
        title: 'A real bot platform',
        body: 'Gateway at wss://api.serika.chat/api/v10/gateway, REST under api.serika.chat, application commands, interactions and a developer portal.',
      },
      {
        title: 'Presence',
        body: 'Custom status, Last.fm now-playing, IGDB game detection, and live "now watching" from SerikaMoe.',
      },
      {
        title: 'serika.js',
        body: 'Official SDK: full endpoint coverage, rate-limit handling, gateway resume, works in Node, Bun, Deno and browsers.',
      },
    ],
    statusCheck: true,
    badge: 'beta',
    platforms: ['Web', 'Windows', 'macOS', 'Linux', 'Android'],
    links: [
      { label: 'Open serika.chat', href: 'https://serika.chat' },
      { label: 'Developer docs', href: 'https://serika.chat/developers/docs/intro' },
      {
        label: 'SerikaCord (GitHub)',
        href: 'https://github.com/serika-dev/SerikaCord',
      },
      {
        label: 'serika.js (GitHub)',
        href: 'https://github.com/serika-dev/serika.js',
      },
      { label: 'Community server', href: 'https://serika.cc/serika' },
      { label: 'Translations', href: 'https://translate.serika.dev' },
    ],
    keywords: [
      'discord alternative',
      'chat',
      'open source chat',
      'private messaging',
      'communities',
      'bots',
    ],
  },
  {
    slug: 'serika-social',
    wordmark: { main: 'Serika', sub: 'Social' },
    name: 'Serika Social',
    url: 'social.serika.dev',
    tagline:
      'An adults-only social VR platform. Pick an avatar, join a world, hang out.',
    description: [
      'Serika Social is an adults-only social VR platform. Pick an avatar, join a world, and hang out with the people in it using spatial voice.',
      'Early access, currently shipping v1.8.2. Sign in with your Serika account. Passwords are never stored here. Worlds are public and openable straight from the site.',
      'Like everything else we build it is free and open source, and it is strictly for users aged 18 or over.',
    ],
    highlights: [
      { k: 'Room size', v: '80 players, AOI and LOD pose updates' },
      { k: 'Version', v: 'Early access v1.8.2' },
      { k: 'VR', v: 'OpenXR on Quest and SteamVR' },
      { k: 'Worlds', v: 'Godot SDK, validate and upload' },
    ],
    features: [
      {
        title: 'Desktop and VR in the same room',
        body: 'WASD and mouse on any screen, full motion in a headset. Same worlds, same friends.',
      },
      {
        title: 'A true VR client',
        body: 'Smooth locomotion, snap turning and hand tracking. Not a flat screen bolted to a headset.',
      },
      {
        title: 'Bandwidth that stays flat',
        body: 'Area-of-interest filtering, LOD pose updates and hand-packed pose codecs, so a full room does not melt your connection.',
      },
      {
        title: 'Worlds you build',
        body: 'Godot editor plugin with CSG, particles and custom lighting. The SDK validates and uploads your scene.',
      },
      {
        title: 'Installers that behave',
        body: 'Windows Setup, Linux .deb and AppImage register the serikasocial:// deep link and update themselves. Quest builds are sideloaded.',
      },
      {
        title: 'Moderation in the instance',
        body: 'Trust levels, moderation tools and instance controls. Friends, blocks, presence and favourites already ship.',
      },
    ],
    statusCheck: true,
    badge: null,
    age: 18,
    platforms: ['Windows', 'macOS', 'Linux', 'Android', 'Meta Quest'],
    roadmap: [
      {
        name: 'Vertical slice',
        note: 'Login, one world, 8 players, UDP relay',
        done: true,
      },
      {
        name: 'Netcode depth',
        note: 'AOI, LOD, bandwidth budget, pose filtering',
        done: true,
      },
      {
        name: 'Voice and VR',
        note: 'OpenXR, spatial audio, voice pipeline',
        done: true,
      },
      {
        name: 'Untrusted content',
        note: 'assetd, scene builder, SerikaScript',
        done: false,
      },
      {
        name: 'SDK',
        note: 'Editor plugin, validator, uploader',
        done: true,
      },
      {
        name: 'P2P',
        note: 'WebRTC, coturn, host qualification',
        done: false,
      },
      {
        name: 'Social and scale',
        note: 'Friends, blocks, presence, favorites',
        done: true,
      },
    ],
    links: [
      { label: 'Download the client', href: 'https://social.serika.dev' },
      {
        label: 'Releases (GitHub)',
        href: 'https://github.com/SerikaSocial/game/releases/latest',
      },
      {
        label: 'Godot SDK',
        href: 'https://github.com/SerikaSocial/godot-sdk',
      },
      { label: 'Explore worlds', href: 'https://social.serika.dev/worlds' },
    ],
    keywords: [
      'social vr',
      'vr chat',
      'avatars',
      'spatial voice',
      'quest',
      'open source vr',
      'metaverse',
    ],
  },
  {
    slug: 'serika-video',
    wordmark: { main: 'Serika', sub: 'Video' },
    name: 'SerikaVideo',
    url: 'serika.video',
    tagline: 'Video sharing and live streaming for the Serika community.',
    description: [
      'SerikaVideo is a video sharing and live streaming platform for creators and the wider Serika community.',
      'It is under less active development right now while the team focuses on the core products. It stays in the ecosystem, on its own domain, and still answers a live status check.',
    ],
    highlights: [
      { k: 'Kind', v: 'Sharing and live streaming' },
      { k: 'Who', v: 'Creators and the Serika community' },
      { k: 'Pace', v: 'Quieter while core products lead' },
      { k: 'Host', v: 'serika.video' },
    ],
    features: [
      {
        title: 'A place for the community to publish',
        body: 'Upload and live-stream without leaving the Serika account system.',
      },
      {
        title: 'Still on the board',
        body: 'Not archived, not deleted. The host is live. Work resumes when the core lineup has the room.',
      },
    ],
    statusCheck: true,
    badge: null,
    keywords: [
      'video sharing',
      'live streaming',
      'creators',
      'video platform',
    ],
  },
  {
    slug: 'serika-ide',
    wordmark: { main: 'Serika', sub: 'IDE' },
    name: 'Serika IDE',
    tagline: 'A focused code editor, prototyped for building on the Serika stack.',
    description: [
      'Serika IDE is a code editor we are prototyping for our own work on the Serika stack.',
      'It is an in-development experiment. We wanted a tighter editor for the services we actually ship, rather than a general-purpose clone of something else. There is no public download yet.',
    ],
    highlights: [
      { k: 'State', v: 'In development' },
      { k: 'For', v: 'Building on the Serika stack' },
      { k: 'Age', v: 'All ages' },
      { k: 'Download', v: 'Not public yet' },
    ],
    features: [
      {
        title: 'Born from our own friction',
        body: 'We kept wanting better tools for Serika services. The editor is that itch, not a product pitch.',
      },
      {
        title: 'Shown on purpose',
        body: 'Learning projects stay visible. If it becomes something you can install, it will land here first.',
      },
    ],
    statusCheck: false,
    badge: 'dev',
    age: 'all',
    keywords: ['code editor', 'IDE', 'developer tools'],
  },
  {
    slug: 'serika-os',
    wordmark: { main: 'Serika', sub: 'OS' },
    name: 'Serika OS',
    tagline: 'An experimental Linux-based operating system.',
    description: [
      'Serika OS is an experimental Linux-based operating system. A learning project, and a playground for what a Serika-flavoured desktop could feel like.',
      'It is not a daily driver and not a distro drop. We keep it listed because the experiment is real, and hiding learning work would be the opposite of how we ship.',
    ],
    highlights: [
      { k: 'Base', v: 'Linux' },
      { k: 'State', v: 'Experimental' },
      { k: 'Age', v: 'All ages' },
      { k: 'Goal', v: 'Learn, then maybe a desktop' },
    ],
    features: [
      {
        title: 'A desktop with our taste',
        body: 'Same tokens, same stubbornness about being open. The interesting question is what that feels like as a machine you sit in front of.',
      },
      {
        title: 'A learning project, listed honestly',
        body: 'Not every repo has to become a platform. This one exists so we can understand the layer under the apps.',
      },
    ],
    statusCheck: false,
    badge: 'dev',
    age: 'all',
    keywords: ['operating system', 'linux distro', 'open source os'],
  },
];

/** The lineup we put the most into, shown as the flagship bento. */
export const topProductSlugs = [
  'serika-booru',
  'serikamoe',
  'serika-chat',
  'serika-social',
];
/** Everything still being built, shown as the card deck. */
export const buildingSlugs = ['serika-video', 'serika-ide', 'serika-os'];

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
