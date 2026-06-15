import { GAME_WIDTH, GAME_HEIGHT } from '../config/constants.js';
import { WEAPON_DEFS } from '../config/weapons-data.js';
import { CHARACTERS } from '../config/characters.js';
import { LEVELS } from '../config/levels.js';
import { CHARACTER_SPRITES, CHARACTER_ANIM_SHEETS } from '../config/assets.js';
import { SaveSystem } from './save-system.js';
import { Bestiary, syncBestiaryInventory } from './bestiary.js';
import { updateGameLogic } from './game-update.js';
import { renderGame } from './game-render.js';
import { restoreFromSave, applyDropPickup, createDamageNumber, createDeathExplosion, createDeathQuote, createBossSpawnQuote } from './game-helpers.js';
import { Player } from '../entities/player.js';
import { DropItem } from '../entities/items.js';
import { EntityManager } from '../systems/entity-manager.js';
import { AudioManager } from '../systems/audio.js';
import { InputManager } from '../systems/input.js';
import { Camera, CameraShake, GestureHandler } from '../systems/camera.js';
import { IntroSequence } from '../systems/intro.js';
import { LoadingScreen } from '../systems/loading.js';
import { MenuButton } from '../systems/menu-button.js';
import { ENEMIES } from '../config/enemies-data.js';
import { Enemy } from '../entities/enemy.js';
import { ArcanaInventory } from '../entities/weapon-system.js';
import { buildUpgradeOptions, applyUpgradeChoice } from './upgrade-pool.js';
import { resolveChestReward } from './chest-rewards.js';
import { JuiceSystem } from '../systems/juice.js';
import { applyPowerUpsToPlayer, grantRunGold, loadMeta, saveMeta } from './powerup-store.js';
import { evaluateUnlocks, isCharacterUnlocked, isLevelUnlocked, recordRunProgress } from './unlock-manager.js';
import { createRunLevelUpControls, banishUpgrade, controlsToMetaSeals, sealUpgrade, spendLevelUpControl } from './levelup-controls.js';
import { buildInteractablePlan, placeInteractablesInBounds } from '../config/interactables-data.js';
import { Interactable } from '../entities/interactable.js';
import { CHALLENGE_DEFS } from '../config/challenges-data.js';
import { getDailyChallengeForDate, hasRelic } from './m4-systems.js';

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.state = 'MENU';
    this.previousState = 'MENU';
    this.player = null;
    this.entityManager = new EntityManager();
    this.audio = new AudioManager();
    this.inputManager = new InputManager();
    this.camera = new Camera();
    this.cameraShake = new CameraShake();
    this.juice = new JuiceSystem();
    this.gestureHandler = new GestureHandler(canvas);
    this.intro = new IntroSequence();
    this.loading = new LoadingScreen();
    this.saveSystem = new SaveSystem();
    this.bestiary = new Bestiary();
    this.meta = evaluateUnlocks(loadMeta()).meta;
    saveMeta(this.meta);
    this.unlockedWeaponsSet = new Set(this.meta.unlockedWeapons);
    this.score = 0;
    this.bestScore = this._loadBestScore();
    this.gameTime = 0;
    this.runSeed = Date.now() & 0xffffffff;
    this.mapBounds = { minX: 0, minY: 0, maxX: 3840, maxY: 2160 };
    this.bestTime = this._loadBestTime();
    this.waveNumber = 1;
    this.waveTimer = 0;
    this.difficultyMultiplier = 1.0;
    this.bossSpawned = false;
    this.bossKilled = false;
    this.spawnTimers = {};
    this.triggeredWaveEvents = new Set();
    this.claimedArcanaSlots = new Set();
    this.arcanaOptions = [];
    this.levelUpOptions = [];
    this.levelUpControls = createRunLevelUpControls(this.meta);
    this._levelUpCardBounds = [];
    this._levelUpControlBounds = {};
    this._levelUpHovered = -1;
    this._levelUpControlHovered = null;
    this._levelUpBanishHovered = -1;
    this._levelUpSealHovered = -1;
    this.chestReward = null;
    this.chestOpenedAt = 0;
    this.selectedLevelIndex = -1;
    this.selectedCharacterIndex = 0;
    this.settingsTab = 'controls';
    this.shopItems = [];
    this.particles = [];
    this.damageNumbers = [];
    this.deathQuotes = [];
    this.bossSpawnQuote = null;
    this.ambientLore = null;
    this.ambientLoreTimer = 0;
    this.difficultyNotifTimer = 0;
    this.fps = 0;
    this.lastFpsTime = 0;
    this.frameCount = 0;
    this.menuButtons = [];
    this.pauseMenuButtons = [];
    this.gameOverBtnHovered = null;
    this.arcanaSelectCount = 0;
    this.arcanaFirstChoice = true;
    this.arcanaSelectPending = false;
    this.arcanaTimer = 0;
    this.pendingInteractableChoice = null;
    this._interactableChoiceBounds = [];
    this._interactableChoiceHovered = -1;
    this.forceTripleChest = false;
    this.cursedAltarAccepted = false;
    this.billFrenzyTimer = 0;
    this.runFlags = {};
    this.runUnlockFlags = new Set();
    this.runEvolvedWeapons = new Set();
    this.runNotesFound = new Set();
    this.runRelicsFound = new Set();
    this.runEnemyKills = {};
    this.runProfile = { spiceLevel: 0, hyper: false, challengeId: null, dailyKey: null, seed: null };
    this.selectedSpiceLevel = 0;
    this.selectedHyper = false;
    this.selectedChallengeId = null;
    this.selectedDaily = false;
    this.dailyChallenge = null;
    this._runWon = false;
    this._runFinished = false;
    this._powerUpRowBounds = [];
    this._powerUpHovered = -1;
    this._powerUpBackHovered = false;
    this._powerUpRefundHovered = false;
    this._showSaveSlotSelect = false;
    this._volumeSlider = null;
    this._volumeDragging = false;
    this._shopItemBounds = [];
    this._shopItemHovered = -1;
    this._shopCloseHovered = false;
    this.bossButtonHovered = false;
    this.shopButtonHovered = false;
    this.diffButtonHovered = false;
    this.goldButtonHovered = false;
    this._levelCardBounds = [];
    this._levelHovered = -1;
    this._levelConfirmHovered = false;
    this._levelBackHovered = false;
    this._levelSpiceMinusHovered = false;
    this._levelSpicePlusHovered = false;
    this._levelHyperHovered = false;
    this._levelChallengeHovered = false;
    this._levelDailyHovered = false;
    this._charCardBounds = [];
    this._charHovered = -1;
    this._charConfirmHovered = false;
    this._charBackHovered = false;
    this._saveSlotBounds = [];
    this._saveSlotHovered = -1;
    this._saveDeleteHovered = -1;
    this._saveBackHovered = false;
    this._pauseSaveSlotBounds = [];
    this._pauseSaveSlotHovered = -1;
    this._pauseDeleteHovered = -1;
    this._pauseCancelHovered = false;
    this._settingsTabBounds = [];
    this._settingsTabHovered = -1;
    this._settingsBackHovered = false;
    this._bestiaryCategory = 'weapons';
    this._bestiaryCategoryBounds = [];
    this._bestiaryCategoryHovered = -1;
    this._bestiaryCardBounds = [];
    this._bestiaryHoveredKey = null;
    this._bestiarySelectedKey = null;
    this._bestiaryPage = 0;
    this._bestiaryPageInfo = null;
    this._bestiaryPageBounds = null;
    this._bestiaryPageHovered = null;
    this._arcanaCardBounds = [];
    this._arcanaHovered = -1;
    this._arcanaSkipHovered = false;
    this._talentNodeBounds = [];
    this._talentNodeHovered = null;
    this._talentBackHovered = false;
    this._initMenu();
  }

  _initMenu() {
    const btnW = 276, btnH = 48, gap = 12;
    const startY = 318;
    const cx = 230;
    this.menuButtons = [
      new MenuButton(cx - btnW / 2, startY, btnW, btnH, '开始游戏', () => { this.setState('LEVEL_SELECT'); this.audio.playMenuClick(); }),
      new MenuButton(cx - btnW / 2, startY + btnH + gap, btnW, btnH, '继续游戏', () => { this.setState('SAVE_SELECT'); this.audio.playMenuClick(); }),
      new MenuButton(cx - btnW / 2, startY + 2 * (btnH + gap), btnW, btnH, '能力强化', () => { this.meta = evaluateUnlocks(loadMeta()).meta; this.setState('POWERUP'); this.audio.playMenuClick(); }),
      new MenuButton(cx - btnW / 2, startY + 3 * (btnH + gap), btnW, btnH, '设置', () => { this.setState('SETTINGS'); this.settingsTab = 'controls'; this.audio.playMenuClick(); })
    ];
    this.menuButtons.splice(3, 0, new MenuButton(cx - btnW / 2, startY + 3 * (btnH + gap), btnW, btnH, '天赋树', () => {
      this.meta = evaluateUnlocks(loadMeta()).meta;
      this.setState('SKILLTREE');
      this.audio.playMenuClick();
    }));
    for (let i = 4; i < this.menuButtons.length; i++) {
      this.menuButtons[i].y = startY + i * (btnH + gap);
    }
    for (let i = 0; i < this.menuButtons.length; i++) {
      this.menuButtons[i].x = cx - btnW / 2;
      this.menuButtons[i].y = startY + i * (btnH + gap);
      this.menuButtons[i].w = btnW;
      this.menuButtons[i].h = btnH;
    }
  }

  _initPauseMenu() {
    const btnW = 200, btnH = 44, gap = 12;
    const startY = GAME_HEIGHT / 2 - 80;
    const cx = GAME_WIDTH / 2;
    this.pauseMenuButtons = [
      new MenuButton(cx - btnW / 2, startY, btnW, btnH, '继续游戏', () => { this.setState('PLAYING'); this.audio.playMenuClick(); }),
      new MenuButton(cx - btnW / 2, startY + btnH + gap, btnW, btnH, '保存并返回', () => { this._showSaveSlotSelect = true; this.audio.playMenuClick(); }),
      new MenuButton(cx - btnW / 2, startY + 2 * (btnH + gap), btnW, btnH, '设置', () => { this.previousState = 'PAUSED'; this.setState('SETTINGS'); this.settingsTab = 'controls'; this.audio.playMenuClick(); })
    ];
  }

  setState(newState) {
    if (this.state !== 'SETTINGS') this.previousState = this.state;
    this.state = newState;
    if (newState === 'MENU') {
      this.audio.startMusic('menu');
    } else if (newState === 'PLAYING') {
      if (this.bossSpawned && !this.bossKilled) {
        this.audio.startMusic('boss');
      } else {
        this.audio.startMusic('game');
      }
    } else if (newState === 'GAME_OVER' || newState === 'VICTORY') {
      this.audio.stopMusic();
    } else if (newState === 'PAUSED') {
      this.audio.stopMusic();
    } else if (newState === 'SHOP') {
      this.audio.stopMusic();
    } else if (newState === 'LEVEL_SELECT' || newState === 'CHARACTER_SELECT' || newState === 'SAVE_SELECT' || newState === 'POWERUP' || newState === 'SKILLTREE') {
      this.audio.startMusic('menu');
    }
  }

  startGame() {
    this.meta = evaluateUnlocks(loadMeta()).meta;
    saveMeta(this.meta);
    this.unlockedWeaponsSet = new Set(this.meta.unlockedWeapons);
    this.dailyChallenge = this.selectedDaily ? getDailyChallengeForDate() : null;
    if (this.dailyChallenge) {
      const dailyLevelIndex = LEVELS.findIndex(level => level.id === this.dailyChallenge.levelId);
      const dailyCharacterIndex = CHARACTERS.findIndex(char => char.id === this.dailyChallenge.characterId);
      if (dailyLevelIndex >= 0 && isLevelUnlocked(this.meta, LEVELS[dailyLevelIndex].id)) this.selectedLevelIndex = dailyLevelIndex;
      if (dailyCharacterIndex >= 0 && isCharacterUnlocked(this.meta, CHARACTERS[dailyCharacterIndex].id)) this.selectedCharacterIndex = dailyCharacterIndex;
    }
    this.runProfile = this._buildRunProfile(this.dailyChallenge);
    if (this.selectedLevelIndex < 0 || !isLevelUnlocked(this.meta, LEVELS[this.selectedLevelIndex]?.id)) {
      this.selectedLevelIndex = LEVELS.findIndex(level => isLevelUnlocked(this.meta, level.id));
      if (this.selectedLevelIndex < 0) this.selectedLevelIndex = 0;
    }
    if (!isCharacterUnlocked(this.meta, CHARACTERS[this.selectedCharacterIndex]?.id)) {
      this.selectedCharacterIndex = Math.max(0, CHARACTERS.findIndex(char => char.id === 'antonio'));
    }
    const char = CHARACTERS[this.selectedCharacterIndex];
    this.mapBounds = { minX: 0, minY: 0, maxX: 3840, maxY: 2160 };
    this._levelPropCache = null;
    this.player = new Player(this.mapBounds.maxX / 2, this.mapBounds.maxY / 2);
    this.player.applyCharacterStats(char);
    applyPowerUpsToPlayer(this.player, this.meta.powerUps, this.meta.m4);
    this.player.arcanaInventory = new ArcanaInventory();
    const sprite = CHARACTER_SPRITES[char.id];
    if (sprite) this.player.setSprite(sprite);
    const animSheets = CHARACTER_ANIM_SHEETS[char.id];
    if (animSheets) this.player.loadAnimSheets(animSheets);
    this.player.setBounds(this.mapBounds.minX, this.mapBounds.minY, this.mapBounds.maxX, this.mapBounds.maxY);
    if (char.startWeaponId) {
      this.player.setWeapon(WEAPON_DEFS[char.startWeaponId]);
    }
    this._syncBestiaryInventory();
    this.runSeed = this.runProfile.seed ?? ((Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0);
    this.entityManager.clear();
    this._spawnLevelInteractables();
    this.score = 0;
    this.gameTime = 0;
    this.waveNumber = 1;
    this.waveTimer = 0;
    this.difficultyMultiplier = 1.0;
    this.bossSpawned = false;
    this.bossKilled = false;
    this.spawnTimers = {};
    this.triggeredWaveEvents = new Set();
    this.claimedArcanaSlots = new Set();
    this.arcanaOptions = [];
    this.levelUpOptions = [];
    this.levelUpControls = createRunLevelUpControls(this.meta);
    this._levelUpHovered = -1;
    this._levelUpControlHovered = null;
    this._levelUpBanishHovered = -1;
    this._levelUpSealHovered = -1;
    this.chestReward = null;
    this.chestOpenedAt = 0;
    this.forceTripleChest = false;
    this.cursedAltarAccepted = false;
    this.billFrenzyTimer = 0;
    this.pendingInteractableChoice = null;
    this.runFlags = {};
    this.runUnlockFlags = new Set();
    this.runEvolvedWeapons = new Set();
    this.runNotesFound = new Set();
    this.runRelicsFound = new Set();
    this.runEnemyKills = {};
    this._runWon = false;
    this._runFinished = false;
    this.juice = new JuiceSystem();
    this.particles = [];
    this.damageNumbers = [];
    this.deathQuotes = [];
    this._generateShopItems();
    this.state = 'LEVEL_LOADING';
    this._levelLoadStart = performance.now();
    this._levelLoadDuration = 4000;
    this.audio.init();
    this.audio.startMusic('game');
  }

  _spawnLevelInteractables() {
    const level = LEVELS[this.selectedLevelIndex] || LEVELS[0];
    const plan = buildInteractablePlan(level.id, this.runSeed || Date.now());
    const visiblePlan = plan.filter(item => {
      if (item.noteId && this.meta?.m4?.notes?.includes(item.noteId)) return false;
      if (item.relicId && hasRelic(this.meta?.m4, item.relicId)) return false;
      return true;
    });
    const placed = placeInteractablesInBounds(visiblePlan, this.mapBounds);
    for (const item of placed) {
      this.entityManager.add(new Interactable(item));
    }
  }

  _buildRunProfile(dailyChallenge = null) {
    const challengeId = dailyChallenge?.challengeId || this.selectedChallengeId || null;
    const challengeProfile = challengeId ? (CHALLENGE_DEFS[challengeId]?.profile || {}) : {};
    const profile = {
      ...challengeProfile,
      spiceLevel: dailyChallenge ? dailyChallenge.spiceLevel : this.selectedSpiceLevel,
      hyper: dailyChallenge ? dailyChallenge.hyper : this.selectedHyper,
      challengeId,
      dailyKey: dailyChallenge?.key || null,
      seed: dailyChallenge?.seed ?? null
    };
    return profile;
  }

  _restartGame() { this.startGame(); }

  spawnBoss() {
    if (this.bossSpawned) return;
    this.bossSpawned = true;
    this.audio.startMusic('boss');
    const bossData = ENEMIES.boss;
    const enemy = new Enemy(this.player.x, Math.max(this.mapBounds.minY + 60, this.player.y - 260), bossData, 'boss');
    enemy.radius = 50;
    enemy.setTarget(this.player);
    this.entityManager.add(enemy);
    this.bestiary.unlockEnemy(bossData.id);
    if (bossData.spawnQuote) this.showBossSpawnQuote(bossData.spawnQuote);
  }

  spawnMirrorBoss() {
    if (this.bossSpawned) return;
    this.bossSpawned = true;
    if (!this.runFlags) this.runFlags = {};
    this.runFlags.mirrorBoss = true;
    this.audio.startMusic('boss');
    const bossData = {
      ...ENEMIES.boss,
      id: 'mirror_gourmando',
      name: '镜中 Gourmando',
      nameEn: 'Mirror Gourmando',
      hp: 18000,
      atk: 90,
      speed: 0.075,
      spawnQuote: '镜子终于开始结账了。它照出的不是敌人，而是 Gourmando 留在你身后的那一串欠单。'
    };
    const enemy = new Enemy(this.player.x, Math.max(this.mapBounds.minY + 60, this.player.y - 280), bossData, 'boss');
    enemy.radius = 54;
    enemy.spriteKey = 'health_inspector';
    enemy.setTarget(this.player);
    this.entityManager.add(enemy);
    this.showBossSpawnQuote(bossData.spawnQuote);
  }

  _generateShopItems() {
    this.shopItems = [
      { type: 'hp_boost', name: '生命强化', desc: '最大HP+10, 恢复10HP', price: 10 },
      { type: 'atk_boost', name: '攻击强化', desc: '攻击力+1', price: 100 },
      { type: 'weapon', weaponId: 'whip', name: '鞭子', desc: '购买/升级鞭子', price: 10 },
      { type: 'weapon', weaponId: 'cross', name: '十字架', desc: '购买/升级十字架', price: 10 },
      { type: 'arcana', arcanaId: 'fool', name: '愚者', desc: '所有子弹增加弹射效果', price: 100 },
      { type: 'arcana', arcanaId: 'gemini', name: '双子星', desc: '十字架数量+1', price: 100 },
      { type: 'arcana', arcanaId: 'priestess', name: '祭司', desc: '攻击速率提升1.5倍', price: 100 },
      { type: 'arcana', arcanaId: 'emperor', name: '皇帝', desc: '十字架和子弹体积增加', price: 100 }
    ];
  }

  gameOver() {
    this._runWon = false;
    this._finishRun();
    this.state = 'GAME_OVER';
    this.audio.playDeath();
    this.audio.stopMusic();
    if (this.gameTime > this.bestTime) { this.bestTime = this.gameTime; this._saveBestTime(this.bestTime); }
    if (this.score > this.bestScore) { this.bestScore = this.score; this._saveBestScore(this.bestScore); }
  }

  victory() {
    this._runWon = true;
    this._finishRun();
    this.state = 'VICTORY';
    this.audio.playLevelUp();
    this.audio.stopMusic();
    if (this.gameTime > this.bestTime) { this.bestTime = this.gameTime; this._saveBestTime(this.bestTime); }
    if (this.score > this.bestScore) { this.bestScore = this.score; this._saveBestScore(this.bestScore); }
  }

  _loadBestTime() { const v = localStorage.getItem('vs_bestTime'); return v ? parseInt(v, 10) : 0; }
  _saveBestTime(t) { localStorage.setItem('vs_bestTime', String(t)); }
  _loadBestScore() { const v = localStorage.getItem('vs_bestScore'); return v ? parseInt(v, 10) : 0; }
  _saveBestScore(s) { localStorage.setItem('vs_bestScore', String(s)); }

  _finishRun() {
    if (this._runFinished || !this.player) return;
    this._runFinished = true;
    this.meta = grantRunGold(this.meta, this.player.gold, this.meta.powerUps);
    this.meta.sealedUpgrades = controlsToMetaSeals(this.levelUpControls);
    const level = LEVELS[this.selectedLevelIndex] || LEVELS[0];
    const result = recordRunProgress(this.meta, {
      levelId: level.id,
      time: this.gameTime,
      kills: this.player.kills,
      level: this.player.level,
      packageOpened: !!this.runFlags.packageOpened,
      mirrorSeen: !!this.runFlags.mirrorSeen,
      evolvedWeapons: Array.from(this.runEvolvedWeapons || []),
      weaponUnlockFlags: Array.from(this.runUnlockFlags || []),
      won: this._runWon,
      hyper: !!this.runProfile?.hyper,
      spiceLevel: this.runProfile?.spiceLevel || 0,
      challengeId: this.runProfile?.challengeId || null,
      dailyKey: this.runProfile?.dailyKey || null,
      dailySeed: this.runProfile?.seed ?? null,
      notesFound: Array.from(this.runNotesFound || []),
      relicsFound: Array.from(this.runRelicsFound || []),
      endingId: this._resolveEnding(level),
      enemyKills: { ...(this.runEnemyKills || {}) }
    });
    this.meta = result.meta;
    saveMeta(this.meta);
    this.unlockedWeaponsSet = new Set(this.meta.unlockedWeapons);
  }

  _resolveEnding(level) {
    if (!this._runWon) return null;
    if (level.id !== 'moonboba' && !this.runFlags.mirrorBoss) return null;
    if ((this.player?.gold || 0) >= 500) return 'invoice_paid';
    if ((this.runEvolvedWeapons?.size || 0) >= 3) return 'recipe_burned';
    return 'last_bowl_shared';
  }

  handleDropPickup(dropData) { applyDropPickup(this, dropData); }
  requestLevelUp() {
    if (!this.player || this.player.pendingLevelUps <= 0) return;
    const seed = (this.runSeed + this.player.level * 2654435761 + this.player.kills) >>> 0;
    this.levelUpOptions = buildUpgradeOptions({
      inventory: this.player.getUpgradeInventory(),
      seed,
      count: this.player.luckMultiplier >= 1.5 ? 4 : 3,
      banished: this.levelUpControls?.banished || new Set(),
      sealed: this.levelUpControls?.sealed || new Set(),
      unlockedWeapons: this.unlockedWeaponsSet
    });
    this.setState('LEVEL_UP');
    this.audio.playLevelUp();
  }

  chooseLevelUpOption(index) {
    const choice = this.levelUpOptions[index];
    if (!choice || !this.player) return;
    const next = applyUpgradeChoice(this.player.getUpgradeInventory(), choice);
    this.player.applyUpgradeInventory(next);
    this._syncBestiaryInventory();
    this.player.pendingLevelUps = Math.max(0, this.player.pendingLevelUps - 1);
    this.levelUpOptions = [];
    this._continueAfterLevelChoice();
  }

  rerollLevelUpOptions() {
    if (!this.player || this.state !== 'LEVEL_UP') return;
    const spent = spendLevelUpControl(this.levelUpControls, 'reroll');
    if (!spent.ok) return;
    const seed = (this.runSeed + this.player.level * 1103515245 + this.player.kills + performance.now()) >>> 0;
    this.levelUpOptions = buildUpgradeOptions({
      inventory: this.player.getUpgradeInventory(),
      seed,
      count: this.player.luckMultiplier >= 1.5 ? 4 : 3,
      banished: this.levelUpControls.banished,
      sealed: this.levelUpControls.sealed,
      unlockedWeapons: this.unlockedWeaponsSet
    });
    this.audio.playMenuClick();
  }

  skipLevelUp() {
    if (!this.player || this.state !== 'LEVEL_UP') return;
    const spent = spendLevelUpControl(this.levelUpControls, 'skip');
    if (!spent.ok) return;
    this.player.gold += 10;
    this.player.pendingLevelUps = Math.max(0, this.player.pendingLevelUps - 1);
    this.levelUpOptions = [];
    this._continueAfterLevelChoice();
  }

  banishLevelUpOption(index) {
    const choice = this.levelUpOptions[index];
    if (!choice || choice.kind === 'fallback') return;
    const result = banishUpgrade(this.levelUpControls, choice.key);
    if (!result.ok) return;
    this.requestLevelUp();
  }

  sealLevelUpOption(index) {
    const choice = this.levelUpOptions[index];
    if (!choice || choice.kind === 'fallback') return;
    const result = sealUpgrade(this.levelUpControls, choice.key);
    if (!result.ok) return;
    this.meta.sealedUpgrades = controlsToMetaSeals(this.levelUpControls);
    saveMeta(this.meta);
    this.requestLevelUp();
  }

  _continueAfterLevelChoice() {
    if (this.player.pendingLevelUps > 0) {
      this.requestLevelUp();
    } else {
      this.setState('PLAYING');
    }
  }

  openChest() {
    if (!this.player) return;
    this.chestReward = resolveChestReward(this);
    this._syncBestiaryInventory();
    if (this.chestReward?.gold) this.player.gold += this.chestReward.gold;
    this.chestOpenedAt = performance.now();
    this.cameraShake.shake(8, 300);
    this.setState('CHEST_OPEN');
    this.audio.playLevelUp();
  }

  closeChest() {
    this.chestReward = null;
    this.setState('PLAYING');
  }

  addDamageNumber(x, y, amount) { createDamageNumber(this, x, y, amount); }
  addDeathExplosion(x, y, color) { createDeathExplosion(this, x, y, color); }
  showDeathQuote(x, y, text) { createDeathQuote(this, x, y, text); }
  showBossSpawnQuote(text) { createBossSpawnQuote(this, text); }
  spawnDrop(x, y, dropData) { this.entityManager.add(new DropItem(x, y, dropData)); }

  _getAllSaves() { return this.saveSystem.getAllSaves(); }
  _loadGame(slot) { return this.saveSystem.getSave(slot); }
  _saveGame(slot) { const d = this.saveSystem.createSaveData(this); this.saveSystem.setSave(slot, d); }
  _deleteSave(slot) { this.saveSystem.deleteSave(slot); }
  _restoreFromSave(save) {
    restoreFromSave(this, save);
    this._syncBestiaryInventory();
  }

  _syncBestiaryInventory() {
    syncBestiaryInventory(this.bestiary, this.player);
  }

  update(dt) {
    if (this.intro.active) {
      this.intro.update(dt);
      if (this.intro.finished) {
        this.setState('MENU');
      }
      return;
    }
    if (this.loading.active) { this.loading.update(); return; }
    if (this.state === 'PLAYING') { updateGameLogic(this, dt); }
    if (this.state === 'LEVEL_LOADING') {
      const elapsed = performance.now() - this._levelLoadStart;
      if (elapsed >= this._levelLoadDuration) this.state = 'PLAYING';
    }
  }

  render() { renderGame(this); }
}
