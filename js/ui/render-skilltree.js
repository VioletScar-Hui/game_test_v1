import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { TALENT_BRANCHES, TALENT_TREE } from '../config/skilltree-data.js';
import { canUnlockTalent, unlockTalent } from '../game/m4-systems.js';
import { saveMeta } from '../game/powerup-store.js';
import { drawButton, drawRoundedRect, pointInRect } from './helpers.js';

const NODE_W = 190;
const NODE_H = 82;
const START_X = 260;
const START_Y = 158;
const COL_GAP = 220;
const ROW_GAP = 122;

export function renderSkillTree(ctx, game) {
  ctx.fillStyle = '#080a10';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = '#fff6dc';
  ctx.font = 'bold 40px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('天赋树', GAME_WIDTH / 2, 62);

  const m4 = game.meta?.m4 || {};
  ctx.fillStyle = '#ffd43b';
  ctx.font = 'bold 18px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.fillText(`星级评价: ${m4.starCurrency || 0}`, GAME_WIDTH / 2, 96);

  game._talentNodeBounds = [];

  TALENT_BRANCHES.forEach((branch, col) => {
    const x = START_X + col * COL_GAP;
    ctx.fillStyle = branch.accent;
    ctx.font = 'bold 18px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(branch.name, x + NODE_W / 2, START_Y - 28);

    const branchNodes = Object.values(TALENT_TREE.nodes).filter(node => node.branch === branch.id);
    branchNodes.forEach((node, row) => {
      drawTalentNode(ctx, game, node, x, START_Y + row * ROW_GAP, branch.accent);
      if (row < branchNodes.length - 1) {
        ctx.strokeStyle = skillTreeHexToRgba(branch.accent, 0.45);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + NODE_W / 2, START_Y + row * ROW_GAP + NODE_H);
        ctx.lineTo(x + NODE_W / 2, START_Y + (row + 1) * ROW_GAP);
        ctx.stroke();
      }
    });
  });

  game._talentBackBounds = { x: GAME_WIDTH / 2 - 80, y: GAME_HEIGHT - 72, w: 160, h: 44 };
  drawButton(ctx, game._talentBackBounds.x, game._talentBackBounds.y, game._talentBackBounds.w, game._talentBackBounds.h, '返回', game._talentBackHovered);
}

export function handleSkillTreeClick(game, mx, my) {
  for (const node of game._talentNodeBounds || []) {
    if (!pointInRect(mx, my, node.x, node.y, node.w, node.h)) continue;
    const result = unlockTalent(game.meta.m4, node.id);
    if (result.ok) {
      game.meta.m4 = result.meta;
      game.meta = saveMeta(game.meta);
      game.audio.playLevelUp();
    } else {
      game.audio.playMenuClick();
    }
    return true;
  }
  if (game._talentBackBounds && pointInRect(mx, my, game._talentBackBounds.x, game._talentBackBounds.y, game._talentBackBounds.w, game._talentBackBounds.h)) {
    game.setState('MENU');
    game.audio.playMenuClick();
    return true;
  }
  return false;
}

export function handleSkillTreeHover(game, mx, my) {
  game._talentNodeHovered = null;
  game._talentBackHovered = false;
  for (const node of game._talentNodeBounds || []) {
    if (pointInRect(mx, my, node.x, node.y, node.w, node.h)) {
      game._talentNodeHovered = node.id;
      break;
    }
  }
  if (game._talentBackBounds) {
    const b = game._talentBackBounds;
    game._talentBackHovered = pointInRect(mx, my, b.x, b.y, b.w, b.h);
  }
}

function drawTalentNode(ctx, game, node, x, y, accent) {
  const m4 = game.meta?.m4 || {};
  const owned = (m4.talents || []).includes(node.id);
  const check = canUnlockTalent(m4, node.id);
  const hovered = game._talentNodeHovered === node.id;
  const locked = !owned && !check.ok;

  game._talentNodeBounds.push({ x, y, w: NODE_W, h: NODE_H, id: node.id });

  drawRoundedRect(ctx, x, y, NODE_W, NODE_H, 8);
  ctx.fillStyle = owned
    ? skillTreeHexToRgba(accent, 0.24)
    : (hovered && !locked ? 'rgba(255,255,255,0.11)' : 'rgba(255,255,255,0.055)');
  ctx.fill();
  ctx.strokeStyle = owned ? accent : (locked ? 'rgba(255,255,255,0.12)' : '#ffd43b');
  ctx.lineWidth = owned ? 2 : 1;
  ctx.stroke();

  ctx.fillStyle = owned ? accent : (locked ? '#8d877a' : '#fff6dc');
  ctx.font = 'bold 15px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(node.name, x + 14, y + 12);

  ctx.fillStyle = locked ? '#746f65' : '#cfc5ad';
  ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
  drawWrapped(ctx, node.desc, x + 14, y + 34, NODE_W - 28, 15, 2);

  ctx.fillStyle = owned ? accent : (check.ok ? '#ffd43b' : '#746f65');
  ctx.font = 'bold 12px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(owned ? '已解锁' : `${node.cost}★`, x + NODE_W - 14, y + NODE_H - 12);
}

function drawWrapped(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  let line = '';
  let count = 0;
  for (const ch of String(text || '')) {
    const test = line + ch;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, y + count * lineHeight);
      line = ch;
      count++;
      if (count >= maxLines) return;
    } else {
      line = test;
    }
  }
  if (line && count < maxLines) ctx.fillText(line, x, y + count * lineHeight);
}

function skillTreeHexToRgba(hex, alpha) {
  const clean = String(hex || '#ffffff').replace('#', '');
  const value = parseInt(clean.length === 3 ? clean.split('').map(ch => ch + ch).join('') : clean, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
