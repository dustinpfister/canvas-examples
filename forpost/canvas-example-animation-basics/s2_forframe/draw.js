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
draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};