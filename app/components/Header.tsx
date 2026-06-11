'use client';

interface HeaderProps {
  search: string;
  onSearch: (v: string) => void;
  caughtCount: number;
  totalCount: number;
}

export default function Header({ search, onSearch, caughtCount, totalCount }: HeaderProps) {
  return (
    <header className="flex items-center h-12 px-4 bg-[#0a0b15] border-b border-[#1e2038] shrink-0 gap-3">
      {/* Hamburger */}
      <button className="text-slate-500 hover:text-slate-300 shrink-0">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Pokeball logo */}
      <div className="relative w-6 h-6 shrink-0">
        <div className="w-6 h-6 rounded-full border-2 border-slate-500 overflow-hidden bg-red-500 relative">
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-white border-2 border-slate-400 z-10" />
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="flex items-center gap-1.5 shrink-0 mr-2">
        <span className="text-sm font-bold text-slate-200">Pokédex</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-sm mx-auto">
        <div className="relative">
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search Pokémon..."
            value={search}
            onChange={e => onSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#1a1b2e] border border-[#2a2d4a] rounded-lg text-slate-200 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 ml-auto shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Caught</span>
          <span className="text-sm font-bold text-blue-400">{caughtCount}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Total</span>
          <span className="text-sm font-bold text-slate-200">{totalCount}</span>
        </div>
      </div>
    </header>
  );
}
