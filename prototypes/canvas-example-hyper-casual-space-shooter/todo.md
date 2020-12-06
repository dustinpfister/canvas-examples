# canvas-example-hyper-casual-space-shooter

## 0.x.0 - mouse events
* add mouse event support
* move the map around with the mouse by clicking and holding in a circle
* have a bar on the side that will control speed

## 0.3.0 - shots
* auto fire shots from the ship
* when a single shot hits a block it will become inactive ( for now )

## 0.2.0 - Object pool lib, and blocks
* (done) add an object pool lib to the project
* (done) add a 'blocks' pool to game object
* (done) draw.blocks method
* blocks will become active at random locations around the origin
* blocks will move from one point to another along an outer radius around the origin
* if the ship hits a block the block will become inactive ( for now )

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