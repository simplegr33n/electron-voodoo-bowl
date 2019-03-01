module.exports = class Zombie {
  constructor(xPos, yPos) {
    this.xPos = xPos
    this.yPos = yPos
    this.name = "Zombie"
    this.sprite = "./assets/zombie.png"
  }

  tackleSound() {
    console.log(this.name + " *Tackle*")
  }

}


