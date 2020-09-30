# todo list for canvas-example-hyper-casual-to-the-black

## 0.x.0 - save states
* have a save state for the process of the game

## 0.x.0 - auto play
* add a simple auto play feature for this that will take over after a period of inactivity

## 0.2.0 - power ups I
* (done) Add an object pool for power ups
* power ups will start at the top of the canvas and move down to where the player ship is
* if the power up reaches the bottom of the canvas it will be come inactive in the pool and be ready for reuse
* power ups should never spawn over the ships current location
* if the player ship comes in contact with a power up it will get that power up
* have a 'boost' starting power up that will increase pps for a fixed amount of time
* make it so 'boost' power ups can be stacked

## 0.1.0 - game.startTime, distance object, player movement
* (done) have a game.startTime property that is the time that the player started playing
* (done) have an game.distObj where each key is a PPS speed and each value is a number of seconds passed moving at that speed.
* (done) figure distance based on this distObj of speeds and seconds
* (done) display current pps
* (done) have a fixed array of pps speeds in hardCode
* (done) have game.pps set by index of pps speeds in hardCode via a game.ppsIndex
* (done) player can just move the ship left and right as it moves up
* (done) create a pkg_0_1_0.html

## 0.0.0 - basic idea
* (done) grid display moving based on game.distance
* (done) have a method for finding the amount of time it will take to get to a distance at current PPS
* (done) have a helper method for converting a second amount to minutes, hours, days, and years
* (done) have distance incress by secs value in main app update loop
* (done) display object for the player ship
* (done) color of background goes from white background to black background based on percentage of distance over maxDistance
* (done) draw.ver method
* (done) create a pkg_0_0_0.html file