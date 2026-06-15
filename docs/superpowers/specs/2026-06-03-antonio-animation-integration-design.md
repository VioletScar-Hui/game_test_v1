# Antonio Animation Integration Design

## Goal

Integrate Antonio Spicy's six action assets as editable offline frame sequences while keeping runtime animation data-driven and compatible with the current Canvas game engine.

## Asset Processing

Antonio's source sheets use a fixed `362x362` frame size. Idle, hit, death, and skill are `4x3` sheets; walk and run are `3x4` sheets. Offline processing will crop each action into only the frames used by the game, remove connected white background from each frame edge, soften near-white edge pixels, and write transparent PNG frames under `assest/characters/antonio/<action>/frame_XX.png`.

## Runtime Architecture

Runtime animation data will move to a shared metadata module that defines frame count, frame duration, loop behavior, priority, and transition duration for each action. The asset loader will prefer the offline frame sequence manifest and provide those frames to `AnimationController`. Existing sprite sheet loading remains as a fallback shape where useful, but Antonio should run from the split frame sequences.

## State Mapping

The player animation parameters are:

- `isDead`
- `isUsingSkill`
- `isHit`
- `isDashing`
- `isMoving`
- `isRunning`
- `moveX`
- `moveY`
- `speed`

The resolver maps them in this order: `death > skill > hit > run > walk > idle`.

## Transition Rules

Death is terminal and has highest priority. Skill can interrupt normal movement and hit, but only death can interrupt skill. Hit can interrupt idle, walk, and run, but cannot interrupt skill. Idle, walk, and run can freely transition among each other and use short crossfades to make locomotion changes feel smooth.

## Continuity

Animation changes do not mutate player position, radius, velocity, bounds, facing, or collision state. Rendering reuses the same world position and facing for both outgoing and incoming frames during crossfade, so switching frames cannot cause gameplay movement or physics jumps.

## Testing

Automated tests will cover pure animation state resolution and transition priority rules. A smoke test will validate that the generated Antonio frame directories contain the expected frame counts. Manual verification will run the build and inspect that `play.html` receives the updated bundle.
