import assert from 'node:assert/strict';

const { getWeaponPreviewSpec } = await import('../js/ui/weapon-preview-model.js');
const { WEAPON_DEFS, EVOLUTION_DEFS } = await import('../js/config/weapons-data.js');

const entry = (def, categoryId = 'weapons') => ({
  id: def.id,
  kind: 'weapon',
  categoryId,
  spriteId: def.id,
  data: def
});

assert.equal(getWeaponPreviewSpec(entry(WEAPON_DEFS.whip)).type, 'sweep');
assert.equal(getWeaponPreviewSpec(entry(WEAPON_DEFS.rolling_pin)).type, 'sweep');
assert.equal(getWeaponPreviewSpec(entry(WEAPON_DEFS.cross)).type, 'boomerang');
assert.equal(getWeaponPreviewSpec(entry(WEAPON_DEFS.boomerang_cleaver)).type, 'boomerang');
assert.equal(getWeaponPreviewSpec(entry(WEAPON_DEFS.bouncing_slipper)).type, 'bounce');
assert.equal(getWeaponPreviewSpec(entry(WEAPON_DEFS.spinning_ladle)).type, 'orbit');
assert.equal(getWeaponPreviewSpec(entry(WEAPON_DEFS.garlic_breath)).type, 'aura');
assert.equal(getWeaponPreviewSpec(entry(WEAPON_DEFS.hot_sauce_bottle)).type, 'spray');
assert.equal(getWeaponPreviewSpec(entry(WEAPON_DEFS.holy_toast)).type, 'lob');
assert.equal(getWeaponPreviewSpec(entry(WEAPON_DEFS.throwing_chopsticks)).type, 'needle');
assert.equal(getWeaponPreviewSpec(entry(WEAPON_DEFS.thermal_bag, 'functional')).type, 'shield');
assert.equal(getWeaponPreviewSpec(entry(WEAPON_DEFS.freezer_gate, 'functional')).type, 'freeze');
assert.equal(getWeaponPreviewSpec(entry(WEAPON_DEFS.service_bell, 'functional')).type, 'clear');

const moonboba = getWeaponPreviewSpec(entry(EVOLUTION_DEFS.gorgeous_moonboba, 'functional'));
assert.equal(moonboba.type, 'clear');
assert.equal(moonboba.title, '清屏脉冲');
assert.ok(moonboba.caption.includes('清屏'));

const slipper = getWeaponPreviewSpec(entry(WEAPON_DEFS.bouncing_slipper));
assert.equal(slipper.spriteId, 'bouncing_slipper');
assert.ok(slipper.caption.includes('弹射'));

const chopsticks = getWeaponPreviewSpec(entry(WEAPON_DEFS.throwing_chopsticks));
assert.equal(chopsticks.title, '直线穿刺');
assert.ok(chopsticks.caption.includes('最近敌人'));

const toast = getWeaponPreviewSpec(entry(WEAPON_DEFS.holy_toast));
assert.equal(toast.caption.includes('范围伤害'), false);
assert.ok(toast.caption.includes('慢速'));

const garlic = getWeaponPreviewSpec(entry(WEAPON_DEFS.garlic_breath));
assert.equal(garlic.title, '范围脉冲');
assert.ok(garlic.caption.includes('周期'));

const cloak = getWeaponPreviewSpec(entry(EVOLUTION_DEFS.michelin_cloak, 'functional'));
assert.ok(cloak.caption.includes('濒死'));

const buffet = getWeaponPreviewSpec(entry(EVOLUTION_DEFS.infinite_buffet, 'functional'));
assert.ok(buffet.caption.includes('当前生命'));

const moonbobaDetail = getWeaponPreviewSpec(entry(EVOLUTION_DEFS.gorgeous_moonboba, 'functional'));
assert.ok(moonbobaDetail.caption.includes('吸取掉落'));

console.log('weapon preview model tests passed');
