import assert from 'node:assert/strict';
import {
  ANIMATION_DEFS,
  canTransitionAnimation,
  createAnimationParams,
  resolveAnimationState
} from '../js/config/animation-data.js';
import { AnimationController } from '../js/systems/animation.js';

function makePlayer(overrides = {}) {
  return {
    active: true,
    hp: 100,
    isDashing: false,
    _hitAnim: false,
    _isUsingSkill: false,
    ...overrides
  };
}

function makeInput(x = 0, y = 0, shift = false) {
  return {
    getDirection: () => ({ x, y }),
    isKeyDown: (code) => shift && (code === 'ShiftLeft' || code === 'ShiftRight')
  };
}

assert.equal(resolveAnimationState({ isDead: true }), 'death');
assert.equal(resolveAnimationState({ isDead: false, isUsingSkill: true, isHit: true, isDashing: true, isMoving: true }), 'skill');
assert.equal(resolveAnimationState({ isDead: false, isUsingSkill: false, isHit: true, isDashing: true, isMoving: true }), 'hit');
assert.equal(resolveAnimationState({ isDead: false, isUsingSkill: false, isHit: false, isDashing: true, isMoving: true }), 'run');
assert.equal(resolveAnimationState({ isDead: false, isUsingSkill: false, isHit: false, isDashing: false, isRunning: true, isMoving: true }), 'run');
assert.equal(resolveAnimationState({ isDead: false, isUsingSkill: false, isHit: false, isDashing: false, isRunning: false, isMoving: true }), 'walk');
assert.equal(resolveAnimationState({ isDead: false, isUsingSkill: false, isHit: false, isDashing: false, isRunning: false, isMoving: false }), 'idle');

assert.equal(canTransitionAnimation('idle', 'walk', false), true);
assert.equal(canTransitionAnimation('walk', 'run', false), true);
assert.equal(canTransitionAnimation('run', 'idle', false), true);
assert.equal(canTransitionAnimation('walk', 'hit', false), true);
assert.equal(canTransitionAnimation('skill', 'hit', false), false);
assert.equal(canTransitionAnimation('skill', 'death', false), true);
assert.equal(canTransitionAnimation('death', 'idle', false), false);

const params = createAnimationParams(makePlayer({ isDashing: true }), makeInput(1, 0));
assert.deepEqual(
  {
    isDead: params.isDead,
    isDashing: params.isDashing,
    isMoving: params.isMoving,
    isRunning: params.isRunning,
    moveX: params.moveX,
    moveY: params.moveY,
    speed: params.speed,
    direction: params.direction
  },
  {
    isDead: false,
    isDashing: true,
    isMoving: true,
    isRunning: true,
    moveX: 1,
    moveY: 0,
    speed: 1,
    direction: 'right'
  }
);

assert.equal(createAnimationParams(makePlayer(), makeInput(-1, 0)).direction, 'left');
assert.equal(createAnimationParams(makePlayer(), makeInput(0, -1)).direction, 'up');
assert.equal(createAnimationParams(makePlayer(), makeInput(0, 1)).direction, 'down');
assert.equal(createAnimationParams(makePlayer(), makeInput(-1, -1)).direction, 'up_left');
assert.equal(createAnimationParams(makePlayer(), makeInput(1, -1)).direction, 'up_right');
assert.equal(createAnimationParams(makePlayer(), makeInput(-1, 1)).direction, 'down_left');
assert.equal(createAnimationParams(makePlayer(), makeInput(1, 1)).direction, 'down_right');
assert.equal(createAnimationParams(makePlayer({ _animDirection: 'up' }), makeInput(0, 0)).direction, 'up');

assert.equal(ANIMATION_DEFS.idle.frames, 6);
assert.equal(ANIMATION_DEFS.walk.frames, 6);
assert.equal(ANIMATION_DEFS.run.frames, 6);
assert.equal(ANIMATION_DEFS.hit.frames, 6);
assert.equal(ANIMATION_DEFS.skill.frames, 6);
assert.equal(ANIMATION_DEFS.death.frames, 6);

assert.equal(ANIMATION_DEFS.skill.priority > ANIMATION_DEFS.hit.priority, true);
assert.equal(ANIMATION_DEFS.death.priority > ANIMATION_DEFS.skill.priority, true);

const controller = new AnimationController();
controller.loadFrames('idle', [{ id: 'idle0' }, { id: 'idle1' }]);
controller.loadFrames('walk', [{ id: 'walk0' }, { id: 'walk1' }]);
controller.loadFrames('hit', [{ id: 'hit0' }, { id: 'hit1' }]);
controller.loadFrames('skill', [{ id: 'skill0' }, { id: 'skill1' }]);
controller.loadFrames('death', [{ id: 'death0' }, { id: 'death1' }]);

assert.equal(controller.play('walk'), true);
controller.frame = 1;
assert.equal(controller.play('idle'), true);
assert.deepEqual(controller.transitionFrom, { action: 'walk', frame: 1, direction: 'down' });

assert.equal(controller.play('skill'), true);
assert.equal(controller.play('hit', true), false);
assert.equal(controller.current, 'skill');
assert.equal(controller.play('death', true), true);
assert.equal(controller.current, 'death');
assert.equal(controller.play('idle', true), false);
assert.equal(controller.current, 'death');

console.log('animation-state tests passed');
