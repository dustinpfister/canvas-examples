
var canvasObjects = (function(){

    var objects = {};

    // very basic box example
    objects.box = {
        ff: forFrame.create({
            type: 'points',
            maxFrame: 30,
            width: 64,
            height: 64,
            forFrame: function(ff, model, frame, maxFrame, per){
                var size = 8,
                halfSize = size / 2;
                return {
                    x: (ff.width - size) * ff.per,
                    y: ff.height / 2 - halfSize,
                    w: size,
                    h: size
                };
            }
        }),
        draw: function(ff, ctx, canvas){
            var box = ff.model;
            ctx.fillStyle='white';
            ctx.fillRect(box.x, box.y, box.w, box.h);
        }
    };

    return function(key){
        key = key || 'box'
        return forFrame.createCanvas(objects[key].ff,objects[key].draw, '#004f00');
    };

}());