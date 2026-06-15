export const ANIMATION_FRAME_SIZE = 362;

export const ANIMATION_DEFS = {
  idle: {
    cols: 4,
    rows: 3,
    frames: 6,
    frameDuration: 120,
    loop: true,
    priority: 0,
    transitionMs: 140
  },
  walk: {
    cols: 6,
    rows: 8,
    frames: 6,
    frameDuration: 80,
    loop: true,
    priority: 1,
    transitionMs: 120
  },
  run: {
    cols: 6,
    rows: 7,
    frames: 6,
    frameDuration: 60,
    loop: true,
    priority: 2,
    transitionMs: 100
  },
  hit: {
    cols: 6,
    rows: 1,
    frames: 6,
    frameDuration: 100,
    loop: false,
    priority: 6,
    transitionMs: 70
  },
  skill: {
    cols: 6,
    rows: 1,
    frames: 6,
    frameDuration: 80,
    loop: false,
    priority: 8,
    transitionMs: 90
  },
  death: {
    cols: 6,
    rows: 1,
    frames: 6,
    frameDuration: 150,
    loop: false,
    priority: 10,
    transitionMs: 60
  }
};

const NORMAL_ACTIONS = new Set(['idle', 'walk', 'run']);
export const CHARACTER_MOVE_DIRECTIONS = [
  'up',
  'down',
  'left',
  'right',
  'up_left',
  'up_right',
  'down_left',
  'down_right'
];

const CHARACTER_IDS = ['antonio', 'imelda', 'gennaro'];
const ENEMY_IDS = [
  'hangry_pigeon',
  'crispy_squirrel',
  'sleepy_moth',
  'bouncy_toad',
  'guilty_cricket',
  'sous_chef_zombie',
  'pastry_architect_golem',
  'librarian_ghost',
  'quality_control_robot',
  'sommelier_poltergeist',
  'health_inspector'
];

const WEAPON_ACTION_COUNTS = {
  bouncing_slipper: { fly: 4, impact: 4 },
  spinning_ladle: { loop: 6 },
  boomerang_cleaver: { fly: 6, return: 4, impact: 4 },
  throwing_chopsticks: { fly: 4, impact: 4 },
  holy_toast: { lob: 4, splash: 4 },
  garlic_breath: { loop: 6 },
  rolling_pin: { slash: 6 },
  hot_sauce_bottle: { spray: 6, burn: 4 },
  whip: { slash: 6 },
  cross: { fly: 6, return: 4, impact: 4 },
  divine_slipper: { fly: 4, impact: 4 },
  excalibur_ladle: { loop: 6, slash: 6 },
  meat_grinder: { fly: 6, return: 4, impact: 4 },
  infinite_hot_pot: { spray: 6, burn: 4, splash: 4 },
  thermal_bag: { shield: 6 },
  freezer_gate: { ray: 6 },
  service_bell: { pulse: 6 },
  michelin_cloak: { shield: 6, revive: 6 },
  infinite_buffet: { ray: 6 },
  gorgeous_moonboba: { pulse: 6 }
};

function makeCharacterFramePaths(charId, action, direction = null) {
  const count = ANIMATION_DEFS[action].frames;
  const segment = direction ? `${action}/${direction}` : action;
  return Array.from({ length: count }, (_, index) => (
    `assest/characters/${charId}/${segment}/frame_${String(index).padStart(2, '0')}.png`
  ));
}

