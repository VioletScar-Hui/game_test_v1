import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { drawButton } from './helpers.js';

export function renderPlayingButtons(ctx, game) {
  const bossBtn = { x: GAME_WIDTH - 160, y: 20, w: 140, h: 44 };
  const hovered = game.bossButtonHovered;
  drawButton(ctx, bossBtn.x, bossBtn.y, bossBtn.w, bossBtn.h,
    game.bossSpawned ? 'Boss 已召唤' : '召唤 Boss', hovered, {
      fill: 'rgba(255, 0, 0, 0.15)', hoverFill: 'rgba(255, 0, 0, 0.25)',
      stroke: 'rgba(255, 107, 107, 0.6)', hoverStroke: '#ff6b6b',
      text: '#ff8787', hoverText: '#ff6b6b'
    });

  const shopBtn = { x: GAME_WIDTH - 160, y: 72, w: 140, h: 44 };
  const shopHovered = game.shopButtonHovered;
  drawButton(ctx, shopBtn.x, shopBtn.y, shopBtn.w, shopBtn.h, '商店', shopHovered, {
    fill: 'rgba(255, 212, 59, 0.15)', hoverFill: 'rgba(255, 212, 59, 0.25)',
    stroke: 'rgba(255, 212, 59, 0.6)', hoverStroke: '#ffd43b',
    text: '#ffe066', hoverText: '#ffd43b'
  });

  const diffBtn = { x: GAME_WIDTH - 160, y: 124, w: 140, h: 44 };
  const diffHovered = game.diffButtonHovered;
  drawButton(ctx, diffBtn.x, diffBtn.y, diffBtn.w, diffBtn.h,
    `难度up x${game.difficultyMultiplier.toFixed(1)}`, diffHovered, {
      fill: 'rgba(255, 146, 43, 0.15)', hoverFill: 'rgba(255, 146, 43, 0.25)',
      stroke: 'rgba(255, 146, 43, 0.6)', hoverStroke: '#ff922b',
      text: '#ffa94d', hoverText: '#ff922b',
      font: 'bold 14px "Segoe UI", "Microsoft YaHei", sans-serif'
    });

  const goldBtn = { x: GAME_WIDTH - 160, y: 176, w: 140, h: 44 };
  const goldHovered = game.goldButtonHovered;
  drawButton(ctx, goldBtn.x, goldBtn.y, goldBtn.w, goldBtn.h, '金币 +100', goldHovered, {
    fill: 'rgba(255, 212, 59, 0.15)', hoverFill: 'rgba(255, 212, 59, 0.25)',
    stroke: 'rgba(255, 212, 59, 0.6)', hoverStroke: '#ffd43b',
    text: '#ffe066', hoverText: '#ffd43b',
    font: 'bold 14px "Segoe UI", "Microsoft YaHei", sans-serif'
  });
}
