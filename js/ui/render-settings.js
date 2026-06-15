import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { ENEMY_SPRITES, PASSIVE_SPRITES, WEAPON_SPRITES } from '../config/assets.js';
import { EVOLUTION_DEFS, WEAPON_DEFS } from '../config/weapons-data.js';
import { PASSIVE_DEFS } from '../config/passives-data.js';
import { BESTIARY_CATEGORIES, getBestiaryEntries, getBestiaryEntryByKey, paginateBestiaryEntries } from './bestiary-model.js';
import { getWeaponPreviewSpec } from './weapon-preview-model.js';
import { drawArcanaIcon, drawButton, drawRoundedRect } from './helpers.js';

const CODEX_TOP = 140;
const CODEX_BOTTOM = GAME_HEIGHT - 92;
const CODEX_MARGIN_X = 44;
const CODEX_GAP = 16;
const CODEX_LEFT_W = 158;
const CODEX_DETAIL_W = 318;

export function renderSettings(ctx, game) {
  ctx.fillStyle = '#0a0a14';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 40px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 10;
  ctx.fillText('游戏设置', GAME_WIDTH / 2, 60);
  ctx.shadowBlur = 0;

  const tabY = 90, tabW = 120, tabH = 36, tabGap = 8;
  const tabCenterX = GAME_WIDTH / 2;
  const tabs = [
    { id: 'controls', label: '控制' },
    { id: 'bestiary', label: '图鉴' }
  ];
  game._settingsTabBounds = [];
  for (let i = 0; i < tabs.length; i++) {
    const tx = tabCenterX - (tabs.length * tabW + (tabs.length - 1) * tabGap) / 2 + i * (tabW + tabGap);
    const active = game.settingsTab === tabs[i].id;
    const hovered = game._settingsTabHovered === i;
    drawRoundedRect(ctx, tx, tabY, tabW, tabH, 6);
    ctx.fillStyle = active ? 'rgba(255, 212, 59, 0.2)' : (hovered ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)');
    ctx.fill();
    ctx.strokeStyle = active ? '#ffd43b' : 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = active ? 2 : 1;
    ctx.stroke();
    ctx.fillStyle = active ? '#ffd43b' : '#ccc';
    ctx.font = 'bold 16px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(tabs[i].label, tx + tabW / 2, tabY + tabH / 2);
    game._settingsTabBounds.push({ x: tx, y: tabY, w: tabW, h: tabH, id: tabs[i].id });
  }

  if (game.settingsTab === 'controls') {
    renderControlsTab(ctx, game);
  } else if (game.settingsTab === 'bestiary') {
    renderBestiaryTab(ctx, game);
  }

  const backHov = game._settingsBackHovered;
  drawButton(ctx, GAME_WIDTH / 2 - 80, GAME_HEIGHT - 70, 160, 44, '返回', backHov);
}

function renderControlsTab(ctx, game) {
  const startY = 150;
  const controls = [
    { key: 'WASD / 方向键', desc: '移动' },
    { key: 'Space', desc: '爆裂技能' },
    { key: 'Shift', desc: '闪避' },
    { key: 'Esc', desc: '暂停' },
    { key: '鼠标点击', desc: '菜单交互' }
  ];

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 20px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('操作说明', GAME_WIDTH / 2, startY);

  controls.forEach((ctrl, i) => {
    const y = startY + 40 + i * 40;
    ctx.fillStyle = '#ffd43b';
    ctx.font = 'bold 16px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(ctrl.key, GAME_WIDTH / 2 - 20, y);
    ctx.fillStyle = '#ccc';
    ctx.font = '16px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(ctrl.desc, GAME_WIDTH / 2 + 20, y);
  });

  const sliderStartY = startY + 40 + controls.length * 40 + 30;
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 20px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('音量设置', GAME_WIDTH / 2, sliderStartY);

  const sliderW = 300, sliderH = 8;
  const sliderX = (GAME_WIDTH - sliderW) / 2;

  const musicY = sliderStartY + 40;
  ctx.fillStyle = '#ccc';
  ctx.font = '14px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`音乐音量: ${Math.round(game.audio.musicVolume * 100)}%`, GAME_WIDTH / 2, musicY - 10);

  drawRoundedRect(ctx, sliderX, musicY, sliderW, sliderH, 4);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.fill();
  const musicPct = game.audio.musicVolume;
  ctx.fillStyle = '#ffd43b';
  ctx.fillRect(sliderX, musicY, sliderW * musicPct, sliderH);
  ctx.beginPath();
  ctx.arc(sliderX + sliderW * musicPct, musicY + sliderH / 2, 8, 0, Math.PI * 2);
  ctx.fillStyle = '#ffd43b';
  ctx.fill();
  game._volumeSlider = { musicX: sliderX, musicY: musicY, musicW: sliderW, musicH: sliderH };

  const sfxY = musicY + 50;
  ctx.fillStyle = '#ccc';
  ctx.font = '14px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`音效音量: ${Math.round(game.audio.sfxVolume * 100)}%`, GAME_WIDTH / 2, sfxY - 10);

  drawRoundedRect(ctx, sliderX, sfxY, sliderW, sliderH, 4);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.fill();
  const sfxPct = game.audio.sfxVolume;
  ctx.fillStyle = '#74c0fc';
  ctx.fillRect(sliderX, sfxY, sliderW * sfxPct, sliderH);
  ctx.beginPath();
  ctx.arc(sliderX + sliderW * sfxPct, sfxY + sliderH / 2, 8, 0, Math.PI * 2);
  ctx.fillStyle = '#74c0fc';
  ctx.fill();
  if (game._volumeSlider) {
    game._volumeSlider.sfxX = sliderX;
    game._volumeSlider.sfxY = sfxY;
    game._volumeSlider.sfxW = sliderW;
    game._volumeSlider.sfxH = sliderH;
  }
}

