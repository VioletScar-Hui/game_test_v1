import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { ARCANAS } from '../config/arcanas-data.js';
import { ARCANA_ATLAS_IMAGE } from '../config/assets.js';

export function drawRoundedRect(ctx, x, y, w, h, r) {
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

export function drawButton(ctx, x, y, w, h, text, hovered, opts = {}) {
  const r = opts.radius || 8;
  const fillColor = hovered ? (opts.hoverFill || 'rgba(255, 212, 59, 0.25)') : (opts.fill || 'rgba(255, 255, 255, 0.08)');
  const strokeColor = hovered ? (opts.hoverStroke || '#ffd43b') : (opts.stroke || 'rgba(255, 255, 255, 0.3)');
  const textColor = hovered ? (opts.hoverText || '#ffd43b') : (opts.text || '#ccc');
  const font = opts.font || 'bold 18px "Segoe UI", "Microsoft YaHei", sans-serif';

  drawRoundedRect(ctx, x, y, w, h, r);
  ctx.fillStyle = fillColor;
  ctx.fill();
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = opts.lineWidth || 2;
  ctx.stroke();

  ctx.fillStyle = textColor;
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x + w / 2, y + h / 2);
}

export function pointInRect(px, py, rx, ry, rw, rh) {
  return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;
}

export function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

export function drawCoverImage(ctx, img, x, y, w, h) {
  if (!img || !img.complete || img.naturalWidth === 0) return false;
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = w / h;
  let sx, sy, sWidth, sHeight;
  if (imgRatio > canvasRatio) {
    sHeight = img.naturalHeight;
    sWidth = sHeight * canvasRatio;
    sx = (img.naturalWidth - sWidth) / 2;
    sy = 0;
  } else {
    sWidth = img.naturalWidth;
    sHeight = sWidth / canvasRatio;
    sx = 0;
    sy = (img.naturalHeight - sHeight) / 2;
  }
  ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, w, h);
  return true;
}

export function drawArcanaIcon(ctx, arcana, cx, cy, size, opts = {}) {
  const ready = ARCANA_ATLAS_IMAGE &&
    ARCANA_ATLAS_IMAGE.complete &&
    ARCANA_ATLAS_IMAGE.naturalWidth > 0 &&
    ARCANA_ATLAS_IMAGE.naturalHeight > 0;
  const index = ARCANAS.findIndex(item => item.id === arcana?.id);
  if (ready && index >= 0) {
    const cols = 4;
    const rows = 3;
    const cellW = ARCANA_ATLAS_IMAGE.naturalWidth / cols;
    const cellH = ARCANA_ATLAS_IMAGE.naturalHeight / rows;
    const col = index % cols;
    const row = Math.floor(index / cols);
    ctx.save();
    if (opts.locked) ctx.filter = 'grayscale(1) brightness(0.45)';
    ctx.globalAlpha = opts.alpha ?? 1;
    ctx.drawImage(
      ARCANA_ATLAS_IMAGE,
      col * cellW,
      row * cellH,
      cellW,
      cellH,
      cx - size / 2,
      cy - size / 2,
      size,
      size
    );
    ctx.restore();
    return true;
  }

  ctx.save();
  ctx.globalAlpha = opts.alpha ?? 1;
  ctx.fillStyle = arcana?.color || '#ffd43b';
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.42, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#111';
  ctx.font = `bold ${Math.max(11, Math.floor(size * 0.34))}px "Segoe UI", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(arcana?.icon || '?', cx, cy + 1);
  ctx.restore();
  return false;
}
