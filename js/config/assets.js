import {
  ANIMATION_FRAME_SIZE,
  CHARACTER_ANIMATION_FRAMES,
  ENEMY_ANIMATION_FRAMES,
  WEAPON_ANIMATION_FRAMES
} from './animation-data.js';

export const MENU_BG_IMAGE = new Image();
MENU_BG_IMAGE.src = 'assest/backgrounds/main_backgroud.png';

export const CHARACTER_BG_IMAGES = {
  antonio: new Image(),
  imelda: new Image(),
  gennaro: new Image(),
  little_antonio: new Image()
};
CHARACTER_BG_IMAGES.antonio.src = 'assest/characters/Antonio Spicy.png';
CHARACTER_BG_IMAGES.imelda.src = 'assest/characters/Imelda Spicy.png';
CHARACTER_BG_IMAGES.gennaro.src = 'assest/characters/Gennaro Spicy.png';
CHARACTER_BG_IMAGES.little_antonio.src = 'assest/characters/Little Antonio Spicy.png';

export const CHARACTER_SPRITES = {};
export const ENEMY_SPRITES = {};
export const WEAPON_SPRITES = {};
export const PASSIVE_SPRITES = {};
export const POWERUP_SPRITES = {};
export const INTERACTABLE_SPRITES = {};
export const DROP_SPRITES = {};
export const CHARACTER_ANIM_SHEETS = {};
export const ENEMY_ANIM_SHEETS = {};
export const WEAPON_ACTION_SHEETS = {};

export const LEVEL_BG_IMAGES = {
  hungry_forest: new Image(),
  waffle_tower: new Image(),
  infinite_cookbook_library: new Image(),
  bubble_tea_plant: new Image(),
  capella_pasta: new Image(),
  moonboba: new Image()
};
LEVEL_BG_IMAGES.hungry_forest.src = 'assest/backgrounds/hungry_forest.png';
LEVEL_BG_IMAGES.waffle_tower.src = 'assest/backgrounds/waffle_tower.png';
LEVEL_BG_IMAGES.infinite_cookbook_library.src = 'assest/backgrounds/infinite_cookbook_library.png';
LEVEL_BG_IMAGES.bubble_tea_plant.src = 'assest/backgrounds/bubble_tea_plant.png';
LEVEL_BG_IMAGES.capella_pasta.src = 'assest/backgrounds/capella_pasta.png';
LEVEL_BG_IMAGES.moonboba.src = 'assest/backgrounds/moonboba.png';

export const LEVEL_TILE_IMAGES = {
  hungry_forest: new Image(),
  waffle_tower: new Image(),
  infinite_cookbook_library: new Image(),
  bubble_tea_plant: new Image(),
  capella_pasta: new Image(),
  moonboba: new Image()
};
LEVEL_TILE_IMAGES.hungry_forest.src = 'assest/tiles/hungry_forest_tile.png';
LEVEL_TILE_IMAGES.waffle_tower.src = 'assest/tiles/waffle_tower_tile.png';
LEVEL_TILE_IMAGES.infinite_cookbook_library.src = 'assest/tiles/infinite_cookbook_library_tile.png';
LEVEL_TILE_IMAGES.bubble_tea_plant.src = 'assest/tiles/bubble_tea_plant_tile.png';
LEVEL_TILE_IMAGES.capella_pasta.src = 'assest/tiles/capella_pasta_tile.png';
LEVEL_TILE_IMAGES.moonboba.src = 'assest/tiles/bubble_tea_plant_tile.png';

