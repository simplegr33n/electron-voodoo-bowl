module.exports = class Zombie {
  constructor(xPos, yPos) {
    this.xPos = xPos
    this.yPos = yPos
    this.name = "Zombie"
    this.sprite = "./assets/zombie.png"
  }

  moveUp() {

  }
  moveDown() {
  
  }
  moveLeft() {
  
  }
  moveRight() {
  
  }

  tackleSound() {
    console.log(this.name + " *Tackle*")
  }

}


