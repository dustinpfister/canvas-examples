(function () {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('canvas-app') || document.body;
    container.appendChild(canvas);
    canvas.width = 320;
    canvas.height = 240;
    ctx.translate(0.5, 0.5);

    var sm = {
        ver: '0.0.0',
        canvas: canvas,
        ctx: ctx,
        ballSpawnRate: 0.05,
        ballSecs: 0,
        balls: poolMod.create({
            count: 100,
            data: {
                turnAtX: 100
            },
            pps: 128,
            spawn: function (obj, state) {
                obj.x = canvas.width;
                obj.y = 20;
                obj.heading = Math.PI;
                obj.data.turnAtX = 50 + Math.floor(Math.random() * (canvas.width - 50));
            },
            update: function (obj, sm, secs) {
                obj.x += Math.cos(obj.heading) * obj.pps * secs;
                obj.y += Math.sin(obj.heading) * obj.pps * secs;
                if (obj.x <= obj.data.turnAtX) {
                    obj.x = obj.data.turnAtX;
                    obj.heading = Math.PI / 2;
                }
                if (obj.y > sm.canvas.height + obj.radius) {
                    obj.active = false;
                }
            }
        })
    };

    //poolMod.spawn(sm.balls, sm);

    var lt = new Date();
    var loop = function () {
        var now = new Date(),
        t = now - lt,
        secs = t / 1000;
        sm.ballSecs += secs;
        if (sm.ballSecs >= sm.ballSpawnRate) {
            poolMod.spawn(sm.balls, sm);
            sm.ballSecs %= sm.ballSpawnRate;
        }
        requestAnimationFrame(loop);
        poolMod.update(sm.balls, sm, secs);
        draw.back(ctx, canvas);
        draw.waterBalls(sm);
        draw.ver(sm);
        lt = now;
    };
    loop();
}
    ());
