// DRAW
var draw = {};
draw.bx = function (ctx, bx) {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.rect(bx.x, bx.y, bx.w, bx.h);
    ctx.fill();
    ctx.stroke();
};
draw.info = function (ctx, ani) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.font = '10px courier';
    ctx.fillText(ani.frame + '/' + ani.maxFrame, 10, 10);
    ctx.fillText('v' + ani.ver, 10, 20);

};
draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
