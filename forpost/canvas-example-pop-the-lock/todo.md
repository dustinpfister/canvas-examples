## 1.2.4 - SpawnDispObj helper
* have a spawnDispObj helper
* small circle animation playback effected by current game.deg.dir
* make mode settings collection part of the save state
* make a 1.2.2 folder

## 1.2.3 - Score Object in all modes
* start a new standard score object to be used in all game modes.
* update scoring in freePlay mode
* update scoring in sudden death mode
* update scoring in endurance mode
* update scoring in classic mode
* make a 1.2.3 pkg folder

## 1.2.2 - Quick gameMode setting and display
* (done) click disp setting button as way to set a mode setting without having to click + or - button a whle bunch of times
* (done) display a progress bar for mode settings buttons
* (done - 03/29/2021) make a pkg 1.2.2 folder

## 1.2.1 - Better deg.current delta handling with game.delayMode property
* (done) Fix bug where high scores are not reset when a save is deleted that is the current state
* (done) Make base circle slightly thicker than range arc
* (done) When the deg.current value comes in range of deg.target value the game enters a kind of 'delay mode'
* (done) When in delay mode the deg.current value will stop at the deg.target value
* (done) However the delay will only continue for a fixed amount of time
* (done) have a deg.start and deg.totalDist props
* (done) Just capping deg.delta for now
* (done) game.missTrack should be renamed to game.lateTrack to help make things less confusing
* (done - 03/29/2021) make a 1.2.1 folder

## 1.2.0 - Game Save Manager State
* (done) can set ver in main.js
* (done) start a state-save in /states
* (done) have a button to state-save in title
* (done) have an sm.saveSlotIndex property
* (done) have four slot buttons in state-save one for sm.saveSlotIndex values 0 - 3
* (done) yellow background for slot button of current slot
* (done) clicking a slot button will set sm.saveSlotIndex to the slot index of that save slot
* (done) clicking a slot button will load that state if there is one
* (done) clicking a slot button will change the background
* (done) display score info, or 'empty' for all slot buttons
* (done) add a delete slot button
* (done) when delete slot button is clicked state-save will enter a 'delete mode'
* (done) clicking delete slot button again will cause state-save to leave 'delete mode'
* (done) in 'delete mode' all slot buttons will flash
* (done) clicking a slot button in 'delete mode' will cause that state slot to be removed
* (done) The SLOT_INFO element for a deleted slot will go back to 'Empty'
* (done) after a slot is deleted state-save will leave 'delete mode'
* (done) can delete a save state
* (done - 03/27/2021) make a 1.2.0 pkg folder

## 1.1.0 - Options State started and debug mode
* (done) start an options state in /states
* (done) can trun debug mode on and off in options menu
* (done) remove global debug text in draw.js
* (done) options object for stateMachine.create
* (done) update FreePlay mode with custom debug text
* (done) update suddenDeath mode with custom debug text
* (done) update endurance mode with custom debug text
* (done) update classic mode with custom debug text
* (done - 03/26/2021) make a 1.1.0 pkg folder

## 1.0.4 - /states folder
* (done) start with a state_machine.js file at root.
* (done) have a stateMachine.load public function
* (done) use stateMachine.load for each state in main.js
* (done) have each state object in main.js as a file in the new /states folder
* (done) have state-machine.js in lib folder
* (done) freePlay mode: see mode todo
* (done) suddenDeath mode: see mode todo
* (done) Endurance mode: see mode todo
* (done) fix spelling mistake with sudden death mode
* (done) classic mode: see mode todo
* (done - 03/24/2021) Make a pkg 1.0.4 folder

## 1.0.3 - Modes folders and Mode work
* (done) In the modes folder have a folder for each mode
* (done) Each javaScript file for each mode such as freeplay.js can become /modes/freeplay/gamemode.js
* (done) Have a README.md for each mode
* (done) a todo.md file can be in a mode folder as a way to write down some notes about what needs to get done for a mode.
* (done) Endurance mode: compleate what is outlined for endurance mode todo.md for 1.0.3
* (done - 03/23/2021) Make a pkg 1.0.3 folder

## 1.0.2 - Pixmaps
* (done) add pixmaps.js to the lib folder from canvas-example-animation-pixmaps
* (done) use a pixmap for the smaller circle in freePlay mode
* (done) draw.PTL_pixmap can take a pixmap name to use for ani objects
* (done) can set a frame Index for current-pos-pixmap in draw.js
* (done) use a pixmap as a background feature of the PTL circle
* (done) done passing secs value to update method of current game mode
* (done) current pos pixmap effected by time
* (done) background pixmap effected by miss or hit events in freeplay.js
* (done) circle-big ani set to frame 1 on click event, and then sets back to frame 0 over time in freePlay
* (done) draw.buttonPool method
* (done) draw.buttonPools global draw will make use of two alpha values, one for the background and the other for text and border
* (done) more than one style for target range depeding on trip up stats
* (done) fixed warp bug with settings
* (done) fixed tripUp bug with newTarget method in gameMod
* (done) freePlay mode: trip up chance setting
* (done) freePlay mode: custom degRange and trip up count range values in init method
* (done) freePlay mode: trip up range setting
* (done) use default pixmap for all modes other than freePlay
* (done - 03/22/2021) make a pkg 1.0.2 folder

