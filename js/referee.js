module.exports = class Referee {
	constructor(id, xPos, yPos) {
		this.id = id;
		this.xPos = xPos;
		this.yPos = yPos;
		this.name = "Referee";
		this.sprite = "./assets/referee.gif";

		this.render()
	}

	render() {
		var spriteImage = document.createElement("img");
		spriteImage.src = this.sprite;
		spriteImage.id = this.id;
		spriteImage.className = "referee-sprite";
		spriteImage.style.left = gameManager.xPositions[this.xPos] + "px";
		spriteImage.style.bottom = gameManager.yPositions[this.yPos] + "px";
		spriteImage.style.zIndex = 100 - this.yPos
		document.getElementById('field-container').appendChild(spriteImage);
	}

	die() {
		// TODO: FIGURE ahhhh.

		console.log(this.id + "PRE" + gameManager.referees.length + "\n" + gameManager.referees)

		for (var i = 0; i < gameManager.referees.length; i++) {
			if (gameManager.referees[i].id === this.id) {
				console.log("SAME ID! " + this.id)

				try {
					document.getElementById(this.id).remove()
				} catch {
					console.log(this.id + "already removed")
					return;
				}

				gameManager.referees.pop(gameManager.referees[i])

				// Update player score
				gameManager.player.playerScore += 2;
                document.getElementById('score-text').innerHTML = gameManager.player.playerScore;

			}
		}

		console.log(this.id + "POST" + gameManager.referees.length)
	}

}