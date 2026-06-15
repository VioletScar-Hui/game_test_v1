import assert from 'node:assert/strict';

import { GOURMANDO_NOTES } from '../js/config/narrative-data.js';
import { RELIC_DEFS } from '../js/config/relics-data.js';
import { CHALLENGE_DEFS } from '../js/config/challenges-data.js';
import { TALENT_TREE } from '../js/config/skilltree-data.js';
import {
  applyRunProfileToDifficulty,
  canUnlockTalent,
  collectNote,
  getDailyChallengeForDate,
  getEnemyLoreStage,
  getM4FeatureFlags,
  getTalentEffects,
  grantRelic,
  hasAllNotes,
  hasRelic,
  normalizeM4Meta,
  recordBestiaryKill,
  recordM4Run,
  unlockTalent
} from '../js/game/m4-systems.js';
import { createDefaultMeta, normalizeMeta, applyPowerUpsToStats } from '../js/game/powerup-store.js';
import { recordRunProgress } from '../js/game/unlock-manager.js';

assert.equal(GOURMANDO_NOTES.length, 12);
assert.equal(Object.keys(RELIC_DEFS).length, 5);
assert.equal(Object.keys(CHALLENGE_DEFS).length >= 3, true);
assert.equal(Object.keys(TALENT_TREE.nodes).length >= 9, true);

let m4 = normalizeM4Meta({});
assert.equal(hasRelic(m4, 'randomazzo'), true, 'old or blank saves should already own Randomazzo');
assert.equal(getM4FeatureFlags(m4).arcana, true);
assert.equal(getM4FeatureFlags(m4).secrets, false);

m4 = grantRelic(m4, 'forbidden_menu');
assert.equal(hasRelic(m4, 'forbidden_menu'), true);
assert.equal(getM4FeatureFlags(m4).secrets, true);
assert.equal(getM4FeatureFlags(m4).seal, true);

let noteMeta = normalizeM4Meta({});
for (const note of GOURMANDO_NOTES.slice(0, 11)) {
  noteMeta = collectNote(noteMeta, note.id);
}
assert.equal(hasAllNotes(noteMeta), false);
noteMeta = collectNote(noteMeta, GOURMANDO_NOTES[11].id);
assert.equal(hasAllNotes(noteMeta), true);
assert.equal(noteMeta.unlocks.mirrorBoss, true);

const dailyA = getDailyChallengeForDate('2026-06-14');
const dailyB = getDailyChallengeForDate('2026-06-14');
const dailyC = getDailyChallengeForDate('2026-06-15');
assert.deepEqual(dailyA, dailyB, 'same UTC date must produce same daily challenge');
assert.notEqual(dailyA.seed, dailyC.seed, 'different UTC dates should have different seeds');
assert.ok(dailyA.characterId);
assert.ok(dailyA.levelId);

const profile = { spiceLevel: 5, hyper: true };
const scaled = applyRunProfileToDifficulty({ hp: 100, atk: 10, speed: 0.20, gold: 10 }, profile);
assert.equal(scaled.hp, 205, 'spice 5 + hyper HP formula should match PRD spot check');
assert.equal(scaled.atk > 10, true);
assert.equal(scaled.speed > 0.20, true);
assert.equal(scaled.gold > 10, true);

let talentMeta = normalizeM4Meta({ starCurrency: 6 });
assert.equal(canUnlockTalent(talentMeta, 'attack_keystone').ok, false);
talentMeta = unlockTalent(talentMeta, 'attack_1').meta;
talentMeta = unlockTalent(talentMeta, 'attack_2').meta;
assert.equal(canUnlockTalent(talentMeta, 'attack_keystone').ok, true);
talentMeta = unlockTalent(talentMeta, 'attack_keystone').meta;
const talentEffects = getTalentEffects(talentMeta);
assert.equal(talentEffects.powerMultiplier > 1, true);
assert.equal(talentEffects.attackSpeedMultiplier > 1, true);

assert.equal(getEnemyLoreStage(normalizeM4Meta({}), 'hangry_pigeon'), 0);
let loreMeta = recordBestiaryKill(normalizeM4Meta({}), 'hangry_pigeon', 1);
assert.equal(getEnemyLoreStage(loreMeta, 'hangry_pigeon'), 1);
loreMeta = recordBestiaryKill(loreMeta, 'hangry_pigeon', 24);
assert.equal(getEnemyLoreStage(loreMeta, 'hangry_pigeon'), 2);
loreMeta = recordBestiaryKill(loreMeta, 'hangry_pigeon', 75);
assert.equal(getEnemyLoreStage(loreMeta, 'hangry_pigeon'), 3);

let meta = createDefaultMeta();
meta.m4.starCurrency = 10;
const runResult = recordRunProgress(meta, {
  levelId: 'hungry_forest',
  time: 15 * 60_000,
  kills: 120,
  level: 32,
  won: true,
  hyper: true,
  spiceLevel: 5,
  challengeId: 'inspector_parade',
  dailyKey: '2026-06-14',
  notesFound: ['note_01', 'note_02'],
  relicsFound: ['gourmet_magnifier'],
  endingId: 'invoice_paid',
  enemyKills: { hangry_pigeon: 120 }
});
meta = runResult.meta;
assert.equal(meta.m4.notes.includes('note_01'), true);
assert.equal(meta.m4.notes.includes('note_02'), true);
assert.equal(hasRelic(meta.m4, 'gourmet_magnifier'), true);
assert.equal(meta.m4.endings.includes('invoice_paid'), true);
assert.equal(meta.m4.challengeRecords.inspector_parade.cleared, true);
assert.equal(meta.m4.dailyRecords['2026-06-14'].cleared, true);
assert.equal(getEnemyLoreStage(meta.m4, 'hangry_pigeon'), 3);
assert.equal(meta.m4.starCurrency > 10, true);

meta.m4 = unlockTalent(meta.m4, 'attack_1').meta;
const boosted = applyPowerUpsToStats({
  maxHp: 100,
  powerMultiplier: 1,
  attackSpeedMultiplier: 1,
  moveSpeedMultiplier: 1,
  magnetMultiplier: 1,
  luckMultiplier: 1,
  goldGainMultiplier: 1,
  revivals: 0
}, meta.powerUps, meta.m4);
assert.equal(boosted.powerMultiplier > 1, true, 'talent effects should be part of stat recalculation');

const normalized = normalizeMeta({ version: 3, progress: { mirrorSeen: true } });
assert.equal(normalized.version >= 4, true);
assert.equal(hasRelic(normalized.m4, 'randomazzo'), true);
assert.equal(normalized.m4.unlocks.mirrorBoss, false);

console.log('m4 system tests passed');
