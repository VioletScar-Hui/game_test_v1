import assert from 'node:assert/strict';

const {
  BESTIARY_CATEGORIES,
  getBestiaryEntries,
  getBestiaryEntryByKey,
  paginateBestiaryEntries
} = await import('../js/ui/bestiary-model.js');

const categoryIds = BESTIARY_CATEGORIES.map(category => category.id);
assert.deepEqual(categoryIds, ['enemies', 'weapons', 'passives', 'evolutions', 'functional', 'arcanas', 'notes', 'relics']);

const unlockedAll = {
  enemies: Object.create(null),
  weapons: Object.create(null),
  passives: Object.create(null),
  arcanas: Object.create(null)
};

const normalWeapons = getBestiaryEntries('weapons', unlockedAll);
assert.ok(normalWeapons.length >= 10, 'normal weapon category should include all non-functional base weapons');
assert.ok(normalWeapons.some(entry => entry.id === 'bouncing_slipper'));
assert.ok(normalWeapons.some(entry => entry.id === 'cross'), 'hidden base weapons still need a visible codex slot');
assert.equal(normalWeapons.some(entry => entry.id === 'thermal_bag'), false, 'functional base weapons belong in functional category');
assert.equal(normalWeapons.every(entry => entry.spriteId === entry.id), true);

const evolutions = getBestiaryEntries('evolutions', unlockedAll);
assert.ok(evolutions.some(entry => entry.id === 'divine_slipper'));
assert.ok(evolutions.some(entry => entry.id === 'gorgeous_moonboba'));
assert.equal(evolutions.every(entry => entry.recipe && entry.recipe.baseWeaponId && entry.recipe.requiredPassiveId), true);

const passives = getBestiaryEntries('passives', unlockedAll);
assert.equal(passives.length, 8);
assert.equal(passives.every(entry => entry.kind === 'passive' && entry.spriteId === entry.id), true);
assert.ok(passives.some(entry => entry.id === 'family_recipe'));

const functional = getBestiaryEntries('functional', unlockedAll);
assert.deepEqual(
  functional.map(entry => entry.id),
  ['thermal_bag', 'freezer_gate', 'service_bell', 'michelin_cloak', 'infinite_buffet', 'gorgeous_moonboba']
);
assert.equal(functional.every(entry => entry.spriteId === entry.id), true);

const page = paginateBestiaryEntries(normalWeapons, 0, 6);
assert.equal(page.totalPages >= 2, true, 'normal weapons need pagination at small page sizes');
assert.equal(page.items.length, 6);
assert.equal(paginateBestiaryEntries(normalWeapons, 99, 6).page, page.totalPages - 1);

const key = functional.find(entry => entry.id === 'freezer_gate').key;
const selected = getBestiaryEntryByKey('functional', key, unlockedAll);
assert.equal(selected.id, 'freezer_gate');
assert.equal(selected.kind, 'weapon');
assert.ok(selected.summary.includes('冻结'));

const arcanas = getBestiaryEntries('arcanas', unlockedAll);
assert.equal(arcanas.length, 12);
assert.equal(arcanas.every(entry => entry.kind === 'arcana' && entry.spriteId === entry.id), true);
assert.ok(arcanas.some(entry => entry.id === 'fool'));

const notes = getBestiaryEntries('notes', unlockedAll, { m4: { notes: ['note_01'] } });
assert.equal(notes.length, 12);
assert.equal(notes[0].kind, 'note');
assert.equal(notes[0].unlocked, true);
assert.equal(notes[1].unlocked, false);

const relics = getBestiaryEntries('relics', unlockedAll, { m4: { relics: ['randomazzo', 'forbidden_menu'] } });
assert.equal(relics.length, 5);
assert.equal(relics.find(entry => entry.id === 'forbidden_menu').unlocked, true);
assert.equal(relics.every(entry => entry.kind === 'relic'), true);

console.log('bestiary redesign tests passed');
