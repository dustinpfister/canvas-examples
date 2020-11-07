# canvas-example-mr-sun-geo

## 0.3.0 - atmosphere.js, and volcanic action in geo.js
* start a atmosphere.js plug-in

## 0.2.0 - hydrosphere.js and starting Erosion in geo.js
* start a hydrosphere.js plug-in

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
* create a pkg-0-1-0.html

## 0.0.0 - start a geo.js plug-in
* (done) start a geo.js plug-in that will be used to define the current Geology of all world sections
* (done) set a game.geoData object for the plug-in
* (done) geo.js will create, and update a game.geoData.totalMass property
* (done) have a section.totalMass
* (done) a section.massPer value can be set by comparing a totalMass for a section to that of game.geoData.totalMass
* (done) display new section.totalMass, and section.massPer values for each section
* (done) create a pkg-0-0-0.html
