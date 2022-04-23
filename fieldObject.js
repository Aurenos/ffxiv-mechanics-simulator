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

class CircleAOE {
  constructor(
    { x, y },
    radius = 10,
    { id = null, outlineColor = "darkorange", fillColor = "orange" } = {}
  ) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.id = id;
    this.outlineColor = color(outlineColor);
    this.fillColor = color(fillColor);
    this.alpha = 100;
  }

  draw() {
    strokeWeight(3);
    this.fillColor.setAlpha(this.alpha);
    stroke(this.outlineColor);
    fill(this.fillColor);
    circle(this.x, this.y, this.radius * 2);
  }

  flash() {
    this.alpha = 200;
  }
}

class LineAOE {
  constructor(
    { x, y },
    width,
    height,
    { id = null, outlineColor = "darkOrange", fillColor = "orange" } = {}
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.id = id;
    this.outlineColor = color(outlineColor);
    this.fillColor = color(fillColor);
    this.alpha = 100;
  }

  draw() {
    stroke(this.outlineColor);
    this.fillColor.setAlpha(this.alpha);
    fill(this.fillColor);
    rect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.x + this.width,
      this.y + this.height
    );
  }
}
