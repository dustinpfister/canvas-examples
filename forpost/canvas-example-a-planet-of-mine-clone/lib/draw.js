var draw = {};

draw.back = function (sm) {
    var canvas = sm.canvas,
    ctx = sm.ctx;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.tickProgress = function (sm) {
    var canvas = sm.canvas,
    ctx = sm.ctx,
    solar = sm.solar,
    world = solar.currentWorld;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width * solar.tPer, 10);
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 10, canvas.width * world.rotationPer, 10);

};

draw.world = function (sm) {
    var canvas = sm.canvas,
    ctx = sm.ctx,
    solar = sm.solar,
    i = 0,
    world = solar.currentWorld,
    land;
    // draw freeWokers area
    var pos = world.freeWorkers.pos;
    ctx.fillStyle = 'grey';
    ctx.fillRect(pos.x, pos.y, pos.w, pos.h);
    // draw land
    while (i < world.lands.length) {
        land = world.lands[i];
        ctx.fillStyle = 'green';
        ctx.fillRect(land.pos.x, land.pos.y, land.pos.w, land.pos.h);
        i += 1;
    }
    world.lands.forEach(function (land) {
        land.workers.forEach(function (worker) {
            ctx.fillStyle = 'blue';
            ctx.fillRect(worker.pos.x, worker.pos.y, worker.pos.w, worker.pos.h);
        });
    });
    // draw free workers
    world.freeWorkers.workers.forEach(function (worker) {
        ctx.fillStyle = 'red';
        ctx.fillRect(worker.pos.x, worker.pos.y, worker.pos.w, worker.pos.h);
    });
};

draw.solar = function (sm) {};

// debug info for solar object properties
draw.debugSolar = function (sm) {
    var canvas = sm.canvas,
    ctx = sm.ctx,
    solar = sm.solar,
    world = sm.currentWorld;

    var text = '';
    Object.keys(solar.resources).forEach(function (resourceName) {
        text += resourceName + ':' + solar.resources[resourceName] + '; ';
    });

    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.fillText(text, 5, 15);
    ctx.fillText('exp: ' + solar.exp, 5, 30);
};

// debug info for land
draw.debugLand = function (sm) {
    var canvas = sm.canvas,
    ctx = sm.ctx,
    solar = sm.solar,
    world = solar.currentWorld;
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    world.lands.forEach(function (land) {
        var pos = land.pos;
        ctx.fillText('workers: ' + land.workers.length + '/' + land.maxWorkers, pos.x, pos.y);
        ctx.fillText('solids: ' + land.solidCount, pos.x, pos.y + 10);
        ctx.fillText('liquids: ' + land.liquidCount, pos.x, pos.y + 20);
    });
};

draw.ver = function (sm) {
    var ctx = sm.ctx;
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.font = '10px arial';
    ctx.fillText('v' + sm.ver, 10, sm.canvas.height - 15);

};
