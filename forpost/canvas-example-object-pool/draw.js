var draw = {};

draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.pool = function (ctx, state) {
    var i = state.pool.length,
    bx;
    ctx.fillStyle = 'white';
    while (i--) {
        bx = state.pool[i];
        if (bx.active) {
            ctx.save();
            ctx.translate(bx.x, bx.y);
            ctx.rotate(bx.heading);
            ctx.fillRect(bx.w / 2 * -1, bx.h / 2 * -1, bx.w, bx.h);
            ctx.restore();
        }
    }
};
