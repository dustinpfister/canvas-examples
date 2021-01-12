# canvas-example-animation-basics todo

## 0.x.0 - new ForFrame method that creates a collection of blocks

## 0.x.0 - new forFrame.createSheet feature

## 0.x.0 - new forFrame.createPoints feature, and star example
* (done) start a forFrame.createPoints public method that will return a new kind of ff object
* (done) have a ff.type prop that will default to 'plain' for forFrame.create and 'points' for forFrame.createPoints
* (done) have a FF_TYPES const that will be a collection of objects for each type
* (done) use FF_TYPES to define what the defaults are for forFrame methods
* (done) have a draw.ffType function that will draw based on the ff.type prop
* (done) have a function that will create and return arguments for the forFrame method
* make a better built in forFrame function for points type
* make a 0.3.0 pkg folder

## 0.2.0 - forFrame.step, and forFrame.update
* (done) make forFrame.step a function that will take ff and stepFrames as arguments
* (done) have a forFrame.update public method that will take ff and secs as arguments
* (done) have a draw.ffInfo method that will display frame, maxFrame
* (done) have a draw.js file
* (done) make a 0.2.0 pkg folder

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