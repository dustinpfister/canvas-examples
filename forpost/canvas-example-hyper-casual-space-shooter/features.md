## canvas-example-hyper-casual-space-shooter features list

This is a list of features that I may or may not even add to the game to begin with. I do not really want to just add any and all idea that come to mind with this

<!-- BASE OBJECT(S) -->

## 0.x.0 - More than one base Objects

## 0.x.0 - Sandbox game mode
* add and additional game mode where we enter a sandbox type subgame for a Base object

<!-- AUTOMATION -->
## 0.x.0 - Game Automation, game.startTime
* work out a script that will automate the act of playing the game.
* add a game.startTime value that will be the date at which the 'player' has started to play the game

<!-- WARP -->

## 0.x.0 - warp
* add a warp home button in 'space' mode
* the cost of a warp home will go up as the ship goes farther out

<!-- UPGRADE SYSTEM -->

## 0.x.0 - log4 per method

## 0.x.0 - Better stat info for upgrades
* start a new system for upgrades where you select an upgrade and press a 'buy' button to upgrade
* when an upgrade is selected stat info for the upgrade is displayed

<!-- EFFECTS -->

## 0.x.0 - Sunder Armor
* Add a SUNDER ARMOR effect that will reduce block armor by 5 to 10 percent per stack for 1 to 5 stacks
* sunder armor is a timed effect

## 0.x.0 - CRIDICAL HIT
* add CRIDICAL HIT effect that will cause 5 to 25 percent of total block hp in damage

### 0.x.0 - Money Per Hit
* add a MOMNEY PER HIT EFFECT that will result in bonus money for each additional hit while the effect is in play

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

## 0.x.0 - Weapon Blast radius, Accuracy
* each weapon has an accuracy object
* acc.radius is the potential radius in which a shot will hit from perfect accuracy to acc.radius
* acc.per is applied with acc.radius to find and actual radius that will be used to set shot location

## 0.x.0 - Missles

## 0.x.0 - Weapon on fire update methods
* have a onFireUpdate method as an option for a weapon

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
## 0.x.0 - common game.buttons
* have a better button system
## 0.x.0 - Keyboard Button Nav
* can use arrow keys and enter button as a way to select and click buttons with the keyboard
## 0.x.0 - message system
## 0.x.0 - Course and fine grain control