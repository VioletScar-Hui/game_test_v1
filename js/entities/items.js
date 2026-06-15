import { Entity } from './entity.js';
import { DROP_SPRITES } from '../config/assets.js';
import { BurstProjectile } from './projectile.js';

export class DropItem extends Entity {
  constructor(x, y, dropData) {
    super(x, y, dropData.radius || 6);
    this.type = 'drop';
    this.dropData = dropData;
    this.lifetime = dropData.lifetime || 30000;
    this.born = performance.now();
    this.magnetRange = dropData.autoPickupRange || 80;
    this.picked = false;
  }

  update(dt, player) {
    if (this.picked) {
      const dx = player.x - this.x;
      const dy = player.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 1) {
        this.active = false;
        return this.dropData;
      }
      const speed = 0.5;
      this.vx = (dx / dist) * speed;
      this.vy = (dy / dist) * speed;
      super.update(dt);
      return null;
    }
    const now = performance.now();
    if (this.lifetime !== Infinity && now - this.born > this.lifetime) {
      this.active = false;
      return;
    }
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < this.magnetRange) {
      this.picked = true;
    }
    if (dist < this.magnetRange + 60) {
      const speed = 0.3;
      this.vx = (dx / dist) * speed;
      this.vy = (dy / dist) * speed;
      super.update(dt);
    }
  }

  render(ctx) {
    ctx.save();
    const sprite = DROP_SPRITES[this.dropData.id];
    const isReady = sprite && (sprite instanceof HTMLCanvasElement || (sprite.complete && sprite.naturalWidth > 0));
    if (isReady) {
      const size = this.radius * 2.5;
      ctx.shadowColor = this.dropData.color;
      ctx.shadowBlur = 6;
      ctx.drawImage(sprite, this.x - size / 2, this.y - size / 2, size, size);
      ctx.shadowBlur = 0;
    } else {
      ctx.shadowColor = this.dropData.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.dropData.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();
  }
}

export class BurstSkill {
  constructor() {
    this.cooldown = 5000;
    this.cooldownTimer = 0;
    this.ready = true;
  }

  update(dt) {
    if (!this.ready) {
      this.cooldownTimer -= dt;
      if (this.cooldownTimer <= 0) {
        this.cooldownTimer = 0;
        this.ready = true;
      }
    }
  }

  fire(player, entityManager) {
    if (!this.ready) return false;
    this.ready = false;
    this.cooldownTimer = this.cooldown;
    const bulletCount = 8 + player.getLevel();
    const speed = 0.6;
    const damage = player.getAttack() * 1.5;
    for (let i = 0; i < bulletCount; i++) {
      const angle = (Math.PI * 2 * i) / bulletCount;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const proj = new BurstProjectile(player.x, player.y, vx, vy, damage);
      entityManager.add(proj);
    }
    return true;
  }

  getCooldownPercent() {
    if (this.ready) return 1;
    return 1 - (this.cooldownTimer / this.cooldown);
  }
}
