import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { INTERACTABLE_DEFS } from '../config/interactables-data.js';
import { drawButton } from './helpers.js';

export function renderInteractableChoice(ctx, game) {
  const item = game.pendingInteractableChoice;
  if (!item) return;
  const def = INTERACTABLE_DEFS[item.interactableType] || {};
  game._interactableChoiceBounds = [];

  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.68)';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  const panelW = 520;
  const panelH = 260;
  const x = (GAME_WIDTH - panelW) / 2;
  const y = (GAME_HEIGHT - panelH) / 2;
  roundInteractableChoiceRect(ctx, x, y, panelW, panelH, 10);
  ctx.fillStyle = 'rgba(22, 18, 30, 0.96)';
  ctx.fill();
  ctx.strokeStyle = def.color || '#ffd43b';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = def.color || '#ffd43b';
  ctx.font = 'bold 28px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(def.name || '互动物', GAME_WIDTH / 2, y + 56);

  ctx.fillStyle = '#fff';
  ctx.font = '15px "Segoe UI", "Microsoft YaHei", sans-serif';
  wrapInteractableText(ctx, def.desc || '', x + 52, y + 100, panelW - 104, 24, 3);

  const accept = { id: 'sacrifice', x: x + 78, y: y + panelH - 76, w: 160, h: 44 };
  const ignore = { id: 'ignore', x: x + panelW - 238, y: y + panelH - 76, w: 160, h: 44 };
  game._interactableChoiceBounds.push(accept, ignore);
  drawButton(ctx, accept.x, accept.y, accept.w, accept.h, '献祭生命', game._interactableChoiceHovered === 0);
  drawButton(ctx, ignore.x, ignore.y, ignore.w, ignore.h, '忽略', game._interactableChoiceHovered === 1);
  ctx.restore();
}

function wrapInteractableText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  let line = '';
  let count = 0;
  ctx.textAlign = 'center';
  for (const ch of text) {
    const test = line + ch;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x + maxWidth / 2, y + count * lineHeight);
      line = ch;
      count++;
      if (count >= maxLines) return;
    } else {
      line = test;
    }
  }
  if (line && count < maxLines) ctx.fillText(line, x + maxWidth / 2, y + count * lineHeight);
}

function roundInteractableChoiceRect(ctx, x, y, w, h, r) {
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
