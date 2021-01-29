pixmapMod.load({
    name: 'box_basics',  // animation set name
    palettes: [
        [false, 'black']
    ],
    ani:{ // the collection of animations
        box1: {  // the first animation called 'box1'
            paletteIndex: 0,
            w: 8,
            h: 8,
            data: [
                1,1,1,1,1,1,1,1, // frame 0
                1,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,1,
                1,1,1,1,1,1,1,1,
 
                0,0,0,0,0,0,0,0, // frame 1
                0,0,0,0,0,0,0,0,
                0,0,1,1,1,1,0,0,
                0,0,1,0,0,1,0,0,
                0,0,1,0,0,1,0,0,
                0,0,1,1,1,1,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
            ]
        }
    }
});