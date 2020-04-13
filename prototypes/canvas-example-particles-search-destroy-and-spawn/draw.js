var draw = (function () {

    var drawPartBase = function (part) {
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    };

    return {

        // draw background
        back: function (state) {
            var ctx = state.ctx,
            canvas = state.canvas;
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },

        pool: function (state) {
            var ctx = state.ctx,
            canvas = state.canvas,
            pool = state.pool,
            len = pool.length,
            part,
            i = 0;
            while (i < len) {
                part = pool[i];
                drawPartBase(part);
                i += 1;
            }

        }

    }

}
    ());
