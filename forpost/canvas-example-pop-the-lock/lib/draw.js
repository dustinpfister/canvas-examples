var draw = (function(){
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
    // info
    var info = function(ctx, canvas, game){
        ctx.fillStyle = 'yellow';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.globalAlpha = 0.35;
        ctx.font = '10px arial';
        ctx.fillText('deg.current ' + game.deg.current.toFixed(2), 10, 10);
        ctx.fillText('inrange ' + game.inRange, 10, 20);
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
    // score
    var score = function(ctx, canvas, game){
        ctx.fillStyle = game.score > 0 ? 'green' : 'red';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = '25px arial';
        ctx.fillText(game.score, canvas.width / 2, canvas.height / 2);
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
        score(ctx, canvas, game);
        info(ctx, canvas, game);
    };
    // draw title text
    api.titleText = function(ctx, canvas){
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'middle';
        ctx.font='30px arial';
        ctx.textAlign = 'center';
        ctx.fillText('Pop The Lock', canvas.width / 2, canvas.height / 2 - 50);
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
                ctx.restore();
            }
        }
    };
    // return public API
    return api;
}());
