import assert from 'node:assert/strict';

globalThis.performance = { now: () => 1000 };
globalThis.window = {};
globalThis.HTMLCanvasElement = class {};
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

const { WEAPON_DEFS } = await import('../js/config/weapons-data.js');
const { Player } = await import('../js/entities/player.js');
const { Projectile } = await import('../js/entities/projectile.js');
const { CrossProjectile } = await import('../js/entities/cross-projectile.js');
const { EntityManager } = await import('../js/systems/entity-manager.js');

function makeGame() {
  const entityManager = new EntityManager();
  const player = new Player(100, 100);
  player.arcanaInventory = { has: () => false, getCount: () => 0 };
  const game = {
    player,
    entityManager,
    particles: [],
    audio: { playShoot() {}, playHit() {} },
    cameraShake: { shake() {} },
    mapBounds: { minX: -500, minY: -500, maxX: 500, maxY: 500 }
  };
  window.game = game;
  return game;
}

function makeEnemy() {
  return {
    type: 'enemy',
    enemyType: 'common',
    active: true,
    x: 100,
    y: 100,
    radius: 20,
    hp: 100,
    atk: 1,
    takeDamage(amount) {
      this.hp -= amount;
      if (this.hp <= 0) this.active = false;
    }
  };
}

{
  const game = makeGame();
  const player = game.player;
  player.weaponInventory.add('garlic_breath');
  const weapon = player.weaponInventory.weapons.garlic_breath;
  player.weaponTimers.garlic_breath = 9999;
  game.entityManager.add(makeEnemy());

  player._updateAreaWeapon(500, weapon, WEAPON_DEFS.garlic_breath, 'aura', game.entityManager);

  assert.ok(
    game.particles.some(p => p.weaponAction?.weaponId === 'garlic_breath' && p.weaponAction.action === 'loop'),
    'garlic_breath aura pulses should show loop action frames instead of invisible damage'
  );
}

{
  const game = makeGame();
  const enemy = makeEnemy();
  const projectile = new Projectile(100, 100, 0, 0, 20, 'holy_toast', { radius: 10 });
  game.entityManager.add(enemy);
  game.entityManager.add(projectile);

  game.entityManager._checkCollisions(game);

  const splash = game.particles.find(p => p.weaponAction?.weaponId === 'holy_toast' && p.weaponAction.action === 'splash');
  assert.ok(
    splash,
    'holy_toast projectile hits should show splash action frames'
  );
  assert.ok(splash.size <= 140, 'holy_toast splash impact should not obscure the playfield');
  assert.ok(splash.alpha <= 0.75, 'holy_toast splash impact should be translucent');
}

{
  const game = makeGame();
  const enemy = makeEnemy();
  const projectile = new Projectile(100, 100, 0, 0, 20, 'hot_sauce_bottle', { radius: 10 });
  game.entityManager.add(enemy);
  game.entityManager.add(projectile);

  game.entityManager._checkCollisions(game);

  const burn = game.particles.find(p => p.weaponAction?.weaponId === 'hot_sauce_bottle' && p.weaponAction.action === 'burn');
  assert.ok(
    burn,
    'hot_sauce_bottle projectile hits should show burn action frames'
  );
  assert.ok(burn.size <= 125, 'hot sauce burn impact should stay below enemy-cluster scale');
  assert.ok(burn.alpha <= 0.72, 'hot sauce burn impact should be translucent');
}

{
  const game = makeGame();
  const enemy = makeEnemy();
  const projectile = new CrossProjectile(100, 100, 0, 0, 20, 200, 0, {
    radius: 10,
    weaponName: 'cross'
  });
  game.entityManager.add(enemy);
  game.entityManager.add(projectile);

  game.entityManager._checkCollisions(game);

  const impact = game.particles.find(p => p.weaponAction?.weaponId === 'cross' && p.weaponAction.action === 'impact');
  assert.ok(
    impact,
    'cross projectile hits should show impact action frames'
  );
  assert.ok(impact.size <= 120, 'cross impact should stay compact enough to keep enemies readable');
  assert.ok(impact.alpha <= 0.72, 'cross impact should be translucent');
}

console.log('weapon visual runtime tests passed');
