# Infinite Map and Action Assets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace stretched battle backgrounds with tile-ready map assets and add action animation configuration/rendering for all current characters, enemies, and weapons without touching `vampire_survivors.html`.

**Architecture:** Keep existing Canvas 2D and module layout. Add data-first asset manifests in `animation-data.js` and `assets.js`, then render through small helpers that gracefully fall back to existing static sprites when generated frames are missing. Generated project assets live under `assest/tiles`, `assest/props`, `assest/enemies/<id>`, `assest/weapon_actions/<id>`, and the existing character frame folders.

**Tech Stack:** Native JavaScript ES modules, Canvas 2D, Node `node:assert/strict`, PowerShell build script, PNG assets generated with the built-in image generation tool plus local asset normalization.

---

## File Structure

- Modify `js/config/animation-data.js`: export helpers and manifests for character, enemy, and weapon action frames.
- Modify `js/config/assets.js`: load level tiles, level props, all character animation frames, enemy animation frames, and weapon action frames.
- Modify `js/ui/render-world.js`: use `LEVEL_TILE_IMAGES` for battle ground, scatter deterministic props, and keep `LEVEL_BG_IMAGES` as fallback/interface art.
- Modify `js/entities/enemy.js`: choose enemy animation frames for idle/move/hit/death and fall back to static sprites.
- Modify `js/entities/projectile.js`: render projectile action frames when present, fallback to static icon rotation.
- Modify `js/entities/cross-projectile.js`: render slash/cross action frames when present, fallback to procedural strokes.
- Create `tests/asset-animation-manifest.test.mjs`: verify manifests cover 3 characters, 11 enemies, 14 weapons, 5 tiles, and frame path shapes.
- Modify `package.json`: include the new manifest test.
- Create generated assets under `assest/tiles`, `assest/props`, `assest/enemies/<id>`, `assest/weapon_actions/<id>`, and missing character frame folders.
- Run `build.ps1` to refresh `bundle.js` and `play.html`.

---

### Task 1: Add Manifest Coverage Test

**Files:**
- Create: `tests/asset-animation-manifest.test.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write the failing manifest test**

Create `tests/asset-animation-manifest.test.mjs` with assertions for the new exports:

```js
import assert from 'node:assert/strict';
import {
  CHARACTER_ANIMATION_FRAMES,
  ENEMY_ANIMATION_FRAMES,
  WEAPON_ANIMATION_FRAMES
} from '../js/config/animation-data.js';
import {
  LEVEL_TILE_IMAGES,
  LEVEL_PROP_SPRITES
} from '../js/config/assets.js';

const characters = ['antonio', 'imelda', 'gennaro'];
const enemies = [
  'hangry_pigeon', 'crispy_squirrel', 'sleepy_moth', 'bouncy_toad', 'guilty_cricket',
  'sous_chef_zombie', 'pastry_architect_golem', 'librarian_ghost', 'quality_control_robot',
  'sommelier_poltergeist', 'health_inspector'
];
const weapons = [
  'bouncing_slipper', 'spinning_ladle', 'boomerang_cleaver', 'throwing_chopsticks',
  'holy_toast', 'garlic_breath', 'rolling_pin', 'hot_sauce_bottle', 'whip', 'cross',
  'divine_slipper', 'excalibur_ladle', 'meat_grinder', 'infinite_hot_pot'
];
const levels = ['hungry_forest', 'waffle_tower', 'infinite_cookbook_library', 'bubble_tea_plant', 'capella_pasta'];

for (const id of characters) {
  const frames = CHARACTER_ANIMATION_FRAMES[id];
  assert.ok(frames, `${id} character frames registered`);
  assert.equal(frames.idle.length, 6);
  assert.equal(frames.hit.length, 6);
  assert.equal(frames.skill.length, 6);
  assert.equal(frames.death.length, 6);
  for (const action of ['walk', 'run']) {
    for (const direction of ['default', 'up', 'down', 'left', 'right']) {
      assert.equal(frames[action][direction].length, 6, `${id} ${action} ${direction}`);
    }
    assert.deepEqual(frames[action].left, frames[action].right, `${id} ${action} left mirrors right`);
  }
}

