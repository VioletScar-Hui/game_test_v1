# Antonio Animation Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split Antonio Spicy action sheets into editable transparent frames and integrate them through a data-driven animation state machine.

**Architecture:** Add a shared animation metadata module, update asset loading to load offline frame sequences, and refactor `AnimationController` around frame arrays plus explicit transition rules. Generate Antonio frame PNGs with a local script and verify behavior with Node tests.

**Tech Stack:** Browser Canvas, vanilla JavaScript ES modules, PowerShell/.NET `System.Drawing`, Node.js built-in `assert`.

---

## File Structure

- Create `js/config/animation-data.js`: animation metadata, Antonio frame manifest, pure state resolver, and transition predicate.
- Modify `js/config/assets.js`: load Antonio split frame sequences and keep image background handling helpers.
- Modify `js/systems/animation.js`: consume metadata, render frame arrays, crossfade from previous action/frame, expose tested transition behavior.
- Modify `js/entities/player.js`: compute animation params from input, apply priority-safe hit/skill triggers, and keep physics state independent from animation changes.
- Modify `js/game/input-keyboard.js`: trigger skill animation only when the burst skill actually fires.
- Modify `build.ps1`: include `config/animation-data.js` before animation consumers.
- Create `scripts/split-antonio-frames.ps1`: generate transparent offline PNG frames.
- Create `tests/animation-state.test.mjs`: Node tests for resolver and priority rules.

## Tasks

### Task 1: Add Animation Metadata and Tests

- [ ] Create `js/config/animation-data.js` with action definitions, frame manifests, `createAnimationParams`, `resolveAnimationState`, and `canTransitionAnimation`.
- [ ] Create `package.json` with `"type": "module"` and a `test` script.
- [ ] Create `tests/animation-state.test.mjs` covering `death > skill > hit > run > walk > idle`, skill-vs-hit priority, and locomotion transitions.
- [ ] Run `npm test` and confirm tests fail before the implementation is complete.
- [ ] Finish metadata implementation until tests pass.

### Task 2: Generate Offline Antonio Frames

- [ ] Create `scripts/split-antonio-frames.ps1` using the metadata frame counts and the known `362x362` cell size.
- [ ] Run the script to write `assest/characters/antonio/<action>/frame_XX.png`.
- [ ] Verify counts: idle 8, walk 8, run 8, hit 4, death 8, skill 10.

### Task 3: Wire Runtime Frame Sequences

- [ ] Update `js/config/assets.js` to load frame arrays from `ANTONIO_ANIMATION_FRAMES`.
- [ ] Update `js/systems/animation.js` to load and render frame sequences, with sprite sheet fallback.
- [ ] Ensure crossfade stores the outgoing action and outgoing frame rather than always drawing frame 0.

### Task 4: Connect Player State and Inputs

- [ ] Update `js/entities/player.js` to use `createAnimationParams` and `resolveAnimationState`.
- [ ] Make `AnimationController.play()` return whether a transition was accepted.
- [ ] Update hit and skill triggers so blocked transitions do not set stale `_hitAnim` or `_isUsingSkill` flags.
- [ ] Update `js/game/input-keyboard.js` so Space triggers skill animation when the burst skill fires.

### Task 5: Build and Verify

- [ ] Run `npm test`.
- [ ] Run `powershell -ExecutionPolicy Bypass -File build.ps1`.
- [ ] Verify `bundle.js` contains `config/animation-data.js`.
- [ ] Verify generated frame directories and representative PNG dimensions.
