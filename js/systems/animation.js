import {
  ANIMATION_DEFS,
  ANIMATION_FRAME_SIZE,
  canTransitionAnimation,
  createAnimationParams,
  resolveAnimationState
} from '../config/animation-data.js';

export class AnimationController {
  constructor() {
    this.current = 'idle';
    this.direction = 'down';
    this.frame = 0;
    this.elapsed = 0;
    this.finished = false;
    this.transitionFrom = null;
    this.transitionAlpha = 0;
    this.transitionDuration = 100;
    this.clips = {};
    this.spriteSheets = this.clips;
  }

  loadFrames(action, frames) {
    const def = ANIMATION_DEFS[action];
    if (!def || !frames) return;
    const frameSets = Array.isArray(frames) ? { default: frames } : frames;
    this.clips[action] = {
      ...def,
      frameSets,
      usesFrameImages: true
    };
  }

  loadSpriteSheet(action, img) {
    const def = ANIMATION_DEFS[action];
    if (!def || !img) return;
    this.clips[action] = {
      ...def,
      img,
      usesFrameImages: false
    };
  }

  setDirection(direction) {
    if (direction) this.direction = direction;
  }

  play(action, forceRestart = false) {
    if (!this.clips[action]) return false;

    const sameAction = this.current === action;
    if (sameAction && !forceRestart && !this.finished) return false;
    if (!sameAction && !canTransitionAnimation(this.current, action, this.finished)) return false;
    if (sameAction && action === 'death' && !this.finished) return false;

    if (!sameAction && this.clips[this.current]) {
      this.transitionFrom = {
        action: this.current,
        frame: this.frame,
        direction: this.direction
      };
      this.transitionAlpha = 1;
      this.transitionDuration = this.clips[action].transitionMs || 100;
    }

    this.current = action;
    this.frame = 0;
    this.elapsed = 0;
    this.finished = false;
    return true;
  }

  update(dt) {
    const clip = this.clips[this.current];
    if (!clip) return;

    if (this.transitionAlpha > 0) {
      this.transitionAlpha -= dt / this.transitionDuration;
      if (this.transitionAlpha <= 0) {
        this.transitionAlpha = 0;
        this.transitionFrom = null;
      }
    }

    if (this.finished) return;

    this.elapsed += dt;
    const frameDuration = clip.frameDuration || clip.speed || 100;
    if (this.elapsed >= frameDuration) {
      this.elapsed -= frameDuration;
      this.frame++;
      const frameCount = this._getFrameCount(this.current, this.direction);
      if (this.frame >= frameCount) {
        if (clip.loop) {
          this.frame = 0;
        } else {
          this.frame = Math.max(0, frameCount - 1);
          this.finished = true;
        }
      }
    }
  }

  _getFrameSet(action, direction = this.direction) {
    const clip = this.clips[action];
    if (!clip || !clip.usesFrameImages) return null;
    return clip.frameSets[direction] ||
           clip.frameSets.default ||
           clip.frameSets.right ||
           clip.frameSets.down ||
           null;
  }

  _getFrameCount(action, direction = this.direction) {
    const clip = this.clips[action];
    if (!clip) return 0;
    const frameSet = this._getFrameSet(action, direction);
    if (frameSet) return frameSet.length;
    return clip.frames || 1;
  }

  _drawFrame(ctx, action, frame, x, y, size, flipX, direction = this.direction) {
    const clip = this.clips[action];
    if (!clip) return;

    ctx.save();
    if (flipX) {
      ctx.translate(x + size / 2, 0);
      ctx.scale(-1, 1);
      ctx.translate(-(x + size / 2), 0);
    }

    if (clip.usesFrameImages) {
      const frameSet = this._getFrameSet(action, direction);
      if (frameSet && frameSet.length > 0) {
        const image = frameSet[Math.min(frame, frameSet.length - 1)];
        ctx.drawImage(image, x, y, size, size);
      }
    } else if (clip.img) {
      const col = frame % clip.cols;
      const row = Math.floor(frame / clip.cols);
      const sx = col * ANIMATION_FRAME_SIZE;
      const sy = row * ANIMATION_FRAME_SIZE;
      ctx.drawImage(clip.img, sx, sy, ANIMATION_FRAME_SIZE, ANIMATION_FRAME_SIZE, x, y, size, size);
    }

    ctx.restore();
  }

  render(ctx, x, y, size, flipX = false) {
    if (this.transitionFrom && this.transitionAlpha > 0) {
      this._drawFrame(
        ctx,
        this.transitionFrom.action,
        this.transitionFrom.frame,
        x,
        y,
        size,
        flipX,
        this.transitionFrom.direction
      );
      ctx.save();
      ctx.globalAlpha = 1 - this.transitionAlpha;
      this._drawFrame(ctx, this.current, this.frame, x, y, size, flipX, this.direction);
      ctx.restore();
    } else {
      this._drawFrame(ctx, this.current, this.frame, x, y, size, flipX, this.direction);
    }
  }

  hasClips() {
    return Object.keys(this.clips).length > 0;
  }

  isPlaying(action) {
    return this.current === action;
  }

  isFinished() {
    return this.finished;
  }
}

export function determineAnimState(player, inputManager) {
  const manager = inputManager ||
    (typeof window !== 'undefined' && window.game ? window.game.inputManager : null);
  return resolveAnimationState(createAnimationParams(player, manager));
}
