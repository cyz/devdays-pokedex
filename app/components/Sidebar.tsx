'use client';

import { GENERATION_RANGES, TYPE_COLORS, TYPE_LABELS, ALL_TYPES, CAUGHT_THRESHOLD, TOTAL_POKEMON } from '@/lib/constants';

type FilterCaught = 'all' | 'caught' | 'missing';
type SortBy = 'pokedex' | 'newest' | 'oldest';

interface SidebarProps {
  filterCaught: FilterCaught;
  onFilterCaught: (v: FilterCaught) => void;
  filterGeneration: number | null;
  onFilterGeneration: (v: number | null) => void;
  filterType: string | null;
  onFilterType: (v: string | null) => void;
  sortBy: SortBy;
  onSortBy: (v: SortBy) => void;
}

const GEN_ROMANS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: 'pokedex', label: 'Pokédex #' },
  { value: 'newest',  label: 'Newest'   },
  { value: 'oldest',  label: 'Oldest'   },
];

// Compute static caught counts (id <= CAUGHT_THRESHOLD) per generation
const GEN_CAUGHT = GENERATION_RANGES.map(({ start, end, total, label, color }) => {
  const caught = start > CAUGHT_THRESHOLD ? 0 : Math.min(end, CAUGHT_THRESHOLD) - start + 1;
  return { label, caught, total, color };
});
const TOTAL_CAUGHT = GEN_CAUGHT.reduce((s, g) => s + g.caught, 0);

function FilterBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
        active ? 'bg-blue-600 text-white' : 'bg-[#1a1b2e] text-slate-400 hover:text-slate-200'
      }`}
    >
      {children}
    </button>
  );
}

function SectionHeader({ label }: { label: string }) {
  return <div className="text-[10px] text-slate-600 uppercase tracking-wider mb-1.5 font-semibold">{label}</div>;
}

export default function Sidebar({ filterCaught, onFilterCaught, filterGeneration, onFilterGeneration, filterType, onFilterType, sortBy, onSortBy }: SidebarProps) {
  return (
    <aside className="w-60 shrink-0 bg-[#0d0e1a] border-r border-[#1e2038] flex flex-col overflow-hidden">
      {/* Explorer header */}
      <div className="px-3 py-2 text-xs font-semibold text-slate-400 flex items-center gap-1 border-b border-[#1e2038] shrink-0">
        <span className="text-slate-600 text-[10px]">▼</span>
        EXPLORER
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-3 py-2">
          {/* Filters heading */}
          <div className="text-xs text-slate-500 flex items-center gap-1 mb-3">
            <span className="text-[10px]">▼</span> FILTERS
          </div>

          {/* Pokémon */}
          <div className="mb-3">
            <SectionHeader label="Pokémon" />
            <div className="flex gap-1 flex-wrap">
              <FilterBtn active={filterCaught === 'caught'} onClick={() => onFilterCaught('caught')}>Caught</FilterBtn>
              <FilterBtn active={filterCaught === 'all'}    onClick={() => onFilterCaught('all')}>All Pokémon</FilterBtn>
              <FilterBtn active={filterCaught === 'missing'} onClick={() => onFilterCaught('missing')}>Missing</FilterBtn>
            </div>
          </div>

          {/* Generation */}
          <div className="mb-3">
            <SectionHeader label="Generation" />
            <div className="flex flex-wrap gap-1">
              <FilterBtn active={filterGeneration === null} onClick={() => onFilterGeneration(null)}>All</FilterBtn>
              {GENERATION_RANGES.map(({ gen }, i) => (
                <FilterBtn key={gen} active={filterGeneration === gen} onClick={() => onFilterGeneration(gen)}>
                  {GEN_ROMANS[i]}
                </FilterBtn>
              ))}
            </div>
          </div>

          {/* Type */}
          <div className="mb-3">
            <SectionHeader label="Type" />
            <div className="flex flex-wrap gap-1">
              <FilterBtn active={filterType === null} onClick={() => onFilterType(null)}>All</FilterBtn>
              {ALL_TYPES.map(t => (
                <button
                  key={t}
                  onClick={() => onFilterType(t)}
                  className={`px-2 py-0.5 rounded text-xs flex items-center gap-1 transition-colors ${
                    filterType === t
                      ? 'bg-[#1a1b2e] text-slate-200 ring-1 ring-blue-400'
                      : 'bg-[#1a1b2e] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full inline-block shrink-0" style={{ backgroundColor: TYPE_COLORS[t] }} />
                  {TYPE_LABELS[t]}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="mb-2">
            <SectionHeader label="Sort" />
            <div className="flex gap-1">
              {SORT_OPTIONS.map(({ value, label }) => (
                <FilterBtn key={value} active={sortBy === value} onClick={() => onSortBy(value)}>
                  {label}
                </FilterBtn>
              ))}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="px-3 py-2 border-t border-[#1e2038]">
          <div className="text-xs text-slate-500 flex items-center gap-1 mb-3">
            <span className="text-[10px]">▼</span> POKÉDEX PROGRESS
          </div>

          {/* Total bar */}
          <div className="mb-3">
            <div className="w-full bg-[#1e2038] rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(TOTAL_CAUGHT / TOTAL_POKEMON) * 100}%`,
                  background: 'linear-gradient(to right, #ef4444, #f59e0b, #22c55e)',
                }}
              />
            </div>
            <div className="text-[10px] text-slate-500 text-right mt-0.5">{TOTAL_CAUGHT} / {TOTAL_POKEMON}</div>
          </div>

          {/* Per-gen bars */}
          {GEN_CAUGHT.map(({ label, caught, total, color }) => (
            <div key={label} className="flex items-center gap-2 mb-1.5">
              <div className="w-[46px] text-[10px] text-slate-500 shrink-0">{label}</div>
              <div className="flex-1 bg-[#1e2038] rounded-full h-1.5 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${(caught / total) * 100}%`, backgroundColor: color }} />
              </div>
              <div className="w-6 text-[10px] text-slate-500 text-right shrink-0">{caught}</div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
