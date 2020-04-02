var worldMod = (function () {

    var itemDataBase = [
        // item objects
        {
            i: 0,
            desc: 'ship',
            maxWorkers: 2
        }, {
            i: 1,
            desc: 'house',
            maxWorkers: 0
        }, {
            i: 2,
            desc: 'mine',
            maxWorkers: 1
        }, {
            i: 3,
            desc: 'farm',
            maxWorkers: 1
        }, {
            i: 4,
            desc: 'well',
            maxWorkers: 1
        }, {
            i: 5,
            desc: 'trees',
            maxWorkers: 1
        }, {
            i: 6,
            desc: 'berries',
            maxWorkers: 1
        }
    ];

    // create a worker object
    var createWorkerObject = function () {

        return {
            actionsPerTick: 1,
            pos: { // position relative to canvas
                x: 0,
                y: 0,
                w: 32,
                h: 32
            }
        };
    }

    // create a land object
    var createLandObject = function (opt) {
        opt = opt || {};
        opt.pos = opt.pos || {};
        return {
            itemIndex: opt.itemIndex === undefined ? null : opt.itemIndex,
            workers: [],
            maxWorkers: 0,
            pos: {
                x: opt.pos.x || 0,
                y: opt.pos.y || 0,
                w: opt.pos.w || 64,
                h: opt.pos.h || 128
            },
            groundType: opt.groundType || 'grass',
            solidCount: opt.solidCount || 0,
            liguidCount: opt.liguidCount || 0
        };
    };

    // set the item index for the given land
    var setLandItem = function (land, itemIndex) {
        var item = itemDataBase[itemIndex];
        land.itemIndex = itemIndex;
        land.maxWorkers = item.maxWorkers;
    };

    // move a worker from one location to another
    /*
    var moveWorker = function (fromArea, toArea) {
    if (fromArea.workers.length === 0) {
    return;
    }
    if (toArea.workers.length + 1 <= toArea.maxWorkers) {
    var worker = fromArea.workers.pop();
    land.workers.push(worker);
    }
    };
     */

    // create a new worker
    var createWorker = function (world) {
        var fw = world.freeWorkers,
        len = fw.workers.length;
        if (len < fw.maxWorkers) {
            var worker = createWorkerObject();
            worker.pos.x = fw.pos.x + len * (32 + 1);
            worker.pos.y = fw.pos.y;
            fw.workers.push(worker);
        }
    };

    var createWorldLand = function (world) {
        var len = world.landCount || 8,
        lands = [],
        i = 0;
        while (i < len) {
            lands.push(createLandObject({
                    pos: {
                        x: 32 + i * (64 + 2),
                        y: 120,
                        w: 64,
                        h: 96
                    }
                }));
            i += 1;
        }

        // start with a ship on land 0 with two workers
        setLandItem(lands[0], 0);
        createWorker(world);
        createWorker(world);
        createWorker(world);
        createWorker(world);

        return lands;
    };

    return {
        create: function () {
            var world = {
                landCount: 4,
                lands: [],
                moveWorker: null,
                freeWorkers: {
                    pos: {
                        x: 32,
                        y: 32
                    },
                    maxWorkers: 3,
                    workers: [],
                }
            };
            world.lands = createWorldLand(world);
            return world;
        }
    }

}
    ());
