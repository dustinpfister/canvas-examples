# canvas-example-mr-sun-blocks

### 0.x.0 - scroll blocks
* scroll threw blocks arrays from left to right
* can loop around one way or the other

## 0.0.0 - start plug-api-blocks.js game.js plugin, and ui-blocks.js state
* start with source code of Mr Sun 0.5.0.
* do away with cookie and jar plugins that come with Mr Sun 0.5.0

* start a plug-api-blocks.js game.js plugin
* plug-api-blocks.js adds a 'section.blocks' array for each section on gameMod.create
* each blocks array contains 12 x 5 'block objects'
* a 'block object' contains a blockType property
* blockType = 0 for 'nothing', blockType = 1 for 'rock' for now just these two

* start a ui-blocks.js state to view the current state of a blocks array for a given section