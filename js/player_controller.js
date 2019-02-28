var xPositions = [89, 102, 117, 130, 143, 157, 170, 183, 197, 210, 223, 237, 250,
    263, 277, 290, 303, 317, 330, 343, 357, 370, 383, 397, 410, 423,
    437, 450, 463, 477, 490, 503, 517, 530, 543, 557, 570, 583, 597,
    610, 623, 637, 650, 663, 677, 690] // 47 total (90 - 690)
var yPositions = [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145,
    155, 165, 175, 185, 195, 205, 215, 225, 235, 245, 255, 265, 275,
    285, 295, 305, 315, 325] // 33 total (5 - 325)

var player = document.getElementById('player-sprite')

var playerXPos = 15
var playerYPos = 17
var playerForward = true

var playerScore = 0

// TODO: Implement player as object...
var playerObject = function () {
    this.XPos = 15
    this.YPos = 17
    this.forwardFacing = true


}

function resetPlayer() {
    playerXPos = 15
    player.style.left = xPositions[playerXPos] + "px"
    playerYPos = 17
    player.style.bottom = yPositions[playerYPos] + "px"
}



function movePlayer(e) {
    if (isStarted) {
        var keyCode = e.keyCode
        isPaused = false

        // Up or W
        if ((keyCode == 38) || (keyCode == 87)) {
            if (playerYPos <= 31) {
                playerYPos++
                player.style.bottom = yPositions[playerYPos] + "px"
            }
        }

        // Down or S
        if ((keyCode == 40) || (keyCode == 83)) {
            if (playerYPos >= 1) {
                playerYPos--
                player.style.bottom = yPositions[playerYPos] + "px"
            }
        }

        // Left or A
        if (e.keyCode == 37 || e.keyCode == 65) {
            // Face player right way
            if (playerForward) {
                playerForward = false
                player.style.transform = "scale(-1, 1)"
            }
            if (playerXPos >= 1) {
                playerXPos--
                player.style.left = xPositions[playerXPos] + "px"
            }

        }

        // Right or D
        if (e.keyCode == 39 || e.keyCode == 68) {
            // Face player right way
            if (!playerForward) {
                playerForward = true
                player.style.transform = "scale(1, 1)"
            }
            if (playerXPos <= 44) {
                playerXPos++
                player.style.left = xPositions[playerXPos] + "px"
                if (playerXPos == 45) {
                    isPaused = true
                    playerScore += 7
                    document.getElementById('score-text').innerHTML = playerScore
                    resetPlayer()
                }
            }
        }

    }
}

document.onkeydown = movePlayer;