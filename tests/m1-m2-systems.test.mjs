import assert from 'node:assert/strict';
import { expToNextLevel } from '../js/game/game-balance.js';
import {
  buildUpgradeOptions,
  applyUpgradeChoice
} from '../js/game/upgrade-pool.js';
import {
  canEvolveWeapon,
  getEligibleEvolutions
} from '../js/game/evolution.js';
import { getWaveForTime, shouldTriggerWaveEvent } from '../js/config/waves-data.js';
import { ARCANAS } from '../js/config/arcanas-data.js';
import { getArcanaChoiceForTime } from '../js/game/arcana-schedule.js';
import { WEAPON_DEFS } from '../js/config/weapons-data.js';
import { PASSIVE_DEFS } from '../js/config/passives-data.js';

function makeInventory({ weapons = {}, passives = {}, gold = 0, hp = 50, maxHp = 100 } = {}) {
  return {
    weapons: { ...weapons },
    passives: { ...passives },
    gold,
    hp,
    maxHp
  };
}

assert.equal(expToNextLevel(1), 5);
assert.equal(expToNextLevel(2), 15);
assert.equal(expToNextLevel(20), 252);
assert.equal(expToNextLevel(40), 629);

assert.equal(Object.keys(WEAPON_DEFS).length >= 8, true);
assert.equal(Object.keys(PASSIVE_DEFS).length, 8);
assert.equal(WEAPON_DEFS.bouncing_slipper.maxLevel, 8);
assert.equal(WEAPON_DEFS.hot_sauce_bottle.maxLevel, 8);
assert.equal(ARCANAS.length, 12);
assert.equal(new Set(ARCANAS.map(arcana => arcana.id)).size, 12);

const upgradeInventory = makeInventory({
  weapons: {
    bouncing_slipper: { id: 'bouncing_slipper', level: 1 },
    spinning_ladle: { id: 'spinning_ladle', level: 8 }
  },
  passives: {
    running_shoes: { id: 'running_shoes', level: 1 }
  }
});

const options = buildUpgradeOptions({
  inventory: upgradeInventory,
  seed: 12345,
  count: 3
});
assert.equal(options.length, 3);
assert.equal(new Set(options.map(option => option.key)).size, 3);
assert.equal(options.some(option => option.id === 'bouncing_slipper' && option.kind === 'weapon'), true);
assert.equal(options.every(option => option.id !== 'spinning_ladle'), true);

const cappedInventory = makeInventory({
  weapons: Object.fromEntries(Object.keys(WEAPON_DEFS).slice(0, 6).map(id => [id, { id, level: 1 }])),
  passives: Object.fromEntries(Object.keys(PASSIVE_DEFS).slice(0, 6).map(id => [id, { id, level: 1 }]))
});
const cappedOptions = buildUpgradeOptions({
  inventory: cappedInventory,
  seed: 12,
  count: 5
});
assert.equal(cappedOptions.some(option => option.isNew && option.kind === 'weapon'), false);
assert.equal(cappedOptions.some(option => option.isNew && option.kind === 'passive'), false);
assert.equal(cappedOptions.some(option => option.kind === 'fallback'), true);

const applied = applyUpgradeChoice(makeInventory(), {
  kind: 'passive',
  id: 'running_shoes'
});
assert.equal(applied.passives.running_shoes.level, 1);

const evolvedInventory = makeInventory({
  weapons: {
    bouncing_slipper: { id: 'bouncing_slipper', level: 8 }
  },
  passives: {
    running_shoes: { id: 'running_shoes', level: 1 }
  }
});
assert.equal(canEvolveWeapon(evolvedInventory, 'bouncing_slipper'), true);
assert.deepEqual(getEligibleEvolutions(evolvedInventory), ['divine_slipper']);
assert.equal(canEvolveWeapon(evolvedInventory, 'hot_sauce_bottle'), false);

const minuteZero = getWaveForTime('hungry_forest', 0);
assert.equal(minuteZero.minute, 0);
assert.equal(minuteZero.enemies.length > 0, true);

const minuteFive = getWaveForTime('hungry_forest', 5 * 60_000);
assert.equal(shouldTriggerWaveEvent(minuteFive, 'elite'), true);

const minuteTwentyNine = getWaveForTime('hungry_forest', 29 * 60_000);
assert.equal(shouldTriggerWaveEvent(minuteTwentyNine, 'boss'), true);

assert.equal(getArcanaChoiceForTime(0, new Set()).slot, 0);
assert.equal(getArcanaChoiceForTime(11 * 60_000, new Set([0])).slot, 1);
assert.equal(getArcanaChoiceForTime(21 * 60_000, new Set([0, 1])).slot, 2);
assert.equal(getArcanaChoiceForTime(21 * 60_000 + 1, new Set([0, 1, 2])), null);

console.log('m1-m2 system tests passed');
