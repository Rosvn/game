import type { StatKey } from './items';

export type RoomId = 'bedroom' | 'town' | 'beach' | 'club' | 'penthouse';
export type Tone = 'flirty' | 'witty' | 'sweet' | 'bold';

export interface KenLook {
  skin: string;
  skinShade: string;
  hair: { style: string; color: string; shade?: string };
  top: { style: string; a: string; b?: string; c?: string };
  pants: { style: 'long' | 'shorts'; color: string };
  shoes: string;
  acc: string[];
}

export interface KenDef {
  id: number;
  name: string;
  title: string;
  tier: number;
  cost: number;
  mult: number;
  look: KenLook;
  schedule: [RoomId, RoomId, RoomId];
  likes: Tone;
  hates: Tone | null;
  want: { stat: StatKey; min: number };
  greet: string;
  q: string;
  good: string;
  bad: string;
  lore: string;
  bio: string;
  voice: number; // blip pitch
}

const COSTS = [0, 40, 100, 200, 340, 520, 760, 1100, 1500, 2000, 2600, 3300, 4100, 5000, 6000, 7200, 8600, 10000, 12000, 0];
export const ROSAN_GEM_REQ = 10000;
export const ROSAN_GLAM_REQ = 100;

type Spec = Omit<KenDef, 'id' | 'tier' | 'cost' | 'mult'>;

