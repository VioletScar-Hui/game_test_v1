export function applyFunctionalWeaponTick(game, weapon, dt) {
  if (!game?.player || !weapon) return false;
  const behavior = getFunctionalBehavior(weapon.id);
  if (!behavior) return false;
  if (!game.player.functionalState) game.player.functionalState = {};
  if (!game.player.functionalState[weapon.id]) {
    game.player.functionalState[weapon.id] = {
      timer: 0,
      layers: 0,
      deathPreventUsed: false,
      angle: 0
    };
  }
  const state = game.player.functionalState[weapon.id];
  state.timer += dt;

  if (behavior === 'shield') return tickThermalBag(game, weapon, state);
  if (behavior === 'freeze') return tickFreezerGate(game, weapon, state);
  if (behavior === 'clear') return tickServiceBell(game, weapon, state);
  return false;
}

export function getFunctionalWeaponSummary(weapon) {
  const behavior = getFunctionalBehavior(weapon.id);
  if (behavior === 'shield') {
    return `护盾 ${getShieldLayers(weapon)} 层，${Math.round(getShieldChargeMs(weapon) / 1000)} 秒充能`;
  }
  if (behavior === 'freeze') {
    return `${getFreezeRays(weapon)} 道冻结射线，冻结 ${Math.round(getFreezeDurationMs(weapon) / 1000)} 秒`;
  }
  if (behavior === 'clear') {
    return `${Math.round(getBellCooldownMs(weapon) / 1000)} 秒清理普通敌人`;
  }
  return '';
}

export function isDeathPreventWeapon(weaponId) {
  return weaponId === 'michelin_cloak';
}

export function consumeMichelinDeathPrevent(player) {
  const state = player?.functionalState?.michelin_cloak;
  if (!state || state.deathPreventUsed) return false;
  state.deathPreventUsed = true;
  state.layers = Math.max(state.layers || 0, 1);
  player.hp = Math.max(1, Math.floor(player.maxHp * 0.35));
  player.invincibleTimer = Math.max(player.invincibleTimer || 0, 1800);
  return true;
}

function tickThermalBag(game, weapon, state) {
  const chargeMs = getShieldChargeMs(weapon);
  const maxLayers = getShieldLayers(weapon);
  let changed = false;
  if (state.timer >= chargeMs && state.layers < maxLayers) {
    state.timer -= chargeMs;
    state.layers = maxLayers;
    changed = true;
  }
  const shieldPerLayer = weapon.id === 'michelin_cloak' ? 90 : 55;
  const targetShield = state.layers * shieldPerLayer;
  if ((game.player.shield || 0) < targetShield) {
    game.player.shield = targetShield;
    changed = true;
  }
  if (changed) {
    addRingParticles(game, '#91f2d2', 9);
    addFunctionalActionEffect(game, weapon.id, 'shield', {
      size: weapon.id === 'michelin_cloak' ? 300 : 260,
      life: weapon.id === 'michelin_cloak' ? 620 : 520
    });
  }
  return changed;
}

function tickFreezerGate(game, weapon, state) {
  const interval = getFreezeIntervalMs(weapon);
  if (state.timer < interval) return false;
  state.timer = 0;
  state.angle = (state.angle || 0) + Math.PI / Math.max(2, getFreezeRays(weapon));
  const rays = getFreezeRays(weapon);
  const duration = getFreezeDurationMs(weapon);
  const range = weapon.id === 'infinite_buffet' ? 620 : 520;
  const enemies = game.entityManager?.getByType?.('enemy') || [];
  let hit = 0;
  for (let i = 0; i < rays; i++) {
    const angle = state.angle + (Math.PI * 2 * i) / rays;
    for (const enemy of enemies) {
      if (!enemy.active && enemy.active !== undefined) continue;
      if (isEnemyInRay(game.player, enemy, angle, range)) {
        enemy.frozenTimer = Math.max(enemy.frozenTimer || 0, duration);
        if (weapon.id === 'infinite_buffet') {
          const damage = Math.max(1, Math.floor((enemy.hp || 1) * 0.08));
          if (enemy.takeDamage) enemy.takeDamage(damage);
          else enemy.hp = Math.max(0, (enemy.hp || 0) - damage);
        }
        hit++;
      }
    }
  }
  if (hit > 0 && game.runUnlockFlags) game.runUnlockFlags.add('frozen_ticket');
  addRayParticles(game, '#9bdfff', rays, range, state.angle);
  addFunctionalActionEffect(game, weapon.id, 'ray', {
    size: weapon.id === 'infinite_buffet' ? 420 : 360,
    life: weapon.id === 'infinite_buffet' ? 620 : 520,
    rotation: weapon.id === 'infinite_buffet' ? state.angle * 0.35 : state.angle
  });
  return true;
}

