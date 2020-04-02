# canvas-example-a-planet-of-mine-clone todo list

## world.js

* starting item database of [ ship, house, mine, farm, well, trees, berries, water]
* items have a maxWorker property that defines the number of workers a land tile can have
* items have a onWorkerTick method that fires for each worker on each tick
* createWorker helper for creating a worker object
* actionsPerTick property of worker object that will mean the number of actions a worker will prefrom for each tick. The action depends on the land object, and the item that is on it.
* ground types other then grass
* certain items can only be placed on certin ground types