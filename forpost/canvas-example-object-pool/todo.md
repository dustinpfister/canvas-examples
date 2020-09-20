## canvas-example-object-pool

### 0.x.0 - Particles pool
* add a 'practices' pool.
* when a 'box' object becomes inactive, 'particles' shot out from the point where it happened
* new draw method for particles

### 0.x.0 - hit points and shots
* add hit point, and max hit point values for the 'box' pool objects via the data property
* have a 'shot' pool that will be a pool of objects that will hit 'box' pool objects
* new draw methods for shots

### 0.2.0 - custom spawn, and updater methods
* (done) use the pool.js file I worked out for canvas-example-kill-box
* (done) poolMod.create should return a pool object rather than just an array
* (done) the pool should be a property of the pool object as pool.objects
* (done) spawn, update, and purge methods should ne part of a pool object
* (done) getInactive should be a private helper in poolMod, I should not have to use in in the custom spawn method
* (done) lifespan should deduct in poolMod.update
* (done) global pool.data object
* (done) have a pool.data.colors array
* (done) make use of global pool.data.colors to set color for spawned objects

### 0.1.0 - colors and cool movement
* (done) heading per second change value
* (done) more than one color
* (done) ver value in state object
* (done) ver value displayed for package
* (done) lifespan value
* (done) when lifespan reaches 0 hcps = 0
* (done) have a create options object for the main create method
* (done) fix bug where global canvas element is being referenced in the spawn method
* (done) make a /pkg folder and rename pkg.html to pkg_0_1_0.html

### 0.0.0 - basic idea
* (done) basic idea working