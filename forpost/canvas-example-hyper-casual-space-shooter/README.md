# canvas-example-hyper-casual-space-shooter

After working on a few examples where I end up writing thousands of lines of code, yet still feel as though the example is lacking, I now want to start making examples that fit the moto of "less code more game". So for this hyper casual space shooter I just wanted to make a simple game where I just fly around and blow up blocks. 

## Where to go to play this

I have wrote a [blog post on hyper casual space shooter](https://dustinpfister.github.io/2020/12/11/canvas-example-hyper-casual-space-shooter/), as I do with all the examples in the forpost folder of this canvas examples repo. That page is also my prefered location for people to play the game, so if you feel compeled to share this please link to that page rather than here. However if you really want to play this locally, that of course can be done by just cloning down this repo.

## Things I should keep in mind while working on this one

The idea I have for this one is to just fly around and blast stuff, thats it. If I pour more time and energy into this example it should be to just make a more solid core of a game to which I might make additional forks off from. This example might in time end up being yet another canvas example compose of thousands of lines of code still, however I think that I should lay done some ground rules for myself this time to help keep myself from repeating old patterns.

### 1 - Play my own game

One thing that I think that is hurting me is that I am seeing a lot of these canvas examples as chores that I just need to get out of the way so I can move on to the next thing. So to help put an end to this I should take at least a little time now and then to play the game myself. That is to actually play it manually rather than work out some code to automate the process of playing. The point of this is that if I do not find my own game fun, and I do not want to play it, why would anyone else want to?

If I find that the game is boring, then I should take a moment to think about what I can add to the gamne to make it not so boring. It I think that I level up to fast, teak some values to make the process of doing so take a little longer. If I think that it takes way to long to level up teak some values back the other way.

### 2 - Do not just start adding every little feature that comes to mind

This is a problem that seems to keep creeping up in other projects. For example in Mr Sun, and also cross hairs I have added an animated buttons feature. This kind of feature might make the project a little more flashy and interesting maybe, but does it really add value to a game itself? I would say no.

Every time I draft out more work in a todo list I should take a moment to think if this is something that I really want to add to the game or not.

### 3 - Keep The Example Simple

The centeral thing about this canvas example is that I want to keep the example simple. That is something that I would say is subjective, after all what is simple for me might not be so simple for others. So maybe it is a good idea to write down a few points that I should keep in mind when working on this.

#### 3.1 - No state machine, or just a single game state for the most part it a state machine is introduced

I often create a state machine for each of my canvas examples, thus far as of this writing I have not worked out a centeral standard for a state machine module. I think that this is something that I am going to want to change, and if so maybe then I can add a state machine for this canvas example if I do continue working on it. If not the focus should just be on what would be the main game state. In other words the focus should be on the very core of the game itself, and not all these addtional menus and features that may or may not be added on at a later point.

### 3.2 - No fancy Graphics, animations, or over the top eye candy features

Another problem that I think that I run into is a tendancy to skip ahead to cosmetic features when much of the core of the game is not yet finished. When I stop to think for a moment it is kind of silly to work on a system for animated buttons when something like an experence point system needs much more work, or has not even been introduced yet. The core logic of the game itself is something that I should at least start, if not get solid actually before moving on to eye candy features.

#### 3.3 - JavaScript generated Graphics only

The focus of this example should be on the core code of the game itself. Things like the main game state object, rules, systems, and modules. Things like the code that is used to actavate display objects from the block and shot object pools for example. When it comes to drawing something that is a ship, block, or shot to the canvas the graphics should just be basic shapes such as circles and squares.

One thing that I think keeps happening with me is that I think that better graphics and eye candy stuff is a sign that I am actaully finishing a game for once. So maybe part of me things that by skipping ahead and doing those things that helps to speed up the process, and I then complete a project faster. Maybe it would make a difference, maybe these kinds of things are important. After all I do not think that most people are interested in playing games where it is just a white box moving accross a black background.

Still when it comes to graphics with this canvas example at least I think that I am going to want to keep it to simple shapes. Maybe I can work out a basic system for making some somewhat inyertsing shapes at least. However if I want to do anything advanced such as untrducing an external image asset lodader, that should be done in a fork of this.

