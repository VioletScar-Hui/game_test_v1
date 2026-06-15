# Weapon Effect Preview Design

Goal: make the codex detail panel show what a selected weapon does in-game, not just its icon and stats.

Design: keep the existing left category and center grid. Replace the right detail panel's large static icon area with a compact combat preview window. The preview draws a center player marker plus a weapon-specific animated effect: sweeps for whip-like weapons, orbit paths for orbit weapons, bouncing paths for slippers, boomerang spin paths for cross and cleaver weapons, aura rings, cone sprays, lob impact zones, shield layers, freeze beams, and clear pulses.

Data flow: `bestiary-model.js` continues to provide the selected entry. A new `weapon-preview-model.js` maps each weapon definition to a small preview spec based on behavior and functional flags. `render-settings.js` consumes that spec to draw a deterministic preview using `performance.now()`.

Testing: add a model-level test to prove representative weapons map to the expected preview types before wiring the renderer.
