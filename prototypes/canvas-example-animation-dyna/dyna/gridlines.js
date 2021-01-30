dynaMod.load({
    name: 'gridlines',
    // the ff object
    ffOpt: {
        maxFrame: 16,
        width: 256,
        height: 256,
        forFrame: function(ff, opt){

            var lines = [],
            divs = opt.divs || 8,
            sx = opt.sx === undefined ? 0 : opt.sx,
            sy = opt.sy === undefined ? 0 : opt.sy,
            w = opt.w === undefined ? 32 : opt.w,
            h = opt.h === undefined ? 32 : opt.h,
            size = w / divs,
            xOff = (size * ff.per) %  size;
            var i = 0;

            while(i < divs){
                lines.push(
                    {sx: sx + xOff + size * i, 
                     sy: sy, 
                     ex:  sx + xOff + size * i, 
                     ey: sy + h},
                    {sx: sx, 
                     sy: sy + size * i, 
                     ex: sx + w, 
                     ey: sy + size * i}
                );
                i += 1
            }
            lines.push({sx: sx, sy: sy + h, ex: sx + w, ey: sy + h});
            return lines;
        }
    },
    // the draw method
    draw: function(ff, ctx){
        console.log(ff);

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