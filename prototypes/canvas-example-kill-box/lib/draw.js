var draw = (function () {
    return {
        // draw background
        back: function (ctx, canvas) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
        cursor: function (sm) {
            var ctx = sm.ctx;
            ctx.strokeStyle = 'lime';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(sm.input.pos.x, sm.input.pos.y, 5, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
}
    ());
