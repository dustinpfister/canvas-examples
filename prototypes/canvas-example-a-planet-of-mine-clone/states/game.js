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

            var world = sm.solar.currentWorld,
            fw = world.freeWorkers,
            i = fw.workers.length;
            while (i--) {
                var worker = fw.workers[i],
                pos = worker.pos;
                if (pt.overlap(pos.x, pos.y, pos.w, pos.h)) {
                    world.moveWorker = worker;
                    break;
                }
            }

        },
        move: function (pt, sm, e) {
            var world = sm.solar.currentWorld;

            if (world.moveWorker) {
                world.moveWorker.pos.x = pt.pos.x - 16;
                world.moveWorker.pos.y = pt.pos.y - 16;
            }

        },
        end: function (pt, sm, e) {
            var world = sm.solar.currentWorld;

            if (world.moveWorker) {
                // over land with moveWorker?
                var i = world.lands.length;
                while (i--) {

                    var land = world.lands[i],
                    pos = land.pos;

                    if (pt.overlap(pos.x, pos.y, pos.w, pos.h)) {

                        world.moveWorker.pos.x = pos.x;
                        world.moveWorker.pos.y = pos.y;

                        break;
                    }

                }

            }

            world.moveWorker = null;

        }
    }
});

sm.start();
