var draw = {};
draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
draw.box = function (ctx, box, style) {
    ctx.fillStyle = style || 'grey';
    ctx.strokeStyle = '#afafaf';
    ctx.beginPath();
    ctx.rect(box.x, box.y, box.w, box.h);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = 'red';
};
draw.points = function (ctx, points) {
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    var i = 1;
    while (i < points.length) {
        ctx.lineTo(points[i].x, points[i].y);
        i += 1;
    }
    ctx.stroke();
};
draw.logPerPoints = function (ctx, state) {
    draw.box(ctx, state.backBox);
    draw.points(ctx, state.points);
    ctx.strokeStyle = 'lime';
    draw.points(ctx, state.points.map(function (point) {
            return {
                x: point.x,
                y: point.perY
            }
        }));
    draw.currentPoints(ctx, state);
};
draw.currentPoints = function (ctx, state) {
    var cp = state.currentPoint;
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.arc(cp.x, cp.y, 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cp.x, cp.perY, 5, 0, Math.PI * 2);
    ctx.stroke();
};
draw.info = function (ctx, state) {
    var cp = state.currentPoint;
    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.textBaseline = 'top';
    ctx.fillText('v' + state.ver, 10, 10);
    ctx.fillText('a: ' + state.a.toFixed(2) + ', b: ' + state.b.toFixed(2), 10, 20);
    ctx.fillText('current: ' + Math.floor(cp.x) + ',' + Math.floor(cp.y), 10, 30);
};

