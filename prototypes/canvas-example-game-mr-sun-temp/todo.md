# canvas-example-mr-sun-temp

## 0.0.0 - Start temp.js, fusion.js plugin callPriority
* (done) start project with source code of canvas-example-mr-sun 0.1.0

* add support for a callPriority propery of a plugObj in game.js
* callPriority is a number from 0 to MAX SAFE INTEGER where lower numbers result in the plugins methods being called before those of higher numbers
* have callPriority default to Object.keys(plugs).length, if no pligObj.callPriority number is there
* update gameMod usePlugs method to sort keys by callPriority

* start a ./plugin/temp.js plugin
* start a ./plugin/fusion.js plugin that depends on temp.js
