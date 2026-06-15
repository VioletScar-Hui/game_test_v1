import { Entity } from './entity.js';
import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { ENEMY_ANIM_SHEETS, ENEMY_SPRITES } from '../config/assets.js';
import { resolveEnemyAnimationAction } from '../config/animation-data.js';
import { DropItem } from './items.js';
import { DROP_ITEMS } from '../config/enemies-data.js';

export class Enemy extends Entity {
  constructor(x, y, data, enemyType = 'common') {
    super(x, y, 16);
    this.type = 'enemy';
    this.enemyType = enemyType;
    this.data = data;
    this.hp = data.hp;
    this.maxHp = data.hp;
    this.atk = data.atk;
    this.speed = data.speed;
    this.moveType = data.moveType;
    this.target = null;
    this.zigzagTimer = 0;
    this.zigzagDir = 1;
    this.rushTimer = 0;
    this.rushing = false;
    this.jumpTimer = 0;
    this.jumping = false;
    this.bossTeleportTimer = 0;
    this.hitFlash = 0;
    this.frozenTimer = 0;
    this.spriteKey = data.id;
    this._isMovingFrame = false;
  }

  getColor() {
    let color = '#ff6b6b';
    if (this.data.id.includes('zombie') || this.data.id.includes('golem')) color = '#8b5a2b';
    if (this.data.id.includes('ghost') || this.data.id.includes('poltergeist')) color = '#a9a9a9';
    if (this.data.id.includes('robot')) color = '#74c0fc';
    if (this.data.id === 'health_inspector') color = '#ffd43b';
    return color;
  }

  setTarget(target) { this.target = target; }

