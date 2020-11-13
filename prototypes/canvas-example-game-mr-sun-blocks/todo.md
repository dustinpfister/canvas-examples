# canvas-example-mr-sun-blocks

### 0.x.0 - scroll blocks
* scroll threw blocks arrays from left to right
* can loop around one way or the other

## 0.0.0 - start plug-api-blocks.js game.js plugin, and ui-blocks.js state
* (done) start with source code of Mr Sun 0.5.0.
* (done) do away with cookie and jar plugins that come with Mr Sun 0.5.0
* (done) start a plug-api-blocks.js game.js plugin
* (done) plug-api-blocks.js adds a 'section.blocks' array for each section on gameMod.create
* (done) each blocks array contains 12 x 5 'block objects'
* (done) a 'block object' contains a block.type property
* (done) type = 0 for 'nothing', type = 1 for 'rock' for now just these two
* (done) start a init-draw-blocks state that adds draw methods for blocks
* (done) start a ui-blocks.js state to view the current state of a blocks array for a given section
* (done) plug-api-blocks creates a game.currentSection and game.currentSectionIndex properties
* (done) ui-blocks has a x and y offset for drawing the blocks for the current section
* pointer action on upper center area of canvas will switch ui-blocks to ui-sun
* pointer action on a section object in ui-sun will set game.currentSection to that asn switch to ui-blocks
* make a pkg-0-0-0.html