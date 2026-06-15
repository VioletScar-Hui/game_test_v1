import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { MENU_BG_IMAGE } from '../config/assets.js';
import { drawCoverImage, drawRoundedRect } from '../ui/helpers.js';
import { renderWorld, renderDeathQuotes, renderDamageVignette, renderBossSpawnQuote } from '../ui/render-world.js';
import { renderHUD } from '../ui/render-hud.js';
import { renderPaused } from '../ui/render-paused.js';
import { renderShop } from '../ui/render-shop.js';
import { renderGameOver } from '../ui/render-game-over.js';
import { renderVictory } from '../ui/render-victory.js';
import { renderLevelSelect } from '../ui/render-level-select.js';
import { renderCharacterSelect } from '../ui/render-character-select.js';
import { renderSaveSelect } from '../ui/render-save-select.js';
import { renderSettings } from '../ui/render-settings.js';
import { renderArcanaSelect } from '../ui/render-arcana.js';
import { renderPlayingButtons } from '../ui/render-playing-buttons.js';
import { renderLevelLoading } from '../ui/render-level-loading.js';
import { renderLevelUp } from '../ui/render-levelup.js';
import { renderChest } from '../ui/render-chest.js';
import { renderPowerUp } from '../ui/render-powerup.js';
import { renderSkillTree } from '../ui/render-skilltree.js';
import { renderInteractableChoice } from '../ui/render-interactable-choice.js';

function renderMainMenuChrome(ctx, game) {
  if (!drawCoverImage(ctx, MENU_BG_IMAGE, 0, 0, GAME_WIDTH, GAME_HEIGHT)) {
    ctx.fillStyle = '#05060a';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  }

  const sideShade = ctx.createLinearGradient(0, 0, GAME_WIDTH, 0);
  sideShade.addColorStop(0, 'rgba(0, 0, 0, 0.72)');
  sideShade.addColorStop(0.32, 'rgba(0, 0, 0, 0.42)');
  sideShade.addColorStop(0.62, 'rgba(0, 0, 0, 0.20)');
  sideShade.addColorStop(1, 'rgba(0, 0, 0, 0.50)');
  ctx.fillStyle = sideShade;
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  const bottomShade = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
  bottomShade.addColorStop(0, 'rgba(0, 0, 0, 0.16)');
  bottomShade.addColorStop(0.58, 'rgba(0, 0, 0, 0.08)');
  bottomShade.addColorStop(1, 'rgba(0, 0, 0, 0.46)');
  ctx.fillStyle = bottomShade;
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  const panelX = 58;
  const panelY = 270;
  const panelW = 344;
  const panelH = 374;
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
  ctx.shadowBlur = 26;
  ctx.shadowOffsetY = 10;
  drawRoundedRect(ctx, panelX, panelY, panelW, panelH, 8);
  ctx.fillStyle = 'rgba(7, 9, 15, 0.78)';
  ctx.fill();
  ctx.restore();

  drawRoundedRect(ctx, panelX, panelY, panelW, panelH, 8);
  ctx.strokeStyle = 'rgba(255, 212, 59, 0.28)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#ffd43b';
  ctx.fillRect(panelX, panelY + 20, 4, 42);

  ctx.fillStyle = '#f8f1d8';
  ctx.font = 'bold 18px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('MAIN MENU', panelX + 22, panelY + 38);

  const notes = game.meta?.m4?.notes?.length || 0;
  const stars = game.meta?.m4?.starCurrency || 0;
  ctx.fillStyle = '#9d9788';
  ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.fillText(`Notes ${notes}/12   Stars ${stars}`, panelX + 22, panelY + 58);
}

export function renderGame(game) {
  const ctx = game.ctx;
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  if (game.intro.active) {
    game.intro.render(ctx);
    return;
  }

  if (game.loading.active) {
    game.loading.render(ctx);
    return;
  }

  if (game.state === 'MENU') {
    if (!drawCoverImage(ctx, MENU_BG_IMAGE, 0, 0, GAME_WIDTH, GAME_HEIGHT)) {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    }
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 52px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 12;
    ctx.fillText('Vampire Survivors', GAME_WIDTH / 2, GAME_HEIGHT / 2 - 120);
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ccc';
    ctx.font = '18px sans-serif';
    ctx.fillText('Spiceland 的永恒饥饿诅咒', GAME_WIDTH / 2, GAME_HEIGHT / 2 - 70);
    renderMainMenuChrome(ctx, game);
    game.menuButtons.forEach(b => b.render(ctx));
    return;
  }

  if (game.state === 'LEVEL_SELECT') { renderLevelSelect(ctx, game); return; }
  if (game.state === 'CHARACTER_SELECT') { renderCharacterSelect(ctx, game); return; }
  if (game.state === 'SAVE_SELECT') { renderSaveSelect(ctx, game); return; }
  if (game.state === 'POWERUP') { renderPowerUp(ctx, game); return; }
  if (game.state === 'SKILLTREE') { renderSkillTree(ctx, game); return; }
  if (game.state === 'SETTINGS') { renderSettings(ctx, game); return; }

  if (game.state === 'LEVEL_LOADING') {
    renderLevelLoading(ctx, game);
    return;
  }

  renderWorld(ctx, game);
  renderDeathQuotes(ctx, game);
  renderDamageVignette(ctx, game);
  renderBossSpawnQuote(ctx, game);
  renderHUD(ctx, game);

  if (game.state === 'PLAYING') {
    renderPlayingButtons(ctx, game);
  }

  if (game.state === 'PAUSED') {
    renderPaused(ctx, game);
  }

  if (game.state === 'SHOP') {
    renderShop(ctx, game);
  }

  if (game.state === 'ARCANA_SELECT') {
    renderArcanaSelect(ctx, game);
  }

  if (game.state === 'LEVEL_UP') {
    renderLevelUp(ctx, game);
  }

  if (game.state === 'CHEST_OPEN') {
    renderChest(ctx, game);
  }

  if (game.state === 'INTERACTABLE_CHOICE') {
    renderInteractableChoice(ctx, game);
  }

  if (game.state === 'GAME_OVER') {
    renderGameOver(ctx, game);
  }

  if (game.state === 'VICTORY') {
    renderVictory(ctx, game);
  }
}
