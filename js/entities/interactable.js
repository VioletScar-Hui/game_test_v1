import { Entity } from './entity.js';
import { INTERACTABLE_SPRITES } from '../config/assets.js';
import { INTERACTABLE_DEFS, applyInteractableChoice } from '../config/interactables-data.js';

export class Interactable extends Entity {
  constructor(data) {
    super(data.x, data.y, 24);
    this.type = 'interactable';
    this.interactableType = data.type;
    this.name = data.name || INTERACTABLE_DEFS[data.type]?.name || data.type;
    this.data = data;
    this.focusTimer = 0;
    this.used = false;
    this.promptTimer = 0;
  }

  update(dt, game) {
    if (!game?.player || this.used) return;
    const dx = game.player.x - this.x;
    const dy = game.player.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const near = dist < this.radius + game.player.radius + 28;
    if (!near) {
      this.focusTimer = 0;
      return;
    }
    this.promptTimer = 600;
    if (this.interactableType === 'curse_altar') {
      game.pendingInteractableChoice = this;
      game.setState('INTERACTABLE_CHOICE');
      return;
    }
    if (this.interactableType === 'mirror') {
      this.focusTimer += dt;
      if (this.focusTimer < 3000) return;
    }
    applyInteractableChoice(game, this.dataWithPosition());
    this.used = true;
    this.active = false;
  }

  dataWithPosition() {
    return {
      ...this.data,
      x: this.x,
      y: this.y
    };
  }

  render(ctx) {
    if (!this.active) return;
    const def = INTERACTABLE_DEFS[this.interactableType] || {};
    const t = performance.now() * 0.004;
    const pulse = 1 + Math.sin(t) * 0.08;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(pulse, pulse);
    ctx.shadowColor = def.color || '#ffd43b';
    ctx.shadowBlur = 14;
    const sprite = INTERACTABLE_SPRITES[this.interactableType];
    if (isDrawableImage(sprite)) {
      ctx.drawImage(sprite, -34, -34, 68, 68);
    } else {
      drawIcon(ctx, this.interactableType, def.color || '#ffd43b');
    }
    ctx.restore();

    if (this.promptTimer > 0 || this.focusTimer > 0) {
      ctx.save();
      ctx.fillStyle = 'rgba(0,0,0,0.55)';
      roundRect(ctx, this.x - 70, this.y - 58, 140, 28, 6);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const text = this.interactableType === 'mirror' && this.focusTimer > 0
        ? `凝视 ${Math.ceil((3000 - this.focusTimer) / 1000)}`
        : this.name;
      ctx.fillText(text, this.x, this.y - 44);
      ctx.restore();
      this.promptTimer = Math.max(0, this.promptTimer - 16);
    }
  }
}

function isDrawableImage(sprite) {
  return sprite && (
    sprite instanceof HTMLCanvasElement ||
    (sprite.complete && sprite.naturalWidth > 0)
  );
}

function drawIcon(ctx, type, color) {
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(0,0,0,0.55)';
  ctx.fillStyle = color;
  if (type === 'picnic_campfire') {
    ctx.beginPath();
    ctx.moveTo(0, -25);
    ctx.quadraticCurveTo(24, -2, 5, 24);
    ctx.quadraticCurveTo(-18, 6, 0, -25);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#fff3bf';
    ctx.beginPath();
    ctx.arc(0, 7, 7, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === 'package') {
    roundRect(ctx, -24, -20, 48, 40, 6);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-24, -4);
    ctx.lineTo(24, -4);
    ctx.moveTo(0, -20);
    ctx.lineTo(0, 20);
    ctx.stroke();
  } else if (type === 'curse_altar') {
    ctx.beginPath();
    ctx.moveTo(0, -26);
    ctx.lineTo(25, 18);
    ctx.lineTo(-25, 18);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(0, 5, 6, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === 'bill_pile') {
    ctx.rotate(-0.18);
    roundRect(ctx, -24, -16, 48, 32, 4);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#3b2f05';
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('$', 0, 0);
  } else if (type === 'wandering_merchant') {
    ctx.beginPath();
    ctx.arc(0, -8, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    roundRect(ctx, -20, 5, 40, 24, 5);
    ctx.fill();
    ctx.stroke();
  } else if (type === 'mirror') {
    ctx.beginPath();
    ctx.ellipse(0, 0, 18, 28, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.85)';
    ctx.beginPath();
    ctx.arc(-5, -7, 7, 0.3, 2.1);
    ctx.stroke();
  } else if (type === 'gourmando_note') {
    ctx.rotate(-0.12);
    roundRect(ctx, -22, -26, 44, 52, 4);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = 'rgba(60,45,20,0.45)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(-12, -12 + i * 9);
      ctx.lineTo(12, -12 + i * 9);
      ctx.stroke();
    }
  } else if (type === 'relic_cache') {
    roundRect(ctx, -25, -18, 50, 36, 7);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-25, -4);
    ctx.lineTo(25, -4);
    ctx.moveTo(0, -18);
    ctx.lineTo(0, 18);
    ctx.stroke();
    ctx.fillStyle = '#fff8dc';
    ctx.beginPath();
    ctx.arc(0, -4, 6, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.arc(0, 0, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
