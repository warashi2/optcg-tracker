import { Leader, CardStat, MatchupEntry } from './types';

export const SEED_LEADERS: Leader[] = [
  { id:'OP15-058', name:'Purple Enel',           tier:'S', winRate:61.0, metaShare:3.2,  deckCount:7,  color:'purple', colors:['purple'], goingFirstWr:59.2, goingSecondWr:62.8, format:'OP16', region:'all' },
  { id:'OP16-041', name:'Blue/Yellow Blackbeard', tier:'S', winRate:61.8, metaShare:19.8, deckCount:1,  color:'multi',  colors:['blue','yellow'], goingFirstWr:45.1, goingSecondWr:61.8, format:'OP16', region:'all' },
  { id:'OP16-079', name:'Black Yamato',           tier:'S', winRate:58.3, metaShare:15.1, deckCount:1,  color:'black',  colors:['black'], goingFirstWr:57.0, goingSecondWr:59.6, format:'OP16', region:'all' },
  { id:'OP16-022', name:'Green/Blue Luffy',       tier:'S', winRate:55.8, metaShare:15.1, deckCount:2,  color:'multi',  colors:['green','blue'], goingFirstWr:54.1, goingSecondWr:57.5, format:'OP16', region:'all' },
  { id:'OP14-060', name:'Blue/Yellow Nami',       tier:'A', winRate:54.9, metaShare:13.0, deckCount:2,  color:'multi',  colors:['blue','yellow'], goingFirstWr:53.2, goingSecondWr:56.6, format:'OP16', region:'all' },
  { id:'OP16-060', name:'Red Donq. Rosinante',    tier:'A', winRate:53.1, metaShare:4.1,  deckCount:2,  color:'red',    colors:['red'], goingFirstWr:51.8, goingSecondWr:54.4, format:'OP16', region:'all' },
  { id:'OP16-099', name:'Purple/Yellow Rosinante',tier:'B', winRate:57.6, metaShare:6.0,  deckCount:1,  color:'multi',  colors:['purple','yellow'], goingFirstWr:56.1, goingSecondWr:59.1, format:'OP16', region:'all' },
  { id:'OP14-001', name:'Red Shanks',             tier:'B', winRate:50.5, metaShare:12.0, deckCount:1,  color:'red',    colors:['red'], goingFirstWr:49.0, goingSecondWr:52.0, format:'OP16', region:'all' },
  { id:'OP15-091', name:'Yellow Kalgara',         tier:'C', winRate:46.8, metaShare:5.0,  deckCount:1,  color:'yellow', colors:['yellow'], goingFirstWr:45.5, goingSecondWr:48.1, format:'OP16', region:'all' },
  { id:'OP16-001', name:'Red/Blue Ace',           tier:'C', winRate:51.6, metaShare:5.0,  deckCount:1,  color:'multi',  colors:['red','blue'], goingFirstWr:50.2, goingSecondWr:53.0, format:'OP16', region:'all' },
  { id:'OP15-001', name:'Red/Green Luffy',        tier:'C', winRate:46.3, metaShare:3.0,  deckCount:1,  color:'multi',  colors:['red','green'], goingFirstWr:45.1, goingSecondWr:47.5, format:'OP16', region:'all' },
  { id:'OP14-090', name:'Yellow Egghead Luffy',   tier:'C', winRate:46.3, metaShare:2.0,  deckCount:1,  color:'yellow', colors:['yellow'], goingFirstWr:45.0, goingSecondWr:47.6, format:'OP16', region:'all' },
  { id:'OP14-075', name:'Yellow Boa Hancock',     tier:'C', winRate:47.6, metaShare:1.0,  deckCount:1,  color:'yellow', colors:['yellow'], goingFirstWr:46.3, goingSecondWr:48.9, format:'OP16', region:'all' },
  { id:'OP16-060b',name:'Purple Sengoku',         tier:'C', winRate:47.5, metaShare:1.0,  deckCount:1,  color:'purple', colors:['purple'], goingFirstWr:46.2, goingSecondWr:48.8, format:'OP16', region:'all' },
  { id:'OP14-048', name:'Green Zoro and Sanji',   tier:'C', winRate:46.0, metaShare:0.5,  deckCount:1,  color:'green',  colors:['green'], goingFirstWr:44.8, goingSecondWr:47.2, format:'OP16', region:'all' },
  { id:'OP16-001b',name:'Red Ace',                tier:'C', winRate:46.3, metaShare:0.4,  deckCount:1,  color:'red',    colors:['red'], goingFirstWr:45.0, goingSecondWr:47.6, format:'OP16', region:'all' },
  { id:'OP14-040', name:'Blue Lucy',              tier:'C', winRate:46.0, metaShare:0.3,  deckCount:1,  color:'blue',   colors:['blue'], goingFirstWr:44.7, goingSecondWr:47.3, format:'OP16', region:'all' },
  { id:'OP16-041b',name:'Black/Yellow Blackbeard',tier:'C', winRate:49.2, metaShare:0.1,  deckCount:1,  color:'multi',  colors:['black','yellow'], goingFirstWr:47.9, goingSecondWr:50.5, format:'OP16', region:'all' },
];

