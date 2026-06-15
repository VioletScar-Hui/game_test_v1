import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { INTRO_SUBTITLES } from '../config/constants.js';

export class IntroSequence {
  constructor() {
    this.active = true;
    this.currentLine = 0;
    this.lineProgress = 0;
    this.scrollY = GAME_HEIGHT;
    this.speed = 0.06;
    this.lineDelay = 1200;
    this.lastLineTime = 0;
    this.alpha = 0;
    this.fadeState = 'in';
    this.finished = false;
    this.waitingForInput = false;
    this.waitAlpha = 0;
  }

  start() {
    this.active = true;
    this.currentLine = 0;
    this.lineProgress = 0;
    this.scrollY = GAME_HEIGHT;
    this.lastLineTime = performance.now();
    this.alpha = 0;
    this.fadeState = 'in';
    this.finished = false;
    this.waitingForInput = false;
    this.waitAlpha = 0;
  }

  update(dt) {
    if (!this.active || this.finished) return;

    if (this.waitingForInput) {
      this.waitAlpha = 0.5 + Math.sin(performance.now() * 0.004) * 0.4;
      return;
    }

    if (this.fadeState === 'in') {
      this.alpha = Math.min(1, this.alpha + dt * 0.002);
      if (this.alpha >= 1) this.fadeState = 'scroll';
    } else if (this.fadeState === 'out') {
      this.alpha = Math.max(0, this.alpha - dt * 0.003);
      if (this.alpha <= 0) {
        this.active = false;
        this.finished = true;
      }
      return;
    }

    this.scrollY -= this.speed * dt;

    const lineHeight = 42;
    const totalHeight = INTRO_SUBTITLES.length * lineHeight;
    const endY = GAME_HEIGHT / 2 - totalHeight / 2;

    if (this.scrollY < endY - 100) {
      this.fadeState = 'hold';
      this.waitingForInput = true;
    }
  }

  skip() {
    if (!this.active) return;
    if (this.waitingForInput) {
      this.waitingForInput = false;
      this.fadeState = 'out';
      return;
    }
    if (this.fadeState !== 'out') {
      this.fadeState = 'out';
    }
  }

  render(ctx) {
    if (!this.active) return;

    ctx.fillStyle = '#050510';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    ctx.save();
    ctx.globalAlpha = this.alpha;

    const lineHeight = 42;
    const centerX = GAME_WIDTH / 2;
    let currentY = this.scrollY;

    for (let i = 0; i < INTRO_SUBTITLES.length; i++) {
      const line = INTRO_SUBTITLES[i];
      if (!line.text) {
        currentY += lineHeight * 0.6;
        continue;
      }

      let fontSize = 24;
      let color = '#e8e8e8';
      let fontWeight = 'normal';

      if (line.style === 'title') {
        fontSize = 32;
        color = '#ffd43b';
        fontWeight = 'bold';
      } else if (line.style === 'name') {
        fontSize = 26;
        color = '#ff8787';
      } else if (line.style === 'emphasis') {
        fontSize = 24;
        color = '#74c0fc';
        fontWeight = 'bold';
      }

      const distFromCenter = Math.abs(currentY - GAME_HEIGHT / 2);
      const lineAlpha = Math.max(0, 1 - distFromCenter / 280);

      ctx.globalAlpha = this.alpha * lineAlpha;
      ctx.font = `${fontWeight} ${fontSize}px "Segoe UI", "Microsoft YaHei", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillStyle = color;
      ctx.fillText(line.text, centerX, currentY);

      currentY += lineHeight;
    }

    if (this.waitingForInput) {
      ctx.globalAlpha = this.waitAlpha;
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 28px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('按任意键继续', GAME_WIDTH / 2, GAME_HEIGHT - 80);
    } else if (!this.waitingForInput && this.fadeState !== 'out') {
      ctx.globalAlpha = 0.5 + Math.sin(performance.now() * 0.004) * 0.3;
      ctx.fillStyle = '#888';
      ctx.font = '18px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('点击或按空格跳过', GAME_WIDTH / 2, GAME_HEIGHT - 40);
    }

    ctx.restore();
  }
}
