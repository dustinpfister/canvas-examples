## canvas-example-turret-defense todo list

## 0.5.1 - Auto Turret Type
* Have a player controled turret type \( dispObj.data.type = 'turret_auto' \)

## 0.5.0 - Start unit grid area
* Start a unit grid area in game state
* Create a player unit pool object for each grid location
* Have a base unit type of 'none' \( dispObj.data.type = 'none' \)
* Have a player controled turret type \( dispObj.data.type = 'turret_manual' \)

## 0.4.4 - unit positioning and rendering
* Fix problem with player unit positioning and rendering by making obj.x, obj.cx a pooMod standard
* Make obj.h, obj.hh, obj.w, and obj.hw a poolMod standard
* Use same draw player unit method in game over state

## 0.4.3 - Simple level unlock
* all levels aside from level 1 start out as locked
* once a level is compleated the next one unlocks

## 0.4.2 - world map movement
* Can scroll the map along one axis, up and down

## 0.4.1 - Add more levels, labels
* (done) have a spawnLevelButton helper
* (done) have a LEVELS array const in worldmap.js state that will serve as the level data for now
* (done) use LEVELS array const to set levelButtons pool size
* (done) have a spawnLevels helper that will call spawnLevelButton for each levelObject in LEVELS const
* (done) have labels for each level obj that display things like a level number, wave count, ect

* simple transistion effect for levelButtons
* button in game state goes back to worldmap not title

* make a pkg 0.4.1 folder

## 0.4.0 - Start new worldmap state
* (done) started a createThis helper in state-machine.js and use it for all state object methods
* (done) start a new worldmap state
* (done) go to worldmap state from title
* (done) can go back to title from worldmap state
* (done) create a pool of display objects for the world map state that will serve as level buttons
* (done) clicking a level button will cause the state-machine to switch to the game state
* (done) can go back to worldmap from game_over state
* (done) display hp bar for player unit
* (done) have a callStateMethod helper in state-machine.js
* (done) callStateMethod helper creates a standard set of arguments for a method.
* (done) callStateMethod appends additonal arguments for some state methods such as pointer methods
* (done - 04/08/2021) make a pkg 0.4.0 folder

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
