# canvas-example-hyper-casual-space-shooter

<!-- ADDITIONAL FIXES AND FEATURES ONCE I HAVE THE CORE OF WHAT THE GAME IS DONE -->

## 0.x.0 - Better Graphics (CANVAS ONLY)
* have canvas generated sheets for the ship, blocks, shots, and a background

## 0.x.0 - Common System for Object Movement
* have a commom system for movement of objects
* use the same commom system for 'shots', 'blocks', and any additional objects

## 0.x.0 - save states

## 0.x.0 - Use Math.log to set block values
* block values effected by distance go up using Math.log

## 0.x.0 - Shots Per Fire

## 0.x.0 - Weapon Accuracy

## 0.x.0 - MAX_SHOT_DAMAGE
* have a MAX-SHOT-DAM-DAMAGE constant that will be used to set the max amount of damage a shot can have
* set "Atom" weapon damage to MAX-SHOT-DAMAGE


<!-- WORK OUT THE CORE OF WHAT THE GAME IS FIRST -->

## 0.14.0 - mouse and touch support
* add mouse event support
* have a set of two circles in the lower right corner that will be a 'pointerControl' area
* move the map around with the mouse by clicking and holding in the 'pointerControl' area
* the smaller inner circle in the 'pointerControl' area sill set the current map.radian and map.pps values
* The angle of the inner cirle to the center of the circle will be used to set map.radian
* the distance of the inner circle from the center to the outer circle will be used to set map.pps
* The actual distnace used will be from a certain min radius from the center so that it is easy to each and stay at 0 pps

## 0.13.0 - warp
* warp home feature

## 0.12.0 - spawn blocks durring movement
* have a BLOCK-SPAWN-DIST, and BLOCK-COUNT-PER-SPAWN-DIST
* have a game.spawnDist value that is updated each time the map position changes
* when game.spawnDist >= BLOCK-SPAWN-DIST set up to BLOCK-COUNT-PER-SPAWN-DIST active

## 0.11.0 - Home Base
* can buy things at home base
* can bank money at home base

## 0.10.0 - Ship death, Autoheal
* have a createShip helper
* have ship respawn at 0,0 when dead
* player money will be reduced by half on each death.
* have a hp.autoHealRate, hp.autoHealSecs, and hp.autoHealAmount properties

## 0.9.0 - Money
* (done) have a game.money value that will hold the current amount of money that the player has
* (done) have a block.money value that is the amount of money that the player gets when it kills the block
* (done) have block.money do up with map.dist
* (done) make a pkg-0-9-0.html

## 0.8.0 - Improved 'block' positioning
* (done) make positionBlock method positionBlockRandom
* (done) start new positionBlock method
* (done) have a getFreePositions helper that will return an array of free grid index values
* (done) work out system so that blocks will not overlap when spawning they should snap to a grid that is map relative
* (done) position blocks using new system but in front of current position of ship
* (done) have new PositionRandom method that uses getFreePositions and pops random positions from it
* (done) make a pkg-0-8-0.html

## 0.7.0 - Weapons Collection
* (done) Have a DEFAULT_WEAPONS Object in game.js that will contain objects with hard coded stats for each Weapon in the game
* (done) have a utils.deepClone method
* (done) in gameMod.create create a deep clone off the DEFAULT_WEAPONS object as game.weapons
* (done) have a "Pulse gun" weapon that has 2 shot per second, and 1 damage per hit
* (done) have a "Cannon" weapon that has 5 shots per second, and 3 damage per hit 
* (done) have a "Atom" weapon that has 1 shot per second, and 100 damage per hit
* (done) have keyboard buttons 1-3 set the current weapon
* (done) display weapon info
* (done) make a pkg-0-7-0.html

## 0.6.0 - map.dist, map.per, and MAP\_MAX\_DIST
* (done) have a map.dist property that is the distance from (map.x, map.y) to (0,0)
* (done) have a MAP\_MAX\_DIST property that is the max distnace that the ship can go from (0,0)
* (done) have a map.per property that is map.dist / MAP\_MAX\_DIST
* (done) have the map.x, and map.y values wrap when they go out of bounds
* (done) set MAP MAX DIST to a low value of say around 100,000 (for now)
* (done) in draw.js have map.dist effect the background color
* (done) have map.dist effect max HP of blocks
* (done) display block hp rather than distance to ship
* (done) make a pkg-0-6-0.html

## 0.5.0 - Common Health System and Ship Hit Points
* (done) have a createHPObject helper
* (done) have a attackObject helper that will deduct HP from from a given object with given damage
* (done) attackObject method will update hp.per as well as hp.current
* (done) attackObject method will clamp hp.current
* (done) use new HP methods with the blocks
* (done) use new HP Methods with the ship
* (done) have blocks attack ship when the ship hits a block
* (done) make a pkg-0-5-0.html

## 0.4.0 - block Hit Points
* (done) have a data.hp object for each block
* (done) a data.hp.current value will be the current hit point value for the block
* (done) a data.hp.max value will be the max amount of hit points for that block
* (done) a data.hp.per value that is the percent value of hp.current / hp.max
* (done) draw.blocks will display a hp bar for each block
* (done) have a shot.damage property
* (done) when a shot hits a block it will deduct shot.damage from hp.current
* (done) if block hp.current <= 0 then it will go inactive
* (done) make a pkg-0-4-0.html

## 0.3.0 - shots
* (done) new 'shots' object pool in game
* (done) ne draw base object helper
* (done) shots start at the ship location
* (done) new draw.shots method
* (done) auto fire shots from the ship (for now)
* (done) when a single shot hits a block it will become inactive ( for now )
* (done) ship.weapon property that will be reference to the current weapon object
* (done) just one weapon object (for now)
* (done) weapon object should have a firesPerSecond, and shotsPerFile properties
* (done) first weapon might be something like 4 firesPerSecond and 1 shotsPerFile
* (done) use new draw base object helper for draw.ship
* (done) make a pkg-0-3-0.html

## 0.2.0 - Object pool lib, and blocks
* (done) add an object pool lib to the project
* (done) add a 'blocks' pool to game object
* (done) draw.blocks method
* (done) blocks will become active at random locations around the ship
* (done) blocks will spawn in front of ship
* (done) block will become inactive if the distance to the ship goes over a sit limit such as 1000
* (done) block will become inactive if the ship hits it ( for now )
* (done) MAX_BLOCKS constant in game.js
* (done) make a pkg-0-2-0.html

## 0.1.0 - keyboard events
* (done) add keyboard even support in main.js
* (done) move the map around with keyboard events
* (done) a and d change heading, while w and s change speed
* (done) display heading and speed
* (done) change pps by a ppsDelta
* (done) show what direction the ship is going
* (done) make a pkg-0-1-0.html

## 0.0.0 - basic idea working
* (done) just have a ship display object fixed to the center of the canvas
* (done) can move in any direction 'forever'
* (done) ship position and position of any other objects are all realtive to 0,0
* (done) the state.map position just reflects the curent position of the origin 0,0
* (done) draw grid lines in the background
* (done) display basic info in the canvas such as map position
* (done) display version number in canvas
* (done) break things down into draw.js, game.js, and main.js
* (done) have update and move gameMod methods
* (done) make a pkg-0-0-0.html file