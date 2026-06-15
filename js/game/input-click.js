import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { CHARACTERS } from '../config/characters.js';
import { ARCANAS } from '../config/arcanas-data.js';
import { WEAPON_DEFS } from '../config/weapons-data.js';
import { pointInRect } from '../ui/helpers.js';
import { handleShopPurchase } from '../ui/render-shop.js';
import { handleLevelSelectClick } from '../ui/render-level-select.js';
import { handleSkillTreeClick } from '../ui/render-skilltree.js';
import { buyPowerUp, refundPowerUps, saveMeta } from './powerup-store.js';
import { isCharacterUnlocked } from './unlock-manager.js';
import { applyInteractableChoice } from '../config/interactables-data.js';

export function handleClick(game) {
  game.audio.unlock();

  if (game.intro.active) {
    game.intro.skip();
    return;
  }

  const pos = game.inputManager.getMousePos();
  const mx = pos.x, my = pos.y;

  if (game.state === 'MENU') {
    for (const btn of game.menuButtons) {
      if (pointInRect(mx, my, btn.x, btn.y, btn.w, btn.h)) {
        btn.action();
        return;
      }
    }
  } else if (game.state === 'LEVEL_SELECT') {
    if (handleLevelSelectClick(game, mx, my)) return;
  } else if (game.state === 'CHARACTER_SELECT') {
    for (const c of game._charCardBounds) {
      if (pointInRect(mx, my, c.x, c.y, c.w, c.h)) {
        if (c.locked) return;
        game.selectedCharacterIndex = c.index;
        game.audio.playMenuClick();
        return;
      }
    }
    if (game._charConfirmBounds) {
      const b = game._charConfirmBounds;
      if (pointInRect(mx, my, b.x, b.y, b.w, b.h)) {
        const char = CHARACTERS[game.selectedCharacterIndex];
        if (!isCharacterUnlocked(game.meta, char.id)) return;
        game.startGame();
        return;
      }
    }
    if (game._charBackBounds) {
      const b = game._charBackBounds;
      if (pointInRect(mx, my, b.x, b.y, b.w, b.h)) {
        game.setState('LEVEL_SELECT');
        game.audio.playMenuClick();
        return;
      }
    }
  } else if (game.state === 'SAVE_SELECT') {
    for (let i = 0; i < game._saveSlotBounds.length; i++) {
      const s = game._saveSlotBounds[i];
      if (pointInRect(mx, my, s.x, s.y, s.w, s.h)) {
        const save = game.saveSystem.getSave(s.slot);
        if (save) {
          const delBtnX = s.x + s.w / 2 - 40, delBtnY = s.y + s.h - 45;
          if (pointInRect(mx, my, delBtnX, delBtnY, 80, 30)) {
            game._deleteSave(s.slot);
            game.audio.playMenuClick();
            return;
          }
        }
        if (save) {
          game._restoreFromSave(save);
          game.audio.playMenuClick();
        }
        return;
      }
    }
    if (pointInRect(mx, my, GAME_WIDTH / 2 - 80, 100 + 200 + 30, 160, 44)) {
      game.state = 'MENU';
      game.audio.playMenuClick();
    }
  } else if (game.state === 'LEVEL_LOADING') {
    game.state = 'PLAYING';
    return;
  } else if (game.state === 'PLAYING') {
    if (pointInRect(mx, my, GAME_WIDTH - 160, 20, 140, 44)) {
      if (!game.bossSpawned) {
        game.spawnBoss();
      }
      return;
    }
    if (pointInRect(mx, my, GAME_WIDTH - 160, 72, 140, 44)) {
      game.state = 'SHOP';
      game._generateShopItems();
      return;
    }
    if (pointInRect(mx, my, GAME_WIDTH - 160, 124, 140, 44)) {
      game.difficultyMultiplier += 0.5;
      return;
    }
    if (pointInRect(mx, my, GAME_WIDTH - 160, 176, 140, 44)) {
      game.player.gold += 100;
      return;
    }
  } else if (game.state === 'PAUSED') {
    if (game._showSaveSlotSelect) {
      for (let i = 0; i < game._pauseSaveSlotBounds.length; i++) {
        const s = game._pauseSaveSlotBounds[i];
        if (pointInRect(mx, my, s.x, s.y, s.w, s.h)) {
          const save = game.saveSystem.getSave(s.slot);
          if (save) {
            const delBtnX = s.x + s.w - 60, delBtnY = s.y + s.h - 35;
            if (pointInRect(mx, my, delBtnX, delBtnY, 50, 25)) {
              game._deleteSave(s.slot);
              game.audio.playMenuClick();
              return;
            }
          }
          const saveData = game.saveSystem.createSaveData(game);
          game.saveSystem.setSave(s.slot, saveData);
          game._showSaveSlotSelect = false;
          game.state = 'MENU';
          game.audio.stopMusic();
          game.audio.playMenuClick();
          return;
        }
      }
      const cancelBtnY = 130 + 160 + 30;
      if (pointInRect(mx, my, GAME_WIDTH / 2 - 80, cancelBtnY, 160, 40)) {
        game._showSaveSlotSelect = false;
        return;
      }
      return;
    }
    for (const btn of game.pauseMenuButtons) {
      if (pointInRect(mx, my, btn.x, btn.y, btn.w, btn.h)) {
        btn.action();
        return;
      }
    }
  } else if (game.state === 'SHOP') {
    if (game._shopItemHovered >= 0 && game._shopItemHovered < game.shopItems.length) {
      const item = game.shopItems[game._shopItemHovered];
      handleShopPurchase(game, item);
      return;
    }
    const panelW = 620, panelH = 520;
    const panelX = (GAME_WIDTH - panelW - 180) / 2;
    const panelY = (GAME_HEIGHT - panelH) / 2;
    if (pointInRect(mx, my, panelX + panelW / 2 - 60, panelY + panelH - 50, 120, 36)) {
      game.state = 'PLAYING';
      return;
    }
  } else if (game.state === 'SETTINGS') {
    if (game._volumeSlider) {
      const vs = game._volumeSlider;
      if (mx >= vs.musicX - 10 && mx <= vs.musicX + vs.musicW + 10 &&
          my >= vs.musicY - 15 && my <= vs.musicY + vs.musicH + 15) {
        const pct = Math.max(0, Math.min(1, (mx - vs.musicX) / vs.musicW));
        game.audio.setMusicVolume(pct);
        return;
      }
      if (vs.sfxX !== undefined && mx >= vs.sfxX - 10 && mx <= vs.sfxX + vs.sfxW + 10 &&
          my >= vs.sfxY - 15 && my <= vs.sfxY + vs.sfxH + 15) {
        const pct = Math.max(0, Math.min(1, (mx - vs.sfxX) / vs.sfxW));
        game.audio.setSfxVolume(pct);
        return;
      }
    }
    for (const t of game._settingsTabBounds) {
      if (pointInRect(mx, my, t.x, t.y, t.w, t.h)) {
        game.settingsTab = t.id;
        game.audio.playMenuClick();
        return;
      }
    }
    if (game.settingsTab === 'bestiary') {
      for (const category of game._bestiaryCategoryBounds || []) {
        if (pointInRect(mx, my, category.x, category.y, category.w, category.h)) {
          game._bestiaryCategory = category.id;
          game._bestiaryPage = 0;
          game._bestiarySelectedKey = null;
          game.audio.playMenuClick();
          return;
        }
      }
      const pageBounds = game._bestiaryPageBounds;
      if (pageBounds?.prev && !pageBounds.prev.disabled && pointInRect(mx, my, pageBounds.prev.x, pageBounds.prev.y, pageBounds.prev.w, pageBounds.prev.h)) {
        game._bestiaryPage = Math.max(0, (game._bestiaryPage || 0) - 1);
        game._bestiarySelectedKey = null;
        game.audio.playMenuClick();
        return;
      }
      if (pageBounds?.next && !pageBounds.next.disabled && pointInRect(mx, my, pageBounds.next.x, pageBounds.next.y, pageBounds.next.w, pageBounds.next.h)) {
        const maxPage = Math.max(0, (game._bestiaryPageInfo?.totalPages || 1) - 1);
        game._bestiaryPage = Math.min(maxPage, (game._bestiaryPage || 0) + 1);
        game._bestiarySelectedKey = null;
        game.audio.playMenuClick();
        return;
      }
      for (const card of game._bestiaryCardBounds || []) {
        if (pointInRect(mx, my, card.x, card.y, card.w, card.h)) {
          game._bestiarySelectedKey = card.key;
          game.audio.playMenuClick();
          return;
        }
      }
    }
    if (pointInRect(mx, my, GAME_WIDTH / 2 - 80, GAME_HEIGHT - 70, 160, 44)) {
      game.state = 'MENU';
      game.audio.playMenuClick();
    }
  } else if (game.state === 'POWERUP') {
    if (game._powerUpBackBounds && pointInRect(mx, my, game._powerUpBackBounds.x, game._powerUpBackBounds.y, game._powerUpBackBounds.w, game._powerUpBackBounds.h)) {
      game.setState('MENU');
      game.audio.playMenuClick();
      return;
    }
    if (game._powerUpRefundBounds && pointInRect(mx, my, game._powerUpRefundBounds.x, game._powerUpRefundBounds.y, game._powerUpRefundBounds.w, game._powerUpRefundBounds.h)) {
      const result = refundPowerUps(game.meta);
      game.meta = saveMeta(result.meta);
      game.audio.playMenuClick();
      return;
    }
    for (const row of game._powerUpRowBounds || []) {
      if (pointInRect(mx, my, row.buyX, row.buyY, row.buyW, row.buyH)) {
        const result = buyPowerUp(game.meta, row.id);
        if (result.ok) {
          game.meta = saveMeta(result.meta);
          game.unlockedWeaponsSet = new Set(game.meta.unlockedWeapons);
          game.audio.playLevelUp();
        } else {
          game.audio.playMenuClick();
        }
        return;
      }
    }
  } else if (game.state === 'SKILLTREE') {
    if (handleSkillTreeClick(game, mx, my)) return;
  } else if (game.state === 'ARCANA_SELECT') {
    const arcanaOptions = game.arcanaOptions && game.arcanaOptions.length > 0 ? game.arcanaOptions : ARCANAS.slice(0, 3);
    if (game._arcanaHovered >= 0 && game._arcanaHovered < arcanaOptions.length) {
      const arcana = arcanaOptions[game._arcanaHovered];
      if (game.player.arcanaInventory.canAdd(arcana.id)) {
        game.player.arcanaInventory.add(arcana.id);
        applyArcanaImmediateEffect(game, arcana.id);
        if (typeof game._syncBestiaryInventory === 'function') game._syncBestiaryInventory();
        game.arcanaOptions = [];
        game.state = 'PLAYING';
        game.audio.playLevelUp();
      }
      return;
    }
    if (pointInRect(mx, my, GAME_WIDTH / 2 - 80, GAME_HEIGHT - 80, 160, 44)) {
      game.arcanaOptions = [];
      game.state = 'PLAYING';
    }
  } else if (game.state === 'LEVEL_UP') {
    if (game._levelUpControlBounds?.reroll && pointInRect(mx, my, game._levelUpControlBounds.reroll.x, game._levelUpControlBounds.reroll.y, game._levelUpControlBounds.reroll.w, game._levelUpControlBounds.reroll.h)) {
      game.rerollLevelUpOptions();
      return;
    }
    if (game._levelUpControlBounds?.skip && pointInRect(mx, my, game._levelUpControlBounds.skip.x, game._levelUpControlBounds.skip.y, game._levelUpControlBounds.skip.w, game._levelUpControlBounds.skip.h)) {
      game.skipLevelUp();
      return;
    }
    for (const card of game._levelUpCardBounds) {
      if (pointInRect(mx, my, card.banishX, card.banishY, card.banishW, card.banishH)) {
        game.banishLevelUpOption(card.index);
        return;
      }
      if (pointInRect(mx, my, card.sealX, card.sealY, card.sealW, card.sealH)) {
        game.sealLevelUpOption(card.index);
        return;
      }
      if (pointInRect(mx, my, card.x, card.y, card.w, card.h)) {
        game.chooseLevelUpOption(card.index);
        return;
      }
    }
  } else if (game.state === 'INTERACTABLE_CHOICE') {
    for (const choice of game._interactableChoiceBounds || []) {
      if (pointInRect(mx, my, choice.x, choice.y, choice.w, choice.h)) {
        if (game.pendingInteractableChoice) {
          applyInteractableChoice(game, game.pendingInteractableChoice.dataWithPosition(), choice.id);
          game.pendingInteractableChoice.used = true;
          game.pendingInteractableChoice.active = false;
        }
        game.pendingInteractableChoice = null;
        game.setState('PLAYING');
        game.audio.playMenuClick();
        return;
      }
    }
  } else if (game.state === 'CHEST_OPEN') {
    game.closeChest();
  } else if (game.state === 'GAME_OVER') {
    const retryX = GAME_WIDTH / 2 - 120, retryY = GAME_HEIGHT / 2 + 155;
    if (pointInRect(mx, my, retryX, retryY, 110, 40)) {
      game._restartGame();
      return;
    }
    const menuX = GAME_WIDTH / 2 + 10, menuY = GAME_HEIGHT / 2 + 155;
    if (pointInRect(mx, my, menuX, menuY, 110, 40)) {
      game.state = 'MENU';
      game.audio.playMenuClick();
      return;
    }
  }
}

function applyArcanaImmediateEffect(game, arcanaId) {
  if (!game.player) return;
  if (arcanaId === 'empty_plate') {
    const weapons = game.player.weaponInventory.getAll();
    if (weapons.length > 1) {
      const weakest = weapons
        .map(item => ({ item, def: WEAPON_DEFS[item.id] }))
        .filter(entry => entry.def)
        .sort((a, b) => (a.def.baseDamage || 0) - (b.def.baseDamage || 0))[0];
      if (weakest) delete game.player.weaponInventory.weapons[weakest.item.id];
    }
  }
  if (arcanaId === 'emperor') {
    game.player.moveSpeedMultiplier *= 0.9;
  }
}
