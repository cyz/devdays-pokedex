'use client';

import { useState, useCallback } from 'react';
import { Pokemon } from '@/lib/types';
import { BATCH } from '@/lib/constants';
import PokemonCard from './PokemonCard';

interface Props {
  initialPokemon: Pokemon[];
  totalCount: number;
}

export default function PokemonGrid({ initialPokemon, totalCount }: Props) {
  const [pokemon, setPokemon] = useState<Pokemon[]>(initialPokemon);
  const [offset, setOffset] = useState(initialPokemon.length);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allLoaded = offset >= totalCount;

  const filtered = search.trim()
    ? pokemon.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          String(p.id).includes(search.trim())
      )
    : pokemon;

  const loadMore = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/pokemon?offset=${offset}&limit=${BATCH}`);
      if (!res.ok) throw new Error('Request failed');
      const data: { pokemon: Pokemon[]; count: number } = await res.json();
      setPokemon((prev) => [...prev, ...data.pokemon]);
      setOffset((prev) => prev + data.pokemon.length);
    } catch {
      setError('Failed to load more Pokémon. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [offset]);

  return (
    <>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search Pokémon by name or ID…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80 max-w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-red-400 transition-colors"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 mt-12">No Pokémon found.</p>
      ) : (
        <div
          className="max-w-6xl mx-auto"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '1rem',
          }}
        >
          {filtered.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>
      )}

      {!search.trim() && (
        <div className="mt-6 text-center space-y-3">
          <p className="text-gray-500 text-sm">
            Showing {pokemon.length} of {totalCount} Pokémon
          </p>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {!allLoaded && (
            <button
              onClick={loadMore}
              disabled={loading}
              className="px-8 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Loading…' : 'Load more'}
            </button>
          )}
        </div>
      )}
    </>
  );
}