## 1.0.1 - Use Object pool for things other than buttons
* (done) createButtonPool helper in main
* (done) In the title state use a disp object for the title text
* (done) get draw method for title text disp object working
* (done) have the title text move in and out with buttons
* (done) Make a spawnButton helper in main.js
* (done) using a new spawnSettingsButton helper in gameMode state
* (done) use spawnButton helper for all Buttons in main.js
* (done) setting active flag to fale for all object pools in changeState helper
* (done) In gameMode state have the current mode text be a disp object that moves with buttons
* (done) In game state have the main PTL circle area be a display object that will move in with buttons
* (done) In gameOver state have the game over text and score be a disp object and move in and out with buttons
* (done) just have an action prop for buttons that will also work as an id
* (done) rename getButtonById to getButtonByAction if I am just going to have one.
* (done) make the start of an action string for buttons created with the spawnSettingsButton standard
* (done) append the key at the end in the spawnSettingsButton helper
* (done) just pass strings like 'up', 'down', and 'current' for the action string argument in spawnSettingsButton.
* (done) make sm.modeSettingsCollection an object that contains settings for each mode;
* (done) setModeProp helper for gameMode state
* (done - 03/20/2021) Make a pkg 1.0.1 folder

## 1.0.0 - Mode Draw methods started, and backgrounds
* (done) Each mode javaScript file has a draw method
* (done) gameMod.load will fill undefined props with noop
* (done) Each mode javaScript can have a background property that can be a color
* (done) Use mode backgrounds for each mode in gameMode state
* (done) Use the game mode background in game mode
* (done) Start a Main README.md for pop-the-lock
* (done) Use game mode draw method to draw each pop the lock
* (done) have an optional createBackground game mode method that will be called in the init method of states like gameMode.
* (done - 03/19/2021) Make a 1.0.0 pkg folder

## 0.7.1 - New Score System for freePlay mode
* (done) New score system for freePlay mode where there is a base point amount for hits, that reduces over time.
* (done) There is a cap for the number of points gained by hiting targets in freePlay
* (done) A bonus part of the score is based on hits / totalTargets
* (done) additional score part based on speed setting for freePlay
* (done - 03/18/2021) make a 0.7.1 pkg folder

## 0.7.0 - Game Mode Choice and ModeSettings Object
* (done) have a Game Mode state to which the player enters from the title state
* (done) add a play button on the title state that will enter gameMode state
* (done) add a More Games button
* (done) The game Mode state can be used to choose what game mode to play
* (done) have next buttons that can be used to change a current Game mode value
* (done) have a start button that will enter game mode with current settings for game mode
* (done) Each mode should have settings to change things like speed, which in turn effects score when playing
* (done) classic mode should have an option to change level
* (done) make use of range value in a mode settings object
* (done) getButtonById buton pool helper in main
* (done) lower speed setting for classic
* (done) higher speed setting for classic
* (done) settings will change from one game mode to another
* (done) settings for freeplay mode
* (done) settings button on game over state
* (done) settings for endurence mode
* (done) settings for sudenDeath mode
* (done) title button in gameMode state
* (done - 03/17/2021) make a pkg 0.7.0 folder

## 0.6.0 - Classic Mode
* (done) start a classic mode that works like the original pop the lock game
* (done) In classic mode you start at number of targets set to the value of game.level
* (done) start a new mode settings object
* (done) each new level sets the total number of targets to that level
* (done) let hits be what increase speed rather than level
* (done) slow speed at first up to a slighly fast speed, but it is not to hard to get to the level cap of 100
* (done) use new target method with classic mode (use of trip ups)
* (done) Each time you win the level steps up by one and you need to hit that many targets to win
* (done) display You Won message in place of Game Over when a round is won in classic mode
* (done - 03/16/2021) make a pkg 0.6.0

## 0.5.1 - fix bug with buttons now showing up, other general fixes and changes
* (done) added a maxSecs prop for pool.js that should fix the problem of buttons not showing up
* (done) width and height change for title buttons.
* (done) large title text
* (done) space between buttons
* (done) larger score text
* (done) larger quit button
* (done) larger play again and back buttons in gameOver state with spacing
* (done) larger debug text
* (done) draw late and miss counts in draw.score
* (done - 03/15/2021) make a 0.5.1 pkg folder

## 0.5.0 - Plugin system, Sudden Death and new Endurance Modes
* (done) start a gameMod.loadMode method
* (done) make endurance mode external in a new /modes folder
* (done) make freePlay mode external in a new /modes folder
* (done) can use modeAPI in init methods, and all methods in plugins for that matter
* (done) old Endurance mode should actually be called suddenDeath mode
* (done) start a new system in main.js that creates buttons for all loaded modes
* (done) new Endurance should be like suddenDeath but has an HP bar
* (done) hp heal over time
* (done - 03/14/2021) make a pkg 0.5.0 folder

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
* (done - 11/26/2019) make a 0.0.0 pkg folder
