var createCanvas = function(opt){
    opt = opt || {};
    opt.container = opt.container || document.getElementById('canvas-app') || document.body;
    opt.canvas = document.createElement('canvas');
    opt.ctx = opt.canvas.getContext('2d');
    opt.container.appendChild(opt.canvas);
    opt.canvas.width = opt.width === undefined ? 320 : opt.width;
    opt.canvas.height = opt.height === undefined ? 240 : opt.height;
    opt.ctx.translate(0.5, 0.5);
    return opt;
};

// STATE
var canvasObj = createCanvas();
var state = {
    ver: '0.0.0',
    canvas : canvasObj.canvas,
    ctx: canvasObj.ctx,
    game: gameMod.create()
};

var lt = new Date(),
FPS_target = 1000 / 30;

var loop = function () {
    var now = new Date(),
    t = now - lt,
    game = state.game,
    secs = t / 1000;
    requestAnimationFrame(loop);
    if (t >= FPS_target) {

        gameMod.updateMap(game, secs);
        gameMod.setMapMovement(game, 90, 32);

        draw.background(state.ctx, state.canvas);
        draw.gridLines(state.ctx, state, 'rgba(255,255,255,0.1)');
        draw.ship(state.ctx, state);
        draw.info(state.ctx, state);
        draw.ver(state.ctx, state);
        lt = now;
    }
};
loop();