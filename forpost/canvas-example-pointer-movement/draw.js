var draw = {};

draw.background = function (pm, ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
draw.PTGridlines = function (pt, ctx, canvas) {
    var cellX = -1,
    cellY = -1,
    x,
    y;
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    while (cellX < 11) {
        x = cellX * 32 - pt.x % 32;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
        cellX += 1;
    }
    while (cellY < 8) {
        y = cellY * 32 - pt.y % 32;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
        cellY += 1;
    }
};

// draw a navigation circle when moving the map
draw.navCircle = function (pm, ctx, canvas) {
    if (pm.down) {
        var cx = pm.sp.x,
        cy = pm.sp.y,
        x,
        y,
        min = 64,
        per = 0,
        a = pm.angle;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        // draw circle
        ctx.beginPath();
        ctx.arc(cx, cy, min / 2, 0, Math.PI * 2);
        ctx.stroke();
        // draw direction line
        x = Math.cos(a) * min + cx;
        y = Math.sin(a) * min + cy;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.stroke();
        // draw delta circle
        per = pm.delta / 3;
        x = Math.cos(a) * min * per + cx;
        y = Math.sin(a) * min * per + cy;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.stroke();
    }
};

draw.debugInfo = function (pm, pt, ctx, canvas) {
    ctx.fillStyle = 'white';
    ctx.fillText(pt.x + ', ' + pt.y, 10, 10);
}
