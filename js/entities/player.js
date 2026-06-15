import { Entity } from './entity.js';
import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { WEAPON_DEFS, EVOLUTION_DEFS } from '../config/weapons-data.js';
import { PASSIVE_DEFS } from '../config/passives-data.js';
import { WeaponInventory } from './weapon-system.js';
import { PassiveInventory } from './passive-inventory.js';
import { BurstSkill } from './items.js';
import { WhipSlash } from './cross-projectile.js';
import { CrossProjectile } from './cross-projectile.js';
import { Projectile } from './projectile.js';
import { createAnimationParams, resolveAnimationState } from '../config/animation-data.js';
import { PLAYER_ANIM_SIZE_MULTIPLIER, PLAYER_STATIC_SIZE_MULTIPLIER } from '../config/render-scale.js';
import { AnimationController } from '../systems/animation.js';
import { expToNextLevel } from '../game/game-balance.js';
import { addWeaponActionEffect, applyFunctionalWeaponTick } from '../game/functional-weapons.js';

export class Player extends Entity {
  constructor(x, y) {
    super(x, y, 25);
    this.type = 'player';
    this.speed = 0.4;
    this.maxHp = 1000;
    this.hp = 1000;
    this.shield = 0;
    this.sprite = null;
    this.bounds = { minX: 0, minY: 0, maxX: GAME_WIDTH, maxY: GAME_HEIGHT };
    this.exp = 0;
    this.gold = 0;
    this.baseAttack = 20;
    this.attackBonus = 0;
    this.kills = 0;
    this.level = 1;
    this.pendingLevelUps = 0;
    this.invincibleTimer = 0;
    this.burstSkill = new BurstSkill();
    this.charData = null;
    this.moveSpeedMultiplier = 1.0;
    this.powerMultiplier = 1.0;
    this.attackSpeedMultiplier = 1.0;
    this.areaMultiplier = 1.0;
    this.magnetMultiplier = 1.0;
    this.luckMultiplier = 1.0;
    this.armorBonus = 0;
    this.expGainMultiplier = 1.0;
    this.goldGainMultiplier = 1.0;
    this.revivals = 0;
    this.functionalState = {};
    this.powerUpModifiers = {
      maxHp: 1,
      damage: 1,
      attackSpeed: 1,
      moveSpeed: 1,
      magnet: 1,
      luck: 1,
      goldGain: 1,
      revivals: 0
    };
    this.weaponInventory = new WeaponInventory();
    this.passiveInventory = new PassiveInventory();
    this.weaponTimers = {};
    this.orbitAngles = {};
    this.facingAngle = 0;
    this.dashCooldown = 0;
    this.dashCooldownMax = 1500;
    this.dashSpeed = 3.0;
    this.dashDuration = 0;
    this.dashDurationMax = 120;
    this.dashDirX = 0;
    this.dashDirY = 0;
    this.isDashing = false;
    this.arcanaInventory = null;
    this.anim = new AnimationController();
    this._hitAnim = false;
    this._hitAnimTimer = 0;
    this._isUsingSkill = false;
    this._skillAnimTimer = 0;
    this._facingLeft = false;
    this._animDirection = 'down';
    this.animParams = null;
  }

  applyCharacterStats(char) {
    if (!char) return;
    this.charData = char;
    this.maxHp = Math.floor(1000 * (char.stats.maxHp / 100));
    this.hp = this.maxHp;
    this.moveSpeedMultiplier = char.stats.moveSpeed;
    this.powerMultiplier = char.stats.power;
    this.attackSpeedMultiplier = char.stats.attackSpeed;
    this.areaMultiplier = char.stats.area || 1;
    this.magnetMultiplier = char.stats.magnet || 1;
    this.luckMultiplier = char.stats.luck || 1;
    this.expGainMultiplier = 1.0 + (char.passive.effects.expGain || 0);
    const randomStartWeaponIds = Array.isArray(char.randomStartWeaponIds)
      ? char.randomStartWeaponIds.filter(Boolean)
      : [];
    if (randomStartWeaponIds.length > 0) {
      const index = Math.floor(Math.random() * randomStartWeaponIds.length);
      this.weaponInventory.add(randomStartWeaponIds[index]);
    } else if (char.startWeaponId) {
      this.weaponInventory.add(char.startWeaponId);
    }
    this.recalcStats();
  }

  getLevel() { return this.level; }

  expToNextLevel() {
    return expToNextLevel(this.level);
  }

  getAttack() {
    return Math.floor((this.baseAttack + this.attackBonus) * this.powerMultiplier);
  }

  getArmor() {
    return this.armorBonus;
  }

