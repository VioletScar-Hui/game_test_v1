import { CHARACTERS } from '../config/characters.js';
import { LEVELS } from '../config/levels.js';
import { ARCANAS } from '../config/arcanas-data.js';
import { UNLOCK_RULES } from '../config/unlocks-data.js';
import { normalizeMeta } from './powerup-store.js';
import { recordM4Run } from './m4-systems.js';

const SURVIVAL_UNLOCK_MS = 15 * 60 * 1000;

export function getUnlockedCharacterIds(meta) {
  return normalizeMeta(meta).unlockedCharacters;
}

export function getUnlockedLevelIds(meta) {
  return normalizeMeta(meta).unlockedLevels;
}

export function getUnlockedWeaponIds(meta) {
  return normalizeMeta(meta).unlockedWeapons;
}

export function getUnlockedArcanaIds(meta) {
  return normalizeMeta(meta).unlockedArcanas;
}

export function isCharacterUnlocked(meta, characterId) {
  return getUnlockedCharacterIds(meta).includes(characterId);
}

export function isLevelUnlocked(meta, levelId) {
  return getUnlockedLevelIds(meta).includes(levelId);
}

export function isArcanaUnlocked(meta, arcanaId) {
  return getUnlockedArcanaIds(meta).includes(arcanaId);
}

export function getCharacterUnlockText(characterId) {
  if (characterId === 'antonio') return '默认可用';
  return UNLOCK_RULES.characters.find(rule => rule.id === characterId)?.desc || '达成隐藏条件';
}

export function getLevelUnlockText(levelId) {
  if (levelId === 'hungry_forest') return '默认可用';
  return UNLOCK_RULES.levels.find(rule => rule.id === levelId)?.desc || '完成前置关卡';
}

export function evaluateUnlocks(meta) {
  const next = normalizeMeta(meta);
  const added = {
    characters: [],
    levels: [],
    weapons: [],
    arcanas: []
  };

  for (const rule of UNLOCK_RULES.characters) {
    if (!next.unlockedCharacters.includes(rule.id) && rule.test(next)) {
      next.unlockedCharacters.push(rule.id);
      added.characters.push(rule.id);
    }
  }

  for (const rule of UNLOCK_RULES.levels) {
    const unlocked = rule.test
      ? rule.test(next)
      : hasBossClear(next, rule.previousLevelId) ||
        (next.progress.levelBestTime[rule.previousLevelId] || 0) >= SURVIVAL_UNLOCK_MS;
    if (!next.unlockedLevels.includes(rule.id) && unlocked) {
      next.unlockedLevels.push(rule.id);
      added.levels.push(rule.id);
    }
  }

  for (const rule of UNLOCK_RULES.weapons) {
    if (!next.unlockedWeapons.includes(rule.id) && rule.test(next)) {
      next.unlockedWeapons.push(rule.id);
      added.weapons.push(rule.id);
    }
  }

  for (const rule of UNLOCK_RULES.arcanas) {
    if (!next.unlockedArcanas.includes(rule.id) && rule.test(next)) {
      next.unlockedArcanas.push(rule.id);
      added.arcanas.push(rule.id);
    }
  }

  next.unlockedCharacters = next.unlockedCharacters.filter(id => CHARACTERS.some(char => char.id === id) || id === 'little_antonio');
  next.unlockedLevels = next.unlockedLevels.filter(id => LEVELS.some(level => level.id === id) || id === 'moonboba');
  next.unlockedArcanas = next.unlockedArcanas.filter(id => ARCANAS.some(arcana => arcana.id === id));
  return { meta: next, added };
}

export function recordRunProgress(meta, run) {
  const next = normalizeMeta(meta);
  next.progress.totalKills += Math.max(0, run.kills || 0);
  next.progress.maxCharacterLevel = Math.max(next.progress.maxCharacterLevel || 1, run.level || 1);
  if (run.levelId) {
    const previous = next.progress.levelBestTime[run.levelId] || 0;
    next.progress.levelBestTime[run.levelId] = Math.max(previous, run.time || 0);
    if (run.won || run.bossKilled) {
      next.progress.bossClears = Array.from(new Set([
        ...(next.progress.bossClears || []),
        run.levelId
      ]));
    }
  }
  if (run.packageOpened) next.progress.packageOpened = true;
  if (run.mirrorSeen) next.progress.mirrorSeen = true;
  if (run.evolvedWeapons) {
    next.progress.evolvedWeapons = Array.from(new Set([
      ...next.progress.evolvedWeapons,
      ...run.evolvedWeapons
    ]));
  }
  if (run.weaponUnlockFlags) {
    next.progress.weaponUnlockFlags = Array.from(new Set([
      ...next.progress.weaponUnlockFlags,
      ...run.weaponUnlockFlags
    ]));
  }
  next.m4 = recordM4Run(next.m4, run);
  return evaluateUnlocks(next);
}

function hasBossClear(meta, levelId) {
  return !!levelId && (meta.progress.bossClears || []).includes(levelId);
}
