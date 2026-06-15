import { Entity } from './entity.js';
import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { WEAPON_ACTION_SHEETS } from '../config/assets.js';
import {
  CROSS_PROJECTILE_MIN_SPRITE_SIZE,
  CROSS_PROJECTILE_SPRITE_SIZE_MULTIPLIER,
  WHIP_SLASH_SIZE_MULTIPLIER
} from '../config/render-scale.js';
import { addWeaponActionEffect } from '../game/functional-weapons.js';

export class WhipSlash extends Entity {
  constructor(x, y, angle, arc, range, damage, isReverse, weaponName = 'whip') {
    super(x, y, 4);
    this.type = 'whip_slash';
    this.slashAngle = angle + (isReverse ? Math.PI : 0);
    this.arc = arc;
    this.range = range;
    this.damage = damage;
    this.lifetime = 100;
    this.born = performance.now();
    this.hasHit = new Set();
    this.isReverse = isReverse;
    this.weaponName = weaponName;
  }

  update(dt, entityManager) {
    this.lifetime -= dt;
    if (this.lifetime <= 0) {
      this.active = false;
      return;
    }
    if (!entityManager) return;
    const enemies = entityManager.getAll().filter(e => e.type === 'enemy' && e.active);
    for (const enemy of enemies) {
      if (this.hasHit.has(enemy)) continue;
      const dx = enemy.x - this.x;
      const dy = enemy.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > this.range + enemy.radius) continue;
      let angleToEnemy = Math.atan2(dy, dx);
      let diff = angleToEnemy - this.slashAngle;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      if (Math.abs(diff) <= this.arc / 2) {
        this.hasHit.add(enemy);
        enemy.takeDamage(this.damage);
        if (window.game) {
          window.game.audio.playHit();
        }
      }
    }
  }

  render(ctx) {
    const elapsed = performance.now() - this.born;
    const progress = Math.min(1, elapsed / 100);
    const alpha = 1 - progress;
    const sprite = this._getSlashFrame(progress);
    if (sprite) {
      ctx.save();
      ctx.globalAlpha = Math.max(0.25, alpha);
      ctx.translate(this.x, this.y);
      ctx.rotate(this.slashAngle);
      if (this.isReverse) ctx.scale(1, -1);
      const size = this.range * WHIP_SLASH_SIZE_MULTIPLIER;
      ctx.drawImage(sprite, -size / 2, -size / 2, size, size);
      ctx.restore();
      return;
    }
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.slashAngle);
    const arcColor = this.isReverse ? `rgba(255, 150, 80, ${alpha})` : `rgba(255, 80, 80, ${alpha})`;
    ctx.strokeStyle = arcColor;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, this.range, -this.arc / 2, this.arc / 2);
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, this.range * 0.7, -this.arc / 3, this.arc / 3);
    ctx.stroke();
    ctx.restore();
  }

  _getSlashFrame(progress) {
    const frames = WEAPON_ACTION_SHEETS[this.weaponName]?.slash || WEAPON_ACTION_SHEETS.whip?.slash;
    if (!Array.isArray(frames) || frames.length === 0) return null;
    const index = Math.min(frames.length - 1, Math.floor(progress * frames.length));
    const frame = frames[index];
    const ready = frame instanceof HTMLCanvasElement || (frame && frame.complete && frame.naturalWidth > 0);
    return ready ? frame : null;
  }
}

export class CrossProjectile extends Entity {
  constructor(x, y, vx, vy, damage, maxDist, pierceCount, options = {}) {
    super(x, y, options.radius || 8);
    this.type = 'projectile';
    this.vx = vx;
    this.vy = vy;
    this.damage = damage;
    this.startX = x;
    this.startY = y;
    this.maxDist = maxDist;
    this.returning = false;
    this.pierceCount = pierceCount;
    this.pierceLeft = pierceCount;
    this.lifetime = 5000;
    this.angle = Math.atan2(vy, vx);
    this.hitEnemies = new Set();
    this.weaponName = options.weaponName || null;
    this.returnSpeed = options.returnSpeed || 0.6;
    this.mode = options.mode || 'boomerang';
    this.bounceLeft = options.bounceLeft ?? pierceCount;
  }

