var draw = (function () {

    var gradient;

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

            var i = state.pool.length;
            ctx.strokeStyle = 'white';
            while (i--) {
                var part = state.pool[i];
                if (part.bits != '00') {
                    var color = part.bits === '01' ? 'blue' : 'red';
                    color = part.bits === '11' ? '#bf00bf' : color;
                    ctx.globalAlpha = 0.8;
                    if (part.bits === '11') {
                        ctx.globalAlpha = 1 - part.per;
                    }
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
