# todo list for canvas-example-game-crosshairs

## First Game
* start first game based off of this source code
* game should be placed in the header of my website as a way to just throw this in peoples faces on any page
* make a feature that uses the text of a page to set map level
* make cool custom sprite sheets for cells, and all other aspects of the look and feel of the game

## 0.x.x - Bug fixes and concerns
* create an array of start index values for maps other than [0] in game.js setMap method
* pull out all instances of the utils.getCanvasRelative method from files other than main.js
* see about fixing issue where shots are tied to the canvas rather than the map (what happens when shooting and moving)
* Shots that hit outside of map should still cause damage to shots in the map that are in the blast radius
* (partial fix) it seems that the AI can get stuck when Frame Rates are real low
* cancel all shots and explosions when changing maps
* should I have a map.totalDamage property? If so why?
* a weapons object should be part of the game state, have a deepClone solution to clone the hard coded weapons object in game.js

## 0.x.0 - UI animations
* Work out animation feature for buttons
* Animated cross object in game state
* cross hairs object will have an animation when entering, or leaving the game state
* buttons will have a similar animation when entering and leaving sates

## 0.x.0 - Cross hairs display III
* cross hairs display changes depending on move or shoot area

## 0.x.0 - Set map values by page text content
* set map values by page text content

## 0.x.0 - Enemy fire and health
* to make the game more interesting there are enemy units on the map that fire back
* game.HP, and game.maxHP properties will be needed
* game.gameOver state
* In game over state player can reset and enter the game state

## 0.x.0 - Enemy disp objects
* use pool.js to create a pool of display objects to be used as enemies that move sround the map
* have an enemies object for each cell type
* enemies spawn from active cells that have a enemies.spawn bool set to true
* enemies move from cell to cell

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

## 0.x.0 - Level Graphs and updated level up system
* have a level graph system like what I worked out in 'percent-math-log' canvas example
* apply what it is that I have worked out in that example to have a better system for handling leveling up

## 0.x.0 - Sprite Sheet Graphics II
* create new system for sprite sheets that involves something like what I worked out in my image-limits canvas example
* have a system where a number index is used for a 16*16 area of a 32*32 cell
* use base 64 to encode the numbers for a single 'color-layer'
* can have more than one color layer

## 0.x.0 - keyboard events
* add keyboard events
* use numbers for setting current weapon
* +/- keys for looping threw weapons
* wasd keys for movement
* space/k fires current weapon

## 0.x.0 - Hold fire button
* add a holdFire 'toggle' button
* have a different display in the center of cross when holdFire is on

## 0.x.0 - cheat/debug system
* start a new cheat system module
* cheat system can be used in the UI to unlock all weapons (without effecting level)
* cheat system can be used to set main game.LevelObj by level value
* cheat system can be used to set a starting damage value for a map

## 0.x.0 - game.levelObj used to unlock sills and other features
* All weapons aside from 'blaster' locked at game level 1
* map level restricted to only level 1 at game level 1 in map menu
* all skills locked at game level 1
* as game level goes up, items unlock

