var gameManager = require('./game_manager');

var player = document.getElementById('player-sprite');

var playerXPos = 14;
var playerYPos = 17;
var playerForward = true;

var playerScore = 0;

// TODO: Implement player as object...
var playerObject = function () {
    this.XPos = 14;
    this.YPos = 17;
    this.forwardFacing = true;
}

function setPlayer(xPos = 14, yPos = 17) {
    player.style.left = gameManager.xPositions[xPos] + "px";
    player.style.bottom = gameManager.yPositions[yPos] + "px";

    playerXPos = xPos;
    playerYPos = yPos;
}



function movePlayer(e) {
    if (isStarted) {
        var keyCode = e.keyCode;
        isPaused = false;

        // Up or W
        if ((keyCode == 38) || (keyCode == 87)) {
            if (playerYPos <= 31) {
                playerYPos++;
                player.style.bottom = gameManager.yPositions[playerYPos] + "px";
            }
        }

        // Down or S
        if ((keyCode == 40) || (keyCode == 83)) {
            if (playerYPos >= 1) {
                playerYPos--;
                player.style.bottom = gameManager.yPositions[playerYPos] + "px";
            }
        }

        // Left or A
        if (keyCode == 37 || keyCode == 65) {
            // Face player right way
            if (playerForward) {
                playerForward = false;
                player.style.transform = "scale(-1, 1)";
            }
            if (playerXPos >= 1) {
                playerXPos--;
                player.style.left = gameManager.xPositions[playerXPos] + "px";
            }

        }

        // Right or D
        if (keyCode == 39 || keyCode == 68) {
            // Face player right way
            if (!playerForward) {
                playerForward = true;
                player.style.transform = "scale(1, 1)";
            }
            if (playerXPos <= 44) {
                playerXPos++;
                player.style.left = gameManager.xPositions[playerXPos] + "px";
                if (playerXPos == 45) {
                    isPaused = true;
                    playerScore += 7;
                    document.getElementById('score-text').innerHTML = playerScore;
                    setPlayer();
                }
            }
        }

    }
}

document.onkeydown = movePlayer;