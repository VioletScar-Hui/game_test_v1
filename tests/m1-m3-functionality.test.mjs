import assert from 'node:assert/strict';

global.Image = class MockImage {
  constructor() {
    this.complete = false;
    this.naturalWidth = 0;
    this.naturalHeight = 0;
    this.width = 0;
    this.height = 0;
    this.onload = null;
    this._src = '';
  }

  set src(value) {
    this._src = value;
  }

  get src() {
    return this._src;
  }
};
global.HTMLCanvasElement = class MockCanvas {};
global.performance = global.performance || { now: () => 0 };

const { CHARACTERS } = await import('../js/config/characters.js');
const { CrossProjectile } = await import('../js/entities/cross-projectile.js');
const { Player } = await import('../js/entities/player.js');
const { Projectile } = await import('../js/entities/projectile.js');
const { EntityManager } = await import('../js/systems/entity-manager.js');

function makeEnemy(x, y) {
  return {
    type: 'enemy',
    active: true,
    x,
    y,
    radius: 12,
    hp: 100,
    takeDamage(amount) {
      this.hp -= amount;
      this.hits = (this.hits || 0) + 1;
    }
  };
}

const bounceManager = new EntityManager();
const bounceProjectile = new CrossProjectile(0, 0, 0.45, 0, 10, 300, 2, {
  mode: 'bounce',
  bounceLeft: 2,
  weaponName: 'bouncing_slipper'
});
const bounceEnemies = [makeEnemy(0, 0), makeEnemy(80, 0), makeEnemy(160, 0)];
bounceManager.entities.push(bounceProjectile, ...bounceEnemies);
bounceManager._checkCollisions({ player: null });
assert.equal(bounceEnemies[0].hits, 1, 'bounce projectile should hit the first target once');
assert.equal(bounceProjectile.active, true, 'bounce projectile should stay alive after finding a next target');
assert.equal(bounceProjectile.hitEnemies.has(bounceEnemies[0]), true);
assert.equal(bounceProjectile.bounceLeft, 1);
assert.equal(Math.abs(bounceProjectile.vx) > 0, true, 'bounce projectile should redirect after hit');

bounceProjectile.x = 80;
bounceProjectile.y = 0;
bounceManager._checkCollisions({ player: null });
assert.equal(bounceEnemies[0].hits, 1, 'bounce projectile should not spend another hit on the same target');
assert.equal(bounceEnemies[1].hits, 1, 'bounce projectile should hit the redirected target');

const pierceManager = new EntityManager();
const pierceProjectile = new Projectile(0, 0, 0, 0, 7, 'throwing_chopsticks', { pierce: 1, radius: 10 });
const pierceEnemies = [makeEnemy(0, 0), makeEnemy(0, 0)];
pierceManager.entities.push(pierceProjectile, ...pierceEnemies);
pierceManager._checkCollisions({ player: null });
pierceManager._checkCollisions({ player: null });
assert.equal(pierceEnemies[0].hits, 1, 'piercing projectile should not repeatedly hit the same enemy');
assert.equal(pierceEnemies[1].hits, 1, 'piercing projectile should continue to a second enemy');
assert.equal(pierceProjectile.active, false, 'piercing projectile should expire after pierce is consumed');

const littleAntonio = CHARACTERS.find(char => char.id === 'little_antonio');
assert.ok(littleAntonio, 'Little Antonio should be selectable in character data');
const player = new Player(0, 0);
player.applyCharacterStats(littleAntonio);
assert.equal(player.weaponInventory.getAll().length, 1, 'Little Antonio should receive one random starting weapon');
assert.equal(player.goldGainMultiplier, 1.3, 'Little Antonio should apply +30% gold gain');

console.log('m1-m3 functionality tests passed');
