import { addFunctionalActionEffect, consumeMichelinDeathPrevent } from '../game/functional-weapons.js';

export class EntityManager {
  constructor() {
    this.entities = [];
  }

  add(entity) {
    this.entities.push(entity);
  }

  remove(entity) {
    entity.active = false;
  }

  getAll() {
    return this.entities.filter(e => e.active);
  }

  getByType(type) {
    return this.entities.filter(e => e.active && e.type === type);
  }

  update(dt, game) {
    for (let i = this.entities.length - 1; i >= 0; i--) {
      const e = this.entities[i];
      if (!e.active) {
        this.entities.splice(i, 1);
        continue;
      }
      if (e.type === 'drop') {
        const result = e.update(dt, game.player);
        if (result) {
          game.handleDropPickup(result);
          e.active = false;
          this.entities.splice(i, 1);
          continue;
        }
      } else if (e.type === 'whip_slash') {
        e.update(dt, this);
        if (!e.active) {
          this.entities.splice(i, 1);
          continue;
        }
      } else {
        e.update(dt, game);
      }
    }
    this._checkCollisions(game);
  }

  _checkCollisions(game) {
    const enemies = this.getByType('enemy');
    const projectiles = this.getByType('projectile');
    const player = game.player;

    for (const proj of projectiles) {
      if (!proj.active) continue;
      for (const enemy of enemies) {
        if (!enemy.active) continue;
        if (proj.hitEnemies?.has(enemy)) continue;
        const dx = proj.x - enemy.x;
        const dy = proj.y - enemy.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < proj.radius + enemy.radius) {
          enemy.takeDamage(proj.damage);
          if (!proj.hitEnemies) proj.hitEnemies = new Set();
          if (typeof proj.handleHit === 'function') {
            proj.handleHit(enemy, enemies, game);
          } else if (proj.pierceLeft !== undefined && proj.pierceLeft > 0) {
            proj.hitEnemies.add(enemy);
            proj.pierceLeft--;
          } else {
            proj.active = false;
          }
          break;
        }
      }
    }

    if (player && player.active) {
      for (const enemy of enemies) {
        if (!enemy.active) continue;
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < player.radius + enemy.radius) {
          if (player.invincibleTimer <= 0) {
            const armor = player.getArmor ? player.getArmor() : 0;
            let damage = Math.max(1, enemy.atk - armor);
            if (player.arcanaInventory?.has('priestess')) damage = Math.ceil(damage * 1.2);
            if (player.shield > 0) {
              const absorbed = Math.min(player.shield, damage);
              player.shield -= absorbed;
              damage -= absorbed;
              reduceShieldLayer(player, absorbed);
            }
            const cloakState = player.functionalState?.michelin_cloak;
            if (cloakState && cloakState.layers >= 3 && enemy.takeDamage) {
              enemy.takeDamage(Math.max(8, Math.floor(enemy.atk * 1.2)));
            }
            player.hp -= damage;
            player.invincibleTimer = 500;
            player.triggerHitAnim();
            game.cameraShake.shake(5, 200);
            game.audio.playHit();
            if (player.hp <= 0) {
              if (player.revivals > 0) {
                player.revivals--;
                player.hp = Math.max(1, Math.floor(player.maxHp * 0.5));
                player.invincibleTimer = 1600;
                game.cameraShake.shake(10, 260);
                return;
              }
              if (consumeMichelinDeathPrevent(player)) {
                addFunctionalActionEffect(game, 'michelin_cloak', 'revive', { size: 340, life: 760 });
                return;
              }
              player.hp = 0;
              player.active = false;
              player.anim.play('death', true);
              game.gameOver();
            }
          }
        }
      }
    }
  }

  render(ctx) {
    const drops = [];
    const enemies = [];
    const projectiles = [];
    const slashes = [];
    const others = [];

    for (const e of this.entities) {
      if (!e.active) continue;
      if (e.type === 'drop') drops.push(e);
      else if (e.type === 'enemy') enemies.push(e);
      else if (e.type === 'projectile') projectiles.push(e);
      else if (e.type === 'whip_slash') slashes.push(e);
      else others.push(e);
    }

    drops.forEach(e => e.render(ctx));
    slashes.forEach(e => e.render(ctx));
    projectiles.forEach(e => e.render(ctx));
    enemies.forEach(e => e.render(ctx));
    others.forEach(e => e.render(ctx));
  }

  clear() {
    this.entities = [];
  }

  count() {
    return this.entities.filter(e => e.active).length;
  }
}

function reduceShieldLayer(player, absorbed) {
  if (!player.functionalState || absorbed <= 0) return;
  for (const id of ['thermal_bag', 'michelin_cloak']) {
    const state = player.functionalState[id];
    if (!state || state.layers <= 0) continue;
    const perLayer = id === 'michelin_cloak' ? 90 : 55;
    state.layers = Math.max(0, Math.ceil((player.shield || 0) / perLayer));
  }
}
