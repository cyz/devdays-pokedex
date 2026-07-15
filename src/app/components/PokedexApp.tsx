'use client';

import { useCallback, useMemo, useState } from 'react';
import type { Pokemon } from '@/lib/types';
import { BATCH } from '@/lib/constants';
import Header from './Header';
import PokemonCard from './PokemonCard';

interface Props {
  initialPokemon: Pokemon[];
  totalCount: number;
}

export default function PokedexApp({ initialPokemon, totalCount }: Props) {
  const [pokemon, setPokemon] = useState<Pokemon[]>(initialPokemon);
  const [team, setTeam] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(initialPokemon.length);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

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
    const query = search.trim().toLowerCase();
    if (!query) return pokemon;
    return pokemon.filter((entry) => entry.name.includes(query) || String(entry.id).includes(query));
  }, [pokemon, search]);

  const capturePokemon = useCallback((selectedPokemon: Pokemon) => {
    setTeam((currentTeam) => {
      if (currentTeam.length >= 6 || currentTeam.some((entry) => entry.id === selectedPokemon.id)) {
        return currentTeam;
      }
      return [...currentTeam, selectedPokemon];
    });
  }, []);

  const capturedPokemonIds = useMemo(() => new Set(team.map((entry) => entry.id)), [team]);
  const isTeamFull = team.length >= 6;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#090a0f] text-slate-100">
      <Header
        search={search}
        onSearch={setSearch}
        loadedCount={pokemon.length}
        totalCount={totalCount}
        teamCount={team.length}
      />

      <main className="relative flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,208,48,0.16),transparent_32%),radial-gradient(circle_at_top_right,rgba(104,144,240,0.14),transparent_30%)]" />

        <section className="relative mx-auto flex w-full max-w-7xl flex-col gap-5">
          {filteredPokemon.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-6 text-center shadow-2xl shadow-black/20">
              <p className="text-sm font-semibold text-slate-200">No Pokémon found</p>
              <p className="mt-2 max-w-sm text-xs leading-5 text-slate-500">
                Try another name or Pokédex number to continue browsing the current collection.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))' }}>
              {filteredPokemon.map((entry) => (
                <PokemonCard
                  key={entry.id}
                  pokemon={entry}
                  onCapture={capturePokemon}
                  isCaptured={capturedPokemonIds.has(entry.id)}
                  isTeamFull={isTeamFull}
                />
              ))}
            </div>
          )}

          {!search.trim() && offset < totalCount && (
            <div className="flex justify-center pb-6 pt-2">
              <button
                onClick={loadMore}
                disabled={loading}
                className="rounded-full border border-white/10 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:border-white/20 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-yellow-300/70 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Load more'}
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
