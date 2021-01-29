# canvas-example-game-kaboom-clone todo list

## 0.x.0 - Animations and pauses
* bomb explosion animation and pause
* pause when next level starts
* message displayed for any kind of pause event

## 0.x.0 - keyboard and touch events
* can move player object with touch events

## 0.x.0 - AI control and health up
* player gets 1 hp per 1000 points
* make clampBoiners helper a util.js method

## 0.0.0 - basic idea working
* (done) add a player object and draw it on the canvas
* (done) can move the player object with mouse pointer
* (done) player can catch bombs
* (done) player points
* (done) one bomb that reaches bottom of the screen will result in all bombs cleared and loss of 1 player hp
* (done) player gets points per bomb catch
* (done) player hp === 0 results in game over
* (done) start new button displayed during game over
* (done) start new button will start a new game at level 1 when clicked
* (done) have an AI control feature
* (done) can move player object with keyboard events
* (done) pauseTime state property (0 - no pause, > 0 is pause time, -1 is set pause)
* (done) pauseMessage property
* (done) use new utils.createCanvas, and utils.getCanvasRealtive methods
* (done) draw ver number to canvas
* (done - 01/29/20201) make a pkg 0.0.0 folder
