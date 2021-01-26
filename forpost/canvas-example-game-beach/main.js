var canvasObj = utils.createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;


var areaDataStrings = ['' +
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
    '0000000000000000',

    '2221111111111111' +
    '2211000000001111' +
    '1110000010000011' +
    '0000000121000001' +
    '1000000010010001' +
    '2100000000121001' +
    '1000100000010001' +
    '1001210000000000' +
    '0000121000001111' +
    '0000010000012211' +
    '0000001100122211' +
    '0000011110111111'
    ];

var state = game.create({
        areaData: areaDataStrings[1]
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
        draw.back(ctx, canvas, 1);
        draw.cells(ctx, state);
        draw.units(ctx, state);
        draw.shots(ctx, state);
        draw.blasts(ctx, state);

        draw.back(ctx, canvas, 0.2);
        draw.info(ctx, state, 1);
        //draw.debugInfoTurrets(ctx, state, 2, 0.5);
        lt = now;
    }

};
loop();
