import { playIntroMusic } from './music-intro.js';
import { playMenuMusic } from './music-menu.js';
import { playGameMusic } from './music-game.js';
import { playBossMusic } from './music-boss.js';

export class AudioManager {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.sfxGain = null;
    this.musicGain = null;
    this.currentMusic = null;
    this.musicVolume = 0.3;
    this.sfxVolume = 0.5;
    this.initialized = false;
    this._musicPlaying = false;
    this._musicTrack = null;
    this._pendingTrack = null;
    this._musicNodes = [];
    this._musicTimers = [];
    this._musicMasterGain = null;
  }

  init() {
    if (this.initialized) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.connect(this.ctx.destination);
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = this.sfxVolume;
      this.sfxGain.connect(this.masterGain);
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = this.musicVolume;
      this.musicGain.connect(this.masterGain);
      this.initialized = true;
    } catch (e) {
      console.warn('AudioContext not available');
    }
  }

  _ensureCtx() {
    if (!this.initialized) this.init();
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  playTone(freq, type, duration, volume) {
    this._ensureCtx();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    gain.gain.setValueAtTime(Math.min(volume, 1), this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + duration);
  }

  playShoot() {
    this._ensureCtx();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playHit() { this.playTone(800, 'square', 0.05, 0.15); }

  playPickup() {
    this._ensureCtx();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.15);
  }

  playExpPickup() {
    this._ensureCtx();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.12);
  }

  playLevelUp() {
    this._ensureCtx();
    if (!this.ctx) return;
    const notes = [523, 659, 784];
    for (let i = 0; i < notes.length; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const t = this.ctx.currentTime + i * 0.12;
      osc.frequency.setValueAtTime(notes[i], t);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.2, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 0.3);
    }
  }

  playDamage() { this.playTone(150, 'sawtooth', 0.2, 0.2); }

  playDeath() {
    this._ensureCtx();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.5);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.5);
  }

  playBossWarning() {
    this._ensureCtx();
    if (!this.ctx) return;
    for (let i = 0; i < 3; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = 150;
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime + i * 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.3 + 0.2);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(this.ctx.currentTime + i * 0.3);
      osc.stop(this.ctx.currentTime + i * 0.3 + 0.2);
    }
  }

  playMenuClick() { this.playTone(660, 'sine', 0.06, 0.08); }

  startMusic(track) {
    if (!this.initialized) {
      this._pendingTrack = track;
      this.init();
      return;
    }
    this._ensureCtx();
    if (!this.ctx) return;
    if (this._musicTrack === track && this._musicPlaying) return;
    this.stopMusic();
    this._musicTrack = track;
    this._musicPlaying = true;
    this._musicNodes = [];
    this._musicTimers = [];

    const ctx = this.ctx;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 0.3);
    masterGain.connect(this.musicGain);
    this._musicMasterGain = masterGain;
    this._musicNodes.push(masterGain);

    if (track === 'intro') playIntroMusic(ctx, masterGain, this._musicNodes, this._scheduleLoop.bind(this));
    else if (track === 'menu') playMenuMusic(ctx, masterGain, this._musicNodes, this._scheduleLoop.bind(this));
    else if (track === 'game') playGameMusic(ctx, masterGain, this._musicNodes, this._scheduleLoop.bind(this));
    else if (track === 'boss') playBossMusic(ctx, masterGain, this._musicNodes, this._scheduleLoop.bind(this));
  }

  stopMusic() {
    this._musicPlaying = false;
    this._musicTrack = null;
    this._pendingTrack = null;
    if (this._musicTimers) {
      this._musicTimers.forEach(t => clearTimeout(t));
      this._musicTimers = [];
    }
    if (this._musicMasterGain && this.ctx) {
      try {
        this._musicMasterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.5);
        const nodes = this._musicNodes;
        setTimeout(() => { nodes.forEach(n => { try { n.disconnect(); } catch(e){} }); }, 600);
      } catch(e) {}
    }
    this._musicNodes = [];
  }

  _scheduleLoop(ctx, masterGain, buildFn, interval) {
    const play = () => {
      if (!this._musicPlaying) return;
      buildFn(ctx, masterGain);
      if (this._musicNodes.length > 200) this._musicNodes = this._musicNodes.slice(-50);
      if (this._musicTimers.length > 100) this._musicTimers = this._musicTimers.slice(-20);
      const timer = setTimeout(play, interval);
      this._musicTimers.push(timer);
    };
    play();
  }

  setMusicVolume(v) {
    this.musicVolume = v;
    if (this.musicGain) this.musicGain.gain.value = v;
  }

  setSfxVolume(v) {
    this.sfxVolume = v;
    if (this.sfxGain) this.sfxGain.gain.value = v;
  }

  get masterVolume() { return this.masterGain ? this.masterGain.gain.value : 1; }
  set masterVolume(v) { if (this.masterGain) this.masterGain.gain.value = v; }

  unlock() {
    this._ensureCtx();
    if (this._pendingTrack) {
      this.startMusic(this._pendingTrack);
      this._pendingTrack = null;
    }
  }
}
