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
    len = ani.bxArr.length,
    box;
    while (i < len) {
        box = ani.bxArr[i];
        ctx.save();
        ctx.translate(box.x + box.w / 2, box.y + box.h / 2);
        ctx.rotate(box.radian);
        draw.bx(ctx, {
            x: box.w / 2 * -1,
            y: box.h / 2 * -1,
            w: box.w,
            h: box.h
        });
        ctx.restore();
        i += 1;
    }
};
draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
draw.ver = function(ctx,canvas, ani){
   ctx.fillStyle = 'white';
   ctx.textBaseline = 'top';
   ctx.font = '10px courier';
   ctx.fillText('v' + ani.ver, 10, canvas.height - 15);
};
