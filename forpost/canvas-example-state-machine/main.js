var sm = Machine('gamearea');

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

    },
    userPointer: {
        start: function (pt, sm, e) {
            console.log(e.type, pt.x, pt.y);
            sm.game.manual += sm.game.perManual;
        }
    }
});

sm.start();
