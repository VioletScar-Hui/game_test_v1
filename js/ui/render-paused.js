import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { drawButton, pointInRect, drawRoundedRect } from './helpers.js';

export function renderPaused(ctx, game) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 48px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 12;
  ctx.fillText('游戏暂停', GAME_WIDTH / 2, GAME_HEIGHT / 2 - 200);
  ctx.shadowBlur = 0;

  game.pauseMenuButtons.forEach(b => b.render(ctx));

  if (game._showSaveSlotSelect) {
    renderSaveSlotOverlay(ctx, game);
  }
}

function renderSaveSlotOverlay(ctx, game) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = '#ffd43b';
  ctx.font = 'bold 28px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('选择保存位置', GAME_WIDTH / 2, 100);

  const saves = game._getAllSaves();
  const slotW = 280, slotH = 160, gap = 24;
  const totalW = 3 * slotW + 2 * gap;
  const startX = (GAME_WIDTH - totalW) / 2;
  const startY = 130;

  game._pauseSaveSlotBounds = [];

  for (let i = 0; i < 3; i++) {
    const sx = startX + i * (slotW + gap);
    const sy = startY;
    const save = saves[i];
    const hov = game._pauseSaveSlotHovered === i;

    game._pauseSaveSlotBounds.push({ x: sx, y: sy, w: slotW, h: slotH, slot: i });

    ctx.save();
    const cr = 10;
    drawRoundedRect(ctx, sx, sy, slotW, slotH, cr);
    ctx.fillStyle = hov ? 'rgba(255, 212, 59, 0.15)' : 'rgba(255, 255, 255, 0.05)';
    ctx.fill();
    ctx.strokeStyle = hov ? '#ffd43b' : 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#ffd43b';
    ctx.font = 'bold 20px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(`存档 ${i + 1}`, sx + slotW / 2, sy + 30);

    if (save) {
      ctx.fillStyle = '#ccc';
      ctx.font = '14px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.fillText(`${save.characterName || '未知'}`, sx + slotW / 2, sy + 55);
      ctx.fillText(`等级: ${save.level || 1}  击杀: ${save.kills || 0}`, sx + slotW / 2, sy + 75);
      ctx.fillText(`分数: ${save.score || 0}  时间: ${save.time || '0:00'}`, sx + slotW / 2, sy + 95);
      ctx.fillStyle = '#888';
      ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.fillText(save.date || '', sx + slotW / 2, sy + 115);

      const delBtnX = sx + slotW - 60, delBtnY = sy + slotH - 35;
      const delHov = game._pauseDeleteHovered === i;
      drawButton(ctx, delBtnX, delBtnY, 50, 25, '删除', delHov, {
        fill: 'rgba(255,0,0,0.1)', hoverFill: 'rgba(255,0,0,0.3)',
        stroke: 'rgba(255,0,0,0.4)', hoverStroke: '#ff6b6b',
        text: '#ff6b6b', hoverText: '#ff6b6b',
        font: '12px "Segoe UI", "Microsoft YaHei", sans-serif', radius: 4
      });
    } else {
      ctx.fillStyle = '#666';
      ctx.font = '16px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.fillText('空存档', sx + slotW / 2, sy + slotH / 2 + 5);
    }
    ctx.restore();
  }

  const cancelBtnY = startY + slotH + 30;
  const cancelHov = game._pauseCancelHovered;
  drawButton(ctx, GAME_WIDTH / 2 - 80, cancelBtnY, 160, 40, '取消', cancelHov);
}
