# canvas-example-pop-the-lock

This [canvas example](https://dustinpfister.github.io/2019/11/26/canvas-example-pop-the-lock/) is what started out as a simple clone of the Game Pop The Lock for android, and turned into a bit of a major project that is still a bit of a work in progress. Although I am pretty sure I have many of the basic features solid, sense it is a pretty simple game in terms of the mechanics, there are a number of games modes each of which I am playing around with different sets of rules, features, and settings.

## How to Play

There are a number of game modes, but all of them are just slightly different variations of the same basic concept. There is a small circle that moves along the circumference of a larger circle. Once the smaller circle is over a target area, the player just clicks the mouse, or touches the screen on touch devices. Each game mode is just changing up the rules a little when it comes to what happens if the player clicks to soon, or what happens when the player is to late and misses the target. There is also what to do when a target is in fact hit, for example when that happens should the speed of the smaller circle go up, or say the same? There are all kinds of ideas when it comes to these little details which results in a number of games modes.

### 1.1 - The FreePlay mode

The idea of freePlay mode is to have a simple fun mode that helps to just let new players get a feel for how to play the game in general. If the player misses a target, or clicks to soon, such actions will negatively impact score of the game, however that is it. It is intended to be a kind of tutorial mode, but is still very much a game mode by itself, it is just that the player keeps playing until they get board. In other ways there is no way to really loose in this mode, it is just about trying your best to get a high score.

### 1.2 - Sudden Death mode

As the name implies they player keeps playing until they click to soon, or miss a target, any such action will result in a game Over State. The game will get harder with each target hit also until the state of the game progress to a point where it is just not possible to continue.

### 1.3 - Endurance Mode

Endurance Mode is like sudden death mode in the sense that things will get harder with each target hit, and there are penalties for missing or clicking to soon. However the penalties are damage to a health bar rather than an automatic game over.

### 1.4 - Classic mode

Classic mode is my take on cloning the original game that this is based off of. There are a fixed number of levels, each level will set a number of targets that the player needs to hit. Once the number of targets remaining reaches zero the player has own that level.


