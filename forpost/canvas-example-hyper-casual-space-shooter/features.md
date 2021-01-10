## canvas-example-hyper-casual-space-shooter features list

This is a list of features that I may or may not even add to the game to begin with. I do not really want to just add any and all idea that come to mind with this, so when I get an idea for something I park it here, and then sleep on it. I might also want to deaft out the next set of minors to work on that will then be added to the todo list here.


<!-- ECONOMY -->

## 0.x.0 - Block Money Dist upgrade
* have constants for BLOCK-MONEY-DIST-MIN, and BLOCK-MONEY-DIST-MAX
* have a 'block money dist' upgrade in the economy page

## 0.x.0 - Economy page started, and Block Money Base upgrade
* Start an economy button page at the base.
* have the ushual back button in the economy page
* have a single 'block money base' upgrade in the economy page
* have constants for BLOCK-MONEY-BASE-MIN, and BLOCK-MONEY-BASE-MAX


<!-- STATE MACHINE -->
<!--
    I have been putting off creating a state machine becuase I want to focus on the core logic of what the game is first. That is have a game where there is just one state, the main game state, and that is it. However once I do have the core of what the game is worked out, and if I do want to keep working on this project, then at some point I will want to have some kind of main state machine started.
-->

## 0.x.0 - New /states/save-manager.js
* start a /states/save-manager.js
* add a button in title.js that will go to save manager.js
* the 'play button'

## 0.x.0 - Start a statemachine.js file in /lib, /states folder, /states/title.js, /states/space.js
* start a new statemahine.js file in /lib
* have a /states/title.js that will be a main title screen state for the game.
* have a /states/space.js file that will be the main game as it currently stands.
* have a buttons feature of the state machine
* use new state machine in main.js

<!-- IMPROVE FEATURES IN PLACE, FIX BUGS, TWEAK VALUES -->
<!--
    Now that I have basic tools to help me know what the deal is with making money, and how log it takes to get somewhere it is time to use that info to improve features in place. Much of this might involve just tweaking some values to states that are more in line with what they should be for a finished product. At this time I should also focus on fixing known bugs, and simple little problems.

-->

## 0.33.0 - Weapon Value tweaks, and new weapons
* The pulse gun is to powerful, make it the true 'starting gun' by making the max shot damage a far smaller percentage of max block hp.

## 0.32.0 - Save State Improvements
* The current weapon index should be part of the save state
* The current ship health should be part of the save state
* The current ship energy should be part of the save state
* Player settings should be part of the save state too, such as saving the state of the autoFire bool


<!-- INFO and HELP features -->
<!-- 
        From 0.31.x forward I should now add some features that will result in better and cleaner displays of info
    in plave of displaying everything on the canvas all at once, it might be better to have an area that is a kind
    of general info area. Clicking on this area can be uaed to switch between diferent views. There are other features
    that I might want to add like a message system that can be used to display
-->


<!-- BASE OBJECT(S) and SANDBOX -->
## 0.x.0 - Sandbox game mode started
## 0.x.0 - More than one base Objects in the map

<!-- AUTOMATION -->
## 0.x.0 - Game Automation, game.startTime
* work out a script that will automate the act of playing the game.
* add a game.startTime value that will be the date at which the 'player' has started to play the game

<!-- WARP -->
## 0.x.0 - warp to home
## 0.x.0 - warp to any point for a cost in energy or money

<!-- UPGRADE SYSTEM -->
## 0.x.0 - log4 per method
## 0.x.0 - Better stat info for upgrades
* start a new system for upgrades where you select an upgrade and press a 'buy' button to upgrade
* when an upgrade is selected stat info for the upgrade is displayed

<!-- EFFECTS -->
## 0.x.0 - Sunder Armor
## 0.x.0 - CRIDICAL HIT
## 0.x.0 - Money Per Hit

<!-- BLOCKS-->
## 0.x.0 - non random block positioning uisng map.x and map.y
## 0.x.0 - Block Deflect Chance

<!-- MONEY -->
## 0.x.0 - Base Away Production
## 0.x.0 - Money over time
## 0.x.0 - Block Money Upgrade

<!-- WEAPONS -->
## 0.x.0 - Better weapon info display uisng infoDisplay system
## 0.x.0 - New Weapons with plain onHit Damage only, splash damage only, and bolth
## 0.x.0 - Weapon Accuracy
## 0.x.0 - Weapon Splash Damage
## 0.x.0 - Missles
## 0.x.0 - Weapon on fire update methods

<!-- INFO DISP -->
## 0.x.0 - message system
## 0.x.0 - commom infoDisplay that can change my clicking it
## 0.x.0 - damage disp object pool ( pool for objects that display how much damage done to a block)

<!-- CONTROLS -->
## 0.x.0 - Course and fine grain control
## 0.x.0 - Yaw Movement with keyboard J and L keys (set manual fire to k button)
## 0.x.0 - common game.buttons
## 0.x.0 - Keyboard Button Nav

<!-- ADDITIONAL FEATURES -->
<!-- These are additional features that have come to mind for this project that I may or may not get to -->
## 0.x.0 - homesick
* HomeSick feature rate at which energy goes up, will go down as distance from base goes up
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
## 0.x.0 - Use utils.log1 to set block values other than armor
* use the getValueByMapDist helper to set Money value of blocks