const LEVEL_PROP_PATHS = {
  hungry_forest: [
    'assest/props/hungry_forest/prop_00.png',
    'assest/props/hungry_forest/prop_01.png',
    'assest/props/hungry_forest/prop_02.png',
    'assest/props/hungry_forest/prop_03.png',
    'assest/props/hungry_forest/prop_04.png'
  ],
  waffle_tower: [
    'assest/props/waffle_tower/prop_00.png',
    'assest/props/waffle_tower/prop_01.png',
    'assest/props/waffle_tower/prop_02.png',
    'assest/props/waffle_tower/prop_03.png',
    'assest/props/waffle_tower/prop_04.png'
  ],
  infinite_cookbook_library: [
    'assest/props/infinite_cookbook_library/prop_00.png',
    'assest/props/infinite_cookbook_library/prop_01.png',
    'assest/props/infinite_cookbook_library/prop_02.png',
    'assest/props/infinite_cookbook_library/prop_03.png',
    'assest/props/infinite_cookbook_library/prop_04.png'
  ],
  bubble_tea_plant: [
    'assest/props/bubble_tea_plant/prop_00.png',
    'assest/props/bubble_tea_plant/prop_01.png',
    'assest/props/bubble_tea_plant/prop_02.png',
    'assest/props/bubble_tea_plant/prop_03.png',
    'assest/props/bubble_tea_plant/prop_04.png'
  ],
  moonboba: [
    'assest/props/bubble_tea_plant/prop_00.png',
    'assest/props/bubble_tea_plant/prop_01.png',
    'assest/props/bubble_tea_plant/prop_02.png',
    'assest/props/bubble_tea_plant/prop_03.png',
    'assest/props/bubble_tea_plant/prop_04.png'
  ],
  capella_pasta: [
    'assest/props/capella_pasta/prop_00.png',
    'assest/props/capella_pasta/prop_01.png',
    'assest/props/capella_pasta/prop_02.png',
    'assest/props/capella_pasta/prop_03.png',
    'assest/props/capella_pasta/prop_04.png'
  ]
};

export const LEVEL_PROP_SPRITES = {};

export const SHOP_MERCHANT_IMAGE = new Image();
SHOP_MERCHANT_IMAGE.src = 'assest/ui/1.png';

export const ARCANA_ATLAS_IMAGE = new Image();
ARCANA_ATLAS_IMAGE.src = 'assest/ui/arcana_atlas.png';

export function processSpriteImage(img) {
  const c = document.createElement('canvas');
  c.width = img.naturalWidth || img.width;
  c.height = img.naturalHeight || img.height;
  const cx = c.getContext('2d');
  cx.drawImage(img, 0, 0);
  const id = cx.getImageData(0, 0, c.width, c.height);
  const d = id.data;
  const w = c.width, h = c.height;
  const visited = new Uint8Array(w * h);
  const stack = [];
  const thr = 230;
  for (let x = 0; x < w; x++) { stack.push(x); stack.push((h - 1) * w + x); }
  for (let y = 0; y < h; y++) { stack.push(y * w); stack.push(y * w + w - 1); }
  while (stack.length > 0) {
    const idx = stack.pop();
    if (visited[idx]) continue;
    visited[idx] = 1;
    const px = idx * 4;
    if (d[px] >= thr && d[px + 1] >= thr && d[px + 2] >= thr && d[px + 3] > 128) {
      d[px + 3] = 0;
      d[px] = 0; d[px + 1] = 0; d[px + 2] = 0;
      const x = idx % w, y = (idx - x) / w;
      if (x > 0) stack.push(idx - 1);
      if (x < w - 1) stack.push(idx + 1);
      if (y > 0) stack.push(idx - w);
      if (y < h - 1) stack.push(idx + w);
    }
  }
  for (let i = 0; i < w * h; i++) {
    const px = i * 4;
    if (d[px + 3] === 0) continue;
    const hasTransparentNeighbor = (
      (i % w > 0 && d[(i - 1) * 4 + 3] === 0) ||
      (i % w < w - 1 && d[(i + 1) * 4 + 3] === 0) ||
      (i >= w && d[(i - w) * 4 + 3] === 0) ||
      (i < (h - 1) * w && d[(i + w) * 4 + 3] === 0)
    );
    if (hasTransparentNeighbor && d[px] >= 200 && d[px + 1] >= 200 && d[px + 2] >= 200) {
      const maxC = Math.max(d[px], d[px + 1], d[px + 2]);
      const minC = Math.min(d[px], d[px + 1], d[px + 2]);
      if (maxC - minC < 30) {
        const whiteness = (d[px] + d[px + 1] + d[px + 2]) / 3;
        const alpha = Math.max(0, Math.round(d[px + 3] * (1 - (whiteness - 200) / 55)));
        d[px + 3] = alpha;
        if (alpha === 0) { d[px] = 0; d[px + 1] = 0; d[px + 2] = 0; }
      }
    }
  }
  cx.putImageData(id, 0, 0);
  return c;
}

