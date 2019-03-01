// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

//require('./player.js');

const Player = require('./player.js');
const Zombie = require('./zombie.js');
const Referee = require('./referee.js');
const RefereeTombstone = require('./referee_tombstone.js');

const zombieOne = new Zombie(10, 10);
zombieOne.tackleSound();

const refereeOne = new Referee(11, 11);
refereeOne.whistleSound();

const refTombstoneOne = new RefereeTombstone(17, 22);
//refTombstoneOne.render();

const refTombstoneTwo = new RefereeTombstone(36, 3);
//refTombstoneTwo.render();

const refTombstoneThree = new RefereeTombstone(22, 9);
//refTombstoneThree.render();

// const playerDude = new Player();
// playerDude.render();