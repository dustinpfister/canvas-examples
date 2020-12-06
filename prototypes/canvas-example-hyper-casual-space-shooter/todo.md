# canvas-example-hyper-casual-space-shooter

## 0.x.0 - Improved 'block' positioning
* work out system so that blocks will not overlap when spawning

## 0.x.0 - mouse events
* add mouse event support
* have a set of two circles in the lower right corner that will be a 'pointerControl' area
* move the map around with the mouse by clicking and holding in the 'pointerControl' area
* the smaller inner circle in the 'pointerControl' area sill set the current map.radian and map.pps values
* The angle of the inner cirle to the center of the circle will be used to set map.radian
* the distance of the inner circle from the center to the outer circle will be used to set map.pps
* The actual distnace used will be from a certain min radius from the center so that it is easy to each and stay at 0 pps

## 0.x.0 - block Hit Points
* have a data.hp object for each block
* a data.hp.current value will be the current hit point value for the block
* a data.hp.max value will be the max amount of hit points for that block
* a data.hp.per value that is the percent value of hp.current / hp.max
* draw.blocks will display a hp bar for each block
* have a shot.damage property
* when a shot hits a block it will deduct shot.damage from hp.current
* if block hp.current <= 0 then it will go inactive

## 0.3.0 - shots
* (done) new 'shots' object pool in game
* (done) ne draw base object helper
* (done) shots start at the ship location
* (done) new draw.shots method
* (done) auto fire shots from the ship (for now)
* when a single shot hits a block it will become inactive ( for now )
* use new draw base object helper for draw.ship
* make a pkg-0-3-0.html

## 0.2.0 - Object pool lib, and blocks
* (done) add an object pool lib to the project
* (done) add a 'blocks' pool to game object
* (done) draw.blocks method
* (done) blocks will become active at random locations around the ship
* (done) blocks will spawn in front of ship
* (done) block will become inactive if the distance to the ship goes over a sit limit such as 1000
* (done) block will become inactive if the ship hits it ( for now )
* (done) MAX_BLOCKS constant in game.js
* (done) make a pkg-0-2-0.html

## 0.1.0 - keyboard events
* (done) add keyboard even support in main.js
* (done) move the map around with keyboard events
* (done) a and d change heading, while w and s change speed
* (done) display heading and speed
* (done) change pps by a ppsDelta
* (done) show what direction the ship is going
* (done) make a pkg-0-1-0.html

## 0.0.0 - basic idea working
* (done) just have a ship display object fixed to the center of the canvas
* (done) can move in any direction 'forever'
* (done) ship position and position of any other objects are all realtive to 0,0
* (done) the state.map position just reflects the curent position of the origin 0,0
* (done) draw grid lines in the background
* (done) display basic info in the canvas such as map position
* (done) display version number in canvas
* (done) break things down into draw.js, game.js, and main.js
* (done) have update and move gameMod methods
* (done) make a pkg-0-0-0.html file