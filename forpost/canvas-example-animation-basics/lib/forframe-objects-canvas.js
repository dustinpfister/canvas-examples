
var canvasObjects = (function(){

    var objects = {}
    objects.box = {
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
        }),
        draw: function(ff, ctx, canvas){
            var box = ff.model;
            ctx.fillStyle='white';
            ctx.fillRect(box.x, box.y, box.w, box.h);
        }
    };
   


    return function(){
        return forFrame.createCanvas(objects.box.ff,objects.box.draw, '#004f00');
    };

}());