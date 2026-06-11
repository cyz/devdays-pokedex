# Part 1: Setup & Context Engineering

[← Overview](00-overview.md)

---

In this section, you'll set up your development environment and teach GitHub Copilot about your codebase.

---

## 🔧 Initial Setup

### Step 1: Create Your Repository (Required)

1. Open the workshop repository on GitHub
2. Click **Use this template** → **Create a new repository**
   - Name: `my-pokedex`
   - Visibility: **Public**
3. ✅ Your own Pokédex repo is ready!

### Step 2: Enable GitHub Pages

1. Go to your repo's **Settings** → **Pages**
2. Under "Build and deployment", change *Deploy from a branch* to **GitHub Actions**
3. Commit any change to trigger the first deploy
4. ✅ The workshop docs will be live at: `https://{username}.github.io/{repo-name}/`

### Step 3: Choose How You'll Develop

#### Option A: Clone locally in VS Code

1. Open VS Code
2. Run: `Git: Clone` → `Clone from GitHub`
3. Select your new repository
4. Install recommended extensions (notification will appear)

#### Option B: Create a Codespace

1. Open your repository on GitHub
2. Click **Code** → **Codespaces** → **Create codespace on main**
3. ✅ Codespace starts with your repo and VS Code in the browser.

### Step 4: Run the App

Open a terminal and run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and explore the app.  
✅ **Success:** The Pokédex loads, you can search and filter Pokémon, click cards to see details.

Keep this workshop guide open (📌 **Pin the tab**).

---

## 📚 Understanding Context Engineering

Context engineering is how you teach AI about your specific codebase. This makes Copilot's suggestions more accurate and relevant to your project.

### Task 1: Auto-generate Instructions

Instructions guide all agentic interactions, making them more efficient and reliable.

**Steps:**

1. Open the Chat panel in Agent mode
2. Run prompt:
   ```
   /init
   ```
   - While the agent analyzes the codebase, move on to Task 2 in a new chat
3. When `/init` finishes, review the generated `.github/copilot-instructions.md`
   - Is it concise? Not too verbose?
   - Optional follow-up:
     ```
     Compress it down and add a mandatory development checklist [ ] at the top (lint, build)
     ```
4. **Apply** the changes and commit

✅ **Result:** All future requests will have a context map of the workspace.

---

### Task 2: Dogfooding with the Browser Agent

The agent can open your running app in the built-in browser and actually interact with it.

**Steps:**

1. Make sure `npm run dev` is running
2. In Chat (Agent mode), prompt:
   ```
   Open the app at localhost:3000 in the browser. Test it like a critical user and write a detailed report on usability, missing features, and bugs.
   ```
3. Watch the agent launch the browser, click through the app, and generate a report
4. Save the skill:
   ```
   /create-skill for dogfooding this app
   ```

✅ **Result:** You have a reusable dogfooding skill that tests the live app.

> 💡 **Context engineering insight:** The agent needs hands-on context — running the app, seeing the UI, clicking through flows — to truly understand how it works. Code alone isn't enough.

---

### Task 3: Tour the Repo Customizations

**Steps:**

1. Open the Customization panel: `Chat: Open Customizations (Preview)`
2. Browse the auto-generated instructions and any existing skills
3. Look at how the project structure is described

> 💡 **Think about:** What conventions from your own real projects could become instructions or skills?

---

## ✅ Part 1 Complete!

You've learned how to:
- Set up the development environment
- Generate and refine workspace instructions with `/init`
- Dogfood your app using the agent's built-in browser
- Create and save reusable custom skills
