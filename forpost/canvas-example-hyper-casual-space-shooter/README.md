# canvas-example-hyper-casual-space-shooter

I just wanted to make a simple space shooter for this canvas example. After working on a few examples where I end up writing thousands of lines of code, yet still feel as though the example is lacking, I now want to start making examples that fit the moto of "less code more game".

The idea I have for this one is to just fly around and blast stuff, thats it. If I pour more time and energy into this example it should be to just make a more solid core of a game to which I might make additional forks off from.

## 1 - Keeping The Example Simple

The centeral thing about this canvas example is that I want to keep the example simple. That is something that I would say is subjective, after all what is simple for me might not be so simple for others. So maybe it is a good idea to write down a few points that I should keep in mind when working on this.

### 1.1 - No state machine, or just a single game state for the most part it a state machine is introduced

I often create a state machine for each of my canvas examples, thus far as of this writing I have not worked out a centeral standard for a state machine module. I think that this is something that I am going to want to change, and if so maybe then I can add a state machine for this canvas example if I do continue working on it. If not the focus should just be on what would be the main game state. In other words the focus should be on the very core of the game itself, and not all these addtional menus and features that may or may not be added on at a later point.

### 1.2 - No fancy Graphics, animations, or over the top eye candy features

Another problem that I think that I run into is a tendancy to skip ahead to cosmetic features when much of the core of the game is not yet finished. When I stop to think for a moment it is kind of silly to work on a system for animated buttons when something like an experence point system needs much more work, or has not even been introduced yet. The core logic of the game itself is something that I should at least start, if not get solid actually before moving on to eye candy features.

### 1.3 - JavaScript generated Graphics only

The focus of this example should be on the core code of the game itself. Things like the main game state object, rules, systems, and modules. Things like the code that is used to actavate display objects from the block and shot object pools for example. When it comes to drawing something that is a ship, block, or shot to the canvas the graphics should just be basic shapes such as circles and squares.

One thing that I think keeps happening with me is that I think that better graphics and eye candy stuff is a sign that I am actaully finishing a game for once. So maybe part of me things that by skipping ahead and doing those things that helps to speed up the process, and I then complete a project faster. Maybe it would make a difference, maybe these kinds of things are important. After all I do not think that most people are interested in playing games where it is just a white box moving accross a black background.

Still when it comes to graphics with this canvas example at least I think that I am going to want to keep it to simple shapes. Maybe I can work out a basic system for making some somewhat inyertsing shapes at least. However if I want to do anything advanced such as untrducing an external image asset lodader, that should be done in a fork of this.




