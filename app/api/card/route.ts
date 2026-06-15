import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Fetches full card data + image from optcgapi.com
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cardId = searchParams.get('id');
  const set = searchParams.get('set') || 'OP16';
  const page = searchParams.get('page') || '1';
  const q = searchParams.get('q') || '';
  const color = searchParams.get('color') || '';
  const type = searchParams.get('type') || '';

  try {
    if (cardId) {
      // Single card lookup
      const res = await fetch(`https://optcgapi.com/api/sets/card/${cardId}/`, {
        headers: { 'User-Agent': 'optcg-tracker/1.0' },
        next: { revalidate: 86400 },
      });
      if (!res.ok) throw new Error(`API ${res.status}`);
      const data = await res.json();
      return NextResponse.json(data);
    }

    // Set browse — build query string
    const params = new URLSearchParams({ page });
    if (q) params.set('name', q);
    if (color) params.set('color', color);
    if (type) params.set('type', type);

    const setId = set.replace('OP', 'OP-').replace('ST', 'ST-');
    const res = await fetch(`https://optcgapi.com/api/sets/${setId}/?${params}`, {
      headers: { 'User-Agent': 'optcg-tracker/1.0' },
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    });
  } catch (err) {
    // Return mock data if API is down so UI still works
    return NextResponse.json({ cards: MOCK_CARDS, count: MOCK_CARDS.length, error: String(err) });
  }
}

const MOCK_CARDS = [
  { card_id: 'OP16-079', card_name: 'Yamato', card_type: 'Leader', color: 'Black', cost: null, power: 5000, counter: null, rarity: 'L', card_text: 'When a Land of Wano type character is played from your trash, that character gains Rush during this turn.', card_image: null, attribute: 'Strike', set_name: 'The Time of Battle' },
  { card_id: 'OP16-098', card_name: 'Yamato', card_type: 'Character', color: 'Black', cost: 5, power: 6000, counter: 1000, rarity: 'SR', card_text: '[On Play] Draw 1 card and trash 1 card from your hand. [Activate: Main] You may trash this character: Play up to 1 Black Yamato character with a cost of 8 from your trash.', card_image: null, attribute: 'Strike', set_name: 'The Time of Battle' },
  { card_id: 'OP15-118', card_name: 'Enel', card_type: 'Character', color: 'Purple', cost: 6, power: 7000, counter: null, rarity: 'SR', card_text: '[Activate: Main] DON!! -4 (You may return the specified number of DON!! cards from your field to your DON!! deck.): This character gains +2000 Power during this turn.', card_image: null, attribute: 'Special', set_name: 'Adventure on Kamis Island' },
  { card_id: 'OP15-075', card_name: 'El Thor', card_type: 'Event', color: 'Purple', cost: 0, power: null, counter: 2000, rarity: 'C', card_text: '[Counter] Up to 1 of your Leader or Character cards gains +2000 Power during this battle. DON!! -1: K.O. up to 1 of your opponent\'s Characters with a Power of 3000 or less.', card_image: null, attribute: null, set_name: 'Adventure on Kamis Island' },
  { card_id: 'OP16-082', card_name: "Kin'emon", card_type: 'Character', color: 'Black', cost: 3, power: 4000, counter: 1000, rarity: 'R', card_text: "[On Play] Look at 5 cards from the top of your deck; reveal up to 1 [Land of Wano] type card and add it to your hand. Then, place the rest at the bottom of your deck in any order.", card_image: null, attribute: 'Slash', set_name: 'The Time of Battle' },
  { card_id: 'OP16-084', card_name: 'Kouzuki Momonosuke', card_type: 'Character', color: 'Black', cost: 4, power: 5000, counter: 1000, rarity: 'R', card_text: '[Blocker] [On Play] You may play up to 1 Land of Wano type Character card with a cost of 6 or less from your trash, other than Kouzuki Momonosuke.', card_image: null, attribute: 'Special', set_name: 'The Time of Battle' },
  { card_id: 'OP15-078', card_name: 'Mamaragan', card_type: 'Event', color: 'Purple', cost: 0, power: null, counter: 2000, rarity: 'R', card_text: '[Counter] Up to 1 of your Leader or Character cards gains +4000 Power during this battle.', card_image: null, attribute: null, set_name: 'Adventure on Kamis Island' },
  { card_id: 'OP16-091', card_name: 'Nami', card_type: 'Character', color: 'Black', cost: 1, power: 1000, counter: 2000, rarity: 'C', card_text: '[On Play] Look at the top 3 cards of your deck and put them back in any order.', card_image: null, attribute: 'Wisdom', set_name: 'The Time of Battle' },
];
