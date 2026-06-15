export class SaveSystem {
  constructor() {
    this.SAVE_KEY_PREFIX = 'vampire_survivors_save_';
  }

  getSave(slot) {
    try {
      const data = localStorage.getItem(this.SAVE_KEY_PREFIX + slot);
      if (data) return JSON.parse(data);
    } catch (e) {}
    return null;
  }

  setSave(slot, data) {
    try {
      localStorage.setItem(this.SAVE_KEY_PREFIX + slot, JSON.stringify(data));
      return true;
    } catch (e) {}
    return false;
  }

  deleteSave(slot) {
    try {
      localStorage.removeItem(this.SAVE_KEY_PREFIX + slot);
      return true;
    } catch (e) {}
    return false;
  }

  getAllSaves() {
    return [0, 1, 2].map(i => this.getSave(i));
  }

  createSaveData(game) {
    const p = game.player;
    const now = new Date();
    return {
      characterId: p.charData ? p.charData.id : null,
      characterName: p.charData ? p.charData.name : '未知',
      level: p.level,
      hp: p.hp,
      maxHp: p.maxHp,
      exp: p.exp,
      gold: p.gold,
      kills: p.kills,
      score: game.score,
      gameTime: game.gameTime,
      playerX: p.x,
      playerY: p.y,
      mapBounds: { ...game.mapBounds },
      time: this.formatTime(game.gameTime),
      waveNumber: game.waveNumber,
      selectedLevelIndex: game.selectedLevelIndex,
      weaponInventory: p.weaponInventory.getAll(),
      passiveInventory: p.passiveInventory.getAll(),
      arcanaInventory: p.arcanaInventory.getAll(),
      date: `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    };
  }

  formatTime(ms) {
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }
}