function renderBestiaryTab(ctx, game) {
  const categoryId = BESTIARY_CATEGORIES.some(category => category.id === game._bestiaryCategory)
    ? game._bestiaryCategory
    : 'weapons';
  game._bestiaryCategory = categoryId;

  const leftX = CODEX_MARGIN_X;
  const leftY = CODEX_TOP;
  const leftH = CODEX_BOTTOM - CODEX_TOP;
  const gridX = leftX + CODEX_LEFT_W + CODEX_GAP;
  const detailX = GAME_WIDTH - CODEX_MARGIN_X - CODEX_DETAIL_W;
  const gridW = detailX - gridX - CODEX_GAP;
  const gridH = leftH;
  const cardGap = 12;
  const cardW = 126;
  const cardH = 132;
  const pageControlsH = 48;
  const gridAreaH = gridH - pageControlsH;
  const cols = Math.max(1, Math.floor((gridW + cardGap) / (cardW + cardGap)));
  const rows = Math.max(1, Math.floor((gridAreaH + cardGap) / (cardH + cardGap)));
  const pageSize = cols * rows;
  const entries = getBestiaryEntries(categoryId, game.bestiary, game.meta);
  const pageInfo = paginateBestiaryEntries(entries, game._bestiaryPage || 0, pageSize);

  game._bestiaryPage = pageInfo.page;
  game._bestiaryPageInfo = pageInfo;
  game._bestiaryCategoryBounds = [];
  game._bestiaryCardBounds = [];
  game._bestiaryPageBounds = null;

  drawPanel(ctx, leftX, leftY, CODEX_LEFT_W, leftH);
  drawPanel(ctx, gridX, CODEX_TOP, gridW, gridH);
  drawPanel(ctx, detailX, CODEX_TOP, CODEX_DETAIL_W, gridH);

  renderBestiaryCategories(ctx, game, leftX, leftY, CODEX_LEFT_W, entries);

  const visibleKeys = new Set(pageInfo.items.map(entry => entry.key));
  let selected = getBestiaryEntryByKey(categoryId, game._bestiarySelectedKey, game.bestiary, game.meta);
  if (!selected || !visibleKeys.has(selected.key)) {
    selected = pageInfo.items[0] || entries[0] || null;
    game._bestiarySelectedKey = selected ? selected.key : null;
  }

  renderBestiaryGrid(ctx, game, gridX, CODEX_TOP, gridW, gridH, pageInfo, cols, cardW, cardH, cardGap);
  renderBestiaryDetails(ctx, game, detailX, CODEX_TOP, CODEX_DETAIL_W, gridH, selected);
}

function renderBestiaryCategories(ctx, game, x, y, w) {
  ctx.fillStyle = '#f8f1d8';
  ctx.font = 'bold 18px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('分类', x + 18, y + 32);

  let cy = y + 54;
  const compact = BESTIARY_CATEGORIES.length > 6;
  const rowH = compact ? 46 : 58;
  const rowGap = compact ? 7 : 10;
  for (let i = 0; i < BESTIARY_CATEGORIES.length; i++) {
    const category = BESTIARY_CATEGORIES[i];
    const categoryEntries = getBestiaryEntries(category.id, game.bestiary, game.meta);
    const active = game._bestiaryCategory === category.id;
    const hovered = game._bestiaryCategoryHovered === i;
    const bx = x + 12;
    const by = cy;
    const bw = w - 24;
    const bh = rowH;

    game._bestiaryCategoryBounds.push({ x: bx, y: by, w: bw, h: bh, id: category.id });
    drawRoundedRect(ctx, bx, by, bw, bh, 8);
    ctx.fillStyle = active
      ? hexToRgba(category.accent, 0.20)
      : (hovered ? 'rgba(255, 255, 255, 0.10)' : 'rgba(255, 255, 255, 0.045)');
    ctx.fill();
    ctx.strokeStyle = active ? category.accent : 'rgba(255,255,255,0.16)';
    ctx.lineWidth = active ? 2 : 1;
    ctx.stroke();

    ctx.fillStyle = active ? category.accent : '#e8dfc6';
    ctx.font = 'bold 16px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(category.label, bx + 14, by + (compact ? 17 : 22));
    ctx.fillStyle = '#9d9788';
    ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
    const unlocked = categoryEntries.filter(entry => entry.unlocked).length;
    ctx.fillText(`${unlocked}/${categoryEntries.length}`, bx + 14, by + (compact ? 34 : 42));

    cy += bh + rowGap;
  }

  if (!compact) {
    ctx.fillStyle = '#8f8878';
    ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    drawWrappedText(ctx, '鼠标滚轮、左右方向键或底部按钮可翻页。', x + 16, y + 360, w - 32, 18, 4);
  }
}

