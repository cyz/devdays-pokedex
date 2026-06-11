# Parte 3: Favoritos e Descoberta

[← Parte 2](02-design.md)

---

Chegou a hora de adicionar seu primeiro recurso de verdade! Nesta etapa, você irá implementar um sistema de **Favoritos** e um botão de **Pokémon Aleatório** usando agentes customizados e persistência no `localStorage`.

---

## ❤️ Tarefa 1: Recurso de Favoritos

Os usuários devem conseguir marcar qualquer Pokémon com um coração e filtrar a lista para ver apenas os seus favoritos. Os favoritos devem persistir mesmo se recarregarmos a página (`localStorage`).

**Passos:**

1. Mude para o **Modo Agente (Agent Mode)** no painel do Chat
2. Envie o prompt:
   ```
   Add a favorites feature to the Pokédex:
   - Add a heart/bookmark icon button to each PokemonCard
   - Clicking the icon toggles the Pokémon as a favorite
   - Persist favorites to localStorage (use the Pokémon ID as the key)
   - Add a "❤️ Favorites" filter button to the app header or a new filter bar component
   - When the favorites filter is active, only show favorited Pokémon
   ```
3. Deixe o agente implementar a base lógica através dos arquivos `src/app/components/PokemonCard.tsx` e `src/app/components/PokedexApp.tsx` (e criar novos componentes ou arquivos se achar necessário)
4. Teste a funcionalidade no navegador: adicione alguns Pokémon aos favoritos, aplique o filtro e atualize a página

> 💡 **Dica:** Se o agente tiver dificuldades em criar os ganchos do localStorage, guie-o: *"Create a `useFavorites` custom hook in `src/lib/useFavorites.ts`"*

✅ **Resultado:** Usuários podem favoritar seus Pokémon e vê-los salvos mesmo após reiniciar a página.

---

## 🎲 Tarefa 2: Botão de Pokémon Aleatório

Muitas vezes os usuários só querem descobrir algo novo e divertido.

**Passos:**

1. Envie o prompt no Chat:
   ```
   Add a "🎲 Random" button to the Header. Clicking it should:
   - Pick a random Pokémon from the currently loaded list
   - Open it in the detail panel (same as clicking a card)
   - If no Pokémon are loaded, pick a random ID between 1-1025 and fetch it
   ```
2. Teste o botão — clique em "Random" múltiplas vezes e certifique-se de que ele abre um Pokémon diferente a cada clique

✅ **Resultado:** Um recurso simples e encantador de descoberta com apenas um clique.

---

## 🤖 Tarefa 3: Criar um Agente de Testes de Pokémon

Agora que temos esses dois novos recursos lógicos, vamos salvar uma habilidade customizada de IA para testá-los especificamente.

**Passos:**

1. Envie o prompt:
   ```
   /create-skill for testing Pokémon features — favorites, filters, the detail panel, and the random button. The skill should open localhost:3000, systematically test each feature, and report any bugs or UX issues.
   ```
2. Execute a nova habilidade enviando o prompt:
   ```
   Use the Pokémon testing skill to validate the new favorites and random features
   ```
3. Leia o relatório do agente e peça para ele corrigir qualquer bug ou detalhe de usabilidade que ele encontrar

> 💡 **Pense sobre:** Quais outros agentes lógicos de testes você poderia criar para seus projetos de trabalho no dia a dia?

---

## 🔍 Tarefa 4 (Bônus): Melhorias na Busca

A busca atual apenas filtra Pokémon que já foram carregados na memória. Podemos fazer melhor?

**Passos:**

1. Envie o prompt (mude para o **Modo de Planejamento / Plan Mode** primeiro):
   ```
   Improve the search: if the search query doesn't match any loaded Pokémon, automatically fetch from the PokeAPI by name or ID and add the result to the list.
   ```
2. Revise o plano sugerido — a estratégia é boa? Quais são os casos extremos (edge cases)?
3. Implemente e teste buscando por um Pokémon por nome que não apareceu nas primeiras 40 posições

---

## ✅ Parte 3 Concluída!

Você aprendeu a:
- Implementar recursos que interagem com o `localStorage` usando hooks personalizados
- Adicionar recursos de descoberta de elementos (como Pokémon aleatório)
- Criar agentes de testes customizados dedicados ao domínio da aplicação
- Usar o Modo de Planejamento para estruturar e prever a complexidade de um recurso antes de codificar
