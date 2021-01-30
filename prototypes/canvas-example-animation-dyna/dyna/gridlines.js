dynaMod.load({
    name: 'gridlines',
    // the ff object
    ff: forFrame.create({
        maxFrame: 16,
        width: 256,
        height: 256,
        forFrame: function(ff, options){
            var lines = [],
            divs = options.divs || 8,
            size = ff.width / divs,
            xOff = (size * ff.per) %  size;
            var i = 0;
            while(i < divs){
                lines.push(
                    {sx: xOff + size * i, sy: 0, ex:  xOff + size * i, ey: ff.height},
                    {sx: 0, sy: size * i, ex: ff.width, ey: size * i}
                );
                i += 1
            }
            lines.push({sx: 0, sy: ff.height, ex: ff.width, ey: ff.height});
            return lines;
        }
    }),
    // the draw method
    draw: function(ff, ctx, canvas){
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