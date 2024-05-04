class Food {
  constructor() {
      this.x = 0;
      this.y = 0;
      this.isGood = random() > 0.5;
      this.goodFoodImage = loadImage('assets/fish.png');
      this.badFoodImage = loadImage('assets/stinky.png');
  }

  setAppearance(x, y) {
      this.x = x;
      this.y = y;
  }

  draw() {
      if (this.isGood) {
          image(this.goodFoodImage, this.x, this.y, foodWidth, foodHeight);
      } else {
          image(this.badFoodImage, this.x, this.y, foodWidth, foodHeight);
      }
  }
}