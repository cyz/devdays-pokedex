# Parte 2: Frontend Focado em Design

[← Parte 1](01-setup.md)

---

Agora que engenhoramos o contexto do repositório, vamos ser criativos!

A Pokédex começa com uma interface pequena e básica para que você possa evoluí-la incrementalmente. Use o **Modo de Planejamento (Plan Mode)** para redesenhá-la e expandi-la intencionalmente.

---

## 🎨 Tarefa 1: Faça do Seu Jeito

O Modo de Planejamento (Plan Mode) é a ferramenta certa para grandes mudanças estruturais. Ele permite que você itinere no plano (2 ou mais vezes!) com ajustes e esclarecimentos antes de qualquer linha de código ser escrita física e diretamente.

**Passos:**

1. Alterne para o **Modo de Planejamento (Plan Mode)** no painel do Chat
2. Envie o prompt:
   ```
   Do a full redesign of the Pokédex UI. Make it [YOUR THEME]. Keep the starter functionality (search, card grid, and load more), and prepare component styles for future features.
   ```
   *(Substitua `[YOUR THEME]` pelo tema que você escolher na lista abaixo!)*
3. **Revise o plano cuidadosamente** — faça perguntas adicionais para esclarecer detalhes:
   - Quais componentes irão mudar?
   - Quais classes do Tailwind ou novas cores estão envolvidas?
   - Precisamos de alguma dependência nova?
4. Ajuste e refine o plano pelo menos duas vezes antes de clicar em **Implement** (Implementar)
5. Abra o navegador para ver o resultado em tempo real

**Ideias de Temas:**

- Retro Game Boy
- Cyberpunk Neon City (Cyberpunk Neon)
- Pixel Arcade Style (Fliperama Retro)
- Pastel Kawaii (Cores Pastel fofas)
- Vintage Pokémon Cards (Cartas Pokémon Antigas)
- Brutalist Blocks (Brutalismo Geométrico)
- Space Galaxy Glow (Galáxia Espacial)
- Cozy Coffee Shop (Cafeteria Aconchegante)
- Anime Bubble Aesthetic (Minimalista de Anime)
- Monochrome Newspaper (Jornal Monocromático)
- Toybox Primary Colors (Brinquedos Coloridos)
- Minimalist Mono (Minimalista Moderno)
- Retro Terminal Green (Terminal Verde Retro)
- Vaporwave Sunset (Vaporwave Pôr do Sol)
- Notebook Doodle Sketch (Desenho em Caderno de Rascunho)
- Paper Card Cutouts (Papel Recortado)
- Chalkboard Classroom (Lousa de Sala de Aula)

✅ **Resultado:** A Pokédex agora tem uma identidade visual completamente nova.

---

## 📝 Tarefa 2: Mantenha as Instruções Atualizadas

Após o redesign, atualize as instruções do repositório para que as futuras solicitações da IA estejam alinhadas com o novo sistema de design.

**Passos:**

1. No Chat, envie o prompt:
   ```
   /create-instructions design guide
   ```
   Ou:
   ```
   Update the workspace instructions to document the new design system: colors, fonts, Tailwind conventions used.
   ```
2. Revise, confirme as alterações, **faça o commit e o push**

> 💡 **Dica:** Instruções desatualizadas podem confundir o agente. Mantenha-as sempre enxutas e atualizadas com suas decisões de desenvolvimento.

---

## 🐛 Tarefa 3: Teste o Novo Design (Dogfooding)

Execute novamente a habilidade de testes (dogfooding) que você criou na Parte 1 para validar o novo design.

**Passos:**

1. Chame a habilidade com o prompt:
   ```
   Dogfood the app — focus on the new design. Does it feel cohesive? Are there any visual regressions?
   ```
2. Compare os feedbacks fornecidos com o primeiro relatório gerado na Parte 1
3. Corrija quaisquer problemas visuais ou de usabilidade críticos destacados pelo agente

✅ **Resultado:** O agente valida o redesign e ajuda você a identificar regressões visuais inconvenientes de forma automatizada.

---

## ✅ Parte 2 Concluída!

Você aprendeu a:
- Usar o **Modo de Planejamento (Plan Mode)** para mudanças complexas em múltiplos arquivos
- Iterar e refinar planos detalhados antes da fase de implementação
- Manter as instruções do repositório atualizadas com as mudanças de design
- Executar testes automatizados (dogfooding) no navegador para validar novas interfaces lógicas
