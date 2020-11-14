# canvas-example-mr-sun-blocks

### 0.x.0 - scroll blocks
* scroll threw blocks arrays from left to right
* can loop around one way or the other

## 0.x.0 - more minerals
* add aluminium, iron, sliver, and gold as possible minerals

## 0.1.0 - Start /plugin/temp.js, and /plugin/fusion.js game plugins
* (done) add a temp.js, and a fusion.js starting with what was worked out in Mr Sun Geo
* (done) change temp.js to work with new sun.js that I am using from Mr Sun 0.5.0
* (done) have all block types default to 0 for starters
* (done) add a fusion.js game plugin based off of what is in Mr Sun Geo
* (done) display mineral info of current section in ui-blocks
* (done) with fusion.js the sun object starts with a fixed amount of Hydrogen
* (done) sun creates just carbon, and oxygen at the cost of Hydrogen
* (done) can transfer minerals to world sections
* (done) start a blockTypes object for each section.
* (done) let the amount of 'carbon' minerals determine the amount of total rock type blocks for a section (for now)
* have a getAllBlocksOfIndex helper
* blocks start out from the bottom up
* section.temp and section.groundTemp effect block type by setting rocks to magma type
* (done) transfer rates for minerals to sections in fusion.js
* create a pkg-0-1-0.html

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
* (done) pointer action on canvas will switch ui-blocks to ui-sun
* (done) pointer action on a section object in ui-sun will set game.currentSection to that asn switch to ui-blocks
* (done) make a pkg-0-0-0.html