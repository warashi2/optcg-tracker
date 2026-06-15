import { NextResponse } from 'next/server';
import { getCachedMatchups } from '@/lib/scraper';

export const runtime = 'nodejs';

export async function GET() {
  const matchups = getCachedMatchups();

  // Build matrix of unique leaders
  const leaderSet = new Set<string>();
  matchups.forEach(m => { leaderSet.add(m.leader); leaderSet.add(m.opponent); });
  const leaders = Array.from(leaderSet);

  return NextResponse.json(
    { matchups, leaders },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  );
}
