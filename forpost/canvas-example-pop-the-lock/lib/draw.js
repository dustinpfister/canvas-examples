var draw = (function(){
    var CIRCLE_RADIUS = 200;
    // public api
    var api = {};
    var text_base_center = function(ctx){
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
    };
    var text_title_center = function(ctx){
        text_base_center(ctx);
        ctx.font='50px arial';
    };
    var text_big_center = function(ctx){
        text_base_center(ctx);
        ctx.font='40px arial';
    };
    var text_big_left = function(ctx){
        text_base_center(ctx);
        ctx.textAlign = 'left';
        ctx.font='40px arial';
    };
    var text_med_center = function(ctx){
        text_base_center(ctx);
        ctx.font='20px arial';
    };
    var text_small_center = function(ctx){
        text_base_center(ctx);
        ctx.font='15px arial';
    };
    var text_game_stats = function(ctx){
        ctx.fillStyle = 'lime';
        ctx.textBaseline = 'top';
        ctx.font='10px arial';
        ctx.textAlign = 'left';
    };
    // draw base circle
    var baseCircle = api.baseCircle = function(ctx, canvas, style){
        ctx.strokeStyle = style || 'white';
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, CIRCLE_RADIUS, 0, Math.PI * 2);
        ctx.stroke();
    };
    // draw base circle
    api.baseCircle_pixmap = function(ctx, sm, pixmapKey, aniKey, frameIndex){
        var size = CIRCLE_RADIUS / 2,
        halfSize = size / 2,
        ani = sm.pixmaps[pixmapKey][aniKey];
        ani.set(frameIndex);
        ani.draw(ctx, sm.canvas.width / 2 - halfSize, sm.canvas.height / 2 - halfSize, size, size);
        
    };
    // draw target range
    var targetRange = api.targetRange = function(ctx, canvas, game){
        // red for trip up range, and orange for all others
        ctx.strokeStyle = game.tripUp.count > 0 ? 'red': 'orange';
        ctx.beginPath();
        ctx.lineWidth = 6;
        ctx.arc(canvas.width / 2, canvas.height / 2, CIRCLE_RADIUS,
            utils.mod(game.deg.target - game.deg.margin, game.deg.total) / game.deg.total * Math.PI * 2,
            utils.mod(game.deg.target + game.deg.margin, game.deg.total) / game.deg.total * Math.PI * 2);
        ctx.stroke();
    };
    // draw current position
    var current_pos = function(ctx, canvas, game, sm){
        ctx.strokeStyle = 'blue';
        ctx.beginPath();
        ctx.lineWidth = 6;
        var r = game.deg.current / game.deg.total * Math.PI * 2,
        x = Math.cos(r) * CIRCLE_RADIUS + canvas.width / 2,
        y = Math.sin(r) * CIRCLE_RADIUS + canvas.height / 2;
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
    };
    // draw current position
    var current_pos_pixmap = api.current_pos_pixmap = function(ctx, sm, pixmapKey, aniKey, size, frameIndex){
        var halfSize = size / 2,
        r = sm.game.deg.current / sm.game.deg.total * Math.PI * 2,
        x = Math.cos(r) * CIRCLE_RADIUS + sm.canvas.width / 2,
        y = Math.sin(r) * CIRCLE_RADIUS + sm.canvas.height / 2;
        var ani = sm.pixmaps[pixmapKey]['circle_small'];
        ani.set(frameIndex);
        ani.draw(ctx, x - halfSize, y - halfSize, size, size);
    };
    var hpBar = api.hpBar = function(ctx, canvas, game){
        if(game.hp.active){
            ctx.fillStyle = 'black';
            ctx.fillRect(canvas.width / 2 - 50, 10, 100, 10);
            ctx.fillStyle = 'lime';
            var per = game.hp.current / game.hp.max;
            ctx.fillRect(canvas.width / 2 - 50, 10, 100 * per, 10);
        }
    };
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
    // score
    var scoreModes = {
        classic: function(ctx, canvas, sm, game){
            text_big_center(ctx);
            // score
            ctx.fillText(game.targets, canvas.width / 2, canvas.height * 0.5);
        }
    };
    api.score = function(ctx, canvas, sm){
        var game = sm.game;
        if(sm.gameMode in scoreModes){
            scoreModes[sm.gameMode](ctx, canvas, sm, game);
        }else{
            text_big_center(ctx);
            // score
            ctx.fillText(game.score, canvas.width / 2, canvas.height * 0.25);
            // late and miss counts
            text_med_center(ctx);
            var miss = game.clickTrack.total - game.clickTrack.hits;
            ctx.fillText('late: ' + game.lateTrack.count + ', miss: ' + miss, canvas.width / 2, canvas.height * 0.35);
            // high score for current mode
            text_small_center(ctx);
            var hs = sm.highScores[sm.game.mode];
            if(hs){
                ctx.fillText('High Score: ' + hs, canvas.width / 2, canvas.height * 0.65);
            }
        }
    };
    // draw title text
    api.text_title = function(ctx, canvas, obj){
        text_title_center(ctx);
        ctx.fillText('Pop The Lock', obj.x + obj.w / 2, obj.y + obj.h / 2 );
    };
    // draw game over text
    api.text_gameover = function(ctx, canvas, sm){
        var game = sm.game,
        sx = canvas.width * 0.25 - 120,
        sy = canvas.height / 2 - 25;
        text_big_left(ctx);
        ctx.fillText(game.win ? 'You Won!' : 'Game Over', sx, canvas.height * 0.25);
        text_game_stats(ctx);
        ctx.fillText('clicks (hits/total): ' + game.clickTrack.hits + '/' + game.clickTrack.total, sx, sy + 10);
        ctx.fillText('miss count: ' + game.lateTrack.count, sx, sy + 20);
        ctx.fillText('score: ' + game.score, sx, sy + 40);
    };
    // version
    api.ver = function(ctx, canvas, sm){
        ctx.fillStyle = 'black';
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
