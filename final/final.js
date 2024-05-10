let flowers = [];
let dots = [];
let numFlowers = 50;
let numDots = 100;
let canvasColor;

function setup() {
  createCanvas(800, 600);
  canvasColor = color(132, 179, 134);
  for (let i = 0; i < numFlowers; i++) {
    flowers.push(new Flower(random(width), random(height)));
  }
  for (let i = 0; i < numDots; i++) {
    dots.push(new Dot(random(width), random(height)));
  }
}

function draw() {
  background(canvasColor);

  for (let i = 0; i < flowers.length; i++) {
    flowers[i].display();
    flowers[i].move();
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].display();
    dots[i].move();
  }
}

class Flower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(15, 25);
    this.petals = floor(random(6, 10));
    this.color1 = color(random(200, 255), random(150, 200), random(150, 255));
    this.color2 = color(random(200, 255), random(150, 200), random(150, 255));
    this.angle = 0;
    this.speed = random(0.01, 0.05);
  }

  display() {
    for (let i = 0; i < this.petals; i++) {
      let angle = map(i, 0, this.petals, 0, TWO_PI);
      let xoff = cos(angle + this.angle) * this.size * 0.5;
      let yoff = sin(angle + this.angle) * this.size * 0.5;
      let x = this.x + xoff;
      let y = this.y + yoff;
      let c = lerpColor(this.color1, this.color2, yoff / (this.size * 0.5));
      let petalSize = map(abs(yoff), 0, this.size * 0.5, this.size * 0.3, this.size * 0.8);
      fill(c);
      ellipse(x, y, petalSize, this.size * 1.2);
    }
  }

  move() {
    this.angle += this.speed;
  }
}

class Dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.diameter = random(3, 8);
    this.speedX = random(-1, 1);
    this.speedY = random(-1, 1);
  }

  display() {
    noStroke();
    fill(255, 200); 
    ellipse(this.x, this.y, this.diameter);
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > width) {
      this.speedX *= -1;
    }

    if (this.y < 0 || this.y > height) {
      this.speedY *= -1;
    }
  }
}
