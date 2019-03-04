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
        this.yPositions = [5, 25, 45, 65, 85, 105, 125, 145, 165, 185, 205, 225, 245, 265,
            285, 305]; // 31 total (5 - 305)
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
        return Math.floor((Math.random() * (this.xPositions.length - minX)) + minX);
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