import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { ENEMIES } from '../config/enemies-data.js';
import { LEVELS } from '../config/levels.js';
import { Enemy } from '../entities/enemy.js';
import { DropItem } from '../entities/items.js';
import { DROP_ITEMS } from '../config/enemies-data.js';
import { getWaveForTime, shouldTriggerWaveEvent } from '../config/waves-data.js';
import { getArcanaChoiceForTime } from './arcana-schedule.js';
import { ARCANAS } from '../config/arcanas-data.js';
import { mulberry32 } from '../systems/rng.js';
import { applyRunProfileToDifficulty } from './m4-systems.js';

const MAP_EXPAND_MARGIN = 520;
const MAP_EXPAND_STEP = 1024;

export function updateGameLogic(game, dt) {
  if (game.juice) game.juice.update(dt);
  if (_maybeTriggerArcana(game)) return;

  const scaledDt = dt * (game.juice ? game.juice.getTimeScale() : 1);
  if (scaledDt <= 0) return;

  game.gameTime += scaledDt;
  game.waveTimer += scaledDt;
  if (game.billFrenzyTimer > 0) game.billFrenzyTimer = Math.max(0, game.billFrenzyTimer - scaledDt);
  if (_maybeCompleteTimedChallenge(game)) return;

  if (game.waveTimer >= 60000) {
    game.waveTimer = 0;
    game.waveNumber++;
    game.difficultyMultiplier += 0.1;
    game.difficultyNotifTimer = 3000;
  }

  expandMapAroundPlayer(game);
  game.player.update(scaledDt);
  expandMapAroundPlayer(game);
  game.camera.follow(game.player);
  game.cameraShake.update(scaledDt);
  game.entityManager.update(scaledDt, game);
  if (game.difficultyNotifTimer > 0) game.difficultyNotifTimer -= scaledDt;

  _maybeTriggerMirrorBoss(game);
  _spawnEnemies(game, scaledDt);
  _updateArcanaDelivery(game);
  _recycleFarEnemies(game);
  _updateParticles(game, scaledDt);
  _updateDamageNumbers(game, scaledDt);
  _updateDeathQuotes(game, scaledDt);
  _updateAmbientLore(game, scaledDt);
}

export function expandMapAroundPlayer(game, margin = MAP_EXPAND_MARGIN, step = MAP_EXPAND_STEP) {
  if (!game?.player || !game.mapBounds) return false;
  const b = game.mapBounds;
  let changed = false;
  if (game.player.x - b.minX < margin) {
    b.minX -= step;
    changed = true;
  }
  if (b.maxX - game.player.x < margin) {
    b.maxX += step;
    changed = true;
  }
  if (game.player.y - b.minY < margin) {
    b.minY -= step;
    changed = true;
  }
  if (b.maxY - game.player.y < margin) {
    b.maxY += step;
    changed = true;
  }
  if (!changed) return false;
  game.player.setBounds(b.minX, b.minY, b.maxX, b.maxY);
  game._levelPropCache = null;
  return true;
}

function _updateArcanaDelivery(game) {
  if (!game.player?.arcanaInventory?.has('delivery')) return;
  if (!game._nextDeliveryAt) game._nextDeliveryAt = 60000;
  if (game.gameTime < game._nextDeliveryAt) return;
  game._nextDeliveryAt += 60000;
  const pos = {
    x: Math.max(game.mapBounds.minX + 40, Math.min(game.mapBounds.maxX - 40, game.player.x + (Math.random() - 0.5) * 220)),
    y: Math.max(game.mapBounds.minY + 40, Math.min(game.mapBounds.maxY - 40, game.player.y + (Math.random() - 0.5) * 220))
  };
  const drop = Math.random() < 0.15 ? DROP_ITEMS.lunchbox : (Math.random() < 0.5 ? DROP_ITEMS.whole_chicken : DROP_ITEMS.red_candy);
  game.entityManager.add(new DropItem(pos.x, pos.y, drop));
}

