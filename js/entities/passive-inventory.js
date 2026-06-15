import { PASSIVE_DEFS, getPassiveModifier } from '../config/passives-data.js';

export class PassiveInventory {
  constructor() {
    this.passives = {};
  }

  add(passiveId) {
    if (this.passives[passiveId]) return false;
    if (!PASSIVE_DEFS[passiveId]) return false;
    this.passives[passiveId] = { id: passiveId, level: 1 };
    return true;
  }

  has(passiveId) {
    return !!this.passives[passiveId];
  }

  getLevel(passiveId) {
    return this.passives[passiveId]?.level || 0;
  }

  upgrade(passiveId) {
    const item = this.passives[passiveId];
    const def = PASSIVE_DEFS[passiveId];
    if (!item || !def || item.level >= def.maxLevel) return false;
    item.level++;
    return true;
  }

  canUpgrade(passiveId) {
    const item = this.passives[passiveId];
    const def = PASSIVE_DEFS[passiveId];
    return !!item && !!def && item.level < def.maxLevel;
  }

  getModifier(stat) {
    return getPassiveModifier(this.passives, stat);
  }

  getAll() {
    return Object.values(this.passives);
  }
}
