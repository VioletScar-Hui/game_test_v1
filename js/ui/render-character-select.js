import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { CHARACTERS } from '../config/characters.js';
import { CHARACTER_BG_IMAGES, CHARACTER_SPRITES } from '../config/assets.js';
import { drawButton, drawCoverImage, drawRoundedRect } from './helpers.js';
import { getCharacterUnlockText, isCharacterUnlocked } from '../game/unlock-manager.js';

export function renderCharacterSelect(ctx, game) {
  ctx.fillStyle = '#0a0a14';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 40px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 10;
  ctx.fillText('选择角色', GAME_WIDTH / 2, 60);
  ctx.shadowBlur = 0;

  const cardW = 280, cardH = 440, gap = 20;
  const totalW = CHARACTERS.length * cardW + (CHARACTERS.length - 1) * gap;
  const startX = (GAME_WIDTH - totalW) / 2;
  const startY = 90;

  game._charCardBounds = [];

  for (let i = 0; i < CHARACTERS.length; i++) {
    const char = CHARACTERS[i];
    const cx = startX + i * (cardW + gap);
    const cy = startY;
    const hov = game._charHovered === i;
    const selected = game.selectedCharacterIndex === i;
    const locked = !isCharacterUnlocked(game.meta, char.id);

    game._charCardBounds.push({ x: cx, y: cy, w: cardW, h: cardH, index: i, locked });

    drawRoundedRect(ctx, cx, cy, cardW, cardH, 10);
    ctx.fillStyle = locked ? 'rgba(20, 20, 28, 0.82)' : (selected ? 'rgba(255, 212, 59, 0.12)' : (hov ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.03)'));
    ctx.fill();
    ctx.strokeStyle = selected ? '#ffd43b' : (hov ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)');
    ctx.lineWidth = selected ? 2 : 1;
    ctx.stroke();

    const bgImg = CHARACTER_BG_IMAGES[char.id];
    const bgAreaH = 100;
    const bgAreaY = cy + 10;
    if (!drawCoverImage(ctx, bgImg, cx + 10, bgAreaY, cardW - 20, bgAreaH)) {
      ctx.fillStyle = 'rgba(255,255,255,0.03)';
      ctx.fillRect(cx + 10, bgAreaY, cardW - 20, bgAreaH);
    }
    ctx.fillStyle = 'rgba(10, 10, 20, 0.55)';
    ctx.fillRect(cx + 10, bgAreaY, cardW - 20, bgAreaH);

    const sprite = CHARACTER_SPRITES[char.id];
    const isReady = sprite && (sprite instanceof HTMLCanvasElement || (sprite.complete && sprite.naturalWidth > 0));
    if (isReady) {
      const spriteSize = 80;
      const spriteY = bgAreaY + bgAreaH + 8;
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = 8;
      ctx.drawImage(sprite, cx + cardW / 2 - spriteSize / 2, spriteY, spriteSize, spriteSize);
      ctx.restore();
    }

    ctx.fillStyle = selected ? '#ffd43b' : '#fff';
    ctx.font = 'bold 20px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(char.name, cx + cardW / 2, cy + 200);

    ctx.fillStyle = '#aaa';
    ctx.font = '13px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText(char.title, cx + cardW / 2, cy + 225);

    ctx.fillStyle = '#888';
    ctx.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
    const loreLines = wrapCharacterText(char.lore, cardW - 30);
    loreLines.forEach((line, li) => {
      ctx.fillText(line, cx + cardW / 2, cy + 250 + li * 16);
    });

    ctx.fillStyle = '#ffd43b';
    ctx.font = 'bold 12px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText(`武器: ${char.weapon}`, cx + cardW / 2, cy + 310);

    ctx.fillStyle = '#74c0fc';
    ctx.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText(`${char.passive.name}: ${char.passive.description}`, cx + cardW / 2, cy + 335);

    ctx.fillStyle = '#ccc';
    ctx.font = '10px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText(`HP:${char.stats.maxHp} 速度:${char.stats.moveSpeed} 力量:${char.stats.power}`, cx + cardW / 2, cy + 360);

    if (locked) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.58)';
      ctx.fillRect(cx + 12, cy + 12, cardW - 24, cardH - 24);
      ctx.fillStyle = '#ffd43b';
      ctx.font = 'bold 18px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.fillText('未解锁', cx + cardW / 2, cy + 178);
      ctx.fillStyle = '#eee';
      ctx.font = '13px "Segoe UI", "Microsoft YaHei", sans-serif';
      wrapCharacterText(getCharacterUnlockText(char.id), cardW - 52).forEach((line, li) => {
        ctx.fillText(line, cx + cardW / 2, cy + 212 + li * 18);
      });
    }
  }

  const btnY = startY + cardH + 20;
  const confirmHov = game._charConfirmHovered;
  const selectedChar = CHARACTERS[game.selectedCharacterIndex];
  const selectedLocked = selectedChar && !isCharacterUnlocked(game.meta, selectedChar.id);
  drawButton(ctx, GAME_WIDTH / 2 - 80, btnY, 160, 44, selectedLocked ? '未解锁' : '确认选择', confirmHov && !selectedLocked);
  game._charConfirmBounds = { x: GAME_WIDTH / 2 - 80, y: btnY, w: 160, h: 44 };

  const backHov = game._charBackHovered;
  drawButton(ctx, GAME_WIDTH / 2 - 80, btnY + 56, 160, 44, '返回', backHov);
  game._charBackBounds = { x: GAME_WIDTH / 2 - 80, y: btnY + 56, w: 160, h: 44 };
}

function wrapCharacterText(text, maxWidth) {
  const chars = text.split('');
  const lines = [];
  let current = '';
  for (const ch of chars) {
    current += ch;
    if (current.length * 11 > maxWidth) {
      lines.push(current);
      current = '';
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 4);
}
