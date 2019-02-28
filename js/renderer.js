// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

///
// My Code
///
require('./player_controller.js');
require('./game_manager.js');
const Zombie = require('./zombie.js');

const zombieOne = new Zombie(10, 10);
try {
    zombieOne.tackeSound();
} catch (e) {
    console.log(e);
}

try {
    zombieOne.tackleSound();
} catch (e) {
    console.log(e);
}


class Referee {
  constructor(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.name = "Referee";
    this.sprite = "./assets/referee.png";
  }

  whistleSound() {
    console.log(this.name + " *Whistle Blow*");
  }
}

const refereeOne = new Referee(11, 11);
refereeOne.whistleSound();

