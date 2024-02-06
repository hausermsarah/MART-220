let shapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 5; i++) {
    shapes.push(new MovingShape());
  }
}

function draw() {
  background(220);
  
  for (let shape of shapes) {
    shape.move();
    shape.display();
  }
  
  textAlign(LEFT, TOP);
  textSize(20);
  fill(0);
  text("Your Piece Name", 10, 10);
  
  textAlign(RIGHT, BOTTOM);
  textSize(16);
  text("Your Name", width - 10, height - 10);
}

function mousePressed() {
  // Handle mouse click event here
}

class MovingShape {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(20, 50);
    this.speedX = random(1, 3);
    this.speedY = random(1, 3);
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > width || this.x < 0) {
      this.speedX *= -1;
    }

    if (this.y > height || this.y < 0) {
      this.speedY *= -1;
    }
  }

  display() {
    fill(0);
    ellipse(this.x, this.y, this.size, this.size);
  }
}