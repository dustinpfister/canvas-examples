var draw = {};

draw.background = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'white';
};

draw.points = function (ctx, points, cx, cy) {
    cx = cx === undefined ? 0 : cx;
    cy = cy === undefined ? 0 : cy;
    ctx.save();
    ctx.translate(cx, cy);
    var i = 2,
    len = points.length;
    ctx.beginPath();
    ctx.moveTo(points[0], points[1]);
    while (i < len) {
        ctx.lineTo(points[i], points[i + 1])
        i += 2;
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
};
