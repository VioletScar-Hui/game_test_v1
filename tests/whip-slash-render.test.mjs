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
globalThis.HTMLCanvasElement = class {};

const { WEAPON_ACTION_SHEETS } = await import('../js/config/assets.js');
const { WHIP_SLASH_SIZE_MULTIPLIER } = await import('../js/config/render-scale.js');
const { WhipSlash } = await import('../js/entities/cross-projectile.js');

const fakeFrame = new HTMLCanvasElement();
WEAPON_ACTION_SHEETS.whip = { slash: [fakeFrame] };

const calls = [];
const ctx = {
  globalAlpha: 1,
  save() {},
  restore() {},
  translate(x, y) { calls.push(['translate', x, y]); },
  rotate(angle) { calls.push(['rotate', angle]); },
  scale(x, y) { calls.push(['scale', x, y]); },
  drawImage(image, x, y, w, h) { calls.push(['drawImage', x, y, w, h]); }
};

const slash = new WhipSlash(100, 200, 0, Math.PI / 2, 80, 10, false, 'whip');
slash.render(ctx);

const draw = calls.find(call => call[0] === 'drawImage');
assert.ok(draw, 'whip slash should draw its action frame');
const expectedSize = 80 * WHIP_SLASH_SIZE_MULTIPLIER;
assert.equal(draw[1], -expectedSize / 2);
assert.equal(draw[2], -expectedSize / 2);
assert.equal(draw[3], expectedSize);
assert.equal(draw[4], expectedSize);

console.log('whip slash render tests passed');
