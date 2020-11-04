# canvas-example-mr-sun

## 0.1.0 - gameMod.update, plugins, and section.energy
* (done) have a game.year propery that will reflect the current game year
* (done) have a gameMod.update method that will be called in each frame tick for the game state in main.js
* (done) have a game.yearRate propery that will be used to set the rate at which years will go by in secs
* (done) plugObj.create method defines what happens when a game Object is created
* (done) plugObj.onDetaYear method of a plugin defines what is to happen yeach time game.year goes up
* (done) just have a energy plug-in for now that will append an energy property for each section.
* (done) the energy property will go up for each year, at a rate that is effected by section.per ( sun position )
* (done) have a gameMod.load method that can be used to load a plugin for the game module
* (done) a plugin is a call of the gameMod.load method, to which the first agument is a plug-in object

## 0.0.0 - Basic idea working
* (done) start with a basic state machine with event support
* (done) have a circle 'sun' display object in the center of the canvas
* (done) have a number of 'section' display objects around the edge of an outer circle around the 'sun'
* (done) the 'sun' object can be moved 
* (done) each 'section' object has a percent value that is effected by the distance between the 'section' and the 'sun'
* (done) for now just have the percent value of a 'section' object effect the color of the section, and display the percent value for it.
* (done) create a game.js file and pull all methods that have to do with creating, and updating a game objet thus far into it.
* (done) create a draw.js module for this example
* (done) start a utils.js module
* (done) make it so the sun can not leave inner radius
* (done) display version number in canvas
* (done) make a pkg_0_0_0.html
