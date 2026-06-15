import { GAME_WIDTH, GAME_HEIGHT, FIXED_DT } from './config/constants.js';
import { Game } from './game/game-core.js';
import { handleHover } from './game/input-hover.js';
import { handleClick } from './game/input-click.js';
import { handleKeyboard } from './game/input-keyboard.js';

const canvas = document.getElementById('gameCanvas');
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

const game = new Game(canvas);
game.inputManager.bind(canvas, game);
game.gestureHandler.bind();

window.game = game;

let lastTime = performance.now();
let accumulator = 0;

function gameLoop(currentTime) {
  requestAnimationFrame(gameLoop);

  const frameTime = currentTime - lastTime;
  lastTime = currentTime;

  game.frameCount++;
  if (currentTime - game.lastFpsTime >= 1000) {
    game.fps = game.frameCount;
    game.frameCount = 0;
    game.lastFpsTime = currentTime;
  }

  handleKeyboard(game);
  handleHover(game);

  if (game.inputManager.consumeMouseDown()) {
    handleClick(game);
  }

  accumulator += frameTime;
  while (accumulator >= FIXED_DT) {
    game.update(FIXED_DT);
    accumulator -= FIXED_DT;
  }

  game.render();

  game.gestureHandler.render(game.ctx);
}

game.intro.start();
game.audio.startMusic('intro');
requestAnimationFrame(gameLoop);
