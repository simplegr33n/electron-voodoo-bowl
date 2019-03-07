module.exports = class Player {
    constructor() {
        this.xPos = 14;
        this.yPos = Math.round(gameManager.yPositions.length / 2);
        this.playerForward = true;
        this.name = "Player";
        this.spriteSource = "././assets/donk.gif";
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

    set(setX = 14, setY = Math.round(gameManager.yPositions.length / 2)) {
        this.xPos = setX;
        this.yPos = setY;

        // Move player
        document.getElementById('player-sprite').style.left = gameManager.xPositions[this.xPos] + "px";
        document.getElementById('player-sprite').style.bottom = gameManager.yPositions[this.yPos] + "px";
        document.getElementById('player-sprite').style.zIndex = 100 - this.yPos

        // Move field
        if (this.xPos > 16 && this.xPos < 21) {
            document.getElementById('field-container').style.left = -(gameManager.xPositions[15-this.xPos]) + "px";
        } else if  (this.xPos >= 21 && this.xPos < 130) {
            document.getElementById('field-container').style.left = -(gameManager.xPositions[this.xPos - 5]) + "px";
        } else if (this.xPos >= 130) {
            document.getElementById('field-container').style.left = -(gameManager.xPositions[130 - this.xPos]) + "px";
        } else {
            document.getElementById('field-container').style.left = -(gameManager.xPositions[this.xPos]) + "px";
        }

        console.log("Donk- x:" + this.xPos + " y:" + this.yPos);
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
                    gameManager.player.set(gameManager.player.xPos, gameManager.player.yPos)

                    // If spot Zombie
                } else if (gameManager.player.checkSpot(gameManager.player.xPos, gameManager.player.yPos + 1).name === "Zombie") {
                    gameManager.player.die()

                    // If spot Referee
                } else if (gameManager.player.checkSpot(gameManager.player.xPos, gameManager.player.yPos + 1).name === "Referee") {
                    gameManager.player.yPos++;
                    gameManager.player.checkSpot(gameManager.player.xPos, gameManager.player.yPos).die() // Kill ref
                    gameManager.player.set(gameManager.player.xPos, gameManager.player.yPos)
                }
            }
        }

        // Down or S
        if ((keyCode == 40) || (keyCode == 83)) {
            if (gameManager.player.yPos >= 1) {
                // If spot clear (null)
                if (gameManager.player.checkSpot(gameManager.player.xPos, gameManager.player.yPos - 1) == null) {
                    gameManager.player.yPos--;
                    gameManager.player.set(gameManager.player.xPos, gameManager.player.yPos)

                    // If spot Zombie
                } else if (gameManager.player.checkSpot(gameManager.player.xPos, gameManager.player.yPos - 1).name === "Zombie") {
                    gameManager.player.die()

                    // If spot Referee
                } else if (gameManager.player.checkSpot(gameManager.player.xPos, gameManager.player.yPos - 1).name === "Referee") {
                    gameManager.player.yPos--;
                    gameManager.player.checkSpot(gameManager.player.xPos, gameManager.player.yPos).die() // Kill ref
                    gameManager.player.set(gameManager.player.xPos, gameManager.player.yPos)
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
                    gameManager.player.set(gameManager.player.xPos, gameManager.player.yPos)

                    // If spot Zombie
                } else if (gameManager.player.checkSpot(gameManager.player.xPos - 1, gameManager.player.yPos).name === "Zombie") {
                    gameManager.player.die()

                    // If spot Referee
                } else if (gameManager.player.checkSpot(gameManager.player.xPos - 1, gameManager.player.yPos).name === "Referee") {
                    gameManager.player.xPos--;
                    gameManager.player.checkSpot(gameManager.player.xPos, gameManager.player.yPos).die() // Kill ref
                    gameManager.player.set(gameManager.player.xPos, gameManager.player.yPos)

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
            if (gameManager.player.xPos <= gameManager.xPositions.length - 3) {
                // If spot clear (null)
                if (gameManager.player.checkSpot(gameManager.player.xPos + 1, gameManager.player.yPos) == null) {
                    gameManager.player.xPos++;
                    gameManager.player.set(gameManager.player.xPos, gameManager.player.yPos)
                    // If touchdown
                    if (gameManager.player.xPos == 130) {
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
                    gameManager.player.die()

                    // If spot Referee
                } else if (gameManager.player.checkSpot(gameManager.player.xPos + 1, gameManager.player.yPos).name === "Referee") {
                    gameManager.player.xPos++;
                    gameManager.player.checkSpot(gameManager.player.xPos, gameManager.player.yPos).die() // Kill ref
                    gameManager.player.set(gameManager.player.xPos, gameManager.player.yPos)
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

    die(xPos, yPos) {
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
    }


}


