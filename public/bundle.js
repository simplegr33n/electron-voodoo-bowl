(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// This file must be Browserified to update bundle.js
const GameManager = require('./public/js/game_manager.js')
module.exports = gameManager = new GameManager()

},{"./public/js/game_manager.js":2}],2:[function(require,module,exports){
let Referee = require('./referee.js');
let RefereeTombstone = require('./referee_tombstone.js');
let Zombie = require('./zombie.js');
let Player = require('./player.js');
let Marker = require('./marker.js')


module.exports = class GameManager {
    constructor() {
        this.xPositions = [89, 102, 117, 130, 143, 157, 170, 183, 197, 210, 223, 237, 250,
            263, 277, 290, 303, 317, 330, 343, 357, 370, 383, 397, 410, 423,
            437, 450, 463, 477, 490, 503, 517, 530, 543, 557, 570, 583, 597,
            610, 623, 637, 650, 663, 677, 690]; // 46 total (90 - 690)
        this.yPositions = [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145,
            155, 165, 175, 185, 195, 205, 215, 225, 235, 245, 255, 265, 275,
            285, 295, 305, 315, 325]; // 33 total (5 - 325)
        this.referees = [];
        this.refereeTombstones = [];
        this.zombies = [];
        this.isStarted = false;
        this.isPaused = false;
        this.player = null;
        this.downsManager = null;
        this.gameLoop = null;
    }

    startGame() {
        // Create Player, or reset position of existing
        if (this.player == null) {
            this.player = new Player()
        } else {
            this.player.set()
        }
        // Get instance of DownsManager, or reset existing
        if (this.downsManager == null) {
            this.downsManager = new DownsManager()
        } else {
            this.downsManager.reset()
        }

        // Reset Entities (other than player)
        this.resetEntities()

        // set onkeydown to player's move function
        document.onkeydown = this.player.move;

        this.isStarted = true;
        var count = 60;
        this.player.set();
        this.player.playerScore = 0;
        document.getElementById('score-text').innerHTML = this.player.playerScore;

        // Update the count down every 1 second if not paused
        this.gameLoop = setInterval(function () {
            if (!this.isPaused) {
                count--;
            }

            // Display the time
            document.getElementById("time-text").innerHTML = count;

            // Iterate through Zombie move functions
            for (var i = 0; i < gameManager.zombies.length; i++) {
                gameManager.zombies[i].move()
            }

            // If the count down is finished, end game
            if (count < 0) {
                gameManager.endGame()
            }
        }, 1000);

        document.getElementById('start-button').style.display = 'none';
    }

    endGame() {
        clearInterval(this.gameLoop);
        document.getElementById('start-button').style.display = 'block';
        document.getElementById('time-text').innerHTML = '--';
        this.isStarted = false;
        this.isPaused = false;
        document.onkeydown = null;
    }

    resetEntities() {
        // Clear any Referee Tombstones from previous game, create new starting Tombstones
        gameManager.refereeTombstones = []
        while (document.getElementsByClassName('referee-tombstone-sprite')[0]) {
            document.getElementsByClassName('referee-tombstone-sprite')[0].remove();
        }
        gameManager.setRefereeTombstones();

        // Clear Zombies from previous game, create new Zombies
        gameManager.zombies = []
        while (document.getElementsByClassName('zombie-sprite')[0]) {
            document.getElementsByClassName('zombie-sprite')[0].remove();
        }
        gameManager.setZombies();

        // Clear Referees from previous game, create new Referees
        gameManager.referees = []
        while (document.getElementsByClassName('referee-sprite')[0]) {
            document.getElementsByClassName('referee-sprite')[0].remove();
        }
        gameManager.setReferees();
    }

    setRefereeTombstones() {
        for (var i = 0; i < 3; i++) {
            gameManager.refereeTombstones.push(new RefereeTombstone(this.getRandX(), this.getRandY()))
        }
    }

    setZombies() {
        for (var i = 0; i < 13; i++) {
            gameManager.zombies.push(new Zombie("zomID_" + i, this.getRandX(this.player.xPos + 1), this.getRandY()))
        }
    }

    setReferees() {
        for (var i = 0; i < 3; i++) {
            gameManager.referees.push(new Referee("refID_" + i, this.getRandX(), this.getRandY()))
        }
        console.log("Referees: " + gameManager.referees)
    }

    // For generating entity locations (other than Player)
    getRandX(minX = 0) {
        return Math.floor((Math.random() * (46 - minX)) + minX);
    }
    getRandY() {
        return Math.floor((Math.random() * 33)); // 
    }

}

class DownsManager {
    constructor() {
        this.reset()
    }

    advanceDowns() {
        // If achieved first down:
        if (gameManager.player.xPos >= this.firstDownMarker) {
            this.reset()
        } else {
            switch (this.downCount) {
                case 1:
                    this.ballMarker = gameManager.player.xPos
                    this.downCount += 1
                    if (this.firstDownMarker >= 44) {
                        this.firstDownMarker = 44
                        document.getElementById('downs-text').innerHTML = '2nd and Goal'
                    } else {
                        document.getElementById('downs-text').innerHTML = '2nd and ' + (Math.round((this.firstDownMarker - this.ballMarker) * 2.5))
                    }
                    this.renderMarkers()
                    break
                case 2:
                    this.ballMarker = gameManager.player.xPos
                    this.downCount += 1
                    if (this.firstDownMarker >= 44) {
                        this.firstDownMarker = 44
                        document.getElementById('downs-text').innerHTML = '3rd and Goal'
                    } else {
                        document.getElementById('downs-text').innerHTML = '3rd and ' + (Math.round((this.firstDownMarker - this.ballMarker) * 2.5))
                    }
                    this.renderMarkers()
                    break
                case 3: // Game Over
                    document.getElementById('downs-text').innerHTML = 'Game Over'
                    gameManager.endGame()
                    break
                default:
                    break
            }
        }
        console.log("downCount: " + this.downCount + ", ball  on: " + this.ballMarker + " , first down at: " + this.firstDownMarker)
    }

    reset() {
        this.ballMarker = gameManager.player.xPos
        this.firstDownMarker = this.ballMarker + 4
        this.downCount = 1
        if (this.firstDownMarker >= 44) {
            this.firstDownMarker = 44
            document.getElementById('downs-text').innerHTML = '1st and Goal'
        } else {
            document.getElementById('downs-text').innerHTML = '1st and 10'
        }
        this.renderMarkers()
    }

    renderMarkers() {
        // Clear old markers
        this.clearMarkers()
        // Render new markers
        Marker.renderFirstMarker(this.firstDownMarker)
        Marker.renderBallMarker(this.ballMarker)
    }

    clearMarkers() {
        // Remove old markers
        while (document.getElementsByClassName('marker-sprite')[0]) {
            document.getElementsByClassName('marker-sprite')[0].remove();
        }
    }
}
},{"./marker.js":3,"./player.js":4,"./referee.js":5,"./referee_tombstone.js":6,"./zombie.js":7}],3:[function(require,module,exports){
module.exports = class Marker {
	static renderBallMarker(xPos) {
		var spriteImage = document.createElement("img");
		spriteImage.src = "././assets/ball_marker.png";
		spriteImage.className = "marker-sprite";
		spriteImage.style.left = gameManager.xPositions[xPos] + "px";
		spriteImage.style.bottom = "0px";
		spriteImage.style.zIndex = 150
		document.getElementById('field-container').appendChild(spriteImage);
    }
    
    static renderFirstMarker(xPos) {
		var spriteImage = document.createElement("img");
		spriteImage.src = "././assets/first_marker.png";
		spriteImage.className = "marker-sprite";
		spriteImage.style.left = gameManager.xPositions[xPos] + "px";
		spriteImage.style.bottom = "0px";
		spriteImage.style.zIndex = 150
		document.getElementById('field-container').appendChild(spriteImage);
	}

}
},{}],4:[function(require,module,exports){
module.exports = class Player {
    constructor() {
        this.xPos = 14;
        this.yPos = 17;
        this.playerForward = true;
        this.name = "Player";
        this.spriteSource = "././assets/player.gif";
        this.playerScore = 0;

        this.render()
    }

    render() {
        var spriteImage = document.createElement("img");
        spriteImage.src = this.spriteSource;
        spriteImage.id = "player-sprite";
        spriteImage.style.left = gameManager.xPositions[this.xPos] + "px"
        spriteImage.style.bottom = gameManager.yPositions[this.yPos] + "px"
        spriteImage.style.zIndex = 100 - this.yPos
        document.getElementById('field-container').appendChild(spriteImage)
    }

    set(setX = 14, setY = 17) {
        this.xPos = setX;
        this.yPos = setY;
        document.getElementById('player-sprite').style.left = gameManager.xPositions[this.xPos] + "px";
        document.getElementById('player-sprite').style.bottom = gameManager.yPositions[this.yPos] + "px";
        document.getElementById('player-sprite').style.zIndex = 100 - this.yPos
    }

    move(e) {
        var keyCode = e.keyCode;

        gameManager.isPaused = false;

        // Up or W
        if ((keyCode == 38) || (keyCode == 87)) {
            if (gameManager.player.yPos <= 31) {
                // If spot clear (null)
                if (gameManager.player.checkSpot(gameManager.player.xPos, gameManager.player.yPos + 1) == null) {
                    gameManager.player.yPos++;
                    document.getElementById('player-sprite').style.bottom = gameManager.yPositions[gameManager.player.yPos] + "px";
                    document.getElementById('player-sprite').style.zIndex = 100 - gameManager.player.yPos
                    // If spot Zombie
                } else if (gameManager.player.checkSpot(gameManager.player.xPos, gameManager.player.yPos + 1).name === "Zombie") {
                    // Advance Downs
                    gameManager.downsManager.advanceDowns()

                    // clear Zombies (and Referees?) and reset Player
                    gameManager.zombies = []
                    while (document.getElementsByClassName('zombie-sprite')[0]) {
                        document.getElementsByClassName('zombie-sprite')[0].remove();
                    }
                    gameManager.isPaused = true
                    gameManager.player.set(gameManager.player.xPos);
                    gameManager.setZombies()
                    // If spot Referee
                } else if (gameManager.player.checkSpot(gameManager.player.xPos, gameManager.player.yPos + 1).name === "Referee") {
                    gameManager.player.checkSpot(gameManager.player.xPos, gameManager.player.yPos + 1).die()
                    gameManager.player.yPos++;
                    document.getElementById('player-sprite').style.bottom = gameManager.yPositions[gameManager.player.yPos + 1] + "px";
                    document.getElementById('player-sprite').style.zIndex = 100 - gameManager.player.yPos
                    gameManager.player.playerScore += 2;
                    document.getElementById('score-text').innerHTML = gameManager.player.playerScore;
                }
            }
        }

        // Down or S
        if ((keyCode == 40) || (keyCode == 83)) {
            if (gameManager.player.yPos >= 1) {
                // If spot clear (null)
                if (gameManager.player.checkSpot(gameManager.player.xPos, gameManager.player.yPos - 1) == null) {
                    gameManager.player.yPos--;
                    document.getElementById('player-sprite').style.bottom = gameManager.yPositions[gameManager.player.yPos] + "px";
                    document.getElementById('player-sprite').style.zIndex = 100 - gameManager.player.yPos
                    // If spot Zombie
                } else if (gameManager.player.checkSpot(gameManager.player.xPos, gameManager.player.yPos - 1).name === "Zombie") {
                    // Advance Downs
                    gameManager.downsManager.advanceDowns()

                    // clear Zombies (and Referees?) and reset Player
                    gameManager.zombies = []
                    while (document.getElementsByClassName('zombie-sprite')[0]) {
                        document.getElementsByClassName('zombie-sprite')[0].remove();
                    }
                    gameManager.isPaused = true
                    gameManager.player.set(gameManager.player.xPos);
                    gameManager.setZombies()
                    // If spot Referee
                } else if (gameManager.player.checkSpot(gameManager.player.xPos, gameManager.player.yPos - 1).name === "Referee") {
                    gameManager.player.checkSpot(gameManager.player.xPos, gameManager.player.yPos - 1).die()
                    gameManager.player.yPos--;
                    document.getElementById('player-sprite').style.bottom = gameManager.yPositions[gameManager.player.yPos - 1] + "px";
                    document.getElementById('player-sprite').style.zIndex = 100 - gameManager.player.yPos
                    gameManager.player.playerScore += 2;
                    document.getElementById('score-text').innerHTML = gameManager.player.playerScore;
                }
            }
        }

        // Left or A
        if (keyCode == 37 || keyCode == 65) {
            // Face player right way
            if (gameManager.player.playerForward) {
                gameManager.player.playerForward = false;
                document.getElementById('player-sprite').style.transform = "scale(-1, 1)";
            }
            if (gameManager.player.xPos >= 1) {
                // If spot clear (null)
                if (gameManager.player.checkSpot(gameManager.player.xPos - 1, gameManager.player.yPos) == null) {
                    gameManager.player.xPos--;
                    document.getElementById('player-sprite').style.left = gameManager.xPositions[gameManager.player.xPos] + "px";
                    document.getElementById('player-sprite').style.zIndex = 100 - gameManager.player.yPos
                    // If spot Zombie
                } else if (gameManager.player.checkSpot(gameManager.player.xPos - 1, gameManager.player.yPos).name === "Zombie") {
                    // Advance Downs
                    gameManager.downsManager.advanceDowns()

                    // clear Zombies (and Referees?) and reset Player
                    gameManager.zombies = []
                    while (document.getElementsByClassName('zombie-sprite')[0]) {
                        document.getElementsByClassName('zombie-sprite')[0].remove();
                    }
                    gameManager.isPaused = true
                    gameManager.player.set(gameManager.player.xPos);
                    gameManager.setZombies()
                    // If spot Referee
                } else if (gameManager.player.checkSpot(gameManager.player.xPos - 1, gameManager.player.yPos).name === "Referee") {
                    // Advance Downs
                    gameManager.downsManager.advanceDowns()

                    gameManager.player.checkSpot(gameManager.player.xPos - 1, gameManager.player.yPos).die()
                    gameManager.player.xPos--;
                    document.getElementById('player-sprite').style.left = gameManager.xPositions[gameManager.player.xPos - 1] + "px";
                    document.getElementById('player-sprite').style.zIndex = 100 - gameManager.player.yPos
                    gameManager.player.playerScore += 2;
                    document.getElementById('score-text').innerHTML = gameManager.player.playerScore;
                }
            }

        }

        // Right or D
        if (keyCode == 39 || keyCode == 68) {
            // Face player right way
            if (!gameManager.player.playerForward) {
                gameManager.player.playerForward = true;
                document.getElementById('player-sprite').style.transform = "scale(1, 1)";
            }
            if (gameManager.player.xPos <= 44) {
                // If spot clear (null)
                if (gameManager.player.checkSpot(gameManager.player.xPos + 1, gameManager.player.yPos) == null) {
                    gameManager.player.xPos++;
                    document.getElementById('player-sprite').style.left = gameManager.xPositions[gameManager.player.xPos] + "px";
                    document.getElementById('player-sprite').style.zIndex = 100 - gameManager.player.yPos
                    // If touchdown
                    if (gameManager.player.xPos == 45) {
                        gameManager.isPaused = true;
                        gameManager.player.playerScore += 7;
                        document.getElementById('score-text').innerHTML = gameManager.player.playerScore;
                        // clear Zombies (and Referees?) and reset Player
                        gameManager.zombies = []
                        while (document.getElementsByClassName('zombie-sprite')[0]) {
                            document.getElementsByClassName('zombie-sprite')[0].remove();
                        }
                        gameManager.player.set()
                        gameManager.downsManager.reset()
                        gameManager.setZombies()
                    }
                    // If spot Zombie
                } else if (gameManager.player.checkSpot(gameManager.player.xPos + 1, gameManager.player.yPos).name === "Zombie") {
                    // Advance Downs
                    gameManager.downsManager.advanceDowns()

                    // clear Zombies (and Referees?) and reset Player
                    gameManager.zombies = []
                    while (document.getElementsByClassName('zombie-sprite')[0]) {
                        document.getElementsByClassName('zombie-sprite')[0].remove();
                    }
                    gameManager.isPaused = true
                    gameManager.player.set(gameManager.player.xPos);
                    gameManager.setZombies()
                    // If spot Referee
                } else if (gameManager.player.checkSpot(gameManager.player.xPos + 1, gameManager.player.yPos).name === "Referee") {
                    gameManager.player.checkSpot(gameManager.player.xPos + 1, gameManager.player.yPos).die()
                    gameManager.player.xPos++;
                    document.getElementById('player-sprite').style.left = gameManager.xPositions[gameManager.player.xPos + 1] + "px";
                    document.getElementById('player-sprite').style.zIndex = 100 - gameManager.player.yPos
                    gameManager.player.playerScore += 2;
                    document.getElementById('score-text').innerHTML = gameManager.player.playerScore;
                }
            }
        }
    }

    // returns object in spot, or null for free spot
    checkSpot(spotX, spotY) {

        var entity = null

        for (var i = 0; i < gameManager.refereeTombstones.length; i++) {
            if ((gameManager.refereeTombstones[i].xPos == spotX) && (gameManager.refereeTombstones[i].yPos == spotY)) {
                entity = gameManager.refereeTombstones[i]
                console.log("Referee Tombstone Collision")
            }
        }

        for (var i = 0; i < gameManager.zombies.length; i++) {
            if ((gameManager.zombies[i].xPos == spotX) && (gameManager.zombies[i].yPos == spotY)) {
                entity = gameManager.zombies[i]
                console.log("Zombie Collision")
            }
        }

        for (var i = 0; i < gameManager.referees.length; i++) {
            if ((gameManager.referees[i].xPos == spotX) && (gameManager.referees[i].yPos == spotY)) {
                entity = gameManager.referees[i]
                console.log("Referee Collision")
            }
        }

        return entity
    }


}



},{}],5:[function(require,module,exports){
module.exports = class Referee {
	constructor(id, xPos, yPos) {
		this.id = id;
		this.xPos = xPos;
		this.yPos = yPos;
		this.name = "Referee";
		this.sprite = "./assets/referee.png";

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

			}
		}

		console.log(this.id + "POST" + gameManager.referees.length)
	}

}
},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
module.exports = class Zombie {
	constructor(id, xPos, yPos) {
		this.xPos = xPos
		this.yPos = yPos
		this.id = id
		this.name = "Zombie"
		this.sprite = "./assets/zombie.gif"

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

},{}]},{},[1]);
