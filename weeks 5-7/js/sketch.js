let character;
let foodImage;
let characterFrames = []; 
const numFrames = 10;
let characterWidth = 50;
let characterHeight = 50;
let foodWidth = 30; 
let foodHeight = 20; 
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;

function preload() {
  for (let i = 0; i < numFrames; i++) {
    let frame = loadImage(`assets/cat/walk/Walk (${i + 1}).png`);
    characterFrames.push(frame);
  }
  foodImage = new Food(); 
}

function setup() {
  createCanvas(800, 800);
  character = new Character(width / 2, height / 2, characterFrames);
  respawnFood(); 
}

function respawnFood() {
  let randomX = random(width - foodWidth); 
  let randomY = random(height - foodHeight); 
  
  
  randomX = constrain(randomX, 0, width - foodWidth);
  randomY = constrain(randomY, 0, height - foodHeight);

  foodImage.appear(randomX, randomY); 
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
  background(220);

  fill(0);
  textSize(20);
  textAlign(CENTER, TOP);
  text("Eat the fish", width / 2, 20);
  
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
  
  if (collideRectRect(character.x, character.y, characterWidth, characterHeight, foodImage.x, foodImage.y, foodWidth, foodHeight)) {
    foodImage.appeared = false; 
    respawnFood(); 
  }

  if (foodImage.appeared) {
    foodImage.draw();
  }
}