function renderBestiaryGrid(ctx, game, x, y, w, h, pageInfo, cols, cardW, cardH, gap) {
  const category = BESTIARY_CATEGORIES.find(item => item.id === game._bestiaryCategory) || BESTIARY_CATEGORIES[1];
  ctx.fillStyle = '#f8f1d8';
  ctx.font = 'bold 20px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(category.label, x + 18, y + 32);

  ctx.fillStyle = '#8f8878';
  ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(`第 ${pageInfo.page + 1}/${pageInfo.totalPages} 页`, x + w - 18, y + 30);

  const totalCardW = cols * cardW + (cols - 1) * gap;
  const startX = x + Math.max(16, (w - totalCardW) / 2);
  const startY = y + 52;
  for (let i = 0; i < pageInfo.items.length; i++) {
    const entry = pageInfo.items[i];
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cx = startX + col * (cardW + gap);
    const cy = startY + row * (cardH + gap);
    drawBestiaryCard(ctx, game, entry, cx, cy, cardW, cardH, category.accent);
  }

  const controlsY = y + h - 38;
  const prev = { x: x + 18, y: controlsY, w: 88, h: 28, disabled: pageInfo.page <= 0 };
  const next = { x: x + w - 106, y: controlsY, w: 88, h: 28, disabled: pageInfo.page >= pageInfo.totalPages - 1 };
  game._bestiaryPageBounds = { prev, next };
  drawPagerButton(ctx, prev, '上一页', game._bestiaryPageHovered === 'prev');
  drawPagerButton(ctx, next, '下一页', game._bestiaryPageHovered === 'next');

  ctx.fillStyle = '#b9b09d';
  ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const firstIndex = pageInfo.items.length === 0 ? 0 : pageInfo.page * pageInfo.pageSize + 1;
  const lastIndex = pageInfo.page * pageInfo.pageSize + pageInfo.items.length;
  ctx.fillText(`${firstIndex}-${lastIndex} / ${pageInfo.totalItems}`, x + w / 2, controlsY + 14);
}

function drawBestiaryCard(ctx, game, entry, x, y, w, h, accent) {
  const selected = game._bestiarySelectedKey === entry.key;
  const hovered = game._bestiaryHoveredKey === entry.key;
  game._bestiaryCardBounds.push({ x, y, w, h, key: entry.key });

  drawRoundedRect(ctx, x, y, w, h, 8);
  ctx.fillStyle = selected
    ? hexToRgba(accent, 0.17)
    : (hovered ? 'rgba(255,255,255,0.095)' : 'rgba(255,255,255,0.055)');
  ctx.fill();
  ctx.strokeStyle = selected ? accent : (hovered ? 'rgba(255,255,255,0.38)' : 'rgba(255,255,255,0.14)');
  ctx.lineWidth = selected ? 2 : 1;
  ctx.stroke();

  const sprite = getEntrySprite(entry);
  if (sprite) {
    drawEntrySprite(ctx, sprite, x + w / 2 - 34, y + 14, 68, entry.unlocked);
  } else {
    drawEntryGlyph(ctx, entry, x + w / 2 - 34, y + 14, 68, getEntryAccent(entry));
  }

  ctx.fillStyle = entry.unlocked ? '#f7f1df' : '#8c8678';
  ctx.font = 'bold 13px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  drawTruncatedText(ctx, entry.name, x + w / 2, y + 98, w - 16);

  const tagText = entry.unlocked ? (entry.tags[0] || entry.nameEn || '') : '未解锁';
  ctx.fillStyle = entry.unlocked ? hexToRgba(accent, 0.26) : 'rgba(0,0,0,0.26)';
  drawRoundedRect(ctx, x + 14, y + h - 24, w - 28, 18, 9);
  ctx.fill();
  ctx.fillStyle = entry.unlocked ? accent : '#746f65';
  ctx.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  drawTruncatedText(ctx, tagText, x + w / 2, y + h - 15, w - 36);
}

