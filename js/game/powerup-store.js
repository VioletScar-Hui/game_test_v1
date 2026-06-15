import { createDefaultM4Meta, getTalentEffects, normalizeM4Meta } from './m4-systems.js';

export const POWERUP_DEFS = {
  max_health: {
    id: 'max_health',
    name: '生命上限',
    maxLevel: 5,
    baseCost: 80,
    perLevel: 0.08,
    desc: '每级最大生命 +8%。'
  },
  damage: {
    id: 'damage',
    name: '伤害',
    maxLevel: 5,
    baseCost: 120,
    perLevel: 0.06,
    desc: '每级武器伤害 +6%。'
  },
  attack_speed: {
    id: 'attack_speed',
    name: '攻击速度',
    maxLevel: 5,
    baseCost: 120,
    perLevel: 0.05,
    desc: '每级武器冷却缩短。'
  },
  move_speed: {
    id: 'move_speed',
    name: '移动速度',
    maxLevel: 5,
    baseCost: 90,
    perLevel: 0.04,
    desc: '每级移动速度 +4%。'
  },
  magnet: {
    id: 'magnet',
    name: '拾取范围',
    maxLevel: 5,
    baseCost: 90,
    perLevel: 0.10,
    desc: '每级拾取范围 +10%。'
  },
  luck: {
    id: 'luck',
    name: '幸运',
    maxLevel: 5,
    baseCost: 110,
    perLevel: 0.06,
    desc: '每级幸运 +6%。'
  },
  gold_gain: {
    id: 'gold_gain',
    name: '金币收益',
    maxLevel: 5,
    baseCost: 100,
    perLevel: 0.10,
    desc: '每级跨局金币收益 +10%。'
  },
  revival: {
    id: 'revival',
    name: '复活',
    maxLevel: 1,
    baseCost: 450,
    perLevel: 1,
    desc: '每局获得一次额外复活。'
  }
};

const META_KEY = 'vs_meta';

export function createDefaultPowerUps() {
  return Object.fromEntries(Object.keys(POWERUP_DEFS).map(id => [id, { id, level: 0 }]));
}

export function createDefaultMeta() {
  return {
    version: 4,
    goldBank: 0,
    powerUps: createDefaultPowerUps(),
    unlockedCharacters: ['antonio'],
    unlockedLevels: ['hungry_forest'],
    unlockedWeapons: [
      'bouncing_slipper',
      'spinning_ladle',
      'boomerang_cleaver',
      'throwing_chopsticks',
      'holy_toast',
      'garlic_breath',
      'rolling_pin',
      'hot_sauce_bottle',
      'thermal_bag',
      'freezer_gate',
      'service_bell'
    ],
    unlockedArcanas: ['fool', 'gemini', 'priestess', 'emperor', 'hanged_man', 'glutton'],
    sealedUpgrades: [],
    progress: {
      totalKills: 0,
      maxCharacterLevel: 1,
      levelBestTime: {},
      packageOpened: false,
      mirrorSeen: false,
      bossClears: [],
      evolvedWeapons: [],
      weaponUnlockFlags: []
    },
    m4: createDefaultM4Meta()
  };
}

export function normalizeMeta(meta) {
  const defaults = createDefaultMeta();
  const merged = {
    ...defaults,
    ...(meta || {}),
    powerUps: {
      ...defaults.powerUps,
      ...(meta?.powerUps || {})
    },
    progress: {
      ...defaults.progress,
      ...(meta?.progress || {}),
      levelBestTime: {
        ...defaults.progress.levelBestTime,
        ...(meta?.progress?.levelBestTime || {})
      },
      bossClears: Array.from(new Set([
        ...defaults.progress.bossClears,
        ...(meta?.progress?.bossClears || [])
      ])),
      evolvedWeapons: Array.from(new Set([
        ...defaults.progress.evolvedWeapons,
        ...(meta?.progress?.evolvedWeapons || [])
      ])),
      weaponUnlockFlags: Array.from(new Set([
        ...defaults.progress.weaponUnlockFlags,
        ...(meta?.progress?.weaponUnlockFlags || [])
      ]))
    },
    m4: normalizeM4Meta(meta?.m4 || defaults.m4)
  };
  merged.version = Math.max(defaults.version, Number(merged.version) || defaults.version);
  merged.unlockedCharacters = Array.from(new Set(merged.unlockedCharacters || defaults.unlockedCharacters));
  merged.unlockedLevels = Array.from(new Set(merged.unlockedLevels || defaults.unlockedLevels));
  merged.unlockedWeapons = Array.from(new Set(merged.unlockedWeapons || defaults.unlockedWeapons));
  merged.unlockedArcanas = Array.from(new Set(merged.unlockedArcanas || defaults.unlockedArcanas));
  merged.sealedUpgrades = Array.from(new Set(merged.sealedUpgrades || []));
  for (const id of Object.keys(POWERUP_DEFS)) {
    const def = POWERUP_DEFS[id];
    const current = merged.powerUps[id] || { id, level: 0 };
    merged.powerUps[id] = {
      id,
      level: Math.max(0, Math.min(def.maxLevel, Number(current.level) || 0))
    };
  }
  return merged;
}

export function loadMeta(storage = globalThis.localStorage) {
  try {
    const raw = storage?.getItem?.(META_KEY);
    return normalizeMeta(raw ? JSON.parse(raw) : null);
  } catch (e) {
    return createDefaultMeta();
  }
}

export function saveMeta(meta, storage = globalThis.localStorage) {
  try {
    const normalized = normalizeMeta(meta);
    storage?.setItem?.(META_KEY, JSON.stringify(normalized));
    return normalized;
  } catch (e) {
    return normalizeMeta(meta);
  }
}

