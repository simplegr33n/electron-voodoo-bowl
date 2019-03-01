// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

let PlayerTombstone = require('./player_tombstone.js');
let Referee = require('./referee.js');
// let RefereeTombstone = require('./referee_tombstone.js');
let Zombie = require('./zombie.js');

const zombieOne = new Zombie(10, 10);
zombieOne.tackleSound();

const refereeOne = new Referee(11, 11);
refereeOne.whistleSound();

// const refTombstoneOne = new RefereeTombstone(17, 22);
// const refTombstoneTwo = new RefereeTombstone(36, 3);
// const refTombstoneThree = new RefereeTombstone(22, 9);

// module.exports.refTombstones = [refTombstoneOne, refTombstoneTwo, refTombstoneThree]
