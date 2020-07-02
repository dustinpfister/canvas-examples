var draw = (function () {

    var drawBlade = function (ctx, blade, style) {
        var i = 1,
        per,
        len = Math.floor((blade.t / blade.tMax) * blade.points.length),
        pt = blade.points[0];
        ctx.strokeStyle = style || 'lime';
        while (i < len) {
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            pt = blade.points[i];
            per = i / len;
            ctx.lineWidth = Math.floor(blade.width.min + blade.width.max - blade.width.max * per);
            ctx.lineTo(pt.x, pt.y);
            ctx.stroke();
            i += 1;
        }
    };

    return {

        // draw background
        background: function (ctx, canvas) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },

        // draw a blade
        blade: drawBlade,

        grass: function (ctx, grass) {

            grass.blades.forEach(function (blade, i) {
                var style = 'rgba(0,' + blade.g + ',0,' + (0.1 + 0.9 * (i / grass.blades.length)) + ')';
                drawBlade(ctx, blade, style);
            })

        }

    }

}
    ());