for (const id of enemies) {
  const frames = ENEMY_ANIMATION_FRAMES[id];
  assert.ok(frames, `${id} enemy frames registered`);
  assert.equal(frames.idle.length, 4);
  assert.equal(frames.move.length, 4);
  assert.equal(frames.hit.length, 2);
  assert.equal(frames.death.length, 2);
}

for (const id of weapons) {
  const actions = WEAPON_ANIMATION_FRAMES[id];
  assert.ok(actions, `${id} weapon actions registered`);
  assert.ok(Object.keys(actions).length > 0, `${id} has at least one action`);
  for (const paths of Object.values(actions)) {
    assert.ok(paths.length >= 4, `${id} action has frames`);
  }
}

for (const id of levels) {
  assert.ok(LEVEL_TILE_IMAGES[id], `${id} tile image is registered`);
  assert.ok(Array.isArray(LEVEL_PROP_SPRITES[id]), `${id} props list is registered`);
  assert.ok(LEVEL_PROP_SPRITES[id].length >= 4, `${id} has props`);
}

console.log('asset animation manifest tests passed');
```

- [ ] **Step 2: Wire the test into npm**

Change `package.json` test command to:

```json
"test": "node tests/animation-state.test.mjs && node tests/m1-m2-systems.test.mjs && node tests/asset-animation-manifest.test.mjs"
```

- [ ] **Step 3: Run test and verify RED**

Run: `npm test`

Expected: FAIL because `ENEMY_ANIMATION_FRAMES`, `WEAPON_ANIMATION_FRAMES`, `LEVEL_TILE_IMAGES`, or `LEVEL_PROP_SPRITES` are not exported yet.

---

### Task 2: Add Animation and Asset Manifests

**Files:**
- Modify: `js/config/animation-data.js`
- Modify: `js/config/assets.js`

- [ ] **Step 1: Implement path helpers and manifests**

In `js/config/animation-data.js`, replace the Antonio-only path helper with character-aware helpers:

```js
function makeCharacterFramePaths(charId, action, direction = null) {
  const count = ANIMATION_DEFS[action].frames;
  const segment = direction ? `${action}/${direction}` : action;
  return Array.from({ length: count }, (_, index) => (
    `assest/characters/${charId}/${segment}/frame_${String(index).padStart(2, '0')}.png`
  ));
}

function makeEnemyFramePaths(enemyId, action, count) {
  return Array.from({ length: count }, (_, index) => (
    `assest/enemies/${enemyId}/${action}/frame_${String(index).padStart(2, '0')}.png`
  ));
}

