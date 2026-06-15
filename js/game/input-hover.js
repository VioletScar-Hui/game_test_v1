import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { pointInRect } from '../ui/helpers.js';
import { handleLevelSelectHover } from '../ui/render-level-select.js';
import { handleSkillTreeHover } from '../ui/render-skilltree.js';

export function handleHover(game) {
  const pos = game.inputManager.getMousePos();
  const mx = pos.x, my = pos.y;

  game.bossButtonHovered = false;
  game.shopButtonHovered = false;
  game.diffButtonHovered = false;
  game.goldButtonHovered = false;
  game._shopItemHovered = -1;
  game._shopCloseHovered = false;
  game._levelHovered = -1;
  game._levelConfirmHovered = false;
  game._levelBackHovered = false;
  game._levelSpiceMinusHovered = false;
  game._levelSpicePlusHovered = false;
  game._levelHyperHovered = false;
  game._levelChallengeHovered = false;
  game._levelDailyHovered = false;
  game._charHovered = -1;
  game._charConfirmHovered = false;
  game._charBackHovered = false;
  game._saveSlotHovered = -1;
  game._saveDeleteHovered = -1;
  game._saveBackHovered = false;
  game._pauseSaveSlotHovered = -1;
  game._pauseDeleteHovered = -1;
  game._pauseCancelHovered = false;
  game._settingsTabHovered = -1;
  game._settingsBackHovered = false;
  game._bestiaryCategoryHovered = -1;
  game._bestiaryHoveredKey = null;
  game._bestiaryPageHovered = null;
  game._arcanaHovered = -1;
  game._arcanaSkipHovered = false;
  game._levelUpHovered = -1;
  game._levelUpControlHovered = null;
  game._levelUpBanishHovered = -1;
  game._levelUpSealHovered = -1;
  game._powerUpHovered = -1;
  game._powerUpBackHovered = false;
  game._powerUpRefundHovered = false;
  game._talentNodeHovered = null;
  game._talentBackHovered = false;
  game._interactableChoiceHovered = -1;

  if (game.state === 'MENU') {
    game.menuButtons.forEach(b => {
      b.hovered = pointInRect(mx, my, b.x, b.y, b.w, b.h);
    });
  } else if (game.state === 'PLAYING') {
    if (pointInRect(mx, my, GAME_WIDTH - 160, 20, 140, 44)) game.bossButtonHovered = true;
    if (pointInRect(mx, my, GAME_WIDTH - 160, 72, 140, 44)) game.shopButtonHovered = true;
    if (pointInRect(mx, my, GAME_WIDTH - 160, 124, 140, 44)) game.diffButtonHovered = true;
    if (pointInRect(mx, my, GAME_WIDTH - 160, 176, 140, 44)) game.goldButtonHovered = true;
  } else if (game.state === 'PAUSED') {
    game.pauseMenuButtons.forEach(b => {
      b.hovered = pointInRect(mx, my, b.x, b.y, b.w, b.h);
    });
    if (game._showSaveSlotSelect && game._pauseSaveSlotBounds) {
      for (let i = 0; i < game._pauseSaveSlotBounds.length; i++) {
        const s = game._pauseSaveSlotBounds[i];
        if (pointInRect(mx, my, s.x, s.y, s.w, s.h)) {
          game._pauseSaveSlotHovered = i;
          break;
        }
      }
      const cancelBtnY = 130 + 160 + 30;
      game._pauseCancelHovered = pointInRect(mx, my, GAME_WIDTH / 2 - 80, cancelBtnY, 160, 40);
    }
  } else if (game.state === 'SHOP') {
    for (let i = 0; i < game._shopItemBounds.length; i++) {
      const b = game._shopItemBounds[i];
      if (pointInRect(mx, my, b.x, b.y, b.w, b.h)) {
        game._shopItemHovered = i;
        break;
      }
    }
    const panelW = 620, panelH = 520;
    const panelX = (GAME_WIDTH - panelW - 180) / 2;
    const panelY = (GAME_HEIGHT - panelH) / 2;
    game._shopCloseHovered = pointInRect(mx, my, panelX + panelW / 2 - 60, panelY + panelH - 50, 120, 36);
  } else if (game.state === 'LEVEL_SELECT') {
    handleLevelSelectHover(game, mx, my);
  } else if (game.state === 'CHARACTER_SELECT') {
    for (let i = 0; i < game._charCardBounds.length; i++) {
      const c = game._charCardBounds[i];
      if (pointInRect(mx, my, c.x, c.y, c.w, c.h)) {
        game._charHovered = i;
        break;
      }
    }
    if (game._charConfirmBounds) {
      const b = game._charConfirmBounds;
      game._charConfirmHovered = pointInRect(mx, my, b.x, b.y, b.w, b.h);
    }
    if (game._charBackBounds) {
      const b = game._charBackBounds;
      game._charBackHovered = pointInRect(mx, my, b.x, b.y, b.w, b.h);
    }
  } else if (game.state === 'SAVE_SELECT') {
    for (let i = 0; i < game._saveSlotBounds.length; i++) {
      const s = game._saveSlotBounds[i];
      if (pointInRect(mx, my, s.x, s.y, s.w, s.h)) {
        game._saveSlotHovered = i;
        break;
      }
    }
    game._saveBackHovered = pointInRect(mx, my, GAME_WIDTH / 2 - 80, 100 + 200 + 30, 160, 44);
  } else if (game.state === 'SETTINGS') {
    for (let i = 0; i < game._settingsTabBounds.length; i++) {
      const t = game._settingsTabBounds[i];
      if (pointInRect(mx, my, t.x, t.y, t.w, t.h)) {
        game._settingsTabHovered = i;
        break;
      }
    }
    game._settingsBackHovered = pointInRect(mx, my, GAME_WIDTH / 2 - 80, GAME_HEIGHT - 70, 160, 44);
    if (game.settingsTab === 'bestiary') {
      for (let i = 0; i < (game._bestiaryCategoryBounds || []).length; i++) {
        const category = game._bestiaryCategoryBounds[i];
        if (pointInRect(mx, my, category.x, category.y, category.w, category.h)) {
          game._bestiaryCategoryHovered = i;
          break;
        }
      }
      for (const card of game._bestiaryCardBounds || []) {
        if (pointInRect(mx, my, card.x, card.y, card.w, card.h)) {
          game._bestiaryHoveredKey = card.key;
          break;
        }
      }
      const pageBounds = game._bestiaryPageBounds;
      if (pageBounds?.prev && pointInRect(mx, my, pageBounds.prev.x, pageBounds.prev.y, pageBounds.prev.w, pageBounds.prev.h)) {
        game._bestiaryPageHovered = 'prev';
      } else if (pageBounds?.next && pointInRect(mx, my, pageBounds.next.x, pageBounds.next.y, pageBounds.next.w, pageBounds.next.h)) {
        game._bestiaryPageHovered = 'next';
      }
    }
  } else if (game.state === 'POWERUP') {
    for (let i = 0; i < (game._powerUpRowBounds || []).length; i++) {
      const row = game._powerUpRowBounds[i];
      if (pointInRect(mx, my, row.x, row.y, row.w, row.h)) {
        game._powerUpHovered = i;
        break;
      }
    }
    if (game._powerUpBackBounds) {
      const b = game._powerUpBackBounds;
      game._powerUpBackHovered = pointInRect(mx, my, b.x, b.y, b.w, b.h);
    }
    if (game._powerUpRefundBounds) {
      const b = game._powerUpRefundBounds;
      game._powerUpRefundHovered = pointInRect(mx, my, b.x, b.y, b.w, b.h);
    }
  } else if (game.state === 'SKILLTREE') {
    handleSkillTreeHover(game, mx, my);
  } else if (game.state === 'ARCANA_SELECT') {
    for (let i = 0; i < game._arcanaCardBounds.length; i++) {
      const c = game._arcanaCardBounds[i];
      if (pointInRect(mx, my, c.x, c.y, c.w, c.h)) {
        game._arcanaHovered = i;
        break;
      }
    }
    game._arcanaSkipHovered = pointInRect(mx, my, GAME_WIDTH / 2 - 80, GAME_HEIGHT - 80, 160, 44);
  } else if (game.state === 'LEVEL_UP') {
    for (const [id, b] of Object.entries(game._levelUpControlBounds || {})) {
      if (pointInRect(mx, my, b.x, b.y, b.w, b.h)) {
        game._levelUpControlHovered = id;
        break;
      }
    }
    for (let i = 0; i < game._levelUpCardBounds.length; i++) {
      const c = game._levelUpCardBounds[i];
      if (pointInRect(mx, my, c.banishX, c.banishY, c.banishW, c.banishH)) {
        game._levelUpBanishHovered = i;
        break;
      }
      if (pointInRect(mx, my, c.sealX, c.sealY, c.sealW, c.sealH)) {
        game._levelUpSealHovered = i;
        break;
      }
      if (pointInRect(mx, my, c.x, c.y, c.w, c.h)) {
        game._levelUpHovered = i;
        break;
      }
    }
  } else if (game.state === 'INTERACTABLE_CHOICE') {
    for (let i = 0; i < (game._interactableChoiceBounds || []).length; i++) {
      const b = game._interactableChoiceBounds[i];
      if (pointInRect(mx, my, b.x, b.y, b.w, b.h)) {
        game._interactableChoiceHovered = i;
        break;
      }
    }
  } else if (game.state === 'GAME_OVER') {
    const retryX = GAME_WIDTH / 2 - 120, retryY = GAME_HEIGHT / 2 + 155;
    const menuX = GAME_WIDTH / 2 + 10, menuY = GAME_HEIGHT / 2 + 155;
    if (pointInRect(mx, my, retryX, retryY, 110, 40)) game.gameOverBtnHovered = 'retry';
    else if (pointInRect(mx, my, menuX, menuY, 110, 40)) game.gameOverBtnHovered = 'menu';
    else game.gameOverBtnHovered = null;
  }
}
