var img1, img2, img3;
var timer;
var x1, y1, x2, y2, x3, y3;
var imgSize = 100; 
var catSize = 50; // Size of the cat image

function preload() {
  img1 = loadImage("assets/apple.jpg");
  img2 = loadImage("assets/cat.jpg");
  img3 = loadImage("assets/elephant.jpg");
}

function setup() {
  createCanvas(displayWidth - 25, displayHeight - 140);
  timer = second(); // Start the timer
  textSize(32); // Change font size
  textFont('Arial'); // Change font type
  
  // Initial positions for the images within canvas boundaries
  x1 = random(imgSize, width - imgSize);
  y1 = random(imgSize, height - imgSize);
  x3 = random(imgSize, width - imgSize);
  y3 = random(imgSize, height - imgSize);
  

  x2 = 0;
  y2 = height - catSize; 
}

function draw() {
  background(120);
  moveImages(); // Call function to move the images

  fill(255, 120, 50);
  text("Sarah Hauser", 100, 100);
  
  // Calculate and display the time until the next movement
  var elapsedTime = second() - timer;
  var timeUntilNextMove = 2 - elapsedTime; 
  fill(255);
  text("Next move in: " + nf(timeUntilNextMove, 1, 0) + " seconds", 100, 150);
}

function moveImages() {
  // Move images every 2 seconds
  if (second() - timer >= 2) {
    timer = second(); // Reset the timer
    moveImageWithinBounds(img1);
    moveImageWithinBounds(img3);
  }

  image(img1, x1, y1);
  image(img2, x2, y2, catSize, catSize); // Cat image with adjusted size
  image(img3, x3, y3);
}

// Function to move an image within canvas boundaries
function moveImageWithinBounds(img) {
  var newX = img === img1 ? x1 : x3;
  var newY = img === img1 ? y1 : y3;
  
  newX += random(-50, 50); // Randomly move image on x-axis
  newY += random(-50, 50); // Randomly move image on y-axis
  
  // Constrain image position within canvas boundaries
  newX = constrain(newX, imgSize, width - imgSize);
  newY = constrain(newY, imgSize, height - imgSize);
  
  if (img === img1) {
    x1 = newX;
    y1 = newY;
  } else {
    x3 = newX;
    y3 = newY;
  }
}