export function getPowerUpCost(id, currentLevel = 0) {
  const def = POWERUP_DEFS[id];
  if (!def || currentLevel >= def.maxLevel) return Infinity;
  return Math.round(def.baseCost * Math.pow(1.45, currentLevel));
}

export function getPowerUpTotalCost(powerUps = {}) {
  let total = 0;
  for (const [id, entry] of Object.entries(powerUps)) {
    const level = Math.max(0, Number(entry?.level) || 0);
    for (let i = 0; i < level; i++) total += getPowerUpCost(id, i);
  }
  return total;
}

export function buyPowerUp(meta, id) {
  const next = normalizeMeta(meta);
  const def = POWERUP_DEFS[id];
  if (!def) return { ok: false, reason: 'missing', meta: next };
  const current = next.powerUps[id]?.level || 0;
  if (current >= def.maxLevel) return { ok: false, reason: 'max', meta: next };
  const cost = getPowerUpCost(id, current);
  if (next.goldBank < cost) return { ok: false, reason: 'gold', meta: next, cost };
  next.goldBank -= cost;
  next.powerUps[id] = { id, level: current + 1 };
  return { ok: true, meta: next, cost };
}

export function refundPowerUps(meta) {
  const next = normalizeMeta(meta);
  const refund = getPowerUpTotalCost(next.powerUps);
  next.goldBank += refund;
  next.powerUps = createDefaultPowerUps();
  return { ok: true, meta: next, refund };
}

export function grantRunGold(meta, runGold = 0, powerUps = meta?.powerUps) {
  const next = normalizeMeta(meta);
  const goldGainLevel = powerUps?.gold_gain?.level || 0;
  const multiplier = 1 + goldGainLevel * POWERUP_DEFS.gold_gain.perLevel;
  next.goldBank += Math.max(0, Math.floor(runGold * multiplier));
  return next;
}

export function applyPowerUpsToStats(stats, powerUps = {}, m4Meta = null) {
  const next = { ...stats };
  const level = id => Math.max(0, powerUps[id]?.level || 0);
  next.maxHp = Math.floor((next.maxHp || 0) * (1 + level('max_health') * POWERUP_DEFS.max_health.perLevel));
  next.powerMultiplier = (next.powerMultiplier || 1) * (1 + level('damage') * POWERUP_DEFS.damage.perLevel);
  next.attackSpeedMultiplier = (next.attackSpeedMultiplier || 1) * (1 + level('attack_speed') * POWERUP_DEFS.attack_speed.perLevel);
  next.moveSpeedMultiplier = (next.moveSpeedMultiplier || 1) * (1 + level('move_speed') * POWERUP_DEFS.move_speed.perLevel);
  next.magnetMultiplier = (next.magnetMultiplier || 1) * (1 + level('magnet') * POWERUP_DEFS.magnet.perLevel);
  next.luckMultiplier = (next.luckMultiplier || 1) * (1 + level('luck') * POWERUP_DEFS.luck.perLevel);
  next.goldGainMultiplier = (next.goldGainMultiplier || 1) * (1 + level('gold_gain') * POWERUP_DEFS.gold_gain.perLevel);
  next.revivals = (next.revivals || 0) + level('revival');
  const talentEffects = getTalentEffects(m4Meta);
  next.maxHp = Math.floor((next.maxHp || 0) * talentEffects.maxHpMultiplier);
  next.powerMultiplier = (next.powerMultiplier || 1) * talentEffects.powerMultiplier;
  next.attackSpeedMultiplier = (next.attackSpeedMultiplier || 1) * talentEffects.attackSpeedMultiplier;
  next.moveSpeedMultiplier = (next.moveSpeedMultiplier || 1) * talentEffects.moveSpeedMultiplier;
  next.magnetMultiplier = (next.magnetMultiplier || 1) * talentEffects.magnetMultiplier;
  next.luckMultiplier = (next.luckMultiplier || 1) * talentEffects.luckMultiplier;
  next.goldGainMultiplier = (next.goldGainMultiplier || 1) * talentEffects.goldGainMultiplier;
  next.revivals = (next.revivals || 0) + talentEffects.revivals;
  next.armor = (next.armor || 0) + talentEffects.armor;
  return next;
}

export function applyPowerUpsToPlayer(player, powerUps = {}, m4Meta = null) {
  if (!player) return;
  const level = id => Math.max(0, powerUps[id]?.level || 0);
  const talentEffects = getTalentEffects(m4Meta);
  player.powerUpModifiers = {
    maxHp: (1 + level('max_health') * POWERUP_DEFS.max_health.perLevel) * talentEffects.maxHpMultiplier,
    damage: (1 + level('damage') * POWERUP_DEFS.damage.perLevel) * talentEffects.powerMultiplier,
    attackSpeed: (1 + level('attack_speed') * POWERUP_DEFS.attack_speed.perLevel) * talentEffects.attackSpeedMultiplier,
    moveSpeed: (1 + level('move_speed') * POWERUP_DEFS.move_speed.perLevel) * talentEffects.moveSpeedMultiplier,
    magnet: (1 + level('magnet') * POWERUP_DEFS.magnet.perLevel) * talentEffects.magnetMultiplier,
    luck: (1 + level('luck') * POWERUP_DEFS.luck.perLevel) * talentEffects.luckMultiplier,
    goldGain: (1 + level('gold_gain') * POWERUP_DEFS.gold_gain.perLevel) * talentEffects.goldGainMultiplier,
    revivals: level('revival') + talentEffects.revivals,
    armor: talentEffects.armor
  };
  player.recalcStats();
}
