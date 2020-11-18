# canvas-example-mr-sun-blocks

This is another fork of the Mr Sun source code this time starting with Mr Sun 0.5.0. This time I am making new plugins for game.js, as well as with the new state machine system to create a collections of blocks for each game world section. The general idea is that there are types of blocks for rock, water, and so forth. Section Minerals that come from the sun by one way or another, are what is used to find out the count, and types of blocks.

## 1 - More than one Mr Sun Blocks

When I first started working on this fork I thought I would have just one example based off of the Mr Sun source code. Now I am thinking that I will want to have a whole bunch of prototypes based off of this one Fork of the Core Mr Sun project. 

There is the idea of having blocks just be this way of visualizing certain things when it comes to a game world automatically changing and mutating as time goes by, and then there is the idea of a game world being this fixed thing when the game starts and then having a way for a player to mutate the state of the blocks. These two general ideas then branch off into many other ideas as to what Mr Sun should be when it comes to going in this direction with the core of the project and adding some plug-ins. So then this canvas example will be just a core set of features when it comes to having a set of blocks and a grid in which they are placed.

## 2 - Game.js plug-ins

This fork of Mr Sun makes use of a new plug-in called plug-api-blocks. This plug-in adds many of the core features that make this project stand out from the others when it comes to having a grid of blocks for each world section. The fork does also feature a bunch of other custom cut copies of sun.js, fusion.js, and temp.js made for the sake of this fork, and any additional forks based off of it.

## 2 - plug-api-blocks.js game.js plugin

There are several conflicting ideas that come to mind when it comes to making this kind of plug-in for the main game state object of Mr Sun. There is the idea of having a collections of blocks be a part of the main game object and then each collection of grid cell objects in each world section object has a block property that is a reference to one of these block objects in the main game state. That might be an idea to go with when it comes to yet another fork of mr sun, but for this fork at least I decided to go with the idea of having everything isolated on a per section basis.

## 3 - States

With the additions made to game.js there are also changes to the ui-sun state, and the introduction of a ui-blocks state. There is also a need to add additional draw methods to work with when it comes to drawing the state of the blocks when in the ui-blocks state.

### 3.1 - The ui-blocks state

I added a new ui-blocks state machine plugin for the fork that is used as a way to display the current state of the cells of a given game world section. Chnages have also been made to ui-sun to allow for the current state to change to and from ui-blocks.

### 3.2 - The init-draw-blocks state

I also added a state that just adds drawing methods for the new additions to Mr Sun.