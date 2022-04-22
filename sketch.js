const Debug = true;
const CanvasWidth = 550;
const CanvasHeight = 550;
const CanvasCenter = { x: CanvasWidth / 2, y: CanvasHeight / 2 };

const arena = new Arena(ArenaShape.Circle);

function setStepDescription(desc) {
  document.getElementById("stepDescription").innerHTML = desc;
}

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

class Mechanic {
  constructor(steps = []) {
    this.steps = steps; // For now this will be a list of functions
    this.currentStep = 0;
    this.set_start_positions = () => {};
  }

  addStep(step) {
    this.steps.push(step);
  }

  playNextStep() {
    if (this.currentStep < this.steps.length) {
      this.steps[this.currentStep++]()
    }
  }
}

let mechanic = new Mechanic()
mechanic.set_start_positions = () => {
  for (p of Object.values(party)) {
    p.setPos(randomPos());
    p.stopMovement();
  }
}
mechanic.addStep(() => {
  setStepDescription("Stack Center");
  for (p of Object.values(party)) {
    p.moveTo({x: 0, y: 0});
  }
});
mechanic.addStep(() => {
  setStepDescription("Spread to break chains")
  party.tank1.moveTo({x: -238, y: 0});
  party.tank2.moveTo({x: -238, y: 0});
  party.healer1.moveTo({x: -238, y: 0});
  party.healer2.moveTo({x: -238, y: 0});
  party.dps1.moveTo({x: 238, y: 0});
  party.dps2.moveTo({x: 238, y: 0});
  party.dps3.moveTo({x: 238, y: 0});
  party.dps4.moveTo({x: 238, y: 0});
});
mechanic.addStep(() => {
  setStepDescription("Move to intercept meteors")
  party.tank2.moveTo({x: -60, y: -150});
  party.tank1.moveTo({x: -60, y: -50});
  party.healer1.moveTo({x: -60, y: 50});
  party.healer2.moveTo({x: -60, y: 150});
  party.dps1.moveTo({x: 60, y: -150});
  party.dps2.moveTo({x: 60, y: -50});
  party.dps3.moveTo({x: 60, y: 50});
  party.dps4.moveTo({x: 60, y: 150});
});

function set_clock_positions() {
  destination = null;
  let radius = height / 4;
  let v = createVector(0, -radius);
  for (p of Object.values(party)) {
    p.setPos(v);
    v.rotate(45);
    p.stopMovement();
  }
}

function setup() {
  createCanvas(CanvasWidth, CanvasHeight);
  let stepdesc = document.createElement("p")
  stepdesc.setAttribute("id", "stepDescription");
  document.body.appendChild(stepdesc);
  angleMode(DEGREES);
  translate(width / 2, height / 2);
  console.log("bnyeh");
  mechanic.set_start_positions();
}

function draw() {
  background("skyblue");
  translate(width / 2, height / 2);

  arena.draw();

  for (p of Object.values(party)) {
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
  if (keyCode === RIGHT_ARROW){
    mechanic.playNextStep();
  }
}

function keyTyped() {
  if (key === 'r') {
    mechanic.set_start_positions();
    mechanic.currentStep = 0;
    setStepDescription("")
  }

  if (key === 'm') {
    mCoords = translatedMouseCoords();
    navigator.clipboard.writeText(`{x: ${mCoords.x}, y: ${mCoords.y}}`);
  }
}