function renderBestiaryDetails(ctx, game, x, y, w, h, entry) {
  ctx.fillStyle = '#f8f1d8';
  ctx.font = 'bold 20px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('详情', x + 18, y + 32);

  if (!entry) {
    ctx.fillStyle = '#888';
    ctx.font = '14px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText('暂无记录', x + 18, y + 72);
    return;
  }

  const accent = getEntryAccent(entry);
  const sprite = getEntrySprite(entry);
  const previewSpec = entry.kind === 'weapon' ? getWeaponPreviewSpec(entry) : null;
  game._bestiaryDetailPreview = previewSpec;
  if (previewSpec) {
    renderWeaponEffectPreview(ctx, x + 18, y + 48, w - 36, 176, entry, sprite, previewSpec, accent);
  } else {
    drawRoundedRect(ctx, x + 58, y + 50, 202, 164, 12);
    ctx.fillStyle = entry.unlocked ? hexToRgba(accent, 0.12) : 'rgba(0,0,0,0.24)';
    ctx.fill();
    ctx.strokeStyle = entry.unlocked ? hexToRgba(accent, 0.58) : 'rgba(255,255,255,0.10)';
    ctx.lineWidth = 1;
    ctx.stroke();
    if (sprite) {
      drawEntrySprite(ctx, sprite, x + 92, y + 66, 134, entry.unlocked);
    } else {
      drawEntryGlyph(ctx, entry, x + 92, y + 66, 134, accent);
    }
  }

  ctx.fillStyle = entry.unlocked ? '#fff6dc' : '#8c8678';
  ctx.font = 'bold 22px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  drawTruncatedText(ctx, entry.name, x + w / 2, y + 250, w - 32);

  ctx.fillStyle = '#9d9788';
  ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
  drawTruncatedText(ctx, entry.nameEn || entry.id, x + w / 2, y + 270, w - 36);

  let cursorY = y + 298;
  if (!entry.unlocked) {
    ctx.fillStyle = '#8f8878';
    ctx.font = '13px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    cursorY = drawWrappedText(ctx, '尚未解锁。图标先以暗色剪影显示，解锁后会记录完整资料。', x + 22, cursorY, w - 44, 19, 3) + 10;
  }

  if (entry.tags.length > 0) {
    cursorY = drawTagRow(ctx, entry.tags, x + 22, cursorY, w - 44, accent) + 14;
  }

  if (entry.recipe) {
    ctx.fillStyle = '#ffd43b';
    ctx.font = 'bold 13px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('进化条件', x + 22, cursorY);
    cursorY += 20;
    ctx.fillStyle = '#ddd3ba';
    ctx.font = '13px "Segoe UI", "Microsoft YaHei", sans-serif';
    const baseName = WEAPON_DEFS[entry.recipe.baseWeaponId]?.name || EVOLUTION_DEFS[entry.recipe.baseWeaponId]?.name || entry.recipe.baseWeaponId;
    const passiveName = PASSIVE_DEFS[entry.recipe.requiredPassiveId]?.name || entry.recipe.requiredPassiveId;
    cursorY = drawWrappedText(ctx, `${baseName} + ${passiveName}`, x + 22, cursorY, w - 44, 18, 2) + 12;
  }

  if (entry.stats.length > 0) {
    ctx.fillStyle = '#f1e7ce';
    ctx.font = 'bold 13px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('参数', x + 22, cursorY);
    cursorY += 18;
    cursorY = drawStats(ctx, entry.stats, x + 22, cursorY, w - 44) + 14;
  }

  ctx.fillStyle = '#f1e7ce';
  ctx.font = 'bold 13px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('记录', x + 22, cursorY);
  cursorY += 20;
  ctx.fillStyle = entry.unlocked ? '#cfc5ad' : '#827c70';
  ctx.font = '13px "Segoe UI", "Microsoft YaHei", sans-serif';
  drawWrappedText(ctx, entry.summary, x + 22, cursorY, w - 44, 19, 5);
}

function renderWeaponEffectPreview(ctx, x, y, w, h, entry, sprite, previewSpec, accent) {
  drawRoundedRect(ctx, x, y, w, h, 12);
  ctx.fillStyle = 'rgba(5, 8, 13, 0.96)';
  ctx.fill();
  ctx.strokeStyle = entry.unlocked ? hexToRgba(accent, 0.48) : 'rgba(255,255,255,0.10)';
  ctx.lineWidth = 1;
  ctx.stroke();

  const now = getPreviewTime();
  const arena = { x: x + 10, y: y + 26, w: w - 20, h: h - 58 };
  ctx.save();
  drawWeaponPreviewGrid(ctx, arena, accent);
  drawRoundedRect(ctx, arena.x, arena.y, arena.w, arena.h, 8);
  ctx.clip();

  const cx = arena.x + arena.w * 0.38;
  const cy = arena.y + arena.h * 0.54;
  drawWeaponPreviewType(ctx, previewSpec, sprite, cx, cy, arena, now, accent, entry.unlocked);
  drawWeaponPreviewPlayer(ctx, cx, cy, accent);
  ctx.restore();

  ctx.fillStyle = entry.unlocked ? accent : '#8c8678';
  ctx.font = 'bold 12px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  drawTruncatedText(ctx, previewSpec.title, x + 14, y + 18, w - 28);

  ctx.fillStyle = entry.unlocked ? '#bfb59e' : '#746f65';
  ctx.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  drawWrappedText(ctx, previewSpec.caption, x + 14, y + h - 22, w - 28, 14, 1);
}

function drawWeaponPreviewType(ctx, spec, sprite, cx, cy, arena, now, accent, unlocked) {
  if (spec.type === 'sweep') {
    drawWeaponPreviewSweep(ctx, sprite, cx, cy, now, accent, unlocked);
  } else if (spec.type === 'orbit') {
    drawWeaponPreviewOrbit(ctx, sprite, cx, cy, now, accent, unlocked);
  } else if (spec.type === 'boomerang') {
    drawWeaponPreviewBoomerang(ctx, sprite, cx, cy, now, accent, unlocked);
  } else if (spec.type === 'bounce') {
    drawWeaponPreviewBounce(ctx, sprite, cx, cy, now, accent, unlocked);
  } else if (spec.type === 'needle') {
    drawWeaponPreviewNeedle(ctx, sprite, cx, cy, now, accent, unlocked);
  } else if (spec.type === 'aura') {
    drawWeaponPreviewAura(ctx, cx, cy, now, accent);
  } else if (spec.type === 'spray') {
    drawWeaponPreviewSpray(ctx, sprite, cx, cy, now, accent, unlocked);
  } else if (spec.type === 'lob') {
    drawWeaponPreviewLob(ctx, sprite, cx, cy, now, accent, unlocked);
  } else if (spec.type === 'shield') {
    drawWeaponPreviewShield(ctx, sprite, cx, cy, now, accent, unlocked);
  } else if (spec.type === 'freeze') {
    drawWeaponPreviewFreeze(ctx, sprite, cx, cy, arena, now, accent, unlocked);
  } else if (spec.type === 'clear') {
    drawWeaponPreviewClear(ctx, sprite, cx, cy, arena, now, accent, unlocked);
  } else {
    drawWeaponPreviewOrbit(ctx, sprite, cx, cy, now, accent, unlocked);
  }
}

