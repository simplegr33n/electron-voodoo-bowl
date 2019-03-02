let Referee = require('./referee.js');
let RefereeTombstone = require('./referee_tombstone.js');
let Zombie = require('./zombie.js');
let Player = require('./player.js');


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
    }

    startGame() {
        // Create Player, or reset position of existing
        if (this.player == null) {
            this.player = new Player()
        } else {
            this.player.set()
        }

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

        // set onkeydown to player's move function
        document.onkeydown = this.player.move;

        this.isStarted = true;
        var count = 60;
        this.player.set();
        this.player.playerScore = 0;
        document.getElementById('score-text').innerHTML = this.player.playerScore;

        // Update the count down every 1 second if not paused
        var x = setInterval(function () {
            if (!this.isPaused) {
                count--;
            }

            // Display the time
            document.getElementById("time-text").innerHTML = count;

            // If the count down is finished, end game
            if (count < 0) {
                clearInterval(x);
                document.getElementById('start-button').style.display = 'block';
                document.getElementById('time-text').innerHTML = 'EXPIRED';
                this.isStarted = false;
                this.isPaused = false;
                document.onkeydown = null;
            }
        }, 1000);

        document.getElementById('start-button').style.display = 'none';
    }

    setRefereeTombstones() {
        for (var i = 0; i < 3; i++) {
            gameManager.refereeTombstones.push(new RefereeTombstone(this.getRandX(), this.getRandY()))
        }
    }

    setZombies() {
        for (var i = 0; i < 3; i++) {
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