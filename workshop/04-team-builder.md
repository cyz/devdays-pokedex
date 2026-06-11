# Parte 4: Construtor de Equipes (Team Builder)

[← Parte 3](03-favorites.md)

---

Nesta parte final, você construirá um **Construtor de Equipes (Team Builder)** — uma funcionalidade que permite aos usuários montar uma equipe de até 6 Pokémon e analisar a cobertura de tipos combinada deles. Você usará **agentes de TDD** e **agentes paralelos** para construir isso de forma rápida e confiável.

---

## 🧪 Tarefa 1: TDD — Escrever os Testes Primeiro

Antes de escrever qualquer código de implementação, defina o comportamento esperado da funcionalidade por meio de testes unitários.

**Passos:**

1. Em uma nova janela de conversa no Chat (modo Agente / Agent Mode), envie o prompt:
   ```
   Write unit tests (Jest) for a team builder utility module at `src/lib/teamUtils.ts`.
   The module should export:
   - `addToTeam(team: Pokemon[], pokemon: Pokemon): Pokemon[]` — adds if team < 6, no duplicates
   - `removeFromTeam(team: Pokemon[], pokemonId: number): Pokemon[]`
   - `getTypeCoverage(team: Pokemon[]): string[]` — returns all unique types covered by the team
   - `getCoverageGaps(team: Pokemon[]): string[]` — returns types NOT covered by any team member
   Write thorough tests using mock Pokémon data. Do NOT implement the functions yet.
   ```
   
   > 💡 **Dica de TypeScript:** A interface `Pokemon` em `src/lib/types.ts` é complexa. Ao escrever os mocks de teste, você ou o agente podem usar coerção de tipo (por exemplo, `const mockPoke = { id: 1, name: 'bulbasaur', types: [...] } as Pokemon`) para simplificar a criação de dados de testes sem a necessidade de definir todas as propriedades aninhadas da API.

2. Revise o arquivo de testes gerado — todos os limites e casos de borda estão cobertos?
3. Execute os testes (eles devem **falhar** — e isso é totalmente esperado neste momento!):
   ```bash
   npm test
   ```

✅ **Resultado:** Testes "vermelhos" (falhando) definem o contrato. Agora, vamos implementar a lógica para fazê-los passar.

---

## 🟢 Tarefa 2: Implementar para Corrigir os Testes

**Passos:**

1. Em uma **segunda janela de conversa do Chat** (rode em paralelo!), envie o prompt:
   ```
   Implement `src/lib/teamUtils.ts` to make all the tests in `src/lib/teamUtils.test.ts` pass. Do not modify the test file.
   ```
2. Execute os testes novamente:
   ```bash
   npm test
   ```
3. Se algum teste ainda falhar, forneça a mensagem de erro ao agente:
   ```
   The following tests are failing: [cole as mensagens de erro aqui]. Fix the implementation only, not the tests.
   ```

✅ **Resultado:** Testes "verdes" (passando!). A lógica do seu utilitário está verificada e é 100% confiável.

---

## 🏗️ Tarefa 3: Construir a Interface do Construtor de Equipes

Com a lógica utilitária testada e aprovada, desenvolva o componente visual.

**Passos:**

1. Mude para o **Modo de Planejamento (Plan Mode)** e envie o prompt:
   ```
   Plan a Team Builder feature:
   - A "➕ Add to Team" button on each PokemonCard (disabled when team has 6 Pokémon or Pokémon is already on team)
   - A persistent Team Panel (bottom bar or side panel) showing up to 6 Pokémon sprites
   - Type coverage visualization — show which types the team covers and which are gaps
   - A "Clear Team" button
   Use the functions in src/lib/teamUtils.ts for all logic.
   ```
2. Revise e faça ajustes no plano sugerido (pergunte: *"Como o painel de times irá se integrar com o layout atual?"*)
3. Implemente as alterações

✅ **Resultado:** Os usuários agora podem montar e analisar equipes de Pokémon com relatórios instantâneos de fraquezas e coberturas de tipo.

---

## 🔀 Tarefa 4: Agentes Paralelos

Execute dois agentes simultaneamente em tarefas independentes para concluir as tarefas mais rápido.

**Passos:**

1. **Janela de Chat do Agente 1:** Envie o prompt:
   ```
   Add keyboard shortcut support to the Team Builder: pressing 'T' toggles the Team Panel visibility, 'Delete' or 'Backspace' removes the last added Pokémon from the team.
   ```
2. **Janela de Chat do Agente 2:** Envie o prompt (em paralelo com o anterior!):
   ```
   Add a "Share Team" button that copies a URL to the clipboard with the team's Pokémon IDs as query params (e.g., ?team=1,4,7,25,39,52). When the page loads with a ?team= param, pre-populate the team.
   ```
3. Junte as duas alterações e execute `npm run build` para confirmar se não há erros de compilação ou de linting

> 💡 **Lição sobre agentes em paralelo:** Recursos independentes que mexem em arquivos isolados são perto de perfeitos para paralelismo. Recursos que modificam o mesmo estado ou componente devem ser feitos sequencialmente.

---

## ✅ Parte 4 Concluída!

Você aprendeu a:
- Usar **agentes lógicos de TDD** seguindo o ciclo clássico Vermelho-Verde-Refatoração
- Executar **processos em paralelo** usando multi-agentes para trechos independentes de código
- Combinar lógica de utilitários isolados e componentes de UI sob uma cobertura sólida de testes
- Compartilhar estados de equipe via parâmetros de busca (query parameters) na URL
