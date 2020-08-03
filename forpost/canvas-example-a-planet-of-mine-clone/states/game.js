var sm = Machine('canvas-app');

sm.load({
    name: 'game',
    bootState: true,
    init: function (sm) {

        sm.solar = solarMod.create();

    },
    tick: function (sm) {

        var ctx = sm.ctx;

        solarMod.update(sm.solar);

        // draw background, world, and more
        draw.back(sm);
        draw.world(sm);
        draw.tickProgress(sm);
        draw.debugLand(sm);
        draw.debugSolar(sm);
        draw.ver(sm);

    },
    userPointer: {
        start: function (pt, sm, e) {

            var world = sm.solar.currentWorld;

            // free worker area
            var fw = world.freeWorkers;
            if (pt.overlap(fw.pos.x, fw.pos.y, fw.pos.w, fw.pos.h)) {
                var len = fw.workers.length;
                if (len > 0) {
                    // select free worker?
                    var i = len;
                    while (i--) {
                        var worker = fw.workers[i],
                        pos = worker.pos;
                        if (pt.overlap(pos.x, pos.y, pos.w, pos.h)) {
                            world.moveWorker = worker;
                            break;
                        }
                    }
                } else {
                    // create new worker?
                    //console.log('new worker?');
                    world.createWorker();
                }
            }

            // land worker?
            var li = world.lands.length;
            lands: while (li--) {
                var land = world.lands[li],
                wi = land.workers.length;
                while (wi--) {
                    var worker = land.workers[wi],
                    pos = worker.pos;
                    if (pt.overlap(pos.x, pos.y, pos.w, pos.h)) {
                        world.moveWorker = worker;
                        break lands;
                    }
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

                world.moveWoker(world.moveWorker, world.moveWorker.parent);

                // over land with moveWorker?
                var i = world.lands.length;
                while (i--) {
                    var land = world.lands[i],
                    pos = land.pos;
                    if (pt.overlap(pos.x, pos.y, pos.w, pos.h)) {
                        if (land.workers.length + 1 > land.maxWorkers) {
                            break;
                        }
                        world.moveWoker(world.moveWorker, land);
                        break;
                    }
                }

                // over freeWorkers
                var pos = world.freeWorkers.pos;
                if (pt.overlap(pos.x, pos.y, pos.w, pos.h)) {
                    if (!(world.freeWorkers.length + 1 > world.freeWorkers.maxWorkers)) {
                        world.moveWoker(world.moveWorker, world.freeWorkers);
                    }
                }

            }

            world.moveWorker = null;

        }
    }
});

sm.start();
