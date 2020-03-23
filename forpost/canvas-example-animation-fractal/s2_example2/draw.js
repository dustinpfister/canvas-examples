// DRAW
var draw = {};

draw.points = function (ctx, points, opt) {
    opt = opt = {};
    opt.close = opt.close === undefined ? false : opt.close;
    opt.strokeOnly = opt.strokeOnly === undefined ? true : opt.strokeOnly;
    ctx.beginPath();
    ctx.strokeStyle = opt.strokeStyle || 'white';
    ctx.lineWidth = opt.lineWidth || 3;
    if (points.length <= 1) {
        return;
    }
    ctx.moveTo(points[0][0], points[0][1]);
    var i = 1,
    len = points.length;
    while (i < len) {
        ctx.lineTo(points[i][0], points[i + 1][1]);
        i += 1;
    }
    if (opt.close) {
        ctx.closePath();
    }
    ctx.stroke();
    if (!ctx.strokeOnly) {
        ctx.fill();
    }
};

draw.bx = function (ctx, bx) {
    ctx.strokeStyle = 'white';
    ctx.globalAlpha = 0.05 + bx.per * 0.95;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.rect(bx.x, bx.y, bx.w, bx.h);
    ctx.stroke();
};
draw.bxArr = function (ctx, ani) {
    var i = 0,
    len = ani.bxArr.length;
    ctx.save();
    while (i < len) {
        draw.bx(ctx, ani.bxArr[i]);
        i += 1;
    }
    ctx.restore();
};
draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
