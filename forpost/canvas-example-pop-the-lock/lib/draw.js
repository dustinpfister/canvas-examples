var draw = (function(){

    var CIRCLE_RADIUS = 200;
    var text_base_center = function(ctx){
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
    };
    var text_title_center = function(ctx){
        text_base_center(ctx);
        ctx.font='75px arial';
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
    var baseCircle = function(ctx, canvas, style){
        ctx.strokeStyle = style || 'white';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, CIRCLE_RADIUS, 0, Math.PI * 2);
        ctx.stroke();
    };
    // draw target range
    var targetRange = function(ctx, canvas, game){
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.lineWidth = 8;
        ctx.arc(canvas.width / 2, canvas.height / 2, CIRCLE_RADIUS,
            utils.mod(game.deg.target - game.deg.margin, game.deg.total) / game.deg.total * Math.PI * 2,
            utils.mod(game.deg.target + game.deg.margin, game.deg.total) / game.deg.total * Math.PI * 2);
        ctx.stroke();
    };
    // draw current position
    var current_pos = function(ctx, canvas, game){
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
    var hpBar = function(ctx, canvas, game){
        if(game.hp.active){
            ctx.fillStyle = 'black';
            ctx.fillRect(canvas.width / 2 - 50, 10, 100, 10);
            ctx.fillStyle = 'lime';
            var per = game.hp.current / game.hp.max;
            ctx.fillRect(canvas.width / 2 - 50, 10, 100 * per, 10);
        }
    };
    // public api
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
    // Pop The Lock
    api.PTL = function (ctx, canvas, game, circleStyle) {
        baseCircle(ctx, canvas, circleStyle);
        targetRange(ctx, canvas, game);
        current_pos(ctx, canvas, game);
        hpBar(ctx, canvas, game);
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
            ctx.fillText('late: ' + game.missTrack.count + ', miss: ' + miss, canvas.width / 2, canvas.height * 0.35);
            // high score for current mode
            text_small_center(ctx);
            var hs = sm.highScores[sm.game.mode];
            if(hs){
                ctx.fillText('High Score: ' + hs, canvas.width / 2, canvas.height * 0.65);
            }
        }
    };
    // draw title text
    api.text_title = function(ctx, canvas){
        text_title_center(ctx);
        ctx.fillText('Pop The Lock', canvas.width / 2, canvas.height * 0.125);
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
        ctx.fillText('miss count: ' + game.missTrack.count, sx, sy + 20);
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
    api.pool = function (ctx, pool) {
        var i = pool.objects.length,
        obj;
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        while (i--) {
            obj = pool.objects[i];
            if (obj.active) {
                ctx.save();
                ctx.fillStyle = obj.data.fill || 'white';
                ctx.globalAlpha = obj.data.alpha || 1;
                ctx.translate(obj.x, obj.y);
                ctx.beginPath();
                ctx.rect(0, 0, obj.w, obj.h);
                ctx.fill();
                ctx.stroke();
                if(obj.data.disp){
                   ctx.fillStyle = 'black';
                   ctx.textBaseline = 'middle';
                   ctx.font = '20px arial';
                   ctx.textAlign = 'center';
                   ctx.fillText(obj.data.disp, obj.w / 2, obj.h / 2);
                }
                ctx.restore();
            }
        }
    };
    // info
    api.debugInfo = function(ctx, canvas, game){
        ctx.fillStyle = 'yellow';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.globalAlpha = 0.35;
        ctx.font = '20px arial';
        ctx.fillText('deg.current ' + game.deg.current.toFixed(2), 10, 20);
        ctx.fillText('deg.target ' + game.deg.target, 10, 40);
        ctx.fillText('deg.distance ' + game.deg.distance.toFixed(2), 10, 60);
        ctx.fillText('deg.perSec ' + game.deg.perSec.toFixed(2), 10, 80);
        ctx.fillText('trip up count: ' + game.tripUp.count, 10, 100);
        ctx.fillText('inrange ' + game.inRange, 10, 120);
        ctx.fillText('miss count: ' + game.missTrack.count, 10, 140);
        ctx.fillText('clicks (hits/total): ' + game.clickTrack.hits + '/' + game.clickTrack.total, 10, 160);
        ctx.fillText('paused: ' + game.pause, 10, 180);
        ctx.fillText('mode: ' + game.mode, 10, 200);
        ctx.fillText('level: ' + game.level, 10, 220);
    };
    // return public API
    return api;
}());