## 0.20.0 - save states I
* (done) have support for more than one version of a save string, so the very first field of the save should be a value that indicates what method to use to load the save
* (done) v0 save string (var saveStrV0 = 'v0.3000.'; // v0 save that just stores xp)
* (done) gameMod.createSaveString public method for creating a save state string
* (done) gameMod.applySaveString public method for applying a save string
* (done) gameMod.create can accept a saveString as an argument and create a new game state from that
* (done) have game autoSave via localStorage on each frame tick for now in game state
* (done) use the init state in main.js as a place to check for a saveString via local storage
* v1 save string (var saveStrV1 = 'v1.3000.3.0-1-0-4.'; // v1 save that stores xp, mapIndex, and skillPoints for each weapon)
* have a clearSave button in options
* make a pkg_0_20_0.html

## 0.19.0 - Skill Point System II
* (done) update exp_system to new xp.js that was worked out for js-javascript-example-skill-point-system
* (done) use the applySkillPoints method of exp_system.js to set the value of maxDPS for weapons
* (done) have a level object for manaCost for each weapon
* (done) have the setWeaponToLevel helper set the weapon value for each object in the weapon.level object
* (done) have a gameMod.createSkillButtons method that can be used in main.js to create a collection of buttons for each upgrade
* (done) add skill point buttons for all weapons
* (done) add init state for state machine
* (done) create sm.game in init state
* (done) make sure Current skill points and maxDPS values are displayed for each button before they are clicked for the first time
* (done) break the public API object down in gameMod so that public methods are defined as api.publicMethod
* (done) have a skillSet helper method in gameMod that will be used by upgrade buttons
* (done) display free skill points in skillManager state
* (done) skill points deduct from a total free skill point value
* (done) if there are not enough free skill points the skill will not be increased
* (done) skillsReset helper in gameMod that will reset all skills to 0 and set skillPoints.free to skillPoints.total
* (done) setFreeFromSkills helper that will set the game.skillPoints.free value from the game.skills object
* (done) number of skill points based off of game.levelObj state
* (done) skill points just go up by 5 for each level for now
* (done) skill reset button results main free skill points to total skill points
* (done) make a pkg_0_19_0.html

## 0.18.0 - Mana System
* (done) skill point gains are way to trivial at low levels
* (done) add a mana object to be used in game.js
* (done) all weapons will cost a certain amount of mana
* (done) if the player does not have enough mana to fire the current weapon it will not fire
* (done) mana bar in UI
* (done) Mana will restore over time
* (done) max mana, and mps will go up with level
* (done) make a pkg_0_18_0.html

## 0.17.0 - Upgrade buttons, and Skill Point system I
* (done) have a createDPSObject that will be used to set DPS for a weapon
* (done) start a skillManager menu state in main.js that will be used to set skill points to skills
* (done) add a 'to options' button in skillManager state
* (done) add a 'to skillManager' button in options menu
* (done) have a skillPoint object in game.js that will store the current state of skills
* (done) add a data object for buttons
* (done) add a 'upgrade' button type to the buttons module
* (done) upgrade buttons have a + and - action area depending on where they are clicked
* (done) update draw methods for skillManager
* (done) weapon upgrade buttons change state of skill point values in game object
* (done) add new info prop for buttons
* (done) new skill point values applied to weapons on each upgrade action
* (done) display skill point value and weapon DPS for each weapon button
* (done) make a pkg_0_17_0.html

## 0.16.0 - Map starting damage
* (done) fixed a bug where the AI goes after a cell that is no longer there when going from a large map to a smaller one.
* (done) new poolMod.inactivate all
* (done) inactivate all shot pool objects on map change
* (done) inactive all explosion pool objects
* (done) have a blastRadius helper that will cause a starting blast radius for a map area
* (done) starting damage blastRadius count, damage, and radius range effected by map level
* (done) make a pkg_0_16_0.html

## 0.15.0 - Map menu state
* (done) start a new state that will be used to change map settings
* (done) have a button in the options menu that will change current state to map state
* (done) have a return to options menu that will return to game without applying any changes
* (done) have levelUp and levelDown buttons
* (done) display the current map level
* (done) display size of map
* (done) can set mapLevel from 1 to level cap and back again
* (done) fixed bug with map size
* (done) display max cell level cap and deltaNext
* (done) display map cell growth info
* (done) have cross centered over new map
* (done) make a pkg_0_15_0.html

## 0.14.0 - Map level
* (done) fix bug where XP system returns level zero when given 0 xp with parseByXP
* (done) option object for mapMod.create added
* (done) mapMod.create opt can be used to set cellWidth and cellHeight of a map object
* (done) mapMod.create opt can be used to set values for levelCap and deltaNext for cells
* (done) can use opt of create method to set cell regeneration values
* (done) use the XP system to create a levelObj for the map object in game.js called game.mapLevelObj
* (done) game map level sets cellLevel cap and deltaNext values
* (done) game map level sets gen rate and count
* (done) game map level sets map size [8x8, 16x8, 16x16, 32x16]
* (done) new game.setMap method to setUp a new map for a game object
* (done) for now just giving number literals as XP until I have a better system
* (done) percent values for levels displayed in UI
* (done) make a pkg_0_14_0.html

## 0.13.0 - Buttons
* (done) make a standard module or class for creating and updating button objects
* (done) have a 'basic' buttonType that will just preform an action when clicked and displays a static label
* (done) have a 'option' buttonType that runs threw a list of options when clicked
* (done) all buttons should be part of the state machine rather than the game module
* (done) use new button standard for options and change weapon buttons in game state
* (done) make 'game' button in options state a 'basic' type
* (done) make the debug button a 'option' type button
* (done) have a 'toggle' buttonType that has an 'on' and 'off' state with labels for each
* (done) add an autoPlay 'toggle' button in options state to turn autoPlay on and off
* (done) small 8x8 map size
* (done) make a pkg_0_13_0.html

## 0.12.0 - Cross hairs display II
* (done) display a percent remaining bar in cross hairs area
* (done) lower values for cells so they do not get to hard to fast
* (done) display a progress bar to AI control
* (done) use a general drawBar helper to draw all these different bars
* (done) display basic info about the current weapon including name, and maxDPS
* (done) display basic info about any cell that is over the cross hairs
* (done) weaponBar for shotDelay
* (done) display 'change weapon' on change weapon button
* (done) move options button to lower left
* (done) have options button display 'options'
* (done) display white bx around current cell
* (done) make damage bar a bar around the outer edge
* (done) fill color of inactive cells based on cell.dmagePer
* (done) make a pkg_0_12_0.html

## 0.11.0 - CellTypes upgrade based on total damage of cell
* (done) use new exp system to set a levelObj for each cell in the map.
* (done) display current level rather than damage per for each cell
* (done) cap and deltaNext values for cell.levelObj is set by new map.cellLevelCap and map.cellDeltaNext values
* (done) cell.levelObj of the cell is set by cell.damage and new map values
* (done) cell.maxHP is set by cellType and level
* (done) have a new map debug mode to display new map.totalDamage value as well as other map values
* (done) make a pkg_0_11_0.html

## 0.10.0 - level up system for player based on total damage as EXP
* (done) make an exp_system.js module
* (done) have a game.levelObj property
* (done) use the exp_system module to set, and update game.levelObj
* (done) display game.level in game state as part of fixed display rather than debug menu
* (done) display totalDamage in game state as part of fixed display rather than debug menu
* (done) have game.level set accuracy of all weapons
* (done) have game.level set DPS for all weapons
* (done) new debug mode for current weapon
* (done) new debug mode for level
* (done) progress bar for draw.damageBar
* (done) make a pkg_0_10_0.html

## 0.9.0 - state machine
* (done) now Have everything inside an IIFE in main.js, and fixed a few problems using globals in game.js, and draw.js
* (done) start a state machine that will serve as a single central state object
* (done) all canvas input is handled by the state machine rather than game.js
* (done) have a main game state for the current update loop in main.js
* (done) start a general 'options' state that can be used to set just debug screens for now
* (done) be able to switch from 'game' and 'options' states threw the GUI
* (done) 'ver' should now be a property of the state machine object rather than game.js
* (done) make a pkg_0_9_0.html

## 0.8.0 - sprite sheet graphics I
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