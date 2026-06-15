import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { formatTime, drawButton } from './helpers.js';

export function renderGameOver(ctx, game) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = '#ff6b6b';
  ctx.font = 'bold 56px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(255, 0, 0, 0.5)';
  ctx.shadowBlur = 20;
  ctx.fillText('游戏结束', GAME_WIDTH / 2, GAME_HEIGHT / 2 - 160);
  ctx.shadowBlur = 0;

  const p = game.player;
  ctx.fillStyle = '#fff';
  ctx.font = '22px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.fillText(`角色: ${p.charData ? p.charData.name : '未知'}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 - 90);
  ctx.fillText(`等级: ${p.level}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 - 60);
  ctx.fillText(`击杀: ${p.kills}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 - 30);
  ctx.fillText(`分数: ${game.score}`, GAME_WIDTH / 2, GAME_HEIGHT / 2);
  ctx.fillText(`存活时间: ${formatTime(game.gameTime)}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 30);

  const isNewTime = game.gameTime >= game.bestTime && game.gameTime > 0;
  const isNewScore = game.score >= game.bestScore && game.score > 0;

  ctx.fillStyle = '#888';
  ctx.font = '16px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.fillText(`最佳分数: ${game.bestScore}${isNewScore ? ' ★NEW RECORD' : ''}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 70);
  ctx.fillText(`最佳时间: ${formatTime(game.bestTime)}${isNewTime ? ' ★NEW RECORD' : ''}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 95);

  if (isNewScore || isNewTime) {
    ctx.fillStyle = '#ffd43b';
    ctx.font = 'bold 18px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.shadowColor = 'rgba(255, 212, 59, 0.5)';
    ctx.shadowBlur = 10;
    ctx.fillText('🏆 新纪录！', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 130);
    ctx.shadowBlur = 0;
  }

  const retryHov = game.gameOverBtnHovered === 'retry';
  drawButton(ctx, GAME_WIDTH / 2 - 120, GAME_HEIGHT / 2 + 155, 110, 40, '重新开始', retryHov, {
    fill: 'rgba(255, 107, 107, 0.15)', hoverFill: 'rgba(255, 107, 107, 0.3)',
    stroke: '#ff6b6b', hoverStroke: '#ff6b6b',
    text: '#ff8787', hoverText: '#ff6b6b'
  });

  const menuHov = game.gameOverBtnHovered === 'menu';
  drawButton(ctx, GAME_WIDTH / 2 + 10, GAME_HEIGHT / 2 + 155, 110, 40, '返回菜单', menuHov, {
    fill: 'rgba(255, 255, 255, 0.08)', hoverFill: 'rgba(255, 255, 255, 0.15)',
    stroke: 'rgba(255, 255, 255, 0.3)', hoverStroke: '#ffd43b',
    text: '#ccc', hoverText: '#ffd43b'
  });
}
