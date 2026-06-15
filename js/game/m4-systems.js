import { DAILY_CHALLENGE_IDS, DAILY_CHARACTER_IDS, DAILY_LEVEL_IDS } from '../config/challenges-data.js';
import { GOURMANDO_NOTES } from '../config/narrative-data.js';
import { LEGACY_RELIC_IDS, RELIC_DEFS } from '../config/relics-data.js';
import { TALENT_TREE } from '../config/skilltree-data.js';

const NOTE_IDS = new Set(GOURMANDO_NOTES.map(note => note.id));
const RELIC_IDS = new Set(Object.keys(RELIC_DEFS));
const LORE_THRESHOLDS = [1, 25, 100];

export function createDefaultM4Meta() {
  return {
    version: 1,
    notes: [],
    relics: [...LEGACY_RELIC_IDS],
    unlocks: {
      arcana: true,
      musicPlayer: false,
      secrets: false,
      seal: false,
      chestIntel: false,
      familyRestaurant: false,
      mirrorBoss: false
    },
    challengeRecords: {},
    dailyRecords: {},
    talents: [],
    starCurrency: 0,
    endings: [],
    bestiaryKills: {},
    bestiaryLore: {},
    spiceHighest: 0,
    hyperClears: [],
    selectedRunProfile: {
      spiceLevel: 0,
      hyper: false,
      challengeId: null,
      dailyKey: null,
      seed: null
    }
  };
}

export function normalizeM4Meta(meta = {}) {
  const defaults = createDefaultM4Meta();
  const source = meta?.m4 ? meta.m4 : meta;
  const next = {
    ...defaults,
    ...(source || {}),
    unlocks: {
      ...defaults.unlocks,
      ...(source?.unlocks || {})
    },
    challengeRecords: {
      ...defaults.challengeRecords,
      ...(source?.challengeRecords || {})
    },
    dailyRecords: {
      ...defaults.dailyRecords,
      ...(source?.dailyRecords || {})
    },
    bestiaryKills: {
      ...defaults.bestiaryKills,
      ...(source?.bestiaryKills || {})
    },
    bestiaryLore: {
      ...defaults.bestiaryLore,
      ...(source?.bestiaryLore || {})
    },
    selectedRunProfile: {
      ...defaults.selectedRunProfile,
      ...(source?.selectedRunProfile || {})
    }
  };

  next.notes = uniqueValid(source?.notes || [], NOTE_IDS);
  next.relics = uniqueValid([...(source?.relics || []), ...LEGACY_RELIC_IDS], RELIC_IDS);
  next.talents = uniqueValid(source?.talents || [], new Set(Object.keys(TALENT_TREE.nodes)));
  next.endings = Array.from(new Set(source?.endings || []));
  next.hyperClears = Array.from(new Set(source?.hyperClears || []));
  next.starCurrency = Math.max(0, Math.floor(Number(source?.starCurrency) || 0));
  next.spiceHighest = Math.max(0, Math.min(5, Math.floor(Number(source?.spiceHighest) || 0)));

  for (const [enemyId, count] of Object.entries(next.bestiaryKills)) {
    next.bestiaryKills[enemyId] = Math.max(0, Math.floor(Number(count) || 0));
    next.bestiaryLore[enemyId] = getLoreStageFromKills(next.bestiaryKills[enemyId]);
  }

  const flags = getM4FeatureFlags(next);
  next.unlocks = { ...next.unlocks, ...flags };
  next.unlocks.mirrorBoss = hasAllNotes(next);
  return next;
}

export function getM4FeatureFlags(meta) {
  const m4 = meta?.notes ? meta : normalizeM4Meta(meta);
  const flags = {
    arcana: false,
    musicPlayer: false,
    secrets: false,
    seal: false,
    chestIntel: false,
    familyRestaurant: false,
    mirrorBoss: false
  };
  for (const relicId of m4.relics || []) {
    const relic = RELIC_DEFS[relicId];
    for (const feature of relic?.features || []) {
      flags[feature] = true;
    }
  }
  flags.mirrorBoss = hasAllNotes(m4);
  return flags;
}

export function hasRelic(meta, relicId) {
  const m4 = normalizeM4Meta(meta);
  return m4.relics.includes(relicId);
}

