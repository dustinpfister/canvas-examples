# canvas-example-hyper-casual-space-shooter

<!-- ADDITIONAL FIXES AND FEATURES ONCE I HAVE THE CORE OF WHAT THE GAME IS DONE -->

## 0.x.0 - mouse and touch support
* add mouse event support
* have a set of two circles in the lower right corner that will be a 'pointerControl' area
* move the map around with the mouse by clicking and holding in the 'pointerControl' area
* the smaller inner circle in the 'pointerControl' area sill set the current map.radian and map.pps values
* The angle of the inner cirle to the center of the circle will be used to set map.radian
* the distance of the inner circle from the center to the outer circle will be used to set map.pps
* The actual distnace used will be from a certain min radius from the center so that it is easy to each and stay at 0 pps

## 0.x.0 - Common System for Object Movement
* have a commom system for movement of objects
* use the same commom system for 'shots', 'blocks', and any additional objects

## 0.x.0 - Improved 'block' positioning
* work out system so that blocks will not overlap when spawning

<!-- WORK OUT THE CORE OF WHAT THE GAME IS FIRST -->

## 0.x.0 - map.dist, map.per, and MAP\_MAX\_DIST
* have a map.dist property that is the distance from (map.x, map.y) to (0,0)
* have a MAP\_MAX\_DIST property that is the max distnace that the ship can go from (0,0)
* have a map.per property that is map.dist / MAP\_MAX\_DIST
* have the map.x, and map.y values wrap when they go out of bounds
* set MAP MAX DIST to a low value of say around 10,000 (for now)
* in draw.js have map.dist effect just the background color (for now)

## 0.x.0 - Weapons Object
* Have a DEFAULT_WEAPONS Object in game.js that will contain objects with hard coded stats for each Weapon in the game
* in gameMod.create create a deep clone off the DEFAULT_WEAPONS object as game.weapons

## 0.x.0 - AutoHeal
* have a hp.autoHealRate, hp.autoHealSecs, and hp.autoHealAmount properties

## 0.5.0 - Common Health System and Ship Hit Points
* (done) have a createHPObject helper
* (done) have a attackObject helper that will deduct HP from from a given object with given damage
* (done) attackObject method will update hp.per as well as hp.current
* (done) attackObject method will clamp hp.current
* (done) use new HP methods with the blocks
* (done) use new HP Methods with the ship
* have blocks attack ship when the ship hits a block
* have ship respawn at 0,0 when deal

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