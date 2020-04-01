var worldMod = (function () {

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

    var createWorldLand = function (world) {
        var len = world.landCount || 8,
        lands = [],
        i = 0;
        while (i < len) {
            lands.push(createLandObject());
            i += 1;
        }
        return lands;
    };

    return {
        create: function () {
            var world = {
                landCount: 4,
                lands: []
            };
            world.lands = createWorldLand(world);
            return world;
        }
    }

}());

var world = worldMod.create();

console.log(world);
