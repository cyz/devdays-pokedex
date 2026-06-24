import Image from 'next/image';
import type { Pokemon } from '@/lib/types';
import { TYPE_COLORS } from '@/lib/constants';

interface Props {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: Props) {
  const spriteUrl = pokemon.sprites.other['official-artwork'].front_default ?? pokemon.sprites.front_default;
  const primaryType = pokemon.types[0]?.type.name;
  const accentColor = TYPE_COLORS[primaryType ?? ''] ?? '#94a3b8';

  return (
    <div
      className="group relative overflow-hidden rounded-3xl border bg-[#12131b]/95 p-4 shadow-xl shadow-black/20 transition duration-200 hover:-translate-y-1 hover:shadow-2xl focus-within:ring-2 focus-within:ring-white/40"
      style={{
        borderColor: `${accentColor}55`,
        background: `linear-gradient(160deg, ${accentColor}20 0%, rgba(18, 19, 27, 0.96) 36%, rgba(10, 11, 16, 0.98) 100%)`,
      }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-8 h-28 w-28 -translate-x-1/2 rounded-full opacity-40 blur-2xl transition duration-200 group-hover:opacity-60"
        style={{ backgroundColor: accentColor }}
      />

      <div className="relative flex items-start justify-between">
        <span className="font-mono text-[11px] font-semibold text-slate-400">#{String(pokemon.id).padStart(4, '0')}</span>
        {primaryType && (
          <span
            className="rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/90"
            style={{ borderColor: `${accentColor}80`, backgroundColor: `${accentColor}33` }}
          >
            {primaryType}
          </span>
        )}
      </div>

      <div className="relative my-3 flex h-32 items-center justify-center">
        {spriteUrl ? (
          <Image
            src={spriteUrl}
            alt={pokemon.name}
            width={132}
            height={132}
            className="h-32 w-32 object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.45)] transition duration-200 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-white/5 text-4xl text-slate-700">?</div>
        )}
      </div>

  <p className="relative text-center text-lg font-bold capitalize leading-tight text-slate-50">{pokemon.name}</p>

      <div className="relative mt-3 flex flex-wrap justify-center gap-1.5">
        {pokemon.types.map(({ type }) => (
          <span
            key={type.name}
            className="rounded-full px-2.5 py-1 text-[10px] font-bold capitalize text-white shadow-sm shadow-black/20"
            style={{ backgroundColor: TYPE_COLORS[type.name] ?? '#6b7280' }}
          >
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </span>
        ))}
      </div>
    </div>
  );
}
