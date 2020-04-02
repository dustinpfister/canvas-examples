var draw = {};

draw.back = function (sm) {

    var canvas = sm.canvas,
    ctx = sm.ctx;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

};

draw.world = function (sm) {
    var canvas = sm.canvas,
    ctx = sm.ctx,
    solar = sm.solar,
    i = 0,
    world = solar.currentWorld,
    land;

    // draw land
    while (i < world.lands.length) {
        land = world.lands[i];
        ctx.fillStyle = 'green';
        ctx.fillRect(land.pos.x, land.pos.y, land.pos.w, land.pos.h);
        i += 1;
    }

    // draw free workers
    world.freeWorkers.workers.forEach(function (worker) {

        ctx.fillStyle = 'red';
        ctx.fillRect(worker.pos.x, worker.pos.y, worker.pos.w, worker.pos.h);

    });

};

draw.solar = function (solar) {};
