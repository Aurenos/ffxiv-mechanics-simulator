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
  constructor(
    role,
    {
      label = null,
      labelMode = LabelMode.Center,
      labelFill = LabelFill.Black,
    } = {}
  ) {
    this.role = role;
    this.pos = { x: 0, y: 0 };
    this.size = 24;
    this.label = label;
    this.labelMode = labelMode;
    this.labelFill = labelFill;
    this.movementDestination = null;
    this.movementPath = [];
    this.pathStep = 0;
    this.speed = 2.5;
  }

  draw() {
    if (this.movementPath.length > 0) {
      this.moveTo(this.movementPath[this.pathStep]);
    }

    if (this.movementDestination !== null) {
      if (!this.isNearDestination()) {
        this.moveToward(this.movementDestination);
      } else {
        this.setPos(this.movementDestination);
        this.stopMovement();
        if (
          this.movementPath.length > 0 &&
          ++this.pathStep >= this.movementPath.length
        ) {
          this.movementPath = [];
          this.pathStep = 0;
        }
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

  setPos({ x, y }) {
    this.pos = { x, y };
  }

  moveTo({ x, y }, fuzzFactor = null) {
    if (fuzzFactor !== null) {
      fuzzFactor = abs(fuzzFactor); // in case a negative number was supplied for some reason
      let xAdjust = randRange(-fuzzFactor, fuzzFactor);
      let yAdjust = randRange(-fuzzFactor, fuzzFactor);
      x += xAdjust;
      y += yAdjust;
    }
    this.movementDestination = { x, y };
  }

  movePath(path) {
    this.movementPath = path;
  }

  stopMovement() {
    this.movementDestination = null;
  }

  moveToward({ x, y }) {
    let start = createVector(this.pos.x, this.pos.y);
    let dest = createVector(x, y);
    let distance = dest.dist(start);
    let mappedDistance = map(distance, 100, 0, this.speed, this.speed);
    dest.sub(start);
    dest.normalize();
    dest.mult(mappedDistance);
    start.add(dest);
    this.setPos(start);
  }

  isNearDestination() {
    let pVec = createVector(this.pos.x, this.pos.y);
    let destVec = createVector(
      this.movementDestination.x,
      this.movementDestination.y
    );
    return pVec.dist(destVec) < this.speed;
  }
}

let defaultParty = {
  tank1: new Player(PlayerRole.Tank, { label: 1 }),
  tank2: new Player(PlayerRole.Tank, { label: 2 }),
  healer1: new Player(PlayerRole.Healer, { label: 1 }),
  healer2: new Player(PlayerRole.Healer, { label: 2 }),
  dps1: new Player(PlayerRole.DPS, { label: 1 }),
  dps2: new Player(PlayerRole.DPS, { label: 2 }),
  dps3: new Player(PlayerRole.DPS, { label: 3 }),
  dps4: new Player(PlayerRole.DPS, { label: 4 }),
};

let detailedParty = {
  tank1: new Player(PlayerRole.Tank, {
    label: "Cygnas",
    labelMode: LabelMode.Floating,
  }),
  dps4: new Player(PlayerRole.DPS, {
    label: "Raez",
    labelMode: LabelMode.Floating,
  }),
  healer2: new Player(PlayerRole.Healer, {
    label: "Jaro",
    labelMode: LabelMode.Floating,
  }),
  dps1: new Player(PlayerRole.DPS, {
    label: "Brick",
    labelMode: LabelMode.Floating,
  }),
  tank2: new Player(PlayerRole.Tank, {
    label: "Mouse",
    labelMode: LabelMode.Floating,
  }),
  dps2: new Player(PlayerRole.DPS, {
    label: "Waifu",
    labelMode: LabelMode.Floating,
  }),
  healer1: new Player(PlayerRole.Healer, {
    label: "R'hian",
    labelMode: LabelMode.Floating,
  }),
  dps3: new Player(PlayerRole.DPS, {
    label: "Jonsi",
    labelMode: LabelMode.Floating,
  }),
};

let party = defaultParty;
