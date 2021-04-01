# todo list for canvas-example-star

## 0.x.0 - Mutate a star
* when a star is selcted make it so a simple ui pops up for it
* this ui can be used to change star values

## 0.x.0 - More advanced movement
* work out more than one update method for changing the heading of a star

## 0.x.0 - create2 fixed, method prop, new create methods
* fix problem with create2 method where it can not render stars with an even number of points
* update draw points method to work with an array of arrays of points so that it will work well with create1, and create2
* have an object method prop for object pool objects that will be the create method to use for a display object
* have a create3 method that also creates a star, but can be given an array of angles and distances to offet each point in the star
* have a create4 method that wil just create a plain polygon, or circle for that matter if yuo set the number of sides high enough.

## 0.3.0 - new Draw points method
* (done) use the new draw points method from javascript-example-draw-points
* see about using new points method with an updated star.create2 method
* make a pkg 0.3.0 folder

## 0.2.0 - Select a star
* (done) create a getObjectAtPos public method for pool.js
* (done) state.selected property added that will be a ref to a selcted star, or null
* (done) make use of user pointer events to select a single star setting state.selected to a refernce of that disp object
* (done) clicking the background results in no star being slected setting state.selected back to null
* (done) display info only for a selected star for now at least
* (done) make it so that a star will not update when selected
* (done - 04/01/2021) make a pkg 0.2.0 folder

## 0.1.0 - Gradiant background, star size
* (done) add a gradiant background
* (done) have varaible star size based on distance from the center using a setSize helper in pool.js
* (done) have CONSTANS for stars in pool.js
* (done) improve the list of options for the pool create method
* (done) wrap main.js into an iife
* (done) move constants from pool.js to main.js
* (done) clicking the canvas just toggles a debug mode
* (done - 03/04/2021) make a pkg 0.1.0 folder

## 0.0.0 - First release of new star app
* (done) have a radius object that contains a current radius value, as well as direction, and rate of change values
* (done) have a pool of objects for x,y, two radius objects for inner and outer radius, heading, hcps, and pps.
* (done) at least ten objects in the pool
* (done) objects are wrapped around the canvas
* (done) have an IIFE in pool.js
* (done) have a setDistance helper in pool.js
* (done) alpha trans effect
* (done) have two obj radians one for heading and one for facing
* (done) change facing without changing heading
* (done) have a draw.star method
* (done) have an IIFE for draw.js
* (done) draw lines that show the current headings and facings
* (done) draw info in small print for each star
* (done) more than one fill color
* (done) random pps
* (done) random delta facing rates in both directions
* (done) must have a ver value that will be displayed in the canvas
* (done) make use of the utils.createCanvas method
* (done - 03/02/2021) make a pkg 0.0.0 folder