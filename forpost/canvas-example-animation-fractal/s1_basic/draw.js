// DRAW
var draw = {};
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
