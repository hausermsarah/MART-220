let boxRotation = 0;
let sphereRotation = 0;
let coneRotation = 0;
let torusRotation = 0;
let cylinderRotation = 0;

function setup() {
  createCanvas(800, 600, WEBGL);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(24);
}

function draw() {
  background(137, 207, 240);

  ambientLight(255, 200, 200);
  pointLight(200, 200, 255, -400, -400, 400);

  push();
  translate(-200, -100, 0);
  rotateX(boxRotation);
  rotateY(boxRotation);
  rotateZ(boxRotation);
  ambientMaterial(255, 192, 203);
  box(100);
  pop();

  push();
  translate(200, 0, 0);
  rotateX(sphereRotation);
  rotateY(sphereRotation);
  rotateZ(sphereRotation);
  ambientMaterial(173, 216, 230);
  sphere(50);
  pop();

  push();
  translate(0, -200, 0);
  rotateX(coneRotation);
  rotateY(coneRotation);
  rotateZ(coneRotation);
  ambientMaterial(144, 238, 144);
  cone(50, 100);
  pop();

  push();
  translate(0, 200, 0);
  rotateX(torusRotation);
  rotateY(torusRotation);
  rotateZ(torusRotation);
  ambientMaterial(255, 192, 203);
  torus(80, 20);
  pop();

  push();
  translate(0, 0, -200);
  rotateX(cylinderRotation);
  rotateY(cylinderRotation);
  rotateZ(cylinderRotation);
  ambientMaterial(173, 216, 230);
  cylinder(50, 100);
  pop();

  fill(255);
  text("Pink Fun!", 0, -280);
  textSize(18);
  text("by Sarah Hauser", 0, 280);

  boxRotation += 0.01;
  sphereRotation += 0.02;
  coneRotation += 0.03;
  torusRotation += 0.04;
  cylinderRotation += 0.05;
}
