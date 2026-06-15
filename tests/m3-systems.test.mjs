import assert from 'node:assert/strict';
import { CHARACTERS } from '../js/config/characters.js';
import { LEVELS } from '../js/config/levels.js';
import { ARCANAS } from '../js/config/arcanas-data.js';
import { WEAPON_DEFS, EVOLUTION_DEFS } from '../js/config/weapons-data.js';
import { buildUpgradeOptions } from '../js/game/upgrade-pool.js';
import { getEligibleEvolutions } from '../js/game/evolution.js';
import {
  POWERUP_DEFS,
  buyPowerUp,
  createDefaultMeta,
  getPowerUpTotalCost,
  refundPowerUps,
  applyPowerUpsToStats
} from '../js/game/powerup-store.js';
import {
  evaluateUnlocks,
  getUnlockedArcanaIds,
  getUnlockedCharacterIds,
  getUnlockedLevelIds
} from '../js/game/unlock-manager.js';
import {
  buildInteractablePlan,
  applyInteractableChoice
} from '../js/config/interactables-data.js';
import {
  createRunLevelUpControls,
  spendLevelUpControl,
  sealUpgrade,
  banishUpgrade
} from '../js/game/levelup-controls.js';
import {
  applyFunctionalWeaponTick,
  getFunctionalWeaponSummary
} from '../js/game/functional-weapons.js';

assert.equal(Object.keys(POWERUP_DEFS).length, 8);
let meta = createDefaultMeta();
assert.deepEqual(getUnlockedCharacterIds(meta), ['antonio']);
assert.deepEqual(getUnlockedLevelIds(meta), ['hungry_forest']);

meta.goldBank = 500;
const afterBuy = buyPowerUp(meta, 'damage');
assert.equal(afterBuy.ok, true);
assert.equal(afterBuy.meta.powerUps.damage.level, 1);
assert.equal(afterBuy.meta.goldBank < 500, true);
const boosted = applyPowerUpsToStats({
  maxHp: 1000,
  powerMultiplier: 1,
  attackSpeedMultiplier: 1,
  moveSpeedMultiplier: 1,
  magnetMultiplier: 1,
  luckMultiplier: 1,
  goldGainMultiplier: 1,
  revivals: 0
}, afterBuy.meta.powerUps);
assert.equal(boosted.powerMultiplier > 1, true);
const refund = refundPowerUps(afterBuy.meta);
assert.equal(refund.meta.goldBank, 500);
assert.equal(getPowerUpTotalCost(refund.meta.powerUps), 0);

meta = createDefaultMeta();
meta.progress.maxCharacterLevel = 10;
meta.progress.totalKills = 3000;
for (const levelId of ['hungry_forest', 'waffle_tower', 'infinite_cookbook_library', 'bubble_tea_plant', 'capella_pasta']) {
  meta.progress.levelBestTime[levelId] = 15 * 60_000;
}
meta.progress.packageOpened = true;
meta.progress.mirrorSeen = true;
meta.progress.evolvedWeapons = ['divine_slipper', 'michelin_cloak'];
meta.progress.weaponUnlockFlags = ['service_shift', 'frozen_ticket', 'shield_route'];
meta = evaluateUnlocks(meta).meta;
assert.equal(getUnlockedCharacterIds(meta).includes('imelda'), true);
assert.equal(getUnlockedCharacterIds(meta).includes('gennaro'), true);
assert.equal(getUnlockedCharacterIds(meta).includes('little_antonio'), true);
assert.equal(getUnlockedLevelIds(meta).includes(LEVELS[1].id), true);
assert.equal(getUnlockedLevelIds(meta).includes('moonboba'), true);
assert.equal(getUnlockedArcanaIds(meta).filter(id => ['hourglass', 'mirror', 'delivery'].includes(id)).length, 3);

for (const level of LEVELS) {
  const plan = buildInteractablePlan(level.id, 1234);
  assert.equal(plan.length >= 2, true, `${level.id} should have at least two interactables`);
  assert.equal(plan.some(item => item.type === 'picnic_campfire'), true, `${level.id} needs a campfire`);
}
assert.equal(buildInteractablePlan('hungry_forest', 1).some(item => item.type === 'package'), true);
assert.equal(buildInteractablePlan('capella_pasta', 1).some(item => item.type === 'mirror'), true);
assert.equal(buildInteractablePlan('moonboba', 1).some(item => item.type === 'wandering_merchant'), true);
const altarGame = {
  player: { hp: 100, maxHp: 200, luckMultiplier: 1 },
  forceTripleChest: false,
  cursedAltarAccepted: false
};
applyInteractableChoice(altarGame, { type: 'curse_altar' }, 'sacrifice');
assert.equal(altarGame.player.hp, 80);
assert.equal(altarGame.player.luckMultiplier, 1.25);
assert.equal(altarGame.forceTripleChest, true);

