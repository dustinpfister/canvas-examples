# canvas-example-mr-sun

## 0.x.0 - external images
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
there should be a way to set the values for the frames like this at least. Other features for defining what the deal is with frames and how to structure things can be done in later releases if needed.
* have a /state-machine/states/init-load.js state that will work as an asset loader
* images should be stored in an sm.img array where index 0 is 0.png and so forth
* ui-sun should start when all assets are loaded
* skin display objects with new sprite sheets uisng the new draw.sprite method

## known bugs, problems, concerns
* the createAfter method in state-machine plugins may not be needed. A simular system to that of callPriority may work better, or a whole new system where I can set an array of dependancy plug-ins

## 0.x.0 - variaus improvements
* start a collection of core-\* plug-ins for game.js like that of what is going on with state-machine.js
* pull code that has to do with setting the current game year, and adding

## 0.x.0 - Full Screen support in core-canvas-resolution.js
* add full screen support

## 0.x.0 - start a states/ui-disp.js ui state for changing display settings
* start a new ui-disp state for changing display settings

## 0.x.0 - start a core-canvas-resolution.js
* start a core-canvas-resolution.js state-machine.js plug in that will be used to add features for this minor
* The name should say it but yes the the plug-in will set resolution
* have some standard options for res mode ( 320 x 240, 640 x 480, etc )
* the res mode should be set automatically depending on the width and height of the container element
* change the CSS of the container element as needed to adjust to this new system

## 0.x.0 - core-save-states.js
* start a core-save-states.js state-machine plug-in
* core-save-states.js adds a sm.save method
* core-save-states.js adds a sm.load method
* have a sm.gameName property that will be set to 'mr-sun' for this canvas example ('mr-sun-temp', 'mr-sun-geo', ect would be the value for other Mr Sun projects based off the source code from this point)
* update core-game.js to make use of new sm.load method
* the sm.gameName property should be set in a 'non core' file such as main.js
* the sm.save method should be used in a 'non core' file or plug-in such as jar.js for 'mr-sun' or temp.js in 'mr-sun-temp'

## 0.x.0 - transition system II - support for an Array of transitions
* updated core-transitions.js to allow for an array of trans objects, while still supporting the option of just one.
* add a trans.name property for trans objects
* update sm.startTrans to allow for an options that can be used to set the trans to use.
* fix sprite.radian values for sudoSections so that they rotate from section.radian to an upward position in ui-sections.

## 0.11.0 - core-spritesheets.js, and pixmaps
* (done) use new create canvas and get canvas relative methods
* make use of pixmap solution worked out in my canvas-examples-animations-pixmaps example
* make a pkg 0.11.0 folder

## 0.10.0 - core-utils.js, and variaus improvements
* (done) I want to add a afterCreate method for state-machine plugins
* (done) use afterCreate method in various plug-ins 
* (done) start a core-utils.js
* (done) add a sm.log method in core-utils.js
* (done) add a sm.logOnce method in core-utils.js
* (done) add a sm.getAngle method in core-utils.js
* (done) work out a sm.scaleSpriteToDispObj method for core-spritesheets
* (done) sudoSections is now a prop of sm rather than the trans object of ui-sun
* (done) sudoSections is created in core-transitions
* (done) new resetSudoSections method in core-transitions see if it fies new rendering isshue in ui-sun
* (done) show current sudo section in ui-sections
* (done) new code generated sprite sheet for sections that shows which way is up
* (done) make a pkg-0-10-0.html

## 0.9.0 - core-spritesheets.js started
* (done) start a core-spritesheets.js state-machine plug-in
* (done) sm.createSpriteSheet method to create a spriteSheet object that will be added to an sm.sheets array
* (done) core-spritesheets.js plug-in will add a sm.createSprite method that will create a 'standard sprite object'
* (done) A standard-sprite-object should be a property of a game.js object so that this state-machine plug-in can stil be optional in a way.
* (done) have a default code generated image for a display object in the event that there is not an image for the sprite
* (done) Use new sprites with buttons also
* (done) update core-draw.js to make use of sprite properties of secions, sun, and buttons.
* (done) have a spriteSheet for a background also.
* (done) scale sprite with transition in ui-sun
* (done) uisng frames array of sprite sheet to draw a frame
* (done) alpha prop for sprite objects
* (done) radian sprite prop for on the fly rotations
* (done) ajust ui-sun to set alpha of section sprites based on distance 
* (done) make a pkg-0-9-0.html

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
* (done) use trans.data.sudoSections in the trans.update method of ui-sun to update the position of the sudoSection objects
* (done) use sm.data.currentSection as part of a transition effect for ui-sun
* (done) use new startTrans method for when a section is clicked
* (done) draw white circle around all sections
* (done) change draw.sections so that the index that is current is drawn above all others.
* (done) update draw.back method to change background color based on current section when us-sections is the current section.
* (done) start a basic transition for ui-sections
* (done) move left and right buttons for trans in ui-sections
* (done) fix bug with sudoSections flashing when moveing from ui-sections to ui-sun
* (done) make a pkg-0-8-0.html

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
