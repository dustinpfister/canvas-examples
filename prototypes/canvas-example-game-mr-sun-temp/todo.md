# canvas-example-mr-sun-temp

## 0.1.0 -
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