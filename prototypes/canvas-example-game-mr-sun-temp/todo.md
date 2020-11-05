# canvas-example-mr-sun-temp

## 0.1.0 - observe_section State
* (done) start an observe section state
* (done) when a section is clicked the app will enter observe_section state for that section
* (done) when in observe_section state a click anyware will result in a return to game state
* in observe state values of interest are displaed for the section
* gameMod.update still called to makre sure info is up to date
* have a changeState method that will be used to change states for now
* have a 'start' state object method that will be fired once on a change state call
* (done) sun slowly goes to maxTemp over a set number of years

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