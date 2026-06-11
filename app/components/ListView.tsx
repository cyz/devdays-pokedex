'use client';

import Image from 'next/image';
import { useState, useMemo } from 'react';
import type { Pokemon } from '@/lib/types';
import { TYPE_COLORS } from '@/lib/constants';

type SortKey =
  | 'id' | 'name' | 'hp' | 'attack' | 'defense'
  | 'special-attack' | 'special-defense' | 'speed'
  | 'bst' | 'height' | 'weight';
type SortDir = 'asc' | 'desc';

interface Props {
  pokemon: Pokemon[];
  isCaught: (id: number) => boolean;
  selectedId: number | null;
  onSelect: (id: number) => void;
  offset: number;
  totalCount: number;
  loading: boolean;
  onLoadMore: () => void;
  hasSearch: boolean;
}

const STAT_KEYS = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'] as const;

const COLS: { key: SortKey; label: string; right?: boolean }[] = [
  { key: 'id',               label: '#',   right: true  },
  { key: 'name',             label: 'Name'              },
  { key: 'hp',               label: 'HP',  right: true  },
  { key: 'attack',           label: 'Atk', right: true  },
  { key: 'defense',          label: 'Def', right: true  },
  { key: 'special-attack',   label: 'SpA', right: true  },
  { key: 'special-defense',  label: 'SpD', right: true  },
  { key: 'speed',            label: 'Spe', right: true  },
  { key: 'bst',              label: 'BST', right: true  },
  { key: 'height',           label: 'Ht',  right: true  },
  { key: 'weight',           label: 'Wt',  right: true  },
];

const STAT_COLORS: Record<string, string> = {
  hp: '#ef4444',
  attack: '#f97316',
  defense: '#eab308',
  'special-attack': '#3b82f6',
  'special-defense': '#22c55e',
  speed: '#a855f7',
};

function getSortValue(p: Pokemon, key: SortKey): string | number {
  if (key === 'id')     return p.id;
  if (key === 'name')   return p.name;
  if (key === 'bst')    return p.stats.reduce((s, st) => s + st.base_stat, 0);
  if (key === 'height') return p.height;
  if (key === 'weight') return p.weight;
  return p.stats.find(s => s.stat.name === key)?.base_stat ?? 0;
}

export default function ListView({
  pokemon, isCaught, selectedId, onSelect,
  offset, totalCount, loading, onLoadMore, hasSearch,
}: Props) {
  const [sortKey, setSortKey] = useState<SortKey>('id');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir(key === 'name' ? 'asc' : 'desc'); }
  };

  const sorted = useMemo(() => [...pokemon].sort((a, b) => {
    const va = getSortValue(a, sortKey);
    const vb = getSortValue(b, sortKey);
    if (typeof va === 'string' && typeof vb === 'string')
      return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    return sortDir === 'asc' ? (va as number) - (vb as number) : (vb as number) - (va as number);
  }), [pokemon, sortKey, sortDir]);

  return (
    <div className="overflow-auto">
      <table className="w-full text-xs border-collapse" style={{ minWidth: 760 }}>
        <thead className="sticky top-0 bg-[#0a0b15] z-10">
          <tr className="border-b border-[#1e2038]">
            <th className="w-8 px-1 py-2" />
            <th className="w-5 px-1 py-2" />
            {COLS.map(col => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                className={`py-2 px-2 font-semibold text-slate-500 cursor-pointer hover:text-slate-200 select-none transition-colors whitespace-nowrap ${col.right ? 'text-right' : 'text-left'}`}
              >
                {col.label}
                {sortKey === col.key && (
                  <span className="ml-0.5 text-blue-400 text-[9px]">{sortDir === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
            ))}
            <th className="py-2 px-2 font-semibold text-slate-500 text-left whitespace-nowrap">Types</th>
          </tr>
        </thead>

        <tbody>
          {sorted.map(p => {
            const bst      = p.stats.reduce((s, st) => s + st.base_stat, 0);
            const caught   = isCaught(p.id);
            const selected = selectedId === p.id;

            return (
              <tr
                key={p.id}
                onClick={() => onSelect(p.id)}
                className={`border-b cursor-pointer transition-colors ${
                  selected
                    ? 'bg-[#1a2040] border-blue-500/20'
                    : 'border-[#14152a] hover:bg-[#151627]'
                }`}
              >
                <td className="px-1 py-0.5 w-8">
                  {p.sprites.front_default && (
                    <Image
                      src={p.sprites.front_default}
                      alt={p.name}
                      width={32} height={32}
                      className="object-contain"
                      style={{ imageRendering: 'pixelated' }}
                      unoptimized
                    />
                  )}
                </td>

                <td className="px-1 py-0.5 w-5">
                  {caught && (
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"
                      style={{ boxShadow: '0 0 4px #60a5fa' }}
                    />
                  )}
                </td>

                <td className="text-right pr-3 py-2 text-slate-500 font-mono whitespace-nowrap">
                  #{String(p.id).padStart(3, '0')}
                </td>
                <td className="py-2 px-2 text-slate-200 font-medium capitalize whitespace-nowrap">{p.name}</td>

                {STAT_KEYS.map(stat => (
                  <td
                    key={stat}
                    className="text-right py-2 px-2 font-mono tabular-nums"
                    style={{ color: STAT_COLORS[stat] }}
                  >
                    {p.stats.find(s => s.stat.name === stat)?.base_stat ?? 0}
                  </td>
                ))}

                <td className="text-right py-2 px-2 text-slate-200 font-semibold tabular-nums">{bst}</td>
                <td className="text-right py-2 px-2 text-slate-400 tabular-nums whitespace-nowrap">
                  {(p.height / 10).toFixed(1)}m
                </td>
                <td className="text-right py-2 px-2 text-slate-400 tabular-nums whitespace-nowrap">
                  {(p.weight / 10).toFixed(1)}kg
                </td>

                <td className="py-2 px-2">
                  <div className="flex gap-1 flex-wrap">
                    {p.types.map(({ type }) => (
                      <span
                        key={type.name}
                        className="px-1.5 py-0.5 rounded text-[9px] font-bold text-white capitalize"
                        style={{ backgroundColor: TYPE_COLORS[type.name] ?? '#6b7280' }}
                      >
                        {type.name}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {!hasSearch && offset < totalCount && (
        <div className="flex flex-col items-center py-4 gap-2">
          <p className="text-xs text-slate-600">{offset} / {totalCount} loaded</p>
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm rounded-lg transition-colors"
          >
            {loading ? 'Loading…' : 'Load more'}
          </button>
        </div>
      )}
    </div>
  );
}
