'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type {
  Pokemon, PokemonSpecies, EvolutionChain, EvolutionNode, LocationEncounter,
} from '@/lib/types';
import { TYPE_COLORS } from '@/lib/constants';

type DetailTab = 'overview' | 'evolutions' | 'encounters';

interface Props {
  pokemon: Pokemon;
  isCaught: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClose: () => void;
}

const STAT_CONFIG = [
  { key: 'hp',             label: 'HP',  color: '#ef4444' },
  { key: 'attack',         label: 'Atk', color: '#f97316' },
  { key: 'defense',        label: 'Def', color: '#eab308' },
  { key: 'special-attack', label: 'SpA', color: '#3b82f6' },
  { key: 'special-defense',label: 'SpD', color: '#22c55e' },
  { key: 'speed',          label: 'Spe', color: '#a855f7' },
] as const;

function getIdFromSpeciesUrl(url: string): number {
  const parts = url.replace(/\/$/, '').split('/');
  return parseInt(parts[parts.length - 1], 10);
}

function formatTrigger(d: EvolutionNode['evolution_details'][0]): string {
  if (d.trigger.name === 'level-up') {
    const parts: string[] = [];
    if (d.min_level)    parts.push(`Lv. ${d.min_level}`);
    if (d.min_happiness) parts.push(`Happiness ${d.min_happiness}`);
    if (d.time_of_day)  parts.push(d.time_of_day);
    if (d.location)     parts.push(d.location.name.replace(/-/g, ' '));
    if (d.held_item)    parts.push(`holding ${d.held_item.name.replace(/-/g, ' ')}`);
    if (d.known_move)   parts.push(`know ${d.known_move.name.replace(/-/g, ' ')}`);
    return parts.length > 0 ? parts.join(' · ') : 'Level up';
  }
  if (d.trigger.name === 'use-item') {
    return d.item ? d.item.name.replace(/-/g, ' ') : 'Use item';
  }
  if (d.trigger.name === 'trade') {
    return d.held_item ? `Trade w/ ${d.held_item.name.replace(/-/g, ' ')}` : 'Trade';
  }
  return d.trigger.name.replace(/-/g, ' ');
}