  recalcStats() {
    const char = this.charData;
    if (!char) return;
    const hpRatio = this.maxHp > 0 ? this.hp / this.maxHp : 1;
    this.maxHp = Math.floor(1000 * ((char.stats.maxHp || 100) / 100) * (this.powerUpModifiers.maxHp || 1));
    this.hp = Math.max(1, Math.min(this.maxHp, Math.floor(this.maxHp * hpRatio)));
    this.moveSpeedMultiplier = (char.stats.moveSpeed || 1) * (1 + this.passiveInventory.getModifier('speed')) * (this.powerUpModifiers.moveSpeed || 1);
    this.powerMultiplier = (char.stats.power || 1) * (1 + this.passiveInventory.getModifier('damage')) * (this.powerUpModifiers.damage || 1);
    this.attackSpeedMultiplier = (char.stats.attackSpeed || 1) * (1 + this.passiveInventory.getModifier('cooldown')) * (this.powerUpModifiers.attackSpeed || 1);
    this.areaMultiplier = (char.stats.area || 1) * (1 + this.passiveInventory.getModifier('area'));
    this.magnetMultiplier = (char.stats.magnet || 1) * (1 + this.passiveInventory.getModifier('magnet')) * (this.powerUpModifiers.magnet || 1);
    this.luckMultiplier = (char.stats.luck || 1) * (1 + this.passiveInventory.getModifier('luck')) * (this.powerUpModifiers.luck || 1);
    this.armorBonus = Math.floor(this.passiveInventory.getModifier('armor') + (this.powerUpModifiers.armor || 0));
    this.expGainMultiplier = 1.0 + (char.passive.effects.expGain || 0) + this.passiveInventory.getModifier('growth');
    this.goldGainMultiplier = (1 + (char.passive.effects.goldGain || 0)) * (this.powerUpModifiers.goldGain || 1);
    this.revivals = this.powerUpModifiers.revivals || 0;
  }

  addExp(amount) {
    this.exp += Math.floor(amount * this.expGainMultiplier);
    while (this.exp >= this.expToNextLevel()) {
      this.exp -= this.expToNextLevel();
      this.level++;
      this.pendingLevelUps++;
    }
    if (this.pendingLevelUps > 0 && window.game && window.game.state === 'PLAYING') {
      window.game.requestLevelUp();
    }
  }

  setSprite(img) { this.sprite = img; }

  loadAnimSheets(sheets) {
    if (!sheets) return;
    for (const [action, sheet] of Object.entries(sheets)) {
      const isFrameSet = Array.isArray(sheet) ||
        (sheet && typeof sheet === 'object' && Object.values(sheet).some(value => Array.isArray(value)));
      if (isFrameSet) {
        this.anim.loadFrames(action, sheet);
      } else {
        this.anim.loadSpriteSheet(action, sheet);
      }
    }
  }

  setWeapon(weaponData) {
    if (weaponData?.id) this.weaponInventory.add(weaponData.id);
  }

  setBounds(minX, minY, maxX, maxY) {
    this.bounds = { minX, minY, maxX, maxY };
  }

  getUpgradeInventory() {
    return {
      weapons: cloneInventoryPlain(this.weaponInventory.weapons),
      passives: cloneInventoryPlain(this.passiveInventory.passives),
      gold: this.gold,
      hp: this.hp,
      maxHp: this.maxHp
    };
  }

  applyUpgradeInventory(inventory) {
    this.weaponInventory.weapons = cloneInventoryPlain(inventory.weapons || {});
    this.passiveInventory.passives = cloneInventoryPlain(inventory.passives || {});
    this.gold = inventory.gold ?? this.gold;
    this.hp = inventory.hp ?? this.hp;
    this.recalcStats();
  }

  update(dt) {
    if (this.invincibleTimer > 0) this.invincibleTimer -= dt;
    if (this.dashCooldown > 0) this.dashCooldown -= dt;

    if (this._hitAnim) {
      this._hitAnimTimer -= dt;
      if (this._hitAnimTimer <= 0) this._hitAnim = false;
    }
    if (this._isUsingSkill) {
      this._skillAnimTimer -= dt;
      if (this._skillAnimTimer <= 0) this._isUsingSkill = false;
    }

    if (this.isDashing) {
      this.dashDuration -= dt;
      this.vx = this.dashDirX * this.dashSpeed;
      this.vy = this.dashDirY * this.dashSpeed;
      if (this.dashDuration <= 0) this.isDashing = false;
    } else {
      const input = window.game.inputManager.getDirection();
      if (input.x !== 0 || input.y !== 0) {
        this.facingAngle = Math.atan2(input.y, input.x);
        if (input.x < 0) this._facingLeft = true;
        if (input.x > 0) this._facingLeft = false;
      }
      this.vx = input.x * this.speed * this.moveSpeedMultiplier;
      this.vy = input.y * this.speed * this.moveSpeedMultiplier;
    }

    super.update(dt);
    this.x = Math.max(this.bounds.minX + this.radius, Math.min(this.bounds.maxX - this.radius, this.x));
    this.y = Math.max(this.bounds.minY + this.radius, Math.min(this.bounds.maxY - this.radius, this.y));

    this._updateWeapons(dt);
    this.burstSkill.update(dt);

    this.animParams = createAnimationParams(this, window.game.inputManager);
    this._animDirection = this.animParams.direction;
    this.anim.setDirection(this._animDirection);
    const animState = resolveAnimationState(this.animParams);
    this.anim.play(animState);
    this.anim.update(dt);
  }

