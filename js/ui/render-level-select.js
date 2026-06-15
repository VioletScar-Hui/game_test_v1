import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { LEVELS } from '../config/levels.js';
import { LEVEL_BG_IMAGES } from '../config/assets.js';
import { drawCoverImage, drawRoundedRect, pointInRect } from './helpers.js';
import { getLevelUnlockText, isLevelUnlocked } from '../game/unlock-manager.js';
import { CHALLENGE_DEFS } from '../config/challenges-data.js';
import { getDailyChallengeForDate } from '../game/m4-systems.js';

const CARD_W = 190, CARD_H = 280, CARD_GAP = 16, CARD_START_Y = 140;
const CONFIRM_W = 200, CONFIRM_H = 52;
const BACK_X = 40, BACK_Y = GAME_HEIGHT - 70, BACK_W = 120, BACK_H = 44;
const CHALLENGE_ORDER = [null, 'pigeon_kingdom', 'inspector_parade'];

function getCardPositions() {
  const totalW = LEVELS.length * CARD_W + (LEVELS.length - 1) * CARD_GAP;
  const startX = (GAME_WIDTH - totalW) / 2;
  const positions = [];
  for (let i = 0; i < LEVELS.length; i++) {
    positions.push({ x: startX + i * (CARD_W + CARD_GAP), y: CARD_START_Y });
  }
  return positions;
}

export function renderLevelSelect(ctx, game) {
  renderRunProfileControls(ctx, game);

  if (game.selectedLevelIndex >= 0) {
    const lvl = LEVELS[game.selectedLevelIndex];
    const bgImg = LEVEL_BG_IMAGES[lvl.id];
    if (!drawCoverImage(ctx, bgImg, 0, 0, GAME_WIDTH, GAME_HEIGHT)) {
      ctx.fillStyle = '#0a0a14';
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    }
    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  } else {
    ctx.fillStyle = '#0a0a14';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  }

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 40px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 10;
  ctx.fillText('选择关卡', GAME_WIDTH / 2, 70);
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#bbb';
  ctx.font = '16px sans-serif';
  ctx.fillText('点击关卡卡片查看详情，确认后点击继续', GAME_WIDTH / 2, 105);

  const positions = getCardPositions();
  game._levelCardBounds = [];

  for (let i = 0; i < LEVELS.length; i++) {
    const lvl = LEVELS[i];
    const px = positions[i].x;
    const py = positions[i].y;
    const hov = game._levelHovered === i;
    const selected = game.selectedLevelIndex === i;
    const locked = !isLevelUnlocked(game.meta, lvl.id);

    game._levelCardBounds.push({ x: px, y: py, w: CARD_W, h: CARD_H, index: i, locked });

    const glow = selected ? 20 : (hov ? 12 : 0);
    if (glow > 0) {
      ctx.shadowColor = selected ? '#ffd43b' : 'rgba(255,255,255,0.3)';
      ctx.shadowBlur = glow;
    }

    drawRoundedRect(ctx, px, py, CARD_W, CARD_H, 12);
    ctx.fillStyle = locked ? 'rgba(18,18,24,0.82)' : (selected ? 'rgba(255, 212, 59, 0.12)' : 'rgba(255,255,255,0.06)');
    ctx.fill();
    ctx.strokeStyle = selected ? '#ffd43b' : (hov ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)');
    ctx.lineWidth = selected ? 3 : 2;
    ctx.stroke();
    ctx.shadowBlur = 0;

    let ty = py + 30;
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 20px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(lvl.name, px + CARD_W / 2, ty);

    ty += 22;
    ctx.fillStyle = '#888';
    ctx.font = 'italic 14px sans-serif';
    ctx.fillText(lvl.nameEn, px + CARD_W / 2, ty);

    ty += 36;
    ctx.fillStyle = '#aaa';
    ctx.font = '14px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText(locked ? '未解锁' : '点击查看详情', px + CARD_W / 2, ty);

    if (locked) {
      ctx.fillStyle = 'rgba(0,0,0,0.45)';
      ctx.fillRect(px + 12, py + 92, CARD_W - 24, 120);
      ctx.fillStyle = '#ffd43b';
      ctx.font = 'bold 15px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.fillText('锁定条件', px + CARD_W / 2, py + 120);
      ctx.fillStyle = '#eee';
      ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
      wrapLevelSelectText(ctx, getLevelUnlockText(lvl.id), px + 24, py + 150, CARD_W - 48, 18, 3);
    }
  }

  if (game.selectedLevelIndex >= 0) {
    const confirmX = (GAME_WIDTH - CONFIRM_W) / 2;
    const confirmY = GAME_HEIGHT - 80;
    const confirmHov = game._levelConfirmHovered;

    drawRoundedRect(ctx, confirmX, confirmY, CONFIRM_W, CONFIRM_H, 10);
    ctx.fillStyle = confirmHov ? 'rgba(255, 212, 59, 0.25)' : 'rgba(255, 212, 59, 0.12)';
    ctx.fill();
    ctx.strokeStyle = confirmHov ? '#ffd43b' : 'rgba(255, 212, 59, 0.5)';
    ctx.lineWidth = confirmHov ? 3 : 2;
    ctx.stroke();

    ctx.fillStyle = '#ffd43b';
    ctx.font = 'bold 20px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const selectedLevel = LEVELS[game.selectedLevelIndex] || LEVELS[0];
    const selectedLocked = !isLevelUnlocked(game.meta, selectedLevel.id);
    ctx.fillText(selectedLocked ? '关卡未解锁' : '选择此关卡', confirmX + CONFIRM_W / 2, confirmY + CONFIRM_H / 2);

    game._levelConfirmBounds = { x: confirmX, y: confirmY, w: CONFIRM_W, h: CONFIRM_H };
  } else {
    game._levelConfirmBounds = null;
  }

  const backHov = game._levelBackHovered;
  drawRoundedRect(ctx, BACK_X, BACK_Y, BACK_W, BACK_H, 8);
  ctx.fillStyle = backHov ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)';
  ctx.fill();
  ctx.strokeStyle = backHov ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#ccc';
  ctx.font = '16px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('← 返回', BACK_X + BACK_W / 2, BACK_Y + BACK_H / 2);

  game._levelBackBounds = { x: BACK_X, y: BACK_Y, w: BACK_W, h: BACK_H };
}

