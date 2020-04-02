var sm = Machine('gamearea');

sm.load({
    name: 'game',
    bootState: true,
    init: function (sm) {},
    tick: function (sm) {

        var ctx = sm.ctx;

        sm.solar = solarMod.create();

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, sm.canvas.width, sm.canvas.height);

    },
    userPointer: {
        start: function (pt, sm, e) {
            console.log(e.type, pt.x, pt.y);
        }
    }
});

sm.start();
