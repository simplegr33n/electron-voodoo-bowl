var gameManager = require('./game_manager');

module.exports = class Referee {
    constructor(xPos, yPos) {
      this.xPos = xPos;
      this.yPos = yPos;
      this.name = "Referee Tombstone";
      this.sprite = "./assets/referee_tombstone.png";
    }

    render() {
        var spriteImage = document.createElement("img");
        spriteImage.src = this.sprite;
        spriteImage.className = "referee-tombstone-sprite";
        spriteImage.style.left = gameManager.xPositions[this.xPos] + "px"
        spriteImage.style.bottom = gameManager.yPositions[this.yPos] + "px"
        document.getElementById('field-container').appendChild(spriteImage)
    }
  
    hereLies() {
      console.log("Here lies a bad ref...");
    }
  }