function drawWeaponPreviewSweep(ctx, sprite, cx, cy, now, accent, unlocked) {
  const p = (Math.sin(now * 3.6) + 1) / 2;
  const start = -Math.PI * 0.92 + p * 0.36;
  const end = start + Math.PI * 0.72;
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.arc(cx, cy, 46 + i * 5, start - i * 0.05, end - i * 0.03);
    ctx.strokeStyle = hexToRgba(accent, 0.45 - i * 0.08);
    ctx.lineWidth = 8 - i;
    ctx.lineCap = 'round';
    ctx.stroke();
  }
  const sx = cx + Math.cos(end) * 58;
  const sy = cy + Math.sin(end) * 58;
  drawWeaponPreviewSprite(ctx, sprite, sx, sy, 34, end + Math.PI / 2, unlocked, 0.92);
}

function drawWeaponPreviewOrbit(ctx, sprite, cx, cy, now, accent, unlocked) {
  const radius = 52;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.strokeStyle = hexToRgba(accent, 0.24);
  ctx.lineWidth = 2;
  ctx.stroke();
  for (let i = 0; i < 3; i++) {
    const a = now * 1.8 + i * Math.PI * 2 / 3;
    drawWeaponPreviewSprite(ctx, sprite, cx + Math.cos(a) * radius, cy + Math.sin(a) * radius, 30, a + Math.PI / 2, unlocked, 0.9);
  }
}

function drawWeaponPreviewBoomerang(ctx, sprite, cx, cy, now, accent, unlocked) {
  ctx.beginPath();
  ctx.ellipse(cx + 46, cy, 78, 28, 0, 0, Math.PI * 2);
  ctx.strokeStyle = hexToRgba(accent, 0.24);
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 8]);
  ctx.stroke();
  ctx.setLineDash([]);
  const a = now * 1.7;
  const px = cx + 46 + Math.cos(a) * 78;
  const py = cy + Math.sin(a) * 28;
  drawWeaponPreviewTrail(ctx, px, py, accent);
  drawWeaponPreviewSprite(ctx, sprite, px, py, 34, a * 3.2, unlocked, 0.96);
}

function drawWeaponPreviewBounce(ctx, sprite, cx, cy, now, accent, unlocked) {
  const points = [
    { x: cx - 4, y: cy },
    { x: cx + 70, y: cy - 34 },
    { x: cx + 102, y: cy + 30 },
    { x: cx + 38, y: cy + 44 },
    { x: cx + 92, y: cy - 2 }
  ];
  ctx.strokeStyle = hexToRgba(accent, 0.28);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
  ctx.stroke();
  for (const point of points.slice(1)) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.10)';
    ctx.fill();
  }
  const moving = interpolatePreviewPath(points, (now * 0.75) % 1);
  drawWeaponPreviewTrail(ctx, moving.x, moving.y, accent);
  drawWeaponPreviewSprite(ctx, sprite, moving.x, moving.y, 32, moving.angle, unlocked, 0.96);
}

function drawWeaponPreviewNeedle(ctx, sprite, cx, cy, now, accent, unlocked) {
  const lanes = [-16, 0, 16];
  const angle = -0.08;
  const progress = (now * 1.45) % 1;
  ctx.lineCap = 'round';
  for (let i = 0; i < lanes.length; i++) {
    const y = cy + lanes[i] + Math.sin(now * 2.4 + i) * 2;
    ctx.strokeStyle = hexToRgba(accent, i === 1 ? 0.26 : 0.14);
    ctx.lineWidth = i === 1 ? 2 : 1;
    ctx.beginPath();
    ctx.moveTo(cx + 8, y);
    ctx.lineTo(cx + 116, y - 8);
    ctx.stroke();
  }
  for (let i = 0; i < 2; i++) {
    const p = (progress + i * 0.38) % 1;
    const x = cx + 16 + p * 106;
    const y = cy - 4 - p * 8 + Math.sin(p * Math.PI * 2) * 3;
    drawWeaponPreviewTrail(ctx, x - 2, y, accent);
    drawWeaponPreviewSprite(ctx, sprite, x, y, 30, angle, unlocked, 0.96);
  }
}

function drawWeaponPreviewAura(ctx, cx, cy, now, accent) {
  for (let i = 0; i < 3; i++) {
    const p = (now * 0.8 + i / 3) % 1;
    ctx.beginPath();
    ctx.arc(cx, cy, 34 + p * 44, 0, Math.PI * 2);
    ctx.strokeStyle = hexToRgba(accent, 0.34 * (1 - p));
    ctx.lineWidth = 8 - p * 5;
    ctx.stroke();
  }
}

