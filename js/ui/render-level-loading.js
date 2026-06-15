import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { LEVELS } from '../config/levels.js';
import { LEVEL_BG_IMAGES } from '../config/assets.js';
import { drawCoverImage } from './helpers.js';

export function renderLevelLoading(ctx, game) {
  const level = LEVELS[game.selectedLevelIndex] || LEVELS[0];
  const elapsed = performance.now() - game._levelLoadStart;
  const progress = Math.min(1, elapsed / game._levelLoadDuration);

  ctx.fillStyle = '#050510';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  const bgImg = LEVEL_BG_IMAGES[level.id];
  if (drawCoverImage(ctx, bgImg, 0, 0, GAME_WIDTH, GAME_HEIGHT)) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  }

  let alpha = 1;
  if (elapsed < 600) alpha = elapsed / 600;
  else if (elapsed > game._levelLoadDuration - 500) alpha = (game._levelLoadDuration - elapsed) / 500;
  alpha = Math.max(0, Math.min(1, alpha));

  ctx.save();
  ctx.globalAlpha = alpha;

  ctx.fillStyle = '#ffd43b';
  ctx.font = 'bold 36px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 10;
  ctx.fillText(level.name, GAME_WIDTH / 2, 120);
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#aaa';
  ctx.font = '16px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.fillText(level.nameEn, GAME_WIDTH / 2, 150);

  ctx.fillStyle = '#ccc';
  ctx.font = '14px "Segoe UI", "Microsoft YaHei", sans-serif';
  const descLines = wrapLevelText(level.loadText, GAME_WIDTH - 120);
  descLines.forEach((line, i) => {
    ctx.fillText(line, GAME_WIDTH / 2, 200 + i * 22);
  });

  const barW = 300, barH = 6;
  const barX = (GAME_WIDTH - barW) / 2;
  const barY = GAME_HEIGHT - 80;
  ctx.fillStyle = 'rgba(255,255,255,0.1)';
  ctx.fillRect(barX, barY, barW, barH);
  ctx.fillStyle = '#ffd43b';
  ctx.fillRect(barX, barY, barW * progress, barH);

  ctx.fillStyle = '#888';
  ctx.font = '13px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.fillText('点击任意位置跳过', GAME_WIDTH / 2, GAME_HEIGHT - 50);

  ctx.restore();
}

function wrapLevelText(text, maxWidth) {
  const chars = text.split('');
  const lines = [];
  let current = '';
  for (const ch of chars) {
    current += ch;
    if (current.length * 14 > maxWidth) {
      lines.push(current);
      current = '';
    }
  }
  if (current) lines.push(current);
  return lines;
}
