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
    world = solar.worlds[solar.currentWorld],
    x,
    land;
    while (i < world.lands.length) {
        land = world.lands[i];
        x = 32 + 32 * i;

        ctx.fillStyle = 'green';
        ctx.fillRect(x, 32, 32, 32);

        i += 1;
    }

};

draw.solar = function (solar) {};