function drawWeaponPreviewSpray(ctx, sprite, cx, cy, now, accent, unlocked) {
  const spread = Math.PI / 3.3;
  const dir = -0.12 + Math.sin(now * 1.6) * 0.08;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, 112, dir - spread / 2, dir + spread / 2);
  ctx.closePath();
  ctx.fillStyle = hexToRgba(accent, 0.16);
  ctx.fill();
  ctx.strokeStyle = hexToRgba(accent, 0.34);
  ctx.lineWidth = 2;
  ctx.stroke();
  for (let i = 0; i < 11; i++) {
    const p = (now * 1.3 + i * 0.17) % 1;
    const a = dir - spread / 2 + spread * ((i % 5) / 4);
    const d = 22 + p * 88;
    ctx.beginPath();
    ctx.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 3 + p * 2, 0, Math.PI * 2);
    ctx.fillStyle = hexToRgba(accent, 0.62 * (1 - p * 0.35));
    ctx.fill();
  }
  drawWeaponPreviewSprite(ctx, sprite, cx + 22, cy - 10, 28, -0.7, unlocked, 0.9);
}

function drawWeaponPreviewLob(ctx, sprite, cx, cy, now, accent, unlocked) {
  const p = (now * 0.65) % 1;
  const tx = cx + 96;
  const ty = cy + 30;
  ctx.strokeStyle = hexToRgba(accent, 0.26);
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 6]);
  ctx.beginPath();
  ctx.moveTo(cx + 12, cy - 8);
  ctx.quadraticCurveTo(cx + 54, cy - 74, tx, ty);
  ctx.stroke();
  ctx.setLineDash([]);
  const px = cx + 12 + (tx - cx - 12) * p;
  const py = (cy - 8) * (1 - p) + ty * p - Math.sin(p * Math.PI) * 58;
  ctx.beginPath();
  ctx.arc(tx, ty, 20 + Math.sin(now * 4) * 3, 0, Math.PI * 2);
  ctx.fillStyle = hexToRgba(accent, 0.13);
  ctx.fill();
  drawWeaponPreviewSprite(ctx, sprite, px, py, 30, p * Math.PI * 2, unlocked, 0.95);
}

function drawWeaponPreviewShield(ctx, sprite, cx, cy, now, accent, unlocked) {
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(cx, cy, 36 + i * 12 + Math.sin(now * 3 + i) * 2, 0, Math.PI * 2);
    ctx.strokeStyle = hexToRgba(accent, 0.34 - i * 0.07);
    ctx.lineWidth = 3;
    ctx.stroke();
  }
  for (let i = 0; i < 6; i++) {
    const a = now * 0.9 + i * Math.PI / 3;
    ctx.beginPath();
    ctx.arc(cx + Math.cos(a) * 62, cy + Math.sin(a) * 62, 3, 0, Math.PI * 2);
    ctx.fillStyle = hexToRgba(accent, 0.58);
    ctx.fill();
  }
  drawWeaponPreviewSprite(ctx, sprite, cx + 72, cy - 36, 28, now, unlocked, 0.82);
}

function drawWeaponPreviewFreeze(ctx, sprite, cx, cy, arena, now, accent, unlocked) {
  const sweep = (Math.sin(now * 1.6) + 1) / 2;
  const angle = -0.48 + sweep * 0.96;
  const endX = cx + Math.cos(angle) * (arena.w * 0.62);
  const endY = cy + Math.sin(angle) * (arena.w * 0.62);
  const gradient = ctx.createLinearGradient(cx, cy, endX, endY);
  gradient.addColorStop(0, 'rgba(145, 242, 210, 0.06)');
  gradient.addColorStop(1, 'rgba(116, 192, 252, 0.48)');
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 18;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(226, 250, 255, 0.68)';
  ctx.lineWidth = 2;
  ctx.stroke();
  drawWeaponPreviewSprite(ctx, sprite, cx + 20, cy - 24, 30, angle, unlocked, 0.84);
}

function drawWeaponPreviewClear(ctx, sprite, cx, cy, arena, now, accent, unlocked) {
  for (let i = 0; i < 3; i++) {
    const p = (now * 0.55 + i / 3) % 1;
    ctx.beginPath();
    ctx.arc(cx, cy, p * arena.w * 0.72, 0, Math.PI * 2);
    ctx.strokeStyle = hexToRgba(accent, 0.42 * (1 - p));
    ctx.lineWidth = 7 - p * 4;
    ctx.stroke();
  }
  for (let i = 0; i < 12; i++) {
    const a = i * Math.PI * 2 / 12 + now * 0.4;
    const d = 46 + Math.sin(now * 2 + i) * 7;
    ctx.beginPath();
    ctx.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = hexToRgba(accent, 0.54);
    ctx.fill();
  }
  drawWeaponPreviewSprite(ctx, sprite, cx + 78, cy - 20, 30, Math.sin(now) * 0.2, unlocked, 0.84);
}

