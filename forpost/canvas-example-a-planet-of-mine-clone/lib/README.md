# libs for canvas-example-a-planet-of-mine-clone

## state-machine.js

This started out as a copy of what I worked out for my canvas example state machine post. I have added a few features though for use in this project, and also to make a slightly more robust rendition of the module that may or may not be used in other canvas examples.

* added a distance and boundingBox tools methods
* A public API is returned to the Machine global that is more than just the main function
* A custom pointer API rather than just a position object for pointer events
* A pt.overlap method for the new pointer API
* A pt.distance method for the new pointer API
* A Machine.distance public static method
* A Machine.boundingBox public static method

## world.js

This lib is used to create world object instances.

## draw.js

The name should say it all, yes these are draw methods for the canvas element in the state machine.

## solar.js

Used to create a solar object that is a collection of world objects