# canvas-example-animation-basics

This is the source code that I worked out for my post on the [basics of canvas animation](https://dustinpfister.github.io/2019/10/10/canvas-example-animation-basics/).

## forFrame.create(opt)

Create and return an ff object with the given options.

```js
    var box = forFrame.create({
       type: 'points',
       maxFrame: 30,
       width: 64,
       height: 64,
       forFrame: function(ff, model, frame, maxFrame, per){
           return {
              x: (ff.width - 8) * ff.per,
              y: ff.height / 2 - 4,
              w: 8,
              h: 8
           };
       }
    });
```

## forFrame.createCanvas(ff, ffDraw, fill)

The create canvas public method will create and return an object that will contain a canvas element that is a sprite sheet created with the ff.forFrame method of the given ff object.

```js
    var box = forFrame.create({
       type: 'points',
       maxFrame: 30,
       width: 64,
       height: 64,
       forFrame: function(ff, model, frame, maxFrame, per){
           return {
              x: (ff.width - 8) * ff.per,
              y: ff.height / 2 - 4,
              w: 8,
              h: 8
           };
       }
    });
    var ffDraw = function(ff, ctx, canvas){
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'top';
        //ctx.fillText(ff.frame, 5, 5);
        var box = ff.model;
        ctx.fillRect(box.x, box.y, box.w, box.h);
    };

    var can = forFrame.createCanvas(box, ffDraw, '#004f00')
```

