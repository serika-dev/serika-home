import { NextResponse } from 'next/server';

/** Serika Booru's public stats endpoint. The only source for these figures. */
const SOURCE = 'https://serika.art/api/v1/stats';

/** Cache window in seconds. The index does not move fast enough to poll harder. */
const TTL = 300;

export interface BooruStats {
  images: number;
  tags: number;
  users: number;
  safe: number;
  questionable: number;
  explicit: number;
  aiGenerated: number;
  nonAi: number;
  uploadsLast24h: number;
}

interface Upstream {
  success?: boolean;
  data?: {
    totals?: { images?: number; tags?: number; users?: number };
    images_by_rating?: {
      safe?: number;
      questionable?: number;
      explicit?: number;
    };
    images_by_type?: { ai_generated?: number; non_ai?: number };
    activity?: { uploads_last_24h?: number };
  };
}

/**
 * Proxies the live Booru figures so the homepage never invents a number and
 * never depends on serika.art being reachable from the visitor's browser.
 *
 * On any failure this answers `{ ok: false }` with a 200 rather than an error
 * status: the caller hides the numbers instead of rendering zeros, and a dead
 * upstream must not surface as a broken page.
 */
export async function GET() {
  try {
    const res = await fetch(SOURCE, {
      next: { revalidate: TTL },
      signal: AbortSignal.timeout(6000),
      headers: { accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`upstream ${res.status}`);

    const json = (await res.json()) as Upstream;
    const d = json.data;
    const images = d?.totals?.images;

    // A payload without a total image count is not worth rendering.
    if (typeof images !== 'number' || images <= 0) {
      throw new Error('malformed payload');
    }

    const stats: BooruStats = {
      images,
      tags: d?.totals?.tags ?? 0,
      users: d?.totals?.users ?? 0,
      safe: d?.images_by_rating?.safe ?? 0,
      questionable: d?.images_by_rating?.questionable ?? 0,
      explicit: d?.images_by_rating?.explicit ?? 0,
      aiGenerated: d?.images_by_type?.ai_generated ?? 0,
      nonAi: d?.images_by_type?.non_ai ?? 0,
      uploadsLast24h: d?.activity?.uploads_last_24h ?? 0,
    };

    return NextResponse.json(
      { ok: true, stats },
      { headers: { 'cache-control': `s-maxage=${TTL}, stale-while-revalidate=600` } },
    );
  } catch {
    return NextResponse.json({ ok: false });
  }
}
