var draw = (function () {
    return {
        // draw background
        back: function (ctx, canvas) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
        // draw pointer cursor
        cursor: function (sm) {
            var ctx = sm.ctx;
            ctx.strokeStyle = 'lime';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(sm.input.pos.x, sm.input.pos.y, 5, 0, Math.PI * 2);
            ctx.stroke();
        },
        //draw version number
        ver: function (sm) {
            var ctx = sm.ctx;
            ctx.fillStyle = 'lime';
            ctx.textBaseline = 'top';
            ctx.font = '10px arial';
            ctx.fillText('v' + sm.ver, 2, sm.canvas.height - 12);
        }
    }
}
    ());
