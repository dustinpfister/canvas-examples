# canvas-example-animation-pixmaps

The idea here is to come up with a standard for animations in the form of a collection of arrays that contain pixle color index data

## 1 - pixmap plugins

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
