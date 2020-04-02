# libs for canvas-example-a-planet-of-mine-clone

## state-machine.js

This started out as a copy of what I worked out for my canvas example state machine post. I have added a few features though for use in this project, and also to make a slightly more robust rendition of the module that may or may not be used in other canvas examples.

* added a distance and boundingBox tools methods
* A public api is returned to the Machine global that is more than just the main function
* A custom pointer api rather than just a position object for pointer events