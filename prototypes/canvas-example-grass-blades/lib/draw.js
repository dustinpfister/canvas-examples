var draw = (function () {

    return {

        // draw background
        background: function (ctx, canvas) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },

        // draw a blade
        blade: function (ctx, blade) {
            ctx.strokeStyle = 'lime';
            var i = 1,
            per,
            len = Math.floor((blade.t / blade.tMax) * blade.points.length),
            pt = blade.points[0];
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

        }

    }

}
    ());
