# todo list for canvas-example-hyper-casual-to-the-black

## 0.1.0 - game.startTime and distance object
* have a game.startTime property that is the time that the player started playing
* have an array where each key is a PPS speed and each value is a distance moved at that speed
* figure distance based on this array of speeds

## 0.0.0 - basic idea
* fixed single axis display object for the player ship
* player can just move the ship left and right as it moves up
* player ship always moves up at a set pixles per second rate (PPS)
* (done) have a method for finding the amount of time it will take to get to a distance at current PPS
* (done) have a helper method for converting a second amount to minutes, hours, days, and years
* have distance incress by secs value in main app update loop