export function grantRelic(meta, relicId) {
  const m4 = normalizeM4Meta(meta);
  if (!RELIC_IDS.has(relicId)) return m4;
  if (!m4.relics.includes(relicId)) m4.relics.push(relicId);
  m4.unlocks = { ...m4.unlocks, ...getM4FeatureFlags(m4) };
  return m4;
}

export function collectNote(meta, noteId) {
  const m4 = normalizeM4Meta(meta);
  if (!NOTE_IDS.has(noteId)) return m4;
  if (!m4.notes.includes(noteId)) m4.notes.push(noteId);
  m4.unlocks.mirrorBoss = hasAllNotes(m4);
  return m4;
}

export function hasAllNotes(meta) {
  const notes = meta?.notes || [];
  return GOURMANDO_NOTES.every(note => notes.includes(note.id));
}

export function getDailyChallengeForDate(dateKey = getUtcDateKey(new Date())) {
  const normalizedDate = normalizeDateKey(dateKey);
  const seed = hashM4String(`daily:${normalizedDate}`);
  return {
    id: 'daily_special',
    key: normalizedDate,
    date: normalizedDate,
    seed,
    characterId: pickDeterministic(DAILY_CHARACTER_IDS, seed),
    levelId: pickDeterministic(DAILY_LEVEL_IDS, rotateSeed(seed, 7)),
    challengeId: pickDeterministic(DAILY_CHALLENGE_IDS, rotateSeed(seed, 13)),
    spiceLevel: (rotateSeed(seed, 19) % 5) + 1,
    hyper: (rotateSeed(seed, 23) % 2) === 0
  };
}

export function applyRunProfileToDifficulty(base, profile = {}) {
  const spiceLevel = clampSpice(profile.spiceLevel);
  const hyper = !!profile.hyper;
  const hpMultiplier = (profile.hpMultiplier ?? 1) * (1 + spiceLevel * 0.15) * (hyper ? 1.17 : 1);
  const atkMultiplier = (profile.atkMultiplier ?? 1) * (1 + spiceLevel * 0.08) * (hyper ? 1.15 : 1);
  const speedMultiplier = (profile.speedMultiplier ?? 1) * (1 + spiceLevel * 0.03) * (hyper ? 1.12 : 1);
  const goldMultiplier = (profile.goldMultiplier ?? 1) * (1 + spiceLevel * 0.10) * (hyper ? 1.25 : 1);
  return {
    ...base,
    hp: Math.max(1, Math.round((base.hp || 1) * hpMultiplier)),
    atk: Math.max(0, Math.round((base.atk || 0) * atkMultiplier)),
    speed: Math.max(0, Number(((base.speed || 0) * speedMultiplier).toFixed(3))),
    gold: Math.max(0, Math.round((base.gold || 0) * goldMultiplier)),
    multipliers: {
      hp: hpMultiplier,
      atk: atkMultiplier,
      speed: speedMultiplier,
      gold: goldMultiplier
    }
  };
}

export function canUnlockTalent(meta, talentId) {
  const m4 = normalizeM4Meta(meta);
  const node = TALENT_TREE.nodes[talentId];
  if (!node) return { ok: false, reason: 'missing' };
  if (m4.talents.includes(talentId)) return { ok: false, reason: 'owned' };
  if (m4.starCurrency < node.cost) return { ok: false, reason: 'stars' };
  const missing = (node.prerequisites || []).filter(id => !m4.talents.includes(id));
  if (missing.length > 0) return { ok: false, reason: 'prerequisite', missing };
  return { ok: true, cost: node.cost, node };
}

export function unlockTalent(meta, talentId) {
  const m4 = normalizeM4Meta(meta);
  const check = canUnlockTalent(m4, talentId);
  if (!check.ok) return { ok: false, reason: check.reason, meta: m4 };
  m4.starCurrency -= check.cost;
  m4.talents.push(talentId);
  return { ok: true, meta: m4, cost: check.cost };
}

export function getTalentEffects(meta) {
  const m4 = normalizeM4Meta(meta);
  const effects = {
    maxHpMultiplier: 1,
    powerMultiplier: 1,
    attackSpeedMultiplier: 1,
    moveSpeedMultiplier: 1,
    magnetMultiplier: 1,
    luckMultiplier: 1,
    goldGainMultiplier: 1,
    revivals: 0,
    armor: 0
  };
  for (const talentId of m4.talents) {
    const nodeEffects = TALENT_TREE.nodes[talentId]?.effects || {};
    for (const [key, value] of Object.entries(nodeEffects)) {
      if (key.endsWith('Multiplier')) {
        effects[key] *= Number(value) || 1;
      } else {
        effects[key] = (effects[key] || 0) + (Number(value) || 0);
      }
    }
  }
  return effects;
}

