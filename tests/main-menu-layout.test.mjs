import assert from 'node:assert/strict';
import fs from 'node:fs';

const gameCoreSource = fs.readFileSync('js/game/game-core.js', 'utf8');
const gameRenderSource = fs.readFileSync('js/game/game-render.js', 'utf8');

const startY = Number(gameCoreSource.match(/const startY = (\d+);/)?.[1]);
const btnH = Number(gameCoreSource.match(/const btnW = \d+, btnH = (\d+), gap = \d+;/)?.[1]);
const gap = Number(gameCoreSource.match(/const btnW = \d+, btnH = \d+, gap = (\d+);/)?.[1]);
const panelY = Number(gameRenderSource.match(/const panelY = (\d+);/)?.[1]);
const panelH = Number(gameRenderSource.match(/const panelH = (\d+);/)?.[1]);

assert.equal(Number.isFinite(startY), true, 'main menu startY should be readable');
assert.equal(Number.isFinite(panelY), true, 'main menu panelY should be readable');
assert.equal(Number.isFinite(panelH), true, 'main menu panelH should be readable');

const statsBaselineY = panelY + 58;
const minButtonTopY = statsBaselineY + 20;
assert.ok(
  startY >= minButtonTopY,
  `first menu button should start at least 20px below stats baseline (${startY} < ${minButtonTopY})`
);

const buttonCount = 5;
const lastButtonBottom = startY + (buttonCount - 1) * (btnH + gap) + btnH;
const minPanelBottom = lastButtonBottom + 24;
assert.ok(
  panelY + panelH >= minPanelBottom,
  `menu panel should contain all buttons with bottom padding (${panelY + panelH} < ${minPanelBottom})`
);

console.log('main menu layout tests passed');