function removeWhiteFromRegion(d, w, rx, ry, rw, rh) {
  const visited = new Uint8Array(rw * rh);
  const stack = [];
  const thr = 230;
  for (let x = 0; x < rw; x++) { stack.push(x); stack.push((rh - 1) * rw + x); }
  for (let y = 0; y < rh; y++) { stack.push(y * rw); stack.push(y * rw + rw - 1); }
  while (stack.length > 0) {
    const li = stack.pop();
    const lx = stack.pop();
    if (lx < 0 || lx >= rw || li < 0 || li >= rh) continue;
    const vi = li * rw + lx;
    if (visited[vi]) continue;
    visited[vi] = 1;
    const gx = rx + lx, gy = ry + li;
    const px = (gy * w + gx) * 4;
    if (d[px] >= thr && d[px + 1] >= thr && d[px + 2] >= thr && d[px + 3] > 128) {
      d[px + 3] = 0;
      d[px] = 0; d[px + 1] = 0; d[px + 2] = 0;
      stack.push(lx - 1, li); stack.push(lx + 1, li);
      stack.push(lx, li - 1); stack.push(lx, li + 1);
    }
  }
  for (let ly = 0; ly < rh; ly++) {
    for (let lx = 0; lx < rw; lx++) {
      const gx = rx + lx, gy = ry + ly;
      const i = gy * w + gx;
      const px = i * 4;
      if (d[px + 3] === 0) continue;
      const hasT = (
        (gx > 0 && d[(i - 1) * 4 + 3] === 0) ||
        (gx < w - 1 && d[(i + 1) * 4 + 3] === 0) ||
        (gy > 0 && d[(i - w) * 4 + 3] === 0) ||
        (gy < w * (d.length / 4 / w) - 1 && d[(i + w) * 4 + 3] === 0)
      );
      if (hasT && d[px] >= 200 && d[px + 1] >= 200 && d[px + 2] >= 200) {
        const maxC = Math.max(d[px], d[px + 1], d[px + 2]);
        const minC = Math.min(d[px], d[px + 1], d[px + 2]);
        if (maxC - minC < 30) {
          const wh = (d[px] + d[px + 1] + d[px + 2]) / 3;
          const alpha = Math.max(0, Math.round(d[px + 3] * (1 - (wh - 200) / 55)));
          d[px + 3] = alpha;
          if (alpha === 0) { d[px] = 0; d[px + 1] = 0; d[px + 2] = 0; }
        }
      }
    }
  }
}

export function processSpriteSheet(img, frameSize) {
  const c = document.createElement('canvas');
  c.width = img.naturalWidth || img.width;
  c.height = img.naturalHeight || img.height;
  const cx = c.getContext('2d');
  cx.drawImage(img, 0, 0);
  const id = cx.getImageData(0, 0, c.width, c.height);
  const d = id.data;
  const w = c.width;
  const cols = Math.floor(c.width / frameSize);
  const rows = Math.floor(c.height / frameSize);
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      removeWhiteFromRegion(d, w, col * frameSize, row * frameSize, frameSize, frameSize);
    }
  }
  cx.putImageData(id, 0, 0);
  return c;
}

function loadSprite(key, src) {
  const img = new Image();
  img.onload = function () {
    CHARACTER_SPRITES[key] = processSpriteImage(img);
  };
  img.src = src;
  CHARACTER_SPRITES[key] = img;
}

loadSprite('antonio', 'assest/characters/Antonio Spicy1.png');
loadSprite('imelda', 'assest/characters/Imelda Spicy1.png');
loadSprite('gennaro', 'assest/characters/Gennaro Spicy1.png');
loadSprite('little_antonio', 'assest/characters/Little Antonio Spicy1.png');

function loadAnimSheet(charId, action, src) {
  if (!CHARACTER_ANIM_SHEETS[charId]) CHARACTER_ANIM_SHEETS[charId] = {};
  const img = new Image();
  img.onload = function () {
    CHARACTER_ANIM_SHEETS[charId][action] = processSpriteSheet(img, ANIMATION_FRAME_SIZE);
  };
  img.src = src;
  CHARACTER_ANIM_SHEETS[charId][action] = img;
}

const processedTargets = new WeakMap();

function loadFrameSequence(framePaths, processWhite = false) {
  const sequence = framePaths.map(src => {
    const img = new Image();
    if (processWhite) {
      img.onload = function () {
        const processed = processSpriteImage(img);
        processed.sourcePath = src;
        const target = processedTargets.get(img);
        if (target) target.list[target.index] = processed;
      };
    }
    img.src = src;
    return img;
  });
  if (processWhite) {
    sequence.forEach((img, index) => processedTargets.set(img, { list: sequence, index }));
  }
  return sequence;
}