function drawWeaponPreviewGrid(ctx, arena, accent) {
  drawRoundedRect(ctx, arena.x, arena.y, arena.w, arena.h, 8);
  ctx.fillStyle = 'rgba(255,255,255,0.035)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.07)';
  ctx.lineWidth = 1;
  for (let gx = arena.x + 20; gx < arena.x + arena.w; gx += 28) {
    ctx.beginPath();
    ctx.moveTo(gx, arena.y);
    ctx.lineTo(gx, arena.y + arena.h);
    ctx.stroke();
  }
  for (let gy = arena.y + 20; gy < arena.y + arena.h; gy += 28) {
    ctx.beginPath();
    ctx.moveTo(arena.x, gy);
    ctx.lineTo(arena.x + arena.w, gy);
    ctx.stroke();
  }
  ctx.strokeStyle = hexToRgba(accent, 0.18);
  ctx.strokeRect(arena.x + 0.5, arena.y + 0.5, arena.w - 1, arena.h - 1);
}

function drawWeaponPreviewPlayer(ctx, cx, cy, accent) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, 16, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(8, 10, 15, 0.96)';
  ctx.fill();
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = '#fff4cf';
  ctx.font = 'bold 12px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('P', cx, cy + 0.5);
  ctx.restore();
}

function drawWeaponPreviewSprite(ctx, sprite, cx, cy, size, rotation, unlocked, alpha) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation || 0);
  ctx.globalAlpha = alpha;
  if (!unlocked) ctx.filter = 'grayscale(1) brightness(0.55) contrast(1.2)';
  if (isSpriteReady(sprite)) {
    drawContainImage(ctx, sprite, -size / 2, -size / 2, size, size);
  } else {
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.34, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.16)';
    ctx.fill();
  }
  ctx.restore();
}

function drawWeaponPreviewTrail(ctx, x, y, accent) {
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(x - i * 10, y + i * 2, 12 - i * 3, 0, Math.PI * 2);
    ctx.fillStyle = hexToRgba(accent, 0.16 - i * 0.04);
    ctx.fill();
  }
}

function interpolatePreviewPath(points, progress) {
  const scaled = progress * (points.length - 1);
  const index = Math.min(points.length - 2, Math.floor(scaled));
  const local = scaled - index;
  const a = points[index];
  const b = points[index + 1];
  return {
    x: a.x + (b.x - a.x) * local,
    y: a.y + (b.y - a.y) * local,
    angle: Math.atan2(b.y - a.y, b.x - a.x)
  };
}

function getPreviewTime() {
  if (typeof performance !== 'undefined' && performance.now) return performance.now() / 1000;
  return Date.now() / 1000;
}

function drawPanel(ctx, x, y, w, h) {
  drawRoundedRect(ctx, x, y, w, h, 10);
  ctx.fillStyle = 'rgba(11, 13, 18, 0.78)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawPagerButton(ctx, bounds, label, hovered) {
  drawRoundedRect(ctx, bounds.x, bounds.y, bounds.w, bounds.h, 6);
  ctx.fillStyle = bounds.disabled
    ? 'rgba(255,255,255,0.035)'
    : (hovered ? 'rgba(255,212,59,0.20)' : 'rgba(255,255,255,0.065)');
  ctx.fill();
  ctx.strokeStyle = bounds.disabled ? 'rgba(255,255,255,0.08)' : (hovered ? '#ffd43b' : 'rgba(255,255,255,0.22)');
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = bounds.disabled ? '#555' : (hovered ? '#ffd43b' : '#d8d0bd');
  ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, bounds.x + bounds.w / 2, bounds.y + bounds.h / 2);
}

function getEntrySprite(entry) {
  if (entry.kind === 'enemy') return ENEMY_SPRITES[entry.spriteId];
  if (entry.kind === 'weapon') return WEAPON_SPRITES[entry.spriteId];
  if (entry.kind === 'passive') return PASSIVE_SPRITES[entry.spriteId];
  return null;
}

function drawEntryGlyph(ctx, entry, x, y, size, accent) {
  ctx.save();
  if (!entry.unlocked) ctx.globalAlpha = 0.48;
  if (entry.kind === 'arcana') {
    drawArcanaIcon(ctx, entry.data, x + size / 2, y + size / 2, size * 0.82, {
      locked: !entry.unlocked,
      alpha: entry.unlocked ? 1 : 0.5
    });
    ctx.restore();
    return;
  }
  const cx = x + size / 2;
  const cy = y + size / 2;
  ctx.fillStyle = entry.unlocked ? hexToRgba(accent, 0.18) : 'rgba(0,0,0,0.35)';
  ctx.strokeStyle = entry.unlocked ? accent : '#6d675f';
  ctx.lineWidth = Math.max(2, size * 0.035);
  if (entry.kind === 'note') {
    ctx.translate(cx, cy);
    ctx.rotate(-0.12);
    drawRoundedRect(ctx, -size * 0.28, -size * 0.34, size * 0.56, size * 0.68, size * 0.05);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = entry.unlocked ? hexToRgba(accent, 0.65) : '#6d675f';
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(-size * 0.18, -size * 0.16 + i * size * 0.1);
      ctx.lineTo(size * 0.18, -size * 0.16 + i * size * 0.1);
      ctx.stroke();
    }
  } else if (entry.kind === 'relic') {
    ctx.translate(cx, cy);
    drawRoundedRect(ctx, -size * 0.32, -size * 0.22, size * 0.64, size * 0.44, size * 0.08);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-size * 0.32, -size * 0.05);
    ctx.lineTo(size * 0.32, -size * 0.05);
    ctx.moveTo(0, -size * 0.22);
    ctx.lineTo(0, size * 0.22);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, -size * 0.05, size * 0.08, 0, Math.PI * 2);
    ctx.fillStyle = entry.unlocked ? '#fff8dc' : '#777';
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.32, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

