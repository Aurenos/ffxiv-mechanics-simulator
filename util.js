function displayMouseCoordinates() {
  fill("lightgreen");
  strokeWeight(2);
  textSize(16);
  textAlign(CENTER);
  let mx = floor(mouseX - width / 2);
  let my = floor(mouseY - width / 2);
  text(`(${mx}, ${my})`, mx, my - 4);
}

function translatedMouseCoords() {
  return {
    x: floor(mouseX - width / 2),
    y: floor(mouseY - width / 2),
  };
}

function polarToCartesian(theta, radius) {
  return {
    x: radius * cos(theta),
    y: radius * sin(theta),
  };
}

function isNearDestination(pos, dest, delta) {
  let pVec = createVector(pos.x, pos.y)
  let destVec = createVector(dest.x, dest.y)
  return pVec.dist(destVec) < delta;
}

function randomPos() {
  let a = random(0, 360);
  let r = sqrt(random(0, width / 2 - width / 8));
  coeff = [-1, 1]
  let cx = coeff[Math.floor(Math.random() * coeff.length)]
  let cy = coeff[Math.floor(Math.random() * coeff.length)]
  
  x = cx * floor(r * r * cos(a));
  y = cy * floor(r * r * sin(a));
  return {x, y};
}
