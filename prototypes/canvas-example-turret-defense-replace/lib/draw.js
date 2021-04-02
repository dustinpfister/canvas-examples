var draw = (function () {

    var api = {};

    // plain background method
    api.background = function (ctx, canvas, style) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = style || 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // draw object pool
    var drawPool = function (ctx, pool, globalDraw) {
        var i = pool.objects.length,
        obj;
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        while (i--) {
            obj = pool.objects[i];
            if (obj.active) {
                ctx.save();
                if (obj.data.draw) {
                    obj.data.draw(ctx, obj, i);
                } else {
                    globalDraw(ctx, obj, i);
                }
                ctx.restore();
            }
        }
    };

    var globalDraw = {
        basic: function (ctx, obj, i) {
            ctx.fillStyle = obj.data.fill || 'white';
            ctx.globalAlpha = obj.data.alpha || 1;
            ctx.beginPath();
            ctx.rect(obj.x, obj.y, obj.w, obj.h);
            ctx.fill();
            ctx.stroke();
            ctx.globalAlpha = 1;
        },
        waveButtons: function (ctx, obj, i) {
            globalDraw.basic(ctx, obj, i);
            ctx.fillStyle = 'black';
            ctx.fillText(obj.data.waveNumber, obj.x + 5, obj.y + 5);
        }
    };

    // basic draw pool method with a solid background fallback if there is
    // draw method in an disp objects data object
    api.pool = function (ctx, pool) {
        drawPool(ctx, pool, globalDraw.basic);
    };

    api.waveButtons = function (ctx, pool) {
        drawPool(ctx, pool, globalDraw.waveButtons);
    };

    // debug info
    api.debugInfo = function (ctx, sm, sx, sy) {
        var waveButtonsPool = sm.game.waveButtons.pool,
        waveButtonData = waveButtonsPool.data;
        ctx.fillStyle = 'white';
        ctx.font = '10px arial';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillText('currentWave: ' + waveButtonData.currentWave, sx, sy);
        ctx.fillText('waveCount: ' + waveButtonData.waveCount, sx, sy + 20);
        ctx.fillText('toSpawn: ' + waveButtonData.toSpawn, sx, sy + 40);
        ctx.fillText('ActiveCount: ' + waveButtonData.activeCount, sx, sy + 60);
        ctx.fillText('rushTo: ' + waveButtonData.rushTo, sx, sy + 80);

        ctx.fillText('Unit Count: ' + sm.game.unitQueue.unitCount, sx, sy + 120);
    };

    api.resetButton = function (ctx, sm) {
        ctx.fillStyle =  'white';
        ctx.globalAlpha = 1;
        ctx.beginPath();
        var obj = sm.resetButton;
        ctx.rect(obj.x, obj.y, obj.w, obj.h);
        ctx.fill();
        ctx.stroke();
        ctx.globalAlpha = 1;
    };

    return api;

}
    ());
