## canvas-example-turret-defense todo list


## 0.4.0 - Start new worldmap state
* (done) started a createThis helper in state-machine.js and use it for all state object methods
* (done) start a new worldmap state
* (done) go to worldmap state from title
* (done) can go back to title from worldmap state
* (done) create a pool of display objects for the world map state that will serve as level buttons
* (done) clicking a level button will cause the state-machine to switch to the game state
* (done) can go back to worldmap from game_over state

* display hp bar for player unit
* use same draw player unit method in game over state
* have a callStateMethod helper in state-machine.js
* callStateMethod helper creates a standard set of arguments for a method, and then appends additonal arguments for some state methods such as pointer methods
```
// something like this
callStateMethod('pointer.start', sm, [pos, e])
```

* make a pkg 0.4.0 folder

## 0.3.0 - Turret rotation speed, and full pointer events
* (done) have frame rate capping in main app loop to help keep processer use down
* (done) start adding logic worked out in js-javascript-example-rotate-and-fire
* (done) have mousedown, touchstart, mouseup and touchend events added
* (done) have a fire rate prop for a turret
* (done - 04/06/2021) make a pkg 0.3.0 folder

## 0.2.0 - Player shot pool
* (done) have a playerShotsPool
* (done) playerShots fire from player turret to shot location
* (done) shots will not fire when clicking a wave button
* (done) ajust shot size and make it smaller
* (done) fix bug where shots are hiting inactive units
* (done - 04/04/2021) make a pkg 0.2.0 folder

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
* (done - 04/04/2021) make a pkg 0.1.0 folder

## 0.0.0 - Basic Idea working
* (done) get just the basic idea working
* (done) display version number
* (done) use new create canvas method
* (done - 02/28/2021) make a pkg 0.0.0 folder
