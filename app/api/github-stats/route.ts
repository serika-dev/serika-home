import { NextResponse } from 'next/server';

const ORG = 'serika-dev';

/**
 * One hour. Unauthenticated GitHub allows 60 requests per hour per IP, so this
 * has to be cached hard or a busy page will exhaust the quota and start
 * returning nothing.
 */
const TTL = 3600;

export interface GithubStats {
  repos: number;
  stars: number;
  forks: number;
  /** Language name to repo count, largest first. */
  languages: { name: string; count: number }[];
  /** ISO timestamp of the most recent push across every public repo. */
  lastPush: string | null;
  /** ISO timestamp of the oldest public repo. */
  since: string | null;
  /** Most starred repos, largest first. */
  top: { name: string; stars: number; language: string | null }[];
}

interface Repo {
  name: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  created_at: string;
  archived: boolean;
  fork: boolean;
}

/**
 * Public GitHub activity for the org, so "open source" is a measured claim
 * rather than an adjective. Answers `{ ok: false }` on any failure and the UI
 * omits the panel entirely rather than showing zeroes.
 */
export async function GET() {
  try {
    const res = await fetch(
      `https://api.github.com/orgs/${ORG}/repos?per_page=100&type=public`,
      {
        next: { revalidate: TTL },
        signal: AbortSignal.timeout(8000),
        headers: {
          accept: 'application/vnd.github+json',
          'user-agent': 'serika-dev-homepage',
        },
      },
    );
    if (!res.ok) throw new Error(`upstream ${res.status}`);

    const all = (await res.json()) as Repo[];
    if (!Array.isArray(all) || all.length === 0) throw new Error('no repos');

    // Forks of other people's work are not our output.
    const repos = all.filter((r) => !r.fork);

    const counts = new Map<string, number>();
    for (const r of repos) {
      if (!r.language) continue;
      counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
    }

    const stats: GithubStats = {
      repos: repos.length,
      stars: repos.reduce((n, r) => n + (r.stargazers_count ?? 0), 0),
      forks: repos.reduce((n, r) => n + (r.forks_count ?? 0), 0),
      languages: [...counts.entries()]
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
      lastPush:
        repos.map((r) => r.pushed_at).sort().at(-1) ?? null,
      since: repos.map((r) => r.created_at).sort().at(0) ?? null,
      top: [...repos]
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 4)
        .map((r) => ({
          name: r.name,
          stars: r.stargazers_count,
          language: r.language,
        })),
    };

    return NextResponse.json(
      { ok: true, stats },
      {
        headers: {
          'cache-control': `s-maxage=${TTL}, stale-while-revalidate=7200`,
        },
      },
    );
  } catch {
    return NextResponse.json({ ok: false });
  }
}
