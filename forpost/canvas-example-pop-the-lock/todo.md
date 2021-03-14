
## 0.x.0 - Money
* add a sm.money prop
* update sm.money on each game over state once in the init method

## 0.x.0 - Game Mode Settings State

## 0.x.0 - Address isshue with cx in pool.js
* have a obj.cx and obj.cy prop in pool.js that will be the center point of a display object
* make all changes needed in pool.js, main.js, and draw.js

## 0.x.0 - Classic Mode
* start a classic mode that works like the original pop the lock game
* In classic mode you start at level 1 which means you just have to hit one target and you won
* Each time you win the level steps up by one and you need to hit that many targets to win

## 0.5.0 - Plugin system, Themes, Sudden Death and new Endurance Modes
* (done) start a gameMod.loadMode method
* (done) make endurance mode external in a new /modes folder
* (done) make freePlay mode external in a new /modes folder
* can use modeAPI in init methods, and all methods in plugins for that matter

* more than one theme
* have new background and color themes for each game mode
* flash canvas red when a miss happens
* old Endurance mode should actually be called suddenDeath mode
* new Endurance should be like suddenDeath but has an HP bar

## 0.4.0 - Save States
* (done) add utils.save and utils.load methods
* (done) add a sm.highScores object
* (done) update sm.highScores in game over state once in the init method
* (done) load any state before starting main loop
* (done) display high score
* (done - 03/13/2021) make a pkg 0.4.0 folder

## 0.3.0 - Game modes, starting with freePlay and endurance modes, many improvements
* (done) have an out animation for buttons that change current state
* (done) have a deg.distance prop in game.js that is the shortest distance from deg.target
* (done) new getTarget helper
* (done) new getTargetRandom helper
* (done) add an additional argument to getTarget that allows for a number from 0 to 1 that sets the range from deg.current
* (done) pull normalizeHalf and shortestDistance angle methods from game.js into utils.js
* (done) have a degOrigin argument for getTarget helper 
* (done) new random trip up get target method and object
* (done) tripUp.chance, and tripUp.countRange props
* (done) random range utils method
* (done) new system for tracking a missed hit of the target
* (done) new system for tracking clicks and hits of targets
* (done) game.pause
* (done) start a 'gameOver' state
* (done) when the quit button is pressed enter gameOver state
* (done) final stats of game are displayed in gameOver state
* (done) use draw.background to draw a layer of black between gameover text and the state of PTL in background
* (done) There are two buttons in gameOver state one to start over (current mode), and the other to go to title
* (done) pull draw score out of draw.PTL and do not draw it in game over state
* (done) have a 'freePlay' mode that is the game as it is now
* (done) in freePlay track total clicks, hits, and missed runs and use these values to set a score
* (done) with freePlay the player can just keep playing till they get board and press the quit button
* (done) start an 'endurance' mode where the object is to get the score as high as you can before loosing
* (done) can loose in endurance mode
* (done) when you loose my just missing a target, or clicking to soon enter game over state
* (done) game.level prop used in endurance mode
* (done) as level goes up so does speed
* (done) have options object for gameMod.create that allows for setting game mode
* (done) have New FreePlay Game and New Endurance Game buttons on title.
* (done) score should be effected by game.level in endurence mode
* (done - 03/12/2021) make a pkg 0.3.0 folder

## 0.2.0 - Object Pool, and buttons
* (done) start an object pool lib that will just be used for buttons
* (done) Have a title state in main.js
* (done) have a start game button in title state
* (done) have a back button in game state
* (done) have labels on buttons
* (done) have a main update state method
* (done) have a trans method for a state object
* (done) make a poolMod.moveByFramePerObj method
* (done) have moving buttons that start at an out position, and move to a home position
* (done) animate the quit button in game state.
* (done - 03/10/2021) make a pkg 0.2.0 folder

## 0.1.0 - sm started, ./lib/game.js, and ./lib/draw.js
* (done) start a game.js file
* (done) start a draw.js file
* (done) create a new gameMod.update to replace gameMod.tick
* (done) start a state machine in main.js
* (done) have a game state
* (done - 03/07/2021) make a pkg 0.1.0 folder

## 0.0.0 - Basic idea
* (done) Basic idea working
* (done) display ver
* (done - 2019/11/26) make a 0.0.0 pkg folder