const controls = createRunLevelUpControls({ sealedUpgrades: ['weapon:cross'] });
assert.equal(controls.reroll, 4);
assert.equal(spendLevelUpControl(controls, 'reroll').ok, true);
assert.equal(controls.reroll, 3);
assert.equal(banishUpgrade(controls, 'weapon:thermal_bag').ok, true);
assert.equal(controls.banished.has('thermal_bag'), true);
assert.equal(sealUpgrade(controls, 'passive:family_recipe').ok, true);
assert.equal(controls.sealed.has('family_recipe'), true);

for (const id of ['thermal_bag', 'freezer_gate', 'service_bell']) {
  assert.ok(WEAPON_DEFS[id], `${id} base weapon should exist`);
  assert.equal(WEAPON_DEFS[id].maxLevel, 8);
  assert.equal(WEAPON_DEFS[id].functional, true);
}
assert.equal(EVOLUTION_DEFS.michelin_cloak.baseWeaponId, 'thermal_bag');
assert.equal(EVOLUTION_DEFS.infinite_buffet.baseWeaponId, 'freezer_gate');
assert.equal(EVOLUTION_DEFS.gorgeous_moonboba.baseWeaponId, 'service_bell');
assert.deepEqual(getEligibleEvolutions({
  weapons: { thermal_bag: { id: 'thermal_bag', level: 8 } },
  passives: { takeout_lid: { id: 'takeout_lid', level: 1 } }
}), ['michelin_cloak']);

const thermalGame = {
  player: { functionalState: {}, shield: 0, maxHp: 1000 },
  entityManager: { getByType: () => [] },
  particles: []
};
applyFunctionalWeaponTick(thermalGame, { id: 'thermal_bag', level: 8 }, 8000);
assert.equal(thermalGame.player.functionalState.thermal_bag.layers, 3);
assert.equal(thermalGame.player.shield > 0, true);
assert.ok(thermalGame.particles.some(p => p.weaponAction?.weaponId === 'thermal_bag' && p.weaponAction.action === 'shield'));

const freezeEnemy = { frozenTimer: 0, hp: 100, maxHp: 100 };
const freezerGame = {
  player: { x: 0, y: 0, functionalState: {}, facingAngle: 0 },
  entityManager: { getByType: () => [freezeEnemy] },
  particles: []
};
applyFunctionalWeaponTick(freezerGame, { id: 'freezer_gate', level: 8 }, 4000);
assert.equal(freezeEnemy.frozenTimer >= 3900, true);
assert.ok(freezerGame.particles.some(p => p.weaponAction?.weaponId === 'freezer_gate' && p.weaponAction.action === 'ray'));

const enemies = [
  { enemyType: 'common', active: true, hp: 10, maxHp: 10, takeDamage(amount) { this.hp -= amount; if (this.hp <= 0) this.active = false; } },
  { enemyType: 'elite', active: true, hp: 100, maxHp: 100, takeDamage(amount) { this.hp -= amount; } }
];
const bellGame = {
  player: { x: 0, y: 0, functionalState: {} },
  entityManager: { getByType: type => type === 'enemy' ? enemies : [] },
  particles: []
};
applyFunctionalWeaponTick(bellGame, { id: 'service_bell', level: 8 }, 45_000);
assert.equal(enemies[0].active, false);
assert.equal(enemies[1].active, true);
assert.ok(bellGame.particles.some(p => p.weaponAction?.weaponId === 'service_bell' && p.weaponAction.action === 'pulse'));
assert.ok(getFunctionalWeaponSummary({ id: 'service_bell', level: 8 }).includes('45'));

const pool = buildUpgradeOptions({
  inventory: { weapons: {}, passives: {}, hp: 100, maxHp: 100 },
  seed: 9,
  count: 6,
  unlockedWeapons: new Set(['thermal_bag']),
  sealed: new Set(['family_recipe']),
  banished: new Set(['thermal_bag'])
});
assert.equal(pool.some(option => option.id === 'thermal_bag'), false);
assert.equal(pool.some(option => option.id === 'family_recipe'), false);

assert.equal(CHARACTERS.some(char => char.id === 'little_antonio'), true);
assert.equal(CHARACTERS.length >= 4, true);
assert.equal(ARCANAS.length, 12);

console.log('m3 system tests passed');
