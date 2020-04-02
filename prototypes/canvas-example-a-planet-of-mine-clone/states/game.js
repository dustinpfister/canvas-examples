var sm = Machine('gamearea');

sm.load({
    name: 'game',
    bootState: true,
    init: function (sm) {

        sm.solar = solarMod.create();

    },
    tick: function (sm) {

        var ctx = sm.ctx;

        // draw background and world
        draw.back(sm);
        draw.world(sm);

    },
    userPointer: {
        start: function (pt, sm, e) {
			/*
            console.log(e.type, pt.pos.x, pt.pos.y);
            console.log(pt.distance(0, 0));
            console.log(pt.overlap(32, 32, 32, 32));
			*/

        }
    }
});

sm.start();