function makeCharacterFrameSet(charId) {
  const makeDirectionalSet = action => ({
    default: makeCharacterFramePaths(charId, action, 'down'),
    ...Object.fromEntries(
      CHARACTER_MOVE_DIRECTIONS.map(direction => [
        direction,
        makeCharacterFramePaths(charId, action, direction)
      ])
    )
  });

  return {
    idle: makeCharacterFramePaths(charId, 'idle'),
    walk: makeDirectionalSet('walk'),
    run: makeDirectionalSet('run'),
    hit: makeCharacterFramePaths(charId, 'hit'),
    skill: makeCharacterFramePaths(charId, 'skill'),
    death: makeCharacterFramePaths(charId, 'death')
  };
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

export const CHARACTER_ANIMATION_FRAMES = Object.fromEntries(
  CHARACTER_IDS.map(charId => [charId, makeCharacterFrameSet(charId)])
);
CHARACTER_ANIMATION_FRAMES.little_antonio = makeCharacterFrameSet('antonio');

export const ENEMY_ANIMATION_FRAMES = Object.fromEntries(
  ENEMY_IDS.map(enemyId => [enemyId, {
    idle: makeEnemyFramePaths(enemyId, 'idle', 4),
    move: makeEnemyFramePaths(enemyId, 'move', 4),
    hit: makeEnemyFramePaths(enemyId, 'hit', 2),
    death: makeEnemyFramePaths(enemyId, 'death', 2)
  }])
);

export const WEAPON_ANIMATION_FRAMES = Object.fromEntries(
  Object.entries(WEAPON_ACTION_COUNTS).map(([weaponId, actions]) => [
    weaponId,
    Object.fromEntries(
      Object.entries(actions).map(([action, count]) => [
        action,
        makeWeaponFramePaths(weaponId, action, count)
      ])
    )
  ])
);

export function resolveEnemyAnimationAction({ active = true, isMoving = false, hitFlash = 0 } = {}) {
  if (!active) return 'death';
  if (hitFlash > 0) return 'hit';
  return isMoving ? 'move' : 'idle';
}

export function getWeaponActionFrames(weaponId, action = 'fly') {
  const actions = WEAPON_ANIMATION_FRAMES[weaponId];
  if (!actions) return null;
  if (actions[action]) return actions[action];
  const fallbackOrder = ['fly', 'loop', 'slash', 'spray', 'lob', 'ray', 'shield', 'pulse', 'revive', 'return', 'impact', 'splash', 'burn'];
  for (const fallback of fallbackOrder) {
    if (actions[fallback]) return actions[fallback];
  }
  return null;
}

export function createAnimationParams(player, inputManager) {
  const input = inputManager ? inputManager.getDirection() : { x: 0, y: 0 };
  const moveX = input.x || 0;
  const moveY = input.y || 0;
  const speed = Math.hypot(moveX, moveY);
  const isMoving = speed > 0;
  const shiftRunning = !!(
    inputManager &&
    (inputManager.isKeyDown('ShiftLeft') || inputManager.isKeyDown('ShiftRight'))
  );

  let direction = player._animDirection || 'down';
  if (isMoving) {
    const deadzone = 0.28;
    if (moveY < -deadzone && moveX < -deadzone) {
      direction = 'up_left';
    } else if (moveY < -deadzone && moveX > deadzone) {
      direction = 'up_right';
    } else if (moveY > deadzone && moveX < -deadzone) {
      direction = 'down_left';
    } else if (moveY > deadzone && moveX > deadzone) {
      direction = 'down_right';
    } else if (Math.abs(moveX) >= Math.abs(moveY)) {
      direction = moveX < 0 ? 'left' : 'right';
    } else {
      direction = moveY < 0 ? 'up' : 'down';
    }
  }

  return {
    isDead: !player.active || player.hp <= 0,
    isUsingSkill: !!player._isUsingSkill,
    isHit: !!player._hitAnim,
    isDashing: !!player.isDashing,
    isMoving,
    isRunning: !!player.isDashing || (isMoving && shiftRunning),
    direction,
    moveX,
    moveY,
    speed
  };
}

export function resolveAnimationState(params) {
  if (params.isDead) return 'death';
  if (params.isUsingSkill) return 'skill';
  if (params.isHit) return 'hit';
  if (params.isDashing || params.isRunning) return 'run';
  if (params.isMoving) return 'walk';
  return 'idle';
}

export function canTransitionAnimation(current, next, currentFinished = false) {
  if (!ANIMATION_DEFS[current] || !ANIMATION_DEFS[next]) return false;
  if (current === next) return currentFinished;
  if (current === 'death') return false;
  if (next === 'death') return true;
  if (current === 'skill' && !currentFinished) return false;
  if (next === 'skill') return true;
  if (current === 'hit' && !currentFinished) return false;
  if (next === 'hit') return NORMAL_ACTIONS.has(current) || currentFinished;
  if (NORMAL_ACTIONS.has(current) && NORMAL_ACTIONS.has(next)) return true;
  if (currentFinished) return true;

  return ANIMATION_DEFS[next].priority >= ANIMATION_DEFS[current].priority;
}
