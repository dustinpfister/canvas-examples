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
            maxWorkers: 3,
            getSolids: true
        }, {
            i: 3,
            desc: 'farm',
            maxWorkers: 1
        }, {
            i: 4,
            desc: 'well',
            maxWorkers: 1,
            getLiquids: true
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
    var createWorkerObject = function (parent) {

        return {
            actionsPerTick: 1,
            parent: parent,
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
            liquidCount: opt.liquidCount || 0
        };
    };

    // set the item index for the given land
    var setLandItem = function (land, itemIndex) {
        var item = itemDataBase[itemIndex];
        land.itemIndex = itemIndex;
        land.maxWorkers = item.maxWorkers;
    };

    // create a new worker
    var createWorker = function (world) {
        var fw = world.freeWorkers,
        len = fw.workers.length;
        if (len < fw.maxWorkers) {
            var worker = createWorkerObject(fw);
            worker.pos.x = fw.pos.x + len * (32 + 1);
            worker.pos.y = fw.pos.y;
            fw.workers.push(worker);
        }
    };

    var positionWorkers = function (area) {
        var dx = 0,
        dy = 1;
        if (area.groundType === 'freearea') {
            dx = 1;
            dy = 0;
        }
        area.workers.forEach(function (worker, i) {
            worker.pos.x = area.pos.x + (i * 32 * dx);
            worker.pos.y = area.pos.y + (i * 32 * dy);
        });
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
                    },
                    solidCount: 10,
                    liquidCount: 10
                }));
            i += 1;
        }

        // start with a ship on land 0 with two workers
        setLandItem(lands[0], 0);
        setLandItem(lands[1], 2);
        setLandItem(lands[2], 2);
        createWorker(world);
        createWorker(world);
        createWorker(world);

        return lands;
    };

    return {
        create: function (solar) {
            var world = {
                solar: solar,
                landCount: 4,
                lands: [],
                moveWorker: null,
                freeWorkers: {
                    pos: {
                        x: 32,
                        y: 32,
                        w: 100,
                        h: 50
                    },
                    groundType: 'freearea',
                    maxWorkers: 3,
                    workers: [],
                }
            };

            // move a worker
            world.moveWoker = function (worker, newArea) {
                var i = worker.parent.workers.length;
                while (i--) {
                    var w = worker.parent.workers[i];
                    if (w === worker) {
                        worker.parent.workers.splice(i, 1);
                        positionWorkers(worker.parent);
                        worker.parent = newArea;
                        newArea.workers.push(worker);
                        positionWorkers(newArea);
                        break;
                    }
                }
                return true;
            };

            // create worker
            world.createWorker = function () {
                createWorker(world);
            };

            world.lands = createWorldLand(world);

            // what to do for each tick
            world.onTick = function () {
                var solar = world.solar;
                world.lands.forEach(function (land) {
                    var item = itemDataBase[land.itemIndex] || {},
                    workerCount = land.workers.length;
                    if (item.getSolids && workerCount >= 1) {
                        if (land.solidCount > 0) {
                            if (land.solidCount >= workerCount) {
                                land.solidCount -= workerCount;
                                solar.resources.solid += workerCount;
                            } else {
                                solar.resources.solid += land.solidCount;
                                land.solidCount = 0;
                            }
                        }
                    }
                });

            };

            return world;
        }
    }

}
    ());
