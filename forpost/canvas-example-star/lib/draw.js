var draw = (function(){

    var api = {};

    var strokeDirHelper = function(ctx, obj, dir, radiusBegin, radiusEnd){
        radiusBegin = radiusBegin === undefined ? obj.r2 : radiusBegin;
        radiusEnd = radiusEnd === undefined ? obj.r1 : radiusEnd;
        ctx.beginPath();
        ctx.moveTo(
            obj.x + Math.cos(dir) * radiusBegin, 
            obj.y + Math.sin(dir) * radiusBegin);
        ctx.lineTo(
            obj.x + Math.cos(dir) * radiusEnd,
            obj.y + Math.sin(dir) * radiusEnd);
        ctx.stroke();
    };

    api.background = function (ctx, canvas) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    api.star = function(ctx, obj){
        ctx.fillStyle = 'green';
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 6;
        ctx.save();
        ctx.globalAlpha = obj.alpha;
        ctx.translate(obj.x, obj.y);
        ctx.rotate(obj.facing);
        api.points(ctx, obj.points, 0, 0);
        ctx.restore();

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        strokeDirHelper(ctx, obj, obj.heading, obj.r1 * 0.5, obj.r1);
        strokeDirHelper(ctx, obj, obj.facing, 0, obj.r1 * 0.5);

    };

    api.points = function (ctx, points, cx, cy) {
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

    return api;

}());
