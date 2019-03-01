let RefereeTombstone = require('./referee_tombstone.js');

module.exports = class GameManager {
    constructor() {
        this.xPositions = [89, 102, 117, 130, 143, 157, 170, 183, 197, 210, 223, 237, 250,
            263, 277, 290, 303, 317, 330, 343, 357, 370, 383, 397, 410, 423,
            437, 450, 463, 477, 490, 503, 517, 530, 543, 557, 570, 583, 597,
            610, 623, 637, 650, 663, 677, 690]; // 46 total (90 - 690)
        this.yPositions = [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145,
            155, 165, 175, 185, 195, 205, 215, 225, 235, 245, 255, 265, 275,
            285, 295, 305, 315, 325]; // 33 total (5 - 325)
        this.refereeTombstones = []
    }

    // TODO: move out of index.html...
    startGame() {
        // Clear any tombstones from previous game
        gameManager.refereeTombstones = []
        while (document.getElementsByClassName('referee-tombstone-sprite')[0]) {
            document.getElementsByClassName('referee-tombstone-sprite')[0].remove();
        }

        // layout some initial tombstones 'n such
        gameManager.setRefereeTombstones();

        // set onkeydown to player's move function
        document.onkeydown = player.move;

        isStarted = true;
        var count = 60;
        player.set();
        player.playerScore = 0;
        document.getElementById('score-text').innerHTML = player.playerScore;

        // Update the count down every 1 second if not paused
        var x = setInterval(function () {
            if (!isPaused) {
                count--;
            }

            // Display the time
            document.getElementById("time-text").innerHTML = count;

            // If the count down is finished, end game
            if (count < 0) {
                clearInterval(x);
                document.getElementById('start-button').style.display = 'block';
                document.getElementById('time-text').innerHTML = 'EXPIRED';
                isStarted = false;
                isPaused = false;
                document.onkeydown = null;
            }
        }, 1000);

        document.getElementById('start-button').style.display = 'none';
    }

    setRefereeTombstones() {
        const refTombstoneOne = new RefereeTombstone(this.getRandX(), this.getRandY());
        const refTombstoneTwo = new RefereeTombstone(this.getRandX(), this.getRandY());
        const refTombstoneThree = new RefereeTombstone(this.getRandX(), this.getRandY());

        this.refereeTombstones = [refTombstoneOne, refTombstoneTwo, refTombstoneThree]
    }


    //TODO -- static methods?
    getRandX() {
        return Math.floor((Math.random() * 46)); // TODO: use this.xPositions.size (..but how?)
    }
    getRandY() {
        return Math.floor((Math.random() * 33)); // TODO: use this.xPositions.size (..but how?)
    }

}