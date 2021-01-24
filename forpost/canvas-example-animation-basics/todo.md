# canvas-example-animation-basics todo

## 0.x.0 - 2d canvas sheets
* make it so that a canvas sheet can have two dims

## 0.7.0 - new CreateCanvas utils method, and animated background
* (done) use new CreateCanvas utils method
* remove basic box example
* make a 0.7.0 pkg folder

## 0.6.0 - ship and shot disp objects
* (done) use more than one animation
* (done) make a 0.6.0 pkg folder

## 0.5.0 - Some better example options of forFrame features
* (done) start a /lib/forframe-objects-canvas.js file
* (done) make the first box example the first object created and returned with forframe-objects-canvas.js
* (done) max a boxGroup example in forframe-objects-canvas.js
* (done) start a rotating triangle example called 'tri'
* (done) finish rotating triangle example called 'tri'
* (done) In main.js have a collection of disp objects with x, y, w, h, and heading props
* (done) use 'tri' to skin collection of disp objects in main, setting the current frame based on heading
* (done) make a 0.5.0 pkg folder

## 0.4.0 - new forFrame.createCanvas feature
* (done) start a forFrame.createCanvas function that can be used to create and return a canvas element
* (done) The ff object given will be used to render to the canvas element that will be returned
* (done) what is returned by forFrame.createCanvas should be an object with canvas as a prop
* (done) have a draw method returned by the object that will just draw to the given context with the current object values for frame
* (done) have simple step and set functions for a 'canvas object'
* (done - 01/15/2021) make a 0.4.0 pkg folder

## 0.3.0 - new forFrame.createPoints feature
* (done) start a forFrame.createPoints public method that will return a new kind of ff object
* (done) have a ff.type prop that will default to 'plain' for forFrame.create and 'points' for forFrame.createPoints
* (done) have a FF_TYPES const that will be a collection of objects for each type
* (done) use FF_TYPES to define what the defaults are for forFrame methods
* (done) have a draw.ffType function that will draw based on the ff.type prop
* (done) have a function that will create and return arguments for the forFrame method
* (done) make a better built in forFrame function for points type
* (done - 01/14/2021) make a 0.3.0 pkg folder

## 0.2.0 - forFrame.step, and forFrame.update
* (done) make forFrame.step a function that will take ff and stepFrames as arguments
* (done) have a forFrame.update public method that will take ff and secs as arguments
* (done) have a draw.ffInfo method that will display frame, maxFrame
* (done) have a draw.js file
* (done - 01/12/2021) make a 0.2.0 pkg folder

## 0.1.0 - new main example and build folder
* (done) create an old_code folder and place all the old code examples in there
* (done) start a build folder for this example
* (done) start a /lib folder
* (done) have a /lib/forframe.js file
* (done) have a /main.js file
* (done) have basic forframe.js function working
* (done) work out just a simple animation that makes use of forframe.js
* (done - 01/10/2021) make a 0.1.0 pkg folder

## 0.0.0 - Just make a pkg.html
* (done) just make a pkg.html based off of s2_forframe
* (done) display v0.0.0 in the canvas
* (done) display frame and maxFrame