  _updateWeapons(dt) {
    const em = window.game.entityManager;
    for (const weapon of this.weaponInventory.getAll()) {
      const def = WEAPON_DEFS[weapon.id] || EVOLUTION_DEFS[weapon.id];
      if (!def) continue;
      const behavior = def.behavior || WEAPON_DEFS[def.baseWeaponId]?.behavior;
      if (def.functional || ['shield', 'freeze', 'clear'].includes(behavior)) {
        applyFunctionalWeaponTick(window.game, weapon, dt);
        continue;
      }
      if (behavior === 'orbit' || behavior === 'aura') {
        this._updateAreaWeapon(dt, weapon, def, behavior, em);
      } else {
        this._updateTimedWeapon(dt, weapon, def, behavior, em);
      }
    }
  }

  _updateTimedWeapon(dt, weapon, def, behavior, em) {
    const baseDef = WEAPON_DEFS[def.baseWeaponId] || def;
    const timerKey = weapon.id;
    this.weaponTimers[timerKey] = (this.weaponTimers[timerKey] || 0) + dt;
    let fireRate = this._weaponFireRate(baseDef, weapon);
    if (this.weaponTimers[timerKey] < fireRate) return;
    const chargedTime = this.weaponTimers[timerKey];
    this.weaponTimers[timerKey] = 0;

    const count = this._weaponCount(baseDef, weapon);
    const damage = this._weaponDamage(baseDef, weapon, def, chargedTime);
    const range = this._weaponRange(baseDef, weapon);
    const pierce = this._weaponPierce(baseDef, weapon);
    const nearest = this._findNearestEnemy(range);
    if (!nearest && behavior !== 'sweep') return;

    if (behavior === 'sweep') {
      const arc = (baseDef.baseArc || Math.PI / 3) * (weapon.level >= 7 ? 1.2 : 1);
      em.add(new WhipSlash(this.x, this.y, this.facingAngle, arc, range, damage, false, weapon.id));
      if (weapon.level >= 5) em.add(new WhipSlash(this.x, this.y, this.facingAngle, arc, range, damage, true, weapon.id));
    } else if (behavior === 'boomerang' || behavior === 'bounce') {
      for (let i = 0; i < count; i++) {
        const angle = this._spreadAngle(nearest, count, i, Math.PI / 7);
        em.add(new CrossProjectile(
          this.x,
          this.y,
          Math.cos(angle) * 0.45,
          Math.sin(angle) * 0.45,
          damage,
          range,
          pierce,
          {
            radius: Math.round(7 * this.areaMultiplier),
            weaponName: weapon.id,
            mode: behavior,
            bounceLeft: pierce
          }
        ));
      }
    } else if (behavior === 'lob') {
      for (let i = 0; i < count; i++) {
        const angle = this._spreadAngle(nearest, count, i, Math.PI / 5);
        em.add(new Projectile(this.x, this.y, Math.cos(angle) * 0.25, Math.sin(angle) * 0.25, damage, weapon.id, {
          radius: Math.round(10 * this.areaMultiplier),
          lifetime: 1400,
          pierce,
          sizeMultiplier: 1.16
        }));
      }
    } else if (behavior === 'spray') {
      const sprayCount = count + 2;
      for (let i = 0; i < sprayCount; i++) {
        const angle = this.facingAngle - Math.PI / 5 + (Math.PI / 5) * (sprayCount === 1 ? 0 : (2 * i / (sprayCount - 1)));
        em.add(new Projectile(this.x, this.y, Math.cos(angle) * 0.38, Math.sin(angle) * 0.38, damage, weapon.id, {
          radius: Math.round(5 * this.areaMultiplier),
          lifetime: 900,
          pierce,
          sizeMultiplier: 1.22
        }));
      }
    } else {
      for (let i = 0; i < count; i++) {
        const angle = this._spreadAngle(nearest, count, i, Math.PI / 9);
        em.add(new Projectile(this.x, this.y, Math.cos(angle) * 0.55, Math.sin(angle) * 0.55, damage, weapon.id, {
          radius: Math.round(4 * this.areaMultiplier),
          lifetime: 1800,
          pierce,
          sizeMultiplier: weapon.id === 'throwing_chopsticks' ? 1.2 : 1
        }));
      }
    }
    window.game.audio.playShoot();
  }

