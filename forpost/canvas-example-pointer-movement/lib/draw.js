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

    var draw_pm_circle = function(pm, ctx){
            ctx.beginPath();
            ctx.arc(pm.sp.x, pm.sp.y, pm.distMax / 2, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fill();
    };
    var draw_pm_dir_line = function(pm, ctx){
            var x = Math.cos(pm.angle) * pm.distMax + pm.sp.x,
            y = Math.sin(pm.angle) * pm.distMax + pm.sp.y;
            ctx.beginPath();
            ctx.moveTo(pm.sp.x, pm.sp.y);
            ctx.lineTo(x, y);
            ctx.stroke();
    };
    var draw_pm_pps_circle = function(pm, ctx){
             // draw PPS circle
            var per = pm.PPS / pm.maxPPS,
            x = Math.cos(pm.angle) * pm.distMax * per + pm.sp.x;
            y = Math.sin(pm.angle) * pm.distMax * per + pm.sp.y;
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.stroke();
    };
    var draw_pm_info = function(pm, ctx){
        var x = pm.sp.x + pm.distMax * 0.6,
        y = pm.sp.y + 10;
        ctx.fillStyle = 'lime';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = '10px arial';
        ctx.fillText('PPS: ' + Math.round(pm.PPS) + ' / ' + pm.maxPPS + ' ('+Math.round(pm.per*100)+'%)', x, y);
        ctx.fillText('A: ' + utils.radianToScale(pm.angle).toFixed(2), x, y + 12);
    };

    // draw a navigation circle when moving the map
    api.navCircle = function (pm, ctx, canvas) {
        if (pm.down) {
            ctx.strokeStyle = 'white';
            ctx.fillStyle = 'rgba(0,255,0,0.4)';
            ctx.lineWidth = 3;
            draw_pm_circle(pm, ctx);
            if(pm.PPS > 0){
                draw_pm_dir_line(pm, ctx);
                draw_pm_pps_circle(pm, ctx);
                draw_pm_info(pm, ctx);
            }

        }
    };
    api.debugInfo = function (pm, pt, ctx, canvas) {
        ctx.fillStyle = 'lime';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = '20px arial';
        ctx.fillText('pos: ' + Math.floor(pt.x) + ', ' + Math.floor(pt.y), 10, 10);
        //ctx.fillText('PPS: ' + pm.PPS.toFixed(2) + '/' + pm.maxPPS, 10, 20);
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
