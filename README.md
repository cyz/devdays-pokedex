# 🔴 Pokédex Agent Lab

A hands-on workshop where you add features to a fully working Pokédex while mastering **VS Code's Agent Mode** with GitHub Copilot.

**[🚀 Start Workshop →](https://OWNER.github.io/REPO/)**

> Update the links above after pushing to GitHub and enabling GitHub Pages.

---

## What You'll Build

Starting from a working Next.js Pokédex with search, filters, and a type chart, you'll use AI agents to add:

- 🧠 **Workspace instructions** via context engineering
- 🎨 **Full UI redesign** using Plan Mode
- ❤️ **Favorites** with localStorage persistence  
- 🎲 **Random Pokémon** discovery button
- 🏆 **Team Builder** with type coverage analysis (TDD!)
- 🔀 **Shareable team URLs** via parallel agents

---

## Tech Stack

- [Next.js 15](https://nextjs.org/) — React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) — type safety throughout
- [Tailwind CSS 3](https://tailwindcss.com/) — utility-first styling
- [PokeAPI](https://pokeapi.co/) — the Pokémon REST API

---

## Getting Started

### Prerequisites

- VS Code v1.107+
- GitHub Copilot (Free tier works for most features; Business/Enterprise for cloud agent)
- Node.js 22+
- Git

### Setup

```bash
# 1. Use this template or clone
git clone https://github.com/OWNER/REPO my-pokedex
cd my-pokedex

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the Pokédex is ready.

---

## Workshop Documentation

The workshop guide lives in `docs/` and is served via GitHub Pages.

To preview locally:

```bash
# Serves from repo root so relative ../workshop/ paths resolve correctly
npm run serve-docs
# Then open: http://localhost:4000/docs/
```

Alternatively, open `docs/index.html` with the **VS Code Live Server** extension (serves from workspace root).

After pushing to GitHub:
1. Go to **Settings** → **Pages**
2. Set source to **GitHub Actions**
3. The docs will be live at `https://{username}.github.io/{repo}/`

> **Note:** Update the `GITHUB_RAW_BASE` URL in `docs/step.html` and the repo links in `docs/index.html` with your actual GitHub username and repo name.

---

## Project Structure

```
pokedex/
├── app/
│   ├── page.tsx              # Server component — fetches initial data
│   ├── layout.tsx
│   ├── globals.css
│   ├── api/pokemon/          # API routes
│   └── components/
│       ├── PokedexApp.tsx    # Main client component (state hub)
│       ├── Header.tsx
│       ├── Sidebar.tsx       # Generation + type filters
│       ├── FilterBar.tsx     # Active filters display + search
│       ├── PokemonGrid.tsx
│       ├── PokemonCard.tsx
│       ├── ListView.tsx
│       ├── PokemonDetailPanel.tsx
│       └── TypeChart.tsx
├── lib/
│   ├── api.ts        # PokeAPI fetchers
│   ├── types.ts      # TypeScript interfaces
│   └── constants.ts  # Colors, TYPE_CHART matrix, generation ranges
├── docs/             # Workshop docs (GitHub Pages)
└── workshop/         # Workshop step guides (Markdown)
```

---

## License

MIT — see [LICENSE](LICENSE)
