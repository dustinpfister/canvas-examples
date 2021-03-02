var draw = (function(){
    var radianToDegree = function(radian){
        return Math.floor(radian / (Math.PI * 2) * 360);
    };
    // draw direction helper
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
    // draw star info
    var drawStarInfo = function(ctx, obj){
        ctx.fillStyle = 'rgba(128,128,128,0.2)';
        ctx.font = '10px arial';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillText('pos: ' + Math.floor(obj.x) + ', ' + Math.floor(obj.y), obj.x + 10, obj.y + 10);
        ctx.fillText('pps: ' + Math.floor(obj.pps), obj.x + 10, obj.y + 20);
        ctx.fillText('heading: ' + radianToDegree(obj.heading), obj.x + 10, obj.y + 30);
        ctx.fillText('facing: ' + radianToDegree(obj.facing), obj.x + 10, obj.y + 40);
    };
    // start public api
    var api = {};
    // draw background
    api.background = function (ctx, canvas) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    // draw a star
    api.star = function(ctx, obj){
        ctx.fillStyle = obj.color || 'green';
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 6;
        ctx.globalAlpha = obj.alpha;
        ctx.save();
        ctx.translate(obj.x, obj.y);
        ctx.rotate(obj.facing);
        api.points(ctx, obj.points, 0, 0);
        ctx.restore();
        // draw dir lines for heading and facing
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        strokeDirHelper(ctx, obj, obj.heading, obj.r1 * 0.5, obj.r1);
        strokeDirHelper(ctx, obj, obj.facing, 0, obj.r1 * 0.5);
        ctx.globalAlpha = 1;
        drawStarInfo(ctx, obj);
    };
    // draw points
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
    // return public api
    return api;
}());
