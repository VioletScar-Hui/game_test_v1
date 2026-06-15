import { Entity } from './entity.js';
import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { WEAPON_DEFS } from '../config/weapons-data.js';
import { ARCANAS } from '../config/arcanas-data.js';
import { Projectile } from './projectile.js';
import { CrossProjectile } from './cross-projectile.js';

export class Weapon {
  constructor(data) {
    this.data = data;
    this.fireRate = 200;
    this.fireTimer = 0;
    this.damage = 20;
    this.range = 600;
  }

  update(dt, owner, entityManager) {
    this.fireTimer += dt;
    if (this.fireTimer < this.fireRate) return;
    const enemies = entityManager.getAll().filter(e => e.type === 'enemy' && e.active);
    if (enemies.length === 0) return;
    let nearest = null;
    let nearestDist = Infinity;
    for (const enemy of enemies) {
      const dx = enemy.x - owner.x;
      const dy = enemy.y - owner.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < this.range && dist < nearestDist) {
        nearest = enemy;
        nearestDist = dist;
      }
    }
    if (!nearest) return;
    this.fireTimer = 0;
    const dx = nearest.x - owner.x;
    const dy = nearest.y - owner.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const speed = 0.5;
    const vx = (dx / dist) * speed;
    const vy = (dy / dist) * speed;
    const proj = new Projectile(owner.x, owner.y, vx, vy, this.damage, this.data.id || this.data.name);
    if (window.game) {
      const empCount = window.game.player.arcanaInventory.getCount('emperor');
      if (empCount > 0) proj.radius = Math.round(proj.radius * (1 + 0.25 * empCount));
    }
    entityManager.add(proj);
    if (window.game) window.game.audio.playShoot();
  }
}

export class ArcanaInventory {
  constructor() {
    this.counts = {};
    this.maxPerCard = 5;
  }

  add(arcanaId) {
    const cur = this.counts[arcanaId] || 0;
    if (cur >= this.maxPerCard) return false;
    this.counts[arcanaId] = cur + 1;
    return true;
  }

  has(arcanaId) {
    return (this.counts[arcanaId] || 0) > 0;
  }

  getCount(arcanaId) {
    return this.counts[arcanaId] || 0;
  }

  canAdd(arcanaId) {
    return (this.counts[arcanaId] || 0) < this.maxPerCard;
  }

  canSelect() {
    for (const a of ARCANAS) {
      if (this.canAdd(a.id)) return true;
    }
    return false;
  }

  getTotalCount() {
    let total = 0;
    for (const id in this.counts) total += this.counts[id];
    return total;
  }

  getAll() {
    const result = [];
    for (const id in this.counts) {
      if (this.counts[id] > 0) {
        const def = ARCANAS.find(a => a.id === id);
        if (def) result.push({ ...def, count: this.counts[id] });
      }
    }
    return result;
  }
}

export class WeaponInventory {
  constructor() {
    this.weapons = {};
  }

  add(weaponId) {
    if (this.weapons[weaponId]) return false;
    this.weapons[weaponId] = { id: weaponId, level: 1 };
    return true;
  }

  has(weaponId) {
    return !!this.weapons[weaponId];
  }

  getLevel(weaponId) {
    return this.weapons[weaponId] ? this.weapons[weaponId].level : 0;
  }

  upgrade(weaponId) {
    if (!this.weapons[weaponId]) return false;
    const def = WEAPON_DEFS[weaponId];
    if (!def) return false;
    if (this.weapons[weaponId].level >= def.maxLevel) return false;
    this.weapons[weaponId].level++;
    return true;
  }

  canUpgrade(weaponId) {
    if (!this.weapons[weaponId]) return false;
    const def = WEAPON_DEFS[weaponId];
    if (!def) return false;
    return this.weapons[weaponId].level < def.maxLevel;
  }

  getAll() {
    return Object.values(this.weapons);
  }
}
