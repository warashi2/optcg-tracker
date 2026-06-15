import { NextRequest, NextResponse } from 'next/server';
import { getCachedLeaders, getCacheMeta } from '@/lib/scraper';
import { Format } from '@/lib/types';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const format = (searchParams.get('format') || 'OP16') as Format;
  const region = searchParams.get('region') || 'all';

  let leaders = getCachedLeaders(format);

  if (region !== 'all') {
    leaders = leaders.filter(l => l.region === region || l.region === 'all');
  }

  const meta = getCacheMeta();

  return NextResponse.json(
    { leaders, meta, format, region },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  );
}
