# Canvas Example Particles Binary todo list

## 0.2.0 - Combined Type
* make it so that when a blue and red come togeather it does not blow up on the spot but turns into another type
* this new type is a special 'combined type' that will not combine with blues or reds
* after a period of time a 'combined type' will explode

## 0.1.0 - update methods for particles
* (done) have an array of update methods for particles
* (done - 02/17/2021) make a pkg 0.1.0 folder

## 0.0.0 - Basic idea working
* (done) make an update pool function and pull logic from public update method into it
* (done) stand alone spawn method
* (done) clean up utils of unused methods
* (done) alpha transparency effect for draw.pool method
* (done) purple explosions
* (done) a '11' bits state particle has its radius grow from a min to max as it dies
* (done) part that gets set to '11' state should have its position set to an an average between the two points.
* (done) make it so that when two particles hit each other one becomes inactive, and then other enters '11' bits state
* (done) once a particle is in '11' bits state I will explode and become inactive after it runs out of life
* (done) a '11' bits state orb has its pps set to zero
* (done) clean starting point
* (done) particles.js: start a particles.js file
* (done) particles.js: private method to create a single particle object
* (done) particles.js: private method to create a pool of particle objects
* (done) particles.js: public method to create a state object
* (done) particles.js: public method to update, or tick a state object
* (done) use particles.js in main.js to create, and update the state object.
* (done) draw.pariclePool method in draw.js
* (done) draw a particles.js state object in main.js
* (done) use create canvas method
* (done) display version number
* (done - 02/17/2021) make a 0.0.0 pkg folder