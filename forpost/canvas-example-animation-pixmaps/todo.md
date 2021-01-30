# canvas-example-animation-pixmap todo

## 0.x.0 - additional animation file
* start another pixmap that is an animations of world sections.
* use world sections pixmaps for some disp objects

## 0.4.0 - new forframe folder
* start a forframe/gridlines.js file
* gridlines returns a special object like what is returned by forFrame.createCanvas but with a new set method
* this new set method will take not just a frame index, but also a set of additional arguments for heading, and grid size.

## 0.4.0 - remove FF types from forframe.js

## 0.3.0 - More than one animation used
* (done) have a maxFrame prop of a display object that will change depending on the pixmap ani used
* (done) more than one animation for mr_sun pixmap file
* (done) have new disp objects start outside of canvas, and move accross to the other side
* (done) make it so that box.lifespan sets to 1 on each update, have it set to zero only when the disp object goes out of bounds
* (done) alpha effect
* (done) make a pkg 0.3.0 folder

## 0.2.0 - mr_sun pixmap file started
* (done) start a mr_sun pixmap file
* (done) have one animation of mr sun thus far
* (done) make a pkg 0.2.0 folder

## 0.1.0 - skin disp objects
* (done) have a pool of display objects
* (done) skin display objects with pixmaps
* (done) be able to use more than one animation from a pixmap
* (done - 01/29/21) make a pkg 0.1.0 folder

## 0.0.0 - basic idea started
* (done) start with a copy of the source code for canvas-animation-basics 0.7.0
* (done) start a pixmaps folder
* (done) start a pixmaps.js file that will use forframe.js to create pixmap animations
* (done) I will want a pixmapMod.load method that wuill be called for each js file in the pixmaps folder
* (done) I will need a pixmapMod.create method that will create and return a pixmaps object using all loaded plugins in the pixmaps folder
* (done - 01/29/21) make a pkg 0.0.0 folder
