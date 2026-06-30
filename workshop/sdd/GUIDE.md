# 📚 Referência Rápida — Trilha SDD

Um guia de consulta rápida para o fluxo de Spec-Driven Development com primitivos nativos do VS Code.

---

## 🧩 Os Primitivos Nativos do VS Code

| Primitivo | Arquivo | Papel no SDD |
|-----------|---------|--------------|
| **AGENTS.md** | `AGENTS.md` (raiz) | Constituição: princípios que valem para todo o projeto |
| **Instruções** | `.github/instructions/*.instructions.md` | Regras escopadas por `applyTo` (ex.: só arquivos `.tsx`) |
| **Prompt files** | `.github/prompts/*.prompt.md` | Workflows reutilizáveis chamados com `/nome` |
| **Custom agents** | `.github/agents/*.agent.md` | Personas especializadas com ferramentas e foco próprios |
| **Specs** | `specs/<feature>/` | Artefatos gerados: `spec.md`, `plan.md`, `tasks.md` |

---

## 🔁 O Fluxo SDD ↔ Spec Kit

| Fase do Spec Kit | Comando original | Equivalente nativo neste curso |
|------------------|------------------|--------------------------------|
| Constituição | `/speckit.constitution` | `AGENTS.md` + `.github/instructions/` |
| Especificar | `/speckit.specify` | prompt file `/specify` → `specs/<f>/spec.md` |
| Esclarecer | `/speckit.clarify` | Plan Mode ou prompt file `/clarify` |
| Planejar | `/speckit.plan` | prompt file `/plan` → `specs/<f>/plan.md` |
| Tarefas | `/speckit.tasks` | prompt file `/tasks` → `specs/<f>/tasks.md` |
| Analisar | `/speckit.analyze` | prompt file `/analyze` (consistência) |
| Implementar | `/speckit.implement` | custom agent `implementer` + Agent Mode |

---

## ⌨️ Comandos e Ações Úteis

| Ação | Como fazer |
|------|-----------|
| Abrir customizações | `Chat: Open Customizations (Preview)` |
| Gerar instruções base | `/init` no Modo Agente |
| Criar prompt file | `Chat: New Prompt File` |
| Criar custom agent | `Chat: New Agent File` |
| Chamar um prompt file | Digite `/nome-do-prompt` no chat |
| Chamar um custom agent | Selecione no seletor ou `@Nome do Agente` |
| Entrar no Plan Mode | Selecione **Plan** no seletor de modo do chat |

---

## 📝 Anatomia dos Arquivos

### AGENTS.md (sem frontmatter)
```markdown
# Nome do Projeto — Constituição

## Princípios
- Princípio 1...

## Stack e Convenções
- Next.js 15 (App Router), TypeScript estrito, Tailwind...

## Checklist obrigatório
- [ ] `npm run lint`
- [ ] `npm test`
```

### Prompt file (`.github/prompts/specify.prompt.md`)
```markdown
---
mode: agent
description: Gera uma especificação a partir de uma ideia de feature
---
Você é um analista de produto. A partir da ideia do usuário, gere
`specs/<feature>/spec.md` com: objetivo, histórias de usuário,
critérios de aceite e fora-de-escopo. Foque no QUÊ e no PORQUÊ,
nunca em tecnologia.
```

### Instrução escopada (`.github/instructions/react.instructions.md`)
```markdown
---
applyTo: "src/**/*.tsx"
---
- Componentes funcionais com hooks
- Tailwind para estilo; sem CSS inline
```

### Custom agent (`.github/agents/planner.agent.md`)
```markdown
---
description: Transforma uma spec aprovada em um plano técnico
tools: ['codebase', 'search']
---
Você é um arquiteto. Leia `specs/<feature>/spec.md` e produza
`plan.md` com decisões de stack, arquivos afetados e riscos.
```

---

## ✅ Checklist de Qualidade de uma Spec

- [ ] Descreve o **quê** e o **porquê**, não o **como**
- [ ] Tem critérios de aceite verificáveis
- [ ] Lista explicitamente o que está **fora de escopo**
- [ ] Não contém `[NEEDS CLARIFICATION]` pendentes
- [ ] É pequena o suficiente para implementar em uma sessão

---

## 🗂️ Estrutura de `specs/`

```
specs/
  shiny-toggle/
    spec.md
    plan.md
    tasks.md
  type-filter/
    spec.md
    ...
```

> 💡 **Dica:** versione a pasta `specs/` no Git. Ela é a memória viva das decisões do projeto.
