# 📚 Quick Reference — Pokédex Agent Lab

## Key VS Code Commands

| Command | What it does |
|---------|-------------|
| `Ctrl/Cmd + Shift + P` | Command Palette |
| `Ctrl/Cmd + Shift + I` | Open Chat (Agent Mode) |
| `/init` | Generate workspace instructions |
| `/new` | Create a new file with AI |

## Switching Modes

- **Ask** — Questions & explanations  
- **Edit** — Single-file edits  
- **Agent** — Autonomous multi-file tasks (use this most!)  
- **Plan** — Plan before implementing (great for big changes)

## Essential Prompts

### Context Engineering
```
/init
```
```
Summarize the codebase architecture in a concise README section
```

### Dogfooding
```
Open the running app in the browser and test it like a critical user, then write a report
```

### Design
```
Switch to Plan mode: do a full redesign with a [THEME] aesthetic. Keep the existing functionality.
```

### Features
```
Add a favorites feature: users can click a heart on any Pokémon card to save it to localStorage. Add a "Favorites" filter button to the FilterBar.
```

```
Add a "Random Pokémon" button to the Header that opens a random Pokémon in the detail panel.
```

### TDD
```
Write tests first for the team builder utility — a function that takes an array of Pokémon and returns the type coverage gaps (types with no coverage).
```

## Copilot Tips

- 🔁 **Iterate on plans** — Always tweak the plan 2+ times before implementing  
- 📌 **Pin this guide** — Right-click the tab → Pin  
- ⏪ **Checkpoints** — Copilot auto-saves checkpoints; use *Undo Last Action* on mistakes  
- 🌐 **Browser tool** — Copilot can open `localhost:3000` and actually click through the app  
- 🔀 **Parallel agents** — Start multiple chat windows for independent tasks  

## Project Structure

```
pokedex/
├── app/
│   ├── page.tsx              # Server component, fetches initial data
│   ├── layout.tsx            # Root layout
│   ├── globals.css
│   ├── api/pokemon/          # API routes
│   └── components/
│       ├── PokedexApp.tsx    # Main client component (state hub)
│       ├── Header.tsx        # Top bar
│       ├── Sidebar.tsx       # Left sidebar (generations, types)
│       ├── FilterBar.tsx     # Active filters + search
│       ├── PokemonGrid.tsx   # Grid layout wrapper
│       ├── PokemonCard.tsx   # Individual card
│       ├── ListView.tsx      # List view mode
│       ├── PokemonDetailPanel.tsx  # Right panel (stats, abilities)
│       └── TypeChart.tsx     # Type effectiveness chart
├── lib/
│   ├── api.ts        # PokeAPI fetchers
│   ├── types.ts      # TypeScript interfaces
│   └── constants.ts  # Colors, TYPE_CHART matrix, generations
├── docs/             # Workshop documentation (GitHub Pages)
└── workshop/         # Workshop step guides (this folder!)
```
