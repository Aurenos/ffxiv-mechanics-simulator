class Mechanic {
  constructor(steps = []) {
    this.steps = steps;
    this.currentStep = 0;
    this.posStack = [];
  }

  addStep(step) {
    this.steps.push(step);
  }

  reset() {
    this.currentStep = 0;
    this.clearStepDescription();
    this.setStartPositions();
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
}

class MechanicStep {
  constructor(description, mechanicFn) {
    this.description = description;
    this.mechanicFn = mechanicFn;
  }

  play() {
    this.displayStepDescription();
    this.mechanicFn();
  }

  displayStepDescription() {
    document.getElementById("stepDescription").innerHTML = this.description;
  }
}
