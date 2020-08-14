# todo list for canvas-example-game-crosshairs

## 0.x.x - Bug fixes
* see about fixing issue where shots are tied to the canvas rather than the map (what happens when shooting and moving)
* (partial fix) it seems that the AI can get stuck when Frame Rates are real low

## 0.x.0 - Enemy fire and health
* to make the game more interesting there are units on the map that fire back
* game.HP, and game.maxHP properties will be needed
* game.gameOver state
* just click screen to start over for now until I get into a state machine for this.

## 0.x.0 - Manual and auto play damage bonus
* have a damage bonus in manual play state
* have a separate bonus rate in autoPlay mode
* make it so the bonus rate in autoPlay IS LOWER then the manual bonus
* make it so manual and auto play bonuses are upgradeable in skill point menu
* have a system where the bonus will no longer be in effect after a period of time, so that it makes sense to allow the game to return to auto play

## 0.x.0 - More advanced AI
* AI can be turned off and on in AutoPlay Options menu
* totalKill Behavior where the AI will use atom weapon only, and will not stop until Behavior Change
* moveOnly Behavior where the AI will only move around until Behavior Change
* blaster Behavior where the AI will only use blaster weapon until Behavior Change
* AttackArea Behavior where AI will attack a random area until Behavior Change

## 0.x.0 - autoPlay options menu
* have an autoPlay menu that can be used to set various settings for the AI of the game
* player can set the behavior to use
* player can set perCent kill setting
* make many options unlock able and upgradeable in skill point menu

## 0.x.0 - save state
* work out a system for save states

## 0.x.0 - keyboard events
* add keyboard events
* use numbers for setting current weapon
* +/- keys for looping threw weapons
* wasd keys for movement
* space/k fires current weapon

## 0.x.0 - Skill Point system
* have a skillPoint module that will create a skills state object
* add a skillManager menu state that is used to set skill points to skills
* add draw methods for skillManager
* number of skill points based off of totalDamage of game object
* blaster skill
* assault-blaster skill
* cannon skill
* atom skill
* damage skill

## 0.x.0 - Buttons
* buttons should be part of the state machine rather than the game module
* make a standard module or class for creating and updating button objects
* use new button standard for options and change weapon buttons in game state
* use new button standard for options menu bttons

## 0.x.0 - CellTypes upgrade based on total damage of cell
* cellType can still be set by damagePer, but the level of the cell type can be set by total damage
* cellHP rate goes up a little higher then DPS goes up for the player

## 0.10.0 - level up system for player based on total damage as EXP
* (done) make an exp_system.js module
* (done) have a game.levelObj property
* (done) use the exp_system module to set, and update game.levelObj
* (done) display game.level in game state as part of fixed display rather than debug menu
* (done) display totalDamage in game state as part of fixed display rather than debug menu
* (done) have game.level set accuracy of all weapons
* (done) have game.level set DPS for all weapons
* (done) new debug mode for current weapon
* new debug mode for level
* make a pkg_0_10_0.html

## 0.9.0 - state machine
* (done) now Have everything inside an IIFE in main.js, and fixed a few problems using globals in game.js, and draw.js
* (done) start a state machine that will serve as a single central state object
* (done) all canvas input is handled by the state machine rather than game.js
* (done) have a main game state for the current update loop in main.js
* (done) start a general 'options' state that can be used to set just debug screens for now
* (done) be able to switch from 'game' and 'options' states threw the GUI
* (done) 'ver' should now be a property of the state machine object rather than game.js
* (done) make a pkg_0_9_0.html

## 0.8.0 - Pixel graphics
* (done) hardSet.maxSecs value put in to limit the secs value in updates which fix a bug where to much damage was being applied
* (done) have a system for creating pixle graphics in place of solid colors for map cells
* (done) generate sheets for each cell type
* (done) SheetIndex for cells based on cellType, and cell index in sheet based on HP (forNow)
* (done) more advanced AI settings that help set different behaviors
* (done) make sure ver is 0.8.0 and make a pkg.html

## 0.7.0 - autoplay AI
* (done) update percent remain on each tick
* (done) start an autoplay AI for this canvas example like that if flappy collection idle
* (done) A player at any time can take over auto play by just clicking or touching the canvas
* (done) AI selects random targets that are active
* (done) AI will shoot less depending on percentRemaining value
* (done) work out problem with cross.userDown
* (done) worked out a temp fix for AI movement problem
* (done) AI changes weapons
* (done) make sure ver is 0.7.0 and make a pkg.html


## 0.6.0 - cellIndex, cellTypes, and cell.damage
* (done) have a cellTypes array that will hold an array of 'cellType' objects.
* (done) a cellType object has values that are used to set HP
* (done) map cells have a cellIndex value that will set the current type of cell in the cellTypes array.
* (done) map cells have a damage property that holds the total amount of damage that has happened to it over time.
* (done) map cells have a damagePer property that is a number between 0 and 1 where 0 is the lowest current damage value in the map, and 1 is the highest.
* (done) the damagePer property is used as one way to determine the cellType when regenerating cells.
* (done) make sure ver is 0.6.0 and make a pkg.html

