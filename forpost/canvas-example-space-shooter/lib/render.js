// RENDER
var draw = (function () {
    var canvas = States.canvas,
    ctx = States.ctx;
    // clear screen
    var cls = function () {
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        // clear
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    var states = {
        none: function () {},
        game: function () {
            // draw player
            States.disp.ship.draw(ctx, 'blue', 'blue');
            // draw enemies
            States.disp.enemies.forEach(function (enemy) {
                enemy.draw(ctx, 'red', 'red');
            });
        },
        gameOver: function () {
            ctx.fillStyle = 'white';
            if (States.win) {
                ctx.fillText('Victory', 10, 10);
            } else {
                ctx.fillText('Game Over', 10, 10);
            }
        }
    };
    return function () {
        cls();
        var drawState = states[States.current] || states['none'];
        drawState();
    };
}
    ());
