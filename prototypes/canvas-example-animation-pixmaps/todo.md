# canvas-example-animation-pixmap todo

## 0.0.0 - basic idea started
* start with a copy of the source code for canvas-animation-basics 0.7.0
* start a pixmaps folder
* start a pixmaps.js file that will use forframe.js to create pixmap animations
* I will want a pixmapMod.load method that wuill be called for each js file in the pixmaps folder
* I will need a pixmapMod.create method that will create and return a pixmaps object using all loaded plugins in the pixmaps folder

```
pixmapMod.load({
    name: 'box-basics',  // animation set name
    palettes: [
        [false, 'black']
    ],
    ani:{ // the collection of animations
        box1: {  // the first animation called 'box1'
            paletteIndex: 0,
            w: 4,
            h: 4,
            data: [
                1,1,1,1, // frame 0
                1,0,0,1,
                1,0,0,1,
                1,1,1,1,
 
                0,0,0,0, // frame 1
                0,1,1,0,
                0,1,1,0,
                0,0,0,0,
            ]
        }
    }
});
```
