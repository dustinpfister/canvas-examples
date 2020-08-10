# todo list for canvas-example-monster-smash

## 0.1.0 - more than one map
* the center map is the starting map that is a safe zone for the player where no monsters are

## 0.0.0 - basic idea of a maps, and a player, and monster objects.
* (done) have a basic map.js module that creates a map object of cells that can be formed into a grid
* (done) have a game.js module that where 1 map objects are created as part of the state
* (done) have a createUnit method in game.js that will create and return a base unit object
* (done) have a player object in game.js create with base stats, but also all player stats
* (done) have player object start in map index 0, and have that map index as the starting index
* (done) draw the player object in the map

* add mouse, and touch events first.
* move the player object with pointer events

* have a monsters object pool in game.js
* have a weapons array with one weapon object that is used by monsters and player
* leaving the center map into any other the other maps is a map where monster objects are
* there are two 'modes' in game.js 'map', and 'battle'
* if the player object overlaps a monster object that results in the game going from 'map' to 'battle' mode
* if the player wins in 'battle' mode the game goes back to 'map' mode at the same location
* if the player looses 'battle' mode the player returns to the home map location
