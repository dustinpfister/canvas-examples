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
            actionsPerTick: 1
        };
    }

    // create a land object
    var createLandObject = function (opt) {
        opt = opt || {};
        return {
            itemIndex: opt.itemIndex === undefined ? null : opt.itemIndex,
            workers: [],
            maxWorkers: 0,
            groundType: opt.groundType || 'grass',
            solidCount: opt.solidCount || 0,
            liguidCount: opt.liguidCount || 0
        };
    };

    var setLandItem = function (land, itemIndex) {

        var item = itemDataBase[itemIndex];

        land.itemIndex = itemIndex;
        land.maxWorkers = item.maxWorkers;

    };

    var createWorldLand = function (world) {
        var len = world.landCount || 8,
        lands = [],
        i = 0;
        while (i < len) {
            lands.push(createLandObject());
            i += 1;
        }

        // start with a ship on land 0 with two workers
        //lands[0].itemIndex = 0;
        setLandItem(lands[0], 0);
        lands[0].workers.push(createWorkerObject());
        lands[0].workers.push(createWorkerObject());

        return lands;
    };

    return {
        create: function () {
            var world = {
                landCount: 4,
                lands: [],
                freeWorkers: []
            };
            world.lands = createWorldLand(world);
            return world;
        }
    }

}
    ());

var world = worldMod.create();

console.log(world);
