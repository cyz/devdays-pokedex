# Part 4: Team Builder

[← Part 3](03-favorites.md)

---

In this final part, you'll build a **Team Builder** — a feature that lets users assemble a team of up to 6 Pokémon and analyzes their combined type coverage. You'll use **TDD agents** and **parallel agents** to build it faster and more reliably.

---

## 🧪 Task 1: TDD — Write Tests First

Before writing any implementation code, define what the feature should do through tests.

**Steps:**

1. In a new Chat window (Agent mode), prompt:
   ```
   Write unit tests (Jest) for a team builder utility module at `lib/teamUtils.ts`.
   The module should export:
   - `addToTeam(team: Pokemon[], pokemon: Pokemon): Pokemon[]` — adds if team < 6, no duplicates
   - `removeFromTeam(team: Pokemon[], pokemonId: number): Pokemon[]`
   - `getTypeCoverage(team: Pokemon[]): string[]` — returns all unique types covered by the team
   - `getCoverageGaps(team: Pokemon[]): string[]` — returns types NOT covered by any team member
   Write thorough tests using mock Pokémon data. Do NOT implement the functions yet.
   ```
2. Review the generated test file — are the edge cases covered?
3. Run the tests (they should all **fail** — this is expected!):
   ```bash
   npm test
   ```

✅ **Result:** Red tests define the contract. Now we implement to make them green.

---

## 🟢 Task 2: Implement to Pass Tests

**Steps:**

1. In a **second Chat window** (run in parallel!), prompt:
   ```
   Implement `lib/teamUtils.ts` to make all the tests in `lib/teamUtils.test.ts` pass. Do not modify the test file.
   ```
2. Run tests again:
   ```bash
   npm test
   ```
3. If any tests fail, share the error output with the agent:
   ```
   The following tests are failing: [paste output]. Fix the implementation only, not the tests.
   ```

✅ **Result:** Green tests. The utility logic is verified and reliable.

---

## 🏗️ Task 3: Build the Team Builder UI

With the logic tested, build the UI component.

**Steps:**

1. Switch to **Plan Mode** and prompt:
   ```
   Plan a Team Builder feature:
   - A "➕ Add to Team" button on each PokémonCard (disabled when team has 6 Pokémon or Pokémon is already on team)
   - A persistent Team Panel (bottom bar or side panel) showing up to 6 Pokémon sprites
   - Type coverage visualization — show which types the team covers and which are gaps
   - A "Clear Team" button
   Use the functions in lib/teamUtils.ts for all logic.
   ```
2. Review and iterate on the plan (ask: *"How will the Team Panel integrate with the existing layout?"*)
3. Implement

✅ **Result:** Users can build and analyze a Pokémon team with full type coverage insight.

---

## 🔀 Task 4: Parallel Agents

Run two agents simultaneously on independent tasks to finish faster.

**Steps:**

1. **Agent Window 1:** Prompt:
   ```
   Add keyboard shortcut support to the Team Builder: pressing 'T' toggles the Team Panel visibility, 'Delete' or 'Backspace' removes the last added Pokémon from the team.
   ```
2. **Agent Window 2:** Prompt (in parallel!):
   ```
   Add a "Share Team" button that copies a URL to the clipboard with the team's Pokémon IDs as query params (e.g., ?team=1,4,7,25,39,52). When the page loads with a ?team= param, pre-populate the team.
   ```
3. Merge both changes, run `npm run build` to confirm no errors

> 💡 **Parallel agents insight:** Independent features that touch different files are perfect for parallelism. Features that touch the same state or components should be sequential.

---

## ✅ Part 4 Complete!

You've learned how to:
- Use **TDD agents** with the Red-Green-Refactor workflow
- Run **parallel agents** for independent feature work
- Combine utility logic + UI components with confidence from tests
- Build shareable state via URL parameters
