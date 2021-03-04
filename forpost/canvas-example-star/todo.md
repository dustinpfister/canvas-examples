# todo list for canvas-example-star

## 0.x.0 - Mutate a star
* when a star is selcted make it so a simple ui pops up for it
* this ui can be used to change star values

## 0.2.0 - Select a star
* make use of user pointer events to select a single star
* clicking the background results in no star being slected
* display info only for a selected star
* make a pkg 0.2.0 folder

## 0.1.0 - Gradiant background, star size
* (done) add a gradiant background
* (done) have varaible star size based on distance from the center using a setSize helper in pool.js
* (done) have CONSTANS for stars in pool.js

* improve the list of options for the pool create method
* wrap main.js into an iife
* move constants from pool.js to main.js

* clicking the canvas just toggles a debug mode
* make a pkg 0.1.0 folder

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