class Food {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.appeared = false;
    this.fishImage = loadImage('../assets/fish.png')
  }

  appear(x, y) {
    this.x = x;
    this.y = y;
    this.appeared = true;
  }
  draw(){
    image(this.fishImage, this.x, this.y);

  }
}