export const SEED_CARDS: CardStat[] = [
  { id:'OP15-118', name:'Enel',                      type:'Character', color:'purple', cost:6, playRate:97, avgCopies:4, set:'OP15' },
  { id:'OP15-075', name:'El Thor',                   type:'Event',     color:'purple', cost:0, playRate:95, avgCopies:4, set:'OP15' },
  { id:'OP15-078', name:'Mamaragan',                 type:'Event',     color:'purple', cost:0, playRate:94, avgCopies:4, set:'OP15' },
  { id:'OP15-076', name:'Lightning Beast Kiten',     type:'Event',     color:'purple', cost:0, playRate:92, avgCopies:4, set:'OP15' },
  { id:'OP15-077', name:'Lightning Dragon',          type:'Event',     color:'purple', cost:0, playRate:91, avgCopies:4, set:'OP15' },
  { id:'OP16-082', name:"Kin'emon",                  type:'Character', color:'black',  cost:3, playRate:90, avgCopies:4, set:'OP16' },
  { id:'OP15-061', name:'Ohm',                       type:'Character', color:'purple', cost:3, playRate:88, avgCopies:4, set:'OP15' },
  { id:'OP15-067', name:'Shura',                     type:'Character', color:'purple', cost:4, playRate:87, avgCopies:4, set:'OP15' },
  { id:'OP16-099', name:"I've Come Here To Cut Those Chains!", type:'Event', color:'black', cost:0, playRate:85, avgCopies:4, set:'OP16' },
  { id:'OP12-071', name:'Charlotte Pudding',         type:'Character', color:'purple', cost:1, playRate:84, avgCopies:4, set:'OP12' },
  { id:'OP16-098', name:'Yamato (SR)',               type:'Character', color:'black',  cost:5, playRate:83, avgCopies:4, set:'OP16' },
  { id:'OP16-084', name:'Kouzuki Momonosuke',        type:'Character', color:'black',  cost:4, playRate:82, avgCopies:4, set:'OP16' },
  { id:'OP16-091', name:'Nami',                      type:'Character', color:'black',  cost:1, playRate:80, avgCopies:4, set:'OP16' },
  { id:'OP10-067', name:'Senor Pink',                type:'Character', color:'purple', cost:5, playRate:79, avgCopies:2, set:'OP10' },
  { id:'OP15-071', name:'Holly',                     type:'Character', color:'purple', cost:2, playRate:75, avgCopies:3, set:'OP15' },
  { id:'OP12-063', name:'Vinsmoke Reiju',            type:'Character', color:'purple', cost:3, playRate:72, avgCopies:3, set:'OP12' },
  { id:'OP16-085', name:'Kouzuki Momonosuke (alt)',  type:'Character', color:'black',  cost:6, playRate:70, avgCopies:4, set:'OP16' },
  { id:'OP16-092', name:'Nico Robin',                type:'Character', color:'black',  cost:2, playRate:68, avgCopies:4, set:'OP16' },
  { id:'OP15-074', name:'Satori',                    type:'Character', color:'purple', cost:2, playRate:65, avgCopies:1, set:'OP15' },
  { id:'OP16-097', name:'Yamato (cost 8)',           type:'Character', color:'black',  cost:8, playRate:62, avgCopies:4, set:'OP16' },
];

