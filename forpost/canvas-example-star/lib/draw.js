var draw = {};

draw.background = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.star = function(ctx, obj){
        ctx.fillStyle = 'green';
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.save();
        ctx.globalAlpha = obj.alpha;
        ctx.translate(obj.x, obj.y);
        ctx.rotate(obj.facing);
        draw.points(ctx, obj.points, 0, 0);
        ctx.restore();

        ctx.beginPath();
        ctx.moveTo(obj.x, obj.y);
        ctx.lineTo(
            obj.x + Math.cos(obj.facing) * obj.r1,
            obj.y + Math.sin(obj.facing) * obj.r1
        );
        ctx.stroke();
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
