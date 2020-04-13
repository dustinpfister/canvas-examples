var draw = (function () {

    var drawPartBase = function (part) {
        ctx.fillStyle = part.type === 'hunter' ? 'red' : 'blue';
        ctx.beginPath();
        ctx.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    };

    var drawPartHeading = function (part) {
        var x = Math.cos(part.heading) * part.radius * 2 + part.x,
        y = Math.sin(part.heading) * part.radius * 2 + part.y;
        ctx.beginPath();
        ctx.moveTo(part.x, part.y);
        ctx.lineTo(x, y);
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
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'white';
            while (i < len) {
                part = pool[i];
                drawPartBase(part);
                drawPartHeading(part);
                i += 1;
            }
        }

    }

}
    ());
