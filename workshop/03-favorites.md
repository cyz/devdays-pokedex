# Part 3: Favorites & Discovery

[← Part 2](02-design.md)

---

Time to add your first real feature. In this part, you'll implement a **Favorites** system and a **Random Pokémon** button using custom agents and localStorage persistence.

---

## ❤️ Task 1: Favorites Feature

Users should be able to heart-mark any Pokémon and filter to see only their favorites. Favorites should survive page refreshes (localStorage).

**Steps:**

1. Switch to **Agent Mode**
2. Prompt:
   ```
   Add a favorites feature to the Pokédex:
   - Add a heart/bookmark icon button to each PokemonCard
   - Clicking the icon toggles the Pokémon as a favorite
   - Persist favorites to localStorage (use the Pokémon ID as the key)
   - Add a "❤️ Favorites" filter button to the FilterBar
   - When the favorites filter is active, only show favorited Pokémon
   ```
3. Let the agent implement across `PokemonCard.tsx`, `FilterBar.tsx`, `PokedexApp.tsx`
4. Test the feature in the browser: favorite some Pokémon, filter, refresh the page

> 💡 **Tip:** If the agent struggles with the localStorage hook, guide it: *"Create a `useFavorites` custom hook in `lib/useFavorites.ts`"*

✅ **Result:** Users can favorite Pokémon and see them persisted across reloads.

---

## 🎲 Task 2: Random Pokémon Button

Sometimes users just want to discover something new.

**Steps:**

1. Prompt:
   ```
   Add a "🎲 Random" button to the Header. Clicking it should:
   - Pick a random Pokémon from the currently loaded list
   - Open it in the detail panel (same as clicking a card)
   - If no Pokémon are loaded, pick a random ID between 1-1025 and fetch it
   ```
2. Test it — click Random multiple times, verify it opens different Pokémon each time

✅ **Result:** A delightful discovery feature with a single button click.

---

## 🤖 Task 3: Create a Pokémon Testing Agent

Now that you have two new features, let's save a custom agent to test Pokémon features specifically.

**Steps:**

1. Prompt:
   ```
   /create-skill for testing Pokémon features — favorites, filters, the detail panel, and the random button. The skill should open localhost:3000, systematically test each feature, and report any bugs or UX issues.
   ```
2. Run the skill:
   ```
   Use the Pokémon testing skill to validate the new favorites and random features
   ```
3. Review the agent's report and fix any issues it finds

> 💡 **Think about:** What other reusable testing agents could you create for your real projects?

---

## 🔍 Task 4 (Bonus): Search Improvements

The current search only filters already-loaded Pokémon. Can we do better?

**Steps:**

1. Prompt (in **Plan Mode** first):
   ```
   Improve the search: if the search query doesn't match any loaded Pokémon, automatically fetch from the PokeAPI by name or ID and add the result to the list.
   ```
2. Review the plan — is the approach sound? What are the edge cases?
3. Implement and test with Pokémon names that aren't in the first 40 loaded

---

## ✅ Part 3 Complete!

You've learned how to:
- Implement localStorage-backed features using custom hooks
- Add discovery features (random Pokémon)
- Create domain-specific custom testing agents
- Use Plan Mode to reason through feature complexity before coding
