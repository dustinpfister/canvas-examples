# canvas-example-mr-sun-geo

This is a canvas example of a game where the player can control the position of a Sun relative to sections of a world that is positioned around the Sun. In this canvas example I am starting with the source code for canvas-example-mr-sun-temp v0.5.0 to create a more complex example that adds a few new features, and plugins. Changes made here, may end up being added to the core example or this might just end up being its own thing.

In this fork of the canvas-example-mr-sun source code I aim to add additional plug-ins that will add features for Geology, the Hydrosphere, and Atmosphere of the game world. This is the next step forward to the full idea that I have in mind with this game, that I have decided to break into several sepearte projects.

## 1 - The geo.js plug-in

The first and formost plug-in to write about here is the geo.js plug-in. This plug-in is used to set what the elevation is for each section.

## 2 - The hydro.js plug-in

The next plug-in that was added in this was hydro.js that is used to set up water for the game world.

## 3 - atmo.js

The atmo.js plug-in was also added here that has to do with the atmosphere. This plug-in works on top of hydro.js to set up a water cycle for one thing.