const SPECS: Spec[] = [
  {
    name: 'Clueless Ken', title: 'The Sweet Starter', voice: 520,
    look: { skin: '#8c5a3a', skinShade: '#6e432a', hair: { style: 'short', color: '#1c1410' }, top: { style: 'tee', a: '#4a7ac8', b: '#3a62a8' }, pants: { style: 'long', color: '#3a4a6a' }, shoes: '#f4f4f4', acc: [] },
    schedule: ['town', 'town', 'town'], likes: 'flirty', hates: null, want: { stat: 'glam', min: 5 },
    bio: 'Easily impressed by simple outfits. Gives a small daily reward multiplier.',
    greet: "Oh! Hi Barbie! Wait... are we dating? Did I forget? I forget stuff.",
    q: "Barbie, is it normal that my shoes are on my feet? I feel like I've been wearing them wrong my whole life.",
    good: "Wow!! That's the smartest thing anyone has ever said to me. I wrote it on my hand!",
    bad: "Oh... I think I got sad. Or hungry? Hungry-sad.",
    lore: "I was found in a box labeled 'one size fits most.' I've been confused ever since.",
  },
  {
    name: 'Skater Ken', title: 'Kickflip Charmer', voice: 600,
    look: { skin: '#e8b890', skinShade: '#c8946a', hair: { style: 'beanie', color: '#e0455a' }, top: { style: 'hoodie', a: '#2c2c3c', b: '#4a4a5c' }, pants: { style: 'long', color: '#6c6c7c' }, shoes: '#e8e8e8', acc: [] },
    schedule: ['town', 'town', 'club'], likes: 'bold', hates: 'sweet', want: { stat: 'glam', min: 10 },
    bio: 'Skates everywhere. Respects confidence over cleverness.',
    greet: "Sup, Barbie. Wanna watch me land a trick? Fair warning: I never land it.",
    q: "Dude, would you rather ollie over a fountain or a police car? Asking for a friend. The friend is me.",
    good: "SICK. You're basically a sponsor now. Free stickers for life.",
    bad: "Harsh. That's a faceplant of a response.",
    lore: "I broke my arm once doing a trick off my own roof. I told everyone it was a bear.",
  },
  {
    name: 'Barista Ken', title: 'Latte Art Romantic', voice: 560,
    look: { skin: '#f0c8a0', skinShade: '#cf9f78', hair: { style: 'short', color: '#7a4a2a' }, top: { style: 'apron', a: '#f4f0e6', b: '#8a5a3a' }, pants: { style: 'long', color: '#3a3a44' }, shoes: '#5a3a24', acc: [] },
    schedule: ['town', 'town', 'town'], likes: 'sweet', hates: 'bold', want: { stat: 'elegance', min: 14 },
    bio: 'Draws hearts in your foam. Appreciates a tasteful, elegant look.',
    greet: "Welcome! The usual? Vanilla oat latte with extra Barbie?",
    q: "I drew a heart in your foam but it looks like a pelican. Thoughts?",
    good: "A pelican-heart! I'm calling it art. Free muffin, forever.",
    bad: "Oh. Right. Back to the espresso machine of loneliness.",
    lore: "I trained in Paris for one week. Mostly I learned to say 'oui' to croissants.",
  },
  {
    name: 'Surfer Ken', title: 'Sunset Wave Rider', voice: 640,
    look: { skin: '#e0a870', skinShade: '#bc8450', hair: { style: 'long', color: '#f0d060' }, top: { style: 'shirtless', a: '#e0a870' }, pants: { style: 'shorts', color: '#2ec4c4' }, shoes: '#00000000', acc: ['sash:#ff8a3c'] },
    schedule: ['beach', 'beach', 'beach'], likes: 'flirty', hates: 'witty', want: { stat: 'beach', min: 22 },
    bio: 'Lives at the beach. Wants serious BeachVibe from your look.',
    greet: "Duuude, Barbie! The waves are gnarly and so are you. In a good way. Mostly.",
    q: "If a wave and a sunset had a baby, would it be you? Or like... a rainbow? I lost my train of thought.",
    good: "Totally tubular. You just out-surfed my brain. Respect.",
    bad: "Bummer, dudette. That vibe is a little... low tide.",
    lore: "I once surfed a wave for fourteen minutes. Fell off because I got emotional about a dolphin.",
  },
  {
    name: 'Gym Bro Ken', title: 'Protein Prince', voice: 380,
    look: { skin: '#c88c5a', skinShade: '#a46c3c', hair: { style: 'short', color: '#3a2a1a' }, top: { style: 'tank', a: '#ff6a3a' }, pants: { style: 'shorts', color: '#22222c' }, shoes: '#f4f4f4', acc: ['band'] },
    schedule: ['town', 'beach', 'club'], likes: 'bold', hates: 'witty', want: { stat: 'beach', min: 28 },
    bio: 'Counts reps, not feelings. Loves a beachy, athletic outfit.',
    greet: "Barbie! You lift? No? I'll lift. You cheer. Deal?",
    q: "Quick: protein shake, or a second protein shake?",
    good: "SECOND SHAKE. You get me. Marry me. Or spot me. Either.",
    bad: "Skipping leg day AND my feelings? Rough.",
    lore: "I named all my dumbbells. Gary is the twenty pounder. He's my best friend.",
  },
  {
    name: 'Preppy Ken', title: 'Yacht Club Heir', voice: 620,
    look: { skin: '#f6d6b8', skinShade: '#d6b090', hair: { style: 'slick', color: '#a87a3a' }, top: { style: 'polo', a: '#f4f0e6', b: '#8ad0f0' }, pants: { style: 'long', color: '#e8d8a8' }, shoes: '#6a4a2a', acc: ['sweater:#8ad0f0'] },
    schedule: ['town', 'beach', 'town'], likes: 'sweet', hates: 'bold', want: { stat: 'elegance', min: 30 },
    bio: 'Sweater tied over his shoulders. Expects polish.',
    greet: "Barbie! My yacht club said I should 'be myself.' So here I am. Preppy as ever.",
    q: "Lacrosse or tennis this weekend? Or my third option: both, while sipping lemonade?",
    good: "Splendid! Mother will adore you. Father will adore your shoes.",
    bad: "Oh dear. That's... not very Hamptons of you.",
    lore: "I've never actually seen a lacrosse game. I just love the sweater vests.",
  },
  {
    name: 'Artist Ken', title: 'Starving Visionary', voice: 480,
    look: { skin: '#d8a070', skinShade: '#b47c4c', hair: { style: 'beret', color: '#c83a4a' }, top: { style: 'tee', a: '#f4f0e6', b: '#3a8ae0', c: '#e0455a' }, pants: { style: 'long', color: '#2e2e3e' }, shoes: '#3a3a3a', acc: ['stubble'] },
    schedule: ['town', 'town', 'club'], likes: 'witty', hates: 'flirty', want: { stat: 'glam', min: 36 },
    bio: 'Paint-splattered and dramatic. Only dates bold, glamorous looks.',
    greet: "Ah, my muse! Hold still. No, don't move. Actually move. I'm painting your aura.",
    q: "My latest piece is just a blue square. Is it genius, or did I run out of paint?",
    good: "Genius! Yes! I'll title it 'Barbie Understands Me.' It's worth a million.",
    bad: "Philistine! ...Okay fine, I ran out of paint.",
    lore: "My first masterpiece was drawn on a napkin. The napkin was later used. Tragic.",
  },
  {
    name: 'Chef Ken', title: 'Garlic Romantic', voice: 440,
    look: { skin: '#f0c090', skinShade: '#cc9a68', hair: { style: 'toque', color: '#f8f8f8' }, top: { style: 'coat', a: '#f8f8f8', b: '#c8c8d0' }, pants: { style: 'long', color: '#33333c' }, shoes: '#222228', acc: ['mustache'] },
    schedule: ['town', 'town', 'club'], likes: 'sweet', hates: 'witty', want: { stat: 'int', min: 14 },
    bio: 'Loves smart-looking ladies with a taste for detail.',
    greet: "Bella Barbie! Taste this. No, don't ask what it is. Trust the chef.",
    q: "Be honest: too much garlic, or not enough garlic?",
    good: "Magnifique! You have the palate of an angel. Dessert is on me.",
    bad: "No garlic?! I need to sit down. Someone fan me with a baguette.",
    lore: "I learned to cook from a grandmother who never measured anything. Not even love.",
  },
  {
    name: 'DJ Ken', title: 'Bass Drop Beau', voice: 700,
    look: { skin: '#a8703f', skinShade: '#855225', hair: { style: 'spiky', color: '#25d8e0' }, top: { style: 'jacket', a: '#7a3aff', b: '#e8e8f8' }, pants: { style: 'long', color: '#1c1c28' }, shoes: '#ff3fa8', acc: ['headphones', 'shades'] },
    schedule: ['town', 'club', 'club'], likes: 'flirty', hates: 'witty', want: { stat: 'glam', min: 45 },
    bio: 'Spins at the Nightclub Lounge. Needs serious glam.',
    greet: "Yo Barbie! Drop it like it's... wait, which button drops it?",
    q: "Next track: something that slaps, or something that sparkles?",
    good: "A slappy sparkler! You just invented a genre. We're calling it 'Barbie-core.'",
    bad: "Record scratch. Awkward silence. That was the song.",
    lore: "I started DJing at my cousin's wedding. The bride cried. I think it was joy.",
  },
  {
    name: 'Pilot Ken', title: 'Captain Charming', voice: 500,
    look: { skin: '#e8b890', skinShade: '#c8946a', hair: { style: 'pilot', color: '#1f2f5a' }, top: { style: 'uniform', a: '#1f2f5a', b: '#f2c030' }, pants: { style: 'long', color: '#1a2650' }, shoes: '#15151c', acc: ['shades'] },
    schedule: ['town', 'town', 'club'], likes: 'bold', hates: 'sweet', want: { stat: 'elegance', min: 48 },
    bio: 'Smooth voice, smoother uniform. Appreciates elegance.',
    greet: "This is your captain speaking: Barbie, you're cleared for takeoff. Into my heart.",
    q: "Window seat or aisle seat? Choose wisely. Lives depend on it.",
    good: "Window! A girl of vision. Welcome aboard, first-class heart.",
    bad: "Aisle? Turbulence ahead, Barbie. Turbulence ahead.",
    lore: "I get airsick. I've never told the passengers. Please don't tell the passengers.",
  },
  {
    name: 'Scholar Ken', title: 'Three-PhD Dreamboat', voice: 540,
    look: { skin: '#e0b088', skinShade: '#bc8c64', hair: { style: 'short', color: '#2a2018' }, top: { style: 'jacket', a: '#7a5a3a', b: '#f4f0e6' }, pants: { style: 'long', color: '#5a4630' }, shoes: '#3a2a1a', acc: ['glasses'] },
    schedule: ['town', 'town', 'town'], likes: 'witty', hates: 'flirty', want: { stat: 'int', min: 24 },
    bio: 'Adores smart style: glasses, planners, tailoring.',
    greet: "Barbie! I was just reading about the economic impact of glitter. Fascinating. And you're here.",
    q: "Quick, settle this: is a hot dog a sandwich?",
    good: "A bold take and a logical argument! I'm citing you in my thesis.",
    bad: "That's factually... a choice. A choice was made.",
    lore: "I have three PhDs and zero idea how to fold a fitted sheet.",
  },
  {
    name: 'Rockstar Ken', title: 'Amp-Melting Heartthrob', voice: 330,
    look: { skin: '#d8a078', skinShade: '#b27c54', hair: { style: 'long', color: '#1a1a22' }, top: { style: 'jacket', a: '#16161c', b: '#c8c8d0' }, pants: { style: 'long', color: '#101016' }, shoes: '#202028', acc: ['shades'] },
    schedule: ['town', 'club', 'club'], likes: 'bold', hates: 'sweet', want: { stat: 'glam', min: 55 },
    bio: 'Leather, riffs, and big glam energy.',
    greet: "Barbie! Tour bus is outside. Wanna see how loud love can get?",
    q: "I wrote a song about you. It's mostly just 'Barbie!' screamed eight times. Too subtle?",
    good: "Subtle is for libraries! This is going platinum. Co-writing credit: you.",
    bad: "...Ouch. My heart just went unplugged.",
    lore: "I'm secretly afraid of seagulls. Beaches are my worst gigs.",
  },
  {
    name: 'CEO Ken', title: 'Eleven-Minute Mogul', voice: 420,
    look: { skin: '#e8b890', skinShade: '#c8946a', hair: { style: 'slick', color: '#16161c' }, top: { style: 'suit', a: '#2c303c', b: '#f4f4f8', c: '#d02a3a' }, pants: { style: 'long', color: '#2c303c' }, shoes: '#101014', acc: [] },
    schedule: ['town', 'town', 'club'], likes: 'witty', hates: 'sweet', want: { stat: 'int', min: 32 },
    bio: 'Wants a sharp, intelligent look. Pays handsomely.',
    greet: "Barbie. I have eleven minutes. I'm spending them on you. That's a merger.",
    q: "I can acquire a cute cafe, or invest in your dreams. Which is the better ROI?",
    good: "Excellent synergy. Shareholders are sobbing with joy. So am I.",
    bad: "Hmm. Let's circle back. In a different life.",
    lore: "I secretly hate meetings. My phone has been on mute since 2019.",
  },
  {
    name: 'K-Pop Idol Ken', title: 'Stadium Sweetheart', voice: 760,
    look: { skin: '#f8dcc0', skinShade: '#d8b898', hair: { style: 'bowl', color: '#ff9ac8' }, top: { style: 'jacket', a: '#fff0f8', b: '#7ad0ff' }, pants: { style: 'long', color: '#f4f4fc' }, shoes: '#f4f4fc', acc: ['earring'] },
    schedule: ['town', 'club', 'club'], likes: 'sweet', hates: 'witty', want: { stat: 'glam', min: 62 },
    bio: 'Sparkling, flawless, rehearsed. Needs lots of glam.',
    greet: "Annyeong, Barbie! Fan meeting starts in five. You're the only fan I need.",
    q: "Which is my best angle? Left, right, or 'heartbroken but still handsome'?",
    good: "Daebak! You see me. Stadium lights could never.",
    bad: "That's... a fair critique. I'm going to practice my sad face in the mirror.",
    lore: "I trained fourteen hours a day for six years. My favourite part is the snack break.",
  },
  {
    name: 'Cyberpunk Ken', title: 'Neon Netrunner', voice: 880,
    look: { skin: '#b8855a', skinShade: '#94643c', hair: { style: 'spiky', color: '#ff2fa8' }, top: { style: 'tech', a: '#16141f', b: '#ff2fa8' }, pants: { style: 'long', color: '#16141f' }, shoes: '#25e0e0', acc: ['visor'] },
    schedule: ['club', 'club', 'club'], likes: 'bold', hates: 'sweet', want: { stat: 'glam', min: 68 },
    bio: 'Glitchy, glowing, mysterious. Demands maximum glam.',
    greet: "Signal acquired: Barbie.exe. Warning: heart rate exceeding firewall.",
    q: "Upgrade my arm to chrome, or keep it organic for hugging?",
    good: "Organic hugging detected. Initiating emotional download... 100%.",
    bad: "Rejected. Rebooting. Please wait... Still sad.",
    lore: "My implants are mostly decorative. The glow does nothing. It just looks cool.",
  },
  {
    name: 'Aristocrat Ken', title: 'Duke of Drama', voice: 460,
    look: { skin: '#f6e0cc', skinShade: '#d6bca4', hair: { style: 'wig', color: '#f4f0f8' }, top: { style: 'suit', a: '#7a1e3a', b: '#fafafa', c: '#fafafa' }, pants: { style: 'long', color: '#ece0c8' }, shoes: '#f2c030', acc: [] },
    schedule: ['town', 'beach', 'town'], likes: 'witty', hates: 'bold', want: { stat: 'elegance', min: 70 },
    bio: 'Wig, tailcoat, and impossible standards of elegance.',
    greet: "Ah, Lady Barbie! Do forgive my wig. It has opinions.",
    q: "Shall we sip tea, or dramatically refuse tea in a heated moment?",
    good: "Brava! The Duchess of Dignified Drama herself. I faint. Gracefully.",
    bad: "Dreadful. I shall retire to my chaise and weep elegantly.",
    lore: "My family tree is mostly shrubs. We've been pretending since 1743.",
  },
  {
    name: 'Movie Star Ken', title: 'Red Carpet Royalty', voice: 580,
    look: { skin: '#e0a878', skinShade: '#bc8452', hair: { style: 'slick', color: '#4a3020' }, top: { style: 'suit', a: '#121218', b: '#fafafa', c: '#d02a3a' }, pants: { style: 'long', color: '#121218' }, shoes: '#0c0c10', acc: ['shades'] },
    schedule: ['beach', 'town', 'club'], likes: 'flirty', hates: 'witty', want: { stat: 'glam', min: 76 },
    bio: 'Tux, shades, and camera-ready charm.',
    greet: "Barbie! Don't look at the cameras. Look at me. ...Okay, look at the cameras a little.",
    q: "Be honest: do I act best when I'm acting, or when I'm pretending to act?",
    good: "Oscar-worthy insight. I'm adding you to my acceptance speech.",
    bad: "Cut! That take was cold. We'll fix it in post.",
    lore: "I've never seen my own movies. I'm scared I'm not the hero.",
  },
  {
    name: 'Tech Mogul Ken', title: 'Turtleneck Visionary', voice: 360,
    look: { skin: '#d8a880', skinShade: '#b48258', hair: { style: 'short', color: '#6a5a4a' }, top: { style: 'sweater', a: '#1e1e26', b: '#1e1e26' }, pants: { style: 'long', color: '#3a5a8a' }, shoes: '#f4f4f4', acc: ['glasses'] },
    schedule: ['town', 'club', 'town'], likes: 'witty', hates: 'flirty', want: { stat: 'int', min: 38 },
    bio: 'Billions in the bank, one black sweater in the closet. Loves brains.',
    greet: "Barbie! I just disrupted breakfast. Don't ask how.",
    q: "Should my next app be a social network for toasters, or a toaster for social networks?",
    good: "Disruptive!! Series A funding secured. In hugs.",
    bad: "Pivot. Pivot. PIVOT. I'm fine, this is fine.",
    lore: "I own forty-two black turtlenecks and one blanket. The blanket is the real CEO.",
  },
  {
    name: 'Prince Ken', title: 'Heir to Everything', voice: 650,
    look: { skin: '#f2c8a0', skinShade: '#d0a47c', hair: { style: 'crown', color: '#c89040' }, top: { style: 'royal', a: '#b21e3a', b: '#3a6ae0', c: '#f2c030' }, pants: { style: 'long', color: '#fafafa' }, shoes: '#f2c030', acc: ['cape:#5a1f8a'] },
    schedule: ['town', 'beach', 'club'], likes: 'flirty', hates: 'bold', want: { stat: 'elegance', min: 84 },
    bio: 'Crown, cape, and the highest elegance requirements in the kingdom.',
    greet: "Fair Barbie, my kingdom has a vacancy. It is shaped like you.",
    q: "Do I rule with wisdom, or with a really good cape?",
    good: "The cape! Yes! Long live the cape and the girl who sees it.",
    bad: "I shall pretend I did not hear that. Royally.",
    lore: "I'm third in line. The first two are cats. They're very good at ruling.",
  },
  {
    name: 'Rosan Sawad', title: 'The Ultimate Ken', voice: 400,
    look: { skin: '#c8956a', skinShade: '#a6744a', hair: { style: 'slick', color: '#0e0e16' }, top: { style: 'tech', a: '#0c0e18', b: '#38e8ff', c: '#ffffff' }, pants: { style: 'long', color: '#0c0e18' }, shoes: '#f8f8ff', acc: ['aura', 'cuff'] },
    schedule: ['penthouse', 'penthouse', 'penthouse'], likes: 'witty', hates: null, want: { stat: 'glam', min: 90 },
    bio: 'Flawless. Glowing aura. INT 100 / CHARM 100. Grants a 5x Daily Point Multiplier. Exclusive rooftop penthouse.',
    greet: "Barbie. I was hoping the elevator would bring you.",
    q: "Tell me something unexpected.",
    good: "Now THAT is why I keep the skyline on for you.",
    bad: "Interesting. Try again with feeling.",
    lore: "I memorised the city skyline so I'd never be lost. Then I found you.",
  },
];

