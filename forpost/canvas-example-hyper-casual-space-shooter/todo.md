# canvas-example-hyper-casual-space-shooter

<!-- WARP -->

## 0.x.0 - warp
* add a warp home button in 'space' mode
* the cost of a warp home will go up as the ship goes farther out

<!-- ADDITIONAL FEATURES, FIX BUGS -->

## 0.x.0 - Graphics Change II
* add a way to create canvas generated sprite sheets in draw.js
* create star like shapes that rotate for shots.
* health bar for ship in status bar
* make a cool background of some kind

## 0.x.0 - Replace hard coded 160, 120 values
* have a state.canvasHalfWidth, and state.canvasHalfHeight values
* Replace hard coded 160, 120 values in draw.js, game.js, ect with state.canvasHalfWidth and state.canvasHalfHeigh

## 0.x.0 - Common System for Object Movement
* have a commom system for movement of objects
* use the same commom system for 'shots', 'blocks', and any additional objects

## 0.x.0 - Use Math.log to set block values
* block values effected by distance go up using Math.log

## 0.x.0 - change weapon forward and backward buttons, common game.buttons
* have a common game.buttons object for buttons that will show up for any mode not just 'base' mode
* have change weapon buttons for looping forward AND backward threw weapons
* show chnage wepon buttons in bolth 'space' and 'base' modes

## 0.x.0 - Keyboard Button Nav
* can use arrow keys and enter button as a way to select and click buttons with the keyboard

## 0.x.0 - message system
## 0.x.0 - Course and fine grain control

<!-- UPGRADE SYSTEM -->

## 0.x.0 - Better stat info for upgrades
* start a new system for upgrades where you select an upgrade and press a 'buy' button to upgrade
* when an upgrade is selected stat info for the upgrade is displayed

<!-- BLOCKS-->

## 0.x.0 - Block Deflect Chance
* add a shotDeflectChance prop

<!-- MONEY -->

## 0.x.0 - Base Away Production
* add a feature where money is generated while the player is away

## 0.x.0 - Money over time
* add a feature where money is generated over time

## 0.x.0 - Block Money Upgrade
* have block money start out low
* block money will go up as block money upgrade is upgraded

<!-- WEAPONS -->

## 0.x.0 - Missles

## 0.x.0 - Weapon on fire update methods
* have a onFireUpdate method as an option for a weapon

## 0.x.0 - Weapon Accuracy Button at Base
* add a 'upgrade accuracy' button for the current weapon in 'base' mode

## 0.x.0 - Weapon Accuracy
* each weapon has an accuracy object
* acc.radius is the potential radius in which a shot will hit from perfect accuracy to acc.radius
* acc.per is applied with acc.radius to find and actual radius that will be used to set shot location