  _updateAreaWeapon(dt, weapon, def, behavior, em) {
    const baseDef = WEAPON_DEFS[def.baseWeaponId] || def;
    const timerKey = weapon.id;
    this.weaponTimers[timerKey] = (this.weaponTimers[timerKey] || 0) + dt;
    const damage = this._weaponDamage(baseDef, weapon, def, this.weaponTimers[timerKey] || 0);
    const range = this._weaponRange(baseDef, weapon);

    if (behavior === 'orbit') {
      const count = this._weaponCount(baseDef, weapon);
      this.orbitAngles[timerKey] = (this.orbitAngles[timerKey] || 0) + dt * 0.003 * (1 + weapon.level * 0.04);
      if (this.weaponTimers[timerKey] < 180) return;
      this.weaponTimers[timerKey] = 0;
      const enemies = window.game.entityManager.getByType('enemy');
      for (let i = 0; i < count; i++) {
        const angle = this.orbitAngles[timerKey] + (Math.PI * 2 * i) / count;
        const ox = this.x + Math.cos(angle) * range;
        const oy = this.y + Math.sin(angle) * range;
        em.add(new Projectile(ox, oy, Math.cos(angle + Math.PI / 2) * 0.01, Math.sin(angle + Math.PI / 2) * 0.01, damage, weapon.id, {
          radius: Math.round(10 * this.areaMultiplier),
          lifetime: 260,
          pierce: 999,
          sizeMultiplier: 1.12
        }));
      }
      for (const enemy of enemies) {
        const dx = enemy.x - this.x;
        const dy = enemy.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < range + enemy.radius + 12) enemy.takeDamage(damage);
        if (this.arcanaInventory?.has('mirror')) {
          const mirrorX = window.game.camera.x + GAME_WIDTH - (this.x - window.game.camera.x);
          const mirrorY = window.game.camera.y + GAME_HEIGHT - (this.y - window.game.camera.y);
          const mdx = enemy.x - mirrorX;
          const mdy = enemy.y - mirrorY;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < range + enemy.radius + 12) enemy.takeDamage(damage);
        }
      }
    } else {
      const pulseRate = this._weaponFireRate(baseDef, weapon);
      if (this.weaponTimers[timerKey] < pulseRate) return;
      this.weaponTimers[timerKey] = 0;
      for (const enemy of window.game.entityManager.getByType('enemy')) {
        const dx = enemy.x - this.x;
        const dy = enemy.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < range + enemy.radius) enemy.takeDamage(damage);
        if (this.arcanaInventory?.has('mirror')) {
          const mirrorX = window.game.camera.x + GAME_WIDTH - (this.x - window.game.camera.x);
          const mirrorY = window.game.camera.y + GAME_HEIGHT - (this.y - window.game.camera.y);
          const mdx = enemy.x - mirrorX;
          const mdy = enemy.y - mirrorY;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < range + enemy.radius) enemy.takeDamage(damage);
        }
      }
      addWeaponActionEffect(window.game, weapon.id, 'loop', {
        x: this.x,
        y: this.y,
        size: Math.max(220, range * 3.15),
        life: pulseRate + 140,
        alpha: 0.72
      });
    }
  }

  _findNearestEnemy(range) {
    let nearest = null;
    let nearestDist = Infinity;
    for (const enemy of window.game.entityManager.getByType('enemy')) {
      const dx = enemy.x - this.x;
      const dy = enemy.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < range && dist < nearestDist) {
        nearest = enemy;
        nearestDist = dist;
      }
    }
    return nearest;
  }

  _spreadAngle(target, count, index, spread) {
    const base = target ? Math.atan2(target.y - this.y, target.x - this.x) : this.facingAngle;
    if (count <= 1) return base;
    return base - spread / 2 + (spread * index) / (count - 1);
  }

  _weaponDamage(def, weapon, evolutionDef, chargedTime = 0) {
    let damage = def.baseDamage || 10;
    if (weapon.level >= 3) damage *= 1.3;
    if (weapon.level >= 6) damage *= 1.3;
    if (evolutionDef?.baseDamageMultiplier) damage *= evolutionDef.baseDamageMultiplier;
    if (this.arcanaInventory?.has('hanged_man') && this.hp < this.maxHp * 0.5) damage *= 1.5;
    if (this.arcanaInventory?.has('empty_plate') && this.weaponInventory.getAll().length <= 4) damage *= 1.25;
    if (this.arcanaInventory?.has('hourglass')) {
      const charge = Math.min(0.6, (chargedTime / 1000) * 0.02);
      damage *= 1 + charge;
    }
    return Math.max(1, Math.floor(damage * this.powerMultiplier));
  }

  _weaponFireRate(def, weapon) {
    let rate = def.baseFireRate || 500;
    if (weapon.level >= 4) rate *= 0.85;
    if (weapon.level >= 8) rate *= 0.9;
    const priestess = window.game?.player?.arcanaInventory?.getCount('priestess') || 0;
    if (priestess > 0) rate /= Math.pow(1.5, priestess);
    return Math.max(120, rate / this.attackSpeedMultiplier);
  }

  _weaponRange(def, weapon) {
    let range = def.baseRange || 240;
    if (weapon.level >= 2) range *= 1.12;
    if (weapon.level >= 7) range *= 1.25;
    const emperor = window.game?.player?.arcanaInventory?.getCount('emperor') || 0;
    if (emperor > 0) range *= (1 + 0.6 * emperor);
    return range * this.areaMultiplier;
  }

  _weaponCount(def, weapon) {
    let count = def.baseCount || 1;
    if (weapon.level >= 2 && ['bounce', 'needle', 'spray'].includes(def.behavior)) count++;
    if (weapon.level >= 5) count++;
    if (weapon.level >= 8) count++;
    const gemini = window.game?.player?.arcanaInventory?.getCount('gemini') || 0;
    if (gemini > 0 && ['bounce', 'boomerang', 'orbit', 'needle', 'spray'].includes(def.behavior)) count += gemini;
    return Math.min(8, count);
  }

  _weaponPierce(def, weapon) {
    let pierce = def.basePierce || 0;
    if (weapon.level >= 5) pierce++;
    const fool = window.game?.player?.arcanaInventory?.getCount('fool') || 0;
    return pierce + fool;
  }

  startDash() {
    if (this.isDashing || this.dashCooldown > 0) return false;
    this.isDashing = true;
    this.dashDuration = this.dashDurationMax;
    this.dashCooldown = this.dashCooldownMax;
    this.dashDirX = Math.cos(this.facingAngle);
    this.dashDirY = Math.sin(this.facingAngle);
    this.invincibleTimer = this.dashDurationMax;
    return true;
  }

  triggerHitAnim() {
    if (this.anim.isPlaying('death')) return;
    if (!this.anim.play('hit', true)) return false;
    this._hitAnim = true;
    this._hitAnimTimer = 600;
    return true;
  }

  triggerSkillAnim(duration = 600) {
    if (this.anim.isPlaying('death')) return;
    if (!this.anim.play('skill', true)) return false;
    this._isUsingSkill = true;
    this._skillAnimTimer = duration;
    return true;
  }

  render(ctx) {
    if (this.isDashing) {
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.arc(this.x - this.dashDirX * 15, this.y - this.dashDirY * 15, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#74c0fc';
      ctx.fill();
      ctx.globalAlpha = 0.15;
      ctx.beginPath();
      ctx.arc(this.x - this.dashDirX * 30, this.y - this.dashDirY * 30, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#74c0fc';
      ctx.fill();
      ctx.restore();
    }
    if (this.invincibleTimer > 0 && !this.isDashing && Math.floor(this.invincibleTimer / 60) % 2 === 0) return;

    const hasAnimSheets = Object.keys(this.anim.spriteSheets).length > 0;

    if (hasAnimSheets) {
      const size = this.radius * PLAYER_ANIM_SIZE_MULTIPLIER;
      const drawX = this.x - size / 2;
      const drawY = this.y - size / 2;
      this.anim.render(ctx, drawX, drawY, size, false);
    } else if (this.sprite) {
      const isReady = this.sprite instanceof HTMLCanvasElement ||
                      (this.sprite.complete && this.sprite.naturalWidth > 0);
      if (isReady) {
        const size = this.radius * PLAYER_STATIC_SIZE_MULTIPLIER;
        ctx.drawImage(this.sprite, this.x - size / 2, this.y - size / 2, size, size);
      }
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#4dabf7';
      ctx.fill();
      ctx.strokeStyle = '#228be6';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }
}

function cloneInventoryPlain(value) {
  return JSON.parse(JSON.stringify(value));
}
