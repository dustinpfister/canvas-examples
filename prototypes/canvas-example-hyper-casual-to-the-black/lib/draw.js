var draw = (function () {
    var setBasicText = function(ctx){
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = '10px arial';
        ctx.fillStyle = 'white';
    };

    // background helpers
    var backgroundSolid = function(ctx, canvas){
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    var backgroundGrid = function(ctx, game, canvas){
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'red';
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

    return {
        // draw background
        back: function (ctx, game, canvas) {
            backgroundSolid(ctx, canvas);
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
        }
    }
}
    ());
