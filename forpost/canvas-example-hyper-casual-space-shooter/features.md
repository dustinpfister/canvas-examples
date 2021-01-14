## canvas-example-hyper-casual-space-shooter features list

This is a list of features that I may or may not even add to the game to begin with. I do not really want to just add any and all ideas that come to mind with this, so when I get an idea for something I park it here, and then sleep on it. I might also want to draft out the next set of minors to work on that will then be added to the todo list in this file.

<!-- ENERGY, and HP -->
<!-- 
   Energy was a feature added a while ago, but it could use some work.
-->

## 0.x.0 - Max HP upgrade
## 0.x.0 - Max Energy upgrade
## 0.x.0 - Energy Rate Upgrade added in Ship Page

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

<!-- INFO DISP -->
## 0.x.0 - message system
## 0.x.0 - commom infoDisplay that can change my clicking it
## 0.x.0 - damage disp object pool ( pool for objects that display how much damage done to a block)
## 0.x.0 - cheat system

<!-- WEAPONS -->
## 0.x.0 - New Weapons with plain onHit Damage only, splash damage only, and bolth
## 0.x.0 - Weapon Accuracy
## 0.x.0 - Weapon Splash Damage
## 0.x.0 - Missles
## 0.x.0 - Weapon on fire update methods
## 0.x.0 - Better weapon info display uisng infoDisplay system

<!-- ECONOMY -->

## 0.x.0 - Economy page started, and Block Money Base upgrade
* Start an economy button page at the base.
* have the ushual back button in the economy page
* have a single 'block money base' upgrade in the economy page
* have constants for BLOCK-MONEY-BASE-MIN, and BLOCK-MONEY-BASE-MAX
* the block money base upgrade will increate the base amount of money for a block

## 0.x.0 - Block Money Dist upgrade
* have constants for BLOCK-MONEY-DIST-MIN, and BLOCK-MONEY-DIST-MAX
* have a 'block money dist' upgrade in the economy page

## 0.x.0 - Money Over time (while playing)
## 0.x.0 - away production (money given after being away for a while)

<!-- BASE OBJECT(S) and SANDBOX -->
## 0.x.0 - Sandbox game mode started
## 0.x.0 - More than one base Objects in the map

<!-- IMPROVE FEATURES IN PLACE, FIX BUGS, TWEAK VALUES -->
<!--
    Now that I have basic tools to help me know what the deal is with making money, and how log it takes to get somewhere it is time to use that info to improve features in place. Much of this might involve just tweaking some values to states that are more in line with what they should be for a finished product. At this time I should also focus on fixing known bugs, and simple little problems.

-->

## 0.x.0 - Weapon Value tweaks, and new weapons
* The pulse gun is to powerful, make it the true 'starting gun' by making the max shot damage a far smaller percentage of max block hp.

## 0.x.0 - Save State Improvements
* The current weapon index should be part of the save state
* The current ship health should be part of the save state
* The current ship energy should be part of the save state
* Player settings should be part of the save state too, such as saving the state of the autoFire bool

<!-- FACTIONS, and enemy ships -->

## 0.x.0 - Faction Areas
* have areas in the map where a faction can be
* A faction object stores a value that is the last time the player has been in range of the faction area
* the last time propery is used to find the strength of the faction in terms of units.

### 0.x.0 - Added Enemy ships

<!-- AUTOMATION -->
## 0.x.0 - Game Automation, game.startTime
* work out a script that will automate the act of playing the game.
* add a game.startTime value that will be the date at which the 'player' has started to play the game

<!-- WARP -->

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

<!-- CONTROLS -->
## 0.x.0 - Course and fine grain control
## 0.x.0 - Yaw Movement with keyboard J and L keys (set manual fire to k button)
## 0.x.0 - common game.buttons
## 0.x.0 - Keyboard Button Nav

<!-- ADDITIONAL FEATURES -->
<!-- These are additional features that have come to mind for this project that I may or may not get to -->
## 0.x.0 - homesick
* HomeSick feature rate at which energy goes up, will go down as distance from base goes up
## 0.x.0 - Graphics Change III
## 0.x.0 - Replace hard coded 160, 120 values
* have a state.canvasHalfWidth, and state.canvasHalfHeight values
* Replace hard coded 160, 120 values in draw.js, game.js, ect with state.canvasHalfWidth and state.canvasHalfHeigh
## 0.x.0 - Common System for Object Movement
* have a commom system for movement of objects
* use the same commom system for 'shots', 'blocks', and any additional objects
## 0.x.0 - Use utils.log1 to set block values other than armor
* use the getValueByMapDist helper to set Money value of blocks
