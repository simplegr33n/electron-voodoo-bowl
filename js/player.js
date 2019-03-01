var gameManager = require('./game_manager');

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
        document.getElementById('field-container').appendChild(spriteImage)
    }

    set(setX = 14, setY = 17) {
        this.xPos = setX;
        this.yPos = setY;
        document.getElementById('player-sprite').style.left = gameManager.xPositions[this.xPos] + "px";
        document.getElementById('player-sprite').style.bottom = gameManager.yPositions[this.yPos] + "px";
    }

    move(e) {
        var keyCode = e.keyCode;

        isPaused = false;

        // Up or W
        if ((keyCode == 38) || (keyCode == 87)) {
            if (player.yPos <= 31) {
                player.yPos++;
                document.getElementById('player-sprite').style.bottom = gameManager.yPositions[player.yPos] + "px";
            }
        }

        // Down or S
        if ((keyCode == 40) || (keyCode == 83)) {
            if (player.yPos >= 1) {
                player.yPos--;
                document.getElementById('player-sprite').style.bottom = gameManager.yPositions[player.yPos] + "px";
            }
        }

        // Left or A
        if (keyCode == 37 || keyCode == 65) {
            // Face player right way
            if (player.playerForward) {
                player.playerForward = false;
                document.getElementById('player-sprite').style.transform = "scale(-1, 1)";
            }
            if (player.xPos >= 1) {
                player.xPos--;
                document.getElementById('player-sprite').style.left = gameManager.xPositions[player.xPos] + "px";
            }

        }

        // Right or D
        if (keyCode == 39 || keyCode == 68) {
            // Face player right way
            if (!player.playerForward) {
                player.playerForward = true;
                document.getElementById('player-sprite').style.transform = "scale(1, 1)";
            }
            if (player.xPos <= 44) {
                player.xPos++;
                document.getElementById('player-sprite').style.left = gameManager.xPositions[player.xPos] + "px";
                if (player.xPos == 45) {
                    isPaused = true;
                    player.playerScore += 7;
                    document.getElementById('score-text').innerHTML = player.playerScore;
                    player.set();
                }
            }
        }

    }
}


