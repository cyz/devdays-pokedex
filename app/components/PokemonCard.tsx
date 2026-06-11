import Image from 'next/image';
import type { Pokemon } from '@/lib/types';
import { TYPE_COLORS } from '@/lib/constants';

interface Props {
  pokemon: Pokemon;
  isSelected?: boolean;
  isCaught?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export default function PokemonCard({
  pokemon,
  isSelected = false,
  isCaught = true,
  isFavorite = false,
  onToggleFavorite,
}: Props) {
  const spriteUrl = pokemon.sprites.front_default ?? pokemon.sprites.other['official-artwork'].front_default;

  return (
    <div
      className={`relative rounded-xl p-3 cursor-pointer select-none transition-all duration-150 hover:scale-[1.02] ${
        isSelected
          ? 'bg-[#1a2040] border border-blue-500 shadow-lg shadow-blue-500/20'
          : 'bg-[#1a1b2e] border border-[#252640] hover:border-[#353760]'
      }`}
    >
      {/* Number + caught dot */}
      <div className="flex justify-between items-start mb-1">
        <span className="text-[10px] text-slate-600 font-mono">#{String(pokemon.id).padStart(3, '0')}</span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.();
            }}
            aria-label={isFavorite ? `Unfavorite ${pokemon.name}` : `Favorite ${pokemon.name}`}
            className={`rounded p-0.5 transition-colors ${
              isFavorite ? 'text-amber-300 hover:text-amber-200' : 'text-slate-600 hover:text-slate-300'
            }`}
          >
            <svg viewBox="0 0 20 20" className="w-3.5 h-3.5" fill={isFavorite ? 'currentColor' : 'none'}>
              <path
                d="M10 2.5l2.32 4.7 5.18.75-3.75 3.66.89 5.17L10 14.35 5.36 16.78l.89-5.17L2.5 7.95l5.18-.75L10 2.5z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {isCaught && (
            <span
              className="w-2 h-2 rounded-full bg-blue-400 shrink-0"
              style={{ boxShadow: '0 0 5px #60a5fa' }}
            />
          )}
        </div>
      </div>

      {/* Sprite */}
      <div className="flex justify-center items-center h-24 mb-2">
        {spriteUrl ? (
          <Image
            src={spriteUrl}
            alt={pokemon.name}
            width={96}
            height={96}
            className="object-contain"
            style={{ imageRendering: 'pixelated' }}
            unoptimized
          />
        ) : (
          <div className="w-24 h-24 flex items-center justify-center text-slate-700 text-3xl">?</div>
        )}
      </div>

      {/* Name */}
      <p className="text-center text-sm font-semibold text-slate-200 capitalize mb-1.5">{pokemon.name}</p>

      {/* Types */}
      <div className="flex justify-center gap-1 flex-wrap mb-1.5">
        {pokemon.types.map(({ type }) => (
          <span
            key={type.name}
            className="px-2 py-0.5 rounded text-[10px] font-bold text-white capitalize"
            style={{ backgroundColor: TYPE_COLORS[type.name] ?? '#6b7280' }}
          >
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </span>
        ))}
      </div>
    </div>
  );
}
