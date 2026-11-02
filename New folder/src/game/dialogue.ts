import { KENS, TONE_ICON, TONE_LINES, rosanStage, type Tone } from './kens';

export interface Fx {
  morale?: number;
  points?: number;
  gems?: number;
  lore?: boolean;
  jealous?: boolean;
  clearRaag?: boolean;
  cutscene?: 'dance' | 'love';
  minutes?: number;
  emote?: 'heart' | 'anger' | 'question';
  unlock?: boolean;
}
export interface Opt { label: string; next?: string | null; fx?: Fx; reply?: string; locked?: boolean }
export interface Node { text: string; opts: Opt[] }
export type Graph = Record<string, Node>;

export interface DlgCtx {
  morale: number;
  raag: boolean;
  rivalName: string | null;
  danced: boolean;
  loveSeen: boolean;
}

const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
const shuffle = <T,>(a: T[]) => a.map((v) => [Math.random(), v] as const).sort((x, y) => x[0] - y[0]).map((x) => x[1]);

function toneOpts(i: number, next: string | null): Opt[] {
  const k = KENS[i];
  const tones = shuffle(['flirty', 'witty', 'sweet', 'bold'] as Tone[]).slice(0, 3);
  return tones.map((t) => {
    const liked = t === k.likes;
    const hated = t === k.hates;
    return {
      label: `${TONE_ICON[t]} ${pick(TONE_LINES[t])}`,
      next,
      reply: liked ? `${k.name} lights up. "${k.good}"` : hated ? `${k.name} winces. "${k.bad}"` : `${k.name} grins. "Ha! Alright, I see you, Barbie."`,
      fx: liked ? { morale: 1, points: 1.5, emote: 'heart' } : hated ? { morale: -1, points: 0.4, emote: 'anger' } : { morale: 0.5, points: 1, emote: 'heart' },
    } as Opt;
  });
}

export function buildKenGraph(i: number, c: DlgCtx): Graph {
  if (i === 19) return buildRosan(c);
  const k = KENS[i];
  const g: Graph = {};
  const rootOpts: Opt[] = [{ label: '💬 Chat about your day', next: 'q1' }];
  rootOpts.push(
    c.morale >= 3
      ? { label: '📖 "Tell me your story..."', reply: `${k.name} gets quiet. "${k.lore}"`, fx: { lore: true, morale: 0.5, gems: 10 + k.tier * 4 } }
      : { label: '📖 "Tell me your story..." (needs ♥3)', reply: `${k.name} laughs it off. "Maybe when I know you better, Barbie."`, fx: {} },
  );
  if (c.rivalName) rootOpts.push({ label: `😏 "${c.rivalName} says hi..." (jealousy!)`, reply: `${k.name}'s eye twitches. "Oh. ${c.rivalName}. Great. Cool. I'm FINE." He tries way harder now.`, fx: { jealous: true, morale: -1, points: 2, emote: 'anger' } });
  if (c.raag) rootOpts.push({ label: '💐 "I\'m sorry. Let me make it up to you."', reply: `${k.name} sighs and uncrosses his arms. "...Okay. I forgive you. Raag over."`, fx: { clearRaag: true, morale: 1, minutes: 10, emote: 'heart' } });
  rootOpts.push({ label: '👋 Goodbye', next: null });
  g.root = {
    text: c.raag ? `${k.name} turns away with a >_< face. "I'm not talking to you. Not after that goodnight kiss refusal."` : c.morale >= 8 ? `${k.name} beams. "Barbie! You're my favourite part of the day." ${k.greet}` : k.greet,
    opts: rootOpts,
  };
  g.q1 = { text: k.q, opts: toneOpts(i, 'q2') };
  g.q2 = { text: `${k.name} steps closer. "So... what do you think we are, Barbie?"`, opts: toneOpts(i, null) };
  return g;
}

function buildRosan(c: DlgCtx): Graph {
  const st = rosanStage(c.morale);
  const text =
    c.raag ? 'Rosan lowers his glasses of champagne. "Barbie. I computed every outcome. Refusing me was the only one I didn\'t plan for."'
      : st === 0 ? '"Barbie. I was hoping the elevator would bring you. The skyline\'s been boring without you."'
        : st === 1 ? '"You\'re back. I\'ve started leaving a second glass out. Statistically, that\'s called hope."'
          : '"There you are. The city can wait. Everything can wait."';
  const o: Opt[] = [];
  o.push({ label: '✨ "Flawless, huh? What\'s the secret?"', reply: 'Rosan smiles. "Skincare, sleep, and an absurd amount of self-awareness. Mostly the self-awareness."', fx: { morale: 1, points: 1.5, emote: 'heart' } });
  if (c.morale < 7) o.push({ label: '🧠 "Teach me something clever."', reply: 'Rosan: "Rule one of negotiation: the loudest person in the room is rarely the strongest. Rule two: look at the stars once a day. It resets your priorities."', fx: { morale: 1, points: 1.5, emote: 'heart' } });
  o.push({ label: '🌃 "What\'s the view like up here?"', reply: 'Rosan: "Like the whole city is a circuit board... and you\'re the one component I can\'t model."', fx: { morale: 0.5, points: 1, emote: 'heart' } });
  if (c.morale >= 5) o.push({ label: '💭 "Tell me something real."', reply: 'Rosan: "I memorised the city skyline so I\'d never feel lost. Then I found you, and I stopped needing the map."', fx: { lore: true, morale: 1, points: 2, emote: 'heart' } });
  if (c.morale >= 7) o.push(c.danced ? { label: '💃 "Dance with me?" (already danced today)', reply: 'Rosan: "Tomorrow, darling. I like to leave the skyline wanting more."', fx: {}, locked: false } : { label: '💃 "Dance with me under the stars."', reply: 'Rosan offers his hand. "I was hoping you\'d ask."', fx: { cutscene: 'dance', morale: 1, points: 3, emote: 'heart' } });
  if (c.morale >= 10 && !c.loveSeen) o.push({ label: '💍 "Tell me what you really feel."', reply: 'Rosan\'s aura flickers pink. "Come with me. Look at the sky."', fx: { cutscene: 'love', points: 10, emote: 'heart' } });
  if (c.raag) o.push({ label: '💐 "I\'m sorry. Let me make it up to you."', reply: 'Rosan: "Apology accepted. Data shows I\'m weak to sincerity."', fx: { clearRaag: true, morale: 1, minutes: 10, emote: 'heart' } });
  o.push({ label: '👋 Goodbye', next: null });
  return { root: { text, opts: o } };
}
