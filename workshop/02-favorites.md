# Parte 2: Favoritos e Descoberta

[← Parte 1](01-setup.md)

---

Chegou a hora de adicionar seu primeiro recurso de verdade! Nesta etapa, você irá implementar um sistema de **Favoritos** e um botão de **Pokémon Aleatório** usando o Modo de Planejamento (Plan Mode), persistência no `localStorage` e a atualização de sua skill de testes customizada.

---

## ❤️ Tarefa 1: Recurso de Favoritos

Os usuários devem conseguir marcar qualquer Pokémon com um coração e filtrar a lista para ver apenas os seus favoritos. Os favoritos devem persistir mesmo se recarregarmos a página (`localStorage`).

Desta vez, em vez de fornecermos um prompt gigante pré-pronto, você usará o **Modo de Planejamento (Plan Mode)** de forma ativa para projetar o recurso junto com a IA!

**Passos:**

1. Alterne para o **Modo de Planejamento (Plan Mode)** no painel do Chat.
2. Descreva de forma livre e objetiva para o agente o que você deseja construir:
   - Queremos um recurso de favoritos na Pokédex.
   - Deve ter um botão de coração em cada card de Pokémon para favoritar.
   - Os cliques devem alternar o estado do favorito e salvar/persistir no `localStorage` do navegador.
   - Precisamos de um botão ou filtro "❤️ Favoritos" no topo/cabeçalho para aplicar o filtro e mostrar apenas os favoritos quando estiver ativo.
3. No Chat, **deixe o agente criar a primeira versão do plano** e listar quais arquivos ele precisará editar.
4. **Refine o plano!** Peça mais detalhes ou faça ajustes:
   - *"Como podemos gerenciar o estado globalmente e no localStorage de forma unificada?"*
   - *"Crie um hook customizado `useFavorites` em `src/lib/useFavorites.ts` para separar a lógica de persistência do componente de tela."*
5. Após aprovar e validar o plano completo do agente (ajustado pelo menos duas vezes!), clique em **Implement** (Implementar) no painel do chat.
6. Abra o navegador para ver o recurso de favoritos funcionando na Pokédex!

✅ **Resultado:** Usuários podem favoritar seus Pokémon de forma elegante, salvando o estado diretamente no navegador do usuário.

---

## 🎲 Tarefa 2: Botão de Pokémon Aleatório

Muitas vezes os usuários só querem descobrir algo novo e divertido.

**Passos:**

1. Envie o prompt no Chat:
   ```
   Adicione um botão "🎲 Aleatório" (Random) ao cabeçalho (Header). Clicar nele deve:
   - Escolher um Pokémon aleatório da lista carregada atualmente
   - Destacar/selecionar o Pokémon (mesmo comportamento de quando clicamos em um card)
   - Se nenhum Pokémon estiver carregado, escolher um ID aleatório entre 1 e 1025 e buscá-lo (fetch)
   ```
2. Teste o botão — clique em "Random" múltiplas vezes e certifique-se de que ele seleciona um Pokémon diferente a cada clique

✅ **Resultado:** Um recurso simples e encantador de descoberta com apenas um clique.

---

## 🤖 Tarefa 3: Atualizar a Habilidade de Dogfooding de Pokémon

Agora que temos esses dois novos recursos lógicos, vamos atualizar a habilidade customizada de dogfooding que criamos na Parte 1 para testá-los especificamente.

**Passos:**

1. Mantenha o Chat no **Modo Agente (Agent Mode)**.
2. Envie o prompt para atualizar a skill:
   ```
   Atualize as instruções da nossa skill de dogfooding para também testar sistematicamente as novas funcionalidades de favoritos e o botão de Pokémon aleatório. A skill deve validar se os favoritos persistem no localStorage e se o botão aleatório realmente destaca um Pokémon diferente de forma interativa.
   ```
3. Deixe o agente processar e atualizar a skill nas customizações do repositório.
4. Execute a habilidade atualizada enviando o prompt:
   ```
   Execute a skill de dogfooding para testar o aplicativo e validar as novas funcionalidades
   ```
5. Leia o relatório analítico do agente e peça para ele corrigir qualquer detalhe de comportamento ou usabilidade que ele encontrar de forma autônoma.

✅ **Resultado:** Sua habilidade de dogfooding agora está expandida e é capaz de testar as novas interações lógicas do seu app de forma robusta e automática!

> 💡 **Pobre sobre:** Quando seu projeto real evolui, atualizar suas habilidades de teste automatizadas garante que você nunca perca usabilidade com novos lançamentos de código!

---

## 🔍 Tarefa 4 (Bônus): Melhorias na Busca

A busca original apenas filtra Pokémon que já foram carregados na memória. Podemos fazer melhor?

**Passos:**

1. Envie o prompt no Chat (mude para o **Modo de Planejamento / Plan Mode** primeiro):
   ```
   Melhore a busca: se o termo de pesquisa não corresponder a nenhum Pokémon carregado, busque automaticamente na PokeAPI pelo nome ou ID e adicione o resultado à lista.
   ```
2. Revise o plano sugerido — a estratégia é boa? Quais são os casos extremos (edge cases)?
3. Implemente e teste buscando por um Pokémon por nome que não apareceu nas primeiras 40 posições.

---

## ✅ Parte 2 Concluída!

Você aprendeu a:
- Implementar recursos que interagem com o `localStorage` usando hooks personalizados desenvolvidos de forma ágil
- Adicionar recursos de descoberta de elementos (como Pokémon aleatório)
- Atualizar e expandir agentes de testes customizados dedicados ao domínio da aplicação
- Usar o Modo de Planejamento de forma ativa e autônoma para estruturar e prever a complexidade de um recurso antes de codificar
