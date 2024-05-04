let character;
let food;
let food2; 
let characterFrames = [];
const numFrames = 10;
let characterWidth = 50;
let characterHeight = 50;
let foodWidth = 60;
let foodHeight = 50;
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;
let score = 0;
let backgroundMusic;
let goodFoodSound;
let badFoodSound;

function preload() {
    for (let i = 0; i < numFrames; i++) {
        let frame = loadImage(`assets/cat/walk/Walk (${i + 1}).png`);
        characterFrames.push(frame);
    }

    backgroundMusic = loadSound('sounds/background.mp3');
    goodFoodSound = loadSound('sounds/goodfood.wav');
    badFoodSound = loadSound('sounds/badfood.wav');
}

function setup() {
    createCanvas(900, 900);
    character = new Character(width / 2, height / 2, characterFrames);
    food = new Food(); 
    food2 = new Food(); 
    respawnFoodNearCharacter(); 
    backgroundMusic.loop();
    
}

function respawnFoodNearCharacter() {
  let randomX = random(characterWidth, width - foodWidth - characterWidth);
  let randomY = random(height / 2 + characterHeight, height - characterHeight - foodHeight);

  
  food.setAppearance(randomX, randomY);

 
  let offsetX = random(-200, 200); 
  let offsetY = random(-200, 200); 

  
  let badFoodX = constrain(randomX + offsetX, characterWidth, width - foodWidth - characterWidth);
  let badFoodY = constrain(randomY + offsetY, height / 2 + characterHeight, height - characterHeight - foodHeight);

 
  food2.setAppearance(badFoodX, badFoodY);
}


function keyPressed() {
    if (key === 'a') {
        moveLeft = true;
    } else if (key === 'd') {
        moveRight = true;
    } else if (key === 'w') {
        moveUp = true;
    } else if (key === 's') {
        moveDown = true;
    }
}

function keyReleased() {
    if (key === 'a') {
        moveLeft = false;
    } else if (key === 'd') {
        moveRight = false;
    } else if (key === 'w') {
        moveUp = false;
    } else if (key === 's') {
        moveDown = false;
    }
}

function draw() {
  background(129, 164, 189);

  if (moveLeft) {
      character.move(-5, 0);
  }
  if (moveRight) {
      character.move(5, 0);
  }
  if (moveUp) {
      character.move(0, -5);
  }
  if (moveDown) {
      character.move(0, 5);
  }

  character.animate();
  character.draw();

  food.draw(); 
  food2.draw(); 

  fill(0);
  textSize(20);
  textAlign(LEFT, TOP);
  text("Eat the fish", 10, 10);
  text("Score: " + score, 10, 40);


  if (isColliding(
      character.x, character.y, characterWidth, characterHeight,
      food.x, food.y, foodWidth, foodHeight
  )) {
      goodFoodSound.play();
      score++;
      respawnFoodNearCharacter();
  }

  
  if (isColliding(
      character.x, character.y, characterWidth, characterHeight,
      food2.x, food2.y, foodWidth, foodHeight
  )) {
      badFoodSound.play();
      score--;
      respawnFoodNearCharacter(); 
  }
}

function isColliding(characterX, characterY, characterWidth, characterHeight, foodX, foodY, foodWidth, foodHeight) {
 
  let characterCenterX = characterX + characterWidth / 2;
  let characterCenterY = characterY + characterHeight / 2;
  let foodCenterX = foodX + foodWidth / 2;
  let foodCenterY = foodY + foodHeight / 2;


  let distanceX = abs(characterCenterX - foodCenterX);
  let distanceY = abs(characterCenterY - foodCenterY);

 
  let halfWidth = characterWidth / 2;

  
  return (distanceX < halfWidth && distanceY < halfWidth);
}
function mouseClicked() {

  if (!goodFoodSound.isPlaying()) {

      goodFoodSound.play();
  }
}


