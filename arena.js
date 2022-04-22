const ArenaShape = {
  Square: "square",
  Circle: "circle",
};

class Arena {
  constructor(shape) {
    this.shape = shape;
  }

  draw() {
    let edgeThickness = 3;
    strokeWeight(edgeThickness)
    stroke(0);
    fill(255);
    switch (this.shape) {
      case ArenaShape.Square:
        square(edgeThickness, edgeThickness, CanvasWidth - edgeThickness * 2);
        break;
      case ArenaShape.Circle:
        circle(0, 0, CanvasWidth - edgeThickness);
        break;
    }
  }
}
