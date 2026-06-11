'use client';

import { useState } from 'react';
import { ALL_TYPES, TYPE_COLORS, TYPE_CHART } from '@/lib/constants';

const EFF_STYLE: Record<string, { bg: string; text: string; label: string }> = {
  '2':   { bg: '#14532d', text: '#86efac', label: '2×'  },
  '0.5': { bg: '#7c2d12', text: '#fed7aa', label: '½'   },
  '0':   { bg: '#450a0a', text: '#fca5a5', label: '0'   },
  '1':   { bg: 'transparent', text: '#334155', label: '' },
};

export default function TypeChart() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

  return (
    <div className="p-4 overflow-auto">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[10px] text-slate-500 uppercase tracking-wider">
          Type Effectiveness · Attacker ↓ · Defender →
        </span>
        <div className="flex gap-3 ml-auto">
          {[
            { label: '2× super effective', bg: '#14532d', text: '#86efac' },
            { label: '½ not very effective', bg: '#7c2d12', text: '#fed7aa' },
            { label: '0 immune', bg: '#450a0a', text: '#fca5a5' },
          ].map(({ label, bg, text }) => (
            <div key={label} className="flex items-center gap-1">
              <div className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: bg }} />
              <span className="text-[10px] text-slate-500">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="inline-block">
        <table className="border-collapse">
          <thead>
            <tr>
              <th className="w-16 h-16" />
              {ALL_TYPES.map((t, ci) => (
                <th
                  key={t}
                  className="w-7 h-16 pb-1"
                  style={{ verticalAlign: 'bottom' }}
                  onMouseEnter={() => setHoveredCol(ci)}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  <div
                    className="text-[9px] font-bold"
                    style={{
                      writingMode: 'vertical-rl',
                      textOrientation: 'mixed',
                      transform: 'rotate(180deg)',
                      color: hoveredCol === ci ? TYPE_COLORS[t] : '#475569',
                      transition: 'color 0.1s',
                    }}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {ALL_TYPES.map((atkType, ri) => (
              <tr
                key={atkType}
                onMouseEnter={() => setHoveredRow(ri)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td
                  className="text-[10px] font-bold pr-2 text-right whitespace-nowrap cursor-default"
                  style={{
                    color: hoveredRow === ri ? TYPE_COLORS[atkType] : '#475569',
                    transition: 'color 0.1s',
                  }}
                >
                  {atkType.charAt(0).toUpperCase() + atkType.slice(1)}
                </td>

                {ALL_TYPES.map((_, ci) => {
                  const mult = TYPE_CHART[ri][ci];
                  const key  = String(mult);
                  const eff  = EFF_STYLE[key] ?? EFF_STYLE['1'];
                  const isHighlighted = hoveredRow === ri || hoveredCol === ci;

                  return (
                    <td
                      key={ci}
                      className="w-7 h-7 text-center text-[10px] font-bold border border-[#1a1b2e] transition-opacity"
                      style={{
                        backgroundColor: eff.bg,
                        color: eff.text,
                        opacity: (hoveredRow !== null || hoveredCol !== null) && !isHighlighted ? 0.35 : 1,
                      }}
                      title={`${atkType} → ${ALL_TYPES[ci]}: ${mult}×`}
                    >
                      {eff.label}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
