# todo list for canvas-example-pointer-movement

## 0.x.0 - autoMove
* start a autoMove script that will use the pm to move around when there is no user input

## 0.x.0 - keyboard support
* add keyboard support

## 0.x.0 - Make an object pool part of the stack
* add an object pool as part of the stack
* when pm menu is on have objects move from pm.sx,pm.sy to locations around the pm circle
* clicking on one of these objects will not cancel pm menu mode

## 0.x.0 - Select map location and finite map
* have a finite map to move around in
* can select a cell
* can unselect a cell

## 0.x.0 - fine grain control of PPS also

## 0.x.0 - pm menu, and hold option
* removed unneeded pm.dist = 0 in update
* long click/touch to enter 'pm menu'
* pm menu canb be used to set mode from a list of options
* pm menu can be used to set hold on and off
* pm menu can be used to set pps
* pm menu can be used to set ajust maxDist

## 0.2.0 - Fine Grain control and Event handlers returned by pm module
* (done) current function of pm can be a 'fine'  or fine grain mode
* (done) start a 'dirX' mode that will make use of an option pm.dirCount prop that can be set and changed
* (done) public methods like pm.onPointerEnd will create and return an event handler
* (done) display mode
* (done) long click/touch to step a list of modes
* (done) long down time option
* (done) display progress of long down when drawing pm
* (done) do not draw long down progress rigth away
* (done - 03/07/2021 ) make a pkg 0.2.0 folder

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