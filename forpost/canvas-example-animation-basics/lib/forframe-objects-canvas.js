
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
        },
        backFill: '#004f00'
    };

    objects.boxGroup = {
        ff: forFrame.create({
            type: 'points',
            maxFrame: 30,
            width: 64,
            height: 64,
            forFrame: function(ff, model, frame, maxFrame, per){
                var size = 12,
                halfSize = size / 2,
                radius = 16,
                radian = 0,
                boxGroup=[],
                len = 4,
                i = 0;
                while(i < len){
                    radian = Math.PI * 2 / len * i;
                    boxGroup.push({
                        x: ff.width / 2 + Math.cos(radian) * radius - halfSize,
                        y: ff.height / 2 + Math.sin(radian) * radius - halfSize,
                        w: size,
                        h: size
                    });
                    i = i + 1;
                }
                return boxGroup;
            }
        }),
        draw: function(ff, ctx, canvas){
            var box = ff.model;
            ctx.fillStyle='white';
            ff.model.forEach(function(box){
                ctx.fillRect(box.x, box.y, box.w, box.h);
            });
        },
        backFill: 'blue'
    };

    return function(key){
        key = key || 'box'
        var obj = objects[key];
        return forFrame.createCanvas(obj.ff, obj.draw, obj.backFill);
    };

}());