var draw = (function(){
    var text_big_center = function(ctx){
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'middle';
        ctx.font='30px arial';
        ctx.textAlign = 'center';
    };
    var text_game_stats = function(ctx){
        ctx.fillStyle = 'lime';
        ctx.textBaseline = 'top';
        ctx.font='10px arial';
        ctx.textAlign = 'left';
    };
    // draw base circle
    var baseCircle = function(ctx, canvas){
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2);
        ctx.stroke();
    };
    // draw target range
    var targetRange = function(ctx, canvas, game){
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 100,
            utils.mod(game.deg.target - game.deg.margin, game.deg.total) / game.deg.total * Math.PI * 2,
            utils.mod(game.deg.target + game.deg.margin, game.deg.total) / game.deg.total * Math.PI * 2);
        ctx.stroke();
    };
    // draw current position
    var current_pos = function(ctx, canvas, game){
        ctx.strokeStyle = 'blue';
        ctx.beginPath();
        var r = game.deg.current / game.deg.total * Math.PI * 2,
        x = Math.cos(r) * 100 + canvas.width / 2,
        y = Math.sin(r) * 100 + canvas.height / 2;
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.stroke();
    };
    // public api
    var api = {};
    // background
    api.background = function(ctx, canvas, style){
        ctx.globalAlpha = 1;
        ctx.fillStyle = style || 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    // Pop The Lock
    api.PTL = function (ctx, canvas, game) {
        baseCircle(ctx, canvas);
        targetRange(ctx, canvas, game);
        current_pos(ctx, canvas, game);
    };
    // score
    api.score = function(ctx, canvas, game){
        ctx.fillStyle = game.score > 0 ? 'green' : 'red';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = '25px arial';
        ctx.fillText(game.score, canvas.width / 2, canvas.height / 2);
    };
    // draw title text
    api.text_title = function(ctx, canvas){
        text_big_center(ctx);
        ctx.fillText('Pop The Lock', canvas.width / 2, canvas.height / 2 - 50);
    };
    // draw game over text
    api.text_gameover = function(ctx, canvas, sm){
        var game = sm.game,
        sx = canvas.width / 2 - 120,
        sy = canvas.height / 2 - 25;
        text_big_center(ctx);
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 50);
        text_game_stats(ctx);
        ctx.fillText('clicks (hits/total): ' + game.clickTrack.hits + '/' + game.clickTrack.total, sx, sy + 10);
        ctx.fillText('miss count: ' + game.missTrack.count, sx, sy + 20);
    };
    // version
    api.ver = function(ctx, canvas, sm){
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'top';
        ctx.font='10px arial';
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
                   ctx.font = '10px arial';
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
        ctx.font = '10px arial';
        ctx.fillText('deg.current ' + game.deg.current.toFixed(2), 10, 10);
        ctx.fillText('deg.target ' + game.deg.target, 10, 20);
        ctx.fillText('deg.distance ' + game.deg.distance.toFixed(2), 10, 30);
        ctx.fillText('trip up count: ' + game.tripUp.count, 10, 40);
        ctx.fillText('inrange ' + game.inRange, 10, 50);
        ctx.fillText('miss count: ' + game.missTrack.count, 10, 60);
        ctx.fillText('clicks (hits/total): ' + game.clickTrack.hits + '/' + game.clickTrack.total, 10, 70);
        ctx.fillText('paused: ' + game.pause, 10, 80);
    };
    // return public API
    return api;
}());