<!-- POLLISH ( ADDITIAL NEEDED BASIC FEATURES, IMPROVEMENTS OF FEATURES IN PLACE, SOME MORE FUN FEATURES -->
<!-- 
   For 0.19.x forward I want to get this game ready for the front page of my main canvas-examples post. There are still
   Additional basic features that must be added (SAVE STATES). There are also features that are in place all ready
   but they aere in poor shape (POINTER INPUT CONTROL, AND BLOCK POSITIONING). I do not want to go nuts with graphics, 
   but I think it should be okay to have at least one minor where I work out some better basic canvas only graphics. Also
   At this time I think I should add additional Block realted features Mainly Block Armor and additional Effects.
-->

## 0.25.0 - save states
* make money part of the save state
* make upgrades part of the save state

## 0.24.0 - spawn blocks durring movement
* have a BLOCK-SPAWN-DIST, and BLOCK-COUNT-PER-SPAWN-DIST
* have a game.spawnDist value that is updated each time the map position changes
* when game.spawnDist >= BLOCK-SPAWN-DIST set up to BLOCK-COUNT-PER-SPAWN-DIST active

## 0.23.0 - Additional Effects
* Add a SUNDER ARMOR effect that will reduce block armor by 5 to 10 percent per stack for 1 to 5 stacks
* sunder armor is a timed effect
* add CRIDICAL HIT effect that will cause 5 to 25 percent of total block hp in damage
* add a MOMNEY PER HIT EFFECT

## 0.22.0 - Block Armor
* (done) add an armor property for blocks
* (done) block armor should be an object
```
armor : {
   minDam: 10,                        // must do at least 10 damage to even have a chance
   damPer: 0.5,                       // any damage after 10 is still cut my half
   deflectChance: 0.2,                // 20% chance to compleatly deflect the shot
   effects: [['burn', 0.2], 'acid']   // 20% chance to resist burn effect, 100% chance to resist 'acid' effect
}
```
* (done) all blocks have an armor object
* (done) get minDam prop working
* (done) have a BLOCK-ARMOR-MINDAM-START and BLOCK-ARMOR-MINDAM-MAX consts
* draw current block armor value for a block
* set block armor mindam prop based on distance from 0,0
* make a 0.22.0 pkg folder


## 0.21.0 - better mouse and touch support
* (done) press 'b' key to turn auto fire on and off
* (done) fixed an FPS problem becuase of a missing ctx.restore call
* (done) start a circle area in the lower right of the canvas that can be used to set taregt_degree with mouse/touch
* (done) create a bar like slider on the left that can be used to set a 'target pps' value
* (done) ppsBar.actualY reflects map.pps over map.maxPPS
* (done) display current ppsBar.targetY value in the draw.js
* (done) pointer can be used to set ppsBar.target
* (done) keyboard can change ppsBar.target;
* (done) ppsBar.targetY is what is used to set map.pps using map.ppsDelta which should also set ppsBar.actualY
* (done) autoFire button as first space mode button
* (done) make a 0.21.0 pkg folder

## 0.20.0 - Graphics Change I (CANVAS ONLY)
* (done) have at least a basic triangle like shape for the ship.
* (done) make draw.currentMode the only method that is called in main.js
* (done) have a debug mode in main.js state, if true debug info is drawn
* (done) have a way to turn debug mode on and off when playing ( press 'v')
* (done) create a new status bar display that will go up on the top of the canvas
* (done) display basic weapon info as part of status
* (done) start a effects status helper
* (done) display effect stats for current weapon only as part of effects status
* (done) start new positionStatus draw helper for map position info and status
* (done) make pointer arrow a triangle
* (done) circle micro map for map dist and angle
* (done) gradiant backdrop for status bar
* (done) add a FPS counter
* (done) change shot color and or shape based on shot effects array
* (done) make a 0.20.0 pkg folder

## 0.19.0 - Effect Types, Effects upgrade page started, ACID Effect
* (done) start a new poolMod.parseEffectObject method that will return a vaild effect object from an effectType string or incompleate object
* (done) fix weird bug where setting effects.secs to zero in poolMod.parseEffectsObject cases a shot be be a block
* (done) rename Types to BLOCK-TYPES in pool.js
* (done) start an EFFECT-TYPES const in pool.js that will contain hard coded values for EFFECTS
* (done) A Weapon.effects Object can just be just an Array of effect types that the wepaon uses.
* (done) add an ACID Effect that will cause 1x to 4x extra Damage per shot per stack
* (done) make ACID Effect the first efefct that will stay in effect for the block untill the block is destroyed
* (done) change overTime burn effect so that damage is a percentage of total block hp
* (done) looks like I might want a game.effects object that is cloned from the poolMod.EFFECT_TYPES
* (done) make game.effects the object that is changed by the applyToSate methods of effect upgrades
* (done) use the state of game.effects object to set values for effect options objects that are added to a shots.effects array in shots spawn method.
* (done) I will want min and max values as CONSTANTS in game.js or as properties of the objects in game.effects. In any case these min and max values will be used to set the actaul values for the game.effects objects that are used to create effect objects in shots.
* (done) have effect upgrades set chance prop of an effect
* (done) have effect upgrade set burn damagePer prop of an burn effect
* (done) have effect upgrade set acid damageMulti prop of an acid effect
* (done) call applyToState in buyUpgrade and remove all old calls of applyToSatte
* (done) add a burn effect upgrade
* (done) add a acid effect upgrade
* (done) add an upgrades page for Effects
* (done) add buttons for acid and burn effects
* (done) make a 0.19.0 pkg folder

<!-- ADD ADDITIONAL CORE FEATURES -->
<!--
   From 0.12.0 to 0.18.0 The focus has been to continue working out what the very core of this game is. I have continued puting off basic features such as save states in favor of continuing to work out the reasons why I should even bother adding features like that. So then many useful features that help make the game a little more fun where added durring this time. Mainly an experence point system, weapon features, upgrades, and effects that effect blocks where also added.
-->
## 0.18.0 - Block effects property started
* (done) have a MONEY-PERLOSS-ON-DEATH const
* (done) dirrectly update map.pps in main.js
* (done) display objects in pool.js should have a type property
* (done) Add an effects prop to display objects (just blocks for now) that can contain and array of 'effects' objects
* (done) an effects object contains an effectType prop
* (done) have a 'burn' effectType
* (done) I will need to have an update method for effects in poolMod
* (done) have a block.awardBlockMoney prop where if true will award the block money to the player when hp.current === 0
* (done) if one or more burn effects are in effect block.awardBlockMoney = true, else false
* (done) call poolMod.createEffect when a shot hits a block
* (done) display current effects for a block including type and count
* (done) a weapon can have an effects prop
* (done) have a weapon.effect prop just for pulse gun for now
* (done) get max stack prop working
* (done) GAME-UPDATE-MAX-SECS const of main update loop
* (done) rate of ship heading change should be part of game object
* (done) have a SHIP-ROTATION-RATE const object with min and max props
* (done) add a ship menu upgrade for ship rotation
* (done) make a 0.18.0 pkg folder

## 0.17.0 - weapon.range, Shots Per Fire, and fire update methods
* (done) have a weapon.range property that will be the max dist that a shot will go
* (done) have a weapon.shotsPerFire prop that is the number of shots that will be set active per weapon fire
* (done) have a weapon.onFireStart method that will define how a set of shots will start for a weapon
* (done) basic single shot default onFireStart method
* (done) have a 2 shot onFireStart method for pulse weapon where both shots are at the same angle but start apart from each other
* (done) make it so shotsPerFire can be an array, if so these are values that ar cycled
* (done) can set shot pps in a weapon object
* (done) draw an arrow that will point to the base
* (done) make the 1,2,3, ect keys also update buttons
* (done) can only change weapon in base mode
* (done) make a 0.17.0 pkg folder

## 0.16.0 - Weapon Upgrade buttons
* (done) add a new const WEAPONS that will be used to create DEFAULT WEAPONS and append DEFAULT UPGRADES
* (done) have some code that will create a DEFAULT WEAPONS Const from WEAPONS
* (done) have some code that will append DEFAULT UPGRADES with weapon upgrade objects created from WEAPONS
* (done) append upgrades for all weapons
* (done) append weapon upgrades for fire rate and damage properties (for now)
* (done) add 'rate of fire' upgrade button for the current weapon
* (done) add 'upgrade damage' buttons that will upgrade the current weapon damage
* (done) update cost values when change weapon buttons is clicked
* (done) set correct start cost values for weapon buttons
* (done) add a button.type = weaponUpgrade, and button.weaponProp and update gameMod.checkButtons
* (done) get levelOpt props in WEAPONS working with upgrades
* (done) have a levelOpt for each weapon property in WEAPONS
* (done) see about fixing constructor problem with utils.deepClone
* (done) default values for levelOpt values in weapons
* (done) make a 0.16.0 pkg folder

## 0.15.0 - Ship upgrade buttons
* (done) gameMod.checkButtons needs to check buttons based on current 'mode'
* (done) gameMod.checkButtons needs to be updated to check for more than one button
* (done) I want to have more than one page of buttons per mode for example 
* (done) ship max speed upgrade button
* (done) ship acc upgrade button
* (done) have a main button page to nav to weapons and ship pages
* (done) make a better utils.deepClone that will work with buttons object
* (done) display current cost of upgrades
* (done) display cost on start
* (done) fix bug with max speed cost not updating as it should
* (done) make a 0.15.0 pkg folder

## 0.14.0 - utils.xp new features, DEFAULT_UPGRADES object
* (done) utils.xp.createTable should create points that can be used to graph what is going on with levels
* (done) have a draw.xpTable method that can graph the state of a table object created with utils.xp.createTable
* (done) start a new utils.xp.createUpgrade method that will create a table as the base of the object, and have all the properties of an upgrade object
* (done) draw.xpTable will draw a white circle around current location in graph if it is an upgrade object
* (done) start a DEFAULT_UPGRADES object that will get cloned as game.upgrades
* (done) add new ship acc upgrade object
* (done) ship acc upgrade also just autobuys for now
* (done) add a buyUpgrade method that will set upgrade.levelIndex if there is enough of a RESOURCE in STATE
* (done) buying an upgrade will deduct money
* (done) make a pkg-0-14-0.html

## 0.13.0 - adding new percent, and xp utils.js methods.
* (done) add percent methods from js-javascript-example-percent-module to utils.js to be used with a new exp system
* (done) start a new utils.xp object
* (done) have a utils.xp.byLevel method that returns a level object with values set by a given level, and options
* (done) have a utils.xp.byExp method that returns a level object with values set by a given level, and options
* (done) both utils.xp.byLevel and utils.xp.byExp return the same standard level object
* (done) a level object contains at least level, and xp
* (done) a level object has valueOf, value of should return level
* (done) have a utils.xp.createTable method that will create an Array of levelObjects using utils.xp.byLevel
* (done) have a utils.xp.createOptions that will return an options object to use with xp.byLevel, and xp.byExp
* (done) start a game.upgrades object
* (done) use new utils.xp.createTable to create a table of levelObjects for game.upgrades[0] (ship maxSpeed upgrade)
* (done) have a upgrade.applyToState method for new max speed upgrade
* (done) have ship speed upgrades autobuy (for now)
* (done) have a createLevelObject helper for utils.xp
* (done) make a pkg-0-13-0.html

## 0.12.0 - game modes, 'space' mode, and 'base' mode
* (done) have a game.mode property that will store the current mode
* (done) display current game mode
* (done) have just a main gameMod.update method that is called in main.js
* (done) have the game as it is to begin with be a main 'space' mode
* (done) add a HOME-BASE-DIST const that is the max distance in which the game is in 'base' mode
* (done) game will switch between 'space' and 'base' mode depeding on the current map.dist value and HOME-BASE-DIST
* (done) add a BASE-BUTTONS const that will be button objects that show up when in 'home-base' mode
* (done) have a draw.currentMode method that will always draw based on what the current mode is
* (done) start with just a 'change weapon' button for now
* (done) change mouse movement so it does not change map.radian and pps when clicking a button
* (done) add a gameMod.buttonCheck method that will be called by main.js on each pointer up event
* (done) clicking change button weapon works and loops forward over weapons
* (done) make a pkg-0-12-0.html

<!-- WORK OUT JUST A BASIC SET OF FEATURES -->
<!-- 
  From 0.0.0 to 0.11.0 Just the very basic idea of this game was worked out of course. Other ver basic core features where also added during this time, but not well refined. One example of this is the code worked out for block positioning, at first blocks where just piled on top of each other, however later on in 0.8.0 a better system was added in place of this. However the positioning of blocks was still in need of additional improvment. Another feature that was added, but not well refined is pointer control.
-->

## 0.11.0 - Basic Pointer Event Support
* (done) start basic mouse and touch support
* (done) change map radian with mouse
* (done) change map pps with mouse
* (done) make a pkg-0-11-0.html

## 0.10.0 - Ship death, Autoheal
* (done) have a createShip helper
* (done) have ship respawn at 0,0 when dead
* (done) player money will be reduced by half on each death.
* (done) have a hp.autoHeal.rate, hp.autoHeal.secs, and hp.autoHeal.amount properties
* (done) ship autoheals
* (done) Ship autoHeal constants
* (done) make a pkg-0-10-0.html

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