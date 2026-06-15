import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const requiredAssets = [
  ...['Whip.png', 'Cross.png', 'Throwing Chopsticks.png', 'Holy Toast.png', 'Garlic Breath.png', 'Rolling Pin.png', 'Hot Sauce Bottle.png']
    .map(name => ({ rel: `assest/weapons/${name}` })),
  { rel: 'assest/drops/Chicken Leg.png', width: 512, height: 512, alpha: true },
  ...['Bubble Foam.png', 'Empty Boba Cup.png', 'Family Recipe.png', 'Running Shoes.png', 'Lucky Cat Charm.png', 'Fitness Bracer.png', 'Magnifying Glass.png', 'Takeout Lid.png']
    .map(name => ({ rel: `assest/passives/${name}` })),
  ...['Divine Slipper.png', 'Excalibur Ladle.png', 'Meat Grinder.png', 'Infinite Hot Pot.png']
    .map(name => ({ rel: `assest/weapons/${name}` })),
  ...['max_health.png', 'damage.png', 'attack_speed.png', 'move_speed.png', 'magnet.png', 'luck.png', 'gold_gain.png', 'revival.png']
    .map(name => ({ rel: `assest/powerups/${name}`, width: 256, height: 256, alpha: true })),
  ...['picnic_campfire.png', 'curse_altar.png', 'bill_pile.png', 'package.png', 'mirror.png']
    .map(name => ({ rel: `assest/interactables/${name}`, width: 512, height: 512, alpha: true })),
  { rel: 'assest/ui/arcana_atlas.png', alpha: true },
  { rel: 'assest/ui/chest.png', alpha: true },
  { rel: 'assest/characters/Little Antonio Spicy.png', width: 512, height: 512, alpha: true },
  { rel: 'assest/characters/Little Antonio Spicy1.png', width: 512, height: 512, alpha: true },
  { rel: 'assest/backgrounds/moonboba.png', width: 1254, height: 1254 },
  ...['Thermal Bag.png', 'Freezer Gate.png', 'Service Bell.png', 'Michelin Cloak.png', 'Infinite Buffet.png', 'Gorgeous Moonboba.png']
    .map(name => ({ rel: `assest/weapons/${name}`, width: 512, height: 512, alpha: true }))
];

for (const asset of requiredAssets) {
  const absolute = path.join(root, asset.rel);
  assert.ok(fs.existsSync(absolute), `${asset.rel} should exist`);
  const stat = fs.statSync(absolute);
  assert.ok(stat.size > 1000, `${asset.rel} should not be an empty placeholder`);
  if (!asset.width && !asset.height && !asset.alpha) continue;
  const meta = readPngMeta(absolute);
  if (asset.width) assert.equal(meta.width, asset.width, `${asset.rel} width`);
  if (asset.height) assert.equal(meta.height, asset.height, `${asset.rel} height`);
  if (asset.alpha) assert.equal(meta.hasAlpha, true, `${asset.rel} should have alpha`);
}

function readPngMeta(file) {
  const buffer = fs.readFileSync(file);
  assert.equal(buffer.toString('ascii', 1, 4), 'PNG', `${file} should be a PNG`);
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  const colorType = buffer.readUInt8(25);
  return {
    width,
    height,
    hasAlpha: colorType === 4 || colorType === 6
  };
}

console.log('m1-m3 asset file tests passed');
