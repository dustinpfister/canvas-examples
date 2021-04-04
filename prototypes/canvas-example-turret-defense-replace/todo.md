## 0.x.0 - new enemy unit movement method
* start a new enemy movement method where a distance is divided by a number of frames
* the speed of a unit can then be set in terms of a frame rate, and will travel a fixed, preset distance

## 0.x.0 - Player unit Grid
* have a player unit grid that is maybe just 5 * 5
* single manual unit at center
* start a new auto unit
* two auto units

## 0.x.0 - game.unitQueue should be an array
* make unitQueue an array of objects rather than a single object

## 0.1.0 - New basic idea for turret defense up and running
* (done) copy over the wave control system from js-example-attack-wave-control-system
* (done) copy over what was worked out for canvas-example-ptl-clean-start-template proto folder
* (done) have just a title and game state for now.
* (done) units moving into the center of the canvas
* (done) have a game.playerUnitPool
* (done) have a PLAYER-UNITS const in game.js
* (done) start with a PLAYER-UNITS.manual Turret as the first player unit that is controled by manual input
* (done) start a gameMod.click public method
* (done) have a single PLAYER-UNITS.manual Turret starting player unit at the center of the canvas
* (done) have enemy unit.data.hp and unit.data.hpMax props
* (done) have a player hp bar
* (done) have a gameOver state
* (done) when enemy units come in range they cuase player unit damage
* (done) trans to gameOver state when active count of player units is 0
* (done) Game over when player gets to last wave, and kills all enemy units