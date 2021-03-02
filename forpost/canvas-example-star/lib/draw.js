var draw = (function(){

    var api = {};

    var strokeDirHelper = function(ctx, obj, dir){
        ctx.beginPath();
        ctx.moveTo(obj.x, obj.y);
        ctx.lineTo(
            obj.x + Math.cos(dir) * obj.r1,
            obj.y + Math.sin(dir) * obj.r1
        );
        ctx.stroke();
    };

    api.background = function (ctx, canvas) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    api.star = function(ctx, obj){
        ctx.fillStyle = 'green';
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.save();
        ctx.globalAlpha = obj.alpha;
        ctx.translate(obj.x, obj.y);
        ctx.rotate(obj.facing);
        api.points(ctx, obj.points, 0, 0);
        ctx.restore();

        ctx.strokeStyle = 'red';
        strokeDirHelper(ctx, obj, obj.heading);

        ctx.strokeStyle = 'blue';
        strokeDirHelper(ctx, obj, obj.facing);

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
