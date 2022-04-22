const Debug = true;
const CanvasWidth = 550;
const CanvasHeight = 550;
const CanvasCenter = { x: CanvasWidth / 2, y: CanvasHeight / 2 };

const arena = new Arena(ArenaShape.Circle);

let party = {
  tank1: new Player({
    role: PlayerRole.Tank,
    label: "Cygnas",
    labelMode: LabelMode.Floating,
  }),
  dps4: new Player({
    role: PlayerRole.DPS,
    label: "Raez",
    labelMode: LabelMode.Floating,
  }),
  healer2: new Player({
    role: PlayerRole.Healer,
    label: "Jaro",
    labelMode: LabelMode.Floating,
  }),
  dps1: new Player({
    role: PlayerRole.DPS,
    label: "Brick",
    labelMode: LabelMode.Floating,
  }),
  tank2: new Player({
    role: PlayerRole.Tank,
    label: "Mouse",
    labelMode: LabelMode.Floating,
  }),
  dps2: new Player({
    role: PlayerRole.DPS,
    label: "Waifu",
    labelMode: LabelMode.Floating,
  }),
  healer1: new Player({
    role: PlayerRole.Healer,
    label: "R'hian",
    labelMode: LabelMode.Floating,
  }),
  dps3: new Player({
    role: PlayerRole.DPS,
    label: "Jonsi",
    labelMode: LabelMode.Floating,
  }),
};

let mechanic = new Mechanic();
mechanic.addStep(
  new MechanicStep("Stack Center", () => {
    for (let p of Object.values(party)) {
      p.moveTo({ x: 0, y: 0 });
    }
  })
);
mechanic.addStep(
  new MechanicStep("Spread to break chains", () => {
    party.tank1.moveTo({ x: -238, y: 0 });
    party.tank2.moveTo({ x: -238, y: 0 });
    party.healer1.moveTo({ x: -238, y: 0 });
    party.healer2.moveTo({ x: -238, y: 0 });
    party.dps1.moveTo({ x: 238, y: 0 });
    party.dps2.moveTo({ x: 238, y: 0 });
    party.dps3.moveTo({ x: 238, y: 0 });
    party.dps4.moveTo({ x: 238, y: 0 });
  })
);
mechanic.addStep(
  new MechanicStep("Move to intercept metors", () => {
    party.tank2.moveTo({ x: -60, y: -150 });
    party.tank1.moveTo({ x: -60, y: -50 });
    party.healer1.moveTo({ x: -60, y: 50 });
    party.healer2.moveTo({ x: -60, y: 150 });
    party.dps1.moveTo({ x: 60, y: -150 });
    party.dps2.moveTo({ x: 60, y: -50 });
    party.dps3.moveTo({ x: 60, y: 50 });
    party.dps4.moveTo({ x: 60, y: 150 });
  })
);

function setClockPositions() {
  let radius = height / 4;
  let v = createVector(0, -radius);
  for (let p of Object.values(party)) {
    p.setPos(v);
    v.rotate(45);
    p.stopMovement();
  }
}

function setup() {
  createCanvas(CanvasWidth, CanvasHeight);
  let stepdesc = document.createElement("p");
  stepdesc.setAttribute("id", "stepDescription");
  document.body.appendChild(stepdesc);
  angleMode(DEGREES);
  translate(width / 2, height / 2);
  mechanic.setStartPositions();
}

function draw() {
  background("skyblue");
  translate(width / 2, height / 2);

  arena.draw();

  for (let p of Object.values(party)) {
    p.draw();
  }

  if (Debug) {
    displayMouseCoordinates();
  }
}

function mousePressed() {}

function mouseClicked() {}

function mouseDragged() {}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    mechanic.playNextStep();
  }

  if (keyCode === LEFT_ARROW) {
    mechanic.stepBack();
  }
}

function keyTyped() {
  if (key === "r") {
    mechanic.reset();
  }

  if (key === "m") {
    let mCoords = translatedMouseCoords();
    navigator.clipboard.writeText(`{x: ${mCoords.x}, y: ${mCoords.y}}`);
  }
}
