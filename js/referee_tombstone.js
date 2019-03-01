module.exports = class Referee {
    constructor(xPos, yPos) {
      this.xPos = xPos;
      this.yPos = yPos;
      this.name = "Referee Tombstone";
      this.sprite = "./assets/referee_tombstone.png";

      this.render();
    }

    render() {
        var spriteImage = document.createElement("img");
        spriteImage.src = this.sprite;
        spriteImage.className = "referee-tombstone-sprite";
        spriteImage.style.left = gameManager.xPositions[this.xPos] + "px";
        spriteImage.style.bottom = gameManager.yPositions[this.yPos] + "px";
        spriteImage.style.zIndex = 100 - this.yPos
        document.getElementById('field-container').appendChild(spriteImage);
    }

  }