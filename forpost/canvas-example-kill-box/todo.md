# todo list for canvas-example-kill-box

## 0.5.0 - Blocks and shot deflection
* have starting player units behind blocks
* outgoing shots fired from a unit will not be deflected by a block as long as the block is within on cell length of the unit that fired it.
* if a shot is more than one cell length away from the unit that fired it, blocks can potentially stop a shot
* The percentage chance of a block deflecting a shot as it passes over it is set by the angle at which it is moving

## 0.4.0 - Path detection
* make use of the path detection that was work done in the post I wrote on it
* enemies will spawn from starting location.
* enemies will select a player unit to attack
* have some starting blocks at certin locations that will set the tile as not walkable
* enemies move to player unit target
* enemies will fire at player units in range
* player units attack enemy units in range
* make a pkg_0.4.0.html

## 0.3.0 - Units attack each other
* createBaseUnitObject helper method that contains values like HP, weapon, ect
* all units start with max hp of 100 for now
* enemy units attack player units in range and the same goes for player units
* when a unit gets hit it will loose hp
* when a unit losses all hp it will be set inactive
* enemy units spawn
* player units spawn

## 0.2.0 - Have a map.js for gameMod
* (done) add a map.js file to the project
* (done) make it so that map.js is used as part of the game state
* (done) draw.map method
* (done) make it so we have starting player units in the map at fixed locations
* (done) have some starting enemy units at the top
* (done) make a pkg_0.2.0.html

## 0.1.0 - unit pools.
* (done) will need an enemy unit pool.
* (done) will need a method for drawing units
* (done) only draw active units
* (done) will need a player unit pool.
* (done) will need a shots unit pool.
* (done) make a pkg_0.1.0.html

## 0.0.0 - starting state machine
* (done) start a lib/utils.js file
* (done) start a lib/draw.js file
* (done) start a lib/game.js file
* (done) start a /lib/pool.js
* (done) start a main.js file
* (done) have a basic state machine in main.js
* (done) have pointer input working
* (done) have a draw.cursor method
* (done) draw current cursor position displayed
* (done) display version in canvas
* (done) make a /pkg/pkg_0.0.0.html file
