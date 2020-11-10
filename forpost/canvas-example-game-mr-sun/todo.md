# canvas-example-mr-sun

## 0.x.0 - save states
* save states should be a feature of main.js
* just have a way to load and save a single state via local storage for now and be done with it

## 0.x.0 - sun.js
* update core of applaction to the source code canvas-example-mr-sun-geo
* create a plug-api-base
* plug-api creates a game.loopSections method
* plug-api creates a game.getSection method
* copy over sun.js from canvas-example-mr-sun-geo
* make an exp system part of sun.js where bolth time and points are used to gain exp.

## 0.2.0 - Loose energy.js in favor of cookies.js, and jar.js plug-in modules
* (done) copy over game.js from Mr Sun Geo
* (done) copy over utils.js from Mr Sun Geo
* start a cookies.js plug-in that will just serve as a replacement for energy.js
* in cookies.js each section will produce a number of cookies over time to a set max
* start a jar.js plug-in
* moving the sun to a section will result in the sun gathering cookies that will be placed in jar.js
* update draw.js to draw the state of cookies.js and jar.js
* make a pkg-0-2-0.html file

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
* (done) Make a build.sh script
* (done) README.md
* (done) make a pkg-0-1-0.html file

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
* (done) make a pkg-0-0-0.html
