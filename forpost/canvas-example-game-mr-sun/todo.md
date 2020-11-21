# canvas-example-mr-sun

## 0.x.0 - save states
* save states should be a feature of main.js
* just have a way to load and save a single state via local storage for now and be done with it

## 0.10.0 - core-spritesheets.js, extrenal images, /states/init-load.js, and /img
* have a /img folder to store sprite sheets images
* have a /img/index.json file that will serve as a way to define into for each image
* image files should follow this pattern: /img/0.png, /img/1.png, /img/2.png
* index.json might look like this
[
    {
        "name": "sun",
        "frames": [0,0,32,32,32,0,32,32,64,0,32,32]
    },
    {
        "name": "world-sections",
        "frames": [0,0,32,32,32,0,32,32,64,0,32,32]
    },
    {
        "name": "buttons",
        "frames": [0,0,32,32,32,0,32,32,64,0,32,32]
    },
]
there should be a way to set the values for the frames like this at least. Other features for defining what the deal is with frames and how to structure things can be done in later releaces id needed.
* have a /state-machine/states/init-load.js state that will work as an asset loader
* images should be stored in an sm.img array where index 0 is 0.png and so forth
* ui-sun should start when all assets are loaded
* skin display objects with new sprite sheets uisng the new draw.sprite method

## 0.9.0 - core-spritesheets.js started
* start a core-spritesheets.js state-machine plug-in
* core-spritesheets.js plug-in will add a sm.createSprite method that will create a 'standard sprite object'
* use new createSprite method for all display objects in the game
* have a default code generated image for a display object in the event that there is not an image for the sprite
* core-spritesheets.js plug-in will add a draw.sprite method to draw a sprite to the canvas
* make a pkg-0-x-0.html

## 0.8.0 - transition system started
* (done) have a sm.changeState method
* (done) sm.changeState will call state.init for the state that we are change to if it has one
* (done) start a core-transitions.js state-machine plug-in that will add support for transition objects
* (done) a transition object contains methods for start, update, and end
* (done) a transition object contains a maxFrame, and frameRate properties
* (done) use sm.changeState when a transition is over if a new state name is given when the transition is started
* (done) have a trans.forward bool than can be used to have the transition play froward (true) or backward (false)
* (done) have more than one block of code in ui-sun for the draw method for trans.action === 'running' and !running
* (done) create a collection of display objects for sections that can be attached to trans.data that wil be used just for rendering a transition called trans.data.sudoSections.
* (done) update draw.sections to work with a given sections collection other than game.sections such as trans.data.psudoSections
* use trans.data.sudoSections in the trans.update method of ui-sun to update the position of the sudoSection objects
* make a pkg-0-8-0.html

## 0.7.0 - core-buttons.js started
* (done) start a new /state-machine/plugin/core-buttons.js
* (done) core-buttons.js will add support for button objects in states
* (done) add a draw.buttons method in core-draw.js
* (done) start a ui-sections.js state
* (done) add a 'sections button' in ui-sun.js state that will switch to ui-sections
* (done) add a 'back button' in ui-sections.js that will go back to ui-sun
* (done) have a sm.currentSection value
* (done) display basic info about a current section in ui-sections
* (done) have right and left buttons to change sections
* (done) clicking on a section object in ui.sun will also change state to ui-sections and set sm.currentSection to that section
* (done) add a createButton method in buttons.js, and use it to make buttons in ui-sections and ui-sun
* (done) make a pkg-0-7-0.html

## 0.6.0 - improved state-machine.js plugin support
* (done) start a new plugins object in state-machine.js
* (done) start with a built in core-pointer plugin that will just do what is all ready done in pointerHandlers
* (done) change stateMod.load to look for a type property as a way to know what object to add the external object to
* (done) new /state-machine/ folder
* (done) new /state-machine/plugin folder for plugins for state-machine.js
* (done) pull built in core-pointer into the first plugin for state-machine.js as /state-machine/plugin/core-pointer.js
* (done) call a create method if there for all plugins
* (done) rename /states/init-draw-base.js as /state-machine/plugin/core-draw.js
* (done) rename /states/init-game.js as /state-machine/plugin/core-game.js
* (done) make slight changes to new core-draw and core-game files so they work with new system
* (done) new /state-machine/states folder for the actual game states
* (done) rename /states/ui-sun as /state-machine/states/ui-sun.js
* (done) make a pkg-0-6-0.html

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
