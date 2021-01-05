# canvas-example-hyper-casual-space-shooter

The general idea of this hyper casual style space shooter game is to just fly around and blow up blocks, and that is it. Of course I aim to add a great deal more to it on top of that, but I do not want to repeat some things that I have done in previous examples. The goal here should be to not just focus on continuing to work on a project, that is one thing that I want to do with some of my canvas examples that I think are worthy of more investment of time sure, but that alone is not enough. As I continue working on this example the focus should be on what I can add to this game idea that will make the game more fun, this canvas example is a game after all.

## 1 - Where to go to play this

I have wrote a [blog post on hyper casual space shooter](https://dustinpfister.github.io/2020/12/11/canvas-example-hyper-casual-space-shooter/), as I do with all the examples in the forpost folder of this canvas examples repo. That page is also my prefered location for people to play the game, so if you feel compeled to share this please link to that page rather than here. However if you really want to play this locally, that of course can be done by just cloning down this repo. The game should work okay by way of the file protocol when it comes to playing it locally, the main index.html file should be the current state of the game, and on top of that there is the pkg folder when it comes to playing older builds.

## 2 - Controls

The goal with controls as with all my canvas examples is to make a game that will work well in bolth a desktop and mobile enviorment. However this style of game is best played with a keyboard and mouse.

### 2.1 - Keyboad controls

* 'w' key - Speed up
* 's' key - Slow down
* 'a' key - heading +
* 'd' key - heading -

* '1' key - set weapon to 'pulse gun' when in base mode
* '2' key - set weapon to 'cannon' when in base mode
* '3' key - set weapon to 'atom' when in base mode

* 'l' key - fire when auto fire is off
* 'v' key - toggle debug info
* 'b' key - toggle auto fire on and off

### 2.2 - Mouse/Touch controls

There is a circle on the lower right corner that can be used to set heading and a bar on the left side that can eb used to set a target speed.

## 3 - Things I should keep in mind while working on this canvas example

I have worked on a fare number of [canvas examples](https://dustinpfister.github.io/2020/03/23/canvas-example/) where I end up writing thousands of lines of code, yet still feel as though the canvas example is lacking something. So now I want to start making examples that fit the moto of "less code more game" in an effort to break this cycle. 

The idea I have for this one is to just fly around and blast stuff, thats it. If I put more time and energy into this example it should be to just make a more solid core of a game to which I might make additional forks off from. This example might in time end up being yet another canvas example compose of thousands of lines of code still, however I think that I should lay done some ground rules for myself this time to help keep myself from repeating old patterns.

### 3.1 - Play my own game ( step outside of a developer mideset and enter the mindset of a gamer )

One thing that I think that is hurting me is that I am seeing a lot of these canvas examples as chores that I just need to get out of the way so I can move on to the next thing. So to help put an end to this I should take at least a little time now and then to play the game myself. That is to actually play it manually rather than work out some code to automate the process of playing. Simply put, if I do not find my own game fun, and I do not want to play it, why would anyone else want to?

If I find that the game is boring, then I should take a moment to think about what I can add to the gamne to make it not so boring. It I think that I level up to fast, teak some values to make the process of doing so take a little longer. If I think that it takes way to long to level up teak some values back the other way. Also should I even have an experence point system to begin with? If I do have an experence point system what else should be going on with the game beyond just that when it comes to weapons, the properties of the blocks, effects on blocks, and resources?

### 3.2 - Do not just start adding every little feature that comes to mind

This is a problem that seems to keep creeping up in other projects. For example in Mr Sun, and also cross hairs I have added an animated buttons feature. This kind of feature might make the project a little more flashy and interesting maybe, but does it really add value to a game itself? This is another kind of cycle that I find myself repeating on top of the "stoping work on a project after a while cycle", there is also the "wasting time adding features that do not add to the value of a game". That is subjective of course, maybe animated buttons do add to the value of a game, but only after the core logic of the game itself has been worked out first.

Every time I draft out more work in a todo list I should take a moment to think if this is something that I really want to add to the game or not. It should be something that adds real value to the experence of playing the game.

### 3.3 - No state machine, or just a single game state for the most part it a state machine is introduced

I often create a state machine for each of my canvas examples, thus far as of this writing I have not worked out a centeral standard for a state machine module. I think that this is something that I am going to want to change, and if so maybe then I can add a state machine for this canvas example. If not the focus should just be on what would be the main game state, and not so much additional menus. 

In other words the focus should be on the very core of the game itself, and not all these addtional menus and features that may or may not be added on at a later point.

### 3.4 - No fancy Graphics, animations, or over the top eye candy features

Another problem that I think that I run into is a tendancy to skip ahead to cosmetic features when much of the core of the game is not yet finished. When I stop to think for a moment it is kind of silly to work on a system for animated buttons when something like an experence point system needs much more work, or has not even been introduced yet. The core logic of the game itself is something that I should at least start, if not get solid actually before moving on to eye candy features.

### 3.5 - JavaScript generated Graphics only

The focus of this example should be on the core code of the game itself. Things like the main game state object, rules, systems, and modules. Things like the code that is used to actavate display objects from the block and shot object pools for example. When it comes to drawing something that is a ship, block, or shot to the canvas the graphics should just be basic shapes such as circles and squares.

One thing that I think keeps happening with me is that I think that better graphics and eye candy stuff is a sign that I am actaully finishing a game for once. So maybe part of me things that by skipping ahead and doing those things that helps to speed up the process, and I then complete a project faster. Maybe it would make a difference, maybe these kinds of things are important. After all I do not think that most people are interested in playing games where it is just a white box moving accross a black background.

Still when it comes to graphics with this canvas example at least I think that I am going to want to keep it to simple shapes. Maybe I can work out a basic system for making some somewhat inyertsing shapes at least. However if I want to do anything advanced such as untrducing an external image asset lodader, that should be done in a fork of this.

