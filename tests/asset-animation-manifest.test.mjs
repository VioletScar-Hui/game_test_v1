import assert from 'node:assert/strict';

global.Image = class MockImage {
  constructor() {
    this.complete = false;
    this.naturalWidth = 0;
    this.naturalHeight = 0;
    this.width = 0;
    this.height = 0;
    this.onload = null;
    this._src = '';
  }

  set src(value) {
    this._src = value;
  }

  get src() {
    return this._src;
  }
};

const {
  CHARACTER_ANIMATION_FRAMES,
  CHARACTER_MOVE_DIRECTIONS,
  ENEMY_ANIMATION_FRAMES,
  WEAPON_ANIMATION_FRAMES,
  getWeaponActionFrames,
  resolveEnemyAnimationAction
} = await import('../js/config/animation-data.js');

const {
  INTERACTABLE_SPRITES,
  LEVEL_BG_IMAGES,
  LEVEL_TILE_IMAGES,
  LEVEL_PROP_SPRITES,
  POWERUP_SPRITES,
  WEAPON_SPRITES,
  ARCANA_ATLAS_IMAGE
} = await import('../js/config/assets.js');

const { expandMapAroundPlayer } = await import('../js/game/game-update.js');

const characters = ['antonio', 'imelda', 'gennaro', 'little_antonio'];
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
const levels = ['hungry_forest', 'waffle_tower', 'infinite_cookbook_library', 'bubble_tea_plant', 'capella_pasta', 'moonboba'];

for (const id of characters) {
  const frames = CHARACTER_ANIMATION_FRAMES[id];
  assert.ok(frames, `${id} character frames registered`);
  assert.equal(frames.idle.length, 6);
  assert.equal(frames.hit.length, 6);
  assert.equal(frames.skill.length, 6);
  assert.equal(frames.death.length, 6);
  for (const action of ['walk', 'run']) {
    for (const direction of ['default', ...CHARACTER_MOVE_DIRECTIONS]) {
      assert.equal(frames[action][direction].length, 6, `${id} ${action} ${direction}`);
    }
    assert.match(frames[action].up_left[0], /up_left/);
    assert.match(frames[action].down_right[0], /down_right/);
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
  assert.ok(LEVEL_BG_IMAGES[id], `${id} background image is registered`);
  assert.ok(LEVEL_TILE_IMAGES[id], `${id} tile image is registered`);
  assert.ok(Array.isArray(LEVEL_PROP_SPRITES[id]), `${id} props list is registered`);
  assert.ok(LEVEL_PROP_SPRITES[id].length >= 4, `${id} has props`);
}

for (const id of ['max_health', 'damage', 'attack_speed', 'move_speed', 'magnet', 'luck', 'gold_gain', 'revival']) {
  assert.ok(POWERUP_SPRITES[id], `${id} powerup sprite is registered`);
  assert.match(POWERUP_SPRITES[id].src, new RegExp(`assest/powerups/${id}\\.png$`));
}

for (const id of ['picnic_campfire', 'package', 'curse_altar', 'bill_pile', 'mirror']) {
  assert.ok(INTERACTABLE_SPRITES[id], `${id} interactable sprite is registered`);
  assert.match(INTERACTABLE_SPRITES[id].src, new RegExp(`assest/interactables/${id}\\.png$`));
}

for (const id of ['thermal_bag', 'freezer_gate', 'service_bell', 'michelin_cloak', 'infinite_buffet', 'gorgeous_moonboba']) {
  assert.ok(WEAPON_SPRITES[id], `${id} functional weapon sprite is registered`);
}

assert.ok(ARCANA_ATLAS_IMAGE, 'arcana atlas image is registered');
assert.match(ARCANA_ATLAS_IMAGE.src, /assest\/ui\/arcana_atlas\.png$/);

assert.equal(resolveEnemyAnimationAction({ active: false, isMoving: true, hitFlash: 0 }), 'death');
assert.equal(resolveEnemyAnimationAction({ active: true, isMoving: true, hitFlash: 10 }), 'hit');
assert.equal(resolveEnemyAnimationAction({ active: true, isMoving: true, hitFlash: 0 }), 'move');
assert.equal(resolveEnemyAnimationAction({ active: true, isMoving: false, hitFlash: 0 }), 'idle');

assert.equal(getWeaponActionFrames('cross', 'return').length, 4);
assert.equal(getWeaponActionFrames('cross', 'missing_action').length, 6);
assert.equal(getWeaponActionFrames('unknown_weapon', 'fly'), null);

const expansionGame = {
  mapBounds: { minX: 0, minY: 0, maxX: 3840, maxY: 2160 },
  _levelPropCache: { key: 'stale' },
  player: {
    x: 120,
    y: 2080,
    bounds: null,
    setBounds(minX, minY, maxX, maxY) {
      this.bounds = { minX, minY, maxX, maxY };
    }
  }
};
assert.equal(expandMapAroundPlayer(expansionGame, 520, 1024), true);
assert.equal(expansionGame.mapBounds.minX, -1024);
assert.equal(expansionGame.mapBounds.maxY, 3184);
assert.deepEqual(expansionGame.player.bounds, expansionGame.mapBounds);
assert.equal(expansionGame._levelPropCache, null);
assert.equal(expandMapAroundPlayer(expansionGame, 10, 1024), false);

console.log('asset animation manifest tests passed');
