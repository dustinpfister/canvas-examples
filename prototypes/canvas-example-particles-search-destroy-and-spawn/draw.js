var draw = (function () {

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
                ctx.fillStyle = 'blue';
                ctx.beginPath();
                ctx.arc(part.x, part.y, 5, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                i += 1;
            }

        }

    }

}
    ());