function _spawnEnemies(game, dt) {
  const levelIndex = Math.max(0, game.selectedLevelIndex || 0);
  const level = LEVELS[levelIndex] || LEVELS[0];
  const wave = getWaveForTime(level.id, game.gameTime);
  const minuteKey = `${level.id}:${wave.minute}`;
  const currentEnemies = game.entityManager.getByType('enemy').length;
  const profile = game.runProfile || {};
  const profileDensity = profile.densityMultiplier || 1;
  const maxOnScreen = Math.floor(wave.maxOnScreen * (game.billFrenzyTimer > 0 ? 2 : 1) * profileDensity);

  if (profile.noCommonEnemies) {
    _spawnChallengeElite(game, dt, wave, minuteKey, maxOnScreen);
    return;
  }

  if (shouldTriggerWaveEvent(wave, 'elite') && !game.triggeredWaveEvents.has(`${minuteKey}:elite`)) {
    game.triggeredWaveEvents.add(`${minuteKey}:elite`);
    const eliteData = ENEMIES.elite.find(e => e.id === wave.eliteId) || ENEMIES.elite.find(e => e.level === level.id);
    if (eliteData) _spawnEnemy(game, eliteData, 'elite', wave.minute);
  }

  if (shouldTriggerWaveEvent(wave, 'boss') && !game.bossSpawned) {
    game.spawnBoss();
    return;
  }

  if (currentEnemies >= maxOnScreen) return;

  const entries = profile.forcedEnemyId
    ? [{ id: profile.forcedEnemyId, interval: Math.max(160, 620 - wave.minute * 14), count: Math.max(1, Math.floor(1 + wave.minute / 8)) }]
    : wave.enemies;

  for (const entry of entries) {
    const data = ENEMIES.common.find(e => e.id === entry.id);
    if (!data) continue;
    const key = `${wave.minute}:${entry.id}`;
    if (!game.spawnTimers[key]) game.spawnTimers[key] = 0;
    game.spawnTimers[key] += dt;
    const density = (game.billFrenzyTimer > 0 ? 2 : 1) * profileDensity;
    const interval = Math.max(140, entry.interval / game.difficultyMultiplier / density);
    if (game.spawnTimers[key] >= interval) {
      game.spawnTimers[key] -= interval;
      const count = Math.min(entry.count * density, maxOnScreen - game.entityManager.getByType('enemy').length);
      for (let n = 0; n < count; n++) _spawnEnemy(game, data, 'common', wave.minute);
    }
  }
}

function _maybeTriggerMirrorBoss(game) {
  if (game.bossSpawned || !game.meta?.m4?.unlocks?.mirrorBoss) return;
  const level = LEVELS[Math.max(0, game.selectedLevelIndex || 0)] || LEVELS[0];
  if (level.id !== 'moonboba') return;
  if (game.gameTime < 15 * 60_000) return;
  if (typeof game.spawnMirrorBoss === 'function') game.spawnMirrorBoss();
}

function _spawnEnemy(game, data, enemyType, minute) {
  const pos = _randomSpawnAroundCamera(game);
  const enemy = new Enemy(pos.x, pos.y, data, enemyType);
  const hpScale = (1 + 0.10 * minute) * game.difficultyMultiplier;
  const atkScale = 1 + 0.05 * minute;
  const scaled = applyRunProfileToDifficulty({
    hp: Math.ceil(enemy.hp * hpScale),
    atk: Math.ceil(enemy.atk * atkScale),
    speed: enemy.speed,
    gold: 1
  }, game.runProfile || {});
  enemy.hp = scaled.hp;
  enemy.maxHp = enemy.hp;
  enemy.atk = scaled.atk;
  enemy.speed = scaled.speed;
  if (enemyType === 'elite') enemy.radius = 24;
  if (enemyType === 'boss') enemy.radius = 50;
  enemy.setTarget(game.player);
  game.entityManager.add(enemy);
  game.bestiary.unlockEnemy(data.id);
}

function _spawnChallengeElite(game, dt, wave, minuteKey, maxOnScreen) {
  if (game.entityManager.getByType('enemy').length >= Math.max(1, maxOnScreen)) return;
  const interval = game.runProfile?.eliteIntervalMs || 90_000;
  const key = 'challenge_elite';
  if (!game.spawnTimers[key]) game.spawnTimers[key] = interval - 1000;
  game.spawnTimers[key] += dt;
  if (game.spawnTimers[key] < interval) return;
  game.spawnTimers[key] = 0;
  const eliteData = ENEMIES.elite[wave.minute % ENEMIES.elite.length] || ENEMIES.boss;
  _spawnEnemy(game, eliteData, 'elite', wave.minute);
  game.triggeredWaveEvents.add(`${minuteKey}:challenge_elite`);
}

function _maybeCompleteTimedChallenge(game) {
  const duration = game.runProfile?.durationMs;
  if (!duration || game._runFinished || game.state !== 'PLAYING') return false;
  if (game.gameTime < duration) return false;
  game.victory();
  return true;
}

