let img;
let x = 200;
let y = 200;
let timer = 0;

function preload() {
  img = loadImage('apple.jpg'); 
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  
  image(img, x, y, 120, 120);

  
  fill(139, 69, 19);
  rect(195, 120, 10, 30);
  
  fill(34, 139, 34);
  triangle(200, 130, 230, 70, 180, 70);

  
  if (millis() - timer > 1000) { 
    x += random(-5, 5); 
    y += random(-5, 5);
    timer = millis();
  }
}