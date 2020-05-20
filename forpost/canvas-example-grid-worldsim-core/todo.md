# todo list for canvas-example-worldsim-core

## 0.0.6 - render cells with sprite sheets
* cell_index plug-in that figures out the proper sheet and cell index values for each cell
* draw module draws cells based on sheet and cell index values

## 0.0.5 - plants
* make a land_plants plug-in that will spawn plants

## 0.0.4 - grid.js
* independent grid.js file that is used in world.js
* pull all grid code out of world.js and into grid.js to help make world.js more fine grain

## 0.0.3 - improved event system
* when working out plug-ins events can be called from within init and tick by calling a main method rather than an init method
* When an event is started it goes into an event pool
* Each event should have an update method that is called each tick
* An event should have a yearStart and yearEnd value
* when an event reaches yearEnd value is is purged from the event pool

## 0.0.2 - land_base soil object, infoBar, years value init
* (done) world.years value should update as an init value
* land_base plugin adds a soil object in place of just 'fert' value
* land_base 'fert proprty should be done away with as it is to vague'

## 0.0.1 - The Basic idea working
* (done) add support for ticks
* (done) crude draw module improvement that shows status of fert land property
* (done) add support for events
* (done) start with a world.js file that returns a state object with cells for each area of the world grid.
* (done) draw.worldCells draw module method started
* (done) world.js should have a plug-in system
* (done) have a plug-in folder for world.js and one starting plugin
