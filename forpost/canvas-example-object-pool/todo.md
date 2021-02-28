## canvas-example-object-pool

### 0.5.0 - poolMod.wrap and poolMod.clamp methods
* have a poolMod.clamp method that will clamp display objects to the boundaries of a canvas element
* have a poolMod.wrap method that will cause a display object to wrap around the boundaries of the canvas element, that is that if a display object goes off one side it will then end up coming back around again from th other side
* make chances to the example that demo the use of these methods by having to kinds of box object, one that is clamped to the canvas, and another that wraps around it.
* make the two types of display objects two different set colors so they can clearly be identified from each other
* have a onBoundsHit pool method that will fire each time a display object of the pool hits the bounderies of the canvas

### 0.4.0 - Particles pool
* (done) Make checkBounds a public methods of poolMod
* (done) have a boundingBox public method of poolMod for now
* (done) start a utils.js, add bounding box to it, and have poolMod.boundingBox use that rather than the internal boundingBox helper
* add createCanvas method to utils.js and use it to create the canvas

* add a 'particles' pool that will be used to create objects that will be used each time a 'box' object is purged.
* when a 'box' object becomes inactive (purged), 4 'particle' objects shoot out from the point where it happened
* when a 'box' object becomes active (spawn), 4 'particle' objects will come to the point where it will spawn, and the spaen of the box will happen when they come together.
* a set of four 'particle' objects can move in relation to values in a nested object in the pool.data object of the partilces pool object
* make a pkg_0_4_0.html file

### 0.3.0 - hit points and shots
* (done) have a 'shot' pool that will be a pool of objects that will hit 'box' pool objects
* (done) new poolPod.moveByPPS method
* (done) have a box.data.weapon object for each Box
* (done) have a box.data.weapon.secs, and box.data.weapon.shotRate properties that are used to set the rate of fire
* (done) have a box.data.weapon.damage property that will be the hit point damage
* (done) add hit point, and max hit point values for the 'boxes' pool via the data property
* (done) display hp bars for display objects that have them in draw.pool
* (done) have a boundingBox method in main.js for hit detection
* (done) boxes can no longer purge based on going out of bounds, but lifespan will still apply
* (done) boxes can purge if hp <= 0
* (done) make a pkg_0_3_0.html file

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
* (done) pool ref as argument in spawn, update, and purge
* (done) make a pkg_0_2_0.html file

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