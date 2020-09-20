var draw = {};

draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.pool = function (ctx, pool) {
	
	
    var i = pool.length,
    bx;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    while (i--) {
        bx = pool[i];
        if (bx.active) {
            ctx.save();
            ctx.fillStyle = bx.fill;
            ctx.globalAlpha = bx.alpha;
            ctx.translate(bx.x, bx.y);
            ctx.rotate(bx.heading);
            ctx.beginPath();
            ctx.rect(bx.w / 2 * -1, bx.h / 2 * -1, bx.w, bx.h);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }
    }
};

draw.ver = function (ctx, state) {
    ctx.font = '10px couriter';
    ctx.fillStyle = 'white';
    ctx.fillText('v' + state.ver, 5, 15);
};
