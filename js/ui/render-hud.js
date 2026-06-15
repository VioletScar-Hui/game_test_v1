import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { WEAPON_DEFS, EVOLUTION_DEFS } from '../config/weapons-data.js';
import { PASSIVE_DEFS } from '../config/passives-data.js';
import { drawArcanaIcon, formatTime } from './helpers.js';

export function renderHUD(ctx, game) {
  const p = game.player;
  if (!p) return;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
  ctx.fillRect(10, 10, 240, 90);

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 14px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(`Lv.${p.level}  ${p.charData ? p.charData.name : 'Player'}`, 20, 16);

  ctx.fillStyle = '#888';
  ctx.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(`FPS: ${game.fps}`, 240, 16);

  const hpBarW = 220, hpBarH = 14;
  const hpBarX = 20, hpBarY = 36;
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(hpBarX, hpBarY, hpBarW, hpBarH);
  const hpRatio = p.hp / p.maxHp;
  ctx.fillStyle = hpRatio > 0.5 ? '#69db7c' : (hpRatio > 0.25 ? '#ffd43b' : '#ff6b6b');
  ctx.fillRect(hpBarX, hpBarY, hpBarW * hpRatio, hpBarH);
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 1;
  ctx.strokeRect(hpBarX, hpBarY, hpBarW, hpBarH);
  ctx.fillStyle = '#fff';
  ctx.font = '10px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${p.hp}/${p.maxHp}`, hpBarX + hpBarW / 2, hpBarY + hpBarH / 2 + 1);

  const expBarW = 220, expBarH = 6;
  const expBarX = 20, expBarY = 55;
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(expBarX, expBarY, expBarW, expBarH);
  ctx.fillStyle = '#74c0fc';
  ctx.fillRect(expBarX, expBarY, expBarW * (p.exp / p.expToNextLevel()), expBarH);

  ctx.fillStyle = '#ffd43b';
  ctx.font = 'bold 14px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`💰 ${p.gold}`, 20, 68);

  ctx.fillStyle = '#fff';
  ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(`击杀: ${p.kills}`, 240, 68);

  ctx.fillStyle = '#aaa';
  ctx.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`分数: ${game.score}  时间: ${formatTime(game.gameTime)}`, 20, 84);
  ctx.textAlign = 'right';
  ctx.fillText(`波次: ${game.waveNumber}`, 240, 84);

  renderWeaponList(ctx, game);
  renderPassiveList(ctx, game);
  renderArcanaList(ctx, game);
  renderCombo(ctx, game);
  renderSkillIndicators(ctx, game);

  if (game.ambientLore) {
    const now = performance.now();
    const elapsed = now - game.ambientLore.startTime;
    const duration = game.ambientLore.duration;
    let alpha = 1;
    if (elapsed < 800) alpha = elapsed / 800;
    else if (elapsed > duration - 1000) alpha = (duration - elapsed) / 1000;
    alpha = Math.max(0, Math.min(1, alpha));

    ctx.save();
    ctx.globalAlpha = alpha * 0.7;
    ctx.fillStyle = '#aaa';
    ctx.font = 'italic 13px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(game.ambientLore.text, GAME_WIDTH / 2, GAME_HEIGHT - 30);
    ctx.restore();
  }

  if (game.difficultyNotifTimer > 0) {
    const notifAlpha = Math.min(1, game.difficultyNotifTimer / 500);
    const notifScale = 1 + Math.max(0, (game.difficultyNotifTimer - 2500) / 500) * 0.3;
    ctx.save();
    ctx.globalAlpha = notifAlpha;
    ctx.fillStyle = '#ff922b';
    ctx.font = `bold ${Math.round(24 * notifScale)}px "Segoe UI", "Microsoft YaHei", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 8;
    ctx.fillText(`⚠ 难度提升！波次 ${game.waveNumber} ⚠`, GAME_WIDTH / 2, 100);
    ctx.shadowBlur = 0;
    ctx.restore();
  }
}

function renderWeaponList(ctx, game) {
  const p = game.player;
  if (!p) return;
  const weapons = p.weaponInventory.getAll();
  if (weapons.length === 0) return;

  const startX = 10;
  const startY = 108;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
  ctx.fillRect(startX, startY, 190, 18 + weapons.length * 18);

  ctx.fillStyle = '#ffd43b';
  ctx.font = 'bold 11px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('武器', startX + 8, startY + 3);

  for (let i = 0; i < weapons.length; i++) {
    const w = weapons[i];
    const def = WEAPON_DEFS[w.id] || EVOLUTION_DEFS[w.id];
    if (!def) continue;
    const y = startY + 20 + i * 18;
    ctx.fillStyle = '#fff';
    ctx.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText(`${def.name} Lv.${w.level}${w.evolvedFrom ? '★' : ''}`, startX + 8, y);
    ctx.fillStyle = '#888';
    ctx.font = '10px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'right';
    const baseDef = WEAPON_DEFS[def.baseWeaponId] || def;
    ctx.fillText(`DMG:${baseDef.baseDamage || '-'}`, startX + 180, y);
    ctx.textAlign = 'left';
  }
}

function renderPassiveList(ctx, game) {
  const p = game.player;
  if (!p) return;
  const passives = p.passiveInventory.getAll();
  if (passives.length === 0) return;

  const startX = 10;
  const startY = 108 + 18 + p.weaponInventory.getAll().length * 18 + 6;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
  ctx.fillRect(startX, startY, 190, 18 + passives.length * 18);

  ctx.fillStyle = '#74c0fc';
  ctx.font = 'bold 11px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('被动', startX + 8, startY + 3);

  for (let i = 0; i < passives.length; i++) {
    const item = passives[i];
    const def = PASSIVE_DEFS[item.id];
    if (!def) continue;
    const y = startY + 20 + i * 18;
    ctx.fillStyle = '#fff';
    ctx.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText(`${def.name} Lv.${item.level}`, startX + 8, y);
  }
}

function renderArcanaList(ctx, game) {
  const p = game.player;
  if (!p) return;
  const arcanas = p.arcanaInventory.getAll();
  if (arcanas.length === 0) return;

  const startX = 10;
  const passiveCount = p.passiveInventory ? p.passiveInventory.getAll().length : 0;
  const startY = 108 + 18 + p.weaponInventory.getAll().length * 18 + 6 +
    (passiveCount > 0 ? 18 + passiveCount * 18 + 6 : 0);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
  ctx.fillRect(startX, startY, 160, 18 + arcanas.length * 18);

  ctx.fillStyle = '#e599f7';
  ctx.font = 'bold 11px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('塔罗牌', startX + 8, startY + 3);

  for (let i = 0; i < arcanas.length; i++) {
    const a = arcanas[i];
    const y = startY + 20 + i * 18;
    drawArcanaIcon(ctx, a, startX + 16, y + 6, 15, { alpha: 0.95 });
    ctx.fillStyle = a.color || '#fff';
    ctx.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText(`${a.name} x${a.count}`, startX + 28, y);
  }
}

function renderCombo(ctx, game) {
  if (!game.juice || game.juice.combo < 10) return;
  ctx.save();
  ctx.fillStyle = 'rgba(80, 0, 0, 0.35)';
  ctx.fillRect(GAME_WIDTH - 200, 226, 180, 42);
  ctx.fillStyle = '#ff922b';
  ctx.font = 'bold 22px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${game.juice.combo} 连击`, GAME_WIDTH - 110, 247);
  ctx.restore();
}

