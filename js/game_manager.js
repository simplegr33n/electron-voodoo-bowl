let Referee = require('./referee.js');
let RefereeTombstone = require('./referee_tombstone.js');
let Zombie = require('./zombie.js');
let Player = require('./player.js');
let Marker = require('./marker.js')


module.exports = class GameManager {
    constructor() {
        this.fieldWidth = 10000;
        this.fieldHeight = 700;
        this.xPositions = [];
        this.yPositions = [];
        this.referees = [];
        this.refereeTombstones = [];
        this.zombies = [];
        this.isStarted = false;
        this.isPaused = false;
        this.player = null;
        this.downsManager = null;
        this.gameLoop = null;

        this.getXPositionArray(); // log an array based on fieldWidth / 150 (yards) -- use if changing fieldWidth to get new Array
        this.getYPositionArray(); // 13? vertical positions
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

    getXPositionArray() {
        var yardInPixels = Math.round(this.fieldWidth / 150)
        var progress = 0;
        var next = Math.round(progress + yardInPixels);

        var testArray = [0]
        for (next; next <= this.fieldWidth; next += yardInPixels) {
            testArray.push(next);
           
        }
        this.xPositions = testArray;

        // Get array in logs to plug into GameManager constructor
        console.log("FW: [" + testArray + "]");
    }

    getYPositionArray() {
        var stepInPixels = Math.round(this.fieldHeight / 13)
        var progress = 0;
        var next = Math.round(progress + stepInPixels);

        var testArray = [0]
        for (next; Math.round(next + stepInPixels) <= this.fieldHeight; next += stepInPixels) {
            testArray.push(next);
           
        }
        this.yPositions = testArray;

        // Get array in logs to plug into GameManager constructor
        console.log("FH: [" + testArray + "]");
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
            console.log(this.player.xPos + 1 + " " + this.player.xPos + 25)
            gameManager.zombies.push(new Zombie("zomID_" + i, this.getRandX(this.player.xPos + 1, this.player.xPos + 20), this.getRandY()))
        }
        console.log(gameManager.zombies)
    }

    setReferees() {
        for (var i = 0; i < 3; i++) {
            gameManager.referees.push(new Referee("refID_" + i, this.getRandX(), this.getRandY()))
        }
        console.log("Referees: " + gameManager.referees)
    }

    // For generating entity locations (other than Player)
    getRandX(minX = 0, maxX = 0) {
        return Math.floor((Math.random() * (this.xPositions.length - minX - (this.xPositions.length - maxX)) + minX));
    }
    getRandY() {
        return Math.floor((Math.random() * this.yPositions.length)); // 
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
                    if (this.firstDownMarker >= gameManager.xPositions.length - 3) {
                        this.firstDownMarker = gameManager.xPositions.length - 3
                        //document.getElementById('downs-text').innerHTML = '2nd and Goal'
                    } else {
                        //document.getElementById('downs-text').innerHTML = '2nd and ' + (Math.round((this.firstDownMarker - this.ballMarker) * 2.5))
                    }
                    this.renderMarkers()
                    break
                case 2:
                    this.ballMarker = gameManager.player.xPos
                    this.downCount += 1
                    if (this.firstDownMarker >= gameManager.xPositions.length - 3) {
                        this.firstDownMarker = gameManager.xPositions.length - 3
                        //document.getElementById('downs-text').innerHTML = '3rd and Goal'
                    } else {
                        //document.getElementById('downs-text').innerHTML = '3rd and ' + (Math.round((this.firstDownMarker - this.ballMarker) * 2.5))
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
        if (this.firstDownMarker >= gameManager.xPositions.length - 3) {
            this.firstDownMarker = gameManager.xPositions.length - 3
            //document.getElementById('downs-text').innerHTML = '1st and Goal'
        } else {
            //document.getElementById('downs-text').innerHTML = '1st and 10'
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