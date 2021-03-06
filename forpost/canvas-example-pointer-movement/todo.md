# todo list for canvas-example-pointer-movement

## 0.x.0 - autoMove
* start a autoMove script that will use the pm to move around when there is no user input

## 0.x.0 - Fix handlers, keyboard events
* public methods like pm.onPointerEnd will create and return an event handler
* add keyboard support

## 0.x.0 - Update method takes a secs argument
* the pm.update method should take a secs argument

## 0.x.0 - Fine Grain control
* current function of pm can be a 'fineGrain' mode
* start a new '8dir' mode that will lock angle to 8 directions
* start a new '360dir' mode that will lock angle to 360 directions
* start a 'xDir' mode that will make use of an option pm.dirCount prop that can be set and changed

## 0.1.0 - new utils lib, create canvas, various improvements
* (done) add a utils.js with a create canvas method
* (done) use create canvas and utils get canvas relative methods
* (done) use utils.distance in pm.js
* (done) removed if that was not needed in pm.updatePM
* (done) have cp the same as sp when a pinter event starts
* (done) have a pm.minDist and pm.maxDist, and have options for them
* (done) use 640 * 480 res
* (done) have an IIFE for draw.js
* (done) display debug into near the PM in draw.js
* (done) only draw additional parts of pm if pm.PPS > 0
* (done) use utils.mod in pm.js with pm.angle to get radians
* (done - 03/06/2021 ) make a pkg 0.1.0 folder

## 0.0.0 - basic idea working
* (done) Just get the basic idea working
* (done) add touch support
* (done) change stepPointByPM so that it accepts a secs value
* (done) make use of secs argument in main.js
* (done) update debug info to display delta
* (done) change delta to PPS
* (done) can set PPS by way of argument when creating PM
* (done - 01/26/2020 ) create a pkg_0_0_0.html file