function drawEntrySprite(ctx, sprite, x, y, size, unlocked) {
  if (!unlocked) {
    ctx.save();
    ctx.fillStyle = 'rgba(3, 4, 7, 0.28)';
    ctx.beginPath();
    ctx.ellipse(x + size / 2, y + size / 2, size * 0.44, size * 0.38, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  ctx.save();
  if (!unlocked) {
    ctx.globalAlpha = 0.58;
    ctx.filter = 'grayscale(1) brightness(0.45) contrast(1.25)';
  }

  if (isSpriteReady(sprite)) {
    drawContainImage(ctx, sprite, x, y, size, size);
  } else {
    ctx.filter = 'none';
    ctx.globalAlpha = unlocked ? 1 : 0.42;
    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, size * 0.34, 0, Math.PI * 2);
    ctx.fillStyle = unlocked ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.45)';
    ctx.fill();
    ctx.fillStyle = unlocked ? '#ddd' : '#666';
    ctx.font = `bold ${Math.round(size * 0.34)}px "Segoe UI", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('?', x + size / 2, y + size / 2);
  }
  ctx.restore();
}

function drawContainImage(ctx, img, x, y, w, h) {
  const iw = img.naturalWidth || img.width || w;
  const ih = img.naturalHeight || img.height || h;
  const ratio = Math.min(w / iw, h / ih);
  const dw = iw * ratio;
  const dh = ih * ratio;
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
}

function isSpriteReady(sprite) {
  if (!sprite) return false;
  if (typeof HTMLCanvasElement !== 'undefined' && sprite instanceof HTMLCanvasElement) return true;
  return !!(sprite.complete && sprite.naturalWidth > 0);
}

function drawStats(ctx, stats, x, y, w) {
  const colW = Math.floor(w / 2) - 6;
  for (let i = 0; i < stats.length; i++) {
    const stat = stats[i];
    const col = i % 2;
    const row = Math.floor(i / 2);
    const sx = x + col * (colW + 12);
    const sy = y + row * 34;
    drawRoundedRect(ctx, sx, sy, colW, 26, 6);
    ctx.fillStyle = 'rgba(255,255,255,0.055)';
    ctx.fill();
    ctx.fillStyle = '#9d9788';
    ctx.font = '10px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    drawTruncatedText(ctx, stat.label, sx + 8, sy + 11, colW - 16);
    ctx.fillStyle = '#f2e7cc';
    ctx.font = 'bold 12px "Segoe UI", "Microsoft YaHei", sans-serif';
    drawTruncatedText(ctx, String(stat.value), sx + 8, sy + 23, colW - 16);
  }
  return y + Math.ceil(stats.length / 2) * 34;
}

function drawTagRow(ctx, tags, x, y, w, accent) {
  let tx = x;
  let ty = y;
  for (const tag of tags.slice(0, 6)) {
    const label = String(tag);
    const tw = Math.min(96, Math.max(48, ctx.measureText(label).width + 20));
    if (tx + tw > x + w) {
      tx = x;
      ty += 26;
    }
    drawRoundedRect(ctx, tx, ty, tw, 20, 10);
    ctx.fillStyle = hexToRgba(accent, 0.18);
    ctx.fill();
    ctx.fillStyle = accent;
    ctx.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, tx + tw / 2, ty + 10);
    tx += tw + 6;
  }
  return ty + 20;
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  const chars = String(text || '').split('');
  let line = '';
  let lineCount = 0;
  for (let i = 0; i < chars.length; i++) {
    const testLine = line + chars[i];
    if (ctx.measureText(testLine).width > maxWidth && line) {
      lineCount++;
      if (lineCount >= maxLines) {
        drawTruncatedText(ctx, line, x, y, maxWidth);
        return y + lineHeight;
      }
      ctx.fillText(line, x, y);
      y += lineHeight;
      line = chars[i];
    } else {
      line = testLine;
    }
  }
  if (line && lineCount < maxLines) {
    ctx.fillText(line, x, y);
    y += lineHeight;
  }
  return y;
}

function drawTruncatedText(ctx, text, x, y, maxWidth) {
  const value = String(text || '');
  if (ctx.measureText(value).width <= maxWidth) {
    ctx.fillText(value, x, y);
    return;
  }
  let trimmed = value;
  while (trimmed.length > 1 && ctx.measureText(`${trimmed}...`).width > maxWidth) {
    trimmed = trimmed.slice(0, -1);
  }
  ctx.fillText(`${trimmed}...`, x, y);
}

function getEntryAccent(entry) {
  const category = BESTIARY_CATEGORIES.find(item => item.id === entry.categoryId);
  if (category) return category.accent;
  if (entry.kind === 'enemy') return '#ff8787';
  return '#ffd43b';
}

function hexToRgba(hex, alpha) {
  const normalized = hex.replace('#', '');
  const value = parseInt(normalized, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
