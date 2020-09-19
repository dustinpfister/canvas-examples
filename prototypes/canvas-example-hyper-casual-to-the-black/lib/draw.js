var draw = (function () {
    var setBasicText = function(ctx){
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = '10px arial';
        ctx.fillStyle = 'white';
    };
    return {
        // draw background
        back: function (ctx, canvas) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
        textETA: function(ctx, game, x, y){
            var text = 'Target ETA: ' + Math.floor(game.target.ETA) + ' ' + game.target.timeUnit;
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
