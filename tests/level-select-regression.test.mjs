import assert from 'node:assert/strict';

globalThis.Image = class {
  constructor() {
    this.complete = false;
    this.naturalWidth = 0;
    this.naturalHeight = 0;
  }
  set src(value) {
    this._src = value;
  }
  get src() {
    return this._src;
  }
};

const { renderLevelSelect, handleLevelSelectClick } = await import('../js/ui/render-level-select.js');
const { createDefaultMeta } = await import('../js/game/powerup-store.js');

function makeCtx() {
  return {
    fillStyle: '',
    strokeStyle: '',
    font: '',
    textAlign: '',
    textBaseline: '',
    shadowColor: '',
    shadowBlur: 0,
    lineWidth: 1,
    texts: [],
    beginPath() {},
    moveTo() {},
    lineTo() {},
    quadraticCurveTo() {},
    closePath() {},
    fill() {},
    stroke() {},
    fillRect() {},
    drawImage() {},
    measureText(text) { return { width: String(text).length * 12 }; },
    fillText(text, x, y) { this.texts.push({ text, x, y }); }
  };
}

const game = {
  selectedLevelIndex: 0,
  _levelHovered: -1,
  _levelConfirmHovered: false,
  _levelBackHovered: false,
  meta: createDefaultMeta(),
  audio: { playMenuClick() {} },
  setState(state) { this.state = state; }
};

const ctx = makeCtx();
renderLevelSelect(ctx, game);

assert.ok(game._levelConfirmBounds, 'unlocked first level should write a confirm hitbox');
assert.equal(ctx.texts.some(entry => entry.text === '选择此关卡'), true);

const b = game._levelConfirmBounds;
assert.equal(handleLevelSelectClick(game, b.x + b.w / 2, b.y + b.h / 2), true);
assert.equal(game.state, 'CHARACTER_SELECT');

console.log('level select regression tests passed');
