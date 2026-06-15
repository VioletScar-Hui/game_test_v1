# M1 M2 Core Loop And Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the PRD M1+M2 playable milestone without modifying `vampire_survivors.html`, so `play.html` can run the upgraded Survivors-like loop locally.

**Architecture:** Keep the current Canvas 2D and ES module structure. Add pure data/logic modules for upgrade pools, passives, evolutions, waves, seeded randomness, chest rewards, and Arcana timing so they can be tested with `node:test`; connect them to the existing `Game`, `Player`, renderer, and input modules with narrowly scoped state additions.

**Tech Stack:** Native JavaScript ES modules, Canvas 2D, PowerShell build script, Node built-in test runner, project-local PNG assets.

---

### Task 1: Test Pure M1/M2 Rules

**Files:**
- Create: `tests/m1-m2-systems.test.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write failing tests**

Add assertions for:
- PRD experience curve: level 1 needs 5 exp, level 20 uses the second curve, level 40 uses the third curve.
- Upgrade options contain three unique choices, prefer owned upgradeable items, respect 6 weapon/6 passive caps, and include fallback rewards.
- Evolution requires level 8 weapon plus matching passive.
- Wave director returns minute-indexed rows and elite/boss milestone events.
- Arcana schedule triggers at 0:00, 11:00, and 21:00.

- [ ] **Step 2: Run tests to verify failure**

Run: `npm test`

Expected: failure because `game-balance.js`, `upgrade-pool.js`, `waves-data.js`, and related modules are not implemented yet.

### Task 2: M1 Data Modules

**Files:**
- Create: `js/config/passives-data.js`
- Create: `js/config/waves-data.js`
- Create: `js/config/arcanas-data.js`
- Create: `js/game/game-balance.js`
- Create: `js/game/upgrade-pool.js`
- Create: `js/game/evolution.js`
- Create: `js/game/arcana-schedule.js`
- Create: `js/systems/rng.js`
- Modify: `js/config/weapons-data.js`

- [ ] **Step 1: Implement data**

Define eight PRD weapons at max level 8, eight passives at max level 5, four starter Arcana cards plus M2 schedule support, and five level wave tables with minute 5/10/15/20/25 elite events and 29 boss event.

- [ ] **Step 2: Implement pure helpers**

Implement `expToNextLevel(level)`, `buildUpgradeOptions(...)`, `applyUpgradeChoice(...)`, `canEvolveWeapon(...)`, `getEligibleEvolutions(...)`, `getWaveForTime(...)`, `getArcanaChoiceForTime(...)`, and `mulberry32(seed)`.

- [ ] **Step 3: Verify tests pass**

Run: `npm test`

Expected: pure system tests pass.

### Task 3: M1 Runtime Integration

**Files:**
- Create: `js/entities/passive-inventory.js`
- Modify: `js/entities/player.js`
- Modify: `js/entities/weapon-system.js`
- Modify: `js/entities/cross-projectile.js`
- Modify: `js/entities/projectile.js`
- Modify: `js/game/game-core.js`
- Modify: `js/game/game-update.js`
- Modify: `js/game/input-click.js`
- Modify: `js/game/input-hover.js`
- Modify: `js/game/game-render.js`
- Create: `js/ui/render-levelup.js`
- Modify: `js/ui/render-hud.js`
- Modify: `js/ui/render-shop.js`
- Modify: `js/config/characters.js`

- [ ] **Step 1: Level-up state**

When player exp crosses a threshold, enqueue one level-up, pause gameplay in `LEVEL_UP`, show three upgrade cards, and apply the selected weapon/passive/fallback choice before returning to `PLAYING`.

- [ ] **Step 2: Multi-weapon behavior**

Support the eight PRD weapon IDs using reusable behavior branches: targeted projectile, whip-like sweep, bouncing/slipper projectile, boomerang/cleaver projectile, orbit/ladle, aura/garlic, lob/toast, spray/hot sauce.

- [ ] **Step 3: Passive stats**

Aggregate passive modifiers through `PassiveInventory` into player damage, cooldown, area, armor, magnet, speed, luck, and exp multipliers.

- [ ] **Step 4: Wave spawning**

Replace independent per-enemy timers with `WAVES` rows and spawn caps; spawn elites at milestone minutes and boss at the configured boss event.

### Task 4: M2 Runtime Integration

**Files:**
- Create: `js/game/chest-rewards.js`
- Create: `js/ui/render-chest.js`
- Create: `js/systems/juice.js`
- Modify: `js/game/game-core.js`
- Modify: `js/game/game-update.js`
- Modify: `js/game/input-click.js`
- Modify: `js/game/game-render.js`
- Modify: `js/systems/camera.js`
- Modify: `js/entities/enemy.js`
- Modify: `js/entities/items.js`
- Modify: `js/ui/render-arcana.js`
- Modify: `js/ui/render-hud.js`

- [ ] **Step 1: Chest state**

Elite enemies drop lunchboxes. Picking one enters `CHEST_OPEN`, resolves evolution first, otherwise upgrades one item plus gold, then shows a skippable animation and returns to gameplay.

- [ ] **Step 2: Large map**

Set map bounds to 3840x2160, place player in the center, make camera follow with translated world rendering, tile battle backgrounds, and spawn enemies around the camera outside the viewport.

- [ ] **Step 3: Arcana schedule**

Show Arcana selection at game start, 11:00, and 21:00. Keep cards as gameplay modifiers and remove the old every-level Arcana behavior.

- [ ] **Step 4: Juice**

Add hit-stop, camera shake tiers, damage number styling, pickup pitch ramp, combo counter, low HP pulse, and enemy hit flash without adding new audio files.

### Task 5: Assets And Build

**Files:**
- Add: missing `assest/weapons/*.png`
- Add: missing `assest/passives/*.png`
- Add: missing `assest/ui/chest.png` if needed
- Modify: `js/config/assets.js`
- Modify: `build.ps1`
- Modify: `bundle.js`
- Modify: `play.html` only if required for local play

- [ ] **Step 1: Generate project-bound PNG icons**

Create consistent bitmap icons for new weapons, passives, and evolved weapons using PRD style: painterly cartoon, gothic dark accents, saturated food color, light cel outline, no text/watermark.

- [ ] **Step 2: Register assets**

Load icons by stable IDs; missing art must fall back to code-drawn icons rather than 404.

- [ ] **Step 3: Update build**

Include all new modules in `build.ps1`, regenerate `bundle.js`, and leave `vampire_survivors.html` untouched.

### Task 6: Verification

**Files:**
- Test command: `npm test`
- Build command: `powershell -ExecutionPolicy Bypass -File .\build.ps1`
- Local play evidence: browser/headless console and smoke check against `play.html`

- [ ] **Step 1: Run automated tests**

Run: `npm test`

Expected: all tests pass.

- [ ] **Step 2: Build**

Run: `powershell -ExecutionPolicy Bypass -File .\build.ps1`

Expected: `bundle.js` and `play.html` are generated; `vampire_survivors.html` remains unmodified.

- [ ] **Step 3: Smoke test local play**

Open `play.html` through a local static server or file smoke where possible. Verify no missing module errors, no 404 for registered assets, level-up/chest/Arcana overlays appear, and gameplay can reach movement/combat.
