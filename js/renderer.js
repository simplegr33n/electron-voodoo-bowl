// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
require('./player_controller.js');
require('./game_manager.js');
const Zombie = require('./zombie.js');
const Referee = require('./referee.js');


const zombieOne = new Zombie(10, 10);
zombieOne.tackleSound();

const refereeOne = new Referee(11, 11);
refereeOne.whistleSound();

