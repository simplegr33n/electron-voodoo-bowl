module.exports = class Referee {
    constructor(xPos, yPos) {
      this.xPos = xPos;
      this.yPos = yPos;
      this.name = "Referee";
      this.sprite = "./assets/referee.png";
      this.whistleSound = this.whistleSound();
    }
  
    whistleSound() {
      console.log(this.name + " *Whistle Blow*");
    }
  }