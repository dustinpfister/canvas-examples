// create canvas

var canvasObj = utils.createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;

// main state object
var state = {
    ver: '0.2.1',
    lt: new Date(),
    pointerDown: false,
    pointerPos: {},
    game: gameMod.create({
        canvas: canvas,
        startTime: new Date(), // new Date(1983, 4, 6, 10, 5),
        distObj: {
            //32: 900000000,
            //64: 100000000
        },
        //pps: 128,
        ppsIndex: 0, //6,
        distance: 0,
        targetTimeUnit: 'years'
    })
};
// main app loop
var loop = function () {
    var now = new Date(),
    t = now - state.lt,
    secs = t / 1000;
    requestAnimationFrame(loop);
    gameMod.update(state.game, secs, now);
    draw.back(ctx, state.game, canvas);
    draw.playerShip(ctx, state.game);
    draw.textDistance(ctx, state.game, 10, 10);
    draw.textPPS(ctx, state.game, 10, 20);
    draw.textETA(ctx, state.game, 10, 30);
    draw.pool(ctx, state.game.powerUps.pool);
    draw.ver(ctx, state, 2, canvas.height - 12);
    state.lt = now;
};
loop();
// events
var setInputs = function (pos) {
    if (pos.x < canvas.width / 2) {
        state.game.input.left = true;
        state.game.input.right = false;
    } else {
        state.game.input.left = false;
        state.game.input.right = true;
    }
};
var onPointerStart = function (e) {
    var pos = state.pointerPos = utils.getCanvasRelative(e);
    state.pointerDown = true;
    setInputs(pos);
};
var onPointerMove = function (e) {
    var pos = state.pointerPos = utils.getCanvasRelative(e);
    if (state.pointerDown) {
        setInputs(pos);
    }
};
var onPointerStop = function (e) {
    state.pointerDown = false;
    state.game.input.left = false;
    state.game.input.right = false;
};
canvas.addEventListener('mousedown', onPointerStart);
canvas.addEventListener('mousemove', onPointerMove);
canvas.addEventListener('mouseup', onPointerStop);
