// Define the Particle class
class Particle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        fill(this.color);
        circle(this.x, this.y, this.radius * 2);
    }
}

// Define the Character class
class Character {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        fill(this.color);
        circle(this.x, this.y, this.radius * 2);
    }
}

// Player object
let player;
let greenCircles = [];

function setup() {
    createCanvas(800, 600);
    player = new Character(50, 50, 15, 'blue');

    // Generate 5 green circles
    for (let i = 0; i < 5; i++) {
        let x = random(width);
        let y = random(height);
        let radius = 10;
        let color = color(0, 255, 0);
        greenCircles.push(new Particle(x, y, radius, color));
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        player.y -= 10;
    } else if (keyCode === DOWN_ARROW) {
        player.y += 10;
    } else if (keyCode === LEFT_ARROW) {
        player.x -= 10;
    } else if (keyCode === RIGHT_ARROW) {
        player.x += 10;
    }
}

function isCollision(circle1, circle2) {
    const distance = dist(circle1.x, circle1.y, circle2.x, circle2.y);
    return distance < circle1.radius + circle2.radius;
}

function draw() {
    background(220);

    // Draw green circles
    greenCircles.forEach(circle => circle.draw());

    // Draw player
    player.draw();

    // Check for collision with green circles
    greenCircles = greenCircles.filter(circle => {
        if (isCollision(player, circle)) {
            player.radius += 1; // Player eats the circle, so increase its radius
            return false; // Remove the circle from the array
        }
        return true; // Keep the circle in the array
    });

    // Check if all good pieces of food are collected
    if (greenCircles.length === 0) {
        alert("You win!");
        noLoop(); // Stop the draw loop
    }
}
