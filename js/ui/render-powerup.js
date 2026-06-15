import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { POWERUP_SPRITES } from '../config/assets.js';
import { POWERUP_DEFS, getPowerUpCost, getPowerUpTotalCost } from '../game/powerup-store.js';
import { drawButton } from './helpers.js';

export function renderPowerUp(ctx, game) {
  const meta = game.meta;
  ctx.fillStyle = '#0b0b14';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 38px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('能力强化', GAME_WIDTH / 2, 58);

  ctx.fillStyle = '#ffd43b';
  ctx.font = 'bold 19px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.fillText(`跨局金币：${meta.goldBank}`, GAME_WIDTH / 2, 96);

  game._powerUpRowBounds = [];
  const ids = Object.keys(POWERUP_DEFS);
  const startX = 190;
  const startY = 132;
  const rowW = GAME_WIDTH - 380;
  const rowH = 54;
  const gap = 12;

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const def = POWERUP_DEFS[id];
    const entry = meta.powerUps[id] || { level: 0 };
    const y = startY + i * (rowH + gap);
    const hovered = game._powerUpHovered === i;
    const maxed = entry.level >= def.maxLevel;
    const cost = getPowerUpCost(id, entry.level);
    const canBuy = !maxed && meta.goldBank >= cost;

    ctx.fillStyle = hovered ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.045)';
    roundPowerUpRect(ctx, startX, y, rowW, rowH, 8);
    ctx.fill();
    ctx.strokeStyle = hovered ? 'rgba(255,212,59,0.45)' : 'rgba(255,255,255,0.14)';
    ctx.stroke();

    const sprite = POWERUP_SPRITES[id];
    if (isPowerUpDrawableImage(sprite)) {
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.45)';
      ctx.shadowBlur = 8;
      ctx.drawImage(sprite, startX + 14, y + 7, 40, 40);
      ctx.restore();
    }

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 17px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(def.name, startX + 68, y + 19);

    ctx.fillStyle = '#aaa';
    ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText(def.desc, startX + 68, y + 39);

    const dotsX = startX + rowW - 310;
    for (let lv = 0; lv < def.maxLevel; lv++) {
      ctx.beginPath();
      ctx.arc(dotsX + lv * 18, y + rowH / 2, 6, 0, Math.PI * 2);
      ctx.fillStyle = lv < entry.level ? '#ffd43b' : 'rgba(255,255,255,0.16)';
      ctx.fill();
    }

    const buyX = startX + rowW - 148;
    const buyY = y + 10;
    const buyW = 116;
    const buyH = 34;
    game._powerUpRowBounds.push({ id, x: startX, y, w: rowW, h: rowH, buyX, buyY, buyW, buyH });
    drawSmallButton(ctx, buyX, buyY, buyW, buyH, maxed ? '已满' : `${cost}G`, hovered && canBuy, !canBuy);
  }

  const refund = getPowerUpTotalCost(meta.powerUps);
  game._powerUpRefundBounds = { x: GAME_WIDTH / 2 - 190, y: GAME_HEIGHT - 82, w: 160, h: 44 };
  game._powerUpBackBounds = { x: GAME_WIDTH / 2 + 30, y: GAME_HEIGHT - 82, w: 160, h: 44 };
  drawButton(ctx, game._powerUpRefundBounds.x, game._powerUpRefundBounds.y, game._powerUpRefundBounds.w, game._powerUpRefundBounds.h, `退款 ${refund}G`, game._powerUpRefundHovered);
  drawButton(ctx, game._powerUpBackBounds.x, game._powerUpBackBounds.y, game._powerUpBackBounds.w, game._powerUpBackBounds.h, '返回', game._powerUpBackHovered);
}

function isPowerUpDrawableImage(sprite) {
  return sprite && (
    sprite instanceof HTMLCanvasElement ||
    (sprite.complete && sprite.naturalWidth > 0)
  );
}

function drawSmallButton(ctx, x, y, w, h, label, hovered, disabled) {
  ctx.save();
  roundPowerUpRect(ctx, x, y, w, h, 7);
  ctx.fillStyle = disabled ? 'rgba(80,80,90,0.8)' : (hovered ? 'rgba(255, 212, 59, 0.92)' : 'rgba(255, 212, 59, 0.18)');
  ctx.fill();
  ctx.strokeStyle = disabled ? 'rgba(255,255,255,0.12)' : '#ffd43b';
  ctx.stroke();
  ctx.fillStyle = disabled ? '#888' : (hovered ? '#1d1600' : '#ffd43b');
  ctx.font = 'bold 14px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, x + w / 2, y + h / 2);
  ctx.restore();
}

function roundPowerUpRect(ctx, x, y, w, h, r) {
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
