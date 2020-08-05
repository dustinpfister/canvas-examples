# todo list for canvas-example-monster-smash

## 0.0.0 - basic idea of a maps, and a player, and monster objects.

* have a basic map.js module that creates a map object of cells that can be formed into a grid
* have a game.js module that where 9 map objects are created as part of the state
* have a unit.js module that will create and return a base unit object
* have a player object in game.js
* have a monsters object pool in game.js
* have a weapons array with one weapon object that is used by monsters and player
* the center map is the starting map that is a safe zone for the player where no monsters are
* leaving the center map into any other the other maps is a map where monster objects are
* there are two 'modes' in game.js 'map', and 'battle'
* if the player object overlaps a monster object that results in the game going from 'map' to 'battle' mode
* if the player wins in 'battle' mode the game goes back to 'map' mode at the same location
* if the player looses 'battle' mode the player returns to the home map location
