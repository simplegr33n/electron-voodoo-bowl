module.exports = class Zombie {
  constructor(xPos, yPos) {
    this.xPos = xPos
    this.yPos = yPos
    this.name = "Zombie"
    this.sprite = "./assets/zombie.png"

    this.render()
  }

  render() {
    var spriteImage = document.createElement("img");
    spriteImage.src = this.sprite;
    spriteImage.className = "zombie-sprite";
    spriteImage.style.left = gameManager.xPositions[this.xPos] + "px";
    spriteImage.style.bottom = gameManager.yPositions[this.yPos] + "px";
    spriteImage.style.zIndex = 100 - this.yPos
    document.getElementById('field-container').appendChild(spriteImage);
  }

  tackleSound() {
    console.log(this.name + " *Tackle*")
  }

}
