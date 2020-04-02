# canvas-example-a-planet-of-mine-clone todo list

## utils
* utls.js: utils lib started with bounding box, distance, and getCanvasRelative

## main.js
* main.js: solar state for swiching between worlds, setting the world to move to with the ship, ect
* main.js: main.js can be used for event attachment
* main.js canvas and context should be a part of the state object

## draw.js
* draw.js: generated sprite sheet for each item in worlds itemDataBase
* draw.js: state object should be the main object

## world.js
* world.js: items have a onWorkerTick method that fires for each worker on each tick
* world.js: ground types other then grass
* world.js: certain items can only be placed on certin ground types
* world.js: world objects have an solorPos object that is the position in the solar object

## solar.js
* solar.js: world, and solar modes
* solar.js: clicking the canvas
* solar.js: can move workers from freeArea to a land area that will take them, and back
* solar.js: can move workers from land tile to land tile


## DONE
* (done) draw.js: draw.js started with draw.back, and draw.solar methods
* (done) solar.js: started the solorMod method that creates a collection of world objects
* (done) main.js: the main.js file should have a state machine
* (done) main.js: init state for the state machine
* (done) main.js: world state for viewing and working with the current world
* (done) world.js: actionsPerTick property of worker object that will mean the number of actions a worker will prefrom for each tick. The action depends on the land object, and the item that is on it.
* (done) world.js: createWorker helper for creating a worker object
* (done) world.js: starting item database of [ ship, house, mine, farm, well, trees, berries]
* (done) world.js: items have a maxWorker property that defines the number of workers a land tile can have