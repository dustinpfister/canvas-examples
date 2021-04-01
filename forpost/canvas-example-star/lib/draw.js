var draw = (function(){
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
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.font = '10px arial';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillText('pos: ' + Math.floor(obj.x) + ', ' + Math.floor(obj.y), obj.x + 10, obj.y + 10);
        ctx.fillText('pps: ' + Math.floor(obj.pps), obj.x + 10, obj.y + 20);
        ctx.fillText('heading: ' + utils.radianToDegree(obj.heading), obj.x + 10, obj.y + 30);
        ctx.fillText('facing: ' + utils.radianToDegree(obj.facing), obj.x + 10, obj.y + 40);
    };
    // start public api
    var api = {};
    // draw background
    api.createBackground = function(ctx, canvas){
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        // Add color stops
        gradient.addColorStop(0, 'red');
        gradient.addColorStop(0.2, 'orange');
        gradient.addColorStop(0.4, 'yellow');
        gradient.addColorStop(0.6, 'blue');
        gradient.addColorStop(0.8, 'cyan');
        gradient.addColorStop(1, 'lime');
        return gradient;
    };
    // create a background
    api.background = function (ctx, canvas, style) {
        ctx.fillStyle = style || 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    // draw a star
    api.star = function(ctx, obj, state){
        ctx.fillStyle = obj.color || 'green';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 6;
        ctx.globalAlpha = obj.alpha;
        ctx.save();
        ctx.translate(obj.x, obj.y);
        ctx.rotate(obj.facing);

        // create 1 with old points
        //api.points_old(ctx, obj.points, 0, 0);

        // create 1 with new points
        //api.points(ctx, [obj.points.concat('fill:' + obj.color, 'stroke:black')], 0, 0);

        // create 2 with new points
        api.points(ctx, obj.points, 0, 0);


        ctx.restore();
        // draw dir lines for heading and facing
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        strokeDirHelper(ctx, obj, obj.heading, obj.r1 * 0.5, obj.r1);
        strokeDirHelper(ctx, obj, obj.facing, 0, obj.r1 * 0.5);
        ctx.globalAlpha = 1;
        if(state.selected){
            drawStarInfo(ctx, state.selected);
        }
    };
    // draw points
    api.points_old = function (ctx, points, cx, cy) {
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
    // new draw points
    api.points = function (ctx, points, cx, cy, opt) {
        opt = opt || {};
        ctx.save();
        ctx.translate(cx, cy);
        points.forEach(function (pointArray) {
            var len = pointArray.length,
            close = opt.close === undefined ? true : opt.close,
            fill = opt.fill === undefined ? 'black' : opt.fill,
            stroke = opt.stroke === undefined ? 'white' : opt.stroke,
            lineWidth = opt.lineWidth === undefined ? 3 : opt.lineWidth,
            el,
            i = 2;
            ctx.beginPath();
            ctx.moveTo(pointArray[0], pointArray[1]);
            while (i < len) {
                el = pointArray[i];
                if (typeof el === 'number') {
                    ctx.lineTo(el, pointArray[i + 1]);
                    i += 2;
                } else {
                    var parts = el.split(':');
                    if (parts[0] === 'close') {
                        close = parts[1] === 'true' ? true : false;
                    }
                    if (parts[0] === 'stroke') {
                        stroke = parts[1] || false;
                    }
                    if (parts[0] === 'fill') {
                        fill = parts[1] || false;
                    }
                    if (parts[0] === 'lineWidth') {
                        lineWidth = parts[1] || 1;
                    }
                    i += 1;
                }
            }
            ctx.lineWidth = lineWidth;
            if (close) {
                ctx.closePath();
            }
            if (fill) {
                ctx.fillStyle = fill;
                ctx.fill();
            }
            if (stroke) {
                ctx.strokeStyle = stroke;
                ctx.stroke();
            }
        });
        ctx.restore();
    };
    // draw version number
    api.ver = function(ctx, state){
        ctx.fillStyle = 'black';
        ctx.font = '10px arial';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillText('v' + state.ver, 5, state.canvas.height - 15);
    };
    // return public api
    return api;
}());
