var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var areaData = '' +
    '0000000000000000' +
    '0000000000000000' +
    '0000000001110000' +
    '0011111111210000' +
    '0012211222210000' +
    '0012222222211000' +
    '0011222222111000' +
    '0001122222111000' +
    '0001111122210000' +
    '0000001111110000' +
    '0000000000000000';

var state = game.create({
        areaData: areaData
    });

// frame rate capping for model
// update and drawing so that this does
// nit eat up as much CPU overhead
var lt = new Date(),
targetFPS = 24,
targetDelay = 1000 / targetFPS;
var loop = function () {

    var now = new Date(),
    t = now - lt;

    requestAnimationFrame(loop);

    if (t >= targetDelay) {
        game.update(state);
        draw.back(ctx, canvas);
        draw.cells(ctx, state);
        draw.units(ctx, state);
        draw.shots(ctx, state);
        draw.blasts(ctx, state);
        draw.info(ctx, state, 1);

        draw.debugInfoTurrets(ctx, state, 2);
        lt = now;
    }

};
loop();
