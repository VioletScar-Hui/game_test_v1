import { EVOLUTION_DEFS, WEAPON_DEFS } from '../config/weapons-data.js';

function getWeapons(inventory) {
  if (inventory?.weaponInventory?.weapons) return inventory.weaponInventory.weapons;
  return inventory?.weapons || {};
}

function getPassives(inventory) {
  if (inventory?.passiveInventory?.passives) return inventory.passiveInventory.passives;
  return inventory?.passives || {};
}

export function canEvolveWeapon(inventory, weaponId) {
  const weapons = getWeapons(inventory);
  const passives = getPassives(inventory);
  const weapon = weapons[weaponId];
  const weaponDef = WEAPON_DEFS[weaponId];
  if (!weapon || !weaponDef || weapon.level < weaponDef.maxLevel) return false;

  const evolution = Object.values(EVOLUTION_DEFS).find(def => def.baseWeaponId === weaponId);
  if (!evolution) return false;
  return !!passives[evolution.requiredPassiveId];
}

export function getEligibleEvolutions(inventory) {
  return Object.values(EVOLUTION_DEFS)
    .filter(def => canEvolveWeapon(inventory, def.baseWeaponId))
    .map(def => def.id);
}

export function getEvolutionForWeapon(weaponId) {
  return Object.values(EVOLUTION_DEFS).find(def => def.baseWeaponId === weaponId) || null;
}
