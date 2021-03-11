
## 0.x.0 - Address isshue with cx in pool.js
* have a obj.cx and obj.cy prop in pool.js that will be the center point of a display object
* make all changes needed in pool.js, main.js, and draw.js

## 0.x.0 - Save states

## 0.3.0 - game modes, starting with freePlay and endurance modes
* (done) have an out animation for buttons that change current state
* (done) have a deg.distance prop in game.js that is the shortest distance from deg.target
* (done) new getTarget helper
* (done) new getTargetRandom helper
* (done) add an additional argument to getTarget that allows for a number from 0 to 1 that sets the range from deg.current
* (done) pull normalizeHalf and shortestDistance angle methods from game.js into utils.js
* (done) have a degOrigin argument for getTarget helper 
* (done) new random trip up get target method and object
* (done) tripUp.chance, and tripUp.countRange props
* random range utils method

* have a 'freePlay' mode that is the game as it is now
* start an 'endurance' mode where the object is to get the score as high as you can before loosing
* can loose in endurance mode
* when you loose enter game over state
* in game over state you can play again or return to title

## 0.2.0 - Object Pool, and buttons
* (done) start an object pool lib that will just be used for buttons
* (done) Have a title state in main.js
* (done) have a start game button in title state
* (done) have a back button in game state
* (done) have labels on buttons
* (done) have a main update state method
* (done) have a trans method for a state object
* (done) make a poolMod.moveByFramePerObj method
* (done) have moving buttons that start at an out position, and move to a home position
* (done) animate the quit button in game state.
* (done - 03/10/2021) make a pkg 0.2.0 folder

## 0.1.0 - sm started, ./lib/game.js, and ./lib/draw.js
* (done) start a game.js file
* (done) start a draw.js file
* (done) create a new gameMod.update to replace gameMod.tick
* (done) start a state machine in main.js
* (done) have a game state
* (done - 03/07/2021) make a pkg 0.1.0 folder

## 0.0.0 - Basic idea
* (done) Basic idea working
* (done) display ver
* (done - 2019/11/26) make a 0.0.0 pkg folder
