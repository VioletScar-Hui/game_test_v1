import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { LEVELS } from '../config/levels.js';
import { LEVEL_BG_IMAGES, LEVEL_PROP_SPRITES, LEVEL_TILE_IMAGES, WEAPON_ACTION_SHEETS } from '../config/assets.js';
import { mulberry32 } from '../systems/rng.js';

export function renderWorld(ctx, game) {
  ctx.save();
  ctx.translate(game.cameraShake.x, game.cameraShake.y);
  game.camera.apply(ctx);

  const level = LEVELS[game.selectedLevelIndex] || LEVELS[0];
  const levelTile = LEVEL_TILE_IMAGES[level.id];
  const levelBg = LEVEL_BG_IMAGES[level.id];
  if (!drawTiledBackground(ctx, levelTile, game) && !drawTiledBackground(ctx, levelBg, game)) {
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(game.camera.x, game.camera.y, GAME_WIDTH, GAME_HEIGHT);
  }
  renderLevelProps(ctx, game, level.id);

  game.entityManager.render(ctx);
  if (game.player && game.player.active) {
    game.player.render(ctx);
  }
  renderParticles(ctx, game);
  renderDamageNumbers(ctx, game);

  ctx.restore();
}

function drawTiledBackground(ctx, img, game) {
  const ready = img && img.complete && img.naturalWidth > 0;
  if (!ready) return false;
  const tileW = 1024;
  const tileH = 1024;
  const crop = 8;
  const srcW = Math.max(1, img.naturalWidth - crop * 2);
  const srcH = Math.max(1, img.naturalHeight - crop * 2);
  const startX = Math.floor(game.camera.x / tileW) * tileW - tileW;
  const startY = Math.floor(game.camera.y / tileH) * tileH - tileH;
  const previousSmoothing = ctx.imageSmoothingEnabled;
  ctx.imageSmoothingEnabled = false;
  const offsetX = game.camera.x - Math.floor(game.camera.x);
  const offsetY = game.camera.y - Math.floor(game.camera.y);
  ctx.save();
  ctx.translate(offsetX, offsetY);
  for (let y = startY; y < game.camera.y + GAME_HEIGHT + tileH; y += tileH) {
    for (let x = startX; x < game.camera.x + GAME_WIDTH + tileW; x += tileW) {
      const drawW = tileW + 2;
      const drawH = tileH + 2;
      const flipX = Math.abs(Math.floor(x / tileW)) % 2 === 1;
      const flipY = Math.abs(Math.floor(y / tileH)) % 2 === 1;
      if (flipX || flipY) {
        ctx.save();
        ctx.translate(x + drawW / 2, y + drawH / 2);
        ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
        ctx.drawImage(img, crop, crop, srcW, srcH, -drawW / 2, -drawH / 2, drawW, drawH);
        ctx.restore();
      } else {
        ctx.drawImage(img, crop, crop, srcW, srcH, x, y, drawW, drawH);
      }
    }
  }
  ctx.restore();
  ctx.imageSmoothingEnabled = previousSmoothing;
  const b = game.mapBounds;
  ctx.save();
  ctx.strokeStyle = 'rgba(0,0,0,0.28)';
  ctx.lineWidth = 12;
  ctx.strokeRect(b.minX, b.minY, b.maxX - b.minX, b.maxY - b.minY);
  ctx.restore();
  return true;
}

function renderLevelProps(ctx, game, levelId) {
  const sprites = LEVEL_PROP_SPRITES[levelId] || [];
  if (sprites.length === 0 || !game.mapBounds) return;
  const instances = getLevelPropInstances(game, levelId, sprites.length);
  const pad = 180;
  const minX = game.camera.x - pad;
  const minY = game.camera.y - pad;
  const maxX = game.camera.x + GAME_WIDTH + pad;
  const maxY = game.camera.y + GAME_HEIGHT + pad;
  for (const prop of instances) {
    if (prop.x < minX || prop.x > maxX || prop.y < minY || prop.y > maxY) continue;
    const sprite = sprites[prop.spriteIndex % sprites.length];
    const ready = sprite instanceof HTMLCanvasElement || (sprite.complete && sprite.naturalWidth > 0);
    if (!ready) continue;
    ctx.save();
    ctx.translate(prop.x, prop.y);
    ctx.rotate(prop.rotation);
    ctx.globalAlpha = prop.alpha;
    ctx.drawImage(sprite, -prop.size / 2, -prop.size / 2, prop.size, prop.size);
    ctx.restore();
  }
}

function getLevelPropInstances(game, levelId, spriteCount) {
  const b = game.mapBounds;
  const seed = game.runSeed || 1;
  const key = `${levelId}:${seed}:${b.minX},${b.minY},${b.maxX},${b.maxY}:${spriteCount}`;
  if (game._levelPropCache && game._levelPropCache.key === key) return game._levelPropCache.instances;
  const rng = mulberry32(hashWorldString(key));
  const area = Math.max(1, (b.maxX - b.minX) * (b.maxY - b.minY));
  const count = Math.max(40, Math.min(140, Math.floor(area / 65000)));
  const instances = [];
  for (let i = 0; i < count; i++) {
    instances.push({
      x: b.minX + rng() * (b.maxX - b.minX),
      y: b.minY + rng() * (b.maxY - b.minY),
      size: 42 + rng() * 70,
      rotation: rng() * Math.PI * 2,
      alpha: 0.42 + rng() * 0.28,
      spriteIndex: Math.floor(rng() * spriteCount)
    });
  }
  game._levelPropCache = { key, instances };
  return instances;
}

