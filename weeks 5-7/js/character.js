class Character {
  constructor(x, y, animationFrames) {
    this.x = x;
    this.y = y;
    this.animationFrames = animationFrames;
    this.currentFrame = 0;
    this.frameCount = animationFrames.length;
    this.timer = 0;
    this.animationSpeed = 0.2;
    this.direction = 1; // 1 for facing right, -1 for facing left
  }

  draw() {
    // Scale horizontally to flip the image based on direction
    if (this.direction === 1) {
      image(this.animationFrames[this.currentFrame], this.x, this.y);
    } else {
      push();
      translate(this.x + this.animationFrames[this.currentFrame].width, this.y);
      scale(-1, 1); // Flip horizontally
      image(this.animationFrames[this.currentFrame], 0, 0);
      pop();
    }
  }

  animate() {
    this.timer += deltaTime / 1000;
    if (this.timer > this.animationSpeed) {
      this.timer = 0;
      this.currentFrame = (this.currentFrame + 1) % this.frameCount;
    }
  }

  move(dx, dy) {
    // Update character position based on dx and dy
    this.x += dx;
    this.y += dy;
    // Update character direction based on movement
    this.direction = dx > 0 ? 1 : (dx < 0 ? -1 : this.direction);
  }
}
