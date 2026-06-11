'use client';

import { GENERATION_RANGES, TYPE_COLORS, TYPE_LABELS, ALL_TYPES } from '@/lib/constants';

type FilterCaught = 'all' | 'caught' | 'missing';
type FilterFavorite = 'all' | 'favorites';
type SortBy = 'pokedex' | 'newest';

const GEN_ROMANS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];

interface Props {
  filterCaught: FilterCaught;
  onFilterCaught: (v: FilterCaught) => void;
  filterFavorite: FilterFavorite;
  onFilterFavorite: (v: FilterFavorite) => void;
  filterGen: number | null;
  onFilterGen: (v: number | null) => void;
  filterType: string | null;
  onFilterType: (v: string | null) => void;
  sortBy: SortBy;
  onSortBy: (v: SortBy) => void;
}

function Chip({
  active,
  onClick,
  children,
  color,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
        active
          ? 'bg-blue-600 text-white'
          : 'bg-[#1a1b2e] text-slate-400 hover:text-slate-200 hover:bg-[#252640]'
      }`}
    >
      {color && (
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />
      )}
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-5 bg-[#1e2038] shrink-0" />;
}

export default function FilterBar({
  filterCaught,
  onFilterCaught,
  filterFavorite,
  onFilterFavorite,
  filterGen,
  onFilterGen,
  filterType,
  onFilterType,
  sortBy,
  onSortBy,
}: Props) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-[#0a0b15] border-b border-[#1e2038] overflow-x-auto shrink-0">
      {/* Status */}
      <div className="flex items-center gap-1 shrink-0">
        <Chip active={filterCaught === 'all'} onClick={() => onFilterCaught('all')}>All</Chip>
        <Chip active={filterCaught === 'caught'} onClick={() => onFilterCaught('caught')}>Caught</Chip>
        <Chip active={filterCaught === 'missing'} onClick={() => onFilterCaught('missing')}>Missing</Chip>
      </div>

      <Divider />

      {/* Favorites */}
      <div className="flex items-center gap-1 shrink-0">
        <Chip active={filterFavorite === 'all'} onClick={() => onFilterFavorite('all')}>All Picks</Chip>
        <Chip active={filterFavorite === 'favorites'} onClick={() => onFilterFavorite('favorites')}>Favorites</Chip>
      </div>

      <Divider />

      {/* Generation */}
      <div className="flex items-center gap-1 shrink-0">
        <Chip active={filterGen === null} onClick={() => onFilterGen(null)}>All Gen</Chip>
        {GENERATION_RANGES.map(({ gen, color }, i) => (
          <Chip
            key={gen}
            active={filterGen === gen}
            onClick={() => onFilterGen(gen)}
            color={color}
          >
            {GEN_ROMANS[i]}
          </Chip>
        ))}
      </div>

      <Divider />

      {/* Type */}
      <div className="flex items-center gap-1">
        <Chip active={filterType === null} onClick={() => onFilterType(null)}>All Types</Chip>
        {ALL_TYPES.map(t => (
          <Chip
            key={t}
            active={filterType === t}
            onClick={() => onFilterType(t)}
            color={TYPE_COLORS[t]}
          >
            {TYPE_LABELS[t]}
          </Chip>
        ))}
      </div>

      <Divider />

      {/* Sort */}
      <div className="flex items-center gap-1 shrink-0">
        <Chip active={sortBy === 'pokedex'} onClick={() => onSortBy('pokedex')}>#</Chip>
        <Chip active={sortBy === 'newest'} onClick={() => onSortBy('newest')}>Newest</Chip>
      </div>
    </div>
  );
}
