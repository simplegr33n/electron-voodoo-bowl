var player = document.getElementById('player-sprite');

var xPositions = [89, 102, 117, 130, 143, 157, 170, 183, 197, 210, 223, 237, 250,
    263, 277, 290, 303, 317, 330, 343, 357, 370, 383, 397, 410, 423,
    437, 450, 463, 477, 490, 503, 517, 530, 543, 557, 570, 583, 597,
    610, 623, 637, 650, 663, 677, 690] // 47 total (90 - 690)
var yPositions = [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145,
    155, 165, 175, 185, 195, 205, 215, 225, 235, 245, 255, 265, 275,
    285, 295, 305, 315, 325] // 33 total (5 - 325)


var playerXPos = 15;
var playerYPos = 17;
var playerFacing = 1; // 1 for forward, -1 for backward



function movePlayer(e) {

    // Face player right way
    if ((e.keyCode == 37 || e.keyCode == 65) && playerFacing == 1) {
        playerFacing = -1
        player.style.transform = "scale(-1, 1)"
    }
    if ((e.keyCode == 39 || e.keyCode == 68) && playerFacing == -1) {
        playerFacing = 1
        player.style.transform = "scale(1, 1)"
    }


    switch (e.keyCode) {
        // UP
        case (38):
            if (playerYPos <= 31) {
                playerYPos++
                player.style.bottom = yPositions[playerYPos] + "px"
            }
            break;
        case (87):
            if (playerYPos <= 31) {
                playerYPos++
                player.style.bottom = yPositions[playerYPos] + "px"
            }
            break;

        // DOWN
        case (40):
            if (playerYPos >= 1) {
                playerYPos--
                player.style.bottom = yPositions[playerYPos] + "px"
            }
            break;
        case (83):
            if (playerYPos >= 1) {
                playerYPos--
                player.style.bottom = yPositions[playerYPos] + "px"
            }
            break;

        // LEFT
        case (37):
            if (playerXPos >= 1) {
                playerXPos--
                player.style.left = xPositions[playerXPos] + "px"
            }
            break;
        case (65):
            if (playerXPos >= 1) {
                playerXPos--
                player.style.left = xPositions[playerXPos] + "px"
            }
            break;

        // RIGHT
        case (39):
            if (playerXPos <= 46) {
                playerXPos++
                player.style.left = xPositions[playerXPos] + "px"
            }
            break;
        case (68):
            if (playerXPos <= 46) {
                playerXPos++
                player.style.left = xPositions[playerXPos] + "px"
            }
            break;

        default:
        // code block
    }
}

document.onkeydown = movePlayer;