## 0.5.0 - continuous regeneration and autoHeal
* (done) add an update method to the mapMod.
* (done) add an autoHeal Object with a rate property for each cell in map.js
* (done) cells will ausoHeal up to full health as part of the maps update loop.
* (done) a map cell has an active property that means that something is there in play if true
* (done) cells only autoHeal if active
* (done) if cell.HP <= 0 then a cell will become inactive
* (done) update draw method to display inactive cells as gray in color
* (done) have a helper method that will return all cells around a given cell
* (done) have a helper method that will return all inactive cells, and can also be used with an additional argument that can be used as a way to define additional conditions that apply when producing a list of inactive cells.
* (done) work out a gen method that will act as a way to make inactive cells active again
* (done) the gen method should only generate new cells at inactive cells that have at least one active cell around it\
* (done) There are cells in the map where even if everything is dead cells will regenerate
* (done) fix bug where cells are regenerating where they should not be
* (done) Have a total all time damage count as part of the main game state object.
* (done) make sure ver is 0.5.0 and make a pkg.html

## 0.4.0 - Weapons
* (done) have an array of weapon objects in game.js
* (done) game starts with weapon index 0
* (done) weaponIndex is used to set current Weapon object, and the current weapon object is used to set stats for shots and other relevant stats.
* (done) display name of current weapon
* (done) transparent effect for blasts
* (done) accuracy property of a weapon object defines a radius where a shot will hit within
* (done) gunCount property defines the number of guns there are where shots come from [1, 2, or 4]
* (done) Weapon splash radius property defines the blast radius of a shot
* (done) have a button to loop threw weapons
* (done) make it so clicking outside of the cross does nothing aside from centering cross hairs
* (done) clicking or touching the weapon switch button will not result in movement or firing a shot
* (done) make sure ver is 0.4.0 and make a pkg.html

## 0.3.0 - Explosions
* (done) use the object pool module to create a pool of Explosions in game.js
* (done) an explosion happens when a shot hits the target area.
* (done) and exploitation starts at zero radius, and then expands outward to a total radius
* (done) new map method that gets all cells from a given cell position and radius
* (done) A DPS value is applied to each cell in the current radius, and is effected by distance from the center of the explosion.
* (done) new draw method for explosions
* (done) percentKiled renamed to percentRemain
* (done) fix issue with explosion radius and damage
* (done) use a maxDPS explosion object property to figure DPS
* (done) fix issue where cell HP is going below zero
* (done) make sure ver is 0.3.0 and make a pkg.html

## 0.2.0 - Object Pool, shots, and a game Module
* (done) start a pool.js module that will serve as the Object pool module for this canvas example
* (done) start a game.js module that will sever as a central state module for cross, map, and pool object state collections created with the new pool.js module.
* (done) use the object pool module to create a pool of objects for Shots.
* (done) have shots come from the sides of the canvas to the cross hairs point.
* (done) make the cross hairs object look more like, well... a cross hairs.
* (done) make the ver property part of the game object, and make sure it is '0.2.0'
* (done) new draw method for shots
* (done) click and hold should cause continues fire
* (done) shots should move to target area when clicked
* (done) damage happens when a shot hits a target area (and only when)
* (done) make it so that shots will only fire when clicking in the inner radius of the cross object
* (done) touch support for shooting
* (done) make a new pkg_0_2_0.html

## 0.1.0 - Add a basic map.js
* (done) start a map.js module that will be effected by cross.js
* (done) start event will move cross hairs to the location
* (done) draw map.js according to the offset value of the cross object
* (done) real secs value in main app loop
* (done) full options for crossMod.create
* (done) make starting position in center of map
* (done) can not leave map
* (done) display 'v0.1.0' in the canvas
* (done) getting cells by clicking on them
* (done) have a hp and max hp value for each map cell
* (done) clicking on a cell lowers hp
* (done) display cells hp
* (done) have a percent killed display
* (done) create a pkg.html for 'v0.1.0'

## 0.0.0 - basic idea working
* (done) have a cross.js file started that will be used to create and update a crosshairs state object
* (done) A cross state object contains canvas relative x and y values for the cross hairs location
* (done) A cross state object has a cx and cy value for the center position of the cross area
* (done) A cross state object has three radius values one for the cross hardis and gtwo for an inner and outer radius from the center point.
* (done) a cross state object has an Offset point that will be effected by the crosshairs position
* (done) when the cross hairs object is in the inner area it will have no effect on the Offset point
* (done) when the cross hairs is in the other area it will effect the Offset point
* (done) cross hairs can not leave the outer limit of the outer area
* (done) when in the outer area, and there is no user down input, the crosshairs will move back to center point
* (done) start a draw.js file, and have at least one draw methid that will draw the state of a cross object
* (done) state a main.js file that will make use of draw.js and cross.js