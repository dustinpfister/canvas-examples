# canvas-example-mr-sun-temp

## 0.4.0 - Fusion happens in the Sun, and Sun Life
* make changes to fusion.js so that mineral production happens in the Sun actually
* the temp of the sun is what will effect mineral production
* minerals will transfer from the sun to sections when section.per <= 0.95
* start a new sun.js plug-in
* sun.js will set the lifespan of the sun.
* when a suns lifespan === 0 the sun will die.
* when the sun is dead, sun.temp = 0;
* when the sun dies all the minerials will be distributed to the sections.
* sun.js will spawn a new sun object in the event that the current sun object is dead.
* make a pkg-0-4-0.html

## 0.3.0 - temp.js ajustments, and variable max ground temp
* in temp.js section.temp should stay between 20 and 100 when the Sun as at the center
* in temp.js section.groundTemp should go up at a rate based on section.per
* in temp.js the maxGroundTemp should also be set by section.per
* section.groundTemp should also make used of utils.levelObjCollection
* make a pkg-0-3-0.html

## 0.2.0 - observe_sun, Math.log, and better sun temp formula
* (done) make the logPer method in the canvas-example-percent-math-log example part of utils.js
* (done) create a new utils.createLogPerObject method that will create an logPerObject for i,len,a,b arguments
* (done) create a new utils.createLogPerCollection that can be used to create a collection of logPerObjects with an object that is given for an argument.
* (done) start an observe_sun state object
* (done) just like the obsever_section state this state displayed info, only this time of the sun object
* (done) use new utils.levelObjCollection in temp plugin to set temp of the sun
* (done) fix UI problems where I am entering an observation state when I do not intend to by having a startPos property of the input object in the state machine
* in the observe_sun section display a graph of the current level of the sun
* make a pkg-0-2-0.html

## 0.1.0 - start observe_section State
* (done) start an observe section state
* (done) when a section is clicked the app will enter observe_section state for that section
* (done) when in observe_section state a click anyware will result in a return to game state
* (done) in observe state values of interest are displaed for the section
* (done) gameMod.update still called in observe_section state to make sure info is up to date
* (done) have a changeState method that will be used to change states for now
* (done) have a 'start' state object method that will be fired once on a change state call
* (done) sun slowly goes to maxTemp over a set number of years
* make a pkg-0-1-0.html

## 0.0.0 - Start temp.js, fusion.js plugin callPriority
* (done) start project with source code of canvas-example-mr-sun 0.1.0
* (done) add support for a callPriority propery of a plugObj in game.js
* (done) callPriority is a number from 0 upwards where lower numbers result in the plugins methods being called before those of higher numbers
* (done) have callPriority default to Object.keys(plugs).length, if no pligObj.callPriority number is there
* (done) update gameMod usePlugs method to sort keys by callPriority
* (done) start a ./plugin/temp.js plugin
* (done) the temp plugin sets a temp property for the sun, and all sections
* (done) temp of sun will go up over time
* (done) sections also have a section.groundTemp property
* (done) section.groundTemp will loose temp over time if section.per is less than 0.5
* (done) section.groundTemp will can temp back if section.per is greater than of equal to 0.5
* (done) the temp of section will be set by distance from sun, and groundTemp
* (done) have a game.maxTemp propery
* (done) sun will slowly reach maxTemp over time
* (done) start a ./plugin/fusion.js plugin that depends on temp.js
* (done) make a pkg-0-0-0.html file