function _randomSpawnAroundCamera(game) {
  const marginMin = 100;
  const marginMax = 300;
  const side = Math.floor(Math.random() * 4);
  const offset = marginMin + Math.random() * (marginMax - marginMin);
  let x;
  let y;
  if (side === 0) {
    x = game.camera.x + Math.random() * GAME_WIDTH;
    y = game.camera.y - offset;
  } else if (side === 1) {
    x = game.camera.x + GAME_WIDTH + offset;
    y = game.camera.y + Math.random() * GAME_HEIGHT;
  } else if (side === 2) {
    x = game.camera.x + Math.random() * GAME_WIDTH;
    y = game.camera.y + GAME_HEIGHT + offset;
  } else {
    x = game.camera.x - offset;
    y = game.camera.y + Math.random() * GAME_HEIGHT;
  }
  const b = game.mapBounds;
  return {
    x: Math.max(b.minX + 20, Math.min(b.maxX - 20, x)),
    y: Math.max(b.minY + 20, Math.min(b.maxY - 20, y))
  };
}

function _recycleFarEnemies(game) {
  for (const enemy of game.entityManager.getByType('enemy')) {
    const sx = enemy.x - game.camera.x;
    const sy = enemy.y - game.camera.y;
    if (sx > -800 && sx < GAME_WIDTH + 800 && sy > -800 && sy < GAME_HEIGHT + 800) continue;
    const pos = _randomSpawnAroundCamera(game);
    enemy.x = pos.x;
    enemy.y = pos.y;
  }
}

function _maybeTriggerArcana(game) {
  if (!game.player || !game.player.arcanaInventory) return false;
  const choice = getArcanaChoiceForTime(game.gameTime, game.claimedArcanaSlots);
  if (!choice) return false;
  game.pendingArcanaSlot = choice.slot;
  game.claimedArcanaSlots.add(choice.slot);
  const rng = mulberry32((game.runSeed + choice.slot * 1013904223) >>> 0);
  const unlocked = new Set(game.meta?.unlockedArcanas || ARCANAS.slice(0, 6).map(arcana => arcana.id));
  const available = ARCANAS.filter(arcana => unlocked.has(arcana.id) && game.player.arcanaInventory.canAdd(arcana.id));
  game.arcanaOptions = [];
  while (game.arcanaOptions.length < 3 && available.length > 0) {
    const index = Math.floor(rng() * available.length);
    game.arcanaOptions.push(available.splice(index, 1)[0]);
  }
  game.setState('ARCANA_SELECT');
  game.audio.playLevelUp();
  return true;
}

function _updateParticles(game, dt) {
  if (!game.particles) return;
  for (let i = game.particles.length - 1; i >= 0; i--) {
    const p = game.particles[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.life -= dt;
    if (p.life <= 0) {
      game.particles.splice(i, 1);
    } else {
      p.alpha = p.life / p.maxLife;
      p.size *= 0.98;
    }
  }
}

function _updateDamageNumbers(game, dt) {
  if (!game.damageNumbers) return;
  for (let i = game.damageNumbers.length - 1; i >= 0; i--) {
    const dn = game.damageNumbers[i];
    dn.y -= 0.03 * dt;
    dn.life -= dt;
    if (dn.life <= 0) {
      game.damageNumbers.splice(i, 1);
    } else {
      dn.alpha = dn.life / dn.maxLife;
    }
  }
}

function _updateDeathQuotes(game, dt) {
  if (!game.deathQuotes) return;
  for (let i = game.deathQuotes.length - 1; i >= 0; i--) {
    if (!game.deathQuotes[i].active) {
      game.deathQuotes.splice(i, 1);
    }
  }
}

function _updateAmbientLore(game, dt) {
  if (game.ambientLore) {
    const elapsed = performance.now() - game.ambientLore.startTime;
    if (elapsed > game.ambientLore.duration) {
      game.ambientLore = null;
    }
    return;
  }
  game.ambientLoreTimer += dt;
  if (game.ambientLoreTimer >= 15000) {
    game.ambientLoreTimer = 0;
    const level = LEVELS[game.selectedLevelIndex] || LEVELS[0];
    if (level.ambientLore && level.ambientLore.length > 0) {
      const idx = Math.floor(Math.random() * level.ambientLore.length);
      game.ambientLore = {
        text: level.ambientLore[idx],
        startTime: performance.now(),
        duration: 5000
      };
    }
  }
}
