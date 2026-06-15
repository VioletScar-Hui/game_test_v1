import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { ARCANAS } from '../config/arcanas-data.js';
import { drawArcanaIcon, drawButton, drawRoundedRect } from './helpers.js';

export function renderArcanaSelect(ctx, game) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = '#ffd43b';
  ctx.font = 'bold 32px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(255, 212, 59, 0.5)';
  ctx.shadowBlur = 15;
  ctx.fillText('选择塔罗牌', GAME_WIDTH / 2, 80);
  ctx.shadowBlur = 0;

  const options = game.arcanaOptions && game.arcanaOptions.length > 0 ? game.arcanaOptions : ARCANAS.slice(0, 3);
  const cardW = 240, cardH = 280, gap = 34;
  const totalW = options.length * cardW + (options.length - 1) * gap;
  const startX = (GAME_WIDTH - totalW) / 2;
  const startY = 120;

  game._arcanaCardBounds = [];

  for (let i = 0; i < options.length; i++) {
    const arcana = options[i];
    const cx = startX + i * (cardW + gap);
    const cy = startY;
    const hov = game._arcanaHovered === i;
    const canSelect = game.player.arcanaInventory.canAdd(arcana.id);
    const currentCount = game.player.arcanaInventory.getCount(arcana.id);

    game._arcanaCardBounds.push({ x: cx, y: cy, w: cardW, h: cardH, index: i });

    drawRoundedRect(ctx, cx, cy, cardW, cardH, 10);
    ctx.fillStyle = hov && canSelect ? 'rgba(255, 212, 59, 0.15)' : 'rgba(255, 255, 255, 0.05)';
    ctx.fill();
    ctx.strokeStyle = hov && canSelect ? '#ffd43b' : (canSelect ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)');
    ctx.lineWidth = hov && canSelect ? 2 : 1;
    ctx.stroke();

    drawArcanaIcon(ctx, arcana, cx + cardW / 2, cy + 62, 110, { locked: !canSelect });

    ctx.fillStyle = canSelect ? '#fff' : '#555';
    ctx.font = 'bold 20px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(arcana.name, cx + cardW / 2, cy + 120);

    ctx.fillStyle = canSelect ? '#aaa' : '#444';
    ctx.font = '13px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText(arcana.nameEn, cx + cardW / 2, cy + 142);

    ctx.fillStyle = canSelect ? '#ccc' : '#444';
    ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
    const descLines = wrapArcanaText(arcana.desc, cardW - 30);
    descLines.forEach((line, li) => {
      ctx.fillText(line, cx + cardW / 2, cy + 170 + li * 18);
    });

    if (currentCount > 0) {
      ctx.fillStyle = '#ffd43b';
      ctx.font = 'bold 14px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.fillText(`已拥有 x${currentCount}`, cx + cardW / 2, cy + cardH - 40);
    }

    if (!canSelect) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      drawRoundedRect(ctx, cx, cy, cardW, cardH, 10);
      ctx.fill();
      ctx.fillStyle = '#888';
      ctx.font = '14px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.fillText('已满', cx + cardW / 2, cy + cardH - 20);
    }
  }

  const skipHov = game._arcanaSkipHovered;
  drawButton(ctx, GAME_WIDTH / 2 - 80, GAME_HEIGHT - 80, 160, 44, '跳过', skipHov);
}

function wrapArcanaText(text, maxWidth) {
  const chars = text.split('');
  const lines = [];
  let current = '';
  for (const ch of chars) {
    current += ch;
    if (current.length * 12 > maxWidth) {
      lines.push(current);
      current = '';
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 4);
}