function loadAnimFrames(charId, action, frameSource) {
  if (!CHARACTER_ANIM_SHEETS[charId]) CHARACTER_ANIM_SHEETS[charId] = {};
  if (Array.isArray(frameSource)) {
    CHARACTER_ANIM_SHEETS[charId][action] = loadFrameSequence(frameSource, true);
    return;
  }

  const directions = {};
  for (const [direction, framePaths] of Object.entries(frameSource)) {
    directions[direction] = loadFrameSequence(framePaths, true);
  }
  CHARACTER_ANIM_SHEETS[charId][action] = directions;
}

for (const [levelId, paths] of Object.entries(LEVEL_PROP_PATHS)) {
  LEVEL_PROP_SPRITES[levelId] = loadFrameSequence(paths, true);
}

for (const [charId, actions] of Object.entries(CHARACTER_ANIMATION_FRAMES)) {
  for (const [action, frameSource] of Object.entries(actions)) {
    loadAnimFrames(charId, action, frameSource);
  }
}

for (const [enemyId, actions] of Object.entries(ENEMY_ANIMATION_FRAMES)) {
  ENEMY_ANIM_SHEETS[enemyId] = {};
  for (const [action, framePaths] of Object.entries(actions)) {
    ENEMY_ANIM_SHEETS[enemyId][action] = loadFrameSequence(framePaths, true);
  }
}

for (const [weaponId, actions] of Object.entries(WEAPON_ANIMATION_FRAMES)) {
  WEAPON_ACTION_SHEETS[weaponId] = {};
  for (const [action, framePaths] of Object.entries(actions)) {
    WEAPON_ACTION_SHEETS[weaponId][action] = loadFrameSequence(framePaths, true);
  }
}

function loadEnemySprite(key, src) {
  const img = new Image();
  img.onload = function () {
    ENEMY_SPRITES[key] = processSpriteImage(img);
  };
  img.src = src;
  ENEMY_SPRITES[key] = img;
}

loadEnemySprite('hangry_pigeon', 'assest/enemies/Hangry Pigeon.png');
loadEnemySprite('crispy_squirrel', 'assest/enemies/Crispy Squirrel.png');
loadEnemySprite('sleepy_moth', 'assest/enemies/Sleepy Moth.png');
loadEnemySprite('bouncy_toad', 'assest/enemies/Bouncy Toad.png');
loadEnemySprite('guilty_cricket', 'assest/enemies/Guilty Cricket.png');
loadEnemySprite('sous_chef_zombie', 'assest/enemies/Sous Chef Zombie.png');
loadEnemySprite('pastry_architect_golem', 'assest/enemies/Pastry Architect Golem.png');
loadEnemySprite('librarian_ghost', 'assest/enemies/Librarian Ghost.png');
loadEnemySprite('quality_control_robot', 'assest/enemies/Quality Control Robot.png');
loadEnemySprite('sommelier_poltergeist', 'assest/enemies/Sommelier Poltergeist.png');
loadEnemySprite('health_inspector', 'assest/enemies/The Health Inspector.png');

function loadDropSprite(key, src) {
  const img = new Image();
  img.onload = function () {
    DROP_SPRITES[key] = processSpriteImage(img);
  };
  img.src = src;
  DROP_SPRITES[key] = img;
}

loadDropSprite('green_candy', 'assest/drops/Green Candy.png');
loadDropSprite('red_candy', 'assest/drops/Red Candy.png');
loadDropSprite('coin', 'assest/drops/Dropped Coin.png');
loadDropSprite('chicken_leg', 'assest/drops/Chicken Leg.png');
loadDropSprite('whole_chicken', 'assest/drops/Whole Chicken.png');
loadDropSprite('lunchbox', 'assest/drops/Mystery Lunchbox.png');
loadDropSprite('vip_card', 'assest/drops/Gourmando\'s VIP Card.png');

function loadWeaponSprite(key, src) {
  const img = new Image();
  img.onload = function () {
    WEAPON_SPRITES[key] = processSpriteImage(img);
  };
  img.src = src;
  WEAPON_SPRITES[key] = img;
}

