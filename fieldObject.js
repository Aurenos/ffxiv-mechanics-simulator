class Tether {
  constructor(obj1, obj2, { tetherColor = "orange", breakLength = null } = {}) {
    this.obj1 = obj1;
    this.obj2 = obj2;
    this.tetherColor = color(tetherColor);
    this.breakLength = breakLength;
  }

  draw() {
    if (this.shouldDraw()) {
      strokeWeight(4);
      this.tetherColor.setAlpha(100);
      stroke(this.tetherColor);
      line(this.obj1.pos.x, this.obj1.pos.y, this.obj2.pos.x, this.obj2.pos.y);
    }
  }

  getObjDistance() {
    let v1 = createVector(this.obj1.pos.x, this.obj1.pos.y);
    let v2 = createVector(this.obj2.pos.x, this.obj2.pos.y);
    return v1.dist(v2);
  }

  shouldDraw() {
    if (this.breakLength === null) {
      return true;
    } else {
      return this.getObjDistance() < this.breakLength;
    }
  }
}
