
var canvasObjects = (function(){


    var ffDraw = function(ff, ctx, canvas){
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'top';
        //ctx.fillText(ff.frame, 5, 5);
        var box = ff.model;
        ctx.fillRect(box.x, box.y, box.w, box.h);
    };

    var objects = {
        box: {
            ff: forFrame.create({
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
            })
        }
    };


    return function(){
        return forFrame.createCanvas(objects.box.ff, ffDraw, '#004f00');
    };

}());