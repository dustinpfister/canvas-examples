var sm = Machine('canvas-app');

sm.load({
    name: 'game',
    bootState: true,
    init: function (sm) {

        var g = sm.game;
        g.manual = 0;
        g.perManual = 0.25;
        g.auto = 0;
        g.autoTickRate = 3000;
        g.perAutoTick = 1;
        g.pos = {x:0,y:0};
        g.lt = new Date();

    },
    tick: function (sm) {

        var g = sm.game,
        ctx = sm.ctx,
        now = new Date(),
        t = now - g.lt;

        if (t >= g.autoTickRate) {
            var ticks = t / g.autoTickRate;
            g.auto += ticks * g.perAutoTick;
            g.lt = now;
        }

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, sm.canvas.width, sm.canvas.height);

        ctx.fillStyle = 'white';
        ctx.fillText('manual: ' + g.manual.toFixed(2), 10, 20);
        ctx.fillText('auto: ' + g.auto.toFixed(2), 10, 30);
        ctx.fillText('pos: ' + g.pos.x.toFixed(2) + ', ' + g.pos.y.toFixed(2), 10, 40);

    },
    userPointer: {
        start: function (pt, sm, e) {
            var g = sm.game;
            g.manual += sm.game.perManual;
            g.pos.x = pt.x;
            g.pos.y = pt.y;
        }
    }
});

sm.start();