function hashWorldString(value) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}


function renderParticles(ctx, game) {
  if (!game.particles) return;
  for (const p of game.particles) {
    if (!p.active) continue;
    ctx.save();
    ctx.globalAlpha = p.alpha || 1;
    if (!drawParticleActionFrame(ctx, p)) {
      ctx.fillStyle = p.color || '#fff';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size || 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

function drawParticleActionFrame(ctx, particle) {
  const action = particle.weaponAction;
  if (!action) return false;
  const frames = WEAPON_ACTION_SHEETS[action.weaponId]?.[action.action];
  if (!Array.isArray(frames) || frames.length === 0) return false;
  const progress = 1 - Math.max(0, Math.min(1, (particle.life || 0) / (particle.maxLife || 1)));
  const index = Math.min(frames.length - 1, Math.floor(progress * frames.length));
  const frame = frames[index];
  const canvasReady = typeof HTMLCanvasElement !== 'undefined' && frame instanceof HTMLCanvasElement;
  const imageReady = frame && frame.complete && frame.naturalWidth > 0;
  if (!canvasReady && !imageReady) return false;
  const size = particle.size || 320;
  ctx.translate(particle.x, particle.y);
  ctx.rotate(particle.rotation || 0);
  ctx.drawImage(frame, -size / 2, -size / 2, size, size);
  return true;
}

function renderDamageNumbers(ctx, game) {
  if (!game.damageNumbers) return;
  for (const dn of game.damageNumbers) {
    if (!dn.active) continue;
    ctx.save();
    ctx.globalAlpha = dn.alpha || 1;
    ctx.fillStyle = dn.color || '#fff';
    ctx.font = `bold ${dn.fontSize || 14}px "Segoe UI", "Microsoft YaHei", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(dn.text, dn.x, dn.y);
    ctx.restore();
  }
}

export function renderDeathQuotes(ctx, game) {
  if (!game.deathQuotes) return;
  const now = performance.now();
  for (const dq of game.deathQuotes) {
    if (!dq.active) continue;
    const elapsed = now - dq.startTime;
    const duration = 3000;
    if (elapsed > duration) { dq.active = false; continue; }
    let alpha = 1;
    if (elapsed < 300) alpha = elapsed / 300;
    else if (elapsed > duration - 500) alpha = (duration - elapsed) / 500;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#fff';
    ctx.font = 'italic 12px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`"${dq.text}"`, dq.x, dq.y - (elapsed * 0.02));
    ctx.restore();
  }
}

export function renderDamageVignette(ctx, game) {
  if (!game.player || game.player.hp >= game.player.maxHp) return;
  const hpRatio = game.player.hp / game.player.maxHp;
  if (hpRatio > 0.5) return;
  const intensity = (0.5 - hpRatio) * 2;
  const pulse = hpRatio < 0.25 ? 0.65 + Math.sin(performance.now() * 0.006) * 0.25 : 1;
  const gradient = ctx.createRadialGradient(
    GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH * 0.3,
    GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH * 0.7
  );
  gradient.addColorStop(0, 'rgba(255,0,0,0)');
  gradient.addColorStop(1, `rgba(255,0,0,${0.3 * intensity * pulse})`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
}

export function renderBossSpawnQuote(ctx, game) {
  if (!game.bossSpawnQuote) return;
  const now = performance.now();
  const elapsed = now - game.bossSpawnQuote.startTime;
  const duration = game.bossSpawnQuote.duration;
  if (elapsed > duration) {
    game.bossSpawnQuote = null;
    return;
  }
  let alpha = 1;
  if (elapsed < 500) alpha = elapsed / 500;
  else if (elapsed > duration - 800) alpha = (duration - elapsed) / 800;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(0, GAME_HEIGHT / 2 - 60, GAME_WIDTH, 120);

  ctx.fillStyle = '#ff6b6b';
  ctx.font = 'bold 20px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(255, 0, 0, 0.5)';
  ctx.shadowBlur = 10;
  ctx.fillText('⚠ BOSS 出现 ⚠', GAME_WIDTH / 2, GAME_HEIGHT / 2 - 30);
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#fff';
  ctx.font = '14px "Segoe UI", "Microsoft YaHei", sans-serif';
  const text = game.bossSpawnQuote.text;
  const maxW = GAME_WIDTH - 100;
  const lines = wrapTextForBoss(text, maxW);
  lines.forEach((line, i) => {
    ctx.fillText(line, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 5 + i * 20);
  });
  ctx.restore();
}

function wrapTextForBoss(text, maxWidth) {
  const chars = text.split('');
  const lines = [];
  let current = '';
  for (const ch of chars) {
    current += ch;
    if (current.length * 14 > maxWidth) {
      lines.push(current);
      current = '';
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 4);
}
