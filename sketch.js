const Debug = true;
const CanvasWidth = 550;
const CanvasHeight = 550;
const CanvasCenter = { x: CanvasWidth / 2, y: CanvasHeight / 2 };
const ArenaCenter = { x: 0, y: 0 };

const arena = new Arena(ArenaShape.Circle);

let mechanic = new Mechanic();
mechanic.addStep(
  new MechanicStep("Stack Center", () => {
    let fillColor = "red";
    let outlineColor = "darkred";
    let opts = { fillColor, outlineColor };
    mechanic.addFieldObject(
      new CircleAOE({ x: -60, y: -150 }, 40, { ...opts, id: "meteor1" })
    );
    mechanic.addFieldObject(
      new CircleAOE({ x: -60, y: -50 }, 40, { ...opts, id: "meteor2" })
    );
    mechanic.addFieldObject(
      new CircleAOE({ x: -60, y: 50 }, 40, { ...opts, id: "meteor3" })
    );
    mechanic.addFieldObject(
      new CircleAOE({ x: -60, y: 150 }, 40, { ...opts, id: "meteor4" })
    );
    mechanic.addFieldObject(
      new CircleAOE({ x: 60, y: -150 }, 40, { ...opts, id: "meteor5" })
    );
    mechanic.addFieldObject(
      new CircleAOE({ x: 60, y: -50 }, 40, { ...opts, id: "meteor6" })
    );
    mechanic.addFieldObject(
      new CircleAOE({ x: 60, y: 50 }, 40, { ...opts, id: "meteor7" })
    );
    mechanic.addFieldObject(
      new CircleAOE({ x: 60, y: 150 }, 40, { ...opts, id: "meteor8" })
    );
    for (let p of Object.values(party)) {
      p.moveTo(ArenaCenter, 10);
    }
  })
);
mechanic.addStep(
  new MechanicStep("Spread to break chains", () => {
    let breakLength = 350;
    let tetherColor = "purple";
    let stackFuzziness = 10;
    mechanic.addFieldObject(
      new Tether(party.tank1, party.dps1, { tetherColor, breakLength })
    );
    mechanic.addFieldObject(
      new Tether(party.tank2, party.dps2, { tetherColor, breakLength })
    );
    mechanic.addFieldObject(
      new Tether(party.healer1, party.dps3, { tetherColor, breakLength })
    );
    mechanic.addFieldObject(
      new Tether(party.healer2, party.dps4, { tetherColor, breakLength })
    );

    party.tank1.moveTo({ x: -238, y: 0 }, stackFuzziness);
    party.tank2.moveTo({ x: -238, y: 0 }, stackFuzziness);
    party.healer1.moveTo({ x: -238, y: 0 }, stackFuzziness);
    party.healer2.moveTo({ x: -238, y: 0 }, stackFuzziness);
    party.dps1.moveTo({ x: 238, y: 0 }, stackFuzziness);
    party.dps2.moveTo({ x: 238, y: 0 }, stackFuzziness);
    party.dps3.moveTo({ x: 238, y: 0 }, stackFuzziness);
    party.dps4.moveTo({ x: 238, y: 0 }, stackFuzziness);
  })
);
mechanic.addStep(
  new MechanicStep("Move to intercept metors", () => {
    mechanic.clearLastStepFieldObjects();
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
mechanic.addStep(
  new MechanicStep(
    "If mouth is open, adjust outward for central line AoE",
    () => {
      mechanic.addFieldObject(
        new LineAOE(ArenaCenter, 120, height, {
          fillColor: "purple",
          outlineColor: "purple",
        })
      );
      const adjust = 20;
      party.tank1.moveTo({
        x: party.tank1.pos.x - adjust,
        y: party.tank1.pos.y,
      });
      party.tank2.moveTo({
        x: party.tank2.pos.x - adjust,
        y: party.tank2.pos.y,
      });
      party.healer1.moveTo({
        x: party.healer1.pos.x - adjust,
        y: party.healer1.pos.y,
      });
      party.healer2.moveTo({
        x: party.healer2.pos.x - adjust,
        y: party.healer2.pos.y,
      });
      party.dps1.moveTo({ x: party.dps1.pos.x + adjust, y: party.dps1.pos.y });
      party.dps2.moveTo({ x: party.dps2.pos.x + adjust, y: party.dps2.pos.y });
      party.dps3.moveTo({ x: party.dps3.pos.x + adjust, y: party.dps3.pos.y });
      party.dps4.moveTo({ x: party.dps4.pos.x + adjust, y: party.dps4.pos.y });
    }
  )
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

  for (fieldObjectKey in mechanic.fieldObjects) {
    for (fieldObject of mechanic.fieldObjects[fieldObjectKey]) {
      fieldObject.draw();
    }
  }

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
