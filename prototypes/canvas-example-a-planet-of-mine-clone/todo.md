# canvas-example-a-planet-of-mine-clone todo list

If I am going to put a lot of time into this one I should maybe break things down into version numbers

## 0.4 - Build menu
* have a working build menu for all current items in the world item database

## 0.3 - resources break down
* more than one type of solid resource ['stone', 'coal']
* gather liquid resources
* more than one type of liquid resource ['oil', 'water']


## 0.2 - Gathering raspberries, and worker food requirements
* two resources that are gathered from land items ['wood', 'raspberries']
* can gather wood resource from trees land item
* can gather raspberries resource from berry bushes
* starting raspberries count for solar object
* workers require raspberries to continue living, raspberry count goes down for each worker per rotation tick
* If A worker does not get enough raspberries it will die
* gameOver property for solar object
* if totalWorkerCount === 0 then solar.gameOver = true;

## 0.1 - rotationRate and actionRate
* Current tickRate for a world is actually the rotation rate of the world now
* new exp value for the solar object
* each world has an exp value that is added to the solar exp value on each rotation
* separate tickRate for each land tile called an actionRate
* workers harvest resources on land tiles by way of actionRate rather than rotation rate

## (done) 0.0 - The very basic idea working very poorly
* (done) solar object property for current collected resources count
* (done) main tickRate, and lt properties for solar object
* (done) tick progress bar drawn
* (done) onTick method for world objects
* (done) onTick method called for all world objects in solar object for each tick
* (done) land tiles have a solid resources count
* (done) land tiles have a liquid resources count
* (done) each tick workers will mine liquid, solid, or other resource depending on the land tile item
* (done) workers get positioned when added to new area
* (done) workers will not move to newArea if newAreas workers length is equal to maxWorkers
* (done) draw.debug method
* (done) can see free workers
* (done) can move free workers
* (done) can place free workers on a land tile.
* (done) can move workers around from one land section to another
* (done) can move land worker back to free worker section
* (done) can create new workers by clicking freeWorkers when no workers are there
* (done) draw.js: draw.js started with draw.back, and draw.solar methods
* (done) solar.js: started the solorMod method that creates a collection of world objects
* (done) main.js: the main.js file should have a state machine
* (done) main.js: init state for the state machine
* (done) main.js: world state for viewing and working with the current world
* (done) world.js: actionsPerTick property of worker object that will mean the number of actions a worker will preform for each tick. The action depends on the land object, and the item that is on it.
* (done) world.js: createWorker helper for creating a worker object
* (done) world.js: starting item database of [ ship, house, mine, farm, well, trees, berries]
* (done) world.js: items have a maxWorker property that defines the number of workers a land tile can have