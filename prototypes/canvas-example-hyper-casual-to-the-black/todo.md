# todo list for canvas-example-hyper-casual-to-the-black

## 0.2.0 - player power ups I
* player can just move the ship left and right as it moves up
* Add an object pool for power ups
* power ups will start at the top of the canvas and move down to the player ship
* if the player ship comes in contact with a power up it will get that power up
* have a first starting power up that will incress pps for a fixed amount of time

## 0.1.0 - game.startTime and distance object
* have a game.startTime property that is the time that the player started playing
* have an array where each key is a PPS speed and each value is a distance moved at that speed
* figure distance based on this array of speeds

## 0.0.0 - basic idea
* (done) grid display moving based on game.distance
* (done) have a method for finding the amount of time it will take to get to a distance at current PPS
* (done) have a helper method for converting a second amount to minutes, hours, days, and years
* (done) have distance incress by secs value in main app update loop
* display object for the player ship
* color of background goes from white background to black background based on percentage of distance over maxDistance