import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { formatTime, drawButton } from './helpers.js';

let fireworks = [];
let lastFireworkTime = 0;

function spawnFirework() {
  const x = 100 + Math.random() * (GAME_WIDTH - 200);
  const y = 50 + Math.random() * (GAME_HEIGHT / 2);
  const colors = ['#ff6b6b', '#ffd43b', '#74c0fc', '#69db7c', '#da77f2', '#ff922b'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  for (let i = 0; i < 20; i++) {
    const angle = (Math.PI * 2 * i) / 20;
    const speed = 0.05 + Math.random() * 0.15;
    fireworks.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color, size: 2 + Math.random() * 3,
      alpha: 1, life: 800 + Math.random() * 400,
      maxLife: 800 + Math.random() * 400
    });
  }
}

function updateFireworks(dt) {
  for (let i = fireworks.length - 1; i >= 0; i--) {
    const f = fireworks[i];
    f.x += f.vx * dt;
    f.y += f.vy * dt;
    f.vy += 0.00005 * dt;
    f.life -= dt;
    f.alpha = Math.max(0, f.life / f.maxLife);
    if (f.life <= 0) fireworks.splice(i, 1);
  }
}

function renderFireworksParticles(ctx) {
  for (const f of fireworks) {
    ctx.save();
    ctx.globalAlpha = f.alpha;
    ctx.fillStyle = f.color;
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.size * f.alpha, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export function renderVictory(ctx, game) {
  const now = performance.now();
  if (now - lastFireworkTime > 600) {
    spawnFirework();
    lastFireworkTime = now;
  }
  updateFireworks(16);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  renderFireworksParticles(ctx);

  ctx.fillStyle = '#ffd43b';
  ctx.font = 'bold 56px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(255, 212, 59, 0.5)';
  ctx.shadowBlur = 20;
  ctx.fillText('胜利！', GAME_WIDTH / 2, GAME_HEIGHT / 2 - 160);
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#fff';
  ctx.font = '18px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.fillText('诅咒已被终结！', GAME_WIDTH / 2, GAME_HEIGHT / 2 - 110);

  const p = game.player;
  ctx.fillStyle = '#fff';
  ctx.font = '22px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.fillText(`角色: ${p.charData ? p.charData.name : '未知'}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 - 70);
  ctx.fillText(`等级: ${p.level}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 - 40);
  ctx.fillText(`击杀: ${p.kills}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 - 10);
  ctx.fillText(`分数: ${game.score}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 20);
  ctx.fillText(`存活时间: ${formatTime(game.gameTime)}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 50);

  const isNewTime = game.gameTime >= game.bestTime && game.gameTime > 0;
  const isNewScore = game.score >= game.bestScore && game.score > 0;

  ctx.fillStyle = '#888';
  ctx.font = '16px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.fillText(`最佳分数: ${game.bestScore}${isNewScore ? ' ★NEW RECORD' : ''}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 85);
  ctx.fillText(`最佳时间: ${formatTime(game.bestTime)}${isNewTime ? ' ★NEW RECORD' : ''}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 110);

  if (isNewScore || isNewTime) {
    ctx.fillStyle = '#ffd43b';
    ctx.font = 'bold 18px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.shadowColor = 'rgba(255, 212, 59, 0.5)';
    ctx.shadowBlur = 10;
    ctx.fillText('🏆 新纪录！', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 140);
    ctx.shadowBlur = 0;
  }

  ctx.fillStyle = '#888';
  ctx.font = '16px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.fillText('按 Esc 返回主菜单', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 175);
}
