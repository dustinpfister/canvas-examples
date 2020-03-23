# Todo list for canvas-example-game-flappy-collector-idle

* (done) add a shouldFlap method that will return true if the bird should flap to get to the next berry
* (done) add an auto play mode that is just simply the game playing by itself
* (done) add a AutoTime bird property that is the amount of time that the player has until the game enters auto play mode
* (done) add a AutoDelay property that is the amount of time to set autoTime to each time it is reset
* (done) AutoTime is reset each time the play clicks the screen
* (done) progress bar for AutoTime when drawing scene

<!-- BERRY LEVEL-->
* (done) new berry level bird object property
* (done) new berries collected property
* (done) new berry level check helper
* (done) berries will level up as they are collected
* (done) higher level berries are worth more
* (done) spawn delay will go down with berry level
* (done) berry pps will go up with level

<!-- BERRY SPAWN -->
* more than one spawn method
* spawn method that will take into account bird y position
* spawn method that will spawn two or more berries at once

<!-- UPGRADES -->
* Have upgrade buttons on the right side of the canvas
* clicking an upgrade button does not reset auto play
* bird speed upgrade
* berry point bonus upgrade
* berry slow down upgrade
* hatch points
* hatch upgrade
* secs multilayer for bird pps formula that is in effect for autoPlay only

<!-- HATCH POINTS and HATCHING -->
* A Hatch event rests all bird upgrades
* A Hatch event resets berries to level 1
* hatch points give permanent bonus to berry point value formula

<!-- AWAY PRODUCTION-->
* JUst a simple berry point value is given based on amount of time away and current upgrades / berry level

<!-- graphics -->
* bird sprite sheet
* berry graphic
* background
* game play info bar in place of debug into method