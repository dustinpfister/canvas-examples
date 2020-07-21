## canvas-example-object-pool

### 0.3.0 - Particles pool
* add a 'practices' pool.
* when a 'box' object becomes inactive, 'particles' shot out from the point where it happened
* new draw method for particles

### 0.2.0 - custom spawn, and updater methods
* Be able to define a custom spawn method for a pool by way of the create options object
* Be able to define custom updater methods that will fire on each update method
* call the existing pool the 'box' pool
* have a data property of an object pool object for custom properties depending on the nature of the pool.
* add hit point, and max hit point values for the 'box' pool objects via the data property
* have a 'shot' pool that will be a pool of objects that will hit 'box' pool objects
* have a 'powerUp' pool that will increase stats of the box pool objects
* new draw methods for shots and power ups

### 0.1.0 - colors and cool movement
* (done) heading per second change value
* (done) more than one color
* (done) ver value in state object
* (done) ver value displayed for package
* (done) lifespan value
* (done) when lifespan reaches 0 hcps = 0
* (done) have a create options object for the main create method
* (done) fix bug where global canvas element is being referenced in the spawn method

### 0.0.0 - basic idea
* (done) basic idea working