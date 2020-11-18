# canvas-example-mr-sun

## 0.x.0 - save states
* save states should be a feature of main.js
* just have a way to load and save a single state via local storage for now and be done with it

## 0.x.0 - puase method for state-machine.js
* have an sm.pause method that can be used to pause the whole game.

## 0.x.0 - init_buttons.js state
* start an init_buttons.js state
* init_buttons adds a sm.addButton method that when called will add a button for the current state
* the init method of this state will allow for button objects in each state object

## 0.x.0 - transition system
* have transition object support for stateObjects
* a transition object contains transitionState objects
* a transitionState object contains an init, update, and draw methods

## 0.6.0 - buttons in state objects, and improved state-machine.js plugin support
* (done) start a new plugins object in state-machine.js
* (done) start with a built in core-pointer plugin that will just do what is all ready done in pointerHandlers
* change stateMod.load to look for a type property as a way to know what object to add the external object to

* new /state-machine/ folder
* new /state-machine/plugin folder for plugins for state-machine.js
* pull built in core-pointer into the first plugin for state-machine.js as /state-machine/plugin/core-pointer.js

* new /state-machine/states folder for the actual game states such as ui-sun
* rename /states/init-draw-base.js as /state-machine/plugin/core-draw.js
* rename /states/init-game.js as /state-machine/plugin/core-game.js


* start a new /state-machine/plugin/core-buttons.js
* core-buttons.js will add support for button objects in states
* add a button object in ui-sun.js state

## 0.5.0 - draw methods and objects for state objects
* (done) add support for a draw method in state objects
* (done) a stateObj.draw method will be called after update if there is one
* (done) a sm.drawObj object will be passed to stateObj.draw, methods can be appended to this in state.init
* (done) call all init methods in stateMod.create
* (done) have a init-draw-base.js state that will append base draw methods such as draw.back
* (done ) have an init-game.js state
* (done) make a pkg-0-5-0.html

## 0.4.0 - state-machine.js
* (done) start a state-machine.js file in /lib
* (done) the state-machine.js file can be used to create and return a new sm object that is used in main.js
* (done) start a /states folder and add a sm.load method like that of gameMod.load
* (done) have a /states/ui-sun.js file that will be a replacement for the game state in main.js
* (done) use state-machine.js in main.js
* (done) have an sm.start method that is used in main.js to start the state machine
* (done) make a pkg-0-4-0.html file

## 0.3.0 - sun.js
* (done) copy over sun.js from canvas-example-mr-sun-geo
* (done) make an exp system part of sun.js where bolth time, and points are used to gain exp.
* (done) use sun.years as the value that will have to do with time
* (done) sun.js creates a sun.addPoints method
* (done) in jar.js use game.jar.count as the value for sun.points
* (done) display current sun xp, and level
* (done) make a pkg-0-3-0.html file

## 0.2.0 - Loose energy.js in favor of cookies.js, and jar.js plug-in modules
* (done) copy over game.js from Mr Sun Geo
* (done) copy over utils.js from Mr Sun Geo
* (done) start a plug-api-base.js file
* (done) start a cookies.js plug-in that will just serve as a replacement for energy.js
* (done) in cookies.js each section will produce a number of cookies over time to a set max
* (done) start a jar.js plug-in
* (done) moving the sun to a section will result in the sun gathering cookies that will be placed in jar.js
* (done) update draw.js to draw the state of cookies.js and jar.js
* (done) make a pkg-0-2-0.html file

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
