# todo list for canvas-example-monster-smash


## 0.x.0 - weapons
* have a weapons array with one weapon object that is used by monsters and player
* if the player object overlaps a monster object that results in the game going from 'map' to 'battle' mode
* if the player wins in 'battle' mode the game goes back to 'map' mode at the same location
* if the player looses 'battle' mode the player returns to the home map location

## 0.x.0 - more than one map
* the center map is the starting map that is a safe zone for the player where no monsters are
* leaving the center map into any other the other maps is a map where monster objects are
* there are two 'modes' in game.js 'map', and 'battle'

## 0.3.0 - Battle mode
* when a player and enemy object are at the same map pos then the game will enter 'battle mode'
* in battle mode the player and enemy will attack each other one turn at a time

## 0.2.0 - Enemy sight
* (done) enemy units have a sight prop that is the radius that the unit can see
* (done) if the player object is in sight of the enemy it will move to it
* (done) if the player object is not in sight of the enemy it will move at random
* make a pkg_0_2_0.html

## 0.1.0 - enemy unit pool
* (done) have a monsters object pool in game.js
* (done) place monsters in map
* (done) a monster at the same cell as player results in instance kill of monster (for now)
* (done) monsters move with player moves
* (done) monsters spawn back in based on map setting
* (done) make a pkg_0_1_0.html

## 0.0.0 - starting modules together, and player object movement
* (done) have a basic map.js module that creates a map object of cells that can be formed into a grid
* (done) have a game.js module that where 1 map objects are created as part of the state
* (done) have a createUnit method in game.js that will create and return a base unit object
* (done) have a player object in game.js create with base stats, but also all player stats
* (done) have player object start in map index 0, and have that map index as the starting index
* (done) draw the player object in the map
* (done) add mouse, and touch events first.
* (done) new map get cell methods
* (done) gameMod update method started
* (done) move the player object with pointer events
* (done) make a pkg_0_0_0.html
