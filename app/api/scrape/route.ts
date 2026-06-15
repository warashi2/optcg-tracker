import { NextRequest, NextResponse } from 'next/server';
import { runScrape } from '@/lib/scraper';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  // Protect with secret so only Vercel Cron (or you) can trigger it
  const authHeader = req.headers.get('authorization');
  const secret = process.env.CRON_SECRET;

  if (secret && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const result = await runScrape();
  return NextResponse.json(result, { status: result.success ? 200 : 500 });
}

// Allow GET for easy manual trigger from browser in dev
export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Use POST in production' }, { status: 405 });
  }
  const result = await runScrape();
  return NextResponse.json(result);
}
