# 📚 Referência Rápida — Pokédex Agent Lab

## Principais Comandos do VS Code

| Comando | O que ele faz |
|---------|---------------|
| `Ctrl/Cmd + Shift + P` | Paleta de Comandos (Command Palette) |
| `Ctrl/Cmd + Shift + I` | Abrir Painel de Chat (Modo Agente / Agent Mode) |
| `/init` | Gerar as instruções iniciais do repositório |
| `/new` | Criar um novo arquivo utilizando IA diretamente |

## Modos de Conversa (Switching Modes)

- **Ask (Perguntar)** — Esclarecer dúvidas, explicar códigos e receber explicações  
- **Edit (Sugerir Edições)** — Fazer edições diretas em arquivos únicos  
- **Agent (Modo Agente)** — Realizar de forma autônoma tarefas complexas em múltiplos arquivos (use-o na maior parte do tempo!)  
- **Plan (Modo Planejamento)** — Planejar cuidadosamente as etapas antes de executá-las (excelente para grandes mudanças na base de código)

## Prompts Essenciais Usados no Curso

### Engenharia de Contexto
```
/init
```
```
Summarize the codebase architecture in a concise README section
```

### Testes de Experiência (Dogfooding)
```
Open the running app in the browser and test it like a critical user, then write a report
```

### Design
```
Switch to Plan mode: do a full redesign with a [TEMA] aesthetic. Keep the existing functionality.
```

### Funcionalidades
```
Add a favorites feature: users can click a heart on any Pokémon card to save it to localStorage. Add a "Favorites" filter button to the header or to a new filter bar component.
```

```
Add a "Random Pokémon" button to the header that highlights or opens a random Pokémon from the loaded list.
```

### TDD (Test-Driven Development)
```
Write tests first for the team builder utility — a function that takes an array of Pokémon and returns the type coverage gaps (types with no coverage).
```

## Dicas do Copilot

- 🔁 **Itere sobre os planos** — Sempre ajuste o plano gerado pelo menos 2 vezes antes de clicar em implementar  
- 📌 **Fixe este guia** — Clique com o botão direito na aba → clicar em Fixar (Pin)  
- ⏪ **Checkpoints** — O Copilot cria pontos de restauração automaticamente antes de cada alteração; use a opção *Undo Last Action* para desfazer erros  
- 🌐 **Navegador Integrado** — O Copilot consegue abrir `localhost:3000` na própria janela ou em background e interagir de verdade com cliques na sua interface  
- 🔀 **Agentes em Paralelo** — Siga abrindo múltiplas janelas paralelas de chat para focar em tarefas independentes  

## Estrutura do Projeto

```text
pokedex/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Componente de servidor (Server Component), busca de dados iniciais
│   │   ├── layout.tsx            # Layout raiz (Root Layout)
│   │   ├── globals.css
│   │   ├── api/pokemon/          # Rota da API REST para Pokémon
│   │   └── components/
│   │       ├── PokedexApp.tsx    # Gerenciamento de estado inicial da Pokédex
│   │       ├── Header.tsx        # Barra de topo, busca e cabeçalho principal
│   │       └── PokemonCard.tsx   # Visual individual do cartão de Pokémon
│   └── lib/
│       ├── api.ts        # Utilitários de busca na PokéAPI
│       ├── types.ts      # Interfaces e definições do TypeScript
│       └── constants.ts  # Constantes compartilhadas pelo projeto
├── docs/                 # Documentação do workshop (publicada via GitHub Pages)
└── workshop/             # Guias passo a passo do workshop (esta pasta que você está lendo!)
```
