function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255); // White background

  // Draw apple body
  fill(255, 0, 0); // Red color
  ellipse(200, 250, 120, 160);

  // Draw apple highlight
  fill(255, 255, 255, 100); // White color with transparency
  ellipse(220, 220, 40, 20);

  // Draw apple stem
  fill(110, 69, 19); // Brown color
  rect(195, 150, 10, 30);

  // Draw apple leaf
  fill(34, 139, 34); // Green color
  beginShape();
  vertex(200, 130);
  bezierVertex(230, 100, 240, 110, 210, 130);
  bezierVertex(200, 120, 190, 100, 200, 130);
  endShape();
}