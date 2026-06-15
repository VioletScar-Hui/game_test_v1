# Bestiary Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the cramped bestiary tab with a category rail, sprite card grid, detail panel, and pagination.

**Architecture:** Add a pure bestiary model module for categories, entries, and pagination. Keep rendering in `render-settings.js`, and keep click/hover handling in the existing input modules.

**Tech Stack:** Canvas 2D, ES modules, Node assertion tests.

---

### Task 1: Bestiary Model

**Files:**
- Create: `js/ui/bestiary-model.js`
- Test: `tests/bestiary-redesign.test.mjs`

- [ ] Write tests asserting category ids, weapon coverage, functional weapon coverage, evolution coverage, and pagination.
- [ ] Implement `BESTIARY_CATEGORIES`, `getBestiaryEntries`, `getBestiaryEntryByKey`, and `paginateBestiaryEntries`.
- [ ] Run `node tests/bestiary-redesign.test.mjs`.

### Task 2: Canvas Rendering

**Files:**
- Modify: `js/ui/render-settings.js`

- [ ] Replace the current stacked bestiary renderer with the three-column layout.
- [ ] Render category buttons on the left, a paged grid in the center, and details on the right.
- [ ] Use `WEAPON_SPRITES` and `ENEMY_SPRITES` for cards and detail art.
- [ ] Render locked entries as dark silhouettes.

### Task 3: Input

**Files:**
- Modify: `js/game/input-click.js`
- Modify: `js/game/input-hover.js`
- Modify: `js/game/input-keyboard.js`

- [ ] Handle category clicks, card selection, prev/next page clicks, and bestiary hover state.
- [ ] Add keyboard page fallback with left/right or A/D while in settings bestiary.
- [ ] Preserve existing settings tab and back button behavior.

### Task 4: Verification

**Files:**
- Modify: `package.json`

- [ ] Add the new test to `npm test`.
- [ ] Run `npm test`.
- [ ] Start/verify local static server at `/play.html`.
