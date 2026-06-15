import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { WEAPON_DEFS } from '../config/weapons-data.js';
import { ARCANAS } from '../config/arcanas-data.js';
import { SHOP_MERCHANT_IMAGE } from '../config/assets.js';
import { drawArcanaIcon, drawButton, drawRoundedRect } from './helpers.js';

export function renderShop(ctx, game) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  const panelW = 620, panelH = 520;
  const panelX = (GAME_WIDTH - panelW - 180) / 2;
  const panelY = (GAME_HEIGHT - panelH) / 2;

  drawRoundedRect(ctx, panelX, panelY, panelW, panelH, 12);
  ctx.fillStyle = 'rgba(20, 20, 40, 0.95)';
  ctx.fill();
  ctx.strokeStyle = '#ffd43b';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#ffd43b';
  ctx.font = 'bold 24px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('商店', panelX + panelW / 2, panelY + 35);

  ctx.fillStyle = '#ffd43b';
  ctx.font = 'bold 16px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`💰 ${game.player.gold}`, panelX + 20, panelY + 60);

  const shopAreaW = panelW - 20;
  const items = game.shopItems;
  const cols = 2;
  const itemGapX = 12, itemGapY = 8;
  const itemH = 70;
  const itemW = (shopAreaW - itemGapX) / cols;
  const itemStartX = panelX + 10;
  const itemStartY = panelY + 82;

  game._shopItemBounds = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const col = i % cols;
    const row = Math.floor(i / cols);
    const ix = itemStartX + col * (itemW + itemGapX);
    const iy = itemStartY + row * (itemH + itemGapY);
    const hov = game._shopItemHovered === i;
    const canBuy = _canBuyItem(game, item);

    game._shopItemBounds.push({ x: ix, y: iy, w: itemW, h: itemH, index: i });

    drawRoundedRect(ctx, ix, iy, itemW, itemH, 6);
    ctx.fillStyle = hov ? (canBuy ? 'rgba(255, 212, 59, 0.15)' : 'rgba(255, 0, 0, 0.1)') : 'rgba(255, 255, 255, 0.05)';
    ctx.fill();
    ctx.strokeStyle = hov ? (canBuy ? '#ffd43b' : '#ff6b6b') : 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = canBuy ? '#fff' : '#888';
    ctx.font = 'bold 14px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(item.name, ix + 10, iy + 8);

    ctx.fillStyle = canBuy ? '#ccc' : '#666';
    ctx.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText(item.desc, ix + 10, iy + 28);

    ctx.fillStyle = canBuy ? '#ffd43b' : '#ff6b6b';
    ctx.font = 'bold 13px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`💰 ${item.price}`, ix + itemW - 10, iy + 8);

    if (item.type === 'arcana') {
      const arcana = ARCANAS.find(a => a.id === item.arcanaId);
      if (arcana) {
        drawArcanaIcon(ctx, arcana, ix + 18, iy + 55, 24);
      }
    } else if (item.type === 'weapon') {
      const def = WEAPON_DEFS[item.weaponId];
      if (def) {
        const lvl = game.player.weaponInventory.getLevel(item.weaponId);
        const hasWeapon = game.player.weaponInventory.has(item.weaponId);
        ctx.fillStyle = hasWeapon ? '#69db7c' : '#74c0fc';
        ctx.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(hasWeapon ? `已拥有 Lv.${lvl} → Lv.${lvl + 1}` : '未拥有', ix + 10, iy + 48);
      }
    }
  }

  const merchantAreaW = 180;
  const merchantAreaX = panelX + panelW + 10;
  const merchantAreaY = panelY;

  drawRoundedRect(ctx, merchantAreaX, merchantAreaY, merchantAreaW, panelH, 12);
  ctx.fillStyle = 'rgba(20, 20, 40, 0.95)';
  ctx.fill();
  ctx.strokeStyle = '#ffd43b';
  ctx.lineWidth = 2;
  ctx.stroke();

  const merchantImgSize = 160;
  const merchantImgX = merchantAreaX + (merchantAreaW - merchantImgSize) / 2;
  const merchantImgY = merchantAreaY + 30;
  const mIsReady = SHOP_MERCHANT_IMAGE.complete && SHOP_MERCHANT_IMAGE.naturalWidth > 0;
  if (mIsReady) {
    ctx.drawImage(SHOP_MERCHANT_IMAGE, merchantImgX, merchantImgY, merchantImgSize, merchantImgSize);
  } else {
    ctx.fillStyle = 'rgba(255, 212, 59, 0.2)';
    ctx.fillRect(merchantImgX, merchantImgY, merchantImgSize, merchantImgSize);
  }

  const bubbleW = 200, bubbleH = 50;
  const bubbleX = merchantAreaX + (merchantAreaW - bubbleW) / 2;
  const bubbleY = merchantImgY + merchantImgSize + 20;

  drawRoundedRect(ctx, bubbleX, bubbleY, bubbleW, bubbleH, 10);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fill();
  ctx.strokeStyle = '#ffd43b';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#333';
  ctx.font = '14px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('嘿！想买点什么呢', bubbleX + bubbleW / 2, bubbleY + bubbleH / 2);

  const closeBtnX = panelX + panelW / 2 - 60;
  const closeBtnY = panelY + panelH - 50;
  const closeHov = game._shopCloseHovered;
  drawButton(ctx, closeBtnX, closeBtnY, 120, 36, '关闭', closeHov);
}

function _canBuyItem(game, item) {
  if (game.player.gold < item.price) return false;
  if (item.type === 'weapon') {
    const has = game.player.weaponInventory.has(item.weaponId);
    if (has) {
      return game.player.weaponInventory.canUpgrade(item.weaponId);
    }
    return true;
  }
  if (item.type === 'arcana') {
    return game.player.arcanaInventory.canAdd(item.arcanaId);
  }
  return true;
}

export function handleShopPurchase(game, item) {
  if (game.player.gold < item.price) return false;

  if (item.type === 'weapon') {
    const has = game.player.weaponInventory.has(item.weaponId);
    if (has) {
      if (!game.player.weaponInventory.canUpgrade(item.weaponId)) return false;
      game.player.weaponInventory.upgrade(item.weaponId);
    } else {
      game.player.weaponInventory.add(item.weaponId);
      game.bestiary.unlockWeapon(item.weaponId);
    }
    if (typeof game._syncBestiaryInventory === 'function') game._syncBestiaryInventory();
  } else if (item.type === 'arcana') {
    if (!game.player.arcanaInventory.canAdd(item.arcanaId)) return false;
    game.player.arcanaInventory.add(item.arcanaId);
    if (typeof game._syncBestiaryInventory === 'function') game._syncBestiaryInventory();
  } else if (item.type === 'hp_boost') {
    game.player.maxHp += 10;
    game.player.hp = Math.min(game.player.maxHp, game.player.hp + 10);
  } else if (item.type === 'atk_boost') {
    game.player.attackBonus += 1;
    if (game.player.weapon) {
      game.player.weapon.damage = game.player.getAttack();
    }
  }

  game.player.gold -= item.price;
  game.audio.playPickup();
  return true;
}
