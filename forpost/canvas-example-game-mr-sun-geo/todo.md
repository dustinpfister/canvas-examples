# canvas-example-mr-sun-geo

## 0.x.0 - grid_view.js plug-in and state
* start an view_grid.js plug-in that will be used as a way to display the state of the sections by way of a grid
* the view_grid.js plug-in just adds a way to create the state of the grid
* create draw.js methods thatwill make use of view_grid.js

## 0.4.0 - Set Temp Range 0-1000, Sun Level, and Ice
* have a set temp Range of 0-1000 for any section temp value, 0 is the absolute min, and 1000 the absolute max
* do away with system that is worked out for 'TempLevel', but start a similar system for 'SunLevel' in sun.js
* a level 1 Sun will have a temp of about 10, where a level 100 sun will have a temp of 1000
* in hydro.js if a section.temp is between 0 and 50 then all water will be ice
* water will not transfer from or to another section when it is to cold (0 to 50).
* make a pkg-0-4-0.html

## 0.3.0 - atmo.js started, and basic water cycle
* (done) start a atmo.js plug-in that will create an game.atmoData object
* (done) create section.atmo objects for each section
* (done) a section.atmo.water.amount will store water for the atmosphere section
* (done) in hydro.js have a section.water.evaporation property that will be affected by section.temp
* (done) in atmo.js water in a section will evaporate by section.water.evaporation rate and add to game.atmoData.water.amount
* (done) water can transfer from one section to another in the atmosphere
* (done) water can rain back down to a section
* (done) set water.per values for section.water, and section.atmo
* (done) in draw.js have white circles above each section as a way to know how much water there is in atmo
* (done) in draw.js have a the white circle be a gray circle mean rain for now
* create a pkg-0-3-0.html

## 0.2.0 - hydro.js started, and water transfer
* (done) start a hydro.js plug-in
* (done) create a game.hydoData object
* (done) have a game.hydoData.water object that will hold values like water.total
* (done) create a water object for each section that will include section.water.amount, section.water.per
* (done) have a hard coded starting value for water.total (for now)
* (done) in the create method evenly divide the total amount of water over all sections for section.water.amount
* (done) in the onDeltaYear method transfer water from higher elevations to lower onces
* (done) display water.amount, and water.per for each section
* (done) create a pkg-0-2-0.html

## 0.1.0 - Magmatism
* (done) the temp of a section can be used along with section.totalMass to find a section.magmatism value
* (done) have a geoData.maxElevation property
* (done) section.magmatism can be used with section.massPer and geoData.maxElevation to set section.elevation (for now)
* (done) in draw.js display elevation by way of just drawing a line between the section, and another line for maxElevation.
* (done) have magmatism be a value that will step elevation rather than set it
* (done) have an section.erosion propery
* (done) have a geoData.seaLevel property
* (done) draw sections blue if they are below sea level, and brown if they are above for now
* (done) draw white rings around sections and set thinkness by section.per
* (done) elevation lines should be accross
* (done) section.massPer alone should be part of elevation
* (done) elevation growth rate should stay stable if the sun is more or less in the center
* (done) create a pkg-0-1-0.html

## 0.0.0 - start a geo.js plug-in
* (done) start a geo.js plug-in that will be used to define the current Geology of all world sections
* (done) set a game.geoData object for the plug-in
* (done) geo.js will create, and update a game.geoData.totalMass property
* (done) have a section.totalMass
* (done) a section.massPer value can be set by comparing a totalMass for a section to that of game.geoData.totalMass
* (done) display new section.totalMass, and section.massPer values for each section
* (done) create a pkg-0-0-0.html
