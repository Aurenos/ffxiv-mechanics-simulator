const PlayerRole = {
  Tank: "tank",
  Healer: "healer",
  DPS: "dps",
};

const LabelMode = {
  Center: "center",
  Floating: "floating",
};

const LabelFill = {
  Black: "black",
  BG: "bg",
};

class Player {
  constructor({
    role,
    label = null,
    labelMode = LabelMode.Center,
    labelFill = LabelFill.Black,
  }) {
    this.role = role;
    this.pos = { x: 0, y: 0 };
    this.size = 24;
    this.label = label;
    this.labelMode = labelMode;
    this.labelFill = labelFill;
    this.movementDestination = null;
    this.speed = 3;
  }

  draw() {
    if (this.movementDestination !== null) {
      if (!isNearDestination(this.pos, this.movementDestination, this.speed)) {
        this.moveToward(this.movementDestination);
      } else {
        this.setPos(this.movementDestination);
        this.stopMovement();
      }
    }

    stroke(0);
    switch (this.role) {
      case PlayerRole.Tank:
        fill(0, 153, 255);
        break;
      case PlayerRole.Healer:
        fill(51, 204, 51);
        break;
      case PlayerRole.DPS:
        fill(255, 80, 80);
        break;
    }
    strokeWeight(2);
    circle(this.pos.x, this.pos.y, this.size);
    if (this.label !== null) {
      strokeWeight(1);
      let labelY = this._getLabelY();
      textAlign(CENTER);
      if (this.labelFill === LabelFill.Black) {
        fill(0);
      }
      textSize(16);
      text(this.label, this.pos.x, labelY);
    }
  }

  _getLabelY() {
    switch (this.labelMode) {
      case LabelMode.Center:
        return this.pos.y + this.size / 4;
      case LabelMode.Floating:
        return this.pos.y - this.size * (3 / 4);
    }
  }

  setX(x) {
    this.pos.x = x;
  }

  setY(y) {
    this.pos.y = y;
  }

  setPos({x, y}) {
    this.pos = { x, y };
  }

  moveTo({x, y}) {
    this.movementDestination = {x, y};
  }

  stopMovement() {
    this.movementDestination = null;
  }

  moveToward({x, y}) {
    let start = createVector(this.pos.x, this.pos.y);
    let dest = createVector(x, y);
    let distance = dest.dist(start);
    let mappedDistance = map(distance, 100, 0, this.speed, this.speed)
    dest.sub(start);
    dest.normalize();
    dest.mult(mappedDistance);
    start.add(dest);
    this.setPos(start);
  }
}
