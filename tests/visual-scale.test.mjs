import assert from 'node:assert/strict';

import {
  CROSS_PROJECTILE_MIN_SPRITE_SIZE,
  CROSS_PROJECTILE_SPRITE_SIZE_MULTIPLIER,
  PLAYER_ANIM_SIZE_MULTIPLIER,
  PLAYER_STATIC_SIZE_MULTIPLIER,
  PROJECTILE_MIN_SPRITE_SIZE,
  PROJECTILE_SPRITE_SIZE_MULTIPLIER
} from '../js/config/render-scale.js';

assert.equal(PLAYER_ANIM_SIZE_MULTIPLIER >= 4.2, true, 'animated player should read clearly in combat');
assert.equal(PLAYER_STATIC_SIZE_MULTIPLIER >= 3.2, true, 'static player fallback should stay readable');
assert.equal(PROJECTILE_SPRITE_SIZE_MULTIPLIER >= 4.8, true, 'weapon sprites should be larger than collision radius');
assert.equal(PROJECTILE_MIN_SPRITE_SIZE >= 28, true, 'small weapons need a readable minimum sprite size');
assert.equal(CROSS_PROJECTILE_SPRITE_SIZE_MULTIPLIER >= 5.6, true, 'boomerang/cross weapons need a strong silhouette');
assert.equal(CROSS_PROJECTILE_MIN_SPRITE_SIZE >= 32, true, 'boomerang/cross weapons need a readable minimum size');

console.log('visual scale tests passed');