export function handleLevelSelectClick(game, mx, my) {
  if (game._levelSpiceMinusBounds && pointInRect(mx, my, game._levelSpiceMinusBounds.x, game._levelSpiceMinusBounds.y, game._levelSpiceMinusBounds.w, game._levelSpiceMinusBounds.h)) {
    game.selectedSpiceLevel = Math.max(0, (game.selectedSpiceLevel || 0) - 1);
    game.audio.playMenuClick();
    return true;
  }
  if (game._levelSpicePlusBounds && pointInRect(mx, my, game._levelSpicePlusBounds.x, game._levelSpicePlusBounds.y, game._levelSpicePlusBounds.w, game._levelSpicePlusBounds.h)) {
    game.selectedSpiceLevel = Math.min(5, (game.selectedSpiceLevel || 0) + 1);
    game.audio.playMenuClick();
    return true;
  }
  if (game._levelHyperBounds && pointInRect(mx, my, game._levelHyperBounds.x, game._levelHyperBounds.y, game._levelHyperBounds.w, game._levelHyperBounds.h)) {
    game.selectedHyper = !game.selectedHyper;
    game.audio.playMenuClick();
    return true;
  }
  if (game._levelChallengeBounds && pointInRect(mx, my, game._levelChallengeBounds.x, game._levelChallengeBounds.y, game._levelChallengeBounds.w, game._levelChallengeBounds.h)) {
    const current = CHALLENGE_ORDER.indexOf(game.selectedChallengeId || null);
    game.selectedChallengeId = CHALLENGE_ORDER[(current + 1 + CHALLENGE_ORDER.length) % CHALLENGE_ORDER.length];
    game.audio.playMenuClick();
    return true;
  }
  if (game._levelDailyBounds && pointInRect(mx, my, game._levelDailyBounds.x, game._levelDailyBounds.y, game._levelDailyBounds.w, game._levelDailyBounds.h)) {
    game.selectedDaily = !game.selectedDaily;
    game.dailyChallenge = game.selectedDaily ? getDailyChallengeForDate() : null;
    game.audio.playMenuClick();
    return true;
  }

  for (const c of game._levelCardBounds) {
    if (pointInRect(mx, my, c.x, c.y, c.w, c.h)) {
      game.selectedLevelIndex = c.index;
      game.audio.playMenuClick();
      return true;
    }
  }
  if (game._levelConfirmBounds && game.selectedLevelIndex >= 0) {
    const b = game._levelConfirmBounds;
    if (pointInRect(mx, my, b.x, b.y, b.w, b.h)) {
      const lvl = LEVELS[game.selectedLevelIndex];
      if (!isLevelUnlocked(game.meta, lvl.id)) return true;
      game.setState('CHARACTER_SELECT');
      game.audio.playMenuClick();
      return true;
    }
  }
  if (game._levelBackBounds) {
    const b = game._levelBackBounds;
    if (pointInRect(mx, my, b.x, b.y, b.w, b.h)) {
      game.setState('MENU');
      game.audio.playMenuClick();
      return true;
    }
  }
  return false;
}

