# canvas-example-pop-the-lock features list

These are features that I may or may not add at some point in the future if I do keep working on this

## 1.x.x - Address issue with cx in pool.js
* have a obj.cx and obj.cy prop in pool.js that will be the center point of a display object
* make all changes needed in pool.js, main.js, and draw.js
## 1.x.x - Support for up to 10 Settings for game modes
## 1.x.x - new /lib/buttons.js
## 1.x.x - Options state - Animations settings
## 1.x.x - Options state - Frame Rate Display

## 1.x.2 - Score Object in all modes
* start a new standard score object to be used in all game modes.
* update scoring in freePlay mode
* update scoring in sudden death mode
* update scoring in endurance mode
* update scoring in classic mode
* make a pkg 0.7.2 folder

## 1.x.1 - Quick mode setting and display
* click disp setting button as way to set a mode setting without having to click + or - button a whle bunch of times
* display a progress bar for mode settings buttons

## 1.x.0 - EXP and Skill Points
* add a sm.exp prop
* update sm.exp on each game over state once in the init method
* small circle animation playback effected by current game.deg.dir
* make mode settings collection part of the save state
* have a spawnDispObj helper