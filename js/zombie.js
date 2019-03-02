module.exports = class Zombie {
	constructor(id, xPos, yPos) {
		this.xPos = xPos
		this.yPos = yPos
		this.id = id
		this.name = "Zombie"
		this.sprite = "./assets/zombie.png"

		this.render()
	}

	render() {
		var spriteImage = document.createElement("img");
		spriteImage.src = this.sprite;
		spriteImage.id = this.id;
		spriteImage.className = "zombie-sprite";
		spriteImage.style.left = gameManager.xPositions[this.xPos] + "px";
		spriteImage.style.bottom = gameManager.yPositions[this.yPos] + "px";
		spriteImage.style.zIndex = 100 - this.yPos
		document.getElementById('field-container').appendChild(spriteImage);
	}

	move() {
		// Randomize if zombie will move 
		if (Math.round(Math.random()) == 1) {
			// Randomize direction
			switch (Math.floor(Math.random() * 4)) {
				case 0:
					this.xPos -= 1;
					document.getElementById(this.id).style.left = gameManager.xPositions[this.xPos] + "px";
					document.getElementById(this.id).style.bottom = gameManager.yPositions[this.yPos] + "px";
					document.getElementById(this.id).style.zIndex = 100 - this.yPos
					break;
				case 1:
					this.xPos += 1;
					document.getElementById(this.id).style.left = gameManager.xPositions[this.xPos] + "px";
					document.getElementById(this.id).style.bottom = gameManager.yPositions[this.yPos] + "px";
					document.getElementById(this.id).style.zIndex = 100 - this.yPos
					break;
				case 2:
					this.yPos -= 1;
					document.getElementById(this.id).style.left = gameManager.xPositions[this.xPos] + "px";
					document.getElementById(this.id).style.bottom = gameManager.yPositions[this.yPos] + "px";
					document.getElementById(this.id).style.zIndex = 100 - this.yPos
					break;
				case 3:
					this.yPos += 1;
					document.getElementById(this.id).style.left = gameManager.xPositions[this.xPos] + "px";
					document.getElementById(this.id).style.bottom = gameManager.yPositions[this.yPos] + "px";
					document.getElementById(this.id).style.zIndex = 100 - this.yPos
					break;
				default:
					break;
			}
		}
	}

}
