'use client';

interface HeaderProps {
  search: string;
  onSearch: (value: string) => void;
  loadedCount: number;
  totalCount: number;
}

export default function Header({ search, onSearch, loadedCount, totalCount }: HeaderProps) {
  return (
    <header className="border-b border-white/10 bg-[#090a0f]/95 px-4 py-4 shadow-2xl shadow-black/20 backdrop-blur sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 shadow-inner shadow-white/10" aria-hidden="true">
            <span className="h-4 w-4 rounded-full bg-red-500 shadow-[0_0_18px_rgba(239,68,68,0.75)]" />
          </span>
          <div className="min-w-0">
            <p className="text-lg font-bold leading-tight text-slate-50">Pokédex</p>
            <p className="text-xs text-slate-500">Browse the national collection</p>
          </div>
        </div>

        <div className="w-full max-w-xl sm:mx-6">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search by name or Pokédex number..."
              value={search}
              onChange={(event) => onSearch(event.target.value)}
              className="w-full rounded-full border border-white/10 bg-white/[0.06] py-2.5 pl-10 pr-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-yellow-300/70 focus:bg-white/[0.09] focus:ring-2 focus:ring-yellow-300/20"
            />
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 sm:block sm:text-right">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Loaded</p>
          <p className="text-sm font-bold text-slate-100">{loadedCount} / {totalCount}</p>
        </div>
      </div>
    </header>
  );
}
