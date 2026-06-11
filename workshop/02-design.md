# Part 2: Design-First Frontend

[← Part 1](01-setup.md)

---

Now that we've engineered the repo context, let's get creative.

The Pokédex already has a polished dark UI — but you can push it much further. Use Plan Mode to plan a full redesign before touching a single line of code.

---

## 🎨 Task 1: Make It Yours

Plan Mode is the right tool for large, cross-cutting changes. It lets you iterate on the plan (2+ times!) with tweaks and clarifications before any code is written.

**Steps:**

1. Switch to **Plan Mode** in the Chat panel
2. Prompt:
   ```
   Do a full redesign of the Pokédex UI. Make it [YOUR THEME]. Keep all existing functionality — search, filters, detail panel, type chart.
   ```
3. **Review the plan carefully** — ask follow-up questions to clarify:
   - Which components will change?
   - Which Tailwind utilities or new colors are involved?
   - Any new dependencies needed?
4. Tweak the plan at least twice before hitting **Implement**
5. Open the browser to see the live result

**Theme Ideas:**

- Retro Game Boy
- Cyberpunk Neon City
- Pixel Arcade Style
- Pastel Kawaii
- Vintage Pokémon Cards
- Brutalist Blocks
- Space Galaxy Glow
- Cozy Coffee Shop
- Anime Bubble Aesthetic
- Monochrome Newspaper
- Toybox Primary Colors
- Minimalist Mono
- Retro Terminal Green
- Vaporwave Sunset
- Notebook Doodle Sketch
- Paper Card Cutouts
- Chalkboard Classroom

✅ **Result:** The Pokédex has a completely new visual identity.

---

## 📝 Task 2: Keep Instructions Updated

After a redesign, update instructions so future AI requests match the new design system.

**Steps:**

1. In Chat, prompt:
   ```
   /create-instructions design guide
   ```
   Or:
   ```
   Update the workspace instructions to document the new design system: colors, fonts, Tailwind conventions used.
   ```
2. Review, confirm, **commit and push**

> 💡 **Tip:** Outdated instructions mislead the agent. Keep them lean and current.

---

## 🐛 Task 3: Dogfood the Redesign

Re-run the dogfooding skill you created in Part 1 to validate the new design.

**Steps:**

1. Prompt the skill:
   ```
   Dogfood the app — focus on the new design. Does it feel cohesive? Are there any visual regressions?
   ```
2. Compare feedback with the earlier report from Part 1
3. Address any critical issues the agent flags

✅ **Result:** The agent validates the redesign and helps you catch visual regressions.

---

## ✅ Part 2 Complete!

You've learned how to:
- Use **Plan Mode** for complex, multi-file changes
- Iterate on plans before implementing
- Keep workspace instructions updated with design changes
- Re-run dogfooding to validate redesigns
