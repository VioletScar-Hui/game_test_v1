import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';

export class MenuButton {
  constructor(x, y, w, h, text, action) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
    this.action = action;
    this.hovered = false;
  }

  containsPoint(px, py) {
    return px >= this.x && px <= this.x + this.w && py >= this.y && py <= this.y + this.h;
  }

  render(ctx) {
    const r = 8;
    ctx.save();
    ctx.shadowColor = this.hovered ? 'rgba(255, 212, 59, 0.34)' : 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = this.hovered ? 16 : 8;
    ctx.shadowOffsetY = 4;
    ctx.fillStyle = this.hovered ? 'rgba(56, 39, 9, 0.92)' : 'rgba(12, 14, 21, 0.88)';
    ctx.strokeStyle = this.hovered ? '#ffd43b' : 'rgba(248, 241, 216, 0.22)';
    ctx.lineWidth = this.hovered ? 2.5 : 1.5;
    ctx.beginPath();
    ctx.moveTo(this.x + r, this.y);
    ctx.lineTo(this.x + this.w - r, this.y);
    ctx.quadraticCurveTo(this.x + this.w, this.y, this.x + this.w, this.y + r);
    ctx.lineTo(this.x + this.w, this.y + this.h - r);
    ctx.quadraticCurveTo(this.x + this.w, this.y + this.h, this.x + this.w - r, this.y + this.h);
    ctx.lineTo(this.x + r, this.y + this.h);
    ctx.quadraticCurveTo(this.x, this.y + this.h, this.x, this.y + this.h - r);
    ctx.lineTo(this.x, this.y + r);
    ctx.quadraticCurveTo(this.x, this.y, this.x + r, this.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = this.hovered ? '#ffd43b' : '#f8f1d8';
    ctx.font = 'bold 18px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.text, this.x + 26, this.y + this.h / 2);
    ctx.strokeStyle = this.hovered ? '#ffd43b' : 'rgba(248, 241, 216, 0.34)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(this.x + this.w - 34, this.y + this.h / 2);
    ctx.lineTo(this.x + this.w - 22, this.y + this.h / 2);
    ctx.lineTo(this.x + this.w - 28, this.y + this.h / 2 - 6);
    ctx.moveTo(this.x + this.w - 22, this.y + this.h / 2);
    ctx.lineTo(this.x + this.w - 28, this.y + this.h / 2 + 6);
    ctx.stroke();
    ctx.restore();
  }
}
