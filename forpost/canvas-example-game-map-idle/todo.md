## Canvas Example game map idle

* get touch support working
* have building state display a building menu
* the building menu can be used to delete a building
* use localStorage to save and load state
* do something with window.devicePixelRatio
* status bar displays current tick progress
* make it so building a building debits money
* have a building cell index
* total map worth property
* highestCellWorth property
* cell worth / highestCellWorth used to set type property
* do something with the worth value of cells.
* do something with the type property of a cell or loose it.
* get touch support working
* sprite sheets and draw image calls

## 0.0.0 - basic idea working
<!-- *************************************** -->
* (done) map starts out centered
* (done) have offset values as map.offset.x rather than map.xOffset
* (done) fix bug where nav state is entered after creating a building in land state
* (done) clamp map offsets in nav state
* (done) copy over pm.js to the project
* (done) new invert argument for stepPointByPM
* (done) remove everything for device pixel ratio
* (done) change global variable from 'g' to 'map'
* (done) remove everything that has to do with what is now done with pm.js
* (done) debug draw method for building state
* (done) combine draw_map.js into draw.js
* (done) remove everything for device pixel ratio
* (done) creating, updating and drawing a PM state
* (done) use what was worked out in canvas-example-pointer-movement in place of what is worked out in map.js
* (done) build menu when tile that is bought is selected and does not have a building on it
* (done) build menu can be used to create a new building
* (done) Start new utils.js file
* (done) distance formula should be removed from map.js and placed in utils.js
* (done) new get canvas relative util, used for events
* (done) state machine started for main.js
* (done) always state for each frame tick
* (done) disp state - for just displaying the current map
* (done) nav state - for navigating the map
* (done) land state - for creating buildings started
* (done) enter land state when a blank land cell is selected
* (done) create a building from land state
* (done) building state - for upgrading and deleting buildings
* (done) corresponding state functions for events
* (done) debug draw method for land state
* (done) a starting building is located at the center
* (done) set grid worth value for cells
* (done) map should have a money property
* (done) starting land state
* (done) bought property for cells (player can only build on tiles that they own)
* (done) create building method
* (done) tickTime property
* (done) lastUpdate property
* (done) updateGrid method that will figure the number of ticks, and update money
* (done) status bar that displays current map money
* (done) fix bug so that the the grid does not go into move mode right away when clicked or touched.
* (done) move main.js code to map.js
* (done) break down drawMap method in draw_map.js
* (done) display a navigation circle when moving the map
* (done) cell gets selected if a user action begins and ends within a 32px distance from the start point
* (done) map movement should be based from the click start point and not from the center of the canvas
* (done) move rate should be something based on (distance - 32) / maxDistnace * maxDelta
* (done) display the current delta state when drawing the navigation circle
* (done) buildOptions removed from grid state
* (done) hard coded buildOptions value in createBuilding method
* (done) buildOptions given as argument when used from the outside
* (done) use new createCanvas and getCanvasRealtive methods
* (done) display version number
* (done - 01/29/21) create a 0.0.0 pkg folder
