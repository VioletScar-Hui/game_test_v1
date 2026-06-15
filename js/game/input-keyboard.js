export function handleKeyboard(game) {
  const input = game.inputManager;

  if (input.isKeyDown('Escape')) {
    input.keys['Escape'] = false;
    if (game.state === 'PLAYING') {
      game.state = 'PAUSED';
      game._initPauseMenu();
      game._showSaveSlotSelect = false;
    } else if (game.state === 'PAUSED') {
      if (game._showSaveSlotSelect) {
        game._showSaveSlotSelect = false;
      } else {
        game.state = 'PLAYING';
      }
    } else if (game.state === 'SHOP') {
      game.state = 'PLAYING';
    } else if (game.state === 'GAME_OVER') {
      game.state = 'MENU';
    } else if (game.state === 'VICTORY') {
      game.state = 'MENU';
    } else if (game.state === 'SETTINGS') {
      game.state = 'MENU';
    } else if (game.state === 'POWERUP') {
      game.state = 'MENU';
    } else if (game.state === 'SKILLTREE') {
      game.state = 'MENU';
    } else if (game.state === 'LEVEL_SELECT') {
      game.state = 'MENU';
    } else if (game.state === 'CHARACTER_SELECT') {
      game.state = 'LEVEL_SELECT';
    } else if (game.state === 'SAVE_SELECT') {
      game.state = 'MENU';
    } else if (game.state === 'ARCANA_SELECT') {
      game.state = 'PLAYING';
    } else if (game.state === 'CHEST_OPEN') {
      game.closeChest();
    } else if (game.state === 'INTERACTABLE_CHOICE') {
      game.pendingInteractableChoice = null;
      game.state = 'PLAYING';
    }
  }

  if (game.state === 'SETTINGS' && game.settingsTab === 'bestiary') {
    const wheelDelta = input.consumeWheelDelta ? input.consumeWheelDelta() : 0;
    if (wheelDelta !== 0) {
      turnBestiaryPage(game, wheelDelta > 0 ? 1 : -1);
    }
    if (input.isKeyDown('ArrowLeft') || input.isKeyDown('PageUp') || input.isKeyDown('KeyA')) {
      input.keys['ArrowLeft'] = false;
      input.keys['PageUp'] = false;
      input.keys['KeyA'] = false;
      turnBestiaryPage(game, -1);
    }
    if (input.isKeyDown('ArrowRight') || input.isKeyDown('PageDown') || input.isKeyDown('KeyD')) {
      input.keys['ArrowRight'] = false;
      input.keys['PageDown'] = false;
      input.keys['KeyD'] = false;
      turnBestiaryPage(game, 1);
    }
  }

  if (game.state === 'PLAYING' && game.player) {
    if (input.isKeyDown('Space')) {
      input.keys['Space'] = false;
      if (game.player.burstSkill.fire(game.player, game.entityManager)) {
        game.player.triggerSkillAnim();
      }
    }
    if (input.isKeyDown('ShiftLeft') || input.isKeyDown('ShiftRight')) {
      input.keys['ShiftLeft'] = false;
      input.keys['ShiftRight'] = false;
      game.player.startDash();
    }
  }

  if (game.state === 'LEVEL_LOADING') {
    if (input.isKeyDown('Space') || input.isKeyDown('Enter') || input.isKeyDown('Escape')) {
      input.keys['Space'] = false;
      input.keys['Enter'] = false;
      input.keys['Escape'] = false;
      game.state = 'PLAYING';
    }
  }

  if (game.state === 'CHEST_OPEN') {
    if (input.isKeyDown('Space') || input.isKeyDown('Enter')) {
      input.keys['Space'] = false;
      input.keys['Enter'] = false;
      game.closeChest();
    }
  }

  if (game.intro.active) {
    const anyKey = Object.values(input.keys).some(v => v);
    if (anyKey) {
      Object.keys(input.keys).forEach(k => input.keys[k] = false);
      game.intro.skip();
    }
  }
}

function turnBestiaryPage(game, delta) {
  const totalPages = game._bestiaryPageInfo?.totalPages || 1;
  const maxPage = Math.max(0, totalPages - 1);
  const nextPage = Math.max(0, Math.min(maxPage, (game._bestiaryPage || 0) + delta));
  if (nextPage !== game._bestiaryPage) {
    game._bestiaryPage = nextPage;
    game._bestiarySelectedKey = null;
    if (game.audio) game.audio.playMenuClick();
  }
}
