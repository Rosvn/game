import { useState } from 'react';
import type { Game } from '../game/engine';
import { KENS, ROSAN_GEM_REQ, ROSAN_GLAM_REQ } from '../game/kens';
import { STAT_LABEL } from '../game/items';
import { KenSprite } from './Sprites';

export function Roster({ game }: { game: Game }) {
  const [sel, setSel] = useState(game.suitor < 20 ? Math.min(game.suitor, 19) : 19);
  const k = KENS[sel];
  const ks = game.kens[sel];
  const isR = sel === 19;
  const next = game.kens.findIndex((x) => !x.unlocked);
  return (
    <div className="overlay flex flex-col fade-in" style={{ background: 'linear-gradient(180deg,#3a1f5a,#1c0f2a)' }}>
      <div className="flex items-center justify-between" style={{ padding: '2.4cqw 3cqw' }}>
        <div className="px glow-text" style={{ fontSize: 'max(9px,2.8cqw)' }}>💞 KEN CATALOG {game.unlockedCount}/20</div>
        <button className="pbtn" style={{ padding: '1.6cqw 3cqw' }} onPointerDown={(e) => { e.preventDefault(); game.closeRoster(); }}>CLOSE ✖</button>
      </div>
      <div className="scroll-y flex-1 min-h-0" style={{ padding: '0 3cqw' }}>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.6cqw' }}>
          {KENS.map((kd, i) => {
            const s = game.kens[i];
            return (
              <button key={i} onPointerDown={(e) => { e.preventDefault(); setSel(i); }} className="pcard flex flex-col items-center"
                style={{ padding: '0.8cqw', cursor: 'pointer', outline: sel === i ? '0.8cqw solid #e0407a' : 'none', background: i === 19 ? 'linear-gradient(180deg,#1c2a4a,#0c0e18)' : s.unlocked ? undefined : 'linear-gradient(180deg,#d8d0e0,#b8a8c8)', color: i === 19 ? '#7af0ff' : undefined, borderColor: i === 19 ? '#38e8ff' : undefined }}>
                <KenSprite id={i} scale={1.6} silhouette={!s.unlocked} />
                <div className="px" style={{ fontSize: 'max(5px,1.4cqw)', marginTop: '0.4cqw' }}>T{kd.tier}</div>
                <div className="vt" style={{ fontSize: 'max(10px,2.8cqw)', lineHeight: 0.9, textAlign: 'center', minHeight: '5.2cqw' }}>{s.unlocked || i === game.suitor ? kd.name.replace(' Ken', '') : '???'}</div>
                <div style={{ fontSize: 'max(8px,2.2cqw)' }}>{s.unlocked ? (s.raag ? '😤' : `♥${Math.floor(s.morale)}`) : '🔒'}</div>
              </button>
            );
          })}
        </div>
      </div>
      <div className="pcard" style={{ margin: '2cqw 3cqw 3cqw', padding: '2cqw 2.6cqw', background: isR ? 'linear-gradient(180deg,#1c2a4a,#0c0e18)' : undefined, color: isR ? '#d8f8ff' : undefined, borderColor: isR ? '#38e8ff' : undefined }}>
        <div className="flex items-center" style={{ gap: '2cqw' }}>
          <KenSprite id={sel} scale={2.4} silhouette={!ks.unlocked && sel !== next} animate={ks.unlocked} />
          <div className="min-w-0 flex-1">
            <div className="px" style={{ fontSize: 'max(7px,2.2cqw)' }}>T{k.tier} · {ks.unlocked || sel === next ? k.name : '???'}</div>
            <div className="vt" style={{ fontSize: 'max(12px,3.7cqw)', lineHeight: 1 }}>
              {ks.unlocked || sel === next ? `${k.title} — ${k.bio}` : 'Unlock the previous Ken to reveal this one.'}
            </div>
            <div className="vt" style={{ fontSize: 'max(12px,3.6cqw)', lineHeight: 1, marginTop: '0.6cqw', color: isR ? '#ffe080' : '#a02a60' }}>
              Daily multiplier x{k.mult} · Wants {STAT_LABEL[k.want.stat]} ≥ {k.want.min}
            </div>
            {isR && <div className="vt" style={{ fontSize: 'max(12px,3.6cqw)', lineHeight: 1, color: '#7af0ff' }}>INT 100/100 · CHARM 100/100 · 5x multiplier · Rooftop penthouse</div>}
            <div className="vt" style={{ fontSize: 'max(12px,3.6cqw)', lineHeight: 1, marginTop: '0.6cqw' }}>
              {ks.unlocked
                ? ks.lore ? `📖 "${k.lore}"` : '📖 Hidden lore: reach ♥3 and ask about his story.'
                : isR ? `Requires: Prince Ken + ${ROSAN_GEM_REQ.toLocaleString()} 💎 + Glamour ${ROSAN_GLAM_REQ} (tower door, Town Square)`
                  : sel === next ? `Find him in Town Square · ${k.cost.toLocaleString()} 💎` : `Cost ${k.cost.toLocaleString()} 💎`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