  update(dt, game) {
    super.update(dt);
    this.lifetime -= dt;
    if (this.lifetime <= 0) {
      this.active = false;
      return;
    }
    const dx = this.x - this.startX;
    const dy = this.y - this.startY;
    const distTraveled = Math.sqrt(dx * dx + dy * dy);
    if (!this.returning && distTraveled >= this.maxDist) {
      this.returning = true;
    }
    if (this.returning) {
      const player = window.game ? window.game.player : null;
      if (player) {
        const pdx = player.x - this.x;
        const pdy = player.y - this.y;
        const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
        if (pdist < 20) {
          this.active = false;
          return;
        }
        const speed = this.returnSpeed;
        this.vx = (pdx / pdist) * speed;
        this.vy = (pdy / pdist) * speed;
        this.angle = Math.atan2(this.vy, this.vx);
      }
    }
    const bounds = game?.mapBounds || { minX: -100, minY: -100, maxX: GAME_WIDTH + 100, maxY: GAME_HEIGHT + 100 };
    if (this.x < bounds.minX - 140 || this.x > bounds.maxX + 140 || this.y < bounds.minY - 140 || this.y > bounds.maxY + 140) {
      this.active = false;
    }
  }

  render(ctx) {
    const sprite = this._getActionFrame();
    if (sprite) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle + performance.now() * 0.005);
      const size = Math.max(
        CROSS_PROJECTILE_MIN_SPRITE_SIZE,
        this.radius * CROSS_PROJECTILE_SPRITE_SIZE_MULTIPLIER
      );
      ctx.drawImage(sprite, -size / 2, -size / 2, size, size);
      ctx.restore();
      return;
    }
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle + performance.now() * 0.005);
    const s = this.radius * 2;
    ctx.strokeStyle = this.returning ? '#ffd43b' : '#fff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.lineTo(0, s);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-s, 0);
    ctx.lineTo(s, 0);
    ctx.stroke();
    ctx.fillStyle = this.returning ? '#ffd43b' : '#fff';
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fill();
    if (this.returning) {
      ctx.shadowColor = '#ffd43b';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();
  }

  _getActionFrame() {
    if (!this.weaponName) return null;
    const action = this.returning ? 'return' : 'fly';
    const frames = WEAPON_ACTION_SHEETS[this.weaponName]?.[action] || WEAPON_ACTION_SHEETS[this.weaponName]?.fly;
    if (!Array.isArray(frames) || frames.length === 0) return null;
    const index = Math.floor(performance.now() / 80) % frames.length;
    const frame = frames[index];
    const ready = frame instanceof HTMLCanvasElement || (frame && frame.complete && frame.naturalWidth > 0);
    return ready ? frame : null;
  }

  handleHit(enemy, enemies = [], game = globalThis.window?.game) {
    this.hitEnemies.add(enemy);
    this._spawnImpactEffect(game, enemy);
    if (this.mode === 'bounce') {
      if (this.bounceLeft > 0) {
        const next = this._findBounceTarget(enemy, enemies);
        if (next) {
          this.bounceLeft--;
          const dx = next.x - this.x;
          const dy = next.y - this.y;
          const dist = Math.max(1, Math.sqrt(dx * dx + dy * dy));
          const speed = Math.max(0.35, Math.sqrt(this.vx * this.vx + this.vy * this.vy) || 0.45);
          this.vx = (dx / dist) * speed;
          this.vy = (dy / dist) * speed;
          this.angle = Math.atan2(this.vy, this.vx);
          this.returning = false;
          return true;
        }
      }
      this.returning = true;
      return true;
    }

    if (this.pierceLeft !== undefined && this.pierceLeft > 0) {
      this.pierceLeft--;
      return true;
    }
    this.active = false;
    return false;
  }

  _findBounceTarget(currentEnemy, enemies) {
    let target = null;
    let bestDist = Infinity;
    for (const enemy of enemies) {
      if (!enemy.active || enemy === currentEnemy || this.hitEnemies.has(enemy)) continue;
      const dx = enemy.x - this.x;
      const dy = enemy.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 420 && dist < bestDist) {
        target = enemy;
        bestDist = dist;
      }
    }
    return target;
  }

  _spawnImpactEffect(game, enemy = null) {
    if (!this.weaponName || !WEAPON_ACTION_SHEETS[this.weaponName]?.impact) return;
    addWeaponActionEffect(game, this.weaponName, 'impact', {
      x: Number.isFinite(enemy?.x) ? enemy.x : this.x,
      y: Number.isFinite(enemy?.y) ? enemy.y : this.y,
      size: 116,
      life: 260,
      rotation: this.angle,
      alpha: 0.68
    });
  }
}
