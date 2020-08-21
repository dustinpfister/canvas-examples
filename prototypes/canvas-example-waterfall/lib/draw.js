var draw = (function () {
    return {
        // draw background
        back: function (ctx, canvas) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
        waterBalls: function (sm) {
            var ctx = sm.ctx;
            sm.balls.forEach(function (ball) {
                if (ball.active) {
                    ctx.beginPath();
                    ctx.fillStyle = 'blue';
                    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
        },
        ver: function (sm) {
            var canvas = sm.canvas,
            ctx = sm.ctx;
            ctx.fillStyle = 'white';
            ctx.textBaseline = 'top';
            ctx.textAlign = 'left';
            ctx.font = '10px arial';
            ctx.fillText('v' + sm.ver, 2, canvas.height - 12);
        }
    }
}
    ());
