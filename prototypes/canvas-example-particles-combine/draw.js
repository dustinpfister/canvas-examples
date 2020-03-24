var draw = (function () {

    var gradient;

    var pointsToColor = function (points) {

        if (points[0] >= 1) {
            return 'blue';
        }

        return 'red';

    };

    return {

        setGradient: function (state) {
            var canvas = state.canvas;
            gradient = state.ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#9f0000');
            gradient.addColorStop(1, '#00009f');
        },

        // draw background
        background: function (state) {
            var ctx = state.ctx,
            canvas = state.canvas;
            ctx.fillStyle = gradient || 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },

        pool: function (state) {

            var i = state.pool.length,
            part,
            color;
            ctx.strokeStyle = 'white';
            while (i--) {
                part = state.pool[i];
                color = pointsToColor(part.points);;
                if (part.points.join('') != '0000') {
                    ctx.globalAlpha = 0.8;
                    ctx.beginPath();
                    ctx.fillStyle = color;
                    ctx.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                }
            }
            ctx.globalAlpha = 1;

        },

        // draw debug info
        debug: function (state) {}
    }

}
    ());
