# Parte 3: Construtor de Equipes (Team Builder)

[← Parte 2](02-favorites.md)

---

Nesta parte, você construirá um **Construtor de Equipes (Team Builder)** — uma funcionalidade que permite aos usuários montar uma equipe de até 6 Pokémon e analisar a cobertura de tipos combinada deles. 

Para tornar o desenvolvimento resiliente e profissional, usaremos **Test-Driven Development (TDD)** de forma 100% automatizada e orquestrada por uma equipe de **Custom Agents** que já deixamos pré-configurados no seu repositório.

---

## 🤖 Os Agentes Customizados no Projeto

Sob a pasta `.github/agents/`, existem quatro agentes dedicados para essa tarefa:
- **TDD Supervisor**: O orquestrador central do ciclo. Ele analisa suas instruções e gerencia os demais subagentes.
- **TDD Red**: Especialista em escrever suites de testes abrangentes que assinalam falhas no estado de código inicial.
- **TDD Green**: Especialista em consertar testes quebrando com a menor dose de código necessária.
- **TDD Refactor**: Analisa o código que já passou nos testes e sugere melhorias de arquitetura/arquivos sem quebrar o comportamento.

---

## 🧪 Tarefa 1: O Ciclo TDD Completo com o TDD Supervisor

Você irá descrever a regra de negócio do nosso utilitário e do algoritmo de types para o orquestrador e deixá-lo realizar a mágica!

**Passos:**

1. Abra uma nova janela de Chat e mude para o **Modo Agente (Agent Mode)**.
2. Invoque o agente Supervisor digitando o seu nome ou use o `@` (por exemplo: escrevendo `@TDD Supervisor` ou selecionando-o).
3. Envie o seguinte prompt de instruções para ele:
   ```markdown
   Crie o módulo utilitário do construtor de equipes em `src/lib/teamUtils.ts` seguindo o ciclo TDD:
   - `addToTeam(team: Pokemon[], pokemon: Pokemon): Pokemon[]` — adiciona se a equipe < 6, sem duplicatas
   - `removeFromTeam(team: Pokemon[], pokemonId: number): Pokemon[]`
   - `getTypeCoverage(team: Pokemon[]): string[]` — retorna todos os tipos únicos cobertos pela equipe
   - `getCoverageGaps(team: Pokemon[]): string[]` — retorna os tipos NÃO cobertos por nenhum membro da equipe (veja a lista completa de tipos disponíveis no arquivo `src/lib/constants.ts`)

   Use tipos e mocks de teste limpos. Execute o ciclo completo!
   ```
4. **Assista à Orquestração:**
   - O **TDD Supervisor** chamará o **TDD Red** para gerar os testes falhando em `src/lib/teamUtils.test.ts`.
   - Em seguida, ele chamará o executor de testes para validar o erro.
   - Depois, o **TDD Green** entrará em campo criando as funções em `src/lib/teamUtils.ts`.
   - O executor de testes rodará de novo para garantir o "verde".
   - Por fim, o **TDD Refactor** poderá sugerir ajustes elegantes.
5. Verifique manualmente rodando os testes no seu terminal para comemorar:
   ```bash
   npm test
   ```

✅ **Resultado:** Todo o motor de regras de negócio do Construtor de Times criado no fluxo correto de TDD de forma transparente e 100% autônoma!

---

## 🏗️ Tarefa 2: Construir a Interface do Construtor de Equipes

Com a lógica utilitária testada e aprovada, desenvolva o componente visual.

**Passos:**

1. Mude para o **Modo de Planejamento (Plan Mode)** no chat do Copilot.
2. Envie o prompt:
   ```markdown
   Planeje e implemente um recurso de Construtor de Equipes (Team Builder) integrado à Pokédex:
   - Um botão "➕ Adicionar à Equipe" em cada PokemonCard (desativado quando a equipe já tiver 6 Pokémon ou o Pokémon já estiver na equipe)
   - Um Painel de Equipe persistente (barra inferior ou painel lateral) mostrando as imagens (sprites) de até 6 Pokémon
   - Visualização de cobertura de tipos — mostra quais tipos a equipe cobre e quais são as lacunas (gaps) calculadas
   - Um botão "Limpar Equipe" (Clear Team)
   Use as funções em src/lib/teamUtils.ts para toda a lógica.
   ```
3. Revise e faça ajustes no plano sugerido (pergunte: *"Como o painel de times irá se integrar com o layout atual?"*)
4. Clique em **Implement** (Implementar) no Chat e assista ao agente integrar com perfeição visual!

✅ **Resultado:** Os usuários agora podem montar e analisar equipes de Pokémon com relatórios instantâneos de fraquezas e coberturas de tipo.

---

## ✅ Parte 3 Concluída!

Você aprendeu a:
- Utilizar **orquestração de múltiplos agentes especializados (Multi-Agent System)** para automação de TDD
- Criar regras complexas de tipos do Pokémon sob um barramento sólido de testes Jest
- Desenvolver interfaces ricas baseadas em Tailwind e integradas com estados lógicos e funções testadas utilitárias
- Validar builds de produção do Next.js sem nenhum erro de tipagem!
