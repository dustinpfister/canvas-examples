var draw = {};

draw.background = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.buttonLayout = function (ctx, blObj) {
    var i = blObj.buttons.length,
    b;
    while (i--) {
        b = blObj.buttons[i];
        ctx.fillStyle = 'red';
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText(b.label || '', b.x + b.w / 2, b.y + b.h / 2);
    }
};
