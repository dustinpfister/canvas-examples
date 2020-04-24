# todo list for canvas-example-main-beach

## 0.2 - Turrets attack boats
* game.js: new shot pool for shot display objects
* game.js: turrets can attack ships if they are in range
* game.js: ships are destroyed when hp === 0
* draw.js: draw.shots method for drawing current state of shots

## 0.1 - Cell areaType, boats and turrets
* (done) game.js: a area tile can have a water, beach, or land areaType index
* (done) game.js: a new playerPool state property for player display objects (turrets)
* (done) game.js: a new enemyPool state property for enemy display objects (boats)
* (done) game.js: update public method started
* (done) game.js: spawn method for turrets
* (done) game.js: areaType land area can have turrets on them
* game.js: spawn method for boats
* game.js: areaType water areas can have boats on them
* game.js: boats move around, but only on water as they should
* (done) draw.js: draw.units method for drawing current state of units (boats and turrets)

## 0.0 - just the basics first
* (done) game.js: /lib/game.js file started
* (done) game.js: a create public method creates a game state object
* (done) game.js: a state object contains cells where each cell is an area tile
* (done) game.js: map data can be passed as an argument to the create method
* (done) draw.js: .lib/draw.js file started
* (done) draw.js: draw.back, and draw.cells methods
* (done) main.js: main.js file started, using game.js and draw.js to display a state object