function renderSkillIndicators(ctx, game) {
  const p = game.player;
  if (!p) return;

  const burstPct = p.burstSkill.getCooldownPercent();
  const burstCX = GAME_WIDTH - 55;
  const burstCY = GAME_HEIGHT - 55;
  const burstR = 28;

  ctx.save();
  ctx.beginPath();
  ctx.arc(burstCX, burstCY, burstR, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fill();
  ctx.strokeStyle = burstPct >= 1 ? '#ff6b6b' : 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 2;
  ctx.stroke();

  if (burstPct < 1) {
    ctx.beginPath();
    ctx.moveTo(burstCX, burstCY);
    ctx.arc(burstCX, burstCY, burstR - 3, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * burstPct);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255, 107, 107, 0.3)';
    ctx.fill();
  }

  ctx.fillStyle = burstPct >= 1 ? '#ff6b6b' : '#666';
  ctx.font = 'bold 11px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('爆裂', burstCX, burstCY - 6);
  if (burstPct >= 1) {
    ctx.fillStyle = '#ffd43b';
    ctx.font = '9px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText('Space', burstCX, burstCY + 10);
  } else {
    ctx.fillStyle = '#888';
    ctx.font = '9px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText(`${Math.ceil(p.burstSkill.cooldownTimer / 1000)}s`, burstCX, burstCY + 10);
  }
  ctx.restore();

  const dashPct = p.dashCooldown > 0 ? (1 - p.dashCooldown / p.dashCooldownMax) : 1;
  const dashCX = GAME_WIDTH - 55;
  const dashCY = GAME_HEIGHT - 120;
  const dashR = 28;

  ctx.save();
  ctx.beginPath();
  ctx.arc(dashCX, dashCY, dashR, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fill();
  ctx.strokeStyle = dashPct >= 1 ? '#74c0fc' : 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 2;
  ctx.stroke();

  if (dashPct < 1) {
    ctx.beginPath();
    ctx.moveTo(dashCX, dashCY);
    ctx.arc(dashCX, dashCY, dashR - 3, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * dashPct);
    ctx.closePath();
    ctx.fillStyle = 'rgba(116, 192, 252, 0.3)';
    ctx.fill();
  }

  ctx.fillStyle = dashPct >= 1 ? '#74c0fc' : '#666';
  ctx.font = 'bold 11px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('闪避', dashCX, dashCY - 6);
  if (dashPct >= 1) {
    ctx.fillStyle = '#ffd43b';
    ctx.font = '9px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText('Shift', dashCX, dashCY + 10);
  } else {
    ctx.fillStyle = '#888';
    ctx.font = '9px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText(`${(p.dashCooldown / 1000).toFixed(1)}s`, dashCX, dashCY + 10);
  }
  ctx.restore();
}