export const KENS: KenDef[] = SPECS.map((sp, i) => ({
  ...sp,
  id: i,
  tier: i + 1,
  cost: COSTS[i],
  mult: i === 19 ? 5 : Math.round((0.8 + i * 0.2) * 10) / 10,
}));

export const TONE_LINES: Record<Tone, string[]> = {
  flirty: ['"You look dangerously good today."', '"Careful... I might steal you."'],
  witty: ['"I\'d say something clever, but you stole my words."', '"Plot twist: you\'re actually fun."'],
  sweet: ['"I\'m really glad I found you."', '"You make my whole day softer."'],
  bold: ['"Take me somewhere fabulous. Now."', '"Keep up, Ken."'],
};
export const TONE_ICON: Record<Tone, string> = { flirty: '💋', witty: '🧠', sweet: '🌸', bold: '🔥' };

export const ROSAN_CUTSCENES: Record<string, { title: string; pages: string[] }> = {
  dance: {
    title: 'Skyline Waltz',
    pages: [
      'The city hums below. Rosan offers his hand, and the rooftop lights flicker on one by one.',
      'ROSAN: "I calculated the odds of you saying yes. They were 99.7%. The remaining 0.3% was nerves."',
      'You sway under the stars. His aura warms the whole terrace in soft cyan light.',
      'ROSAN: "Stay a little longer. The skyline can wait. It always does for you."',
    ],
  },
  love: {
    title: 'Forever, Rooftop Edition',
    pages: [
      'Fireworks bloom over the skyline. Every window of the city glows pink for you.',
      'ROSAN: "I am the smartest man in this city. And the only thing I could not figure out... was how to stop smiling around you."',
      'He kneels, and holds up a tiny glowing ring made of pure Style Gem light.',
      'ROSAN: "Barbie. Be my forever collaborator. My co-star. My heart’s favourite plot twist."',
      'You say yes. The whole rooftop erupts in hearts, confetti, and a very smug skyline. TRUE LOVE ENDING!',
    ],
  },
};

export function rosanStage(morale: number) {
  return morale < 4 ? 0 : morale < 7 ? 1 : 2;
}
