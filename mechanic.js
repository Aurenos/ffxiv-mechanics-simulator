class Mechanic {
  constructor(steps = []) {
    this.steps = steps;
    this.currentStep = 0;
    this.posStack = [];
    this.fieldObjects = [];
  }

  addStep(step) {
    this.steps.push(step);
  }

  reset() {
    this.currentStep = 0;
    this.clearStepDescription();
    this.setStartPositions();
    this.clearFieldObjects();
  }

  setStartPositions() {
    // Override as necessary
    for (let p of Object.values(party)) {
      p.setPos(randomPos());
      p.stopMovement();
    }
  }

  snapshotPositions() {
    this.posStack.push({
      tank1: party.tank1.pos,
      tank2: party.tank2.pos,
      healer1: party.healer1.pos,
      healer2: party.healer2.pos,
      dps1: party.dps1.pos,
      dps2: party.dps2.pos,
      dps3: party.dps3.pos,
      dps4: party.dps4.pos,
    });
  }

  playNextStep() {
    this.snapshotPositions();
    if (this.currentStep < this.steps.length) {
      this.steps[this.currentStep++].play();
    }
  }

  stepBack() {
    if (this.currentStep > 0) {
      let previousPositions = this.posStack.pop();
      for (let p in previousPositions) {
        party[p].setPos(previousPositions[p]);
      }
      this.clearFieldObjects(this.currentStep);
      if (--this.currentStep === 0) {
        this.clearStepDescription();
      } else {
        this.steps[this.currentStep - 1].displayStepDescription();
      }
    }
  }

  clearStepDescription() {
    document.getElementById("stepDescription").innerHTML = "";
  }

  addFieldObject(fieldObject) {
    if (!this.fieldObjects[this.currentStep]) {
      this.fieldObjects[this.currentStep] = [];
    }
    this.fieldObjects[this.currentStep].push(fieldObject);
  }

  getFieldObjectById(id) {
    if (id === null || id === undefined) return;

    for (const key in this.fieldObjects) {
      for (let obj of this.fieldObjects[key]) {
        if (obj.id === id) {
          return obj;
        }
      }
    }
  }

  removeFieldObject(id) {
    if (id === null || id === undefined) return;
    let targetKey = null;
    let targetIndex = null;
    for (const key in this.fieldObjects) {
      for (const [index, obj] of this.fieldObjects[key].entries()) {
        if (obj.id === id) {
          targetKey = key;
          targetIndex = index;
          break;
        }
      }
    }
    if (targetKey === null || targetIndex === null) {
      console.log(`No fieldObject exists with ID ${id}. Nothing to remove.`);
    } else {
      this.fieldObjects[targetKey].splice(targetIndex, 1);
    }
  }

  clearFieldObjects(step = null) {
    if (step === null) {
      this.fieldObjects = {};
    } else {
      delete this.fieldObjects[step];
    }
  }

  clearLastStepFieldObjects() {
    this.clearFieldObjects(this.currentStep - 1);
  }
}

class MechanicStep {
  constructor(description, mechanicFn, id = null) {
    this.description = description;
    this.mechanicFn = mechanicFn;
    this.id = id;
  }

  play() {
    this.displayStepDescription();
    this.mechanicFn();
  }

  displayStepDescription() {
    document.getElementById("stepDescription").innerHTML = this.description;
  }
}
