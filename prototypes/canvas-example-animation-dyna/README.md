# canvas-example-animation-dyna

The goal with this canvas example is to work out some things that have to do with the differences between making an animation [deterministic](https://en.wikipedia.org/wiki/Deterministic_system), or [Stochastic](https://en.wikipedia.org/wiki/Stochastic).

The best way to go about doing so as I can see it at the time of this writing is to have an object standard where one of the propertes is a pure function. There is then additional functions that have to do with using the pure function in a deterministic frame by frame kind of way, and then additional functions that involve calling the same pure function but in a random way, or in a way that involves user interaction.