## Canvas Example game cannon shoot todo list

## 0.x.0 -
* min and max angles for cannon
* do not move cannon when clicking/moving in button area
* fire button does not fire when releasing in fire button area from outside of fire button area
* better shot power loss expression that reduces by way of a curve rather than linear reduction over time

## 0.0.1 - create canvas
* add and use the utils.createCanvas method
* add and use the new utils.getCanvasRelative method
* make a 0.0.1 pkg folder

## 0.0.0 - Basic idea working
* (done) get basic structure together
* (done) add bounding box to utils object
* (done) add distance method to utils
* (done) fireShot method that sets mode to fired, and sets starting pps and heading of the shot object
* (done) main update state method, and update methods for aim, fired, and over modes
* (done) Basic event attachment for the canvas element worked out for mouse and touch events
* (done) when in aim mode there is a fire button that will cause the game to enter fired mode with current cannon values
* (done) need an x and y offset value for the state
* (done) grid drawn at all times
* (done) grid state changes depending on x and y Offset.
* (done) shot position should just be the center of the canvas, the offset position is what should be set and changed
* (done) shot heading should change based on current power, and the rate at which power is lost
* (done) need a t variable for each update call
* (done) update shot by way of its pps value rather than the static delta
* (done) shot stops when it hits the ground
* (done) return to aim mode when clicking screen in over mode
* (done) break main.js down into utils.js, game.js and main.js
* (done) have an draw.debug method
* (done) draw the ground
* (done) shot power loss is based on something like pps of the shot
* (done) cannon power set by distance from bottom left of canvas
* (done) add touch events
* (done) display ver in canvas
* (done) make a 0.0.0 pkg folder
