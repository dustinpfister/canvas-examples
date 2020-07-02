var draw = (function () {

    return {

        // draw background
        background: function (ctx, canvas) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },

        blade: function (ctx, blade) {

            ctx.strokeStyle = 'lime';

            var i = 1,
            pt = blade.points[0];
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            while (i < blade.points.length) {
                pt = blade.points[i];
                ctx.lineTo(pt.x, pt.y);
                i += 1;
            }
            ctx.stroke();

        }

    }

}
    ());
