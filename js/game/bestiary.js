export class Bestiary {
  constructor() {
    this.enemies = {};
    this.weapons = {};
    this.passives = {};
    this.arcanas = {};
    this._load();
  }

  _load() {
    try {
      const saved = localStorage.getItem('vampire_survivors_bestiary');
      if (saved) {
        const data = JSON.parse(saved);
        this.enemies = data.enemies || {};
        this.weapons = data.weapons || {};
        this.passives = data.passives || {};
        this.arcanas = data.arcanas || {};
      }
    } catch (e) {}
  }

  _save() {
    try {
      localStorage.setItem('vampire_survivors_bestiary', JSON.stringify({
        enemies: this.enemies,
        weapons: this.weapons,
        passives: this.passives,
        arcanas: this.arcanas
      }));
    } catch (e) {}
  }

  unlockEnemy(enemyId) {
    if (!this.enemies[enemyId]) {
      this.enemies[enemyId] = true;
      this._save();
    }
  }

  unlockWeapon(weaponId) {
    if (!this.weapons[weaponId]) {
      this.weapons[weaponId] = true;
      this._save();
    }
  }

  unlockPassive(passiveId) {
    if (!this.passives[passiveId]) {
      this.passives[passiveId] = true;
      this._save();
    }
  }

  unlockArcana(arcanaId) {
    if (!this.arcanas[arcanaId]) {
      this.arcanas[arcanaId] = true;
      this._save();
    }
  }

  isEnemyUnlocked(enemyId) {
    return !!this.enemies[enemyId];
  }

  isWeaponUnlocked(weaponId) {
    return !!this.weapons[weaponId];
  }

  isPassiveUnlocked(passiveId) {
    return !!this.passives[passiveId];
  }

  isArcanaUnlocked(arcanaId) {
    return !!this.arcanas[arcanaId];
  }
}

export function syncBestiaryInventory(bestiary, inventory) {
  syncBestiaryWeaponsFromInventory(bestiary, inventory);
  syncBestiaryPassivesFromInventory(bestiary, inventory);
  syncBestiaryArcanasFromInventory(bestiary, inventory);
}

export function syncBestiaryWeaponsFromInventory(bestiary, inventory) {
  if (!bestiary || !inventory) return;
  const weapons = inventory.weaponInventory?.weapons || inventory.weapons || {};
  for (const item of Object.values(weapons)) {
    const id = item?.id;
    if (id) bestiary.unlockWeapon(id);
  }
}

export function syncBestiaryPassivesFromInventory(bestiary, inventory) {
  if (!bestiary || !inventory) return;
  const passives = inventory.passiveInventory?.passives || inventory.passives || {};
  for (const item of Object.values(passives)) {
    const id = item?.id;
    if (id) bestiary.unlockPassive(id);
  }
}

export function syncBestiaryArcanasFromInventory(bestiary, inventory) {
  if (!bestiary || !inventory) return;
  const arcanaInventory = inventory.arcanaInventory || {};
  const counts = arcanaInventory.counts || inventory.arcanaCounts || inventory.arcanas || {};
  for (const [id, count] of Object.entries(counts)) {
    if (count > 0) bestiary.unlockArcana(id);
  }
  if (Array.isArray(inventory.arcanaInventory)) {
    for (const item of inventory.arcanaInventory) {
      if (item?.id && (item.count ?? 1) > 0) bestiary.unlockArcana(item.id);
    }
  }
}
