# todo list for canvas-example-main-beach

## 0.x.o - boat animation
* boats make a smooth translation of movement from one cell to another

## 0.x.o - Target lock
* game.js: introduction of 'target lock'
* game.js: Once a turret 'locks' onto a target, it will continue firring at it, until it is destroyed, goes out of range, ect.
* game.js: introduce 'Random target locking' which is no different from what is going on now, only it will 'lock'
* game.js: introduce 'weak target locking' where the weakest target in a in range group is selected, in addition there should be an additional condition for 'unlocking' from a target that is finding a weaker target in the in range group.
* game.js: At least consider additional target lock options such as 'closest to grid location x,y locking', 'strong target locking', and so forth expanding this list as needed.

## 0.x.0 - Advanced Turrets
* game.js: fixed point system for setting turret values that is independent of the current turret level
* game.js: fixed point system consists of an array of point values
* game.js: The number of points for each element in the array of points, as well as the ratio is used to set certain base values that are then raised bu the level of the turret.

## 0.x.0 - Advanced enemy spawning
* game.js: Spawn method broken down into playerSpan, and enemySpawn methods
* game.js: Enemies spawn at a rate this is independent of the rate that player turrets spawn
* game.js: Wave system consisting of an array of arrays of boat objects, and arrays of boat objects getting pushed to a cache array from which boats are  spawned in at the new boatSpawnRate value
* game.js: formula that sets hpMax value for each collection of boats by wave number, and boat collection number

## 0.x.0 - Image loader
* draw.js: image loader for draw.js
* draw.js: new draw methods that make use of sheets
* main.js: simple state machine for main with just load and run state
* main.js: images loaded in load state, and game progress to run state when done
* main.js: using new sprite sheets to skin game rather than just fillRect a plain color

## 0.5.0 - utils.createCanvas
* use new utils.createCanvas, and utils.getCanvasRelative methods
* make a 0.5.0 folder

## 0.4.0 - Upgrading Turrets by Kills
* (done) game.js: cap for blasts just like everything else
* (done) game.js: TURRET.maxKillLevel value
* (done) game.js: kill count for each turret
* (done) game.jsL kill count for turret increases killLevel
* (done) game.js: turrets attackRange goes up from min to max in TURRET as killLevel goes up
* (done) game.js: turrets attack goes up to TURRET.maxAttack with killLevel
* (done) game.js: accuracy goes up with kill level
* (done 01-25-21) make a 0.4.0 folder

## 0.3.0 - Blast disp objects
* (done) game.js: spawnBlast method pushes a blast object to a new blast pool
* (done) draw.js: draw.blasts method
* (done) game.js: state.kills kill count
* (done) draw.js: draw.info to draw state info
* (done) game.js: blasts expand from the center point to the blast radius
* (done) draw.js: draw.blasts transparency effect reaches zero as radius expands to max

## 0.2.0 - Turrets attack boats
* (done) game.js: new shot pool for shot display objects
* (done) game.js: turrets shoot at ships when they are in range
* (done) game.js: turret shots have splash damage, so some damage will happen even if the ship move out of range
* (done) game.js: ships are destroyed when hp === 0
* (done) draw.js: draw.shots method for drawing current state of shots

## 0.1.0 - Cell areaType, boats and turrets
* (done) game.js: a area tile can have a water, beach, or land areaType index
* (done) game.js: a new playerPool state property for player display objects (turrets)
* (done) game.js: a new enemyPool state property for enemy display objects (boats)
* (done) game.js: update public method started
* (done) game.js: spawn method for turrets
* (done) game.js: areaType land area can have turrets on them
* (done) game.js: spawn method for boats
* (done) game.js: areaType water areas can have boats on them
* (done) game.js: boats move around, but only on water as they should
* (done) draw.js: draw.units method for drawing current state of units (boats and turrets)

## 0.0 - just the basics first
* (done) game.js: /lib/game.js file started
* (done) game.js: a create public method creates a game state object
* (done) game.js: a state object contains cells where each cell is an area tile
* (done) game.js: map data can be passed as an argument to the create method
* (done) draw.js: .lib/draw.js file started
* (done) draw.js: draw.back, and draw.cells methods
* (done) main.js: main.js file started, using game.js and draw.js to display a state object
