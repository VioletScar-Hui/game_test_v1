import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';

export function renderChest(ctx, game) {
  const reward = game.chestReward;
  const elapsed = performance.now() - (game.chestOpenedAt || performance.now());
  const pulse = 1 + Math.sin(elapsed * 0.01) * 0.05;

  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.78)';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.translate(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 40);
  ctx.scale(pulse, pulse);
  ctx.fillStyle = '#7b3f00';
  ctx.fillRect(-90, -50, 180, 100);
  ctx.fillStyle = '#b56b16';
  ctx.fillRect(-100, -68, 200, 36);
  ctx.strokeStyle = '#ffd43b';
  ctx.lineWidth = 6;
  ctx.strokeRect(-100, -68, 200, 118);
  ctx.fillStyle = '#ffd43b';
  ctx.fillRect(-12, -24, 24, 38);
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  ctx.fillStyle = '#ffd43b';
  ctx.font = 'bold 34px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(reward?.name || '神秘便当盒', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 100);

  ctx.fillStyle = '#fff';
  ctx.font = '16px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.fillText(reward?.desc || '正在打开...', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 136);

  ctx.fillStyle = '#aaa';
  ctx.font = '13px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.fillText('点击或按 Esc 跳过', GAME_WIDTH / 2, GAME_HEIGHT - 70);
  ctx.restore();
}
