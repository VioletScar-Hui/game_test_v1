import assert from 'node:assert/strict';

const storage = {
  data: Object.create(null),
  getItem(key) {
    return this.data[key] || null;
  },
  setItem(key, value) {
    this.data[key] = String(value);
  }
};

globalThis.localStorage = storage;

const {
  Bestiary,
  syncBestiaryInventory
} = await import('../js/game/bestiary.js');

const bestiary = new Bestiary();
assert.equal(bestiary.isWeaponUnlocked('garlic_breath'), false);
assert.equal(bestiary.isPassiveUnlocked('family_recipe'), false);
assert.equal(bestiary.isArcanaUnlocked('fool'), false);

syncBestiaryInventory(bestiary, {
  weapons: {
    garlic_breath: { id: 'garlic_breath', level: 1 },
    divine_slipper: { id: 'divine_slipper', level: 8, evolvedFrom: 'bouncing_slipper' }
  },
  passives: {
    family_recipe: { id: 'family_recipe', level: 1 }
  },
  arcanaInventory: {
    counts: {
      fool: 1
    }
  }
});

assert.equal(bestiary.isWeaponUnlocked('garlic_breath'), true);
assert.equal(bestiary.isWeaponUnlocked('divine_slipper'), true);
assert.equal(bestiary.isPassiveUnlocked('family_recipe'), true);
assert.equal(bestiary.isArcanaUnlocked('fool'), true);

const saved = JSON.parse(storage.data.vampire_survivors_bestiary);
assert.equal(saved.weapons.garlic_breath, true);
assert.equal(saved.weapons.divine_slipper, true);
assert.equal(saved.passives.family_recipe, true);
assert.equal(saved.arcanas.fool, true);

console.log('bestiary unlock runtime tests passed');
