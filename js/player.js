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

        isPaused = false;

        // Up or W
        if ((keyCode == 38) || (keyCode == 87)) {
            if (player.yPos <= 31) {
                if (player.checkSpot(player.xPos, player.yPos + 1) == null) {
                    player.yPos++;
                    document.getElementById('player-sprite').style.bottom = gameManager.yPositions[player.yPos] + "px";
                    document.getElementById('player-sprite').style.zIndex = 100 - player.yPos
                }
            }
        }

        // Down or S
        if ((keyCode == 40) || (keyCode == 83)) {
            if (player.yPos >= 1) {
                if (player.checkSpot(player.xPos, player.yPos - 1) == null) {
                    player.yPos--;
                    document.getElementById('player-sprite').style.bottom = gameManager.yPositions[player.yPos] + "px";
                    document.getElementById('player-sprite').style.zIndex = 100 - player.yPos
                }
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
                if (player.checkSpot(player.xPos - 1, player.yPos) == null) {
                    player.xPos--;
                    document.getElementById('player-sprite').style.left = gameManager.xPositions[player.xPos] + "px";
                    document.getElementById('player-sprite').style.zIndex = 100 - player.yPos
                }
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
                if (player.checkSpot(player.xPos + 1, player.yPos) == null) {
                    player.xPos++;
                    document.getElementById('player-sprite').style.left = gameManager.xPositions[player.xPos] + "px";
                    document.getElementById('player-sprite').style.zIndex = 100 - player.yPos
                    if (player.xPos == 45) { 
                        isPaused = true;
                        player.playerScore += 7;
                        document.getElementById('score-text').innerHTML = player.playerScore;

                        // clear Zombies (and Referees?) and reset Player
                        gameManager.zombies = []
                        while (document.getElementsByClassName('zombie-sprite')[0]) {
                            document.getElementsByClassName('zombie-sprite')[0].remove();
                        }
                        player.set();
                        gameManager.setZombies()
                    }
                }
            }
        }
    }

    // returns object in spot, or null for free spot
    checkSpot(spotX, spotY) {

        var blocked = null

        for (var i = 0; i < gameManager.refereeTombstones.length; i++) {
            if ((gameManager.refereeTombstones[i].xPos == spotX) && (gameManager.refereeTombstones[i].yPos == spotY)) {
                blocked = gameManager.refereeTombstones[i]
                console.log("Referee Tombstone Block")
            }
        }

        for (var i = 0; i < gameManager.zombies.length; i++) {
            if ((gameManager.zombies[i].xPos == spotX) && (gameManager.zombies[i].yPos == spotY)) {
                blocked = gameManager.zombies[i]
                console.log("Zombie Block")
            }
        }

        return blocked
    }


}


