var draw = {};

draw.back = function (solar) {

    var canvas = solar.canvas,
    ctx = solar.ctx;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

};

draw.world = function (solar) {
    var canvas = solar.canvas,
    ctx = solar.ctx,
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
