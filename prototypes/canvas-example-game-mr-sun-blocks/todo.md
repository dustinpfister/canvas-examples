# canvas-example-mr-sun-blocks

## 0.x.0 - more minerals
* add aluminium, iron, sliver, and gold as possible minerals

### 0.x.0 - scroll blocks
* scroll threw blocks arrays from left to right
* can loop around one way or the other

## 0.5.0 - mineral-transfer.js game plugin
* When a rock is in magma state, and on the edge of a section, its minerals can transfer to the bodering section
* add ui-blocks.js buttons that allow for user transfer of minerals to the left or right section
* any change in minerals can of course trigger approperate chnages to block count and type

## 0.4.0 - ui-blocks.js, 
* add a toSUN button object in the upper center area of the canvas in ui-blocks state
* clicking only on the toSun button will result in the current state switching back to ui-sun
* all left and right buttons on each side of the canvas that allow for changing the current section
* display the state of blocks for the other sections to the left and right

## 0.3.0 - Magma state of rock Type
* have a block.temp property
* block.temp is set by section.temp / section.groundTemp
* a rock can be in a Magma state if the temp of the block is high enough
* when in magma state the block can move left and right in the section

## 0.2.0 - section.cells, and new section.blocks
* (done) Have a new section.cells that will be a replacement for section.blocks
* (done) have a section.cells\[cellIndex\].block that can be null, or a reference to a block in section.blocks
* (done) create a section.blocks array
* (done) have an active flag for each block, if active is false then the block is not in play
* (done) have a getAllActive blocks helper that will return an array of blocks that have an active flag set to true
* (done) fusion.js should set a totalMass property
* (done) have fusion.js create and update a mineralsPer object that is the minCount / totalMass
* (done) have a updateBlocks helper that will set active flag
* (done) section.cells[cellIndex].block will be a reference to a block in section.blocks
* (done) have number of activeBlocks be based on totalMass
* (done) a block will become active depending on mineral count for a section just as before
* (done) update draw.cells to work with new system
* have type of active blocks be set by mineralsPer
* have a type 2 that is just active blocks other than rock for now
* update helper methods in plug-api-blocks to work with new system (using getAllActiveHelper).
* create a pkg-0-1-0.html

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
* (done) have a getAllBlocksOfIndex helper
* (done) have a simple getBlock helper
* (done) have a gravity helper in plug-api-blocks
* (done) blocks start out from the bottom up
* (done) have a simple get random block helper
* (done) place blocks randomly
* (done) transfer rates for minerals to sections in fusion.js
* (done) display rocks count for world sections in ui-sun
* (done) create a pkg-0-1-0.html

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