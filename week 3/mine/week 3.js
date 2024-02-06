let shapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  
  for (let shape of shapes) {
    shape.move();
    shape.display();
  }
  
  textAlign(LEFT, TOP);
  textSize(20);
  fill(219,112,147);
  text("Sarah Hauser", 10, 10);
  
  textAlign(RIGHT, BOTTOM);
  textSize(16);
  text("Sarah", width - 10, height - 10);
  
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(199, 21, 133);
  text("Click to add Circles", width / 2, height / 2);
  
}

function mousePressed() {
  shapes.push(new MovingShape(mouseX, mouseY));
}

class MovingShape {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.size = random(20, 100);
    this.speedX = random(1, 10);
    this.speedY = random(1, 10);
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
    fill(150, 200, 250);
    ellipse(this.x, this.y, this.size, this.size);
  }
}
