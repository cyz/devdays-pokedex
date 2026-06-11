# 🔴 Pokédex Agent Lab (TypeScript Starter)

This repo now follows an **agent-lab-typescript**-style starter layout: the app is intentionally minimal so developers build features step by step during the workshop.

**[🚀 Start Workshop →](https://OWNER.github.io/REPO/)**

> Update links after publishing your fork/repo.

## Starter Scope

The app includes only:

1. Initial Pokémon fetch
2. Search by name/id
3. Card grid + selection state
4. Pagination ("Load more")

Everything else is built during the lab (favorites, random discovery, team builder, sharing, etc).

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- PokeAPI

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Workshop Docs

```bash
npm run serve-docs
```

Then open `http://localhost:4000/docs/`.

## Project Structure

```text
pokedex/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── api/pokemon/route.ts
│   │   └── components/
│   │       ├── Header.tsx
│   │       ├── PokedexApp.tsx
│   │       └── PokemonCard.tsx
│   └── lib/
│       ├── api.ts
│       ├── constants.ts
│       └── types.ts
├── workshop/
├── docs/
└── package.json
```
