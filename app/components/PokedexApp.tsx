'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import type { Pokemon } from '@/lib/types';
import { BATCH, GENERATION_RANGES, CAUGHT_THRESHOLD } from '@/lib/constants';
import Header from './Header';
import FilterBar from './FilterBar';
import PokemonCard from './PokemonCard';
import PokemonDetailPanel from './PokemonDetailPanel';
import ListView from './ListView';
import TypeChart from './TypeChart';

type FilterCaught = 'all' | 'caught' | 'missing';
type FilterFavorite = 'all' | 'favorites';
type SortBy = 'pokedex' | 'newest';
type ActiveTab = 'grid' | 'list' | 'typechart';

const FAVORITES_STORAGE_KEY = 'pokedex:favorites';

const TABS: { id: ActiveTab; label: string }[] = [
  { id: 'grid',      label: 'Grid'       },
  { id: 'list',      label: 'List'       },
  { id: 'typechart', label: 'Type Chart' },
];

interface Props {
  initialPokemon: Pokemon[];
  totalCount: number;
}

export default function PokedexApp({ initialPokemon, totalCount }: Props) {
  const [pokemon, setPokemon]           = useState<Pokemon[]>(initialPokemon);
  const [offset, setOffset]             = useState(initialPokemon.length);
  const [loading, setLoading]           = useState(false);
  const [search, setSearch]             = useState('');
  const [filterCaught, setFilterCaught] = useState<FilterCaught>('all');
  const [filterFavorite, setFilterFavorite] = useState<FilterFavorite>('all');
  const [filterGen, setFilterGen]       = useState<number | null>(null);
  const [filterType, setFilterType]     = useState<string | null>(null);
  const [sortBy, setSortBy]             = useState<SortBy>('pokedex');
  const [selectedId, setSelectedId]     = useState<number | null>(null);
  const [activeTab, setActiveTab]       = useState<ActiveTab>('grid');
  const [favoriteIds, setFavoriteIds]   = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return;
      setFavoriteIds(new Set(parsed.filter((id): id is number => Number.isInteger(id))));
    } catch {
      // Ignore malformed localStorage values.
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(Array.from(favoriteIds)));
  }, [favoriteIds]);

  const loadMore = useCallback(async () => {
    if (loading || offset >= totalCount) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/pokemon?offset=${offset}&limit=${BATCH}`);
      if (!res.ok) throw new Error('Failed');
      const data: { pokemon: Pokemon[]; count: number } = await res.json();
      setPokemon(prev => [...prev, ...data.pokemon]);
      setOffset(prev => prev + data.pokemon.length);
    } finally {
      setLoading(false);
    }
  }, [loading, offset, totalCount]);

  const filteredPokemon = useMemo(() => {
    let result = [...pokemon];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.includes(q) || String(p.id).includes(q));
    }

    if (filterCaught === 'caught')  result = result.filter(p => p.id <= CAUGHT_THRESHOLD);
    if (filterCaught === 'missing') result = result.filter(p => p.id > CAUGHT_THRESHOLD);

    if (filterFavorite === 'favorites') {
      result = result.filter(p => favoriteIds.has(p.id));
    }

    if (filterGen !== null) {
      const gen = GENERATION_RANGES.find(g => g.gen === filterGen);
      if (gen) result = result.filter(p => p.id >= gen.start && p.id <= gen.end);
    }

    if (filterType !== null) {
      result = result.filter(p => p.types.some(t => t.type.name === filterType));
    }

    if (sortBy === 'newest') result.sort((a, b) => b.id - a.id);
    else result.sort((a, b) => a.id - b.id);

    return result;
  }, [pokemon, search, filterCaught, filterFavorite, filterGen, filterType, sortBy, favoriteIds]);

  const caughtCount = useMemo(
    () => pokemon.filter(p => p.id <= CAUGHT_THRESHOLD).length,
    [pokemon],
  );

  const isCaught = useCallback((id: number) => id <= CAUGHT_THRESHOLD, []);

  const handleSelect = useCallback((id: number) => {
    setSelectedId(prev => prev === id ? null : id);
  }, []);

  const handleToggleFavorite = useCallback((id: number) => {
    setFavoriteIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectedPokemon = selectedId !== null
    ? pokemon.find(p => p.id === selectedId) ?? null
    : null;

  const showFilters = activeTab === 'grid' || activeTab === 'list';

  return (
    <div className="flex flex-col h-screen bg-[#0d0e1a] overflow-hidden">
      <Header
        search={search} onSearch={setSearch}
        caughtCount={caughtCount} totalCount={totalCount}
      />

      {/* Tab bar */}
      <div className="flex items-end gap-0 px-4 bg-[#0a0b15] border-b border-[#1e2038] shrink-0">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-xs font-medium border-t border-x transition-colors ${
              activeTab === tab.id
                ? 'bg-[#0d0e1a] text-slate-200 border-[#1e2038] -mb-px'
                : 'bg-transparent text-slate-500 border-transparent hover:text-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {showFilters && (
        <FilterBar
          filterCaught={filterCaught}   onFilterCaught={setFilterCaught}
          filterFavorite={filterFavorite} onFilterFavorite={setFilterFavorite}
          filterGen={filterGen}         onFilterGen={setFilterGen}
          filterType={filterType}       onFilterType={setFilterType}
          sortBy={sortBy}               onSortBy={setSortBy}
        />
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Primary content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'grid' && (
            <main className="p-4">
              {filteredPokemon.length === 0 ? (
                <div className="flex items-center justify-center h-40 text-slate-500 text-sm">
                  No Pokémon found.
                </div>
              ) : (
                <div
                  className="grid gap-3"
                  style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}
                >
                  {filteredPokemon.map(p => (
                    <div key={p.id} onClick={() => handleSelect(p.id)}>
                      <PokemonCard
                        pokemon={p}
                        isSelected={selectedId === p.id}
                        isCaught={isCaught(p.id)}
                        isFavorite={favoriteIds.has(p.id)}
                        onToggleFavorite={() => handleToggleFavorite(p.id)}
                      />
                    </div>
                  ))}
                </div>
              )}

              {!search.trim() && offset < totalCount && (
                <div className="flex flex-col items-center mt-6 gap-2">
                  <p className="text-xs text-slate-600">{offset} / {totalCount} loaded</p>
                  <button
                    onClick={loadMore}
                    disabled={loading}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm rounded-lg transition-colors"
                  >
                    {loading ? 'Loading…' : 'Load more'}
                  </button>
                </div>
              )}
            </main>
          )}

          {activeTab === 'list' && (
            <ListView
              pokemon={filteredPokemon}
              isCaught={isCaught}
              selectedId={selectedId}
              onSelect={handleSelect}
              offset={offset}
              totalCount={totalCount}
              loading={loading}
              onLoadMore={loadMore}
              hasSearch={search.trim().length > 0}
            />
          )}

          {activeTab === 'typechart' && <TypeChart />}
        </div>

        {/* Detail panel */}
        {selectedPokemon && (
          <PokemonDetailPanel
            pokemon={selectedPokemon}
            isCaught={isCaught(selectedPokemon.id)}
            isFavorite={favoriteIds.has(selectedPokemon.id)}
            onToggleFavorite={() => handleToggleFavorite(selectedPokemon.id)}
            onClose={() => setSelectedId(null)}
          />
        )}
      </div>
    </div>
  );
}