export function recordBestiaryKill(meta, enemyId, amount = 1) {
  const m4 = normalizeM4Meta(meta);
  const add = Math.max(0, Math.floor(Number(amount) || 0));
  if (!enemyId || add <= 0) return m4;
  m4.bestiaryKills[enemyId] = Math.max(0, (m4.bestiaryKills[enemyId] || 0) + add);
  m4.bestiaryLore[enemyId] = getLoreStageFromKills(m4.bestiaryKills[enemyId]);
  return m4;
}

export function getEnemyLoreStage(meta, enemyId) {
  const m4 = normalizeM4Meta(meta);
  return getLoreStageFromKills(m4.bestiaryKills[enemyId] || 0);
}

export function recordM4Run(meta, run = {}) {
  let m4 = normalizeM4Meta(meta);

  for (const noteId of run.notesFound || []) {
    m4 = collectNote(m4, noteId);
  }
  for (const relicId of run.relicsFound || []) {
    m4 = grantRelic(m4, relicId);
  }
  if (run.endingId && !m4.endings.includes(run.endingId)) {
    m4.endings.push(run.endingId);
  }
  if (run.spiceLevel !== undefined) {
    m4.spiceHighest = Math.max(m4.spiceHighest || 0, clampSpice(run.spiceLevel));
  }
  if (run.hyper && run.levelId && !m4.hyperClears.includes(run.levelId)) {
    m4.hyperClears.push(run.levelId);
  }
  if (run.challengeId) {
    const current = m4.challengeRecords[run.challengeId] || {};
    m4.challengeRecords[run.challengeId] = {
      bestTime: Math.max(current.bestTime || 0, run.time || 0),
      bestKills: Math.max(current.bestKills || 0, run.kills || 0),
      cleared: !!(current.cleared || run.won),
      lastPlayedAt: Date.now()
    };
  }
  if (run.dailyKey) {
    const current = m4.dailyRecords[run.dailyKey] || {};
    m4.dailyRecords[run.dailyKey] = {
      bestTime: Math.max(current.bestTime || 0, run.time || 0),
      bestKills: Math.max(current.bestKills || 0, run.kills || 0),
      cleared: !!(current.cleared || run.won),
      seed: run.dailySeed ?? current.seed ?? null,
      lastPlayedAt: Date.now()
    };
  }
  for (const [enemyId, count] of Object.entries(run.enemyKills || {})) {
    m4 = recordBestiaryKill(m4, enemyId, count);
  }
  m4.starCurrency += calculateStarReward(run);
  m4.unlocks = { ...m4.unlocks, ...getM4FeatureFlags(m4), mirrorBoss: hasAllNotes(m4) };
  return m4;
}

export function calculateStarReward(run = {}) {
  let stars = Math.floor((run.time || 0) / (5 * 60_000));
  stars += Math.floor((run.kills || 0) / 100);
  if (run.won) stars += 3;
  stars += clampSpice(run.spiceLevel);
  if (run.hyper) stars += 2;
  if (run.challengeId) stars += 2;
  if (run.dailyKey) stars += 2;
  if (run.endingId) stars += 3;
  return Math.max(0, stars);
}

function getLoreStageFromKills(kills) {
  let stage = 0;
  for (const threshold of LORE_THRESHOLDS) {
    if (kills >= threshold) stage++;
  }
  return stage;
}

function uniqueValid(values, validIds) {
  return Array.from(new Set(values || [])).filter(id => validIds.has(id));
}

function clampSpice(value) {
  return Math.max(0, Math.min(5, Math.floor(Number(value) || 0)));
}

function normalizeDateKey(dateKey) {
  if (dateKey instanceof Date) return getUtcDateKey(dateKey);
  const text = String(dateKey || '').trim();
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) return `${match[1]}-${match[2]}-${match[3]}`;
  return getUtcDateKey(new Date(text || Date.now()));
}

function getUtcDateKey(date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
}

function pickDeterministic(items, seed) {
  return items[Math.abs(seed) % items.length];
}

function rotateSeed(seed, salt) {
  return hashM4String(`${seed}:${salt}`);
}

function hashM4String(value) {
  let hash = 2166136261;
  const text = String(value);
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}