  update(dt) {
    this._isMovingFrame = false;
    if (!this.target || !this.target.active) return;
    if (this.frozenTimer > 0) {
      this.frozenTimer -= dt;
      return;
    }
    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 1) return;
    let vx = 0, vy = 0;
    switch (this.moveType) {
      case 'dash':
        vx = (dx / dist) * this.speed;
        vy = (dy / dist) * this.speed;
        break;
      case 'zigzag':
        this.zigzagTimer += dt;
        const angle = Math.atan2(dy, dx) + Math.sin(this.zigzagTimer * 0.005) * 0.8;
        vx = Math.cos(angle) * this.speed;
        vy = Math.sin(angle) * this.speed;
        break;
      case 'wander':
        this.zigzagTimer += dt;
        const wanderAngle = Math.atan2(dy, dx) + Math.sin(this.zigzagTimer * 0.003) * 1.2;
        vx = Math.cos(wanderAngle) * this.speed;
        vy = Math.sin(wanderAngle) * this.speed;
        break;
      case 'jump':
        this.jumpTimer += dt;
        if (!this.jumping && this.jumpTimer > 1500) {
          this.jumping = true;
          this.jumpTimer = 0;
        }
        if (this.jumping) {
          vx = (dx / dist) * this.speed * 2.5;
          vy = (dy / dist) * this.speed * 2.5;
          if (this.jumpTimer > 400) { this.jumping = false; this.jumpTimer = 0; }
        } else {
          vx = (dx / dist) * this.speed * 0.3;
          vy = (dy / dist) * this.speed * 0.3;
        }
        break;
      case 'rush':
        this.rushTimer += dt;
        if (!this.rushing && this.rushTimer > 3000) {
          this.rushing = true;
          this.rushTimer = 0;
        }
        if (this.rushing) {
          vx = (dx / dist) * this.speed * 3;
          vy = (dy / dist) * this.speed * 3;
          if (this.rushTimer > 500) { this.rushing = false; this.rushTimer = 0; }
        } else {
          vx = (dx / dist) * this.speed * 0.2;
          vy = (dy / dist) * this.speed * 0.2;
        }
        break;
      case 'slow':
        vx = (dx / dist) * this.speed;
        vy = (dy / dist) * this.speed;
        break;
      case 'float':
        this.zigzagTimer += dt;
        const floatAngle = Math.atan2(dy, dx) + Math.sin(this.zigzagTimer * 0.002) * 0.5;
        vx = Math.cos(floatAngle) * this.speed;
        vy = Math.sin(floatAngle) * this.speed;
        break;
      case 'charge':
        this.rushTimer += dt;
        if (this.rushTimer > 2000) {
          vx = (dx / dist) * this.speed * 2;
          vy = (dy / dist) * this.speed * 2;
          if (this.rushTimer > 2500) this.rushTimer = 0;
        } else {
          vx = (dx / dist) * this.speed * 0.5;
          vy = (dy / dist) * this.speed * 0.5;
        }
        break;
      case 'boss':
        this.bossTeleportTimer += dt;
        if (this.bossTeleportTimer > 10000) {
          const tAngle = Math.random() * Math.PI * 2;
          const tDist = 150 + Math.random() * 100;
          this.x = this.target.x + Math.cos(tAngle) * tDist;
          this.y = this.target.y + Math.sin(tAngle) * tDist;
          this.bossTeleportTimer = 0;
        } else {
          vx = (dx / dist) * this.speed;
          vy = (dy / dist) * this.speed;
        }
        break;
      default:
        vx = (dx / dist) * this.speed;
        vy = (dy / dist) * this.speed;
    }
    this._isMovingFrame = Math.abs(vx) + Math.abs(vy) > 0.0001;
    this.x += vx * dt;
    this.y += vy * dt;
    const bounds = window.game?.mapBounds || { minX: 0, minY: 0, maxX: GAME_WIDTH, maxY: GAME_HEIGHT };
    this.x = Math.max(bounds.minX + this.radius, Math.min(bounds.maxX - this.radius, this.x));
    this.y = Math.max(bounds.minY + this.radius, Math.min(bounds.maxY - this.radius, this.y));
  }

  takeDamage(amount) {
    this.hp -= amount;
    this.hitFlash = 100;
    if (window.game) window.game.addDamageNumber(this.x, this.y - this.radius, amount);
    if (this.hp <= 0) {
      this.active = false;
      if (window.game && window.game.player) window.game.player.kills++;
      if (window.game) {
        if (!window.game.runEnemyKills) window.game.runEnemyKills = {};
        if (this.data?.id) {
          window.game.runEnemyKills[this.data.id] = (window.game.runEnemyKills[this.data.id] || 0) + 1;
        }
        if (window.game.juice) window.game.juice.recordKill(this.enemyType);
        let pts = 1;
        if (this.enemyType === 'elite') pts = 10;
        else if (this.enemyType === 'boss') pts = 100;
        window.game.score += pts;
      }
      if (window.game) window.game.addDeathExplosion(this.x, this.y, this.getColor());
      if (window.game?.player?.arcanaInventory?.has('banquet') && Math.random() < 0.03) {
        window.game.entityManager.add(new DropItem(this.x, this.y, DROP_ITEMS.chicken_leg));
      }
      if (this.data && this.data.deathQuote) {
        let shouldShow = this.enemyType !== 'common' || Math.random() < 0.1;
        if (shouldShow) window.game.showDeathQuote(this.x, this.y, this.data.deathQuote);
      }
      if (this.enemyType === 'boss' && window.game) {
        window.game.victory();
      }
      this._spawnDrops();
    }
  }

  _spawnDrops() {
    const rng = Math.random();
    const x = this.x, y = this.y;
    if (this.enemyType === 'common') {
      if (rng < 0.72) {
        const count = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < count; i++) {
          const ddx = (Math.random() - 0.5) * 30, ddy = (Math.random() - 0.5) * 30;
          window.game.entityManager.add(new DropItem(x + ddx, y + ddy, DROP_ITEMS.green_candy));
        }
      } else if (rng < 0.90) {
        window.game.entityManager.add(new DropItem(x, y, DROP_ITEMS.coin));
      } else if (rng < 0.98) {
        window.game.entityManager.add(new DropItem(x, y, DROP_ITEMS.chicken_leg));
      } else if (rng < 0.995) {
        window.game.entityManager.add(new DropItem(x, y, DROP_ITEMS.red_candy));
      } else {
        window.game.entityManager.add(new DropItem(x, y, DROP_ITEMS.lunchbox));
      }
    } else if (this.enemyType === 'elite') {
      window.game.entityManager.add(new DropItem(x, y, DROP_ITEMS.lunchbox));
      const count = 1 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) {
        const ddx = (Math.random() - 0.5) * 30, ddy = (Math.random() - 0.5) * 30;
        window.game.entityManager.add(new DropItem(x + ddx, y + ddy, rng < 0.55 ? DROP_ITEMS.red_candy : DROP_ITEMS.coin));
      }
    } else if (this.enemyType === 'boss') {
      const redCount = 5 + Math.floor(Math.random() * 4);
      for (let i = 0; i < redCount; i++) {
        const a = (Math.PI * 2 * i) / redCount, d = 20 + Math.random() * 40;
        window.game.entityManager.add(new DropItem(x + Math.cos(a) * d, y + Math.sin(a) * d, DROP_ITEMS.red_candy));
      }
      const lunchCount = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < lunchCount; i++) {
        const a = (Math.PI * 2 * i) / lunchCount + 0.5, d = 30 + Math.random() * 30;
        window.game.entityManager.add(new DropItem(x + Math.cos(a) * d, y + Math.sin(a) * d, DROP_ITEMS.lunchbox));
      }
      for (let i = 0; i < 2; i++) {
        const a = (Math.PI * 2 * i) / 2 + 1, d = 25 + Math.random() * 25;
        window.game.entityManager.add(new DropItem(x + Math.cos(a) * d, y + Math.sin(a) * d, DROP_ITEMS.whole_chicken));
      }
      if (Math.random() < 0.35) {
        window.game.entityManager.add(new DropItem(x, y, DROP_ITEMS.vip_card));
      }
    }
  }

  render(ctx) {
    const hpRatio = this.hp / this.maxHp;
    const size = this.radius * 2.5;
    const sprite = this._getAnimationFrame() || (this.spriteKey ? ENEMY_SPRITES[this.spriteKey] : null);
    const glowColor = this.enemyType === 'boss' ? '#ffd43b' : (this.enemyType === 'elite' ? '#cc5de8' : '#ff6b6b');
    ctx.save();
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = this.enemyType === 'boss' ? 18 : (this.enemyType === 'elite' ? 12 : 6);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius + 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fill();
    ctx.restore();
    if (sprite) {
      const isReady = sprite instanceof HTMLCanvasElement || (sprite.complete && sprite.naturalWidth > 0);
      if (isReady) {
        if (this.hitFlash > 0) {
          ctx.save();
          ctx.globalAlpha = 0.4;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(this.x, this.y, size / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          this.hitFlash -= 2;
        }
        ctx.drawImage(sprite, this.x - size / 2, this.y - size / 2, size, size);
      } else {
        this._drawCircle(ctx, size);
      }
    } else {
      this._drawCircle(ctx, size);
    }
    if (this.maxHp > 100) {
      const barW = this.radius * 2.5, barH = 4;
      const barX = this.x - barW / 2, barY = this.y - size / 2 - 8;
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(barX, barY, barW, barH);
      ctx.fillStyle = hpRatio > 0.5 ? '#69db7c' : (hpRatio > 0.25 ? '#ffd43b' : '#ff6b6b');
      ctx.fillRect(barX, barY, barW * hpRatio, barH);
    }
  }

  _drawCircle(ctx, size) {
    let color = this.getColor();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    if (this.hitFlash > 0) {
      ctx.fillStyle = '#ffffff';
      this.hitFlash -= 2;
    } else {
      ctx.fillStyle = color;
    }
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  _getAnimationFrame() {
    if (!this.spriteKey) return null;
    const action = resolveEnemyAnimationAction({
      active: this.active,
      isMoving: this._isMovingFrame,
      hitFlash: this.hitFlash
    });
    const frames = ENEMY_ANIM_SHEETS[this.spriteKey]?.[action];
    if (!Array.isArray(frames) || frames.length === 0) return null;
    const frameDuration = action === 'hit' ? 70 : 130;
    const index = Math.floor(performance.now() / frameDuration) % frames.length;
    const frame = frames[index];
    const ready = frame instanceof HTMLCanvasElement || (frame && frame.complete && frame.naturalWidth > 0);
    return ready ? frame : null;
  }
}
