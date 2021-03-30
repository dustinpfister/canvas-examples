var draw = (function(){

    var api = {};

    // create and return a gradient
    var default_stops = [
        [0, 'red'],
        [0.2, 'orange'],
        [0.4, 'yellow'],
        [0.6, 'blue'],
        [0.8, 'cyan'],
        [1, 'lime']
    ];

    api.createGradient = function(ctx, canvas, angelePer, stops){
        angelePer = angelePer === undefined ? 0.125 : angelePer;
        stops = stops || default_stops;
        var size = Math.min.apply(null, [canvas.width, canvas.height]),
        radius = size / 2,
        radian = Math.PI * 2 * angelePer,
        sx = canvas.width / 2 + Math.cos(radian) * radius,
        sy = canvas.height / 2 + Math.sin(radian) * radius,
        ex = canvas.width / 2 + Math.cos(radian + Math.PI) * radius,
        ey = canvas.height / 2 + Math.sin(radian + Math.PI) * radius,
        gradient = ctx.createLinearGradient(sx, sy, ex, ey);
        // Add color stops
        stops.forEach(function(st){
            gradient.addColorStop.apply(gradient, st);
        });
        return gradient;
    };
    // plain background method
    api.background = function(ctx, canvas, style){
        ctx.globalAlpha = 1;
        ctx.fillStyle = style || 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    // background
    api.backgroundMode = function(ctx, canvas, sm){
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'black';
        var mode = gameMod.modes[sm.gameMode];
        if(mode){
            ctx.fillStyle = mode.background;
        }
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    // version
    api.ver = function(ctx, canvas, sm){
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'top';
        ctx.font='15px arial';
        ctx.textAlign = 'left';
        ctx.fillText('v' + sm.ver, 5, canvas.height - 15);
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
                if(obj.data.draw){
                    obj.data.draw(ctx, obj, i);
                }else{
                    globalDraw(ctx, obj, i);
                }
                ctx.restore();
            }
        }
    };
    // basic draw pool method with a solid background fallback if there is
    // draw method in an disp objects data object
    api.pool = function (ctx, pool) {
        drawPool(ctx, pool, function(ctx, obj, i){
            ctx.fillStyle = obj.data.fill || 'white';
            ctx.globalAlpha = obj.data.alpha || 1;
            ctx.translate(obj.x, obj.y);
            ctx.beginPath();
            ctx.rect(0, 0, obj.w, obj.h);
            ctx.fill();
            ctx.stroke();
            ctx.globalAlpha = 1;
        });
    };
    // draw button pool with a globalDraw that will draw the disp text
    // of a button in the data object
    api.buttonPool = function (ctx, pool, sm) {
        sm = sm || {};
        drawPool(ctx, pool, function(ctx, obj, i){
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
        });
    };
    // return public API
    return api;
}());
