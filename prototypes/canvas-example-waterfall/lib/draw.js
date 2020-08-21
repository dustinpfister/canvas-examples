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
                //if (ball.active) {
                    ctx.beginPath();
                    ctx.fillStyle = 'blue';
                    ctx.arc(10, 10, ball.radius, 0, Math.PI * 2);
                    ctx.fill();
                //}
            });
        }
    }
}
    ());