loadWeaponSprite('whip', 'assest/weapons/Whip.png');
loadWeaponSprite('cross', 'assest/weapons/Cross.png');
loadWeaponSprite('bouncing_slipper', 'assest/weapons/Bouncing Slipper.png');
loadWeaponSprite('spinning_ladle', 'assest/weapons/Spinning Ladle.png');
loadWeaponSprite('boomerang_cleaver', 'assest/weapons/Boomerang Cleaver.png');
loadWeaponSprite('throwing_chopsticks', 'assest/weapons/Throwing Chopsticks.png');
loadWeaponSprite('holy_toast', 'assest/weapons/Holy Toast.png');
loadWeaponSprite('garlic_breath', 'assest/weapons/Garlic Breath.png');
loadWeaponSprite('rolling_pin', 'assest/weapons/Rolling Pin.png');
loadWeaponSprite('hot_sauce_bottle', 'assest/weapons/Hot Sauce Bottle.png');
loadWeaponSprite('divine_slipper', 'assest/weapons/Divine Slipper.png');
loadWeaponSprite('excalibur_ladle', 'assest/weapons/Excalibur Ladle.png');
loadWeaponSprite('meat_grinder', 'assest/weapons/Meat Grinder.png');
loadWeaponSprite('infinite_hot_pot', 'assest/weapons/Infinite Hot Pot.png');
loadWeaponSprite('thermal_bag', 'assest/weapons/Thermal Bag.png');
loadWeaponSprite('freezer_gate', 'assest/weapons/Freezer Gate.png');
loadWeaponSprite('service_bell', 'assest/weapons/Service Bell.png');
loadWeaponSprite('michelin_cloak', 'assest/weapons/Michelin Cloak.png');
loadWeaponSprite('infinite_buffet', 'assest/weapons/Infinite Buffet.png');
loadWeaponSprite('gorgeous_moonboba', 'assest/weapons/Gorgeous Moonboba.png');

function loadPassiveSprite(key, src) {
  const img = new Image();
  img.onload = function () {
    PASSIVE_SPRITES[key] = processSpriteImage(img);
  };
  img.src = src;
  PASSIVE_SPRITES[key] = img;
}

loadPassiveSprite('bubble_foam', 'assest/passives/Bubble Foam.png');
loadPassiveSprite('fitness_bracer', 'assest/passives/Fitness Bracer.png');
loadPassiveSprite('magnifying_glass', 'assest/passives/Magnifying Glass.png');
loadPassiveSprite('takeout_lid', 'assest/passives/Takeout Lid.png');
loadPassiveSprite('empty_boba_cup', 'assest/passives/Empty Boba Cup.png');
loadPassiveSprite('running_shoes', 'assest/passives/Running Shoes.png');
loadPassiveSprite('lucky_cat_charm', 'assest/passives/Lucky Cat Charm.png');
loadPassiveSprite('family_recipe', 'assest/passives/Family Recipe.png');

function loadPowerUpSprite(key, src) {
  const img = new Image();
  img.onload = function () {
    POWERUP_SPRITES[key] = processSpriteImage(img);
  };
  img.src = src;
  POWERUP_SPRITES[key] = img;
}

loadPowerUpSprite('max_health', 'assest/powerups/max_health.png');
loadPowerUpSprite('damage', 'assest/powerups/damage.png');
loadPowerUpSprite('attack_speed', 'assest/powerups/attack_speed.png');
loadPowerUpSprite('move_speed', 'assest/powerups/move_speed.png');
loadPowerUpSprite('magnet', 'assest/powerups/magnet.png');
loadPowerUpSprite('luck', 'assest/powerups/luck.png');
loadPowerUpSprite('gold_gain', 'assest/powerups/gold_gain.png');
loadPowerUpSprite('revival', 'assest/powerups/revival.png');

function loadInteractableSprite(key, src) {
  const img = new Image();
  img.onload = function () {
    INTERACTABLE_SPRITES[key] = processSpriteImage(img);
  };
  img.src = src;
  INTERACTABLE_SPRITES[key] = img;
}

loadInteractableSprite('picnic_campfire', 'assest/interactables/picnic_campfire.png');
loadInteractableSprite('package', 'assest/interactables/package.png');
loadInteractableSprite('curse_altar', 'assest/interactables/curse_altar.png');
loadInteractableSprite('bill_pile', 'assest/interactables/bill_pile.png');
loadInteractableSprite('mirror', 'assest/interactables/mirror.png');
