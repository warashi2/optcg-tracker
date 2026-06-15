export type Tier = 'S' | 'A' | 'B' | 'C';
export type Color = 'red' | 'green' | 'blue' | 'purple' | 'black' | 'yellow' | 'multi';
export type CardType = 'Character' | 'Event' | 'Stage' | 'Leader';
export type Region = 'all' | 'asia' | 'west';
export type Format = 'OP16' | 'OP15' | 'OP14' | 'OP13' | 'OP12';

export interface Leader {
  id: string;
  name: string;
  tier: Tier;
  winRate: number;
  metaShare: number;
  deckCount: number;
  color: Color;
  colors: string[];
  goingFirstWr: number;
  goingSecondWr: number;
  format: Format;
  region: Region;
  imageUrl?: string;
}

export interface CardStat {
  id: string;
  name: string;
  type: CardType;
  color: Color;
  cost: number;
  playRate: number;
  avgCopies: number;
  set: string;
  imageUrl?: string;
}

export interface MatchupEntry {
  leader: string;
  opponent: string;
  winRate: number;
  sampleSize: number;
}

export interface MetaSnapshot {
  format: Format;
  region: Region;
  updatedAt: string;
  totalMatches: number;
  leaders: Leader[];
  topCards: CardStat[];
  matchups: MatchupEntry[];
}