function makeWeaponFramePaths(weaponId, action, count) {
  return Array.from({ length: count }, (_, index) => (
    `assest/weapon_actions/${weaponId}/${action}/frame_${String(index).padStart(2, '0')}.png`
  ));
}
```

Then export manifests covering the IDs from the design doc.

- [ ] **Step 2: Load new asset groups**

In `js/config/assets.js`, export and fill:

```js
export const ENEMY_ANIM_SHEETS = {};
export const WEAPON_ACTION_SHEETS = {};
export const LEVEL_TILE_IMAGES = { hungry_forest: new Image(), ... };
export const LEVEL_PROP_SPRITES = { hungry_forest: [], ... };
```

Use the existing `loadFrameSequence` helper for enemy and weapon frames, and change the character loop to:

```js
for (const [charId, actions] of Object.entries(CHARACTER_ANIMATION_FRAMES)) {
  for (const [action, frameSource] of Object.entries(actions)) {
    loadAnimFrames(charId, action, frameSource);
  }
}
```

- [ ] **Step 3: Run test and verify GREEN**

Run: `npm test`

Expected: PASS for manifest coverage, or fail only on code syntax that must be corrected immediately.

---

### Task 3: Generate and Normalize Project Assets

**Files:**
- Create: `assest/tiles/*.png`
- Create: `assest/props/*/*.png`
- Create: `assest/characters/imelda/**/frame_*.png`
- Create: `assest/characters/gennaro/**/frame_*.png`
- Replace: `assest/characters/antonio/**/frame_*.png`
- Create: `assest/enemies/*/{idle,move,hit,death}/frame_*.png`
- Create: `assest/weapon_actions/*/*/frame_*.png`

- [ ] **Step 1: Generate source images with built-in image generation**

Use built-in image generation for representative source sheets:

```text
Create game-ready raster sprite/source sheets in painterly cartoon style, gothic dark atmosphere with vibrant food-themed colors, subtle cel-shading outline, no text, no watermark.
Character and object subjects should be on pure white #FFFFFF background.
Battle ground tiles should be seamless 1024x1024 and should not use white background.
```

- [ ] **Step 2: Save final generated files into workspace**

Copy the selected generated outputs from the built-in image output folder into the project asset folders. Project code must reference only files under `assest/`.

- [ ] **Step 3: Normalize exact frame counts**

Use local image processing to produce exact file names and counts required by the manifests:

```text
characters: 3 * 60 frames
enemies: 11 * 12 frames
weapons: one action frame sequence per registered action
tiles: 5 images
props: at least 4 per level
```

- [ ] **Step 4: Verify expected files exist**

Run a PowerShell file-count check:

```powershell
$characterFrames = Get-ChildItem assest\characters -Recurse -Filter frame_*.png | Measure-Object
$enemyFrames = Get-ChildItem assest\enemies -Recurse -Filter frame_*.png | Measure-Object
$weaponFrames = Get-ChildItem assest\weapon_actions -Recurse -Filter frame_*.png | Measure-Object
$tiles = Get-ChildItem assest\tiles -Filter *.png | Measure-Object
"characters=$($characterFrames.Count) enemies=$($enemyFrames.Count) weapons=$($weaponFrames.Count) tiles=$($tiles.Count)"
```

Expected: at least `characters=180`, `enemies=132`, `weapons>=80`, `tiles=5`.

---

### Task 4: Render Tiles, Props, Enemies, and Weapon Actions

**Files:**
- Modify: `js/ui/render-world.js`
- Modify: `js/entities/enemy.js`
- Modify: `js/entities/projectile.js`
- Modify: `js/entities/cross-projectile.js`

- [ ] **Step 1: Use level tiles and deterministic props**

In `render-world.js`, import `LEVEL_TILE_IMAGES` and `LEVEL_PROP_SPRITES`. Prefer level tile over level background in `drawTiledBackground`, and add prop scattering from `level.id` and `game.runSeed || 1`.

- [ ] **Step 2: Render enemy action frames**

In `enemy.js`, import `ENEMY_ANIM_SHEETS`. Add a `_getAnimFrame()` helper that returns `hit`, `move`, or `idle` frame based on `hitFlash` and movement. Fall back to `ENEMY_SPRITES[this.spriteKey]`.

- [ ] **Step 3: Render projectile action frames**

In `projectile.js`, import `WEAPON_ACTION_SHEETS`. Add frame selection for `fly` or `loop` actions. Fall back to `WEAPON_SPRITES`.

- [ ] **Step 4: Render slash and cross action frames**

In `cross-projectile.js`, import `WEAPON_ACTION_SHEETS`. Use `whip.slash` for `WhipSlash` and `cross.fly`/`cross.return` for `CrossProjectile` when available. Keep current procedural drawing as fallback.

- [ ] **Step 5: Run test**

Run: `npm test`

Expected: PASS.

---

### Task 5: Build and Local Play Verification

**Files:**
- Modify by build: `bundle.js`
- Modify by build: `play.html`
- Must not modify: `vampire_survivors.html`

- [ ] **Step 1: Build**

Run:

```powershell
.\build.ps1
```

Expected:

```text
Bundle created: D:\24-李滨辉\game_test_v1.0\bundle.js
Play HTML created: D:\24-李滨辉\game_test_v1.0\play.html
Double-click play.html to start the game!
```

- [ ] **Step 2: Verify protected file unchanged**

Run:

```powershell
(Get-Item vampire_survivors.html).LastWriteTime
```

Expected: timestamp remains unchanged from before implementation.

- [ ] **Step 3: Smoke-check local play entry**

Open `play.html` in a local browser or serve the folder with a static server. Confirm menu, character selection, level selection, and game start work without console 404 errors for the new manifests.

- [ ] **Step 4: Final verification**

Run:

```powershell
npm test
.\build.ps1
```

Expected: both commands pass.
