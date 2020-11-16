# canvas-example-mr-sun-blocks

This is another fork of the Mr Sun source code this time starting with Mr Sun 0.5.0. This time I am making new plugins for game.js, as well as with the new state machine system to create a collections of blocks for each game world section. The general idea is that there are types of blocks for rock, water, and so forth. Section Minerals that come from the sun by one way or another, are what is used to find out the count, and types of blocks.

## 1 - plug-api-blocks.js game.js plugin

There are several conflicting ideas that come to mind when it comes to making this kind of plugin for the main game state object of Mr Sun. There is the idea of having a collections of blocks be a part of the main game object and then each collection of grid cell objects in each world section object has a block property that is a reference to one of these block objects in the main game state. That might be an idea to go with when it comes to yet another fork of mr sun, but for this fork at least I decided to go with the idea of having everything isolated on a per section basis.

## 2 - The ui-blocks state

I added a new ui-blocks state machine plugin for the fork that is used as a way to display the current state of the cells of a given game world section. Chnages have also been made to ui-sun to allow for the current state to change to and from ui-blocks.

## 3 - The init-draw-blocks state

I also added a state that just adds drawing methods for the new additions to Mr Sun.