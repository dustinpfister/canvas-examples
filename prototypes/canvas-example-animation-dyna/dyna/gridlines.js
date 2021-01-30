dynaMod.load({
    name: 'gridlines',
    // the ff object
    ffOpt: {
        maxFrame: 32,
        width: 256,
        height: 256,
        forFrame: function(ff, opt){

            var lines = [],
            divs = opt.divs || 8,
            sx = opt.sx === undefined ? 0 : opt.sx,
            sy = opt.sy === undefined ? 0 : opt.sy,
            w = opt.w === undefined ? 32 : opt.w,
            h = opt.h === undefined ? 32 : opt.h,
            xSize = 32, //w / divs,
            ySize = 32, //h / divs,
            i = 0;
            
            return {
              offX: Math.cos(Math.PI * 0.75) * (32 * ff.per),
              offY: Math.sin(Math.PI * 0.75) * (32 * ff.per)
            };
        }
    },
    // the draw method
    draw: function(ff, ctx){
        var box = ff.model;
        ctx.strokeStyle='rgba(255,255,255,0.2)';
        ctx.lineWidth = 3;
        var y = 0;
        while(y < 20){
            var x = 0;
            while(x < 20){
                ctx.strokeRect(32 * x + box.offX, 32 * y + box.offY, 32, 32);
                x += 1;
            }
            y += 1;
        }

    }
});
/*
dynaMod.load({
    name: 'gridlines',
    // the ff object
    ffOpt: {
        maxFrame: 32,
        width: 256,
        height: 256,
        forFrame: function(ff, opt){

            var lines = [],
            divs = opt.divs || 8,
            sx = opt.sx === undefined ? 0 : opt.sx,
            sy = opt.sy === undefined ? 0 : opt.sy,
            w = opt.w === undefined ? 32 : opt.w,
            h = opt.h === undefined ? 32 : opt.h,
            xSize = 32, //w / divs,
            ySize = 32, //h / divs,
            i = 0;

            sx = sx + Math.cos(opt.heading || 0) * xSize * ff.per;
            sy = sy + Math.sin(opt.heading || 0) * ySize * ff.per;

            while(i < divs){
                lines.push(
                    {sx: sx + xSize * i, 
                     sy: sy, 
                     ex:  sx + xSize * i, 
                     ey: sy + h});
                lines.push({sx: sx, 
                     sy: sy + ySize * i, 
                     ex: sx + w, 
                     ey: sy + ySize * i});
                i += 1
            }
            return lines;
        }
    },
    // the draw method
    draw: function(ff, ctx){
        var box = ff.model;
        ctx.strokeStyle='rgba(255,255,255,0.2)';
        ctx.lineWidth = 3;
        ff.model.forEach(function(line){
            ctx.beginPath();
            ctx.moveTo(line.sx, line.sy)
            ctx.lineTo(line.ex, line.ey);
            ctx.stroke();
        });

    }
});
*/