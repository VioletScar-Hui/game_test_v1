import { Entity } from './entity.js';
import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { WEAPON_ACTION_SHEETS, WEAPON_SPRITES } from '../config/assets.js';
import { PROJECTILE_MIN_SPRITE_SIZE, PROJECTILE_SPRITE_SIZE_MULTIPLIER } from '../config/render-scale.js';
import { addWeaponActionEffect } from '../game/functional-weapons.js';

export class Projectile extends Entity {
  constructor(x, y, vx, vy, damage, weaponName, options = {}) {
    super(x, y, options.radius || 4);
    this.type = 'projectile';
    this.vx = vx;
    this.vy = vy;
    this.damage = damage;
    this.lifetime = options.lifetime || 2000;
    this.weaponName = weaponName || null;
    this.angle = Math.atan2(vy, vx);
    this.pierceLeft = options.pierce || 0;
    this.sizeMultiplier = options.sizeMultiplier || 1;
    this.hitEnemies = new Set();
    this._expireEffectShown = false;
  }

  update(dt, game) {
    super.update(dt);
    this.lifetime -= dt;
    if (this.lifetime <= 0) {
      this._spawnExpireEffect(game);
      this.active = false;
    }
    const bounds = game?.mapBounds || { minX: -50, minY: -50, maxX: GAME_WIDTH + 50, maxY: GAME_HEIGHT + 50 };
    if (this.x < bounds.minX - 100 || this.x > bounds.maxX + 100 || this.y < bounds.minY - 100 || this.y > bounds.maxY + 100) {
      this.active = false;
    }
  }

  handleHit(enemy, enemies = [], game = globalThis.window?.game) {
    this.hitEnemies.add(enemy);
    this._spawnImpactEffect(game, enemy);
    if (this.pierceLeft !== undefined && this.pierceLeft > 0) {
      this.pierceLeft--;
      return true;
    }
    this.active = false;
    return false;
  }

  render(ctx) {
    const sprite = this._getActionFrame() || (this.weaponName ? WEAPON_SPRITES[this.weaponName] : null);
    const isReady = sprite && (sprite instanceof HTMLCanvasElement || (sprite.complete && sprite.naturalWidth > 0));
    if (isReady) {
      const size = Math.max(
        PROJECTILE_MIN_SPRITE_SIZE,
        this.radius * PROJECTILE_SPRITE_SIZE_MULTIPLIER * this.sizeMultiplier
      );
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.drawImage(sprite, -size / 2, -size / 2, size, size);
      ctx.restore();
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#ffd43b';
      ctx.fill();
      ctx.shadowColor = '#ffd43b';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  _getActionFrame() {
    if (!this.weaponName) return null;
    const actions = WEAPON_ACTION_SHEETS[this.weaponName];
    if (!actions) return null;
    const preferred = this._preferredAction();
    const frames = actions[preferred] || actions.fly || actions.loop || actions.spray || actions.lob;
    if (!Array.isArray(frames) || frames.length === 0) return null;
    const index = Math.floor(performance.now() / 90) % frames.length;
    const frame = frames[index];
    const ready = frame instanceof HTMLCanvasElement || (frame && frame.complete && frame.naturalWidth > 0);
    return ready ? frame : null;
  }

  _preferredAction() {
    if (this.weaponName === 'holy_toast') return 'lob';
    if (this.weaponName === 'hot_sauce_bottle' || this.weaponName === 'infinite_hot_pot') return 'spray';
    if (this.weaponName === 'spinning_ladle' || this.weaponName === 'garlic_breath' || this.weaponName === 'excalibur_ladle') return 'loop';
    return 'fly';
  }

  _spawnImpactEffect(game, enemy = null) {
    const action = this._preferredImpactAction();
    if (!action) return;
    addWeaponActionEffect(game, this.weaponName, action, {
      x: Number.isFinite(enemy?.x) ? enemy.x : this.x,
      y: Number.isFinite(enemy?.y) ? enemy.y : this.y,
      size: this._impactSize(action),
      life: action === 'splash' ? 300 : 260,
      rotation: this.angle,
      alpha: this._impactAlpha(action)
    });
  }

  _spawnExpireEffect(game) {
    if (this._expireEffectShown) return;
    const action = this._preferredExpireAction();
    if (!action) return;
    this._expireEffectShown = true;
    addWeaponActionEffect(game, this.weaponName, action, {
      x: this.x,
      y: this.y,
      size: this._impactSize(action),
      life: action === 'splash' ? 300 : 260,
      rotation: this.angle,
      alpha: this._impactAlpha(action)
    });
  }

  _preferredImpactAction() {
    if (!this.weaponName) return null;
    let action = 'impact';
    if (this.weaponName === 'holy_toast') action = 'splash';
    if (this.weaponName === 'hot_sauce_bottle') action = 'burn';
    if (this.weaponName === 'infinite_hot_pot') action = 'splash';
    return this._hasAction(action) ? action : null;
  }

  _preferredExpireAction() {
    if (this.weaponName === 'holy_toast') return this._hasAction('splash') ? 'splash' : null;
    if (this.weaponName === 'hot_sauce_bottle') return this._hasAction('burn') ? 'burn' : null;
    if (this.weaponName === 'infinite_hot_pot') return this._hasAction('burn') ? 'burn' : null;
    return null;
  }

  _hasAction(action) {
    return !!(this.weaponName && WEAPON_ACTION_SHEETS[this.weaponName]?.[action]);
  }

  _impactSize(action) {
    if (action === 'splash') return 138;
    if (action === 'burn') return 124;
    return 112;
  }

  _impactAlpha(action) {
    if (action === 'splash') return 0.72;
    if (action === 'burn') return 0.68;
    return 0.68;
  }
}

export class BurstProjectile extends Entity {
  constructor(x, y, vx, vy, damage) {
    super(x, y, 5);
    this.type = 'projectile';
    this.vx = vx;
    this.vy = vy;
    this.damage = damage;
    this.lifetime = 1500;
    this.born = performance.now();
  }

  update(dt) {
    super.update(dt);
    this.lifetime -= dt;
    if (this.lifetime <= 0) this.active = false;
    if (this.x < -50 || this.x > GAME_WIDTH + 50 || this.y < -50 || this.y > GAME_HEIGHT + 50) {
      this.active = false;
    }
  }

  render(ctx) {
    const elapsed = performance.now() - this.born;
    const pulse = 1 + 0.3 * Math.sin(elapsed * 0.02);
    const r = this.radius * pulse;
    ctx.beginPath();
    ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
    ctx.fillStyle = '#ff6b6b';
    ctx.fill();
    ctx.shadowColor = '#ff4500';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(this.x, this.y, r * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffd43b';
    ctx.fill();
  }
}
