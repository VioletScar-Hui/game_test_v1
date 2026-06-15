# Weapon Effect Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the codex right detail panel into an in-game weapon effect preview.

**Architecture:** Add a small preview-model module that maps weapon behaviors to renderable preview specs. Keep rendering inside `render-settings.js`, using the selected bestiary entry and existing weapon sprites.

**Tech Stack:** Vanilla JavaScript modules, canvas 2D rendering, existing PowerShell bundle script.

---

### Task 1: Preview Model

**Files:**
- Create: `js/ui/weapon-preview-model.js`
- Test: `tests/weapon-preview-model.test.mjs`

- [ ] Write a failing test that imports `getWeaponPreviewSpec` and checks representative weapons.
- [ ] Implement `getWeaponPreviewSpec(entry)` with preview types: `bounce`, `orbit`, `boomerang`, `sweep`, `aura`, `spray`, `lob`, `shield`, `freeze`, `clear`.
- [ ] Run `node tests/weapon-preview-model.test.mjs`.

### Task 2: Detail Panel Renderer

**Files:**
- Modify: `js/ui/render-settings.js`

- [ ] Import `getWeaponPreviewSpec`.
- [ ] Replace the large static icon box with a preview window for weapon entries.
- [ ] Draw center player marker and behavior-specific animated effects using the selected weapon sprite.
- [ ] Keep enemy entries on static image display.

### Task 3: Bundle And Verify

**Files:**
- Modify: `build.ps1`
- Modify: `package.json`
- Generate: `bundle.js`, `play.html`

- [ ] Add `ui/weapon-preview-model.js` to bundle order.
- [ ] Add the new test to `npm test`.
- [ ] Run `powershell -ExecutionPolicy Bypass -File .\build.ps1`.
- [ ] Run `node --check .\bundle.js`.
- [ ] Run `npm test`.
- [ ] Run a headless Chrome check that opens `play.html`, switches to codex, and confirms detail preview state is populated.
