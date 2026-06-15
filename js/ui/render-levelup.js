import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';

export function renderLevelUp(ctx, game) {
  const options = game.levelUpOptions || [];
  game._levelUpCardBounds = [];
  game._levelUpControlBounds = {};

  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.72)';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = '#ffd43b';
  ctx.font = 'bold 34px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('选择一道升级', GAME_WIDTH / 2, 110);

  const cardW = 290;
  const cardH = 250;
  const gap = 28;
  const totalW = options.length * cardW + Math.max(0, options.length - 1) * gap;
  const startX = (GAME_WIDTH - totalW) / 2;
  const y = 190;

  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    const x = startX + i * (cardW + gap);
    const hovered = game._levelUpHovered === i;
    const banishRect = { x: x + cardW - 78, y: y + 14, w: 28, h: 26 };
    const sealRect = { x: x + cardW - 42, y: y + 14, w: 28, h: 26 };
    game._levelUpCardBounds.push({
      x, y, w: cardW, h: cardH, index: i,
      banishX: banishRect.x, banishY: banishRect.y, banishW: banishRect.w, banishH: banishRect.h,
      sealX: sealRect.x, sealY: sealRect.y, sealW: sealRect.w, sealH: sealRect.h
    });

    ctx.fillStyle = hovered ? 'rgba(80, 52, 24, 0.96)' : 'rgba(28, 24, 30, 0.96)';
    ctx.fillRect(x, y, cardW, cardH);
    ctx.strokeStyle = hovered ? '#ffd43b' : 'rgba(255,255,255,0.26)';
    ctx.lineWidth = hovered ? 3 : 1;
    ctx.strokeRect(x, y, cardW, cardH);

    ctx.fillStyle = option.kind === 'passive' ? '#74c0fc' : (option.kind === 'fallback' ? '#69db7c' : '#ff922b');
    ctx.font = 'bold 18px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(option.name, x + 22, y + 34);

    if (option.kind !== 'fallback') {
      drawMiniButton(ctx, banishRect, 'B', game._levelUpBanishHovered === i, game.levelUpControls?.banish <= 0);
      drawMiniButton(ctx, sealRect, 'S', game._levelUpSealHovered === i, game.levelUpControls?.seal <= 0);
    }

    ctx.fillStyle = '#ffd43b';
    ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
    const levelText = option.kind === 'fallback' ? '保底' : (option.isNew ? 'NEW' : `Lv.${option.level}`);
    ctx.fillText(levelText, x + 22, y + 64);

    ctx.fillStyle = '#fff';
    ctx.font = '14px "Segoe UI", "Microsoft YaHei", sans-serif';
    wrapLevelUpText(ctx, option.desc, x + 22, y + 104, cardW - 44, 22, 3);

    ctx.fillStyle = '#aaa';
    ctx.font = 'italic 12px "Segoe UI", "Microsoft YaHei", sans-serif';
    wrapLevelUpText(ctx, option.flavor || '', x + 22, y + 188, cardW - 44, 18, 2);
  }

  const controlsY = GAME_HEIGHT - 118;
  const reroll = { x: GAME_WIDTH / 2 - 180, y: controlsY, w: 160, h: 42 };
  const skip = { x: GAME_WIDTH / 2 + 20, y: controlsY, w: 160, h: 42 };
  game._levelUpControlBounds.reroll = reroll;
  game._levelUpControlBounds.skip = skip;
  drawControlButton(ctx, reroll, `重抽 ${game.levelUpControls?.reroll ?? 0}`, game._levelUpControlHovered === 'reroll', (game.levelUpControls?.reroll ?? 0) <= 0);
  drawControlButton(ctx, skip, `跳过 +10G ${game.levelUpControls?.skip ?? 0}`, game._levelUpControlHovered === 'skip', (game.levelUpControls?.skip ?? 0) <= 0);

  ctx.fillStyle = '#aaa';
  ctx.font = '13px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`B 放逐本局剩余 ${game.levelUpControls?.banish ?? 0}   S 永久封印剩余 ${game.levelUpControls?.seal ?? 0}`, GAME_WIDTH / 2, GAME_HEIGHT - 58);
  ctx.restore();
}

function drawMiniButton(ctx, rect, label, hovered, disabled) {
  ctx.save();
  ctx.fillStyle = disabled ? 'rgba(70,70,70,0.8)' : (hovered ? 'rgba(255, 212, 59, 0.9)' : 'rgba(255,255,255,0.13)');
  ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
  ctx.strokeStyle = disabled ? 'rgba(255,255,255,0.15)' : (hovered ? '#fff3bf' : 'rgba(255,255,255,0.28)');
  ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
  ctx.fillStyle = disabled ? '#999' : (hovered ? '#1b1300' : '#eee');
  ctx.font = 'bold 13px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, rect.x + rect.w / 2, rect.y + rect.h / 2);
  ctx.restore();
}

function drawControlButton(ctx, rect, label, hovered, disabled) {
  ctx.save();
  ctx.fillStyle = disabled ? 'rgba(45,45,55,0.9)' : (hovered ? 'rgba(255, 212, 59, 0.25)' : 'rgba(255,255,255,0.08)');
  ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
  ctx.strokeStyle = disabled ? 'rgba(255,255,255,0.12)' : (hovered ? '#ffd43b' : 'rgba(255,255,255,0.28)');
  ctx.lineWidth = hovered ? 2 : 1;
  ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
  ctx.fillStyle = disabled ? '#777' : '#fff';
  ctx.font = 'bold 15px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, rect.x + rect.w / 2, rect.y + rect.h / 2);
  ctx.restore();
}

function wrapLevelUpText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  let line = '';
  let lineCount = 0;
  for (const ch of text) {
    const test = line + ch;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, y + lineCount * lineHeight);
      line = ch;
      lineCount++;
      if (lineCount >= maxLines) return;
    } else {
      line = test;
    }
  }
  if (line && lineCount < maxLines) ctx.fillText(line, x, y + lineCount * lineHeight);
}