export const SEED_MATCHUPS: MatchupEntry[] = [
  // Purple Enel
  { leader:'Purple Enel',           opponent:'Blue/Yellow Blackbeard', winRate:55, sampleSize:2400 },
  { leader:'Purple Enel',           opponent:'Black Yamato',           winRate:51, sampleSize:1800 },
  { leader:'Purple Enel',           opponent:'Green/Blue Luffy',       winRate:58, sampleSize:1600 },
  { leader:'Purple Enel',           opponent:'Blue/Yellow Nami',       winRate:68, sampleSize:1200 },
  { leader:'Purple Enel',           opponent:'Purple/Yellow Rosinante',winRate:62, sampleSize:900 },
  // YB Blackbeard
  { leader:'Blue/Yellow Blackbeard',opponent:'Purple Enel',           winRate:45, sampleSize:2400 },
  { leader:'Blue/Yellow Blackbeard',opponent:'Black Yamato',          winRate:53, sampleSize:2100 },
  { leader:'Blue/Yellow Blackbeard',opponent:'Green/Blue Luffy',      winRate:52, sampleSize:1900 },
  { leader:'Blue/Yellow Blackbeard',opponent:'Blue/Yellow Nami',      winRate:58, sampleSize:1500 },
  { leader:'Blue/Yellow Blackbeard',opponent:'Purple/Yellow Rosinante',winRate:36, sampleSize:800 },
  // Black Yamato
  { leader:'Black Yamato',          opponent:'Purple Enel',           winRate:49, sampleSize:1800 },
  { leader:'Black Yamato',          opponent:'Blue/Yellow Blackbeard',winRate:47, sampleSize:2100 },
  { leader:'Black Yamato',          opponent:'Green/Blue Luffy',      winRate:54, sampleSize:1400 },
  { leader:'Black Yamato',          opponent:'Blue/Yellow Nami',      winRate:61, sampleSize:1100 },
  { leader:'Black Yamato',          opponent:'Purple/Yellow Rosinante',winRate:55, sampleSize:700 },
  // GB Luffy
  { leader:'Green/Blue Luffy',      opponent:'Purple Enel',           winRate:42, sampleSize:1600 },
  { leader:'Green/Blue Luffy',      opponent:'Blue/Yellow Blackbeard',winRate:48, sampleSize:1900 },
  { leader:'Green/Blue Luffy',      opponent:'Black Yamato',          winRate:46, sampleSize:1400 },
  { leader:'Green/Blue Luffy',      opponent:'Blue/Yellow Nami',      winRate:53, sampleSize:1000 },
  { leader:'Green/Blue Luffy',      opponent:'Purple/Yellow Rosinante',winRate:47, sampleSize:650 },
  // PY Rosinante
  { leader:'Purple/Yellow Rosinante',opponent:'Purple Enel',          winRate:38, sampleSize:900 },
  { leader:'Purple/Yellow Rosinante',opponent:'Blue/Yellow Blackbeard',winRate:64, sampleSize:800 },
  { leader:'Purple/Yellow Rosinante',opponent:'Black Yamato',         winRate:45, sampleSize:700 },
  { leader:'Purple/Yellow Rosinante',opponent:'Green/Blue Luffy',     winRate:53, sampleSize:650 },
  { leader:'Purple/Yellow Rosinante',opponent:'Blue/Yellow Nami',     winRate:57, sampleSize:500 },
];
