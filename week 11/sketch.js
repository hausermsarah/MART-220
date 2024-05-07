class Particle {
    constructor(x, y, radius, pColor) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.pColor = pColor;
        this.health = 100; 
    }

    draw() {
        fill(this.pColor);
        circle(this.x, this.y, this.radius * 2);
    }
}

class Character {
    constructor(x, y, radius, images) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.images = images; 
        this.currentFrame = 0; 
    }

    draw() {
        image(this.images[this.currentFrame], this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        this.currentFrame = (this.currentFrame + 1) % this.images.length;
    }

    
    move(direction) {
        const speed = 10;
        if (direction === 'UP') {
            this.y -= speed;
        } else if (direction === 'DOWN') {
            this.y += speed;
        } else if (direction === 'LEFT') {
            this.x -= speed;
        } else if (direction === 'RIGHT') {
            this.x += speed;
        }
    }
}

let player;
let greenCircles = [];
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;
let characterImages = [];

function preload() {
    for (let i = 0; i < 10; i++) {
        let img = loadImage(`assets/cat/walk/Walk (${i + 1}).png`);
        characterImages.push(img);
    }
}

function setup() {
    createCanvas(800, 600);
    player = new Character(50, 50, 50, characterImages); 

    for (let i = 0; i < 5; i++) {
        let x = random(width);
        let y = random(height);
        let radius = 10;
        let c = color('green'); 
        greenCircles.push(new Particle(x, y, radius, c));
    }
}

function keyPressed() {
   
    if (key === 'W') {
        player.move('UP');
    } else if (key === 'S') {
        player.move('DOWN');
    } else if (key === 'A') {
        player.move('LEFT');
    } else if (key === 'D') {
        player.move('RIGHT');
    }
}

function isCollision(circle1, circle2) {
    const distance = dist(circle1.x, circle1.y, circle2.x, circle2.y);
    return distance < circle1.radius + circle2.radius;
}

function draw() {
    background(220);

    greenCircles.forEach(circle => circle.draw());
    player.draw();

    greenCircles = greenCircles.filter(circle => {
        if (isCollision(player, circle)) {
            
            circle.health -= 10;
            if (circle.health <= 0) {
                return false; 
            }
        }
        return true;
    });

    if (greenCircles.length === 0) {
        alert("You win!");
        noLoop(); 
    }
}
