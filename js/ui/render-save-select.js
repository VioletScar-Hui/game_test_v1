import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { drawButton, drawRoundedRect } from './helpers.js';

export function renderSaveSelect(ctx, game) {
  ctx.fillStyle = '#0a0a14';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 40px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 10;
  ctx.fillText('选择存档', GAME_WIDTH / 2, 60);
  ctx.shadowBlur = 0;

  const saves = game._getAllSaves();
  const slotW = 320, slotH = 200, gap = 30;
  const totalW = 3 * slotW + 2 * gap;
  const startX = (GAME_WIDTH - totalW) / 2;
  const startY = 100;

  game._saveSlotBounds = [];

  for (let i = 0; i < 3; i++) {
    const sx = startX + i * (slotW + gap);
    const sy = startY;
    const save = saves[i];
    const hov = game._saveSlotHovered === i;

    game._saveSlotBounds.push({ x: sx, y: sy, w: slotW, h: slotH, slot: i });

    drawRoundedRect(ctx, sx, sy, slotW, slotH, 10);
    ctx.fillStyle = hov ? 'rgba(255, 212, 59, 0.12)' : 'rgba(255, 255, 255, 0.05)';
    ctx.fill();
    ctx.strokeStyle = hov ? '#ffd43b' : 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#ffd43b';
    ctx.font = 'bold 22px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(`存档 ${i + 1}`, sx + slotW / 2, sy + 35);

    if (save) {
      ctx.fillStyle = '#ccc';
      ctx.font = '15px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.fillText(`${save.characterName || '未知'}`, sx + slotW / 2, sy + 65);
      ctx.fillText(`等级: ${save.level || 1}  击杀: ${save.kills || 0}`, sx + slotW / 2, sy + 90);
      ctx.fillText(`分数: ${save.score || 0}  时间: ${save.time || '0:00'}`, sx + slotW / 2, sy + 115);
      ctx.fillStyle = '#888';
      ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.fillText(save.date || '', sx + slotW / 2, sy + 140);

      const delBtnX = sx + slotW / 2 - 40, delBtnY = sy + slotH - 45;
      const delHov = game._saveDeleteHovered === i;
      drawButton(ctx, delBtnX, delBtnY, 80, 30, '删除', delHov, {
        fill: 'rgba(255,0,0,0.1)', hoverFill: 'rgba(255,0,0,0.3)',
        stroke: 'rgba(255,0,0,0.4)', hoverStroke: '#ff6b6b',
        text: '#ff6b6b', hoverText: '#ff6b6b', radius: 4
      });
    } else {
      ctx.fillStyle = '#666';
      ctx.font = '18px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.fillText('空存档', sx + slotW / 2, sy + slotH / 2);
    }
  }

  const backHov = game._saveBackHovered;
  drawButton(ctx, GAME_WIDTH / 2 - 80, startY + slotH + 30, 160, 44, '返回', backHov);
}
