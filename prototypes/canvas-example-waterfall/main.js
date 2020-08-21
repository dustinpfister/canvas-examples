var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var sm = {
    canvas: canvas,
    ctx: ctx,
    balls: poolMod.create({
        count: 50,
        data: {
            turnAtX: 100
        },
        pps: 128,
        spawn: function (obj, state) {
            console.log(state);
            obj.x = canvas.width;
            obj.y = 20;
            obj.heading = Math.PI;

        },
        update: function (obj, sm, secs) {
            obj.x += Math.cos(obj.heading) * obj.pps * secs;
            obj.y += Math.sin(obj.heading) * obj.pps * secs;
            if (obj.x <= obj.data.turnAtX) {
                obj.x = obj.data.turnAtX;
                obj.heading = Math.PI / 2;
	
            }
        }
    })
};

poolMod.spawn(sm.balls, sm);

var lt = new Date();
var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    requestAnimationFrame(loop);
    poolMod.update(sm.balls, sm, secs);
    draw.back(ctx, canvas);
    draw.waterBalls(sm);
    lt = now;
};
loop();
