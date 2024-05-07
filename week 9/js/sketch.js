let character;
let collectibles = [];
let score = 0;
let health = 100;
let gameState = 'playing';

let characterFrames = [];
let characterWalkFrames = [];
let characterIdleFrames = [];
let characterDeathFrames = [];
const numFrames = 10;

function preload() {
    for (let i = 0; i < numFrames; i++) {
        let walkFrame = loadImage(`assets/cat/walk/Walk (${i + 1}).png`);
        characterWalkFrames.push(walkFrame);
    }

    for (let i = 0; i < numFrames; i++) {
        let idleFrame = loadImage(`assets/cat/idle/Idle (${i + 1}).png`);
        characterIdleFrames.push(idleFrame);
    }

    for (let i = 0; i < numFrames; i++) {
        let deathFrame = loadImage(`assets/cat/death/death (${i + 1}).png`);
        characterDeathFrames.push(deathFrame);
    }

   
}

function setup() {
    createCanvas(900, 900);
    character = new Character(width / 2, height / 2, characterWalkFrames, characterIdleFrames, characterDeathFrames);

    
    for (let i = 0; i < 5; i++) {
        collectibles.push(createCollectible(true)); 
    }
    for (let i = 0; i < 5; i++) {
        collectibles.push(createCollectible(false)); 
    }
}

function draw() {
    background(220);

    if (gameState === 'playing') {
        character.handleInput();
        character.handleMovement();
        character.handleCollisions();
        character.draw();
        displayScore();
        displayHealth();
        displayCollectibles();
        checkWinOrLose();
    } else if (gameState === 'win') {
        textSize(32);
        fill(0, 255, 0);
        text("You Win!", width / 2, height / 2);
    } else if (gameState === 'lose') {
        textSize(32);
        fill(255, 0, 0);
        text("Game Over", width / 2, height / 2);
    }
}

function displayScore() {
    textSize(20);
    fill(0);
    textAlign(LEFT);
    text('Score: ' + score, 10, 20);
}

function displayHealth() {
    textSize(20);
    fill(0);
    textAlign(RIGHT);
    text('Health: ' + health, width - 10, 20);
}

function checkWinOrLose() {
    if (score >= 10) {
        gameState = 'win';
    } else if (health <= 0) {
        gameState = 'lose';
    }
}

class Character {
    constructor(x, y, walkFrames, idleFrames, deathFrames) {
        this.x = x;
        this.y = y;
        this.walkFrames = walkFrames;
        this.idleFrames = idleFrames;
        this.deathFrames = deathFrames;
        this.currentFrame = 0;
        this.frameCount = walkFrames.length;
        this.timer = 0;
        this.animationSpeed = 0.2;
        this.direction = 1;
        this.state = 'idle';
    }

    draw() {
        let frames;
        switch (this.state) {
            case 'walking':
                frames = this.walkFrames;
                break;
            case 'idle':
                frames = this.idleFrames;
                break;
            case 'death':
                frames = this.deathFrames;
                break;
            default:
                frames = this.idleFrames;
        }

        let scaleFactor = 0.5; 
        let characterWidth = frames[this.currentFrame].width * scaleFactor;
        let characterHeight = frames[this.currentFrame].height * scaleFactor;

        if (this.direction === 1) {
            image(frames[this.currentFrame], this.x, this.y, characterWidth, characterHeight);
        } else {
            push();
            translate(this.x + characterWidth, this.y);
            scale(-1, 1);
            image(frames[this.currentFrame], 0, 0, characterWidth, characterHeight);
            pop();
        }
    }

    animate() {
        let frames;
        switch (this.state) {
            case 'walking':
                frames = this.walkFrames;
                break;
            case 'idle':
                frames = this.idleFrames;
                break;
            case 'death':
                frames = this.deathFrames;
                break;
            default:
                frames = this.idleFrames;
        }

        this.timer += deltaTime / 1000;
        if (this.timer > this.animationSpeed) {
            this.timer = 0;
            this.currentFrame = (this.currentFrame + 1) % this.frameCount;
        }
    }

    handleInput() {
       
        let isMoving = false;
        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
            this.move(-5, 0); 
            isMoving = true;
        } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
            this.move(5, 0); 
            isMoving = true;
        }
        if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
            this.move(0, -5); 
            isMoving = true;
        } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
            this.move(0, 5); 
            isMoving = true;
        }

        
        if (isMoving) {
            this.state = 'walking';
        } else {
            this.state = 'idle';
        }
    }

    handleMovement() {
  
    }

    handleCollisions() {
        
        for (let i = 0; i < collectibles.length; i++) {
            if (this.isCollidingWith(collectibles[i])) { 
                if (collectibles[i].isGood) {
                    collectibles.splice(i, 1); 
                    score++; 
                } else {
                    collectibles.splice(i, 1); 
                    health -= 5; 
                }

                
                for (let j = 0; j < 5; j++) {
                    collectibles.push(createCollectible(random() > 0.5));
                    
                }
                console.log("New collectibles spawned. Total collectibles: " + collectibles.length); 
            }
        }
    }

    isCollidingWith(item) {
        let characterWidth = this.walkFrames[this.currentFrame].width; 
        let characterHeight = this.walkFrames[this.currentFrame].height; 

        return collideRectCircle(
            this.x, this.y, characterWidth, characterHeight,
            item.x, item.y, item.diameter
        );
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
        this.direction = dx > 0 ? 1 : (dx < 0 ? -1 : this.direction);
    }
}

function createCollectible(isGood) {
    let collectibleColor = isGood ? color(144, 238, 144) : color(255, 182, 193); 
    return {
        x: random(width),
        y: random(height),
        diameter: 30, 
        color: collectibleColor,
        isGood: isGood
    };
}

function displayCollectibles() {
    for (let collectible of collectibles) {
        fill(collectible.color);
        ellipse(collectible.x, collectible.y, collectible.diameter);
    }
}
