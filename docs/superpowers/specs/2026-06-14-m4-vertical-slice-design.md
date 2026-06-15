# M4 Vertical Slice Design

## Goal

Implement the M4 gameplay/story polish slice from the PRD in a locally playable form without touching `vampire_survivors.html`.

## Scope

- Add persistent M4 meta fields for notes, relics, achievements, challenge records, daily records, spice/hyper settings, star talents, endings, and staged bestiary lore.
- Add relics as permanent feature unlocks, with old saves treated as owning Randomazzo so existing Arcana flow does not regress.
- Add 12 Gourmando notes, note collection helpers, a bestiary notes page, and mirror-boss unlock state.
- Add challenge and daily-challenge run profiles with deterministic date seed helpers.
- Add spice level and Hyper settings that feed difficulty and reward calculation.
- Add a lightweight star talent tree with currency settlement and stat effects.
- Add progressive enemy lore milestones at 1/25/100 kills.
- Add a basic mirror-boss/endings flow for Moonboba after all notes are collected.

## Non-Goals

- No MP3/SFX asset migration; Web Audio remains the default.
- No M5 family restaurant, Mama Spicy, expeditions, or M6 equipment.
- No edits to `vampire_survivors.html`.
- No new generated bitmap art unless a UI cannot be represented with existing assets/canvas drawing.

## Architecture

M4 state lives in `powerup-store` meta normalization and pure helper modules under `js/game` or `js/config`. UI surfaces read those helpers and write only through game-core methods. Run mutations funnel through `recordRunProgress`, `startGame`, victory/game-over settlement, and explicit settings/menu handlers.

## Verification

New node tests cover meta normalization, note/relic/challenge/talent helpers, difficulty math, and bestiary lore staging. Existing tests must remain green, then `build.ps1`, `node --check bundle.js`, and `npm test` must pass.
