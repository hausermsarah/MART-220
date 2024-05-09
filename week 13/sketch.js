let treeModel;
let objects = [];
let numObjects = 5;
let textures = [];
let rotationSpeeds = [];


const minPosition = -200;
const maxPosition = 200;
const minRotationSpeed = 0.01;
const maxRotationSpeed = 0.05;
const objectSize = 50;
const treeScale = 5;

function preload() {
 
  treeModel = loadModel('sakura.obj');
  textures[0] = loadImage('blue.jpg');
  textures[1] = loadImage('grass.jpg');
  textures[2] = loadImage('leafs.jpg');
}

function setup() {
  createCanvas(800, 600, WEBGL);

 
  for (let i = 0; i < numObjects; i++) {
    let obj = {
      x: random(minPosition, maxPosition),
      y: random(minPosition, maxPosition),
      z: random(minPosition, maxPosition),
      rotationSpeed: random(minRotationSpeed, maxRotationSpeed)
    };
    objects.push(obj);
  }
}

function draw() {
  background(220);

 
  ambientLight(200);
  directionalLight(255, 255, 255, 0, 0, -1);

  
  rotateY(frameCount * 0.01);

 
  push();
  translate(0, -100, 0);
  rotateX(HALF_PI);
  rotateY(frameCount * 0.02);
  scale(treeScale);
  model(treeModel);
  pop();

s
  for (let i = 0; i < objects.length; i++) {
    let obj = objects[i];
    push();
    translate(obj.x, obj.y, obj.z);
    rotateY(frameCount * obj.rotationSpeed);
   
    texture(textures[i % textures.length]);
    box(objectSize);
    pop();
  }
}

function mouseClicked() {
  
  let index1 = floor(random(objects.length));
  let index2;
  do {
    index2 = floor(random(objects.length));
  } while (index2 === index1);

  
  randomizeObjectPosition(objects[index1]);
  randomizeObjectPosition(objects[index2]);
}

function randomizeObjectPosition(obj) {
  obj.x = random(minPosition, maxPosition);
  obj.y = random(minPosition, maxPosition);
  obj.z = random(minPosition, maxPosition);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
