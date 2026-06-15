export class InputManager {
  constructor() {
    this.keys = {};
    this.dir = { x: 0, y: 0 };
    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseDown = false;
    this.wheelDelta = 0;
    this._bound = false;
    this._game = null;
  }

  bind(canvas, game) {
    if (this._bound) return;
    this._bound = true;
    this._game = game;
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      this._updateDir();
    });
    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
      this._updateDir();
    });
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      this.mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
      this.mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);
    });
    canvas.addEventListener('mousedown', () => { this.mouseDown = true; });
    canvas.addEventListener('mouseup', () => { this.mouseDown = false; });
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.wheelDelta += Math.sign(e.deltaY);
    }, { passive: false });
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      this.mouseX = (touch.clientX - rect.left) * (canvas.width / rect.width);
      this.mouseY = (touch.clientY - rect.top) * (canvas.height / rect.height);
      this.mouseDown = true;
    }, { passive: false });
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      this.mouseX = (touch.clientX - rect.left) * (canvas.width / rect.width);
      this.mouseY = (touch.clientY - rect.top) * (canvas.height / rect.height);
    }, { passive: false });
    canvas.addEventListener('touchend', () => { this.mouseDown = false; });
  }

  _updateDir() {
    let x = 0, y = 0;
    if (this.keys['KeyW'] || this.keys['ArrowUp']) y -= 1;
    if (this.keys['KeyS'] || this.keys['ArrowDown']) y += 1;
    if (this.keys['KeyA'] || this.keys['ArrowLeft']) x -= 1;
    if (this.keys['KeyD'] || this.keys['ArrowRight']) x += 1;
    const len = Math.sqrt(x * x + y * y);
    if (len > 0) { x /= len; y /= len; }
    this.dir = { x, y };
  }

  getDirection() {
    if (this.mouseDown && this._game && this._game.player && this._game.camera) {
      const cam = this._game.camera;
      const player = this._game.player;
      const screenPos = cam.worldToScreen(player.x, player.y);
      let dx = this.mouseX - screenPos.x;
      let dy = this.mouseY - screenPos.y;
      const len = Math.hypot(dx, dy);
      if (len > 0) { dx /= len; dy /= len; }
      return { x: dx, y: dy };
    }
    return this.dir;
  }

  isKeyDown(code) { return !!this.keys[code]; }
  getMousePos() { return { x: this.mouseX, y: this.mouseY }; }
  isMouseDown() { return this.mouseDown; }
  consumeMouseDown() { const v = this.mouseDown; this.mouseDown = false; return v; }
  consumeWheelDelta() {
    const value = this.wheelDelta;
    this.wheelDelta = 0;
    return value;
  }
}
