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
        },
        buttonPool: function(ctx, obj, i){
            // parts array
            var parts = obj.data.action.split('_');
            // background
            ctx.fillStyle = obj.data.fill || 'white';
            ctx.translate(obj.x, obj.y);
            ctx.beginPath();
            ctx.globalAlpha = obj.data.alpha === undefined ? 1: obj.data.alpha;
            ctx.rect(0, 0, obj.w, obj.h);
            ctx.fill();
            if(parts[2] === 'current'){
                var value = sm.modeSettings[parts[3]],
                range = obj.data.setting.range,
                deltaRange = range[1] - range[0],
                per = (value - range[0]) / deltaRange;
                ctx.beginPath();
                ctx.fillStyle = 'black';
                ctx.rect(0, 0, obj.w * per, obj.h);
                ctx.fill();
            }
            ctx.beginPath();
            ctx.rect(0, 0, obj.w, obj.h);
            ctx.globalAlpha = obj.data.alpha2 === undefined ? ctx.globalAlpha: obj.data.alpha2;
            ctx.stroke();
            // draw disp text
            if(obj.data.disp){
               ctx.fillStyle = 'black';
               ctx.textBaseline = 'middle';
               ctx.font = '20px arial';
               ctx.textAlign = 'center';
               ctx.fillText(obj.data.disp, obj.w / 2, obj.h / 2);
            }
            ctx.globalAlpha = 1;
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
    api.buttonPool = function (ctx, pool, sm) {
        sm = sm || {};
        drawPool(ctx, pool, globalDraw.buttonPool);
    };

    // debug info
    api.debugInfo = function (ctx, sm, sx, sy) {

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

    // version
    api.ver = function(ctx, canvas, sm){
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'top';
        ctx.font='15px arial';
        ctx.textAlign = 'left';
        ctx.fillText('v' + sm.ver, canvas.width - 50, canvas.height - 15);
    };

    return api;

}
    ());
