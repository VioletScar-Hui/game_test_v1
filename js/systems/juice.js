export class JuiceSystem {
  constructor() {
    this.hitStopTimer = 0;
    this.combo = 0;
    this.comboTimer = 0;
    this.pickupChain = 0;
    this.pickupTimer = 0;
  }

  update(dt) {
    if (this.hitStopTimer > 0) this.hitStopTimer -= dt;
    if (this.comboTimer > 0) {
      this.comboTimer -= dt;
      if (this.comboTimer <= 0) this.combo = 0;
    }
    if (this.pickupTimer > 0) {
      this.pickupTimer -= dt;
      if (this.pickupTimer <= 0) this.pickupChain = 0;
    }
  }

  getTimeScale() {
    return this.hitStopTimer > 0 ? 0 : 1;
  }

  hitStop(duration) {
    this.hitStopTimer = Math.max(this.hitStopTimer, duration);
  }

  recordKill(enemyType) {
    this.combo++;
    this.comboTimer = 3000;
    if (typeof window !== 'undefined' && window.game) {
      const intensity = enemyType === 'boss' ? 12 : (enemyType === 'elite' ? 6 : 2);
      const duration = enemyType === 'boss' ? 500 : (enemyType === 'elite' ? 150 : 80);
      window.game.cameraShake.shake(intensity, duration);
      this.hitStop(enemyType === 'boss' ? 50 : (enemyType === 'elite' ? 33 : 16));
    }
  }

  recordPickup() {
    this.pickupChain++;
    this.pickupTimer = 1000;
    return Math.min(12, this.pickupChain - 1);
  }
}
