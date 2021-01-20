
var canvasObjects = (function(){

    var objects = {};

    // very basic box example
    objects.box = {
        ff: forFrame.create({
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

    // box group
    objects.boxGroup = {
        ff: forFrame.create({
            maxFrame: 6,
            width: 64,
            height: 64,
            forFrame: function(ff, model, frame, maxFrame, per){
                var size = ff.width * 0.1,
                halfSize = size / 2,
                radius = ff.width * 0.3,
                radian = 0,
                boxGroup=[],
                len = 8,
                i = 0;
                while(i < len){
                    radian = Math.PI * 2 / len * i + Math.PI * 0.5 * ff.per;
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
        backFill: false
    };

    objects.tri = {
        ff: forFrame.create({
            type: 'points',
            maxFrame: 45,
            width: 32,
            height: 32,
            forFrame: function(ff, model, frame, maxFrame, per){
                var points = model.points = [];
                var i = 0,
                radius = 15,
                radian = 0;
                while(i < 3){
                    radian = Math.PI * 2 / 3 * i + Math.PI * 2 * ff.per;
                    points.push({
                        x: ff.width / 2 + Math.cos(radian) * radius,
                        y: ff.height / 2 + Math.sin(radian) * radius
                    });
                    i += 1;
                }
                return model;
            }
        }),
        backFill: false
    };

    return function(key){
        key = key || 'box'
        var obj = objects[key];
        console.log(obj);
        var can = forFrame.createCanvas(obj.ff, obj.draw, obj.backFill);
        console.log(can);
        return can;
    };

}());