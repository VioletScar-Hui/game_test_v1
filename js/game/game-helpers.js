import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { WEAPON_DEFS } from '../config/weapons-data.js';
import { CHARACTERS } from '../config/characters.js';
import { CHARACTER_SPRITES, CHARACTER_ANIM_SHEETS } from '../config/assets.js';
import { Player } from '../entities/player.js';
import { ArcanaInventory } from '../entities/weapon-system.js';
import { applyPowerUpsToPlayer, loadMeta } from './powerup-store.js';

export function restoreFromSave(game, save) {
  const char = CHARACTERS.find(c => c.id === save.characterId);
  if (!char) return;
  game.selectedLevelIndex = save.selectedLevelIndex || 0;
  game.selectedCharacterIndex = CHARACTERS.indexOf(char);
  if (save.mapBounds) {
    game.mapBounds = { ...save.mapBounds };
  } else {
    game.mapBounds = expandBoundsToPoint(game.mapBounds, save.playerX, save.playerY);
  }
  game.player = new Player(save.playerX || game.mapBounds.maxX / 2, save.playerY || game.mapBounds.maxY / 2);
  game.player.applyCharacterStats(char);
  game.meta = loadMeta();
  applyPowerUpsToPlayer(game.player, game.meta.powerUps);
  game.player.arcanaInventory = new ArcanaInventory();
  const sprite = CHARACTER_SPRITES[char.id];
  if (sprite) game.player.setSprite(sprite);
  const animSheets = CHARACTER_ANIM_SHEETS[char.id];
  if (animSheets) game.player.loadAnimSheets(animSheets);
  game.player.setBounds(game.mapBounds.minX, game.mapBounds.minY, game.mapBounds.maxX, game.mapBounds.maxY);
  game.player.hp = save.hp;
  game.player.maxHp = save.maxHp;
  game.player.exp = save.exp;
  game.player.gold = save.gold;
  game.player.kills = save.kills;
  game.player.level = save.level;
  if (char.startWeaponId) {
    game.player.setWeapon(WEAPON_DEFS[char.startWeaponId]);
  }
  if (save.weaponInventory) {
    for (const w of save.weaponInventory) {
      game.player.weaponInventory.add(w.id);
      if (w.level > 1) {
        for (let l = 1; l < w.level; l++) {
          game.player.weaponInventory.upgrade(w.id);
        }
      }
    }
  }
  if (save.passiveInventory) {
    for (const passive of save.passiveInventory) {
      game.player.passiveInventory.add(passive.id);
      for (let l = 1; l < passive.level; l++) {
        game.player.passiveInventory.upgrade(passive.id);
      }
    }
    game.player.recalcStats();
  }
  if (save.arcanaInventory) {
    for (const a of save.arcanaInventory) {
      for (let c = 0; c < a.count; c++) {
        game.player.arcanaInventory.add(a.id);
      }
    }
  }
  game.entityManager.clear();
  game.score = save.score || 0;
  game.gameTime = save.gameTime || 0;
  game.waveNumber = save.waveNumber || 1;
  game.difficultyMultiplier = 1.0 + (game.waveNumber - 1) * 0.1;
  game.bossSpawned = false;
  game.spawnTimers = {};
  game.particles = [];
  game.damageNumbers = [];
  game.deathQuotes = [];
  game.bossSpawnQuote = null;
  game.ambientLore = null;
  game.ambientLoreTimer = 0;
  game._generateShopItems();
  game.state = 'PLAYING';
  game.audio.init();
  game.audio.startMusic('game');
}

function expandBoundsToPoint(bounds, x, y) {
  const b = { ...bounds };
  const pad = 512;
  if (Number.isFinite(x)) {
    while (x < b.minX + pad) b.minX -= 1024;
    while (x > b.maxX - pad) b.maxX += 1024;
  }
  if (Number.isFinite(y)) {
    while (y < b.minY + pad) b.minY -= 1024;
    while (y > b.maxY - pad) b.maxY += 1024;
  }
  return b;
}

export function applyDropPickup(game, dropData) {
  if (!game.player) return;
  switch (dropData.type) {
    case 'exp':
      game.player.addExp(dropData.value);
      if (game.juice) game.juice.recordPickup();
      game.audio.playPickup();
      break;
    case 'gold':
      game.player.gold += dropData.value;
      if (game.player.arcanaInventory?.has('bill')) {
        for (const enemy of game.entityManager.getByType('enemy')) {
          const dx = enemy.x - game.player.x;
          const dy = enemy.y - game.player.y;
          if (Math.sqrt(dx * dx + dy * dy) < 160) enemy.takeDamage(dropData.value);
        }
      }
      if (game.juice) game.juice.recordPickup();
      game.audio.playPickup();
      break;
    case 'heal':
      const healAmount = Math.floor(game.player.maxHp * dropData.value);
      const missing = game.player.maxHp - game.player.hp;
      const overflow = Math.max(0, healAmount - missing);
      game.player.hp = Math.min(game.player.maxHp, game.player.hp + healAmount);
      if (overflow > 0 && game.player.arcanaInventory?.has('glutton')) {
        game.player.shield = Math.min(50, (game.player.shield || 0) + overflow);
      }
      game.audio.playPickup();
      break;
    case 'chest':
      game.openChest();
      game.audio.playExpPickup();
      break;
    case 'rare':
      game.player.gold += 50;
      game.audio.playExpPickup();
      break;
  }
}

export function createDamageNumber(game, x, y, amount) {
  let color = '#fff';
  let fontSize = 13;
  if (amount >= 100) {
    color = '#ff922b';
    fontSize = 20;
  } else if (amount >= 20) {
    color = '#ffd43b';
    fontSize = 16;
  }
  game.damageNumbers.push({
    x, y, text: `-${amount}${amount >= 100 ? '!' : ''}`, color,
    alpha: 1, life: 800, maxLife: 800, fontSize
  });
}

export function createDeathExplosion(game, x, y, color) {
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI * 2 * i) / 8;
    const speed = 0.1 + Math.random() * 0.1;
    game.particles.push({
      x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
      color, size: 3 + Math.random() * 3, alpha: 1, life: 500, maxLife: 500
    });
  }
}

export function createDeathQuote(game, x, y, text) {
  game.deathQuotes.push({ x, y, text, active: true, startTime: performance.now() });
}

export function createBossSpawnQuote(game, text) {
  game.bossSpawnQuote = { text, startTime: performance.now(), duration: 5000 };
}
