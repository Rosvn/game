export interface ScoreEntry { name: string; score: number; days: number; kens: number; ending: string; date: string }
const KEY = 'barbie_ken_scores_v1';

export function loadScores(): ScoreEntry[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ScoreEntry[]) : [];
  } catch {
    return [];
  }
}
export function addScore(e: ScoreEntry): { rank: number; list: ScoreEntry[] } {
  const list = loadScores();
  list.push(e);
  list.sort((a, b) => b.score - a.score);
  const top = list.slice(0, 8);
  const rank = top.indexOf(e);
  try { localStorage.setItem(KEY, JSON.stringify(top)); } catch { /* ignore */ }
  return { rank, list: top };
}
