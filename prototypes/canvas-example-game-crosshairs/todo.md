# todo list for canvas-example-game-crosshairs

## 0.1.0 - Add a basic map.js
* add a map.js module that will be effected by cross.js

## 0.0.0 - basic idea working

* have a cross.js file started that will be used to create and update a crosshairs state object
* A cross state object contains canvas relative x and y values for the cross hairs location
* A cross state object has a cx and cy value for the center position of the cross area
* A cross state object has both three radius values one for the cross hardis and gtwo for an inner and outer radius from the center point.
* a cross state object has an Offset point that will be effected by the crosshairs position
* when the cross hairs object is in the inner area it will have no effect on the Offset point
* when the cross hairs is in the other area it will effect the Offset point
* cross hairs can not leave the outer limit of the outer area
* when in the outer area, and there is no user down input, the crosshairs will move back to center point

* start a draw.js file, and have at least one draw methid that will draw the state of a cross object
* state a main.js file that will make use of draw.js and cross.js