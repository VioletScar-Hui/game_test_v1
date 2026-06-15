import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';

export class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.smoothing = 0.08;
  }

  follow(target) {
    const targetX = target.x - GAME_WIDTH / 2;
    const targetY = target.y - GAME_HEIGHT / 2;
    this.x += (targetX - this.x) * this.smoothing;
    this.y += (targetY - this.y) * this.smoothing;
    const bounds = window.game?.mapBounds;
    if (bounds) {
      this.x = Math.max(bounds.minX, Math.min(bounds.maxX - GAME_WIDTH, this.x));
      this.y = Math.max(bounds.minY, Math.min(bounds.maxY - GAME_HEIGHT, this.y));
    }
  }

  apply(ctx) {
    ctx.translate(-this.x, -this.y);
  }

  screenToWorld(sx, sy) {
    return { x: sx + this.x, y: sy + this.y };
  }

  worldToScreen(wx, wy) {
    return { x: wx - this.x, y: wy - this.y };
  }
}

export class CameraShake {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.intensity = 0;
    this.duration = 0;
    this.timer = 0;
  }

  shake(intensity, duration) {
    this.intensity = intensity;
    this.duration = duration;
    this.timer = duration;
  }

  update(dt) {
    if (this.timer > 0) {
      this.timer -= dt;
      const progress = this.timer / this.duration;
      const currentIntensity = this.intensity * progress;
      this.x = (Math.random() - 0.5) * 2 * currentIntensity;
      this.y = (Math.random() - 0.5) * 2 * currentIntensity;
    } else {
      this.x = 0;
      this.y = 0;
    }
  }
}

export class GestureHandler {
  constructor(canvas) {
    this.canvas = canvas;
    this.joystick = null;
    this.joystickActive = false;
    this.joystickOrigin = null;
    this.joystickPos = null;
    this.joystickRadius = 50;
    this._bound = false;
  }

  bind() {
    if (this._bound) return;
    this._bound = true;
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = (touch.clientX - rect.left) * (this.canvas.width / rect.width);
        const y = (touch.clientY - rect.top) * (this.canvas.height / rect.height);
        if (x < GAME_WIDTH / 2) {
          this.joystickActive = true;
          this.joystickOrigin = { x, y };
          this.joystickPos = { x, y };
        }
      }
    }, { passive: true });
    this.canvas.addEventListener('touchmove', (e) => {
      if (this.joystickActive && e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = (touch.clientX - rect.left) * (this.canvas.width / rect.width);
        const y = (touch.clientY - rect.top) * (this.canvas.height / rect.height);
        this.joystickPos = { x, y };
      }
    }, { passive: true });
    this.canvas.addEventListener('touchend', () => {
      this.joystickActive = false;
      this.joystickOrigin = null;
      this.joystickPos = null;
    }, { passive: true });
  }

  getDirection() {
    if (!this.joystickActive || !this.joystickOrigin || !this.joystickPos) return { x: 0, y: 0 };
    const dx = this.joystickPos.x - this.joystickOrigin.x;
    const dy = this.joystickPos.y - this.joystickOrigin.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 5) return { x: 0, y: 0 };
    const clampedDist = Math.min(dist, this.joystickRadius);
    return { x: (dx / dist) * (clampedDist / this.joystickRadius), y: (dy / dist) * (clampedDist / this.joystickRadius) };
  }

  render(ctx) {
    if (!this.joystickActive || !this.joystickOrigin) return;
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.arc(this.joystickOrigin.x, this.joystickOrigin.y, this.joystickRadius, 0, Math.PI * 2);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    if (this.joystickPos) {
      const dx = this.joystickPos.x - this.joystickOrigin.x;
      const dy = this.joystickPos.y - this.joystickOrigin.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const clampedDist = Math.min(dist, this.joystickRadius);
      const nx = dist > 0 ? (dx / dist) * clampedDist + this.joystickOrigin.x : this.joystickOrigin.x;
      const ny = dist > 0 ? (dy / dist) * clampedDist + this.joystickOrigin.y : this.joystickOrigin.y;
      ctx.beginPath();
      ctx.arc(nx, ny, 20, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
    }
    ctx.restore();
  }
}
