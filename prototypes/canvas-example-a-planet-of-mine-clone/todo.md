# canvas-example-a-planet-of-mine-clone todo list

## main.js
* main.js: the main.js file should have a state machine
* main.js: init state for the state machine
* main.js: world state for viewing and working with the current world
* main.js: solar state for swiching between worlds, setting the world to move to with the ship, ect

## draw.js
* draw.js: draw.js started with draw.back, and draw.solar methods

## world.js
* world.js: items have a onWorkerTick method that fires for each worker on each tick
* world.js: ground types other then grass
* world.js: certain items can only be placed on certin ground types
* world.js: world objects have an solorPos object that is the position in the solar object

## solar.js
* solar.js: started the solorMod method that creates a collection of world objects

* (done) world.js: actionsPerTick property of worker object that will mean the number of actions a worker will prefrom for each tick. The action depends on the land object, and the item that is on it.
* (done) world.js: createWorker helper for creating a worker object
* (done) world.js: starting item database of [ ship, house, mine, farm, well, trees, berries]
* (done) world.js: items have a maxWorker property that defines the number of workers a land tile can have