# todo list for canvas-example-game-breakout  - basic example

## 0.2.0 - main state machine
* create a new stateMachine.js file
* pull code that has to do with event attachment out of game.js, and into stateMachine.js
* A game state instance will be a property of the state object
* have a 'game' state
* have a 'title' state
* can start a new game from 'title' state
* will return to title state when the player looses
* make a new pkg_0_2_0.html

## 0.1.2 - utils.createCanvas, and utils.getCanvasRelative
* (done) use utils.createCanvas, and utils.getCanvasRelative
* (done - 01-26-21) make new 0.1.2 folder

## 0.1.1 - Fix canvas undefined bug
* (done) fix bug canvas undefined bug when paddle hits a wall
* (done) make new 0.1.1 folder

## 0.1.0 - basic idea working
* (done) add pointer (mouse + touch) support
* (done) add FPS Capping
* (done) make a pkg-0-1-0.html

## 0.0.0 - basic idea working
* (done) git hit detection working for paddle
* (done) get ball bounds and deflection working
* (done) git hit detection working for blocks
* (done) re spawn blocks when all are gone
* (done) score added on each block hit, and displayed in canvas
* (done) make a pkg-0-0-0.html