import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';

export class LoadingScreen {
  constructor() {
    this.active = false;
    this.text = '';
    this.subText = '';
    this.progress = 0;
    this.startTime = 0;
    this.minDuration = 2000;
  }

  show(text, subText) {
    this.active = true;
    this.text = text || '加载中...';
    this.subText = subText || '';
    this.progress = 0;
    this.startTime = performance.now();
  }

  hide() {
    this.active = false;
  }

  update() {
    if (!this.active) return;
    const elapsed = performance.now() - this.startTime;
    this.progress = Math.min(1, elapsed / this.minDuration);
    if (this.progress >= 1 && elapsed >= this.minDuration) {
      this.active = false;
    }
  }

  render(ctx) {
    ctx.fillStyle = '#0a0a14';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    ctx.fillStyle = '#ffd43b';
    ctx.font = 'bold 32px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.text, GAME_WIDTH / 2, GAME_HEIGHT / 2 - 40);

    if (this.subText) {
      ctx.fillStyle = '#aaa';
      ctx.font = '16px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.fillText(this.subText, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 10);
    }

    const barW = 300, barH = 6;
    const barX = (GAME_WIDTH - barW) / 2;
    const barY = GAME_HEIGHT / 2 + 50;
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillRect(barX, barY, barW, barH);
    ctx.fillStyle = '#ffd43b';
    ctx.fillRect(barX, barY, barW * this.progress, barH);
  }
}