function tickServiceBell(game, weapon, state) {
  const cooldown = getBellCooldownMs(weapon);
  if (state.timer < cooldown) return false;
  state.timer = 0;
  const enemies = game.entityManager?.getByType?.('enemy') || [];
  let cleared = 0;
  for (const enemy of enemies) {
    if (enemy.enemyType !== 'common') continue;
    if (weapon.id === 'gorgeous_moonboba') {
      if (enemy.takeDamage) enemy.takeDamage(Math.max(enemy.hp || 1, 1));
      else enemy.active = false;
    } else {
      enemy.active = false;
    }
    cleared++;
  }
  if (weapon.level < 6) {
    const drops = game.entityManager?.getByType?.('drop') || [];
    for (const drop of drops) drop.active = false;
  } else if (weapon.id === 'gorgeous_moonboba') {
    const drops = game.entityManager?.getByType?.('drop') || [];
    for (const drop of drops) drop.picked = true;
  }
  if (weapon.id === 'gorgeous_moonboba') {
    for (const enemy of enemies) {
      if (!enemy.active || enemy.enemyType === 'common') continue;
      if (enemy.takeDamage) enemy.takeDamage(Math.max(20, Math.floor((enemy.maxHp || 100) * 0.12)));
    }
  }
  if (cleared > 0 && game.runUnlockFlags) game.runUnlockFlags.add('service_shift');
  addRingParticles(game, weapon.id === 'gorgeous_moonboba' ? '#eebefa' : '#ffd43b', 18);
  addFunctionalActionEffect(game, weapon.id, 'pulse', {
    size: weapon.id === 'gorgeous_moonboba' ? 430 : 380,
    life: weapon.id === 'gorgeous_moonboba' ? 720 : 620
  });
  return true;
}

function getFunctionalBehavior(id) {
  if (id === 'thermal_bag' || id === 'michelin_cloak') return 'shield';
  if (id === 'freezer_gate' || id === 'infinite_buffet') return 'freeze';
  if (id === 'service_bell' || id === 'gorgeous_moonboba') return 'clear';
  return null;
}

function getLevel(weapon) {
  return Math.max(1, Math.min(8, weapon.level || 1));
}

function getShieldChargeMs(weapon) {
  if (weapon.id === 'michelin_cloak') return 3500;
  return Math.round(8000 - ((getLevel(weapon) - 1) / 7) * 4000);
}

function getShieldLayers(weapon) {
  if (weapon.id === 'michelin_cloak') return 3;
  return getLevel(weapon) >= 8 ? 3 : (getLevel(weapon) >= 4 ? 2 : 1);
}

function getFreezeIntervalMs(weapon) {
  if (weapon.id === 'infinite_buffet') return 2800;
  return Math.round(6200 - ((getLevel(weapon) - 1) / 7) * 2400);
}

function getFreezeDurationMs(weapon) {
  if (weapon.id === 'infinite_buffet') return 4200;
  return Math.round(1000 + ((getLevel(weapon) - 1) / 7) * 3000);
}

function getFreezeRays(weapon) {
  if (weapon.id === 'infinite_buffet') return 3;
  return getLevel(weapon) >= 8 ? 3 : (getLevel(weapon) >= 4 ? 2 : 1);
}

function getBellCooldownMs(weapon) {
  if (weapon.id === 'gorgeous_moonboba') return 38_000;
  return Math.round(90_000 - ((getLevel(weapon) - 1) / 7) * 45_000);
}

function isEnemyInRay(player, enemy, angle, range) {
  if (!Number.isFinite(enemy.x) || !Number.isFinite(enemy.y)) return true;
  const dx = enemy.x - player.x;
  const dy = enemy.y - player.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist > range) return false;
  if (dist < 80) return true;
  const enemyAngle = Math.atan2(dy, dx);
  const diff = Math.abs(wrapAngle(enemyAngle - angle));
  return diff < Math.PI / 9;
}

function wrapAngle(angle) {
  while (angle > Math.PI) angle -= Math.PI * 2;
  while (angle < -Math.PI) angle += Math.PI * 2;
  return angle;
}

function addRingParticles(game, color, count) {
  if (!game.particles || !game.player) return;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    game.particles.push({
      x: game.player.x,
      y: game.player.y,
      vx: Math.cos(angle) * 0.12,
      vy: Math.sin(angle) * 0.12,
      color,
      size: 4,
      alpha: 0.85,
      life: 520,
      maxLife: 520,
      active: true
    });
  }
}

export function addFunctionalActionEffect(game, weaponId, action, options = {}) {
  addWeaponActionEffect(game, weaponId, action, options);
}

export function addWeaponActionEffect(game, weaponId, action, options = {}) {
  if (!game?.particles || !game.player) return;
  const life = options.life || 560;
  const x = Number.isFinite(options.x) ? options.x : game.player.x + (options.offsetX || 0);
  const y = Number.isFinite(options.y) ? options.y : game.player.y + (options.offsetY || 0);
  game.particles.push({
    x,
    y,
    vx: 0,
    vy: 0,
    color: options.color || '#fff',
    size: options.size || 320,
    alpha: options.alpha || 0.92,
    life,
    maxLife: life,
    active: true,
    rotation: options.rotation || 0,
    weaponAction: {
      weaponId,
      action,
      frameMs: options.frameMs || 86
    }
  });
}

function addRayParticles(game, color, rays, range, baseAngle) {
  if (!game.particles || !game.player) return;
  for (let i = 0; i < rays; i++) {
    const angle = baseAngle + (Math.PI * 2 * i) / rays;
    for (let step = 1; step <= 5; step++) {
      game.particles.push({
        x: game.player.x + Math.cos(angle) * range * (step / 6),
        y: game.player.y + Math.sin(angle) * range * (step / 6),
        vx: 0,
        vy: 0,
        color,
        size: 5 - step * 0.45,
        alpha: 0.65,
        life: 360,
        maxLife: 360,
        active: true
      });
    }
  }
}
