var draw = (function () {
    var setBasicText = function(ctx){
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = '10px arial';
        ctx.fillStyle = 'white';
    };

    // background helpers
    var backgroundSolid = function(ctx, game, canvas){
        var c = Math.round(128 - game.gamePer * 128);
        ctx.fillStyle = 'rgba(0,'+c+','+c+',1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    var backgroundGrid = function(ctx, game, canvas){
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#5a5a5a';
        var cellW = Math.floor(canvas.width / 32) + 2,
        cellH = Math.floor(canvas.height / 32) + 2;
        var x, y, i=0, len = cellW * cellH,
        dy = game.distance % 256 / 256 * 32;
        while(i < len){
            x = i % cellW;
            y = Math.floor(i / cellW);
            ctx.beginPath();
            ctx.rect(-32 + x * 32, -32 + dy + y * 32, 32, 32);
            ctx.stroke();
            i += 1;
        }
    };

    var objectMethods = {
        box: function(ctx, obj, game){
            ctx.fillStyle = 'green';
            ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
        }
    };

    var drawObject = function(ctx, obj, game, method){
        method = method || 'box';
        objectMethods[method](ctx, obj, game);
    };

    return {
        // draw background
        back: function (ctx, game, canvas) {
            backgroundSolid(ctx, game, canvas);
            backgroundGrid(ctx, game, canvas);
        },
        textETA: function(ctx, game, x, y){
            var text = 'Target ETA: ' + Number(game.target.ETA).toFixed(2) + ' ' + game.target.timeUnit;
            setBasicText(ctx);
            ctx.fillText(text, x, y);
        },
        textDistance: function(ctx, game, x, y){
            var text = 'Distance: ' + Math.floor(game.distance);
            setBasicText(ctx);
            ctx.fillText(text, x, y);
        },
        playerShip: function(ctx, game){
            drawObject(ctx, game.playerShip, game, 'box');
        }
    }
}
    ());
