var draw = (function(){

    var api = {};

    api.background = function (pm, ctx, canvas) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    api.PTGridlines = function (pt, ctx, canvas) {
        var cellX = -1,
        cellY = -1,
        x,
        y;
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 1;
        while (cellX < 26) {
            x = cellX * 32 - pt.x % 32;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
            cellX += 1;
        }
        while (cellY < 20) {
            y = cellY * 32 - pt.y % 32;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
            cellY += 1;
        }
    };

    var draw_pm_circle = function(pm, ctx, canvas){
            ctx.beginPath();
            ctx.arc(pm.sp.x, pm.sp.y, pm.distMax / 2, 0, Math.PI * 2);
            ctx.stroke();
    };

    var draw_pm_dir_line = function(pm, ctx, canvas){
            var x = Math.cos(pm.angle) * pm.distMax + pm.sp.x,
            y = Math.sin(pm.angle) * pm.distMax + pm.sp.y;
            ctx.beginPath();
            ctx.moveTo(pm.sp.x, pm.sp.y);
            ctx.lineTo(x, y);
            ctx.stroke();
    };

    var draw_pm_pps_circle = function(pm, ctx, canvas){
             // draw PPS circle
            var per = pm.PPS / pm.maxPPS,
            x = Math.cos(pm.angle) * pm.distMax * per + pm.sp.x;
            y = Math.sin(pm.angle) * pm.distMax * per + pm.sp.y;
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.stroke();
    };

    // draw a navigation circle when moving the map
    api.navCircle = function (pm, ctx, canvas) {
        if (pm.down) {
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 3;
            draw_pm_circle(pm, ctx, canvas);
            draw_pm_dir_line(pm, ctx, canvas);
            draw_pm_pps_circle(pm, ctx, canvas);

        }
    };
    api.debugInfo = function (pm, pt, ctx, canvas) {
        ctx.fillStyle = 'white';
        ctx.fillText('pos: ' + Math.floor(pt.x) + ', ' + Math.floor(pt.y), 10, 10);
        ctx.fillText('PPS: ' + pm.PPS.toFixed(2) + '/' + pm.maxPPS, 10, 20);
    };
    api.ver = function (ctx, pm) {
        ctx.fillStyle = 'white';
        ctx.font = '10px courier';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillText('v' + pm.ver, 5, canvas.height - 15);
    };

    return api;

}());