function EvolutionTree({ node }: { node: EvolutionNode }) {
  const id = getIdFromSpeciesUrl(node.species.url);
  const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className="flex flex-col items-center gap-1 min-w-[64px]">
      <div className="flex flex-col items-center">
        <Image src={sprite} alt={node.species.name} width={52} height={52}
          className="object-contain" style={{ imageRendering: 'pixelated' }} unoptimized />
        <span className="text-[10px] text-slate-300 capitalize text-center leading-tight mt-0.5">
          {node.species.name}
        </span>
        <span className="text-[9px] text-slate-600 font-mono">
          #{String(id).padStart(3, '0')}
        </span>
      </div>

      {node.evolves_to.length > 0 && (
        <div className="flex gap-3 items-start flex-wrap justify-center mt-1">
          {node.evolves_to.map((next, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="text-slate-600 text-[10px] leading-none">↓</div>
              {next.evolution_details[0] && (
                <div className="text-[9px] text-blue-400 text-center max-w-[72px] leading-tight px-1">
                  {formatTrigger(next.evolution_details[0])}
                </div>
              )}
              <EvolutionTree node={next} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PokemonDetailPanel({
  pokemon,
  isCaught,
  isFavorite,
  onToggleFavorite,
  onClose,
}: Props) {
  const [activeTab,  setActiveTab]  = useState<DetailTab>('overview');
  const [species,    setSpecies]    = useState<PokemonSpecies | null>(null);
  const [evoChain,   setEvoChain]   = useState<EvolutionChain | null>(null);
  const [encounters, setEncounters] = useState<LocationEncounter[] | null>(null);
  const [speciesLoading, setSpeciesLoading] = useState(false);
  const [evoLoading,     setEvoLoading]     = useState(false);
  const [encLoading,     setEncLoading]     = useState(false);

  useEffect(() => {
    setActiveTab('overview');
    setSpecies(null);
    setEvoChain(null);
    setEncounters(null);
  }, [pokemon.id]);

  useEffect(() => {
    if (species) return;
    let cancelled = false;
    setSpeciesLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`)
      .then(r => r.json())
      .then((d: PokemonSpecies) => { if (!cancelled) setSpecies(d); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setSpeciesLoading(false); });
    return () => { cancelled = true; };
  }, [pokemon.id, species]);

  useEffect(() => {
    if (activeTab !== 'evolutions' || evoChain || !species) return;
    let cancelled = false;
    setEvoLoading(true);
    fetch(species.evolution_chain.url)
      .then(r => r.json())
      .then((d: EvolutionChain) => { if (!cancelled) setEvoChain(d); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setEvoLoading(false); });
    return () => { cancelled = true; };
  }, [activeTab, species, evoChain]);

  useEffect(() => {
    if (activeTab !== 'encounters' || encounters !== null) return;
    let cancelled = false;
    setEncLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}/encounters`)
      .then(r => r.json())
      .then((d: LocationEncounter[]) => { if (!cancelled) setEncounters(d); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setEncLoading(false); });
    return () => { cancelled = true; };
  }, [activeTab, pokemon.id, encounters]);

  const bst        = pokemon.stats.reduce((s, st) => s + st.base_stat, 0);
  const artworkUrl = pokemon.sprites.other['official-artwork'].front_default;
  const flavorText = species?.flavor_text_entries
    .filter(e => e.language.name === 'en').pop()
    ?.flavor_text.replace(/\f/g, ' ').replace(/\n/g, ' ');
  const genus = species?.genera.find(g => g.language.name === 'en')?.genus;

  return (
    <div className="w-80 shrink-0 bg-[#0d0e1a] border-l border-[#1e2038] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#0a0b15] border-b border-[#1e2038] shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-slate-500 font-mono text-[11px] shrink-0">
            #{String(pokemon.id).padStart(3, '0')}
          </span>
          <span className="text-sm font-semibold text-slate-200 capitalize truncate">{pokemon.name}</span>
          {isCaught && (
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"
              style={{ boxShadow: '0 0 4px #60a5fa' }} />
          )}
        </div>
        <div className="flex items-center gap-1 ml-2 shrink-0">
          <button
            type="button"
            onClick={onToggleFavorite}
            aria-label={isFavorite ? `Unfavorite ${pokemon.name}` : `Favorite ${pokemon.name}`}
            className={`rounded p-1 transition-colors ${
              isFavorite ? 'text-amber-300 hover:text-amber-200' : 'text-slate-500 hover:text-slate-200'
            }`}
          >
            <svg viewBox="0 0 20 20" className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'}>
              <path
                d="M10 2.5l2.32 4.7 5.18.75-3.75 3.66.89 5.17L10 14.35 5.36 16.78l.89-5.17L2.5 7.95l5.18-.75L10 2.5z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-200 transition-colors text-base leading-none"
          >
            ×
          </button>
        </div>
      </div>

      {/* Inner tabs */}
      <div className="flex border-b border-[#1e2038] bg-[#0a0b15] shrink-0">
        {(['overview', 'evolutions', 'encounters'] as DetailTab[]).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-[11px] font-medium capitalize transition-colors ${
              activeTab === tab
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'overview' && (
          <OverviewContent
            pokemon={pokemon} bst={bst} artworkUrl={artworkUrl}
            flavorText={flavorText} genus={genus}
            isLegendary={species?.is_legendary}
            isMythical={species?.is_mythical}
            loading={speciesLoading && !species}
          />
        )}
        {activeTab === 'evolutions' && (
          <EvolutionsContent
            evoChain={evoChain}
            loading={evoLoading || (speciesLoading && !species)}
          />
        )}
        {activeTab === 'encounters' && (
          <EncountersContent encounters={encounters} loading={encLoading} />
        )}
      </div>
    </div>
  );
}

function OverviewContent({
  pokemon, bst, artworkUrl, flavorText, genus,
  isLegendary, isMythical, loading,
}: {
  pokemon: Pokemon;
  bst: number;
  artworkUrl: string | null;
  flavorText?: string;
  genus?: string;
  isLegendary?: boolean;
  isMythical?: boolean;
  loading: boolean;
}) {
  return (
    <div className="p-3 space-y-4">
      {/* Artwork */}
      <div className="flex justify-center pt-1">
        {artworkUrl ? (
          <Image src={artworkUrl} alt={pokemon.name} width={144} height={144}
            className="object-contain" unoptimized />
        ) : (
          <div className="w-36 h-36 flex items-center justify-center text-slate-700 text-5xl">?</div>
        )}
      </div>

      {/* Types + special badges */}
      <div className="flex justify-center gap-1.5 flex-wrap">
        {pokemon.types.map(({ type }) => (
          <span key={type.name}
            className="px-2 py-0.5 rounded text-[11px] font-bold text-white capitalize"
            style={{ backgroundColor: TYPE_COLORS[type.name] ?? '#6b7280' }}
          >
            {type.name}
          </span>
        ))}
        {isLegendary && (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold text-yellow-300 bg-yellow-900/30 border border-yellow-700/40">
            Legendary
          </span>
        )}
        {isMythical && (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold text-purple-300 bg-purple-900/30 border border-purple-700/40">
            Mythical
          </span>
        )}
      </div>

      {/* Genus + flavor */}
      {loading && <div className="text-center text-xs text-slate-600">Loading species data…</div>}
      {genus && <p className="text-center text-[11px] text-slate-500">{genus}</p>}
      {flavorText && (
        <p className="text-[11px] text-slate-400 leading-relaxed italic border border-[#1e2038] rounded p-2 bg-[#0a0b15]">
          {flavorText}
        </p>
      )}

      {/* Attributes */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Height', value: `${(pokemon.height / 10).toFixed(1)}m` },
          { label: 'Weight', value: `${(pokemon.weight / 10).toFixed(1)}kg` },
          { label: 'Base EXP', value: pokemon.base_experience ?? '—' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-[#1a1b2e] rounded p-2">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider">{label}</div>
            <div className="text-sm font-semibold text-slate-200">{value}</div>
          </div>
        ))}
      </div>

      {/* Abilities */}
      <div>
        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5">Abilities</div>
        <div className="flex flex-wrap gap-1.5">
          {pokemon.abilities
            .sort((a, b) => a.slot - b.slot)
            .map(({ ability, is_hidden }) => (
              <span key={ability.name}
                className={`px-2 py-0.5 rounded text-[10px] capitalize ${
                  is_hidden
                    ? 'bg-[#1a1b2e] text-slate-500 border border-[#252640]'
                    : 'bg-[#1a1b2e] text-slate-300'
                }`}
              >
                {ability.name.replace(/-/g, ' ')}
                {is_hidden && <span className="text-slate-600 ml-1 text-[9px]">(hidden)</span>}
              </span>
            ))}
        </div>
      </div>

      {/* Stats */}
      <div>
        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">
          Base Stats <span className="text-slate-600 normal-case">· BST {bst}</span>
        </div>
        <div className="space-y-1.5">
          {STAT_CONFIG.map(({ key, label, color }) => {
            const val = pokemon.stats.find(s => s.stat.name === key)?.base_stat ?? 0;
            const pct = Math.round((val / 255) * 100);
            return (
              <div key={key} className="flex items-center gap-2">
                <div className="w-7 text-[10px] text-right shrink-0" style={{ color }}>{label}</div>
                <div className="w-7 text-[10px] text-right text-slate-300 font-mono tabular-nums shrink-0">{val}</div>
                <div className="flex-1 bg-[#1e2038] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function EvolutionsContent({
  evoChain, loading,
}: {
  evoChain: EvolutionChain | null;
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-slate-500 text-xs">
        Loading evolution chain…
      </div>
    );
  }
  if (!evoChain) {
    return (
      <div className="flex items-center justify-center h-40 text-slate-500 text-xs">
        Evolution data unavailable
      </div>
    );
  }
  return (
    <div className="p-4 flex justify-center overflow-x-auto">
      <EvolutionTree node={evoChain.chain} />
    </div>
  );
}

function EncountersContent({
  encounters, loading,
}: {
  encounters: LocationEncounter[] | null;
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-slate-500 text-xs">
        Loading encounter locations…
      </div>
    );
  }
  if (!encounters) {
    return (
      <div className="flex items-center justify-center h-40 text-slate-500 text-xs">
        Encounter data unavailable
      </div>
    );
  }
  if (encounters.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-slate-500 text-xs">
        Not encountered in the wild
      </div>
    );
  }

  return (
    <div className="p-3 space-y-2">
      {encounters.map((enc, i) => {
        const vd = enc.version_details[0];
        const ed = vd?.encounter_details[0];
        return (
          <div key={i} className="bg-[#1a1b2e] rounded p-2">
            <div className="text-[11px] font-medium text-slate-300 capitalize mb-1">
              {enc.location_area.name.replace(/-/g, ' ')}
            </div>
            {vd && ed && (
              <div className="flex justify-between text-[10px] text-slate-500">
                <span className="capitalize">{vd.version.name}</span>
                <span className="capitalize">
                  {ed.method.name.replace(/-/g, ' ')} · Lv.{ed.min_level}–{ed.max_level} · {vd.max_chance}%
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