function renderRunProfileControls(ctx, game) {
  const y = GAME_HEIGHT - 146;
  const centerX = GAME_WIDTH / 2;
  const panelW = 760;
  const panelH = 48;
  const x = centerX - panelW / 2;
  drawRoundedRect(ctx, x, y, panelW, panelH, 10);
  ctx.fillStyle = 'rgba(10, 10, 18, 0.62)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.16)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#e8dfc6';
  ctx.font = 'bold 13px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('M4', x + 16, y + panelH / 2);

  const spice = Math.max(0, Math.min(5, game.selectedSpiceLevel || 0));
  game._levelSpiceMinusBounds = { x: x + 58, y: y + 10, w: 34, h: 28 };
  game._levelSpicePlusBounds = { x: x + 176, y: y + 10, w: 34, h: 28 };
  drawProfileButton(ctx, game._levelSpiceMinusBounds, '-', game._levelSpiceMinusHovered, spice <= 0);
  ctx.fillStyle = '#ffd43b';
  ctx.font = 'bold 13px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`香料 ${spice}`, x + 134, y + panelH / 2);
  drawProfileButton(ctx, game._levelSpicePlusBounds, '+', game._levelSpicePlusHovered, spice >= 5);

  game._levelHyperBounds = { x: x + 230, y: y + 10, w: 102, h: 28 };
  drawProfileButton(ctx, game._levelHyperBounds, game.selectedHyper ? 'Hyper ON' : 'Hyper OFF', game._levelHyperHovered, false, game.selectedHyper);

  const challengeName = game.selectedChallengeId ? CHALLENGE_DEFS[game.selectedChallengeId]?.name || game.selectedChallengeId : '普通模式';
  game._levelChallengeBounds = { x: x + 348, y: y + 10, w: 176, h: 28 };
  drawProfileButton(ctx, game._levelChallengeBounds, challengeName, game._levelChallengeHovered, false, !!game.selectedChallengeId);

  const daily = game.selectedDaily ? (game.dailyChallenge || getDailyChallengeForDate()) : null;
  if (daily && !game.dailyChallenge) game.dailyChallenge = daily;
  const dailyLabel = daily ? `每日 ${daily.spiceLevel}${daily.hyper ? 'H' : ''}` : '每日挑战';
  game._levelDailyBounds = { x: x + 540, y: y + 10, w: 132, h: 28 };
  drawProfileButton(ctx, game._levelDailyBounds, dailyLabel, game._levelDailyHovered, false, !!daily);

  if (daily) {
    ctx.fillStyle = '#9d9788';
    ctx.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${daily.levelId} / ${daily.characterId}`, x + 676, y + panelH / 2);
  }
}

function drawProfileButton(ctx, bounds, label, hovered, disabled = false, active = false) {
  drawRoundedRect(ctx, bounds.x, bounds.y, bounds.w, bounds.h, 7);
  ctx.fillStyle = disabled
    ? 'rgba(255,255,255,0.04)'
    : (active ? 'rgba(255, 212, 59, 0.22)' : (hovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.065)'));
  ctx.fill();
  ctx.strokeStyle = disabled ? 'rgba(255,255,255,0.08)' : (active ? '#ffd43b' : 'rgba(255,255,255,0.22)');
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = disabled ? '#666' : (active ? '#ffd43b' : '#d8d0bd');
  ctx.font = 'bold 12px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, bounds.x + bounds.w / 2, bounds.y + bounds.h / 2);
}

function wrapLevelSelectText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  let line = '';
  let lineCount = 0;
  for (const ch of text) {
    const test = line + ch;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x + maxWidth / 2, y + lineCount * lineHeight);
      line = ch;
      lineCount++;
      if (lineCount >= maxLines) return;
    } else {
      line = test;
    }
  }
  if (line && lineCount < maxLines) ctx.fillText(line, x + maxWidth / 2, y + lineCount * lineHeight);
}

export function handleLevelSelectHover(game, mx, my) {
  game._levelHovered = -1;
  game._levelConfirmHovered = false;
  game._levelBackHovered = false;
  game._levelSpiceMinusHovered = false;
  game._levelSpicePlusHovered = false;
  game._levelHyperHovered = false;
  game._levelChallengeHovered = false;
  game._levelDailyHovered = false;
  for (const c of game._levelCardBounds) {
    if (pointInRect(mx, my, c.x, c.y, c.w, c.h)) {
      game._levelHovered = c.index;
      break;
    }
  }
  if (game._levelConfirmBounds && game.selectedLevelIndex >= 0) {
    const b = game._levelConfirmBounds;
    game._levelConfirmHovered = pointInRect(mx, my, b.x, b.y, b.w, b.h);
  }
  if (game._levelBackBounds) {
    const b = game._levelBackBounds;
    game._levelBackHovered = pointInRect(mx, my, b.x, b.y, b.w, b.h);
  }
  if (game._levelSpiceMinusBounds) {
    const b = game._levelSpiceMinusBounds;
    game._levelSpiceMinusHovered = pointInRect(mx, my, b.x, b.y, b.w, b.h);
  }
  if (game._levelSpicePlusBounds) {
    const b = game._levelSpicePlusBounds;
    game._levelSpicePlusHovered = pointInRect(mx, my, b.x, b.y, b.w, b.h);
  }
  if (game._levelHyperBounds) {
    const b = game._levelHyperBounds;
    game._levelHyperHovered = pointInRect(mx, my, b.x, b.y, b.w, b.h);
  }
  if (game._levelChallengeBounds) {
    const b = game._levelChallengeBounds;
    game._levelChallengeHovered = pointInRect(mx, my, b.x, b.y, b.w, b.h);
  }
  if (game._levelDailyBounds) {
    const b = game._levelDailyBounds;
    game._levelDailyHovered = pointInRect(mx, my, b.x, b.y, b.w, b.h);
  }
}
