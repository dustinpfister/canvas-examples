# todo list for canvas-example-game-crosshairs

## 0.2.0 - Object Pool, and game Modules
* start a pool.js module that will serve as the Object pool module for this canvas example
* start a game.js module that will sever as a central state module for cross, map, and pool object state collections created with the new pool.js module.
* use the object pool module to create a pool of objects for Shots.
* have shots come from the sides of the canvas to the cross hairs point.
* (done) make the cross hairs object look more like, well... a cross hairs.
* make the ver property part of the game object, and make sure it is '0.2.0'
* make a new pkg.html

## 0.1.0 - Add a basic map.js
* (done) start a map.js module that will be effected by cross.js
* (done) start event will move cross hairs to the location
* (done) draw map.js according to the offset value of the cross object
* (done) real secs value in main app loop
* (done) full options for crossMod.create
* (done) make starting position in center of map
* (done) can not leave map
* (done) display 'v0.1.0' in the canvas
* (done) getting cells by clicking on them
* (done) have a hp and max hp value for each map cell
* (done) clicking on a cell lowers hp
* (done) display cells hp
* (done) have a percent killed display
* (done) create a pkg.html for 'v0.1.0'

## 0.0.0 - basic idea working
* (done) have a cross.js file started that will be used to create and update a crosshairs state object
* (done) A cross state object contains canvas relative x and y values for the cross hairs location
* (done) A cross state object has a cx and cy value for the center position of the cross area
* (done) A cross state object has three radius values one for the cross hardis and gtwo for an inner and outer radius from the center point.
* (done) a cross state object has an Offset point that will be effected by the crosshairs position
* (done) when the cross hairs object is in the inner area it will have no effect on the Offset point
* (done) when the cross hairs is in the other area it will effect the Offset point
* (done) cross hairs can not leave the outer limit of the outer area
* (done) when in the outer area, and there is no user down input, the crosshairs will move back to center point
* (done) start a draw.js file, and have at least one draw methid that will draw the state of a cross object
* (done) state a main.js file that will make use of draw.js and cross.js